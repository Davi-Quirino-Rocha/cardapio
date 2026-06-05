import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DashboardLayout from '../views/DashboardLayout.vue'
import DashBoard from '../views/DashBoard.vue'
import Categorias from '../views/Categorias.vue'
import Pratos from '../views/Pratos.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/cadastro',
    component: RegisterPage
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        component: DashBoard
      },
      {
        path: '/categorias',
        component: Categorias
      },
      {
        path: '/pratos',
        component: Pratos
      },
      {
        path: '/personalizacao',
        component: { template: '<div class="page-wrapper"><h2>Personalizar</h2><p>Página em construção</p></div>' }
      },
      {
        path: '/dados-restaurante',
        component: { template: '<div class="page-wrapper"><h2>Dados do Restaurante</h2><p>Página em construção</p></div>' }
      },
      {
        path: '/qrcode',
        component: { template: '<div class="page-wrapper"><h2>QR Code</h2><p>Página em construção</p></div>' }
      },
      {
        path: '/preview',
        component: { template: '<div class="page-wrapper"><h2>Preview</h2><p>Página em construção</p></div>' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
