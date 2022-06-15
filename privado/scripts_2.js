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
let semanaAtual = null
let cardapio
 
 
onload = async () => {
    const token = localStorage.getItem('token')
    if (token === null) location.href = "../publico/index.php"

    //modal clonar cardápio
    modal_clona_cardapio = new bootstrap.Modal(document.getElementById('div_clonaCardapio'))
    //botao clonar cardápio
    btnClonarCardapio = document.getElementById('salvar_clonaCardapio')

    //modais de cadastro
    modal_cadastra_ingrediente = new bootstrap.Modal(document.getElementById('div_cadastraIngrediente'))
    modal_cadastra_item = new bootstrap.Modal(document.getElementById('div_cadastraItem'))
    modal_cadastra_nutricionista = new bootstrap.Modal(document.getElementById('div_cadastraNutricionista'))
    modal_cadastra_refeicao = new bootstrap.Modal(document.getElementById('div_cadastraRefeicao'))
    //modais de alteração
    modal_altera_ingrediente = new bootstrap.Modal(document.getElementById('div_alteraIngrediente'))
    modal_altera_item = new bootstrap.Modal(document.getElementById('div_alteraItem'))
    modal_altera_refeicao = new bootstrap.Modal(document.getElementById('div_alteraRefeicao'))
    modal_altera_nutricionista = new bootstrap.Modal(document.getElementById('div_alteraNutricionista'))
    //botoes
    btnAdicionarIngrediente = document.getElementById("adc_ingrediente")
    btnLogout = document.getElementById("navLogout")
    btnAdicionarItemRefeicao = document.getElementById("adc_item")
    //botoes cadastro    
    btnSalvarNovoIngediente = document.getElementById("salvar_novoIngrediente")
    btnSalvarNovoItem = document.getElementById('salvar_novoItem')
    btnSalvarNovaRefeicao = document.getElementById("salvar_novaRefeicao")
    btnSalvarNovoNutricionista = document.getElementById("salvar_novoNutricionista")
    //botoes alteracao
    btnSalvarAlteracaoIngrediente = document.getElementById('alterar_ingrediente')
    btnSalvarAlteracaoItem = document.getElementById('alterar_item')
    btnSalvarAlteracaoRefeicao = document.getElementById('alterar_refeicao')
    btnSalvarAlteracaoNutricionista = document.getElementById('alterar_nutricionista')

    //clona cardápio
    btnClonarCardapio.addEventListener('click', async () => {
      const id_cardapio = document.getElementById('id_clonaCardapio').value
      const data_clonagem = document.getElementById('cardapioNovo').value

      console.log(id_cardapio, data_clonagem)

      const body = new FormData()
      body.append('id_cardapio', id_cardapio)
      body.append('data_clonagem', data_clonagem)

      const response = await fetch(`${baseUrl}clonarCardapio.php?id=${id_cardapio}&cardapioNovo=${data_clonagem}`, {
        method: 'GET',
      })

      modal_clona_cardapio.hide()
    })
    
    //logout
    btnLogout.addEventListener('click', logout)
 
    ingrediente

    btnSalvarAlteracaoIngrediente.addEventListener('click', async () => {
      const ingrediente_lista = document.getElementById("ingrediente_lista").value
      const calorias_lista = document.getElementById("calorias_lista").value
      const id_ingrediente_lista = document.getElementById("id_ingrediente_lista").value

      console.log(ingrediente_lista, calorias_lista)
      console.log(id_ingrediente_lista)

      const body = new FormData()
      body.append('ingrediente_lista', ingrediente_lista)
      body.append('calorias_lista', calorias_lista)
      body.append('id_ingrediente_lista', id_ingrediente_lista)

      const response = await fetch(`${baseUrl}alterarIngrediente.php?id=${id_ingrediente_lista}`, {
          method: "POST",
          body
      })

      modal_altera_ingrediente.hide();
    })


    btnSalvarNovoIngediente.addEventListener('click', async () => {
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
    btnSalvarAlteracaoItem.addEventListener('click', async () => {
      const item_lista = document.getElementById("item_lista").value
      const ingrediente_item_lista = document.getElementById("ingrediente_item_lista").value
      const id_item_lista = document.getElementById("id_item_lista").value

      console.log(item_lista, ingrediente_item_lista)
      console.log(id_item_lista)

      const body = new FormData()
      body.append('item_lista', item_lista)
      body.append('ingrediente_item_lista', ingrediente_item_lista)
      body.append('id_item_lista', id_item_lista)

      const response = await fetch(`${baseUrl}alterarItem.php?id=${id_item_lista}`, {
          method: "POST",
          body
      })

      modal_altera_item.hide();
    })

    btnSalvarNovoItem.addEventListener('click', async () => {
      const item = document.getElementById("item").value
      const ingrediente_item = arrayIngredientes

      const ingrediente_item_num = ingrediente_item.map(function (x) {
        return parseInt(x, 10)
      })
 
      console.log(item, ingrediente_item_num)

      const body = new FormData()
        body.append('item', item)
        body.append('ingrediente_item_num[]', ingrediente_item_num)

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
    btnSalvarAlteracaoRefeicao.addEventListener('click', async () => {
      const refeicao_lista = document.getElementById("refeicao_lista").value
      const item_refeicao_lista = document.getElementById("item_refeicao_lista").value
      const id_refeicao_lista = document.getElementById("id_refeicao_lista").value
      
      const body = new FormData()
      body.append('refeicao_lista', refeicao_lista)
      body.append('item_refeicao_lista', item_refeicao_lista)
      body.append('id_refeicao_lista', id_refeicao_lista)

      const response = await fetch(`${baseUrl}alterarRefeicao.php?id=${id_refeicao_lista}`, {
          method: "POST",
          body
      })

      modal_altera_refeicao.hide();
    })

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
   
    btnSalvarNovaRefeicao.addEventListener('click', async () => {
      const data = document.getElementById("data_refeicao").value
      const tipo = document.getElementById("tipoRefeicao").value
      const itens = arrayItens
      const nutricionista = document.getElementById('nutricionista_refeicao').value
      
      const body = new FormData()
        body.append('data', data)
        body.append('itens[]', itens)
        body.append('tipo', tipo)
        body.append('nutricionista', nutricionista)

        const response = await fetch(`${baseUrl}salvarCardapio.php`, {
            method: "POST",
            body
        })

        console.log(response)
 
        modal_cadastra_refeicao.hide()
    })
 
    //nutricionista
    btnSalvarAlteracaoNutricionista.addEventListener('click', async () => {
      const nome_nutricionista_lista = document.getElementById("nome_nutricionista_lista").value
      const crn_lista = document.getElementById("crn_lista").value
      const id_nutricionista_lista = document.getElementById("id_nutricionista_lista").value

      console.log(nome_nutricionista_lista, crn_lista, id_nutricionista_lista)

      const body = new FormData()
      body.append('nome_nutricionista_lista', nome_nutricionista_lista)
      body.append('crn_lista', crn_lista)
      body.append('id_nutricionista_lista', id_nutricionista_lista)

      const response = await fetch(`${baseUrl}alterarNutricionista.php?id=${id_nutricionista_lista}`, {
          method: "POST",
          body
      })

      modal_altera_nutricionista.hide();
    })

    btnSalvarNovoNutricionista.addEventListener('click', async ()=> {
      const nome = document.getElementById("nome_nutricionista").value
      const crn = document.getElementById("crn").value
 
      console.log(nome, crn)
 
      const body = new FormData()
        body.append('nome_nutricionista', nome)
        body.append('crn', crn)
 
        const response = await fetch(`${baseUrl}salvarNutricionista.php`, {
            method: "POST",
            body
        })
 
        console.log(response)
 
        modal_cadastra_nutricionista.hide()
    })
 
    // const semanaPassada = document.getElementById('prevSemana')
    // semanaPassada.addEventListener('click', async () =>{ 
    //   if (!semanaAtual){
    //     semanaAtual = moment().subtract(moment().day()-1, 'days') 
    //   }
      
      
    //   semanaAtual.subtract('1', 'week')
      
    //   await montaCardapio(semanaAtual)
    // })

    // const proximaSemana = document.getElementById('nextSemana')
    // proximaSemana.addEventListener('click', async () =>{ 
    //   if (!semanaAtual){
    //     semanaAtual = moment().subtract(moment().day()-1, 'days') 
    //   }
      
      
    //   semanaAtual.add('1', 'week')
      
    //   await montaCardapio(semanaAtual)
    // })

    // cardapio = {
    //   CAFE: [{data: '2022-06-06', ingredientes: [{nome: 'Feijão'},{nome: 'Farinha'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}],
    //   ALMOCO: [{data: '2022-05-30', ingredientes: [{nome: 'Feijão'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}],
    //   JANTA: [{data: '2022-05-30', ingredientes: [{nome: 'Feijão'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}],
    // }
    
  // const hoje = moment().subtract(moment().day()-1, 'days') 
  // await montaCardapio(hoje)
}
 
// const montaCardapio = async ($segunda) => {
//   const datas = []
  
//   const ini = $segunda.clone()
//   for(let i = 0; i < 5; i++){
//     datas.push(ini.format('YYYY-MM-DD'))
//     ini.add(1, 'day')
//   }


//   const {CAFE, ALMOCO, JANTA } = cardapio

//   montaCabecalho(datas)
//   const tbody = document.getElementById('tbody')
//   tbody.innerHTML = ""

//   montaLinha('Café da manhã', CAFE, datas) 
//   montaLinha('Almoço', ALMOCO, datas) 
//   montaLinha('Jantar', JANTA, datas) 

// } 

const montaCabecalho = (datas) => {
  const thead = document.getElementById('thead')
  const filhos = thead.childNodes;
  
  filhos.forEach(f => {
    if (f.getAttribute('id') !== "fixo"){
      thead.removeChild(f)
    }
  })
  const tr = document.createElement('TR')
  const th = document.createElement('TH')
  th.innerHTML = "Tipo de refeição"
  tr.appendChild(th)
  datas.forEach(data => {
    const th = document.createElement('TH')
    if (data === moment().format('YYYY-MM-DD'))
      th.style.backgroundColor = '#C2EBC9'
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
      td.style.backgroundColor = '#C2EBC9'
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

const  criarLinha = ({id, ingrediente, calorias}) => {
  const tr = document.createElement("TR")
  tr.setAttribute('id', id)
  tr.innerHTML = `<td>${ingrediente}</td>
  <td>${calorias}</td>`

  const AlteraIngrediente = novoBotao('warning', 'pencil', () => {
      preencheFormularioIngrediente(id, ingrediente, calorias)
      btnAlterarIngrediente.style.display = 'inline'
      btnSalvarAlteracaoIngrediente.style.display = 'none'
      modal.show()
  })
  
  const DeletaIngrediente = novoBotao('danger', 'trash', async () => {
      toggleLoading()
      const response = await fetch(`${baseUrl}removerIngrediente.php?id=${id}`,{
          method: "DELETE"
      })
      await response.json()
      
      const [tbody] = document.getElementsByTagName('tbody')
      tbody.childNodes.forEach(tr=> {
          if (tr.getAttribute('id') == id) 
              tbody.removeChild(tr)
      })
      toggleLoading()
  })

  const td = document.createElement("TD")
  td.appendChild(AlteraIngrediente)
  td.appendChild(DeletaIngrediente)
  tr.appendChild(td)
  return tr;
}

const novoBotao = (color, icon, cb, label = "") => {
  const btn = document.createElement("BUTTON")
  btn.setAttribute('type','button')
  btn.setAttribute('class', `btn btn-${color} btn-sm`)
  btn.innerHTML = `<i class='fa-solid fa-${icon}'></i> ${label}`
  btn.addEventListener('click', cb)
  return btn
}