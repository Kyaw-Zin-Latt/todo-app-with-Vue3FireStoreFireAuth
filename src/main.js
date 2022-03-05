import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const Swal = require('sweetalert2')
import "sweetalert2/dist/sweetalert2.css"


createApp(App).use(router).mount('#app')
