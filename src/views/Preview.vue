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
          <span>Rua dos pinheiros, 123 -  Pinheiros São Paulo - SP </span>
          <span>(11) 3456-4673</span>
          <span>Ter-Dom: 12h-15h e 19h-23h</span>
        </div>
        <hr>
        <div class="info">
        <!-- Grupo Instagram -->
          <div class="item">
            <img src="../assets/instagram.svg" alt="Insta">
            <span>@dongiovanni</span>
          </div>

          <!-- Grupo Facebook -->
          <div class="item">
            <img src="../assets/facebook.svg" alt="Face">
            <span>dongiovanni</span>
          </div>

          <!-- Grupo Website -->
          <div class="item">
            <span>www.dongiovanni.com.br</span>
          </div>
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
        <button class="btn-salvar-preview" @click="salvarPreview">
          Salvar no cardápio público
        </button>
    </div>

  </div>
</template>

<script>
import { carregarPratos } from '@/services/pratosStorage'
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
  },
  methods: {
    salvarPreview() {
      const dadosCardapio = {
        restaurante: {
          nome: 'Restaurante Don Giovanni',
          descricao: 'Cozinha italiana tradicional com toques contemporâneos',
          endereco: 'Rua dos pinheiros, 123 - Pinheiros São Paulo - SP',
          telefone: '(11) 3456-4673',
          horario: 'Ter-Dom: 12h-15h e 19h-23h'
        },
        categorias: this.categorias,
        pratos: this.pratos
      }

      localStorage.setItem('cardapioPublico', JSON.stringify(dadosCardapio))

      alert('Cardápio salvo para o cliente!')
    }
  },
  mounted() {
  const pratosSalvos = carregarPratos()

  if (pratosSalvos) {
    this.pratos = pratosSalvos.map(prato => ({
      id: prato.id,
      categoria: prato.category || prato.categoria,
      nome: prato.name || prato.nome,
      preco: prato.price || prato.preco,
      imagem: prato.image || prato.imagem,
      descricao: prato.descricao || ''
    }))
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
  gap: 100px;
  margin-top: 20px;
  padding: 10px 30px;
  font-family: sans-serif;
}


.info .item {
  display: flex;
  align-items: center;
  gap: 8px; 
}


.info .item img {
  width: 18px;
  height: 18px;
}


.categories {
  margin-top: 25px;
  background: white;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  gap: 10px;
  display: flex;
  justify-content: space-between;
  
}

.categories button {
  border: none;
  background: transparent;
  padding: 15px 100px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 600;
  font-size: 30px;
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

hr {
  display: flex;
  width: 800px;
  margin: auto;
  margin-top: 10px;
}

.btn-salvar-preview {
  margin-top: 30px;
  background: #ef2020;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 24px;
  font-weight: 700;
  cursor: pointer;
}


</style>