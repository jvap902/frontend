let modal = null
let modal_item = null
let btnLogar = null

onload = async () => {
    modal = new bootstrap.Modal(document.getElementById('exampleModal'))
    modal_item = new bootstrap.Modal(document.getElementById('div_item'))

    const login = document.getElementById("login")
    login.addEventListener('click', () => {
        Formulario()
      })

    const item = document.getElementById("item")
    item.addEventListener('click', () => {
        cadastra_item()
      })

  /*btnLogar = document.getElementById("logar")

    btnLogar.addEventListener("click", async () => {
      const nome = document.getElementById("nome").value
      const email = document.getElementById("email").value
      const senha = document.getElementById("senha").value

      const body = new FormData()
      body.append('nome', nome)
      body.append('email', email)
      body.append('senha', senha)
      })*/
}
const Formulario = (id = "", nome = "", email = "", senha = "") => {
    const nomeInput = document.getElementById('nome')
    const emailInput = document.getElementById('email')
    const senhaInput = document.getElementById('senha')
    const idInput = document.getElementById('id')

    nomeInput.value = nome
    emailInput.value = email
    senhaInput.value = senha
    idInput.value = id
}

const cadastra_item = (id_item = "", item = "", ingredientes = "") =>{
  const itemInput = document.getElementById('item')
  const ingredientesInput = document.getElementById('ingrediente')
  const id_itemInput = document.getElementById('id_item')

  itemInput.value = item
  ingredientesInput.value = ingredientes
  id_itemInput.value = id_item

  //segue a mesma logica de antes
}