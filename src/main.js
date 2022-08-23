import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
// 导入表格树
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = `http://120.24.144.173:8010/api/private/v1/`
    // 在request 拦截器中, 展示进度条 NProgress.start()
    // 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头
axios.interceptors.request.use(config => {
        // console.log(config)
        NProgress.start()
            //为请求头对象，添加 token 验证 Authorization 字段
        config.headers.Authorization = window.sessionStorage.getItem('token')
            //在最后必须 return config
        return config
    })
    // response 拦截器中,  隐藏进度条NProgress.done()
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
})


Vue.prototype.$http = axios

Vue.config.productionTip = false
    // 组件全局注册 表格树
Vue.component('tree-table', TreeTable)

Vue.component('tree-table', TreeTable);

Vue.use(VueQuillEditor);

Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal * 1000)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')