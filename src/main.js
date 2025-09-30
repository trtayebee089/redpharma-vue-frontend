import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'
import { i18n } from "./i18n"
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Dialog from "primevue/dialog";

import { createNotivue } from 'notivue'
import 'notivue/notification.css'
import 'notivue/animations.css'

const app = createApp(App)
const notivue = createNotivue() // now works

app.use(PrimeVue);
app.use(ToastService);
app.use(router)
app.use(createPinia())
app.use(i18n)
app.use(notivue)
app.component('Toast', Toast);
app.component("Dialog", Dialog);
app.mount('#app')
