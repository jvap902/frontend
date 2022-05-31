const frontendUrl = '//localhost/cardapio_ru/frontend/'
const publicUrl = `${frontendUrl}publico/index.php`
const privateUrl = `${frontendUrl}privado/index.php`

const logout = (redirect = true) => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    if (redirect)
        location.href=publicUrl
}