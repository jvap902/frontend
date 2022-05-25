//publico
let modal = null
let modal_item = null
let btnLogar = null
let btnAdicionar = null
let listaIngrediente = null

const arrayIngredientes = []

onload = () => {
    modal = new bootstrap.Modal(document.getElementById('loginModal'))
    btnLogar = document.getElementById("logar")

/*
    const login = document.getElementById("login")
    login.addEventListener('click', () => {
        Formulario() 
      })

    const item = document.getElementById("item")
    item.addEventListener('click', () => {
        item()
      })
*/

  btnLogar.addEventListener('click', async () => {
    const inputEmail = document.getElementById('email').value
    const inputSenha = document.getElementById('senha').value

    const body = new FormData()
    body.append('email', inputEmail)
    body.append('senha', inputSenha)

    const response = await fetch(/*baseurl*/`autenticar.php`, {
      method: "POST",
      body
    })
    
    const login = await response.json()
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

const item = (id_item = "", item = "", ingredientes = "") =>{
  const itemInput = document.getElementById('item')
  const ingredientesInput = document.getElementById('ingrediente')
  const id_itemInput = document.getElementById('id_item')

  itemInput.value = item
  ingredientesInput.value = ingredientes
  id_itemInput.value = id_item

  //segue a mesma logica de antes
}