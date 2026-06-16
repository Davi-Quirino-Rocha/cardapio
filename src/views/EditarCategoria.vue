<template>
  <div class="edit-category-wrapper">
    
    <button @click="$router.push('/dashboard/categorias')" class="back-btn">
      <svg class="back-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span>Voltar para as categorias</span>
    </button>

    <h1 class="page-title">Editar categoria</h1>

    <div class="form-card">
      <h2 class="card-title">Informações da categoria</h2>

      <div class="input-group">
        <label class="input-label">Nome da categoria</label>
        <input 
          type="text" 
          v-model="form.name"
          class="form-input"
          placeholder="Ex: Entradas, Bebidas, Sobremesas"
        />
      </div>

      <div class="input-group">
        <label class="input-label">Descrição (opcional)</label>
        <textarea 
          v-model="form.description"
          rows="4"
          class="form-textarea"
          placeholder="Adicione uma descrição para esta categoria"
        ></textarea>
      </div>

      <hr class="card-divider">

      <div class="switch-container">
        <button 
          type="button"
          @click="form.isActive = !form.isActive"
          :class="['switch-track', { 'switch-on': form.isActive }]"
        >
          <span :class="['switch-thumb', { 'thumb-on': form.isActive }]"></span>
        </button>

        <div class="switch-text">
          <span class="switch-label">Categoria ativa</span>
          <p class="switch-desc">Categorias inativas não aparecem no cardápio público</p>
        </div>
      </div>
    </div>

    <div class="actions-container">
      <button @click="cancelar" class="btn-cancel">Cancelar</button>
      <button @click="salvar" class="btn-save">Salvar</button>
    </div>

  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['salvar', 'cancelar', 'voltar'])

const form = ref({
  name: 'Entradas',
  description: '',
  isActive: true
})

const salvar = () => {
  if (!form.value.name.trim()) {
    alert('O nome da categoria é obrigatório!')
    return
  }
  emit('salvar', { ...form.value })
  alert('Categoria salva com sucesso!')
}

const cancelar = () => {
  form.value.name = 'Entradas'
  form.value.description = ''
  form.value.isActive = true
  emit('cancelar')
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

.edit-category-wrapper {
  width: 100%;            /* Ocupa toda a largura disponível */
  max-width: 100%;        /* Remove o limite anterior de 896px */
  margin: 0; 
  padding: 40px 24px;
  font-family: 'Poppins', sans-serif;
  background-color: transparent;
  box-sizing: border-box; /* Garante que o padding não quebre a largura */
}

/* BOTÃO VOLTAR */
.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9ca3af;
  background: transparent;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 16px;
  padding: 0;
}
.back-btn:hover {
  color: #374151;
}
.back-svg {
  width: 16px;
  height: 16px;
  transition: transform 0.2s;
}
.back-btn:hover .back-svg {
  transform: translateX(-4px);
}

/* TÍTULO */
.page-title {
  font-size: 30px;
  font-weight: 800;
  color: #030712;
  margin: 0 0 32px 0;
  letter-spacing: -0.025em;
}

/* CARD DO FORMULÁRIO */
.form-card {
  background-color: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%; /* Faz o card esticar junto com a tela */
  box-sizing: border-box;
}
.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #030712;
  margin: 0;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.input-label {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}
.form-input, .form-textarea {
  width: 100%;
  padding: 12px 16px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  color: #111827;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  box-sizing: border-box;
  transition: all 0.2s;
}
.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}
.form-textarea {
  resize: none;
}
.card-divider {
  border: 0;
  border-top: 1px solid #f3f4f6;
  margin: 0;
}

/* TOGGLE SWITCH */
.switch-container {
  display: flex;
  align-items: start;
  gap: 16px;
}
.switch-track {
  position: relative;
  display: inline-flex;
  height: 24px;
  width: 44px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 9999px;
  border: 2px solid transparent;
  background-color: #e5e7eb;
  transition: background-color 0.2s;
  margin-top: 4px;
  padding: 0;
}
.switch-on {
  background-color: #10b981;
}
.switch-thumb {
  pointer-events: none;
  display: inline-block;
  height: 20px;
  width: 20px;
  transform: translateX(0);
  border-radius: 9999px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}
.thumb-on {
  transform: translateX(20px);
}
.switch-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.switch-label {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
}
.switch-desc {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}

/* BOTÕES DE AÇÃO INFERIORES */
.actions-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  width: 100%;
}
.btn-cancel {
  padding: 12px 24px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}
.btn-cancel:hover {
  color: #111827;
}
.btn-save {
  padding: 12px 32px;
  background-color: #dc2626;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.1);
  transition: all 0.2s;
}
.btn-save:hover {
  background-color: #b91c1c;
  box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.2);
}
</style>