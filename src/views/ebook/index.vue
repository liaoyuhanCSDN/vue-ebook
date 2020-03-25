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
export default {
  name: 'ebook',
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  },
  data() {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";
</style>