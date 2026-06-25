<template>
  <div class="page-wrapper">
    <div class="pratos-header">
      <div class="pratos-title">
        <h2>Pratos</h2>
        <p>Gerencie o cardápio do seu restaurante</p>
      </div>

      <button class="btn-novo-prato" @click="$router.push('/dashboard/pratos/novo')">
        + Novo prato
      </button>
    </div>

    <div class="pratos-filters">
      <div class="search-box">
        <input
          type="text"
          placeholder="Buscar pratos"
          v-model="searchQuery"
        />
      </div>

      <div class="category-filter">
        <select v-model="categoryFilter">
          <option value="">Todas as categorias</option>
          <option
            v-for="categoria in categorias"
            :key="categoria"
            :value="categoria"
          >
            {{ categoria }}
          </option>
        </select>
      </div>
    </div>

    <p v-if="erroCarregamento" class="erro">
      {{ erroCarregamento }}
    </p>

    <p v-else-if="pratos.length === 0" class="empty-message">
      Nenhum prato cadastrado.
    </p>

    <p v-else-if="filteredPratos.length === 0" class="empty-message">
      Nenhum prato encontrado.
    </p>

    <div v-else class="pratos-grid-container">
      <div class="pratos-grid">
        <div class="prato-card" v-for="prato in filteredPratos" :key="prato.id">
          <div class="prato-image">
            <img :src="prato.image" :alt="prato.name" />
          </div>

          <div class="prato-info">
            <div class="prato-title-row">
              <h3>{{ prato.name }}</h3>

              <span
                class="status-badge"
                :class="prato.active ? 'ativo' : 'inativo'"
              >
                {{ prato.active ? 'Ativo' : 'Inativo' }}
              </span>
            </div>

            <p class="prato-category">{{ prato.category }}</p>
            <p class="prato-price">R$ {{ prato.price }}</p>

            <button
              class="btn-editar"
              @click="$router.push('/dashboard/pratos/editar/' + prato.id)"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { salvarPratos, carregarPratos } from '@/services/pratosStorage'

export default {
  name: 'PratosPage',

  data() {
    return {
      searchQuery: '',
      categoryFilter: '',
      erroCarregamento: '',

      pratos: [
        {
          id: 1,
          name: 'Carpaccio de salmão',
          category: 'Entradas',
          price: '99,99',
          active: true,
          image: require('@/assets/Carpaccio.svg')
        },
        {
          id: 2,
          name: 'Panna cotta',
          category: 'Sobremesas',
          price: '99,99',
          active: true,
          image: require('@/assets/Panna cotta.svg')
        },
        {
          id: 3,
          name: 'Espaguete à carbonara',
          category: 'Massas',
          price: '99,99',
          active: true,
          image: require('@/assets/espaguete.svg')
        },
        {
          id: 4,
          name: 'Picanha na brasa',
          category: 'Carnes',
          price: '99,99',
          active: false,
          image: require('@/assets/Picanha.svg')
        },
        {
          id: 5,
          name: 'Bruschetta tradicional',
          category: 'Entradas',
          price: '99,99',
          active: true,
          image: require('@/assets/Bruschetta.svg')
        },
        {
          id: 6,
          name: 'Filé mignon',
          category: 'Carnes',
          price: '99,99',
          active: false,
          image: require('@/assets/File mignon.svg')
        }
      ]
    }
  },

  computed: {
    categorias() {
      return [...new Set(this.pratos.map(prato => prato.category))]
    },

    filteredPratos() {
      const termoBusca = this.searchQuery.toLowerCase().trim()
      const categoriaSelecionada = this.categoryFilter.toLowerCase().trim()

      return this.pratos.filter(prato => {
        const matchName = prato.name.toLowerCase().includes(termoBusca)
        const matchCategory =
          !categoriaSelecionada ||
          prato.category.toLowerCase() === categoriaSelecionada

        return matchName && matchCategory
      })
    }
  },

  mounted() {
    try {
      const pratosSalvos = carregarPratos()

      if (pratosSalvos && Array.isArray(pratosSalvos)) {
        this.pratos = pratosSalvos
      } else {
        salvarPratos(this.pratos)
      }
    } catch (error) {
      this.erroCarregamento = 'Falha ao consultar pratos.'
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  padding: 40px;
  overflow-y: auto;
}

.pratos-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
}

.pratos-title h2 {
  font-size: 32px;
  color: #1a1a1a;
  font-weight: 700;
  margin-bottom: 8px;
}

.pratos-title p {
  font-size: 14px;
  color: #999;
}

.btn-novo-prato {
  background-color: #ef2020;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-novo-prato:hover {
  background-color: #d91a1a;
}

.pratos-filters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.search-box input,
.category-filter select {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  outline: none;
  transition: border-color 0.3s;
  background: white;
}

.search-box input::placeholder {
  color: #ccc;
}

.search-box input:focus,
.category-filter select:focus {
  border-color: #ef2020;
}

.erro {
  background: #ffe8e8;
  border: 1px solid #f5b5b5;
  color: #d62d2d;
  padding: 14px;
  border-radius: 10px;
  font-size: 14px;
}

.empty-message {
  background: white;
  border: 1px solid #e8e8e8;
  color: #777;
  padding: 24px;
  border-radius: 10px;
  text-align: center;
}

.pratos-grid-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.pratos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  width: 100%;
}

.prato-card {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s, transform 0.3s;
  display: flex;
  flex-direction: column;
}

.prato-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.prato-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prato-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.prato-card:hover .prato-image img {
  transform: scale(1.05);
}

.prato-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.prato-title-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 4px;
}

.prato-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.status-badge.ativo {
  background-color: #dcfce7;
  color: #16a34a;
}

.status-badge.inativo {
  background-color: #e5e7eb;
  color: #6b7280;
}

.prato-category {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
}

.prato-price {
  font-size: 18px;
  font-weight: 700;
  color: #ef2020;
  margin-bottom: 16px;
}

.btn-editar {
  background: white;
  color: #666;
  border: 1px solid #e8e8e8;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
  margin-top: auto;
}

.btn-editar:hover {
  border-color: #ef2020;
  color: #ef2020;
  background-color: #fce4e4;
}

@media (max-width: 1024px) {
  .pratos-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .pratos-header {
    flex-direction: column;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .page-wrapper {
    padding: 20px;
  }

  .pratos-filters {
    grid-template-columns: 1fr;
  }

  .pratos-grid {
    grid-template-columns: 1fr;
  }
}
</style>