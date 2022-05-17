let modal = null
let modal_item = null
let btnLogar = null
let btnAdicionar = null

onload = async () => {

    const logar = document.getElementById("logar")
    logar.addEventListener ('click', () => {
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


//criar elementos para novas semanas conforme elas são adicionadas