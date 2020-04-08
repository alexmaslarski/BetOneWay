import Vue from 'vue'
import VueRouter from 'vue-router'
// Pages
import Home from '@/views/Home.vue'
import Event from '@/views/Event.vue'
import Profile from '@/views/Profile.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/event/:id',
    name: 'Event',
    component: Event
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
