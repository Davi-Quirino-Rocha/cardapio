const STORAGE_KEY = 'cardapio_pratos'

export function salvarPratos(pratos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pratos))
}

export function carregarPratos() {
  const dados = localStorage.getItem(STORAGE_KEY)

  if (!dados) return null

  return JSON.parse(dados)
}

export function buscarPratoPorId(id) {
  const pratos = carregarPratos() || []
  return pratos.find(prato => prato.id === Number(id))
}