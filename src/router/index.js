import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import Dashboard from '../views/DashBoard.vue'
const routes = [
  {
    path:'/',
    component: Home
  },
  {
    path:'/login',
    component: LoginPage
  },
  {
    path:'/cadastro',
    component: RegisterPage
  },
  {
    path:'/dashboard',
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
