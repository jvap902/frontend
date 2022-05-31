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


    //localStorage.setItem('credentials', token); Isso seta as credenciais

    const credentials = localStorage.getItem('credentials');
    var headers = { "Authorization" : `Bearer ${credentials}` }; //localstorage js (google)

    const response = await fetch(/*baseurl*/`../../pw3-cardapio_ru-backend/autenticar.php`, {
      method: "POST",
      body,
      headers
    })
    const data = await response.json();

    if (data.error) {
      document.getElementById('alert').classList.toggle('d-none')
      setTimeout(() => {
        document.getElementById('alert').classList.toggle('d-none')
      }, 2000)
      logout(false)
    }else {
      const {token, usuario} = data
      localStorage.setItem('token', token)
      localStorage.setItem('usuario', JSON.stringify(usuario))
      location.href="//localhost/cardapio_ru/frontend/privado/index.php";
    }
  })
  

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