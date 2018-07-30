import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios';
 
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'

Vue.use(ElementUI)  
Vue.prototype.$axios = axios;

//import Mock from './mock';
//Mock.bootstrap();

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

