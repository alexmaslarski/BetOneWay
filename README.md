# betoneway

## Project setup
```
npm install
```

### App Structure
```
App
  - Home
    - Event
  - SignIn
    - Log In
    - Register
  Profile
```
### Folder Structure
```
Src
  - App.vue
  - views
    - Event
    - Home
    - Profile
    - SignIn
  - store
    - index
    - modules
      - Event
      - Events
      - User
  - router
    - index
  - plugins
    - vuetify
  - helpers
    - firebaseConfig
  - components
    - Login.vue
    - Register.vue
    - UI
      - NavigationDrawer.vue
    - SingleEvent
      - EventHeading.vue
      - EventMarkets.vue
      - EventOption.vue
    - Profile
      - BetHistoryItem.vue
    - BetSlip
      - BetSlipItem.vue
      - BetSlipListing.vue
```
### Example User Journey
```
Home -> Nav-drawer -> Log In -> Home -> Event -> Place Bet -> End
Home -> Event -> Try to place bet -> Log In -> Place bet -> End
Home -> Profile -> Bet History -> End
```
### Built with
```
VueJs
Axios
Firebase
FirebaseUI
Vuex
Vuexfire
Vue-moment
Vue-router
Vuetify
Vue-toast-notification

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
