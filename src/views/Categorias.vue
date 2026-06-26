<template>
  <div class="page-wrapper">
    <div class="categories-header">
      <div class="categories-title">
        <h2>Categorias</h2>
        <p>Organize seus pratos em categorias</p>
      </div>

      <button class="btn-nova-categoria" @click="$router.push('/dashboard/categorias/nova')">
        + Nova categoria
      </button>
    </div>

    <div class="search-area">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Pesquisar categoria..."
      />
    </div>

    <p v-if="erroCarregamento" class="erro">
      {{ erroCarregamento }}
    </p>

    <p v-else-if="categories.length === 0" class="empty-message">
      Nenhuma categoria cadastrada.
    </p>

    <p v-else-if="filteredCategories.length === 0" class="empty-message">
      Nenhuma categoria encontrada.
    </p>

    <div v-else class="categories-list">
      <div
        class="category-item"
        v-for="category in filteredCategories"
        :key="category.id"
      >
        <div class="category-drag">
          <span class="drag-icon">⋮⋮</span>
        </div>

        <div class="category-info">
          <div class="category-name-section">
            <h3>{{ category.name }}</h3>

            <span
              class="status-badge"
              :class="category.active ? 'ativo' : 'inativo'"
            >
              {{ category.active ? 'Ativo' : 'Inativo' }}
            </span>
          </div>

          <p class="category-count">
            <span class="icon">
              <img src="../assets/Garfo.svg" alt="Garfo">
            </span>
            {{ category.count }} Prato{{ category.count > 1 ? 's' : '' }}
          </p>
        </div>

        <div class="category-actions">
          <div class="toggle-container">
            <label class="switch">
              <input
                type="checkbox"
                v-model="category.active"
                @change="toggleCategory(category.id)"
              />
              <span class="slider"></span>
            </label>
          </div>

          <button
            class="btn-icon"
            @click="$router.push(`/dashboard/categorias/editar/${category.id}`)"
          >
            <span><img src="../assets/lapis.svg" alt="lapis"></span>
          </button>

          <button
            class="btn-icon btn-delete"
            @click="deleteCategory(category.id)"
            title="Deletar"
          >
            <span><img src="../assets/lixo.svg" alt="lixo"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const STORAGE_KEY = 'categorias'

export default {
  name: 'CategoriasPage',

  data() {
    return {
      searchTerm: '',
      erroCarregamento: '',

      categories: [
        { id: 1, name: 'Entradas', count: 6, active: true },
        { id: 2, name: 'Massas', count: 6, active: true },
        { id: 3, name: 'Carnes', count: 6, active: false },
        { id: 4, name: 'Peixes', count: 6, active: true },
        { id: 5, name: 'Sobremesas', count: 6, active: true },
        { id: 6, name: 'Bebidas', count: 6, active: false }
      ]
    }
  },

  computed: {
    filteredCategories() {
      const termo = this.searchTerm.toLowerCase().trim()

      if (!termo) {
        return this.categories
      }

      return this.categories.filter(category =>
        category.name.toLowerCase().includes(termo)
      )
    }
  },

  mounted() {
    const categoriasSalvas = localStorage.getItem(STORAGE_KEY)

    if (categoriasSalvas) {
      this.categories = JSON.parse(categoriasSalvas)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.categories))
    }
  },

  methods: {
    salvarCategorias() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.categories))
    },

    deleteCategory(id) {
      const confirmar = confirm('Tem certeza que deseja deletar esta categoria?')

      if (!confirmar) return

      this.categories = this.categories.filter(category => category.id !== id)
      this.salvarCategorias()
    },

    toggleCategory(id) {
      const category = this.categories.find(category => category.id === id)

      if (!category) {
        this.erroCarregamento = 'Categoria não encontrada.'
        return
      }

      this.salvarCategorias()
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  padding: 40px;
  overflow-y: auto;
}

.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.categories-title h2 {
  font-size: 32px;
  color: #1a1a1a;
  font-weight: 700;
  margin-bottom: 8px;
}

.categories-title p {
  font-size: 14px;
  color: #999;
}

.btn-nova-categoria {
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

.btn-nova-categoria:hover {
  background-color: #d91a1a;
}

.search-area {
  margin-bottom: 24px;
}

.search-area input {
  width: 100%;
  max-width: 420px;
  height: 42px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0 14px;
  outline: none;
}

.search-area input:focus {
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

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-item {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: box-shadow 0.3s;
}

.category-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.category-drag {
  display: flex;
  align-items: center;
  cursor: grab;
  color: #ccc;
  font-size: 16px;
}

.drag-icon {
  letter-spacing: 2px;
}

.category-info {
  flex: 1;
}

.category-name-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.category-name-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
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

.category-count {
  font-size: 13px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 6px;
}

.category-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toggle-container {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #e8e8e8;
  transition: 0.4s;
  border-radius: 28px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #22c55e;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.btn-icon {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.3s;
  padding: 8px;
  border-radius: 6px;
}

.btn-icon:hover {
  transform: scale(1.1);
  background-color: #f5f5f5;
}

.btn-icon.btn-delete:hover {
  background-color: #fee2e2;
}

@media (max-width: 1024px) {
  .categories-header {
    flex-direction: column;
    gap: 20px;
  }

  .category-item {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .page-wrapper {
    padding: 20px;
  }

  .category-item {
    gap: 12px;
  }

  .category-name-section {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>