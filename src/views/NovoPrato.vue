<template>
  <div class="novo-prato-page">
    <div class="page-header">
      <h1>Novo prato</h1>
      <p>Adicione um novo prato ao seu cardápio</p>
    </div>

    <p v-if="mensagemSucesso" class="sucesso">
      {{ mensagemSucesso }}
    </p>

    <form class="form-prato" @submit.prevent="criarPrato">
      <section class="card">
        <h3>Informações básicas</h3>

        <div class="upload-area">
          <label class="upload-box">
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              hidden
              @change="selecionarImagem"
            />
            <span><img src="../assets/Download.svg" alt="Download" height="30px" width="30px"></span>
          </label>

          <div>
            <button type="button" class="btn-upload">Escolher logo</button>
            <p>PNG, JPG ou WEBP até 5MB</p>
          </div>
          <p v-if="errors.imagem" class="erro">{{ errors.imagem }}</p>
        </div>

        <div class="form-group">
          <label>Nome do prato</label>
          <input 
            type="text" 
            v-model="form.nome"
            placeholder="Ex: Filé Mignon ao Molho Madeira"
            :class="{ 'input-error': errors.nome }"
          >
          <p v-if="errors.nome" class="erro">{{ errors.nome }}</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Categoria</label>
            <select v-model="form.categoria" :class="{ 'input-error': errors.categoria }">
              <option value="">Selecione uma categoria</option>
              <option>Massas</option>
              <option>Carnes</option>
              <option>Bebidas</option>
              <option>Sobremesas</option>
            </select>
            <p v-if="errors.categoria" class="erro">{{ errors.categoria }}</p>
          </div>

          <div class="form-group">
            <label>Preço</label>
            <input 
              type="text" 
              v-model="form.preco"
              placeholder="R$ 0,00"
              :class="{ 'input-error': errors.preco }"
            >
            <p v-if="errors.preco" class="erro">{{ errors.preco }}</p>
          </div>
        </div>

        <div class="form-group">
          <label>Descrição</label>
          <textarea 
            v-model="form.descricao"
            maxlength="500"
            :class="{ 'input-error': errors.descricao }"
          ></textarea>
          <small>Máximo 500 caracteres</small>
          <p v-if="errors.descricao" class="erro">{{ errors.descricao }}</p>
        </div>
      </section>

      <section class="card">
        <h2>Configurações</h2>

        <div class="config-item">
          <div>
            <h4>Status do prato</h4>
            <p>Pratos inativos não aparecem no cardápio</p>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="form.ativo">
            <span></span>
          </label>
        </div>

        <div class="config-item">
          <div>
            <h4>Prato em destaque</h4>
            <p>Aparece com badge especial no cardápio</p>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="form.destaque">
            <span></span>
          </label>
        </div>

        <div class="form-group">
          <label>Ordem de exibição</label>
          <input
            type="number"
            v-model="form.ordem"
            :class="{ 'input-error': errors.ordem }"
          >
          <small>Pratos com menor número aparecem primeiro</small>
          <p v-if="errors.ordem" class="erro">{{ errors.ordem }}</p>
        </div>

        <div class="form-group">
          <label>Observações internas</label>
          <input 
            type="text" 
            v-model="form.observacoes"
            placeholder="Notas que não aparecem no cardápio público"
          >
        </div>
      </section>

      <div class="actions">
        <button type="button" class="btn-cancelar" @click="$router.push('/dashboard/pratos')">
          Cancelar
        </button>
        <button type="submit" class="btn-criar">
          <img src="../assets/Salvar.svg" alt="Salvar"> Criar prato
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NovoPrato',

  data() {
    return {
      mensagemSucesso: '',

      errors: {
        nome: '',
        categoria: '',
        preco: '',
        descricao: '',
        ordem: '',
        imagem: ''
      },

      form: {
        nome: '',
        categoria: '',
        preco: '',
        descricao: '',
        imagem: null,
        ativo: true,
        destaque: false,
        ordem: 1,
        observacoes: ''
      }
    }
  },

  methods: {
    limparErros() {
      this.errors = {
        nome: '',
        categoria: '',
        preco: '',
        descricao: '',
        ordem: '',
        imagem: ''
      }

      this.mensagemSucesso = ''
    },

    selecionarImagem(event) {
      const file = event.target.files[0]

      if (!file) return

      const tiposPermitidos = ['image/png', 'image/jpeg', 'image/webp']

      if (!tiposPermitidos.includes(file.type)) {
        this.errors.imagem = 'A imagem deve ser PNG, JPG ou WEBP.'
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        this.errors.imagem = 'A imagem deve ter no máximo 5MB.'
        return
      }

      this.errors.imagem = ''
      this.form.imagem = file
    },

    validarPrato() {
      this.limparErros()

      let valido = true
      const nome = this.form.nome.trim()
      const preco = this.form.preco.trim()
      const descricao = this.form.descricao.trim()

      if (!nome) {
        this.errors.nome = 'O nome do prato é obrigatório.'
        valido = false
      } else if (nome.length < 3) {
        this.errors.nome = 'O nome do prato deve ter no mínimo 3 caracteres.'
        valido = false
      } else if (nome.length > 80) {
        this.errors.nome = 'O nome do prato deve ter no máximo 80 caracteres.'
        valido = false
      }

      if (!this.form.categoria) {
        this.errors.categoria = 'Selecione uma categoria.'
        valido = false
      }

      if (!preco) {
        this.errors.preco = 'O preço é obrigatório.'
        valido = false
      } else if (!/^\d+(,\d{2})?$/.test(preco)) {
        this.errors.preco = 'Informe um preço válido. Ex: 29,90'
        valido = false
      }

      if (!descricao) {
        this.errors.descricao = 'A descrição do prato é obrigatória.'
        valido = false
      } else if (descricao.length < 10) {
        this.errors.descricao = 'A descrição deve ter no mínimo 10 caracteres.'
        valido = false
      } else if (descricao.length > 500) {
        this.errors.descricao = 'A descrição deve ter no máximo 500 caracteres.'
        valido = false
      }

      if (!this.form.ordem || this.form.ordem < 1) {
        this.errors.ordem = 'A ordem de exibição deve ser maior que zero.'
        valido = false
      }

      return valido
    },

    criarPrato() {
      if (!this.validarPrato()) return

      this.mensagemSucesso = 'Prato cadastrado com sucesso.'

      setTimeout(() => {
        this.$router.push('/dashboard/pratos')
      }, 1000)
    }
  }
}
</script>

<style scoped>
.novo-prato-page {
  max-width: 760px;
  margin: 50px auto;
}

.page-header h1 {
  font-size: 28px;
  margin-bottom: 4px;
}

.page-header p {
  color: #666;
  margin-bottom: 30px;
}

.card {
  background: white;
  border: 1px solid #aaa;
  border-radius: 10px;
  padding: 18px 24px;
  margin-bottom: 28px;
}

.card h3 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 28px;
}

.card h2 {
  font-size: 22px;
  margin-bottom: 30px;
}

.upload-area {
  display: flex;
  align-items: center;
  gap: 35px;
  margin-bottom: 35px;
}

.upload-box {
  width: 76px;
  height: 76px;
  border: 2px dashed #999;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.upload-box span {
  font-size: 24px;
  color: #777;
}

.btn-upload {
  background: white;
  border: 1px solid #999;
  border-radius: 20px;
  padding: 6px 18px;
  cursor: pointer;
}

.upload-area p {
  margin-top: 18px;
  color: #777;
  font-size: 13px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.form-group label {
  font-size: 16px;
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  height: 46px;
  border: 1px solid #ddd;
  border-radius: 7px;
  padding: 0 16px;
  font-size: 14px;
  outline: none;
}

.form-group textarea {
  height: 135px;
  padding-top: 12px;
  resize: none;
}

.form-group small {
  margin-top: 8px;
  color: #777;
  font-size: 12px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.config-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
}

.config-item h4 {
  font-size: 16px;
  font-weight: 500;
}

.config-item p {
  color: #777;
  font-size: 13px;
  margin-top: 5px;
}

.switch input {
  display: none;
}

.switch span {
  width: 42px;
  height: 24px;
  background: #aaa;
  border-radius: 20px;
  display: block;
  position: relative;
  cursor: pointer;
}

.switch span::before {
  content: '';
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 4px;
  transition: .3s;
}

.switch input:checked + span {
  background: #36c24a;
}

.switch input:checked + span::before {
  transform: translateX(18px);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-bottom: 40px;
}

.btn-cancelar {
  background: transparent;
  border: none;
  color: #555;
  cursor: pointer;
}

.btn-criar {
  background: #ef2020;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 11px 18px;
  font-weight: 700;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-criar img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .novo-prato-page {
    margin: 30px 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
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
</style>