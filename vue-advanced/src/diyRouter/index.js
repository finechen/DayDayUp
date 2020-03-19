import Vue from 'vue'
// import VueRouter from 'vue-router'
import Index from '../views/index.vue'

class DiyRouter {
  constructor(options) {
    // 保存配置
    this.$options = options
    // 初始化路由表
    this.routerMap = {}

    // 路由响应式
    // 强绑定Vue 借助vue双向绑定
    this.app = new Vue({
      data() {
        return {
          current: '/' // 当前url路径
        }
      }
    })
  }
  init() {
    // 监听url变化
    this.bindEvents()
    // 解析路由配置
    this.createTouteMap(this.$options)
    // 实现两个组件
    this.initComponents()
  }
  bindEvents() {
    // bind 指向 router 实例
    window.addEventListener('load', this.onHashChange.bind(this))
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }
  onHashChange() {
    console.log('window.location.hash: ', window.location.hash);
    this.app.current = window.location.hash.slice(1) || '/'


  }
  createTouteMap(options) {
    options.routes.forEach(item => {
      this.routerMap[item.path] = item.component
    })
  }
  initComponents() {
    // router-link router-view

    // <router-link to="">aaaa</router-link>
    Vue.component('router-link', {
      props: {
        to: {
          type: String,
          required: true
        }
      },
      render(h) {
        // h(tag, data, children)
        return h('a', { attrs: { href: '#' + this.to } }, [
          this.$slots.default
        ])
      }
    })

    Vue.component('router-view', {
      render: (h) => {
        // h(tag, data, children)
        const comp = this.routerMap[this.app.current]
        return h(comp)
      }
    })
  }
}

DiyRouter.install = function(Vue) {
  // 混入
  Vue.mixin({
    // this 是 Vue 实例
    beforeCreate() {
      if (this.$options.router) {
        // 仅在跟组件执行一次
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    }
  })
}


Vue.use(DiyRouter)

const routes = [{
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/tree',
    name: 'Tree',
    component: () => import( /* webpackChunkName: "about" */ '../views/tree.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new DiyRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router