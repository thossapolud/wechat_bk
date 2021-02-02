import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PrivateChat from '../views/PrivateChat.vue'
import Login  from '../views/Login.vue'
import Admin  from '../views/Admin.vue'
import GroupLineList  from '../views/groupLineList.vue'
import GroupLineListDev from '../views/groupLineListDev.vue'
import UserManage from '../views/userManage.vue'
import Responsible from '../views/responsible.vue'
import TagManage from  '../views/tagManage.vue'
import Broadcast from '../views/broadcast.vue'


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'PrivateChat',
    component: PrivateChat
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/groupLineList',
    name: 'GroupLineList',
    component: GroupLineList
  },
  {
    path: '/groupLineListDev',
    name: 'GroupLineListDev',
    component: GroupLineListDev
  },
  {
    path: '/userManage',
    name: 'UserManage',
    component: UserManage
  },
  {
    path: '/responsible',
    name: 'Responsible',
    component: Responsible
  },
  {
    path: '/tagmanage',
    name: 'TagManage',
    component: TagManage
  },
  {
    path: '/broadcast',
    name: 'Broadcast',
    component: Broadcast
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
