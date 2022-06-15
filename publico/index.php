<?php
$database = new PDO('mysql:host=localhost;dbname=ru', 'root', '');


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

$consulta = $database->prepare('SELECT * FROM itens');
$consulta->execute();
$data = $consulta->fetchAll();
foreach ($data as $item) {
    $ingredientes = [];
    foreach($database->query('select ingredientes.id, ingredientes.descricao from itens_ingredientes inner join ingredientes on itens_ingredientes.id_ingrediente = ingredientes.id where id_item = '.$item['id']) as $ingrediente){
        $ingredientes[] = $ingrediente;
    }
    $itens[] = [
        'id' => $item['id'],
        'descricao' => $item['descricao'],
        'calorias_totais' => $item['calorias_totais'],
        'ingredientes' => $ingredientes
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
  <link type="text/css" href="..//estilo.css" rel="stylesheet" />
  <title>Cardápio RU</title>
</head>

<body>

  <nav class="navbar fixed-top">
    <div>
      <h2>Cardápio RU</h2>
    </div>
    <div class="d-flex">
        <!-- <button type="button" class="btn" id="navPesquisa" data-bs-toggle="modal" data-bs-target="#pesquisaModal">Pesquisa  <img src="https://www.iconpacks.net/icons/2/free-search-icon-2903-thumb.png" width="20" /></button> -->
        <button id="navLogin"  type="button"  class="btn" data-bs-toggle="modal" data-bs-target="#loginModal">
        <img src="https://moodle.bento.ifrs.edu.br/theme/image.php/academi/core/1652445467/u/f1" width="20" />  Login
        </button>
    </div>
  </nav>

<div class="tabelaCardapio">
  <table class="table table-bordered table-hover">
    <thead>
        <tr>
            <th scope="col">Data</th>
            <th scope="col">Tipo</th>
            <th scope="col">Pratos</th>
            <th scope="col">Nutricionista</th>
        <tr>
        <tr>

        </tr>
    </thead>
    <tbody>
        <?php foreach ($refeicoes as $refeicao) { ?>
        <tr>
            <td>
               <?php echo $refeicao['data']; ?>
            </td>
            <td><?php if($refeicao['tipo'] == 1){
                  echo "Café da manhã";
                  }elseif($refeicao['tipo'] == 2){
                  echo "Almoço";
                  }else{
                  echo "Jantar";} ?>
            </td>
            <td>
                <?php foreach ($refeicao['itens'] as $item) { 
                 echo $item['descricao']; 
                //  foreach($item['ingredientes']  as $ingrediente){
                //     echo " - ".$ingrediente['descricao'];
                //  }
                 echo '<br> ';
                 } ?>
            </td>
            <td><?php 
             foreach ($nutricionistas as $nutricionista) {
                if ($nutricionista['id'] == $refeicao['id_nutricionista']) {
                    echo $nutricionista['nome'];
                }
            }
            ?></td>
        </tr>
        <?php } ?>
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
</html>