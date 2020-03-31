<template>
  <div class="ebook">
    <ebook-title />
    <ebook-reader />
    <EbookMenu />
  </div>
</template>

<script>
import EbookReader from '@/components/ebook/EbookReader'
import EbookTitle from '@/components/ebook/EbookTitle'
import EbookMenu from '@/components/ebook/EbookMenu'
import { getReadTime, saveReadTime } from '@/utils/localStorage'
import { ebookMixin } from '@/utils/mixin'
export default {
  name: 'ebook',
  mixins:[ebookMixin],
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  },
  data() {
    return {
    }
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task)
    }
  },
  methods: {
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";
</style>