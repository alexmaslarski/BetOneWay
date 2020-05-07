import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: {
          base: '#0d8deb', //blue
          darken1: '#2A46A6', //purple
        },
        secondary: {
          base: '#666666', //gray
          lighten1: '#f6f7f9'
        },
        accent: '#feac0e', // yellow,
        error: '#d20d25', //red
      },
    },
  },
});
