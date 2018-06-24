import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './pages/WelcomePage.vue'
import axios from 'axios'

Vue.use(ElementUI);
Vue.use(axios);

new Vue({
  el: '#app',
  render: h => h(App)
});
