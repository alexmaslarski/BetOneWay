import Vue from 'vue'
import VueRouter from 'vue-router'
// Pages
import Home from '@/views/Home.vue'
import Event from '@/views/Event.vue'
// Components
import Login from '@/components/Login.vue'
import Profile from '@/components/Profile.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
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
