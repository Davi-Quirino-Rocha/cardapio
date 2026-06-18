<template>
  <div class="editar-prato-page">
    <div class="page-header">
      <h1>Editar prato</h1>
    </div>

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
          </div>
        </div>

        <div class="form-group">
          <label>Nome do prato</label>
          <input v-model="form.nome" type="text" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Categoria</label>
            <input v-model="form.categoria" type="text" />
          </div>

          <div class="form-group">
            <label>Preço</label>
            <input v-model="form.preco" type="text" />
          </div>
        </div>

        <div class="form-group">
          <label>Descrição</label>
          <textarea v-model="form.descricao" maxlength="500"></textarea>
          <small>Máximo 500 caracteres</small>
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
          <input v-model="form.ordem" type="number" />
          <small>Pratos com menor número aparecem primeiro</small>
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
export default {
  name: 'EditarPratoPage',

  data() {
    return {
      imagemPreview: '',

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

      pratos: [
        {
          id: 1,
          name: 'Carpaccio de salmão',
          category: 'Entradas',
          price: '99,99',
          image: require('@/assets/Carpaccio.svg')
        },
        {
          id: 2,
          name: 'Panna cotta',
          category: 'Sobremesas',
          price: '99,99',
          image: require('@/assets/Panna cotta.svg')
        },
        {
          id: 3,
          name: 'Espaguete à carbonara',
          category: 'Massas',
          price: '99,99',
          image: require('@/assets/espaguete.svg')
        },
        {
          id: 4,
          name: 'Picanha na brasa',
          category: 'Carnes',
          price: '99,99',
          image: require('@/assets/Picanha.svg')
        },
        {
          id: 5,
          name: 'Bruschetta tradicional',
          category: 'Entradas',
          price: '99,99',
          image: require('@/assets/Bruschetta.svg')
        },
        {
          id: 6,
          name: 'Filé mignon',
          category: 'Carnes',
          price: '99,99',
          image: require('@/assets/File mignon.svg')
        }
      ]
    }
  },

  mounted() {
    const id = Number(this.$route.params.id)

    const pratoEncontrado = this.pratos.find((prato) => prato.id === id)

    if (pratoEncontrado) {
      this.form.nome = pratoEncontrado.name
      this.form.categoria = pratoEncontrado.category
      this.form.preco = pratoEncontrado.price
      this.imagemPreview = pratoEncontrado.image
    }
  },

  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]

      if (!file) return

      this.imagemPreview = URL.createObjectURL(file)
    },

    salvarPrato() {
      console.log('Prato salvo:', this.form)
      this.$router.push('/dashboard/pratos')
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
  .novo-prato-page {
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
</style>