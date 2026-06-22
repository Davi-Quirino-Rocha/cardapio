import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DashboardLayout from '../views/DashboardLayout.vue'
import DashBoard from '../views/DashBoard.vue'
import Categorias from '../views/Categorias.vue'
import Pratos from '../views/Pratos.vue'
import Personalizar from '../views/PersonalizacaoPage.vue'
import DadosRestaurante from '../views/DadosRestaurante.vue'
import QrCode from '../views/QrCode.vue'
import NovaCategoria from '../views/NovaCategoria.vue'
import Preview from '../views/Preview.vue'
import EditarCategoria from '../views/EditarCategoria.vue'
import NovoPrato from '../views/NovoPrato.vue'
import EditarPrato from '../views/EditarPrato.vue'
import RecuperarSenha from '../views/RecuperarSenha.vue'
import RedefinirSenha from '../views/RedefinirSenha.vue'
import EmailEnviado from '../views/EmailEnviado.vue'
import Erro404 from '../views/Erro404.vue'

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
    path: '/recuperar-senha',
    component: RecuperarSenha
  },
  {
    path: '/email-enviado',
    component: EmailEnviado
  },
  {
    path: '/redefinir-senha',
    component: RedefinirSenha
  },
  {
    path: '/:pathMatch(.*)*',
    component: Erro404
  },
  {
    path: "/cardapio-cliente",
    name: "CardapioCliente",
    component: () => import("../views/CardapioCliente.vue")
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
        path: 'pratos/novo',
        component: NovoPrato
      },
      {
        path: 'pratos/editar/:id',
        component: EditarPrato
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