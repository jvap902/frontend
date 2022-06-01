<?php
 //require "../../pw3-cardapio_ru-backend/permissao.php"
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link type="text/css" href="../estilo.css" rel="stylesheet"/>
    <title>Cardápio RU</title>
</head>

<body>

<nav class="navbar fixed-top">
        <div>
        <h2>Cardápio RU</h2>
        </div>
        <div class="d-flex">
            <button type="button" class="btn" id="navPesquisa" data-bs-toggle="modal" data-bs-target="#pesquisaModal">Pesquisa  <img src="https://www.iconpacks.net/icons/2/free-search-icon-2903-thumb.png" width="20" /></button>
            <button id="navLogout"  type="button"  class="btn" data-bs-toggle="modal" data-bs-target="#logoutModal">
            <img src="https://moodle.bento.ifrs.edu.br/theme/image.php/academi/core/1652445467/u/f1" width="20" />  Logout
            </button>
        </div>
  </nav>
    
    
    <div id="tabelas">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th colspan="6" class="text-center" id="semana">Semana xxx</th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <th ></th>
          <th class="text-center" id="thSegunda">Dia xxxx/xx/xxxx</th>
          <th class="text-center" id="thTerca">Dia xx/xx/xxxx</th>
          <th class="text-center" id="thQuarta">Dia xx/xx/xxxx</th>
          <th class="text-center" id="thQuinta">Dia xx/xx/xxxx</th>
          <th class="text-center" id="thSexta">Dia xx/xx/xxxx</th>
        </tr>
        <tr>
          <th scope="row" id="thCafe">Café da manhã</th>
          <td id="cafeSegunda">Pratos, pratos, pratos</td>
          <td id="cafeTerca">Pratos, pratos, pratos</td>
          <td id="cafeQuarta">Pratos, pratos, pratos</td>
          <td id="cafeQuinta">Pratos, pratos, pratos</td>
          <td id="cafeSexta">Pratos, pratos, pratos</td>
        </tr>
        <tr>
          <th scope="row" id="thAlmoco">Almoço</th>
          <td id="almocoSegunda">Pratos, pratos, pratos</td>
          <td id="almocoTerca">Pratos, pratos, pratos</td>
          <td id="almocoQuarta">Pratos, pratos, pratos</td>
          <td id="almocoQuinta">Pratos, pratos, pratos</td>
          <td id="almocoSexta">Pratos, pratos, pratos</td>
        </tr>
        <tr>
          <th scope="row" id="thJanta">Janta</th>
          <td id="jantaSegunda">Pratos, pratos, pratos</td>
          <td id="jantaTerca">Pratos, pratos, pratos</td>
          <td id="jantaQuarta">Pratos, pratos, pratos</td>
          <td id="jantaQuinta">Pratos, pratos, pratos</td>
          <td id="jantaSexta">Pratos, pratos, pratos</td>
        </tr>
      </tbody>
    </table>
  </div>

    <div> <!--div para o botao de cadastrar item-->
        <button type="button" id="btnCadastraItem" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#div_item">Cadastrar item</button>
    </div>
    <div class="modal fade" id="div_item" tabindex="-1" aria-labelledby="div_itemLabel" aria-hidden="true"> <!--Div do fomrulário de item-->
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="div_itemLabel">Cadastrar item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="../../pw3-cardapio_ru-backend/salvarItens.php">
                        <input type="hidden" id="id"/>
                        <div class="mb-3">
                            <label for="item" class="form-label">Item</label>
                            <input type="text" class="form-control" id="item" placeholder="Insira o nome do item" name="item">
                        </div>
                        <div class="mb-3">
                            <label for="ingrediente" class="form-label">Ingrediente</label>
                            <input type="text" class="form-control" id="ingrediente" placeholder="Insira um ingrediente">
                            <tr></tr>
                        </div>
                        <div class="mb-3">
                          <button type="button" class="btn btn-primary sm" id="adc_ingrediente">Adicionar ingrediente</button>
                        </div>
                    </form>
                    <ul id="ingredientes_adc">
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button id="salvar" type="button" class="btn btn-success">Salvar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="refeicaoModal" tabindex="-1" aria-labelledby="refeicaoModalLabel" aria-hidden="true">
    <!--Div do formulário de refeição-->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="refeicaoModalLabel">Refeição</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div>
          <form method="POST">
            <!--formulario de pesquisa-->
            <div class="modal-body">
              <div class="mb-3">
                <label for="data" class="form-label">Data</label>
                <input type="date" class="form-control" name="data" id="data" placeholder="Selecione uma data">
              </div>
              <div class="mb-3">
                <label for="refeicao" class="form-label">Selecione uma refeição</label>
                <select class="form-select">
                  <option selected value="0"></option>
                  <option value="1">Café da manhã</option>
                  <option value="2">Almoço</option>
                  <option value="3">Janta</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="item" class="form-label">Adicione pratos</label>
                <select class="form-select">
                  <option selected value="0"></option>
                  <option value="1">Café da manhã</option>
                  <option value="2">Almoço</option>
                  <option value="3">Janta</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              <button id="adicionar" type="button" class="btn btn-success">Adicionar</button>
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
                <select class="form-select">
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
              <button id="pesquisar" type="button" class="btn btn-success">Pesquisar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


  <div> <!--div para o botao de cadastrar nutricionista-->
        <button type="button" id="btnCadastraNutricionista" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#div_nutricionista">Cadastrar Nutricionista</button>
    </div>
    <div class="modal fade" id="div_nutricionista" tabindex="-1" aria-labelledby="div_nutricionistaLabel" aria-hidden="true"> <!--Div do formulário de nutricionistas-->
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="div_nutricionistaLabel">Cadastrar nutricionista</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="../../pw3-cardapio_ru-backend/salvarNutricionista.php">
                        <input type="hidden" id="id"/>
                        <div class="mb-3">
                            <label for="nome" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="nome" placeholder="Insira o nome da nutricionista" name="nome">
                        </div>
                        <div class="mb-3">
                            <label for="crn" class="form-label">CRN</label>
                            <input type="number" class="form-control" id="crn" placeholder="Insira o CRN da nutricionista">
                            <tr></tr>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button id="salvar" type="button" class="btn btn-success">Salvar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="../logout.js"></script>
    <script src="scripts_2.js"></script>
</body>
</html>