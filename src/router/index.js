import Vue from 'vue'
import VueRouter from 'vue-router'
import PrivateChat from '../views/PrivateChat.vue'
import Login  from '../views/Login.vue'
import Admin  from '../views/Admin.vue'
import GroupLineList  from '../views/groupLineList.vue'
import GroupLineListDev from '../views/groupLineListDev.vue'
import UserManage from '../views/userManage.vue'
import Responsible from '../views/responsible.vue'
import TagManage from  '../views/tagManage.vue'
import Broadcast from '../views/broadcast.vue'
import Navbar from '../views/Navbar.vue'


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'login',
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
    path: '/navbar',
    name: 'Navbar',
    component: Navbar,
    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /user/:id is matched
      { path: '/userManage', component: UserManage },
      { path: '/responsible', component: Responsible },
      { path: '/groupLineListDev', component: GroupLineListDev },
      { path: '/chat', component: PrivateChat },
      { path: '/broadcast', component: Broadcast }

      // ...other sub routes
    ]
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
