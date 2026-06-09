<template>
  <div class="personalizar-container">

    <div class="header">
      <h1>Personalizar cardápio</h1>
      <p>Configure a identidade visual do seu cardápio</p>
    </div>

    <div class="content-grid">

      <!-- LADO ESQUERDO -->
      <div class="main-content">

        <!-- LOGO -->
        <div class="card">
          <h2>Logo do restaurante</h2>

          <div class="upload-area">
            <div class="upload-box">
              <span><img src="../assets/Download.svg" alt="Download"></span>
            </div>

            <div class="upload-info">
              <button>Escolher logo</button>

              <p>PNG ou SVG até 2MB</p>
              <p>Recomendado: 512x512px</p>
            </div>
          </div>
        </div>

        <!-- CORES -->
        <div class="card">
          <h2>Cores da marca</h2>

          <div class="cores-grid">

            <div>
              <label>Cor primária</label>

              <div class="color-input">
                <div
                  class="preview"
                  :style="{ background: corPrimaria }"
                ></div>

                <input
                  v-model="corPrimaria"
                  type="text"
                />
              </div>

              <small>Usadas em botões e destaques</small>
            </div>

            <div>
              <label>Cor secundária</label>

              <div class="color-input">
                <div
                  class="preview"
                  :style="{ background: corSecundaria }"
                ></div>

                <input
                  v-model="corSecundaria"
                  type="text"
                />
              </div>

              <small>Usadas em cabeçalhos e textos</small>
            </div>

          </div>
        </div>

        <!-- BANNER -->
        <div class="card">
          <h2>Banner do cardápio</h2>

          <div class="banner-upload">
            <span><img src="../assets/Download.svg" alt="Upload"></span>

            <p>Banner opcional para o topo do cardápio</p>
          </div>

          <button class="btn-banner">
            Adicionar banner
          </button>

          <small>
            JPG ou PNG até 5MB • Recomendado: 1920x400px
          </small>
        </div>

        <div class="footer-action">
          <button class="btn-salvar">
            Salvar alterações
          </button>
        </div>

      </div>

      <!-- SIDEBAR DIREITA -->
      <div class="sidebar">

        <div class="card">
          <h2>Orientações</h2>

          <ul class="orientacoes">
            <li><img src="../assets/Corretoverde.svg" alt="Verde"> Use cores que representem sua marca</li>
            <li><img src="../assets/Corretoverde.svg" alt="Verde"> Logo em alta resolução garante boa visualização</li>
            <li><img src="../assets/Corretoverde.svg" alt="Verde"> Banner é opcional mas cria uma ótima primeira impressão</li>
            <li><img src="../assets/Corretoverde.svg" alt="Verde"> Teste no preview antes de publicar</li>
          </ul>
        </div>

        <div class="card">
          <h2>Pre-visualização de cores</h2>

          <div
            class="preview-card"
            :style="{ background: corPrimaria }"
          >
            <strong>Cor primária</strong>
            <span>Botões e destaques</span>
          </div>

          <div
            class="preview-card"
            :style="{ background: corSecundaria }"
          >
            <strong>Cor secundária</strong>
            <span>Cabeçalhos e textos</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
  <script>
  export default {
      name: 'PersonalizacaoPage'
    }
  </script>

<script setup>
import { ref } from 'vue'

const corPrimaria = ref('#1400C7')
const corSecundaria = ref('#39A300')
</script>

<style scoped>
.personalizar-container {
  padding: 30px;
  background: #f8f8f8;
  min-height: 100vh;
}

.header h1 {
  font-size: 40px;
  margin-bottom: 8px;
}

.header p {
  color: #777;
}

.content-grid {
  margin-top: 25px;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid #e6e6e6;
}

.card h2 {
  margin-bottom: 20px;
}

.upload-area {
  display: flex;
  gap: 20px;
  align-items: center;
}

.upload-box {
  width: 120px;
  height: 120px;
  border: 2px dashed #cfcfcf;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.upload-info button,
.btn-banner {
  border: 1px solid #ccc;
  background: white;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
}

.cores-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.color-input {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.preview {
  width: 60px;
  height: 60px;
  border-radius: 10px;
}

.color-input input {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 12px;
}

.banner-upload {
  height: 180px;
  border: 2px dashed #cfcfcf;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.orientacoes {
  list-style: none;
  padding: 0;
}

.orientacoes li {
  margin-bottom: 15px;
}

.preview-card {
  color: white;
  padding: 18px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.preview-card strong {
  display: block;
}

.footer-action {
  display: flex;
  justify-content: flex-end;
}

.btn-salvar {
  background: #ef2b2d;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
}
</style>