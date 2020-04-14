import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/helpers/firebaseConfig'
// Pages
import Home from '@/views/Home.vue'
import Event from '@/views/Event.vue'
import Profile from '@/views/Profile.vue'
import SignIn from '@/views/SignIn.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

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
    component: Profile,
    beforeEnter: (to, from, next) => {
      if(auth.currentUser){
        next()
      }else {
        next({name: Login})
      }
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    children: [
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      }
    ]
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
