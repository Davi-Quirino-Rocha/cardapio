<template>
  <div class="reset-page">
    <div class="reset-card">
      <h1>Redefinir senha</h1>
      <p>Crie uma nova senha para sua conta</p>

      <form @submit.prevent="redefinirSenha">
        <label>Nova senha</label>
        <input
          v-model="novaSenha"
          type="password"
          placeholder="Crie uma senha forte"
        />

        <label>Confirmar nova senha</label>
        <input
          v-model="confirmarSenha"
          type="password"
          placeholder="Digite sua senha novamente"
        />

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
      confirmarSenha: ''
    }
  },

  methods: {
    redefinirSenha() {
      if (this.novaSenha !== this.confirmarSenha) {
        alert('As senhas não coincidem')
        return
      }

      alert('Senha redefinida com sucesso!')
      this.$router.push('/login')
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
  margin-bottom: 58px;
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
  margin-bottom: 32px;
}

input::placeholder {
  color: #999;
}

button {
  background: #ef2020;
  color: white;
  border: none;
  border-radius: 10px;
  height: 42px;
  font-weight: 700;
  cursor: pointer;
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