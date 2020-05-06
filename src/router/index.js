import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/helpers/firebaseConfig'
// Pages
import Feed from '@/views/Feed.vue'
import Activity from '@/views/Activity.vue'
import Events from '@/views/Events/Events.vue'
import AllEvents from '@/views/Events/AllEvents.vue'
import Event from '@/views/Events/Event.vue'
import Profile from '@/views/Profile.vue'
import SignIn from '@/views/SignIn.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      if(auth.currentUser){
        next()
      }else {
        next({path: '/signin/login'})
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
        component: Login,
        name: 'Login'
      },
      {
        path: 'register',
        component: Register,
        name: 'Register'
      }
    ]
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    children: [
      {
        path: 'all-events',
        component: AllEvents,
        name: 'AllEvents',
        alias: '/events'
      },
      {
        path: '/event/:id',
        component: Event,
        name: 'Event'
      }
    ]
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
