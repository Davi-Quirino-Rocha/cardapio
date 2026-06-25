<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <Sidebar />

    <div class="main-content">
      <!-- Top Header -->
      <div class="top-header">
        <div class="header-left">
          <h1>{{ pageTitle }}</h1>
        </div>
        <div class="header-right">
          <button
            class="header-link" @click="$router.push('/cardapio-cliente')">
            Ver cardápio público
          </button>
          <button class="btn-sair" @click="handleLogout">
            <span class="icon"><img src="../assets/PortaFundos.svg" alt="Porta"></span>
            <span>Sair</span>
          </button>
        </div>
      </div>

      <!-- Page Content with Transition -->
      <div class="page-content">
        <Transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'DashboardLayout',

  components: {
    Sidebar
  },

  computed: {
    pageTitle() {
      const titles = {
        '/dashboard': 'Dashboard',
        '/dashboard/categorias': 'Categorias',
        '/dashboard/pratos': 'Pratos',
        '/dashboard/personalizacao': 'Personalizar',
        '/dashboard/dados-restaurante': 'Dados do Restaurante',
        '/dashboard/qrcode': 'QR Code',
        '/dashboard/preview': 'Preview'
      }

      return titles[this.$route.path] || 'Dashboard'
    }
  },

  created() {
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado')

    if (usuarioAutenticado !== 'true') {
      this.$router.push('/login')
    }
  },

  methods: {
    handleLogout() {
      localStorage.removeItem('usuarioAutenticado')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-layout {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

/* MAIN CONTENT */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-left: 220px;
}

.top-header {
  background: white;
  padding: 20px 40px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.top-header h1 {
  font-size: 28px;
  color: #1a1a1a;
  font-weight: 700;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 30px;
}

.header-link {
  background: transparent;
  border: none;
  padding: 0;
  all: unset;
  color: #e53935;
  text-decoration: none;

  font-size: 16px;
  font-weight: 500;

  cursor: pointer;
}

.header-link:hover {
  text-decoration: underline;
}

.btn-sair {
  display: flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: none;
  color: #777;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-sair .icon img {
  width: 20px;
  height: 20px;
}

.btn-sair:hover {
  color: #ef2020;
}

.btn-sair:hover .icon img {
  filter: invert(21%) sepia(91%) saturate(5411%)
          hue-rotate(352deg) brightness(96%)
          contrast(105%);
}

.header-link {
  color: #777;
  transition: color .3s;
}

.header-link:hover {
  color: #ef2020;
}

.page-content {
  flex: 1;
  overflow-y: auto;
  position: relative;
}

/* TRANSIÇÃO FADE */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
