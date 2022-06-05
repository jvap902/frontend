<?php


?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
    integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link type="text/css" href="..//estilo.css" rel="stylesheet" />
  <title>Cardápio RU</title>
</head>

<body>

  <nav class="navbar fixed-top">
    <div>
      <h2>Cardápio RU</h2>
    </div>
    <div class="d-flex">
        <button type="button" class="btn" id="navPesquisa" data-bs-toggle="modal" data-bs-target="#pesquisaModal">Pesquisa  <img src="https://www.iconpacks.net/icons/2/free-search-icon-2903-thumb.png" width="20" /></button>
        <button id="navLogin"  type="button"  class="btn" data-bs-toggle="modal" data-bs-target="#loginModal">
        <img src="https://moodle.bento.ifrs.edu.br/theme/image.php/academi/core/1652445467/u/f1" width="20" />  Login
        </button>
    </div>
  </nav>



  <div id="tabelas">
    <table class="table table-bordered table-hover">
      <thead id="thead">
        <tr>
          <th colspan="6" class="text-center" id="semana">Semana xxx</th>
        </tr>
      </thead>
      <tbody id="tbody">
        
      </tbody>
    </table>
  </div>
  

  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <!--Div do formulário de login-->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">Login</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div>
          <form method="POST">
            <!--formulario de login-->
            <div class="modal-body">
    <div id="alert" class="alert alert-danger d-none">Dados inválidos!</div>

              <input type="hidden" name="id" id="id" />
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" name="email" id="email" placeholder="Entre com o seu email">
              </div>
              <div class="mb-3">
                <label for="senha" class="form-label">Senha</label>
                <input type="password" class="form-control" name="senha" id="senha" placeholder="Entre com a sua senha">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              <button id="logar" type="button" class="btn btn-success">Logar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="pesquisaModal" tabindex="-1" aria-labelledby="pesquisaModalLabel" aria-hidden="true">
    <!--Div do formulário de pesquisa-->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pesquisaModalLabel">Pesquisa</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div>
          <form method="POST">
            <!--formulario de pesquisa-->
            <div class="modal-body">
              <div class="mb-3">
                <label for="data" class="form-label">Pesquise uma data</label>
                <input type="date" class="form-control" name="data" id="data" placeholder="Pesquise uma data">
              </div>
              <div class="mb-3">
                <label for="refeicao" class="form-label">Pesquise uma refeição</label>
                <select class="form-select" id='refeicao'>
                  <option selected value="0"></option>
                  <option value="1">Café da manhã</option>
                  <option value="2">Almoço</option>
                  <option value="3">Janta</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="item" class="form-label">Pesquise um item</label>
                <input type="text" class="form-control" name="item" id="item" placeholder="Pesquise um item">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              <button id="search" type="button" class="btn btn-success">Pesquisar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
    crossorigin="anonymous"></script>
    <script src="https://momentjs.com/downloads/moment.min.js"></script>
    <script src="../logout.js"></script>
  <script src="scripts_1.js"></script>
</body>
<!--tentano-->

</html>