import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/login'
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue')
  // },
  {
    path: '/',
    name: '阅读系统',
    component: () => import('../views/navigation/Home.vue'),
    children: [
      {
        path: '/regist',
        name: '注册',
        hidden: true,
        component: () => import('../components/Register.vue')
      },
      {
        path: '/book',
        name: '书库',
        component: () => import('../views/navigation/Shop.vue')
      },
      {
        path: '/search',
        name: '搜索',
        component: () => import('../views/navigation/Search.vue')
      },
      {
        path: '/test2',
        name: 'Test2',
        component: () => import('../views/navigation/Test2.vue')
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
