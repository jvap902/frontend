//publico
let modal = null
let modal_item = null
let btnLogar = null
let btnAdicionar = null
let listaIngrediente = null

const arrayIngredientes = []
let semanaAtual = null
let cardapio
let teste

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
  

    const response = await fetch('//localhost/arquivosphp/cardapio_ru/pw3-cardapio_ru-backend/cardapios/')
    const cardapio = await response.json();
    
    console.log(cardapio)

      /* const formatado = {
      CAFE: [],
      ALMOCO: [],
      JANTA: []
    }  */

      /* cardapio.forEach(({tipo, data, nutricionista}) => {
      switch(tipo){
        case "CAFE":    cardapioFormado.CAFE.push({data, ingredientes:[{nome:'feijão'}], nutricionista}); break;
        case "ALMOCO":    formatado.ALMOCO.push({data , itens, nutricionista}); break;
        case "JANTA":    formatado.JANTA.push({data , itens, nutricionista}); break;
      }
    })      
 */

     

       cardapioFormado = {
      CAFE: cardapio.CAFE,
      ALMOCO: [{data: '2022-05-30', ingredientes: [{nome: 'Feijão'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}],
      JANTA: [{data: '2022-05-30', ingredientes: [{nome: 'Feijão'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}, {data: '2022-06-02', ingredientes: [{nome: 'Arroz'}]}],
    }   

      

  btnLogar.addEventListener('click', async () => {
    const inputEmail = document.getElementById('email').value
    const inputSenha = document.getElementById('senha').value

    const body = new FormData()
    body.append('email', inputEmail)
    body.append('senha', inputSenha)

    const response = await fetch(`../../pw3-cardapio_ru-backend/autenticar.php`, {
      method: "POST",
      body
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
      location.href="//localhost/arquivosphp/cardapio_ru/frontend/privado/index.php";
    }
  })
  

  const hoje = moment().subtract(moment().day()-1, 'days') 
  await montaCardapio(hoje)
}


 const montaCardapio = async ($segunda) => {
  const datas = []
  
  const ini = $segunda.clone()
  for(let i = 0; i < 5; i++){
    datas.push(ini.format('YYYY-MM-DD'))
    ini.add(1, 'day')
  }


  const {CAFE, /* NUTRICIONISTA, */ ALMOCO, JANTA} = cardapioFormado

  console.log(cardapioFormado)

  montaCabecalho(datas)
  const tbody = document.getElementById('tbody')
  tbody.innerHTML = ""

  montaLinha('Café da manhã', CAFE, datas) 
  // montaLinha('Nutricionista', NUTRICIONISTACAFE, datas)
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
    let nutricionista
    if (hoje){ nutricionista = hoje.nutricionista
    td.innerHTML = `<ul><li>${nutricionista}</li></ul>`
    tr.appendChild(td)}
    else{
      td.innerHTML = ""
      tr.appendChild(td)
    }
  })
  
  tbody.appendChild(tr)
}
 


/* {
  ALMOCO: [
    {
      data: '2022-06-08', 
      itens: [
        {
          descricao: 'Risoto', 
          ingredientes: [
            {
              descricao: 'Arroz', 
              calorias: '100'
            }
          ]
        }
      ]
    },
    {
      data: '2022-06-09', 
      itens: [
        {
          descricao: 'Bolo', 
          ingredientes: [
            {
              descricao: 'Farinha', 
              calorias: '98'
            },
            {
              descricao: 'Leite', 
              calorias: '98'
            }
          ]
        }
      ]
    }
  ]
}

[
  {
    data: '2022-06-08',
    tipo: 'ALMOÇO',
    nutricionista: 'Maiara',
    itens: [
      {
        descricao: 'Bolo', 
        ingredientes: [
          {
            descricao: 'Farinha', 
            calorias: '98'
          },
          {
            descricao: 'Leite', 
            calorias: '98'
          }
        ]
      }
    ]
  }
]

$vetor[$d['tipo']][] = [
  'data' => $d['data'],
  'itens' => []
] */

/* const montaLinha = (label, linha, datas) => {
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
} */
