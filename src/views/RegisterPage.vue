<template>
  <div class="register-container">
    <div class="card">
      <div class="logo">
        <img src="../assets/Logo.svg" alt="logo">
        <h2>Cardáp.io</h2>
      </div>

      <h1>Criar nova conta</h1>

      <p class="subtitle">
        Comece a gerenciar seu cardápio digital agora
      </p>

      <form @submit.prevent="criarConta">
        <div class="input-group">
          <label>Nome do restaurante *</label>
          <input
            v-model="nomeRestaurante"
            type="text"
            placeholder="Smash House"
            :class="{ 'input-error': errors.nomeRestaurante }"
          >
          <p v-if="errors.nomeRestaurante" class="erro">
            {{ errors.nomeRestaurante }}
          </p>
        </div>

        <div class="input-group">
          <label>E-mail *</label>
          <input
            v-model="email"
            type="email"
            placeholder="contato@smashhouse.com"
            :class="{ 'input-error': errors.email }"
          >
          <p v-if="errors.email" class="erro">
            {{ errors.email }}
          </p>
        </div>

        <div class="input-group">
          <label>Senha *</label>
          <input
            v-model="senha"
            type="password"
            placeholder="Crie uma senha segura"
            :class="{ 'input-error': errors.senha }"
          >

          <p v-if="senha" class="status">
            {{ statusText }}
          </p>

          <p v-if="errors.senha" class="erro">
            {{ errors.senha }}
          </p>

          <div class="password-strength">
            <div
              v-for="n in 4"
              :key="n"
              class="bar"
              :class="{
                active: n <= strength,
                weak: strength <= 1,
                medium: strength > 1 && strength < 4,
                strong: strength === 4
              }"
            />
          </div>
        </div>

        <div class="input-group">
          <label>Confirmar senha *</label>
          <input
            v-model="confirmarSenha"
            type="password"
            placeholder="Repita sua senha"
            :class="{ 'input-error': errors.confirmarSenha }"
          >
          <p v-if="errors.confirmarSenha" class="erro">
            {{ errors.confirmarSenha }}
          </p>
        </div>

        <p v-if="mensagemSucesso" class="sucesso">
          {{ mensagemSucesso }}
        </p>

        <button type="submit">
          Criar conta grátis
        </button>

        <p class="login-link">
          Já tem uma conta?
          <router-link to="/login">
            Fazer login
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nomeRestaurante = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const mensagemSucesso = ref('')

const errors = ref({
  nomeRestaurante: '',
  email: '',
  senha: '',
  confirmarSenha: ''
})

const strength = computed(() => {
  if (!senha.value) return 0

  let score = 0

  if (senha.value.length >= 6) score++

  if (/[a-zA-Z]/.test(senha.value) && /[0-9]/.test(senha.value)) {
    score++
  }

  if (/[A-Z]/.test(senha.value)) {
    score++
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(senha.value)) {
    score++
  }

  return Math.min(score, 4)
})

const statusText = computed(() => {
  if (strength.value <= 1) return 'Senha fraca'
  if (strength.value <= 3) return 'Senha média'
  return 'Senha forte'
})

function limparErros() {
  errors.value = {
    nomeRestaurante: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  }

  mensagemSucesso.value = ''
}

function validarCadastro() {
  limparErros()

  let valido = true

  if (!nomeRestaurante.value.trim()) {
    errors.value.nomeRestaurante = 'O nome do restaurante é obrigatório.'
    valido = false
  } else if (nomeRestaurante.value.trim().length < 3) {
    errors.value.nomeRestaurante = 'O nome do restaurante deve ter no mínimo 3 caracteres.'
    valido = false
  }

  if (!email.value.trim()) {
    errors.value.email = 'O e-mail é obrigatório.'
    valido = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Informe um e-mail válido.'
    valido = false
  }

  if (!senha.value.trim()) {
    errors.value.senha = 'A senha é obrigatória.'
    valido = false
  } else if (senha.value.length < 6) {
    errors.value.senha = 'A senha deve ter no mínimo 6 caracteres.'
    valido = false
  } else if (strength.value <= 1) {
    errors.value.senha = 'Crie uma senha mais segura.'
    valido = false
  }

  if (!confirmarSenha.value.trim()) {
    errors.value.confirmarSenha = 'A confirmação de senha é obrigatória.'
    valido = false
  } else if (senha.value !== confirmarSenha.value) {
    errors.value.confirmarSenha = 'As senhas não conferem.'
    valido = false
  }

  return valido
}

function criarConta() {
  if (!validarCadastro()) return

  mensagemSucesso.value = 'Restaurante cadastrado com sucesso.'

  setTimeout(() => {
    router.push('/login')
  }, 1000)
}
</script>

<style scoped>
.register-container{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background: linear-gradient(135deg, #FDDFE1 0%, #f5f5f5 50%, #D3E2FB 100%);
}

.card{
  width:420px;
  background:white;
  padding:35px;
  border-radius:20px;
  box-shadow:0 0 20px rgba(0,0,0,.08);
}

.logo{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  margin-bottom:20px;
}

.logo img{
  width:40px;
}

h1{
  text-align:center;
  margin-bottom:8px;
}

.subtitle{
  text-align:center;
  color:gray;
  font-size:14px;
  margin-bottom:30px;
}

.input-group{
  display:flex;
  flex-direction:column;
  margin-bottom:18px;
}

label{
  margin-bottom:6px;
  font-size:14px;
}

input{
  padding:13px;
  border:1px solid #ddd;
  border-radius:12px;
  outline:none;
}

input:focus{
  border:1px solid #ea2323;
}

.input-error {
  border: 1px solid #d62d2d;
}

.erro {
  color: #d62d2d;
  font-size: 13px;
  margin-top: 6px;
}

.sucesso {
  color: #28a745;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
}

button{
  width:100%;
  padding:14px;
  background:#ea2323;
  color:white;
  border:none;
  border-radius:12px;
  cursor:pointer;
  margin-top:15px;
}

.login-link{
  text-align:center;
  margin-top:15px;
}

a{
  color:#ea2323;
  text-decoration:none;
}

.password-strength {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.bar {
  flex: 1;
  height: 10px;
  background: #ddd;
  border-radius: 20px;
}

.active.weak {
  background: #d62d2d;
}

.active.medium {
  background: orange;
}

.active.strong {
  background: #28a745;
}

.status {
  color:#d62d2d;
  font-size:14px;
  margin-top:8px;
}
</style>