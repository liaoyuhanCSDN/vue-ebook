<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  data() {
    return {
    }
  },
  mounted() {
    // this.$store.dispatch('book/setFileName', this.$route.params.fileName.split('|').join('/')).then(() => this.initEpub())
    this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => this.initEpub())
  },
  methods: {
    prevPage() {
      if (this.rendition) this.rendition.prev()
      this.hideTitleAndMenu()
    },
    nextPage() {
      if (this.rendition) this.rendition.next()
      this.hideTitleAndMenu()
    },
    toggleTitleAndMenu() {
      console.log(this.menuVisible)
      // this.$store.dispatch('book/setMenuVisible', !this.menuVisible)
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu() {
      // this.$store.dispatch('book/setMenuVisible', false)
      this.setMenuVisible(false)
    },
    initEpub() {
      const url = `http://10.108.142.72:8081/epub/${this.fileName}.epub`
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display()
      this.rendition.on('touchstart', even => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - event.changedTouches[0].clientY
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        // event.preventDefault()
        event.stopPropagation()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
</style>