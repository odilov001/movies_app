import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import Antd from 'ant-design-vue'
import { CLoadingButton } from '@coreui/vue-pro'

import store from './stores/store'

import router from './router'

import './assets/index.css'
import './assets/typography.css'
import './assets/normolize.css'

import { onMounted, watchEffect, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const app = createApp(App)

app.component('CLoadingButton', CLoadingButton)
app.use(store)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
