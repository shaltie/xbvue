import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.filter('priceBeautifier', function (value) {
  if (!value) return ''
  return Number(Number(value).toFixed()).toLocaleString('RU-ru')
})

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
