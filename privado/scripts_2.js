const baseUrl = `../../pw3-cardapio_ru-backend/`

let modal_item = null
let btnAdicionar = null
let listaIngrediente = null
let modal_ingrediente = null
let modal_nutricionista = null


const arrayIngredientes = []
const arrayItens = []


onload = () => {
    const token = localStorage.getItem('token')
    if (token === null) location.href = "../publico/index.php"

    modal_item = new bootstrap.Modal(document.getElementById('div_item'))
    modal_ingrediente = new bootstrap.Modal(document.getElementById('div_ingrediente'))
    modal_nutricionista = new bootstrap.Modal(document.getElementById('div_nutricionista'))
    btnSalvarItem = document.getElementById('salvar_item')
    btnAdicionarIngrediente = document.getElementById("adc_ingrediente")
    btnLogout = document.getElementById("navLogout")
    btnAdicionarRefeicao = document.getElementById("adc_item")
    btnSalvarRefeicao = document.getElementById("salvar_refeicao")
    btnSalvarIngediente = document.getElementById("salvar_ingrediente")
    btnSalvarNutricionista = document.getElementById("salvar_nutricionista")

    btnLogout.addEventListener('click', logout)

    btnSalvarIngediente.addEventListener('click', async () => {
      const ingrediente = document.getElementById("ingrediente").value
      const calorias = document.getElementById("calorias").value

      const body = new FormData()
        body.append('ingrediente', ingrediente)
        body.append('calorias', calorias)

        const response = await fetch(`${baseUrl}salvarIngrediente.php`, {
            method: "POST",
            body
        })

        modal_ingrediente.hide()
    })

    btnSalvarItem.addEventListener('click', async () => {
      const item = document.getElementById("item").value
      const ingrediente_item = arrayIngredientes

      const body = new FormData()
        body.append('item', item)
        body.append('ingrediente_item[]', ingrediente_item)
        //body.append('quantidade', gramas) - colocar campo para quantidade de cada ingrediente

        const response = await fetch(`${baseUrl}salvarItens.php`, {
            method: "POST",
            body
        })

        modal_item.hide()
    })

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
    
    btnSalvarRefeicao.addEventListener('click', async () => {
      const data = document.getElementById("data").value
      const refeicao = document.getElementById("refeicao").value
      const itens = arrayItens
    })

    btnSalvarNutricionista.addEventListener('click', async ()=> {
      const nome = document.getElementById("nome_nutricionista").value
      const crn = document.getElementById("crn").value

      console.log(nome_nutricionista, crn)

      const body = new FormData()
        body.append('nome', nome)
        body.append('crn', crn)

        const response = await fetch(`${baseUrl}salvarNutricionista.php`, {
            method: "POST",
            body
        })

        modal_nutricionista.hide()
    })

    //await montaCardapio()
}

const montaCardapio =   () => {
  //const response = await fetch('')
  //const data = await response.json();

  

  const datas = []
  /*const semanaPassada = moment().subtract(1, 'week')

  const prevSemana = document.getElementById('prevSemana')
  prevSemana.addEventListener('click', () => {
    console.log(semanaPassada.week())

  })*/

  const ini = moment().subtract(moment().day()-1, 'days')
  for(let i = 0; i < 5; i++){
    datas.push(ini.format('YYYY-MM-DD'))
    ini.add(1, 'day')
  }

  

  const {CAFE, ALMOCO, JANTA } = {
    CAFE: [{data: '2022-06-06', ingredientes: [{nome: 'Feijão'},{nome: 'Farinha'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}],
    ALMOCO: [{data: '2022-05-30', ingredientes: [{nome: 'Feijão'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}],
    JANTA: [{data: '2022-05-30', ingredientes: [{nome: 'Feijão'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}],
  }

  montaCabecalho(datas)

  montaLinha('Café da manhã', CAFE, datas) 
  montaLinha('Almoço', ALMOCO, datas) 
  montaLinha('Jantar', JANTA, datas) 

} 

const montaCabecalho = (datas) => {
  const thead = document.getElementById('thead')
  const tr = document.createElement('TR')
  const th = document.createElement('TH')
  th.innerHTML = "Tipo de refeição"
  tr.appendChild(th)
  datas.forEach(data => {
    const th = document.createElement('TH')
    if (data === moment().format('YYYY-MM-DD'))
      th.style.backgroundColor = '#dedede'
    th.innerHTML = `${moment(data).format('DD/MM/YYYY')}`
    tr.appendChild(th)
  })
  thead.appendChild(tr)
}

const montaLinha = (label, linha, datas) => {
  const tbody = document.getElementById('tbody')
  const tr = document.createElement('TR')
  const td = document.createElement('TD')
  td.innerHTML = label
  tr.appendChild(td)
  datas.forEach(d => {
    const td = document.createElement('TD')
    if (d === moment().format('YYYY-MM-DD'))
      td.style.backgroundColor = '#dedede'
    const hoje = linha.find(l => l.data === d)
    let ingredientes = []
    if (hoje) ingredientes = hoje.ingredientes
    td.innerHTML = `<ul>${ingredientes.reduce((prev, {nome}) => {
      return `${prev}<li>${nome}</li>`
    }, "")}</ul>`
    tr.appendChild(td)
  })
  
  tbody.appendChild(tr)
}

// const cadastra_item = (id_item = "", item = "", arrayIngredientes = ""/*??*/) =>{
//   const itemInput = document.getElementById('item')
//   const ingredientesInput = document.getElementById('ingrediente_item')
//   const id_itemInput = document.getElementById('id_item')

//   itemInput.value = item
//   ingredientesInput.value = arrayIngredientes //?
//   id_itemInput.value = id_item
// }