<template>
  <div class="login-container">
    <div class="login-card">

      <div class="logo-area">
        <img src="../assets/Logo.svg" alt="Logo">
        <h2>Cardáp.io</h2>
      </div>

      <h1>Entrar no sistema</h1>
      <p>Acesse sua conta para gerenciar seu cardápio</p>

      <form>

        <label>E-mail *</label>
        <input
          type="email"
          placeholder="restaurante@exemplo.com"
        />

        <label>Senha *</label>
        <input
          type="password"
          placeholder="••••••••••"
        />

        <div class="options">
          <div>
            <input type="checkbox">
            <span>Lembrar de mim</span>
          </div>

          <a href="#">Esqueceu a senha?</a>
        </div>

        <button>
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

background:linear-gradient(
135deg,
#f9e9ea,
#edf3ff
);
}

.login-card{

width:420px;

background:white;

padding:40px;

border-radius:20px;

box-shadow:
0 10px 30px rgba(0,0,0,.08);

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

margin-bottom:10px;
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

</style>