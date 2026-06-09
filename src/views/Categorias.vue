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

    <!-- Categories List -->
    <div class="categories-list">
      <div class="category-item" v-for="category in categories" :key="category.id">
        <div class="category-drag">
          <span class="drag-icon">⋮⋮</span>
        </div>

        <div class="category-info">
          <div class="category-name-section">
            <h3>{{ category.name }}</h3>
            <span v-if="category.status" class="status-badge">{{ category.status }}</span>
          </div>
          <p class="category-count">
            <span class="icon">🍽️</span>
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

          <button class="btn-icon" @click="editCategory(category.id)" title="Editar">
            <span>✏️</span>
          </button>

          <button class="btn-icon btn-delete" @click="deleteCategory(category.id)" title="Deletar">
            <span>🗑️</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoriasPage',
  data() {
    return {
      categories: [
        { id: 1, name: 'Entradas', count: 6, active: true, status: null },
        { id: 2, name: 'Massas', count: 6, active: true, status: null },
        { id: 3, name: 'Carnes', count: 6, active: false, status: 'Inativo' },
        { id: 4, name: 'Peixes', count: 6, active: true, status: null },
        { id: 5, name: 'Sobremesas', count: 6, active: true, status: null },
        { id: 6, name: 'Bebidas', count: 6, active: false, status: 'Inativo' }
      ]
    }
  },
  methods: {
    openNewCategoryModal() {
      alert('Modal para criar nova categoria')
    },
    editCategory(id) {
      alert(`Editando categoria ${id}`)
    },
    deleteCategory(id) {
      if (confirm('Tem certeza que deseja deletar esta categoria?')) {
        this.categories = this.categories.filter(cat => cat.id !== id)
      }
    },
    toggleCategory(id) {
      const category = this.categories.find(cat => cat.id === id)
      if (category) {
        category.status = category.active ? null : 'Inativo'
      }
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  padding: 40px;
  overflow-y: auto;
}

/* CATEGORIES HEADER */
.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
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

/* CATEGORIES LIST */
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
  background-color: #e5e7eb;
  color: #6b7280;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.category-count {
  font-size: 13px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 6px;
}

.category-count .icon {
  font-size: 14px;
}

.category-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* TOGGLE SWITCH */
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

/* ACTION BUTTONS */
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

/* RESPONSIVE */
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
