<?php
require_once "../../pw3-cardapio_ru-backend/class.DB.php";
// require_once "../../pw3-cardapio_ru-backend/permissao.php";
$database = DB::getInstance();
//$database2 = new PDO('mysql:host=localhost;dbname=ru', 'root', '');

foreach ($database->query('SELECT * FROM ingredientes') as $ingrediente) {
    $ingredientes[] = [
        'id' => $ingrediente['id'],
        'descricao' => $ingrediente['descricao'],
        'calorias' => $ingrediente['calorias'],
    ];
}
foreach ($database->query('SELECT * FROM nutricionistas') as $nutricionista) {
    $nutricionistas[] = [
        'id' => $nutricionista['id'],
        'crn' => $nutricionista['crn'],
        'nome' => $nutricionista['nome']
    ];
}
foreach ($database->query('SELECT * FROM itens') as $item) {
    $itens[] = [
        'id' => $item['id'],
        'descricao' => $item['descricao'],
        'calorias_totais' => $item['calorias_totais']
    ];
}

$consulta = $database->prepare('SELECT * FROM cardapios');
$consulta->execute();
$data = $consulta->fetchAll();
foreach ($data as $refeicao) {
    $itens = [];
    foreach($database->query('select i.id, i.descricao from itens_cardapios ic inner join itens i on ic.id_item = i.id where id_cardapio = '.$refeicao['id']) as $item){
        
        $itens[] = $item;
    }
    $refeicoes[] = [
      'id' => $refeicao['id'],
      'data' => $refeicao['data'],
      'id_nutricionista' => $refeicao['id_nutricionista'],
      'tipo' => $refeicao['tipo'],
      'itens' => $itens
    ];
}
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
    <link type="text/css" href="../estilo.css" rel="stylesheet" />
    <title>Card??pio RU | Administra????o</title>
</head>

<body>

    <nav class="navbar fixed-top">
        <div>
            <h2>Card??pio RU | Administra????o</h2>
        </div>
        <div class="d-flex">
            <!-- <button type="button" class="btn" id="navPesquisa" data-bs-toggle="modal"
                data-bs-target="#pesquisaModal">Pesquisa <img
                    src="https://www.iconpacks.net/icons/2/free-search-icon-2903-thumb.png" width="20" /></button> -->
            <button id="navLogout" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#logoutModal">
                <img src="https://moodle.bento.ifrs.edu.br/theme/image.php/academi/core/1652445467/u/f1" width="20" />
                Logout
            </button>
        </div>
    </nav>

<div id="tabelas">
    
<!-- GERENCIAR REFEI????ES  -->
<table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th colspan="6" class="text-center" id="thRefeicoes">Gerenciar refei????es</th>
          </tr>
          <tr>
            <th scope="col">Dia</th>
            <th scope="col">Tipo de refei????o</th>
            <th scope="col">ID nutricionista</th>
            <th scope="col">A????es</th>
          </tr>
        </thead>
        <tbody>
          <?php 
          if(isset($refeicoes)){
            foreach ($refeicoes as $refeicao) { ?>
              <tr>
                <td><?php echo $refeicao['data']; ?></td>
                <td>
                  <?php if($refeicao['tipo'] == 1){
                  echo "Caf?? da manh??";
                  }elseif($refeicao['tipo'] == 2){
                  echo "Almo??o";
                  }else{
                  echo "Jantar";} ?>
                </td>
                <td><?php echo $refeicao['id_nutricionista']; ?></td>
                <td>
                  <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#div_alteraRefeicao" data-refeicao="<?php echo $refeicao['id']; ?>" onClick='alterarRefeicao(<?php echo json_encode($refeicao["data"])?>, <?php echo json_encode($refeicao["tipo"])?>, <?php echo json_encode($refeicao["id_nutricionista"])?>)'>Alterar</button>
                  <a href="../../pw3-cardapio_ru-backend/removerCardapio.php?id=<?php echo $refeicao['id']; ?>" class="btn btn-outline-danger">Excluir</a>
                </td>
              </tr>
            <?php }
          } ?>
          <td colspan="6">
            <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#div_cadastraRefeicao">Cadastrar refei????o</button>
          </td>
        </tbody>
    </table>

    <!-- GERENCIAR NUTRICIONISTAS  -->
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
        <th colspan="6" class="text-center" id="thNutricionistas">Gerenciar nutricionistas</th>
        </tr>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">CRN</th>
          <th scope="col">A????es</th>
        </tr>
      </thead>
      <tbody>
              <?php  if(isset($nutricionistas)){
                  foreach($nutricionistas as $nutricionista){ ?>
                    <tr>
                    <td><?php echo $nutricionista['nome']; ?></td>
                    <td><?php echo $nutricionista['crn']; ?></td>
                    <td>
                <button type="button" class="btn btn-outline-success"  onClick='alterarNutricionista(<?php echo json_encode($nutricionista["nome"])?>, <?php echo json_encode($nutricionista["crn"])?>, <?php echo json_encode($nutricionista["id"])?>)'>Alterar</button>
                <a href="../../pw3-cardapio_ru-backend/removerNutricionista.php?id=<?php echo $nutricionista['id']; ?>" class="btn btn-outline-danger">Excluir</a>
              </td>
            </tr>
                  <?php }
              } ?>
        <td colspan="6">
          <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#div_cadastraNutricionista">Cadastrar nutricionista</button>
        </td>
    </table>

    <!-- GERENCIAR INGREDIENTES  -->
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
        <th colspan="6" class="text-center" id="thIngredientes">Gerenciar ingredientes</th>
        </tr>
        <tr>
          <th scope="col">Descri????o</th>
          <th scope="col">Calorias</th>
          <th scope="col">A????es</th>
        </tr>
      </thead>
      <tbody>
        <?php 
        if(isset($ingredientes)){
          foreach ($ingredientes as $ingrediente) { ?>
            <tr>
              <td><?php echo $ingrediente['descricao']; ?></td>
              <td><?php echo $ingrediente['calorias']; ?></td>
              <td>
                <button type="button" class="btn btn-outline-success" onClick='alterarIngrediente(<?php echo json_encode($ingrediente['descricao']); ?>, <?php echo json_encode($ingrediente['calorias']);?>, <?php echo json_encode($ingrediente['id']);?>)'>Alterar</button>
                <a href="../../pw3-cardapio_ru-backend/removerIngrediente.php?id=<?php echo $ingrediente['id']; ?>" class="btn btn-outline-danger">Excluir</a>
              </td>
            </tr>
          <?php }
         } ?>
        <td colspan="6">
          <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#div_cadastraIngrediente">Cadastrar ingrediente</button>
        </td>
      </tbody>
    </table>

     <!-- GERENCIAR ITENS  -->
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
        <th colspan="6" class="text-center" id="thItens">Gerenciar itens</th>
        </tr>
        <tr>
          <th scope="col">Descri????o</th>
          <th scope="col">Calorias</th>
          <th scope="col">A????es</th>
        </tr>
        </thead>
        <tbody>
            <?php
            if(isset($itens)){
                foreach ($itens as $item) { ?>
                    <tr>
                    <td><?php echo $item['descricao']; ?></td>
                    <td><?php echo $item['calorias_totais']; ?></td>
                    <td>
                        <button type="button" class="btn btn-outline-success" onClick='alterarItem(<?php echo json_encode($item["descricao"])?>, <?php echo json_encode($item["calorias_totais"])?>, <?php echo json_encode($item["id"])?>)'>Alterar</button>
                        <a href="../../pw3-cardapio_ru-backend/removerItens.php?id=<?php echo $item['id']; ?>" class="btn btn-outline-danger">Excluir</a>
                    </td>
                    </tr>
                <?php }
            } ?>
            <td colspan="6">
                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#div_cadastraItem">Cadastrar item</button>
            </td>
        </tbody>
    </table>

  </div>


  <!-- Modals de cadastro  -->
    <!-- CADASTRAR NUTRICIONISTA -->
    <div class="modal fade" id="div_cadastraNutricionista" tabindex="-1" aria-labelledby="div_cadastraNutricionistaLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="div_cadastraNutricionistaLabel">Cadastrar nutricionista</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form method="POST">
                        <input type="hidden" id="id_nutricionista" />
                        <div class="mb-3">
                            <label for="nome" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="nome_nutricionista"
                                placeholder="Insira o nome da nutricionista" name="nome_nutricionista">
                        </div>
                        <div class="mb-3">
                            <label for="crn" class="form-label">CRN</label>
                            <input type="number" class="form-control" id="crn" name="crn"
                                placeholder="Insira o CRN da nutricionista">
                            <tr></tr>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button id="salvar_novoNutricionista" type="button" class="btn btn-success">Salvar</button>
                </div>
            </div>
        </div>
      </div>

        <!-- CADASTRAR INGREDIENTE -->
        <div class="modal fade" id="div_cadastraIngrediente" tabindex="-1" aria-labelledby="div_cadastraIngredienteLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="div_cadastraIngredienteLabel">Cadastrar Ingrediente</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form method="POST">
                            <input type="hidden" id="id_cadastraIngrediente" />
                            <div class="mb-3">
                                <label for="ingrediente" class="form-label">Ingrediente</label>
                                <input type="text" class="form-control" id="ingrediente"
                                    placeholder="Insira o nome do Ingrediente" name="ingrediente">
                            </div>
                            <div class="mb-3">
                                <label for="calorias" class="form-label">Quantidade de calorias em 100g do
                                    ingrediente</label>
                                <input type="number" class="form-control" id="calorias"
                                    placeholder="Insira a quantidade de calorias" name="calorias">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button id="salvar_novoIngrediente" type="button" class="btn btn-success">Salvar</button>
                    </div>
                </div>
            </div>
        </div>


    <!-- CADASTRAR ITEM -->

    <div class="modal fade" id="div_cadastraItem" tabindex="-1" aria-labelledby="div_cadastraItemLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="div_cadastraItemLabel">Cadastrar Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form method="POST">
                        <input type="hidden" id="id_item" />
                        <div class="mb-3">
                            <label for="item" class="form-label">Item</label>
                            <input type="text" class="form-control" id="item" placeholder="Insira o nome do item"
                                name="item">
                        </div>
                        <div class="mb-3">
                            <label for="ingrediente" class="form-label">Ingrediente</label>
                            <select class="form-select" id="ingrediente_item" name="ingrediente_item">
                                <?php foreach ($ingredientes as $ing) {
                                echo "<option value='{$ing['id']}'>ID: {$ing['id']} - {$ing['descricao']} - {$ing['calorias']} calorias por 100g</option>}";
                            } ?>
                            </select>
                            <tr></tr>
                        </div>
                        <div class="mb-3">
                            <button type="button" class="btn btn-primary sm" id="adc_ingrediente">Adicionar
                                ingrediente</button>
                        </div>
                    </form>
                    <ul id="ingredientes_adc">
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button id="salvar_novoItem" type="button" class="btn btn-success">Salvar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- CADASTRAR REFEI????O  -->
    <div class="modal fade" id="div_cadastraRefeicao" tabindex="-1" aria-labelledby="div_cadastraRefeicaoLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="div_cadastraRefeicaoLabel">Cadastrar Refei????o</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form method="POST">
                        <input type="hidden" id="id_refeicao" />
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="data" class="form-label">Data</label>
                                <input type="date" class="form-control" name="data_refeicao" id="data_refeicao"
                                    placeholder="Selecione uma data">
                            </div>
                            <div class="mb-3">
                                <label for="tipoRefeicao" class="form-label">Selecione uma refei????o</label>
                                <select class="form-select" id="tipoRefeicao">
                                    <option selected value="0"></option>
                                    <option value="1">Caf?? da manh??</option>
                                    <option value="2">Almo??o</option>
                                    <option value="3">Janta</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="item" class="form-label">Adicione itens</label>
                                <select class="form-select" id='item_refeicao' name="item_refeicao">
                                    <?php foreach ($itens as $itn) {
                            echo "<option value='{$itn['id']}'> {$itn['id']} - {$itn['descricao']}</option>}";
                        } ?>
                                    <!-- pegar do banco  -->
                                </select>
                            </div>
                            <div class="mb-3">
                                <button type="button" class="btn btn-primary sm" id="adc_item">Adicionar item</button>
                            </div>
                            <div class="mb-3">
                                <label for="nutricionista" class="form-label">Selecione uma nutricionista</label>
                                <select class="form-select" id="nutricionista_refeicao">
                                    <?php foreach ($nutricionistas as $nutri) {
                            echo "<option value='{$nutri['crn']}'> {$nutri['nome']} - CRN N?? {$nutri['crn']}</option>}";
                        } ?>
                                </select>
                            </div>
                        </div>
                    </form>
                    <ul id="itens_adc">
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button id="salvar_novaRefeicao" type="button" class="btn btn-success">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- CLONAR CARD??PIO  -->
    <div class="modal fade" id="div_clonaCardapio" tabindex="-1" aria-labelledby="div_clonaCardapioLabel"
        aria-hidden="true">
        <!--Div do formul??rio de clonar card??pio-->
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="div_clonaCardapioLabel">Clonar card??pio</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form method="POST">
                        <input type="hidden" id="id_clonaCardapio" />
                        <!-- <div class="mb-3">
                            <label for="cardapioClonado" class="form-label">Data do card??pio a ser clonado</label>
                            <input type="date" class="form-control" name="cardapioClonado" id="cardapioClonado"
                                placeholder="Selecione uma data para clonar">
                        </div> -->
                        <div class="mb-3">
                            <label for="cardapioNovo" class="form-label">Data do card??pio novo</label>
                            <input type="date" class="form-control" name="cardapioNovo" id="cardapioNovo"
                                placeholder="Selecione a data do novo card??pio">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button id="salvar_clonaCardapio" type="button" class="btn btn-success">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    
  <!-- Modals de altera????o  -->
  <!-- ALTERAR NUTRICIONISTA  -->
    
  <div class="modal fade" id="div_alteraNutricionista" tabindex="-1" aria-labelledby="div_cadastraNutricionistaLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="div_alteraNutricionistaLabel">Alterar nutricionista</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form method="POST">
                        <input type="hidden" id="id_nutricionista_lista" />
                        <div class="mb-3">
                            <label for="nome_nutricionista_lista" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="nome_nutricionista_lista" placeholder="Insira o nome da nutricionista" name="nome_nutricionista_lista"
                            value="<?php echo $nutricionista['nome']; ?>">
                        </div>
                        <div class="mb-3">
                            <label for="crn_lista" class="form-label">CRN</label>
                            <input type="number" class="form-control" id="crn_lista" name="crn_lista" placeholder="Insira o CRN"  value="<?php echo $nutricionista['crn']; ?>">
                            <tr></tr>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button id="alterar_nutricionista" type="button" class="btn btn-success">Salvar</button>
                </div>
            </div>
      </div>
  </div>

  <!-- ALTERAR INGREDIENTE  -->
  <div class="modal fade" id="div_alteraIngrediente" tabindex="-1" aria-labelledby="div_alteraIngredienteLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="div_alteraIngredienteLabel">Alterar Ingrediente</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form method="POST">
      <input type="hidden" id="id_ingrediente_lista" />
      <div class="mb-3">
        <label for="ingrediente_lista" class="form-label">Ingrediente</label>
        <input type="text" class="form-control" id="ingrediente_lista" name="ingrediente_lista  " placeholder="Insira o nome do Ingrediente" name="ingrediente" value="<?php echo $ingrediente['descricao'] ?>">
      </div>
      <div class="mb-3">
        <label for="calorias_lista" class="form-label">Quantidade de calorias em 100g do ingrediente</label>
        <input type="number" class="form-control" id="calorias_lista" placeholder="Insira a quantidade de calorias" name="calorias_lista" value="<?php echo $ingrediente['calorias'] ?>">
      </div>
     </form>
     </div>
     <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
        <button id="alterar_ingrediente" type="button" class="btn btn-success">Salvar</button>
      </div>
      </div>
     </div>
  </div>

  <!-- ALTERAR ITEM  -->
  <div class="modal fade" id="div_alteraItem" tabindex="-1" aria-labelledby="div_alteraItemLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="div_alteraItemLabel">Altear Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form method="POST">
                        <input type="hidden" id="id_item_lista" value="<?php echo $item['id']?>"/>
                        <div class="mb-3">
                            <label for="item_lista" class="form-label">Item</label>
                            <input type="text" class="form-control" id="item_lista" placeholder="Insira o nome do item"name="item_lista " 
                            value="<?php echo $item['descricao'] ?>">
                        </div>
                        <div class="mb-3">
                            <label for="ingrediente_item_lista" class="form-label">Adicionar ingrediente</label>
                            <select class="form-select" id="ingrediente_item_lista" name="ingrediente_item_lista">
                                <?php foreach ($ingredientes as $ing) {
                                echo "<option value='{$ing['id']}'>ID: {$ing['id']} - {$ing['descricao']} - {$ing['calorias']} calorias por 100g</option>}";
                            } ?>
                            </select>
                            <tr></tr>
                        </div>
                        <div class="mb-3">
                            <button type="button" class="btn btn-primary sm" id="adc_ingrediente">Adicionar
                                ingrediente</button>
                        </div>
                    </form>
                    <ul id="ingredientes_adc">
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button id="alterar_item" type="button" class="btn btn-success">Salvar</button>
                </div>
            </div>
        </div>
    </div>

  <!-- ALTERAR REFEI????O  -->
  <div class="modal fade" id="div_alteraRefeicao" tabindex="-1" aria-labelledby="div_alteraRefeicaoLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="div_alteraRefeicaoLabel">Alterar Refei????o</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form method="POST">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="data_refeicao_lista" class="form-label">Data</label>
                                <input type="date" class="form-control" name="data_refeicao_lista" id="data_refeicao_lista" placeholder="Selecione uma data" value="<?php echo $refeicao['data'] ?>">
                            </div>
                            <div class="mb-3">
                                <label for="tipo_refeicao_lista" class="form-label">Selecione uma refei????o</label>
                                <select class="form-select" id="tipo_refeicao_lista" name="tipo_refeicao_lista">
                                    <option selected value="<?php echo $refeicao['tipo']?>">
                                    <?php if($refeicao['tipo'] == 1){
                                            echo "Caf?? da manh??";
                                        }elseif($refeicao['tipo'] == 2){
                                         echo "Almo??o";
                                        }else{
                                        echo "Jantar";}?>
                                </option>
                                    <option value="1">Caf?? da manh??</option>
                                    <option value="2">Almo??o</option>
                                    <option value="3">Janta</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="item_refeicao_lista" class="form-label">Adicione itens</label>
                                <select class="form-select" id='item_refeicao_lista' name="item_refeicao_lista">
                                    <?php foreach ($itens as $itn) {
                                        echo "<option value='{$itn['id']}'> {$itn['id']} - {$itn['descricao']}</option>}";
                                    } ?>
                                </select>
                            </div>
                            <div class="mb-3">
                                <button type="button" class="btn btn-primary sm" id="adc_item">Adicionar item</button>
                            </div>
                            <div class="mb-3">
                                <label for="nutricionista_refeicao_lista" class="form-label">Selecione uma nutricionista</label>
                                <select class="form-select" id="nutricionista_refeicao_lista">
                                    <option selected value="<?php echo $refeicao['id_nutricionista']?>"><?php echo $refeicao['id_nutricionista']?></option>
                                    <?php foreach ($nutricionistas as $nutricionista) {
                                    echo "<option value='{$nutricionista['id']}'> {$nutricionista['nome']} - CRN N?? {$nutricionista['crn']} - ID {$nutricionista['id']}</option>}";
                                    } ?>
                                </select>
                            </div>
                        </div>
                    </form>
                    <ul id="itens_adc">
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button id="alterar_refeicao" type="button" class="btn btn-success">Salvar</button>
                </div>
            </div>
        </div>
    </div>


  <!-- PESQUISAR  -->
    <div class="modal fade" id="pesquisaModal" tabindex="-1" aria-labelledby="pesquisaModalLabel" aria-hidden="true">
        <!--Div do formul??rio de pesquisa-->
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
                                <input type="date" class="form-control" name="data" id="data"
                                    placeholder="Pesquise uma data">
                            </div>
                            <div class="mb-3">
                                <label for="refeicao" class="form-label">Pesquise uma refei????o</label>
                                <select class="form-select">
                                    <option selected value="0"></option>
                                    <option value="1">Caf?? da manh??</option>
                                    <option value="2">Almo??o</option>
                                    <option value="3">Janta</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="item" class="form-label">Pesquise um item</label>
                                <input type="text" class="form-control" name="item" id="item"
                                    placeholder="Pesquise um item">
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
</div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
    </script>
    <script src="../logout.js"></script>
    <script src="https://momentjs.com/downloads/moment.min.js"></script>
    <script src="scripts_2.js"></script>
    <script>
        const alterarNutricionista = (nome, crn, id) => {
            document.getElementById('nome_nutricionista_lista').value = nome;
            document.getElementById('crn_lista').value = crn;
            document.getElementById('id_nutricionista_lista').value = id;
            modal_altera_nutricionista.show()
        }

        const alterarRefeicao = (data, tipo, id_nutricionista) => {
            document.getElementById('data_refeicao_lista').value = data;
            document.getElementById('tipo_refeicao_lista').value = tipo;
            document.getElementById('id_nutricionista_lista').value = id_nutricionista;
            document.getElementById('itens')
            modal_altera_refeicao.show()
        }

        const alterarItem = (descricao, calorias_totais, id_item) => {
            document.getElementById('item_lista').value = descricao;
            document.getElementById('id_item_lista').value = id_item;
            modal_altera_item.show()
        }

        const alterarIngrediente = (descricao, calorias, id) => {
            document.getElementById('ingrediente_lista').value = descricao;
            document.getElementById('calorias_lista').value = calorias;
            document.getElementById('id_ingrediente_lista').value = id;
            modal_altera_ingrediente.show()
        }
        </script>
</body>

</html>