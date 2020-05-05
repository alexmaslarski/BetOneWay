import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/helpers/firebaseConfig'
// Pages
import Feed from '@/views/Feed.vue'
import Activity from '@/views/Activity.vue'
import Event from '@/views/Event.vue'
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
    path: '/event/:id',
    name: 'Event',
    component: Event
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
