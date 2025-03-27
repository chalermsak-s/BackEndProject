import { createApp } from 'vue'
import { createPinia } from "pinia";

import './assets/main.css'
import '@/services/AxiosInterceptorSetup'
// นำเข้า Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const pinia = createPinia();
const app = createApp(App)


app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueSweetalert2);
app.use(pinia);
app.use(router) // ใช้ router
app.mount('#app')
