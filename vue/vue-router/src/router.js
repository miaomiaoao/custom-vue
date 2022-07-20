import home from './views/home.vue'
import about from './views/about.vue'
import aboutA from './views/aboutA.vue'
import aboutB from './views/aboutB.vue'

const router = {
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: home
    }, {
      path: '/about',
      component: about,
      children: [
        {
          path: 'a',
          component: aboutA
        },
        {
          path: 'b',
          component: aboutB
        }
      ]
    }
  ]
}

export default router
