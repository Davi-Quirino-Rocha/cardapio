import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DashboardLayout from '../views/DashboardLayout.vue'
import DashBoard from '../views/DashBoard.vue'
import Categorias from '../views/Categorias.vue'
import Pratos from '../views/Pratos.vue'
import Personalizar from '../views/Personalizacao.vue'
import DadosRestaurante from '../views/DadosRestaurante.vue'
import QrCode from '../views/QrCode.vue'
import NovaCategoria from '../views/NovaCategoria.vue'
import Preview from '../views/Preview.vue'
import EditarCategoria from '../views/EditarCategoria.vue'

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
        path: 'categorias',
        component: Categorias
      },
      {
        path: 'categorias/nova',
        component: NovaCategoria
      },
      {
        path: 'categorias/editar',
        component: EditarCategoria
      },
      {
        path: 'pratos',
        component: Pratos
      },
      {
        path: 'personalizacao',
        component: Personalizar
      },
      {
        path: 'dados-restaurante',
        component: DadosRestaurante
      },
      {
        path: 'qrcode',
        component: QrCode
      },
      {
        path: 'preview',
        component: Preview
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router