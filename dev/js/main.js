/**
 * @description application main logic file.
 * @author pkeros
 * @data 16/6/1
 * @email pkeros@vip.qq.com
 */

import App from './App.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'

import RouterMap from './router'
import Interceptor from './interceptor'
import Utils from './utils'

import KsComponents from './KsComponents'
import Directives from './directives'
import Filter from './filters'

// Vue configure
Vue.config.debug = process.env.NODE_ENV !== 'production'

// attach plugin.
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueValidator)
Vue.use(Interceptor)
Vue.use(Utils)
Vue.use(KsComponents)
Vue.use(Directives)
Vue.use(Filter)

// router configure.
let router = new VueRouter({
  history: false,
  hashbang: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})
RouterMap(router)

let app = Vue.extend(App)
router.start(app, '#app')
