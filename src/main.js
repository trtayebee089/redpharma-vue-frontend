import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'
import { i18n } from "./i18n"

// ✅ Import Notivue correctly
import { createNotivue } from 'notivue'
import 'notivue/notification.css'
import 'notivue/animations.css'

const app = createApp(App)
const notivue = createNotivue() // now works

app.use(router)
app.use(createPinia())
app.use(i18n)
app.use(notivue)

app.mount('#app')
