const baseUrl = `../../pw3-cardapio_ru-backend/`

let modal_item = null
let btnAdicionar = null
let listaIngrediente = null

const arrayIngredientes = []
const arrayItens = []


onload = () => {
    const token = localStorage.getItem('token')
    if (token === null) location.href = "../publico/index.php"

    modal_item = new bootstrap.Modal(document.getElementById('div_item'))
    btnSalvarItem = document.getElementById('salvar')
    btnAdicionarIngrediente = document.getElementById("adc_ingrediente")
    btnLogout = document.getElementById("navLogout")
    btnAdicionarRefeicao = document.getElementById("adc_item")
    btnSalvarRefeicao = document.getElementById("salvar_refeicao")

    btnLogout.addEventListener('click', logout)

    btnAdicionarIngrediente.addEventListener('click', async () => {
      const input = document.getElementById('ingrediente')
      
      if (input.value !== ''){
      arrayIngredientes.push(input.value)
      input.value = ""
      
      const ul = document.getElementById('ingredientes_adc')
      ul.innerHTML = ""
      arrayIngredientes.forEach(v => {
        const li = document.createElement('LI')
        li.innerHTML = v
        ul.appendChild(li)
      })}

    })

    btnSalvarItem.addEventListener('click', async () => {
      const item = document.getElementById("item").value
      const ingrediente = arrayIngredientes

      const body = new FormData()
        body.append('item', item)
        body.append('ingrediente[]', ingrediente)

        const response = await fetch(`${baseUrl}salvarItens.php`, {
            method: "POST",
            body
        })
        modal_item.hide()
    })

    btnSalvarRefeicao.addEventListener('click', async () => {
      const data = document.getElementById("data").value
      const refeicao = document.getElementById("refeicao").value
      const itens = arrayItens
    })

    btnAdicionarRefeicao.addEventListener('click', async () => {
      const input = document.getElementById('item_refeicao')
      
      if (input.value !== ''){
      arrayItens.push(input.value)
      input.value = ""
      
      const ul = document.getElementById('itens_adc')
      ul.innerHTML = ""
      arrayItens.forEach(v => {
        const li = document.createElement('LI')
        li.innerHTML = v
        ul.appendChild(li)
      })}

    })

}

const cadastra_item = (id_item = "", item = "", arrayIngredientes = ""/*??*/) =>{
  const itemInput = document.getElementById('item')
  const ingredientesInput = document.getElementById('ingrediente')
  const id_itemInput = document.getElementById('id_item')

  itemInput.value = item
  ingredientesInput.value = arrayIngredientes //?
  id_itemInput.value = id_item
}