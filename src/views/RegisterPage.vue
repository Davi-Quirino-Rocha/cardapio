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

      <form>

        <div class="input-group">
          <label>Nome do restaurante *</label>
          <input
            type="text"
            placeholder="Smash House"
          >
        </div>

        <div class="input-group">
          <label>E-mail *</label>
          <input
            type="email"
            placeholder="contato@smashhouse.com"
          >
        </div>

        <div class="input-group">
          <label>Senha *</label>
          <input
            type="password"
            placeholder="Crie uma senha segura"
          >
        </div>

        <div class="input-group">
          <label>Confirmar senha *</label>
          <input
            type="password"
            placeholder="Repita sua senha"
          >
        </div>

        <button>
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

</style>