import Vue from "vue";
import App from "./App.vue";
import createRouter from './router'
import createStore from './store'

Vue.config.productionTip = false;

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
    const router =  createRouter()
    const store = createStore()
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    // 返回 app 和 router
    return { app, router }
}