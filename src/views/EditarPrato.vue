<template>
  <div class="editar-prato-page">
    <div class="page-header">
      <h1>Editar prato</h1>
    </div>

    <p v-if="errors.geral" class="erro-geral">
      {{ errors.geral }}
    </p>

    <form class="form-prato" @submit.prevent="salvarPrato">
      <section class="card">
        <h3>Informações básicas</h3>

        <div class="upload-area">
          <label class="preview-img">
            <input type="file" hidden accept="image/png, image/jpeg, image/webp" @change="handleImageUpload" />
            <img :src="imagemPreview" alt="Imagem do prato" />
          </label>

          <div>
            <label class="btn-upload">
              Escolher logo
              <input type="file" hidden accept="image/png, image/jpeg, image/webp" @change="handleImageUpload" />
            </label>
            <p>PNG, JPG ou WEBP até 5MB</p>
            <p v-if="errors.imagem" class="erro">{{ errors.imagem }}</p>
          </div>
        </div>

        <div class="form-group">
          <label>Nome do prato</label>
          <input v-model="form.nome" type="text" :class="{ 'input-error': errors.nome }" />
          <p v-if="errors.nome" class="erro">{{ errors.nome }}</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Categoria</label>
            <select
                v-model="form.categoria"
                :class="{ 'input-error': errors.categoria }"
            >
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
            <input v-model="form.preco" type="text" :class="{ 'input-error': errors.preco }" />
            <p v-if="errors.preco" class="erro">{{ errors.preco }}</p>
          </div>
        </div>

        <div class="form-group">
          <label>Descrição</label>
          <textarea v-model="form.descricao" maxlength="500" :class="{ 'input-error': errors.descricao }"></textarea>
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
            <input type="checkbox" v-model="form.ativo" />
            <span></span>
          </label>
        </div>

        <div class="config-item">
          <div>
            <h4>Prato em destaque</h4>
            <p>Aparece com badge especial no cardápio</p>
          </div>

          <label class="switch">
            <input type="checkbox" v-model="form.destaque" />
            <span></span>
          </label>
        </div>

        <div class="form-group">
          <label>Ordem de exibição</label>
          <input v-model="form.ordem" type="number" :class="{ 'input-error': errors.ordem }" />
          <small>Pratos com menor número aparecem primeiro</small>
          <p v-if="errors.ordem" class="erro">{{ errors.ordem }}</p>
        </div>

        <div class="form-group">
          <label>Observações internas</label>
          <input
            v-model="form.observacoes"
            type="text"
            placeholder="Notas que não aparecem no cardápio público"
          />
        </div>
      </section>
      <p v-if="mensagemSucesso" class="sucesso">
            {{ mensagemSucesso }}
          </p>
      <div class="actions">
        <button type="button" class="btn-cancelar" @click="$router.push('/dashboard/pratos')">
          Cancelar
        </button>

        <button type="submit" class="btn-salvar">
          <img src="../assets/Salvar.svg" alt="Salvar" />
          <span>Salvar</span>
        </button>
      </div>

    </form>
  </div>
</template>

<script>
import { carregarPratos, salvarPratos } from '@/services/pratosStorage'

export default {
  name: 'EditarPratoPage',

  data() {
    return {
      imagemPreview: '',
      mensagemSucesso: '',

      errors: {
        nome: '',
        categoria: '',
        preco: '',
        descricao: '',
        ordem: '',
        imagem: '',
        geral: ''
      },

      form: {
        nome: '',
        categoria: '',
        preco: '',
        descricao: '',
        ativo: true,
        destaque: false,
        ordem: 1,
        observacoes: ''
      },

      pratos: []
    }
  },

  mounted() {
    const id = Number(this.$route.params.id)
    const pratosSalvos = carregarPratos() || []

    this.pratos = pratosSalvos

    const pratoEncontrado = this.pratos.find(prato => prato.id === id)

    if (!pratoEncontrado) {
      this.errors.geral = 'Prato não encontrado.'
      return
    }

    this.form.nome = pratoEncontrado.name || pratoEncontrado.nome || ''
    this.form.categoria = pratoEncontrado.category || pratoEncontrado.categoria || ''
    this.form.preco = pratoEncontrado.price || pratoEncontrado.preco || ''
    this.form.descricao = pratoEncontrado.descricao || ''
    this.form.ativo = pratoEncontrado.ativo ?? pratoEncontrado.active ?? true
    this.form.destaque = pratoEncontrado.destaque ?? false
    this.form.ordem = pratoEncontrado.ordem || 1
    this.form.observacoes = pratoEncontrado.observacoes || ''
    this.imagemPreview = pratoEncontrado.image || pratoEncontrado.imagem || ''
  },

  methods: {
    limparErros() {
      this.errors = {
        nome: '',
        categoria: '',
        preco: '',
        descricao: '',
        ordem: '',
        imagem: '',
        geral: ''
      }

      this.mensagemSucesso = ''
    },

    handleImageUpload(event) {
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
      this.imagemPreview = URL.createObjectURL(file)
    },

    validarPrato() {
      this.limparErros()

      let valido = true
      const nome = this.form.nome.trim()
      const categoria = this.form.categoria.trim()
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

      if (!categoria) {
        this.errors.categoria = 'A categoria é obrigatória.'
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

    salvarPrato() {
      const id = Number(this.$route.params.id)

      const pratoExiste = this.pratos.some(prato => prato.id === id)

      if (!pratoExiste) {
        this.errors.geral = 'Prato não encontrado.'
        return
      }

      if (!this.validarPrato()) return

      const pratosAtualizados = this.pratos.map(prato => {
        if (prato.id === id) {
          return {
            ...prato,
            name: this.form.nome,
            nome: this.form.nome,
            category: this.form.categoria,
            categoria: this.form.categoria,
            price: this.form.preco,
            preco: this.form.preco,
            descricao: this.form.descricao,
            image: this.imagemPreview,
            imagem: this.imagemPreview,
            active: this.form.ativo,
            ativo: this.form.ativo,
            destaque: this.form.destaque,
            ordem: this.form.ordem,
            observacoes: this.form.observacoes
          }
        }

        return prato
      })

      salvarPratos(pratosAtualizados)

      this.mensagemSucesso = 'Prato atualizado com sucesso.'

      setTimeout(() => {
        this.$router.push('/dashboard/pratos')
      }, 1000)
    }
  }
}
</script>

<style scoped>
.editar-prato-page {
  max-width: 760px;
  margin: 50px auto;
}

.page-header h1 {
  font-size: 40px;
  margin-bottom: 4px;
  padding: 20px;
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
  .editar-prato-page {
    margin: 30px 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

.preview-img {
  width: 76px;
  height: 76px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  display: block;
}

.preview-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-salvar {
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

.btn-salvar img {
  width: 20px;
  height: 20px;
}

.input-error {
  border-color: #d62d2d !important;
}

.erro {
  color: #d62d2d;
  font-size: 13px;
  margin-top: 6px;
}

.erro-geral {
  background: #ffe8e8;
  border: 1px solid #f5b5b5;
  color: #d62d2d;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 18px;
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