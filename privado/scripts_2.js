const baseUrl = `../../pw3-cardapio_ru-backend/`
 
let btnAdicionar = null
let listaIngrediente = null
let modal_cadastra_item = null
let modal_cadastra_ingrediente = null
let modal_cadastra_nutricionista = null
let modal_cadastra_refeicao = null
let modal_altera_ingrediente = null
let modal_altera_item = null
let modal_altera_nutricionista = null
let modal_altera_refeicao = null
let modal_ingrediente = null
let modal_item = null
let modal_nutricionista = null
let modal_refeicao = null
 
const arrayIngredientes = []
const arrayItens = []
 
 
onload = () => {
    const token = localStorage.getItem('token')
    if (token === null) location.href = "../publico/index.php"
 
    //modais de listagem
    modal_ingrediente = new bootstrap.Modal(document.getElementById('div_gerenciarIngrediente'))
    modal_item = new bootstrap.Modal(document.getElementById('div_gerenciarItem'))
    modal_nutricionista = new bootstrap.Modal(document.getElementById('div_gerenciarNutricionista'))
    modal_refeicao = new bootstrap.Modal(document.getElementById('div_gerenciarRefeicao'))
    //modais de cadastro
    modal_cadastra_item = new bootstrap.Modal(document.getElementById('div_cadastraItem'))
    modal_cadastra_ingrediente = new bootstrap.Modal(document.getElementById('div_cadastraIngrediente'))
    modal_cadastra_nutricionista = new bootstrap.Modal(document.getElementById('div_cadastraNutricionista'))
    modal_cadastra_refeicao = new bootstrap.Modal(document.getElementById('div_cadastraRefeicao'))
    //modais de alteração
    modal_altera_ingerdiente = new bootstrap.Modal(document.getElementById('div_alteraIngrediente'))
    modal_altera_item = new bootstrap.Modal(document.getElementById('div_alteraItem'))
    modal_altera_refeicao = new bootstrap.Modal(document.getElementById('div_alteraRefeicao'))
    modal_altera_nutricionista = new bootstrap.Modal(document.getElementById('div_alteraNutricionista'))
    //botoes
    btnAdicionarIngrediente = document.getElementById("adc_ingrediente")
    btnLogout = document.getElementById("navLogout")
    btnAdicionarItemRefeicao = document.getElementById("adc_item")
    btnSalvarItem = document.getElementById('salvar_novoItem')
    btnSalvarRefeicao = document.getElementById("salvar_novaRefeicao")
    btnSalvarIngediente = document.getElementById("salvar_novoIngrediente")
    btnSalvarNutricionista = document.getElementById("salvar_novoNutricionista")
 
    //logout
    btnLogout.addEventListener('click', logout)
 
    //ingrediente
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
 
        modal_cadastra_ingrediente.hide()
    })

    
 
    //item
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
 
        modal_cadastra_item.hide()
    })
 
    btnAdicionarIngrediente.addEventListener('click', async () => {
      const ingrediente_input = document.getElementById('ingrediente_item')
     
      if (ingrediente_input.value !== ''){
      arrayIngredientes.push(ingrediente_input.value)
      ingrediente_input.value = ""
     
      const ul = document.getElementById('ingredientes_adc')
      ul.innerHTML = ""
      arrayIngredientes.forEach(v => {
        const li = document.createElement('LI')
        li.innerHTML = v
        ul.appendChild(li)
      })}
 
    })

    //refeição
    btnAdicionarItemRefeicao.addEventListener('click', async () => {
      const input_item_refeicao = document.getElementById('item_refeicao')
     
      if (input_item_refeicao.value !== ''){
      arrayItens.push(input_item_refeicao.value)
      input_item_refeicao.value = ""
     
      const ul = document.getElementById('itens_adc')
      ul.innerHTML = ""
      arrayItens.forEach(v => {
        const li = document.createElement('LI')
        li.innerHTML = v
        ul.appendChild(li)
      })}
 
    })
   
    btnSalvarRefeicao.addEventListener('click', async () => {
      const data = document.getElementById("data_refeicao").value
      const tipo = document.getElementById("tipoRefeicao").value
      const itens = arrayItens
      const nutricionista = document.getElementById('nutricionista_refeicao').value
      
      const body = new FormData()
        body.append('data', data)
        body.append('itens[]', itens)
        body.append('tipo', tipo)
        body.append('nutricionista', nutricionista)
        //body.append('quantidade', gramas) - colocar campo para quantidade de cada ingrediente
 
        const response = await fetch(`${baseUrl}salvarCardapio.php`, {
            method: "POST",
            body
        })

        console.log(response)
 
        modal_cadastra_refeicao.hide()
    })
 
    //nutricionista
    btnSalvarNutricionista.addEventListener('click', async ()=> {
      const nome = document.getElementById("nome_nutricionista").value
      const crn = document.getElementById("crn").value
 
      console.log(nome, crn)
 
      const body = new FormData()
        body.append('nome', nome)
        body.append('crn', crn)
 
        const response = await fetch(`${baseUrl}salvarNutricionista.php`, {
            method: "POST",
            body
        })
 
        console.log(response)
 
        modal_cadastra_nutricionista.hide()
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