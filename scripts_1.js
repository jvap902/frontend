let modal = null
let btnLogar = null

onload = async () => {
    modal = new bootstrap.Modal(document.getElementById('exampleModal'))
    btnLogar = document.getElementById("logar")

    /*btnLogar.addEventListener("click", async () => {
      const nome = document.getElementById("nome").value
      const email = document.getElementById("email").value
      const senha = document.getElementById("senha").value

      const body = new FormData()
      body.append('nome', nome)
      body.append('email', email)
      body.append('senha', senha)
      })*/

    const novo = document.getElementById("login")
    novo.addEventListener('click', () => {
        Formulario()
      })


    const login = document.getElementById("login")
    login.addEventListener('click', () => {
      Formulario()  
    })

}
const Formulario = (id = "", nome = "", email = "", senha = "") => {
    const nomeInput = document.getElementById('nome')
    const emailInput = document.getElementById('email')
    const senhaInput = document.getElementById('senha')
    const idInput = document.getElementById('id')

    nomeInput.value = nome
    emailInput.value = email
    senhaInput.value = senha
    idInput.value = id
}