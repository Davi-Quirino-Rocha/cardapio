<template>
  <div class="reset-page">
    <div class="reset-card">
      <h1>Redefinir senha</h1>
      <p>Crie uma nova senha para sua conta</p>

      <p v-if="errors.token" class="erro-geral">
        {{ errors.token }}
      </p>

      <form @submit.prevent="redefinirSenha">
        <label>Nova senha</label>
        <input
          v-model="novaSenha"
          type="password"
          placeholder="Crie uma senha forte"
          :class="{ 'input-error': errors.novaSenha }"
        />
        <span v-if="errors.novaSenha" class="erro">
          {{ errors.novaSenha }}
        </span>

        <label>Confirmar nova senha</label>
        <input
          v-model="confirmarSenha"
          type="password"
          placeholder="Digite sua senha novamente"
          :class="{ 'input-error': errors.confirmarSenha }"
        />
        <span v-if="errors.confirmarSenha" class="erro">
          {{ errors.confirmarSenha }}
        </span>

        <p v-if="mensagemSucesso" class="sucesso">
          {{ mensagemSucesso }}
        </p>

        <button type="submit">Redefinir senha</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RedefinirSenhaPage',

  data() {
    return {
      novaSenha: '',
      confirmarSenha: '',
      mensagemSucesso: '',
      errors: {
        novaSenha: '',
        confirmarSenha: '',
        token: ''
      }
    }
  },

  methods: {
    limparErros() {
      this.errors = {
        novaSenha: '',
        confirmarSenha: '',
        token: ''
      }

      this.mensagemSucesso = ''
    },

    validarToken() {
      /*
        Simulação do UC004:
        token inválido ou expirado.

        Para testar:
        /redefinir-senha?token=valido
      */

      const token = this.$route.query.token

      if (!token) {
        this.errors.token = 'Link de recuperação inválido.'
        return false
      }

      if (token !== 'valido') {
        this.errors.token = 'Link de recuperação expirado ou inválido.'
        return false
      }

      return true
    },

    validarSenha() {
      this.limparErros()

      let valido = true

      if (!this.validarToken()) {
        valido = false
      }

      if (!this.novaSenha.trim()) {
        this.errors.novaSenha = 'A nova senha é obrigatória.'
        valido = false
      } else if (this.novaSenha.length < 6) {
        this.errors.novaSenha = 'A senha deve ter no mínimo 6 caracteres.'
        valido = false
      } else if (!/[a-zA-Z]/.test(this.novaSenha) || !/[0-9]/.test(this.novaSenha)) {
        this.errors.novaSenha = 'A senha deve conter letras e números.'
        valido = false
      }

      if (!this.confirmarSenha.trim()) {
        this.errors.confirmarSenha = 'A confirmação de senha é obrigatória.'
        valido = false
      } else if (this.novaSenha !== this.confirmarSenha) {
        this.errors.confirmarSenha = 'As senhas não conferem.'
        valido = false
      }

      return valido
    },

    redefinirSenha() {
      if (!this.validarSenha()) return

      this.mensagemSucesso = 'Senha redefinida com sucesso.'

      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    }
  }
}
</script>

<style scoped>
.reset-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe6e6 0%, #ffffff 45%, #e8f2ff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.reset-card {
  width: 520px;
  min-height: 380px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid #777;
  border-radius: 18px;
  padding: 72px 85px;
}

.reset-card h1 {
  font-size: 34px;
  font-weight: 800;
  color: #111;
  text-align: center;
  margin-bottom: 10px;
}

.reset-card p {
  text-align: center;
  font-size: 16px;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px;
  margin-bottom: 8px;
}

input {
  height: 38px;
  border: 1.5px solid #ff2020;
  border-radius: 13px;
  padding: 0 14px;
  outline: none;
  margin-bottom: 8px;
}

input::placeholder {
  color: #999;
}

.input-error {
  border-color: #d62d2d;
}

.erro {
  color: #d62d2d;
  font-size: 13px;
  margin-bottom: 18px;
}

.erro-geral {
  color: #d62d2d;
  background: #ffe8e8;
  border: 1px solid #f5b5b5;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 20px !important;
}

.sucesso {
  color: #28a745;
  font-size: 14px;
  margin: 10px 0 18px !important;
}

button {
  background: #ef2020;
  color: white;
  border: none;
  border-radius: 10px;
  height: 42px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #d91a1a;
}

@media (max-width: 600px) {
  .reset-card {
    width: calc(100% - 40px);
    padding: 50px 30px;
  }
}
</style>