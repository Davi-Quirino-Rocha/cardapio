<template>
  <div class="nova-categoria">
    <button class="btn-voltar" @click="$router.back()">
      <img src="../assets/Seta.svg" alt="SetaIcon"> Voltar para as categorias
    </button>

    <div class="header">
      <h1>Nova categoria</h1>
      <p>Crie uma nova categoria para organizar seus pratos</p>
    </div>

    <p v-if="mensagemSucesso" class="sucesso">
      {{ mensagemSucesso }}
    </p>

    <div class="card">
      <h2>Informações da categoria</h2>

      <div class="form-group">
        <label>Nome da categoria *</label>
        <input
          v-model="categoria.nome"
          type="text"
          placeholder="Ex: Massas, Entradas, Carnes..."
          :class="{ 'input-error': errors.nome }"
        >
        <p v-if="errors.nome" class="erro">{{ errors.nome }}</p>
      </div>

      <div class="form-group">
        <label>Descrição (opcional)</label>
        <textarea
          v-model="categoria.descricao"
          rows="6"
          placeholder="Adicione uma descrição para esta categoria"
          :class="{ 'input-error': errors.descricao }"
        />
        <p v-if="errors.descricao" class="erro">{{ errors.descricao }}</p>
      </div>

      <div class="divider"></div>

      <div class="switch-area">
        <label class="switch">
          <input type="checkbox" v-model="categoria.ativa">
          <span class="slider"></span>
        </label>

        <div>
          <strong>Categoria ativa</strong>
          <p>Categorias inativas não aparecem no cardápio público</p>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="btn-cancelar" @click="$router.push('/dashboard/categorias')">
        Cancelar
      </button>

      <button class="btn-salvar" @click="salvarCategoria">
        <img src="../assets/Salvar.svg" alt="SalveIcon"> Criar categoria
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NovaCategoriaPage',

  data() {
    return {
      categoria: {
        nome: '',
        descricao: '',
        ativa: true
      },

      categoriasExistentes: [
        'Entradas',
        'Massas',
        'Carnes',
        'Peixes',
        'Sobremesas',
        'Bebidas'
      ],

      mensagemSucesso: '',

      errors: {
        nome: '',
        descricao: ''
      }
    }
  },

  methods: {
    limparErros() {
      this.errors = {
        nome: '',
        descricao: ''
      }

      this.mensagemSucesso = ''
    },

    validarCategoria() {
      this.limparErros()

      let valido = true
      const nome = this.categoria.nome.trim()
      const descricao = this.categoria.descricao.trim()

      if (!nome) {
        this.errors.nome = 'O nome da categoria é obrigatório.'
        valido = false
      } else if (nome.length < 3) {
        this.errors.nome = 'O nome da categoria deve ter no mínimo 3 caracteres.'
        valido = false
      } else if (nome.length > 50) {
        this.errors.nome = 'O nome da categoria deve ter no máximo 50 caracteres.'
        valido = false
      } else if (
        this.categoriasExistentes.some(
          categoria => categoria.toLowerCase() === nome.toLowerCase()
        )
      ) {
        this.errors.nome = 'Já existe uma categoria com esse nome.'
        valido = false
      }

      if (descricao.length > 200) {
        this.errors.descricao = 'A descrição deve ter no máximo 200 caracteres.'
        valido = false
      }

      return valido
    },

    salvarCategoria() {
      if (!this.validarCategoria()) return

      this.mensagemSucesso = 'Categoria cadastrada com sucesso.'

      setTimeout(() => {
        this.$router.push('/dashboard/categorias')
      }, 1000)
    }
  }
}
</script>

<style scoped>
.nova-categoria {
  padding: 30px;
  width: 100%;
}

.btn-voltar {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  margin-bottom: 24px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header h1 {
  font-size: 44px;
  margin-bottom: 8px;
}

.header p {
  color: #888;
  margin-bottom: 30px;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 32px;
}

.card h2 {
  margin-bottom: 28px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: #ef2020;
}

.input-error {
  border-color: #d62d2d !important;
}

.erro {
  color: #d62d2d;
  font-size: 13px;
  margin-top: 6px;
}

.sucesso {
  background: #e8f9ee;
  border: 1px solid #b7ebc6;
  color: #28a745;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 18px;
}

.divider {
  height: 1px;
  background: #e5e7eb;
  margin: 30px 0;
}

.switch-area {
  display: flex;
  gap: 20px;
  align-items: center;
}

.switch {
  position: relative;
  width: 60px;
  height: 32px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  inset: 0;
  background: #ccc;
  border-radius: 50px;
  cursor: pointer;
}

.slider::before {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  background: white;
  left: 4px;
  top: 4px;
  border-radius: 50%;
  transition: .3s;
}

.switch input:checked + .slider {
  background: #39c24a;
}

.switch input:checked + .slider::before {
  transform: translateX(28px);
}

.actions {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.btn-cancelar {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 15px;
}

.btn-salvar {
  background: #ef2020;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 22px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>