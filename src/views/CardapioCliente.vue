<template>
  <main class="pagina-cardapio">
    <section class="info-restaurante">
      <img src="../assets/imgRestaurante.svg" class="logo" />

      <h1>Restaurante Don Giovanni</h1>
      <p>Cozinha italiana tradicional com toques contemporâneos</p>

      <div class="infos">
        <span>Rua dos pinheiros, 123 - Pinheiros São Paulo - SP</span>
        <span>(11) 3456-4673</span>
        <span>Ter-Dom: 12h-15h e 19h-23h</span>
      </div>

      <hr />

      <div class="redes">
        <span>📷 @dongiovanni</span>
        <span>● dongiovanni</span>
        <span>www.dongiovanni.com.br</span>
      </div>
    </section>

    <nav class="categorias">
      <button 
        v-for="categoria in categorias"
        :key="categoria"
        :class="{ ativo: categoriaSelecionada === categoria }"
        @click="categoriaSelecionada = categoria"
      >
        {{ categoria }}
      </button>
    </nav>

    <section class="lista-pratos">
      <div 
        v-for="prato in pratosFiltrados" 
        :key="prato.id"
        class="card-prato"
        @click="abrirPrato(prato)"
      >
        <img :src="prato.imagem" :alt="prato.nome" />

        <div class="conteudo-card">
          <h2>{{ prato.nome }}</h2>
          <p>{{ formatarPreco(prato.preco) }}</p>
        </div>
      </div>
    </section>

    <div v-if="pratoSelecionado" class="overlay" @click="fecharPrato">
      <div class="modal-prato" @click.stop>
        <div class="modal-esquerda">
          <img :src="pratoSelecionado.imagem" :alt="pratoSelecionado.nome" />
          <h2>{{ pratoSelecionado.nome }}</h2>
          <p>{{ formatarPreco(pratoSelecionado.preco) }}</p>
        </div>

        <div class="modal-direita">
          <h2>Descrição do prato:</h2>
          <p>{{ pratoSelecionado.descricao || 'Descrição não cadastrada.' }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "CardapioCliente",

  data() {
    return {
      categoriaSelecionada: "Entradas",
      pratoSelecionado: null,
      categorias: ["Entradas", "Massas", "Carnes", "Sobremesas"],
      pratos: []
    };
  },

  mounted() {
    const dadosSalvos = localStorage.getItem("cardapioPublico");

    if (dadosSalvos) {
      const cardapio = JSON.parse(dadosSalvos);

      this.categorias = cardapio.categorias || [];

      this.pratos = (cardapio.pratos || []).map((prato) => ({
        ...prato,
        id: prato.id,
        imagem: prato.imagem || prato.image,
        nome: prato.nome || prato.name,
        preco: prato.preco || prato.price,
        categoria: prato.categoria || prato.category,
        descricao: prato.descricao || "Descrição não cadastrada."
      }));

      if (this.categorias.length > 0) {
        this.categoriaSelecionada = this.categorias[0];
      }
    }
  },

  computed: {
    pratosFiltrados() {
      return this.pratos.filter((prato) => {
        return prato.categoria === this.categoriaSelecionada;
      });
    }
  },

  methods: {
    abrirPrato(prato) {
      this.pratoSelecionado = prato;
    },

    fecharPrato() {
      this.pratoSelecionado = null;
    },

    formatarPreco(preco) {
      if (!preco) return 'R$ 0,00'
      return preco.includes('R$') ? preco : `R$ ${preco}`
    }
  }
};
</script>

<style scoped>
.pagina-cardapio {
  min-height: 100vh;
  background: #f7f7f7;
  padding: 35px 70px;
  font-family: "Poppins", sans-serif;
}

.info-restaurante {
  background: white;
  border-radius: 14px;
  text-align: center;
  padding: 15px 90px 35px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);
}

.logo {
  width: 130px;
}

.info-restaurante h1 {
  font-size: 34px;
  margin: 5px 0;
}

.info-restaurante p,
.info-restaurante span {
  color: #666;
}

.infos,
.redes {
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  font-size: 18px;
}

.categorias {
  background: white;
  margin: 25px 0;
  border-radius: 12px;
  padding: 5px 90px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.categorias button {
  border: none;
  background: transparent;
  font-size: 28px;
  font-weight: 700;
  color: #666;
  padding: 10px 60px;
  border-radius: 12px;
  cursor: pointer;
}

.categorias button.ativo {
  background: red;
  color: white;
}

.lista-pratos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 38px;
}

.card-prato {
  background: white;
  border: 1px solid #aaa;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.card-prato img {
  width: 100%;
  height: 290px;
  object-fit: cover;
}

.conteudo-card {
  padding: 25px 14px;
}

.conteudo-card h2 {
  font-size: 28px;
  margin-bottom: 18px;
}

.conteudo-card p {
  color: #e01818;
  font-size: 22px;
  font-weight: 700;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-prato {
  width: 850px;
  background: white;
  border-radius: 12px;
  padding: 45px;
  display: flex;
  gap: 45px;
}

.modal-esquerda,
.modal-direita {
  width: 50%;
}

.modal-esquerda img {
  width: 100%;
  height: 230px;
  object-fit: cover;
  border-radius: 8px;
}

.modal-esquerda h2 {
  font-size: 32px;
  margin-top: 25px;
}

.modal-esquerda p {
  color: #e01818;
  font-size: 30px;
  font-weight: 700;
}

.modal-direita h2 {
  font-size: 30px;
}

.modal-direita p {
  font-size: 28px;
  line-height: 1.45;
}
</style>