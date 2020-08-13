import Vue from 'vue'
import Vuex from 'vuex'
import { configure, addDecorator, addParameters } from '@storybook/vue'
import Vuetify from "vuetify";
import { withKnobs } from '@storybook/addon-knobs'
import { themes } from '@storybook/theming'
import { action } from '@storybook/addon-actions'

import 'vuetify/dist/vuetify.css';

addParameters({
  options: {
    theme: themes.dark,
  },
})

Vue.use(Vuex)
Vue.use(Vuetify);


addDecorator(() => ({
  vuetify: new Vuetify({
    theme: { dark: true },
    iconfont: "md"
  }),
  template: "<v-app><story/></v-app>"
}));

Vue.component('nuxt-link', {
  props: ['to'],
  methods: {
    log() {
      action('link target')(this.to)
    },
  },
  template: '<a href="#" @click.prevent="log()"><slot>NuxtLink</slot></a>',
})

// automatically import all files ending in *.stories.js
const req = require.context('../components', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
addDecorator(withKnobs)
// addDecorator(withInfo)

