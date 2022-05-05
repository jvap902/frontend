let modal = null

onload = async () => {
    modal = new bootstrap.Modal(document.getElementById('exampleModal'))

    const login = document.getElementById("login")
    login.addEventListener('click', () => {
      Formulario()  
    })
}
const Formulario = (/*id = "", */email = "", senha = "") => {
    const emailInput = document.getElementById('email')
    const senhaInput = document.getElementById('senha')
    //const idInput = document.getElementById('id')

    emailInput.value = email
    senhaInput.value = senha
    //idInput.value = id
}