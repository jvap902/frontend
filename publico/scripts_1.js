//publico
let modal = null
let modal_item = null
let btnLogar = null
let btnAdicionar = null
let listaIngrediente = null

const arrayIngredientes = []
let semanaAtual = null
let cardapio

onload = async () => {
    modal = new bootstrap.Modal(document.getElementById('loginModal'))
    btnLogar = document.getElementById("logar")

    const semanaPassada = document.getElementById('prevSemana')
    semanaPassada.addEventListener('click', async () =>{ 
      if (!semanaAtual){
        semanaAtual = moment().subtract(moment().day()-1, 'days') 
      }
      
      
      semanaAtual.subtract('1', 'week')
      
      await montaCardapio(semanaAtual)
    })

    const proximaSemana = document.getElementById('nextSemana')
    proximaSemana.addEventListener('click', async () =>{ 
      if (!semanaAtual){
        semanaAtual = moment().subtract(moment().day()-1, 'days') 
      }
      
      
      semanaAtual.add('1', 'week')
      
      await montaCardapio(semanaAtual)
    })


    //const response = await fetch('http://localhost/cardapio_ru/pw3-cardapio_ru-backend/')
  //const cardapio = await response.json();

    cardapio = {
      CAFE: [{data: '2022-06-06', ingredientes: [{nome: 'Feijão'},{nome: 'Farinha'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}],
      ALMOCO: [{data: '2022-05-30', ingredientes: [{nome: 'Feijão'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}],
      JANTA: [{data: '2022-05-30', ingredientes: [{nome: 'Feijão'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}],
    }

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

    //const credentials = localStorage.getItem('credentials');
    //var headers = { "Authorization" : `Bearer ${credentials}` }; //localstorage js (google)

    const response = await fetch(/*baseurl*/`../../pw3-cardapio_ru-backend/autenticar.php`, {
      method: "POST",
      body
      //headers
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
  

  const hoje = moment().subtract(moment().day()-1, 'days') 
  await montaCardapio(hoje)
}

//cardapio.filter('janta').forEach(<td></td>)

const item = (id_item = "", item = "", ingredientes = "") =>{
  const itemInput = document.getElementById('item')
  const ingredientesInput = document.getElementById('ingrediente')
  const id_itemInput = document.getElementById('id_item')

  itemInput.value = item
  ingredientesInput.value = ingredientes
  id_itemInput.value = id_item

  //segue a mesma logica de antes
}




const montaCardapio = async ($segunda) => {
  //const credentials = localStorage.getItem('credentials');
  //var headers = { "Authorization" : `Bearer ${credentials}` };
  

  //console.log(data)

  

  const datas = []
  

  
  const ini = $segunda.clone()
  for(let i = 0; i < 5; i++){
    datas.push(ini.format('YYYY-MM-DD'))
    ini.add(1, 'day')
  }

  

  

  const {CAFE, ALMOCO, JANTA } = cardapio

  montaCabecalho(datas)
  const tbody = document.getElementById('tbody')
  tbody.innerHTML = ""

  montaLinha('Café da manhã', CAFE, datas) 
  montaLinha('Almoço', ALMOCO, datas) 
  montaLinha('Jantar', JANTA, datas) 

} 

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