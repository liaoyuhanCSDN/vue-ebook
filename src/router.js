import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      component: () => import('@/views/ebook'),
      children: [
        {
          path: ':fileName',
          component: () => import('@/components/ebook/EbookReader')
        }
      ]
    }
  ]
})
