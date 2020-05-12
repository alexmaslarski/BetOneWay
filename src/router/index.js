import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
// import { auth } from '@/helpers/firebaseConfig'
// Pages
import Feed from '@/views/Feed.vue'
import Post from '@/views/Post.vue'
import Activity from '@/views/Activity.vue'
import Events from '@/views/Events/Events.vue'
import AllEvents from '@/views/Events/AllEvents.vue'
import LiveEvents from '@/views/Events/LiveEvents.vue'
import Event from '@/views/Events/Event.vue'
import Profile from '@/views/Profile.vue'
import SignIn from '@/views/SignIn.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Tipsters from '@/views/Tipsters/Tipsters.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  },
  {
    path: '/profile/:id?',
    name: 'Profile',
    component: Profile,
    props: true,
    beforeEnter: (to, from, next) => {
      console.log(store.state.user);
      
        function proceed () {
          console.log('proceed');
          
          if (store.state.user.userLoaded) {
            if(store.state.user.user !== null || to.params.id){
              next()
            }else {
              next('/signin/login')
            }
          }
        }
        if (!store.state.user.userLoaded) {
          console.log(store.state.user.userLoaded);
          
          store.watch(
            (state) => state.user.userLoaded,
            (value) => {
              if (value === true) {
                proceed()
              }
            }
          )
        } else {
          proceed()
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
        path: 'live-events',
        component: LiveEvents,
        name: 'LiveEvents'
      },
      {
        path: 'event/:id',
        component: Event,
        name: 'Event'
      }
    ]
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity
  },
  {
    path: '/tipsters',
    name: 'Tipsters',
    component: Tipsters
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
