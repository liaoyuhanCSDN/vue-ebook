import { mapGetters, mapActions } from "vuex";
import { themeList, setGlobalTheme } from "./book";
import { saveLocation } from '@/utils/localStorage'
export const ebookMixin = {
  computed: {
    ...mapGetters([
      "fileName",
      "menuVisible",
      "settingVisible",
      "defaultFontSize",
      "defaultFontFamily",
      "fontFamilyVisible",
      "defaultTheme",
      "bookAvailable",
      "progress",
      "section",
      "isPaginating",
      "currentBook",
      "navigation",
      "cover",
      "metadata",
      "paginate",
      "pagelist",
      "offsetY",
      "isBookmark",
      "speakingIconBottom"
    ]),
    themeList() {
      return themeList(this);
    }
  },
  methods: {
    ...mapActions([
      "setFileName",
      "setMenuVisible",
      "setSettingVisible",
      "setDefaultFontSize",
      "setDefaultFontFamily",
      "setFontFamilyVisible",
      "setDefaultTheme",
      "setBookAvailable",
      "setProgress",
      "setSection",
      "setIsPaginating",
      "setCurrentBook",
      "setNavigation",
      "setCover",
      "setMetadata",
      "setPaginate",
      "setPagelist",
      "setOffsetY",
      "setIsBookmark",
      "setSpeakingIconBottom"
    ]),
    setGlobalStyle() {
      switch (this.defaultTheme) {
        case "Default":
          setGlobalTheme(
            `${process.env.VUE_APP_RES_URL}/theme/theme_default.css`
          );
          break;
        case "Eye":
          setGlobalTheme(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`);
          break;
        case "Gold":
          setGlobalTheme(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`);
          break;
        case "Night":
          setGlobalTheme(
            `${process.env.VUE_APP_RES_URL}/theme/theme_night.css`
          );
          break;
        default:
          setGlobalTheme(
            `${process.env.VUE_APP_RES_URL}/theme/theme_default.css`
          );
          break;
      }
    },
    refreshLocation() {
      const currentLocation = this.currentBook.rendition.currentLocation();
      const startCfi = currentLocation.start.cfi;
      const progress = this.currentBook.locations.percentageFromCfi(startCfi);
      this.setProgress(Math.floor(progress * 100));
      this.setSection(currentLocation.start.index)
      saveLocation(this.fileName, startCfi);
    },
    display(target,cb) {
      if (target) {
         this.currentBook.rendition.display(target).then(() => {
           this.refreshLocation()
           if (cb) cb()
         })
      } else {
         this.currentBook.rendition.display().then(() => {
           this.refreshLocation()
           if (cb) cb()
         })
      }
    },
  }
};
