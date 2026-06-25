<template>
  <div class="recover-page">
    <div class="recover-wrapper">
      <div class="brand">
        <img src="../assets/Logo.svg" alt="Cardáp.io" />
        <h2>Cardáp.io</h2>
      </div>

      <h1>Recuperar senha</h1>
      <p class="subtitle">Digite seu e-mail para receber um link de recuperação</p>

      <div class="recover-card">
        <div class="email-icon">
          <img src="../assets/Email.svg" alt="Email" />
        </div>

        <label>E-mail</label>

        <input
          v-model="email"
          type="email"
          placeholder="seu@email.com"
          :class="{ 'input-error': errors.email }"
        />

        <p v-if="errors.email" class="erro">
          {{ errors.email }}
        </p>

        <p v-if="mensagemSucesso" class="sucesso">
          {{ mensagemSucesso }}
        </p>

        <button @click="enviarRecuperacao">
          Enviar link de recuperação
        </button>

        <router-link to="/login" class="back-link">
          <img src="../assets/Seta.svg" alt="Seta">
          <span>Voltar para o login</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecuperarSenhaPage',

  data() {
    return {
      email: '',
      mensagemSucesso: '',
      errors: {
        email: ''
      }
    }
  },

  methods: {
    limparErros() {
      this.errors.email = ''
      this.mensagemSucesso = ''
    },

    validarEmail() {
      this.limparErros()

      if (!this.email.trim()) {
        this.errors.email = 'O e-mail é obrigatório.'
        return false
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.errors.email = 'Informe um e-mail válido.'
        return false
      }

      return true
    },

    enviarRecuperacao() {
      if (!this.validarEmail()) return

      /*
        Simulação do FE01:
        e-mail não cadastrado.

        Quando tiver backend, essa validação vem da API.
      */

      const emailCadastrado = 'restaurante@exemplo.com'

      if (this.email !== emailCadastrado) {
        this.errors.email = 'E-mail não cadastrado.'
        return
      }

      this.mensagemSucesso = 'Link de recuperação enviado para o e-mail cadastrado.'

      setTimeout(() => {
        this.$router.push('/email-enviado')
      }, 1000)
    }
  }
}
</script>

<style scoped>
.recover-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe6e6 0%, #ffffff 45%, #e8f2ff 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 210px;
}

.recover-wrapper {
  width: 520px;
  text-align: center;
}

.brand {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.brand img {
  width: 54px;
  height: 54px;
}

.brand h2 {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
}

h1 {
  font-size: 34px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 22px;
}

.subtitle {
  color: #64748b;
  font-size: 16px;
  margin-bottom: 54px;
}

.recover-card {
  width: 100%;
  min-height: 390px;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid #bdbdbd;
  border-radius: 18px;
  padding: 72px 70px;
  text-align: left;
}

.email-icon {
  width: 38px;
  height: 38px;
  background: #d9d9d9;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.email-icon img {
  width: 24px;
  height: 24px;
}

label {
  display: block;
  font-size: 24px;
  color: #111827;
  margin-bottom: 16px;
}

input {
  width: 100%;
  height: 38px;
  border: 1px solid #777;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  margin-bottom: 8px;
  outline: none;
}

input:focus {
  border-color: #ef2020;
}

.input-error {
  border-color: #d62d2d;
}

.erro {
  color: #d62d2d;
  font-size: 13px;
  margin-bottom: 14px;
}

.sucesso {
  color: #28a745;
  font-size: 13px;
  margin-bottom: 14px;
}

button {
  width: 100%;
  height: 42px;
  background: #ff1010;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 28px;
}

button:hover {
  background: #e60000;
}

.back-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  color: #64748b;
  transition: color 0.3s;
}

.back-link img {
  width: 18px;
  height: 18px;
}

.back-link:hover {
  color: #ef2020;
}

.back-link:hover img {
  filter: invert(21%) sepia(91%) saturate(5411%)
          hue-rotate(352deg) brightness(96%)
          contrast(105%);
}

@media (max-width: 600px) {
  .recover-page {
    padding: 80px 20px;
  }

  .recover-wrapper {
    width: 100%;
  }

  .recover-card {
    padding: 45px 28px;
  }
}
</style>