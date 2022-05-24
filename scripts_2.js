let modal_item = null
let btnAdicionar = null
let listaIngrediente = null

const arrayIngredientes = []

onload = () => {
    modal_item = new bootstrap.Modal(document.getElementById('div_item'))
    btnSalvarItem = document.getElementById('salvar')
    btnAdicionarIngrediente = document.getElementById("adc_ingrediente")

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

const cadastra_item = (id_item = "", item = "", arrayIngredientes = ""/*??*/) =>{
  const itemInput = document.getElementById('item')
  const ingredientesInput = document.getElementById('ingrediente')
  const id_itemInput = document.getElementById('id_item')

  itemInput.value = item
  ingredientesInput.value = arrayIngredientes //?
  id_itemInput.value = id_item
}