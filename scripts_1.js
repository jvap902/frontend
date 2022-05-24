let modal = null
let modal_item = null
let btnLogar = null
let btnAdicionar = null
let listaIngrediente = null

const arrayIngredientes = []

onload = () => {
    //modal = new bootstrap.Modal(document.getElementById('loginModal'))
    modal_item = new bootstrap.Modal(document.getElementById('div_item'))
    // btnSalvarItem = document.getElementById('salvar')
    btnAdicionarIngrediente = document.getElementById("adc_ingrediente")
    // btnLogar = document.getElementById("logar")

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
    btnAdicionarIngrediente.addEventListener('click', async () => {
      const input = document.getElementById('ingrediente')
      
      arrayIngredientes.push(input.value)
      input.value = ""
      
      const ul = document.getElementById('ingredientes_adc')
      ul.innerHTML = ""
      arrayIngredientes.forEach(v => {
        const li = document.createElement('LI')
        li.innerHTML = v
        ul.appendChild(li)
      })

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