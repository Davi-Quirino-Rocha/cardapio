<template>
  <NavBar v-if="exibirLayout" />

  <router-view />

  <AppFooter v-if="exibirLayout" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import NavBar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()

// Nova lógica: Retorna TRUE apenas se o caminho for exatamente '/' (Home)
const exibirLayout = computed(() => {
  return route.path === '/'
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  width: 100%;
}
</style>