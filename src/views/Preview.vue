<template>
  <div class="preview-page">

    <div class="header">
      <h1>Preview do cardápio</h1>
      <p>Visualize como seu cardápio aparece para os clientes</p>
    </div>

    <div class="preview-container">

      <!-- CARD RESTAURANTE -->
      <div class="restaurant-card">
        <img
          class="logo"
          src="../assets/imgRestaurante.svg"
          alt="Logo"
        >

        <h2>Restaurante Don Giovanni</h2>

        <p class="subtitle">
          Cozinha italiana tradicional com toques contemporâneos
        </p>

        <div class="info">
          <span>Rua dos Pinheiros, 123</span>
          <span>(11) 3456-4673</span>
          <span>12h-23h</span>
        </div>
      </div>
      

      <!-- CATEGORIAS -->
      <div class="categories">

        <button
          v-for="categoria in categorias"
          :key="categoria"
          @click="categoriaSelecionada = categoria"
          :class="{ active: categoriaSelecionada === categoria }"
        >
          {{ categoria }}
        </button>

      </div>

      <!-- TITULO -->
      <h3>{{ categoriaSelecionada }}</h3>

      <!-- PRATOS -->
      <div class="pratos-grid">

        <div
          class="prato-card"
          v-for="prato in pratosFiltrados"
          :key="prato.id"
        >
          <img
            :src="prato.imagem"
            :alt="prato.nome"
          >

          <div class="content">
            <h4>{{ prato.nome }}</h4>

            <span class="preco">
              R$ {{ prato.preco }}
            </span>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'PreviewPage',

  data() {
    return {
      categoriaSelecionada: 'Entradas',

      categorias: [
        'Entradas',
        'Massas',
        'Carnes',
        'Sobremesas'
      ],

      pratos: [
        {
          id: 1,
          categoria: 'Entradas',
          nome: 'Carpaccio de salmão',
          preco: '99,99',
          imagem: 'https://picsum.photos/400/300?1'
        },
        {
          id: 2,
          categoria: 'Entradas',
          nome: 'Bruschetta tradicional',
          preco: '99,99',
          imagem: 'https://picsum.photos/400/300?2'
        },
        {
          id: 3,
          categoria: 'Massas',
          nome: 'Lasanha Bolonhesa',
          preco: '55,90',
          imagem: 'https://picsum.photos/400/300?3'
        },
        {
          id: 4,
          categoria: 'Carnes',
          nome: 'Picanha Premium',
          preco: '89,90',
          imagem: 'https://picsum.photos/400/300?4'
        },
        {
          id: 5,
          categoria: 'Sobremesas',
          nome: 'Tiramisu',
          preco: '25,90',
          imagem: 'https://picsum.photos/400/300?5'
        }
      ]
    }
  },

  computed: {
    pratosFiltrados() {
      return this.pratos.filter(
        prato =>
          prato.categoria === this.categoriaSelecionada
      )
    }
  }
}
</script>

<style scoped>
.preview-page {
  padding: 30px;
}

.preview-container {
  background: #eef0ff;
  padding: 40px;
  border-radius: 30px;
}

.restaurant-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,.1);
}

.logo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.restaurant-card h2 {
  margin-top: 15px;
  font-size: 42px;
}

.subtitle {
  color: #666;
}

.info {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 20px;
}

.categories {
  margin-top: 25px;
  background: white;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  gap: 10px;
}

.categories button {
  border: none;
  background: transparent;
  padding: 15px 30px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 600;
}

.categories button.active {
  background: #ef2020;
  color: white;
}

.pratos-grid {
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(320px,1fr));
  gap: 20px;
}

.prato-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
}

.prato-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.content {
  padding: 20px;
}

.content h4 {
  font-size: 28px;
  margin-bottom: 10px;
}

.preco {
  color: #ef2020;
  font-size: 28px;
  font-weight: bold;
}
</style>