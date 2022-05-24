let modal = null
let modal_item = null
let btnLogar = null
let btnAdicionar = null

const arrayIngredientes = []

onload = async () => {
    modal = new bootstrap.Modal(document.getElementById('loginModal'))
    modal_item = new bootstrap.Modal(document.getElementById('div_item'))
    btnAdicionar = document.getElementById("adc_ingrediente")

/*
    const login = document.getElementById("login")
    login.addEventListener('click', () => {
        Formulario() 
      })

    const item = document.getElementById("item")
    item.addEventListener('click', () => {
        cadastra_item()
      })
*/
    btnAdicionar.addEventListener('click', async () => {
      const listaIngrediente = document.getElementById('ingrediente').value;
      const item = document.getElementById('item').value

      arrayIngredientes.push(listaIngrediente)

     /* 
      const body = new FormData()
      body.append('item', item)
      body.append('ingrediente', arrayIngredientes)

      const response = await fetch(``){
        method: "POST",
        body
      }
      const itens = await response.json()
      */

    })

}
const preencheFormulario = (id = "", nome = "", email = "", senha = "") => {
    const nomeInput = document.getElementById('nome')
    const emailInput = document.getElementById('email')
    const senhaInput = document.getElementById('senha')
    const idInput = document.getElementById('id')

    nomeInput.value = nome
    emailInput.value = email
    senhaInput.value = senha
    idInput.value = id
}

const cadastra_item = (id_item = "", item = "", arrayIngredientes = ""/*??*/) =>{
  const itemInput = document.getElementById('item')
  const ingredientesInput = document.getElementById('ingrediente')
  const id_itemInput = document.getElementById('id_item')

  itemInput.value = item
  ingredientesInput.value = arrayIngredientes //?
  id_itemInput.value = id_item

  //segue a mesma logica de antes
}