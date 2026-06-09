<template>
  <div class="qr-container">

    <div class="page-header">
      <h1>QR Code do cardápio</h1>
      <p>Compartilhe o link ou baixe o QR Code para imprimir</p>
    </div>

    <div class="content-grid">

      <!-- QR CODE -->
      <div class="card qr-card">

        <div class="qr-preview">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://cardapio.dongiovanni.com.br"
            alt="QR Code"
          >
        </div>

        <button class="btn-download">
          ⬇ Baixar QR Code
        </button>

        <p class="hint">
          Imprima e cole nas mesas do seu restaurante
        </p>

      </div>

      <!-- LADO DIREITO -->
      <div class="side-content">

        <!-- LINK -->
        <div class="card">
          <h2>Link do cardápio</h2>

          <label>URL pública</label>

          <div class="url-box">
            <input
              readonly
              value="https://cardapio.dongiovanni.com.br"
            >

            <button class="copy-btn">
              📋
            </button>
          </div>

          <button class="btn-open">
            ↗ Abrir cardápio público
          </button>
        </div>

        <!-- COMO USAR -->
        <div class="card">
          <h2>Como usar</h2>

          <div class="step">
            <h3><img src="../assets/QRcode.svg" alt="QrCodeIcon"> Baixe o QR Code</h3>
            <p>Salve a imagem em alta qualidade</p>
          </div>

          <div class="step">
            <h3><img src="../assets/Impressao.svg" alt="ImpressaoIconm"> Imprima</h3>
            <p>Recomendamos tamanho A5 ou maior</p>
          </div>

          <div class="step">
            <h3><img src="../assets/Posicao.svg" alt="PosicaoIcon"> Posicione nas mesas</h3>
            <p>Clientes escaneiam e acessam o cardápio</p>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'QrCodePage'
}
</script>

<style scoped>
.qr-container {
  padding: 30px;
  width: 100%;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 42px;
  font-weight: 700;
  color: #222;
}

.page-header p {
  color: #777;
  margin-top: 6px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
}

.card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 18px;
  padding: 28px;
}

.qr-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-preview {
  border: 1px solid #dbe2ea;
  border-radius: 18px;
  padding: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.qr-preview img {
  width: 320px;
}

.btn-download {
  margin-top: 24px;
  background: #ef2020;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 28px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}

.hint {
  margin-top: 18px;
  color: #888;
}

.side-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card h2 {
  margin-bottom: 24px;
}

.url-box {
  display: flex;
  gap: 10px;
  margin: 10px 0 20px;
}

.url-box input {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 12px;
}

.copy-btn {
  width: 48px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: white;
  cursor: pointer;
}

.btn-open {
  border: 1px solid #ccc;
  background: white;
  border-radius: 10px;
  padding: 12px 16px;
  cursor: pointer;
}

.step {
  margin-bottom: 28px;
}

.step h3 {
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.step p {
  color: #666;
}
</style>