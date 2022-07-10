import home from './views/home.vue'
import about from './views/about.vue'

const router = {
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: home
    }, {
      path: '/about',
      component: about
    }
  ]
}

export default router
