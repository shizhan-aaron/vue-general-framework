import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 导入初始化样式表
import './styles/index.scss'
// 导入 svgIcon
import installIcons from '@/icons'
// 导入路由鉴权
import './permission'
// filter
import installFilter from '@/filters'
import installDirective from '@/directives'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)

app
  .use(store)
  .use(router)
  .mount('#app')
