<template>
  <div class="dados-container">

    <div class="page-header">
      <h1>Dados do restaurante</h1>
      <p>Informações básicas que aparecem no cardápio público</p>
    </div>

    <!-- Informações Básicas -->
    <section class="card">
      <h2>Informações básicas</h2>

      <div class="form-group">
        <label>Nome do restaurante</label>
        <input
          type="text"
          placeholder="Ex: Restaurante Nazo"
        >
      </div>

      <div class="form-group">
        <label>Descrição</label>
        <textarea
          rows="4"
          placeholder="Conte sobre seu restaurante"
        />
        <small>Aparece no topo do cardápio público</small>
      </div>
    </section>

    <!-- Endereço -->
    <section class="card">
      <h2><img src="../assets/Local.svg" alt="LocalIcon"> Endereço</h2>

      <div class="form-group">
        <label>Endereço</label>
        <input type="text" placeholder="Rua, Número">
      </div>

      <div class="row">
        <div class="form-group">
          <label>Bairro</label>
          <input type="text" placeholder="Ex: Pinheiros">
        </div>

        <div class="form-group">
          <label>CEP</label>
          <input type="text" placeholder="00000-00">
        </div>
      </div>

      <div class="row">
        <div class="form-group city">
          <label>Cidade</label>
          <input type="text" placeholder="Ex: São Paulo">
        </div>

        <div class="form-group state">
          <label>Estado</label>
          <input type="text" placeholder="SP">
        </div>
      </div>
    </section>

    <!-- Contato -->
    <section class="card">
      <h2><img src="../assets/Telefone.svg" alt="TefeloneIcon"> Contato</h2>

      <div class="row">
        <div class="form-group">
          <label>Telefone</label>
          <input type="text" placeholder="(00) 0000-0000">
        </div>

        <div class="form-group">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="contato@restaurante.com.br"
          >
        </div>
      </div>
    </section>

    <!-- Horário -->
    <section class="card">
      <h2><img src="../assets/relogio.svg" alt="RelogioIcon"> Horário de funcionamento</h2>

      <div class="form-group">
        <label>Horários</label>
        <textarea
          rows="3"
          placeholder="Ex: Ter-Dom: 12h-15h e 19h-23h"
        />
      </div>
    </section>

    <!-- Redes -->
    <section class="card">
      <h2>Redes sociais</h2>

      <div class="form-group">
        <label>Instagram</label>
        <input type="text" placeholder="@seurestaurante">
      </div>

      <div class="form-group">
        <label>Facebook</label>
        <input type="text" placeholder="seurestaurante">
      </div>

      <div class="form-group">
        <label>Website</label>
        <input
          type="text"
          placeholder="www.seurestaurante.com.br"
        >
      </div>
    </section>

    <div class="actions">
      <button class="btn-save">
        <img src="../assets/Salvar.svg" alt=""> Salvar alterações
      </button>
    </div>

  </div>
</template>

<style scoped>
.dados-container {
  padding: 30px;
  max-width: 100%;
}

.page-header h1 {
  font-size: 38px;
  font-weight: 700;
  color: #333;
}

.page-header p {
  color: #888;
  margin-top: 6px;
  margin-bottom: 30px;
}

.card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 22px;
}

.card h2 {
  margin-bottom: 24px;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  flex: 1;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

input,
textarea {
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: #ef2020;
}

small {
  color: #999;
  margin-top: 8px;
}

.row {
  display: flex;
  gap: 20px;
}

.city {
  flex: 3;
}

.state {
  flex: 1;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-save {
  background: #ef2020;
  color: white;
  border: none;
  padding: 14px 22px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-save:hover {
  opacity: .9;
}
</style>