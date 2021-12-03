import Vue from 'vue'
import App from './App.vue'

// подключаем сервис для работы с get-запросами
import UserService from "./services/user.service";

Vue.config.productionTip = false

// делаем сервис для работы с get-запросами доступным
Vue.prototype.$UserService = UserService

new Vue({
  render: h => h(App),
}).$mount('#app')
