<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-area">
        <img src="../assets/Logo.svg" alt="Logo">
        <h2>Cardáp.io</h2>
      </div>

      <h1>Entrar no sistema</h1>
      <p>Acesse sua conta para gerenciar seu cardápio</p>

      <form @submit.prevent="handleLogin">
        <label>E-mail *</label>
        <input
          type="email"
          placeholder="restaurante@exemplo.com"
          v-model="email"
          :class="{ 'input-error': errors.email }"
        />
        <span v-if="errors.email" class="erro">
          {{ errors.email }}
        </span>

        <label>Senha *</label>
        <input
          type="password"
          placeholder="••••••••••"
          v-model="password"
          :class="{ 'input-error': errors.password }"
        />
        <span v-if="errors.password" class="erro">
          {{ errors.password }}
        </span>

        <p v-if="errors.login" class="erro-login">
          {{ errors.login }}
        </p>

        <div class="options">
          <div>
            <input type="checkbox" v-model="rememberMe">
            <span>Lembrar de mim</span>
          </div>

          <router-link to="/recuperar-senha">
            Esqueceu a senha?
          </router-link>
        </div>

        <button type="submit">
          Entrar no painel
        </button>

        <p class="register">
          Não tem uma conta?
          <router-link to="/cadastro">
            Criar Conta
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginPage',

  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,

      errors: {
        email: '',
        password: '',
        login: ''
      }
    }
  },

  methods: {
    limparErros() {
      this.errors = {
        email: '',
        password: '',
        login: ''
      }
    },

    validarLogin() {
      this.limparErros()

      let valido = true

      if (!this.email.trim()) {
        this.errors.email = 'O e-mail é obrigatório.'
        valido = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.errors.email = 'Informe um e-mail válido.'
        valido = false
      }

      if (!this.password.trim()) {
        this.errors.password = 'A senha é obrigatória.'
        valido = false
      }

      return valido
    },

    handleLogin() {
      if (!this.validarLogin()) return

      const emailCorreto = 'restaurante@exemplo.com'
      const senhaCorreta = '123456'

      if (this.email !== emailCorreto || this.password !== senhaCorreta) {
        this.errors.login = 'E-mail ou senha incorretos.'
        return
      }

      // Usuário autenticado
      localStorage.setItem('usuarioAutenticado', 'true')

      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial,sans-serif;
}

.login-container{
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background: linear-gradient(135deg, #FDDFE1 0%, #f5f5f5 50%, #D3E2FB 100%);
}

.login-card{
  width:420px;
  background:white;
  padding:40px;
  border-radius:20px;
  box-shadow:0 10px 30px rgba(0,0,0,.08);
  border:1px solid #e8e8e8;
}

.logo-area{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:10px;
  margin-bottom:25px;
}

.logo-area img{
  width:40px;
}

.logo-area h2{
  font-size:28px;
}

h1{
  text-align:center;
  font-size:34px;
  color:#1e293b;
  margin-bottom:10px;
}

p{
  text-align:center;
  color:#64748b;
  margin-bottom:30px;
}

label{
  display:block;
  margin-bottom:8px;
  font-weight:600;
  margin-top:15px;
}

input[type=email],
input[type=password]{
  width:100%;
  padding:14px;
  border-radius:12px;
  border:2px solid #ef4444;
  outline:none;
  margin-bottom:6px;
}

.input-error {
  border: 2px solid #d62d2d !important;
}

.erro {
  display:block;
  color:#d62d2d;
  font-size:13px;
  margin-bottom:8px;
}

.erro-login {
  color:#d62d2d;
  background:#ffe8e8;
  border:1px solid #f5b5b5;
  border-radius:10px;
  padding:10px;
  font-size:14px;
  margin-top:12px;
  margin-bottom:15px;
}

.options{
  display:flex;
  justify-content:space-between;
  font-size:13px;
  margin-top:10px;
  margin-bottom:25px;
}

.options div{
  display:flex;
  align-items:center;
  gap:5px;
}

.options a{
  color:red;
  text-decoration:none;
}

button{
  width:100%;
  padding:15px;
  background:#ef2020;
  border:none;
  border-radius:12px;
  color:white;
  font-size:16px;
  cursor:pointer;
  transition:.3s;
}

button:hover{
  transform:translateY(-2px);
}

.register{
  margin-top:20px;
  font-size:14px;
}

.register a{
  color:red;
  text-decoration:none;
  font-weight:bold;
}

.forgot-password {
  color: #64748b;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password:hover {
  color: #ef2020;
}
</style>