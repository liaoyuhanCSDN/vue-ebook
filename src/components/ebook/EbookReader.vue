<template>
  <div>
    <div class="ebook-reader">
      <div id="read"></div>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from "@/utils/mixin";
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme
} from "@/utils/localStorage";
import Epub from "epubjs";
global.ePub = Epub;
export default {
  mixins: [ebookMixin],
  data() {
    return {};
  },
  mounted() {
    // this.$store.dispatch('book/setFileName', this.$route.params.fileName.split('|').join('/')).then(() => this.initEpub())
    this.setFileName(
      this.$route.params.fileName.split("|").join("/")
    ).then(() => this.initEpub());
  },
  methods: {
    initTheme() {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName,defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name,theme.style)
      })
      this.rendition.themes.select(defaultTheme)
    },
    initFontSize() {
      const fontSize = getFontSize(this.fileName);
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize);
      } else {
        this.rendition.themes.fontSize(fontSize);
        this.setDefaultFontSize(fontSize)
      }
    },
    initFontFamily() {
       const font = getFontFamily(this.fileName);
        if (!font) {
          saveFontFamily(this.fileName, this.defaultFontFamily);
        } else {
          this.rendition.themes.font(font);
          this.setDefaultFontFamily(font)
        }
    },
    prevPage() {
      if (this.rendition) this.rendition.prev();
      this.hideTitleAndMenu();
    },
    nextPage() {
      if (this.rendition) this.rendition.next();
      this.hideTitleAndMenu();
    },
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1);
        this.setFontFamilyVisible(false);
      }
      this.setMenuVisible(!this.menuVisible);
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false);
      this.setSettingVisible(-1);
      this.setFontFamilyVisible(false);
    },
    initEpub() {
      const url = `${process.env.VUE_APP_RES_URL}/epub/${this.fileName}.epub`;
      this.book = new Epub(url);
      this.setCurrentBook(this.book);
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method: "default"
      });
      this.rendition.display().then(() => {
        this.initFontSize()
        this.initFontFamily()
        this.initTheme()
        this.setGlobalStyle()
      });
      this.rendition.on("touchstart", even => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      this.rendition.on("touchend", event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX;
        const time = event.timeStamp - this.touchStartTime;
        if (time < 500 && offsetX > 40) {
          this.prevPage();
        } else if (time < 500 && offsetX < -40) {
          this.nextPage();
        } else {
          this.toggleTitleAndMenu();
        }
        // event.preventDefault()
        event.stopPropagation();
      });
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          )
        ]).then(() => { });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
</style>
