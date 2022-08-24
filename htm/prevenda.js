//verificar se existe produto de pre-venda prevenda - PAGINA DO PRODUTO
function verificarPreVendaProduto(codModelo)
{
  
  	var temPreVenda = false;

    //=================== COMEÇA AQUI ANALISE DOS CODIGOS DOS MODELOS ====================//
    /*if((codModelo >= 30517 && codModelo <= 30519) || (codModelo >= 30546 && codModelo <= 30549) || (codModelo >= 30558 && codModelo <= 30561) || (codModelo >= 32500 && codModelo <= 32506) || (codModelo >= 32517 && codModelo <= 32524) || (codModelo >= 32527 && codModelo <= 32569))
    {
      //LigLe
      temPreVenda = true;
    }
  */
  	return temPreVenda;

  	//=================== TERMINA AQUI ANALISE DOS CODIGOS DOS MODELOS ====================//
}

//verificar se existe produto de pre-venda prevenda - CARRINHO LATERAL - CARRINHO COMPLETO - CHECKOUT
function verificarPreVenda(dados)
{
  
  	var achouLigLe = 0;
  
  	var itensCarrinho = dados;
    
    for (var i = 0; i < itensCarrinho.length; i++)
    {
      var item = itensCarrinho[i];

      var codModelo;

      if(item["codprod"])
      {
        codModelo = item["codprod"];
      }
      else
      {
        codModelo = item;
      }

      //=================== COMEÇA AQUI ANALISE DOS CODIGOS DOS MODELOS ====================//
      /*if((codModelo >= 30517 && codModelo <= 30519) || (codModelo >= 30546 && codModelo <= 30549) || (codModelo >= 30558 && codModelo <= 30561) || (codModelo >= 32500 && codModelo <= 32506) || (codModelo >= 32517 && codModelo <= 32524) || (codModelo >= 32527 && codModelo <= 32569))
      {
        achouLigLe = 1;
      }*/
    }

  	/*localStorage.setItem("temLigLe",achouLigLe);*/
  	//=================== TERMINA AQUI ANALISE DOS CODIGOS DOS MODELOS ====================//
}


//formato data mês/dia/ano
function calcularPrazoPreVenda()
{
  	var prazoPreVenda = 0;
  
	/*if(localStorage.temLigLe == "1")
    {
        prazoPreVenda = calculaDiasUteisApartirDeHoje("04/17/2020");
    }*/

  	return prazoPreVenda;
}

function calculaDiasUteisApartirDeHoje(dataFim)
{
  var dFim = new Date(dataFim);
  var hoje = new Date();
  hoje.setHours(0,0,0,0);
  dFim.setHours(0,0,0,0);
  
  var diasUteis = 0;
  
  while (dFim.valueOf() != hoje.valueOf())
  {
    var dia = hoje.getDay();

	if (dia != "6" && dia != "0") {
    	diasUteis++;
	}
    
    hoje.setDate(hoje.getDate() + 1);
    hoje.setHours(0,0,0,0);
   
  }
  
  return diasUteis;
  
}

//========================= MEUS PEDIDOS ====================================================//

//formato data dia/mês/ano
//verifica se existe item em pre-venda prevenda no pedido - NAO REMOVER MARCAS QUE SAIRAM DE PRE-VENDA. ESSA PARTE SERVE PARA INDICAR O PÓS-COMPRA PRO CLIENTE
function verificarPreVendaDetalhePedido()
{
  	console.log("teste dentro do arquivo novo");

    var achouLigLe5 = 0;
    var achouMerver4 = 0;

  
  	var itensCarrinho = $(".EstTabPedidoRef");
  
  	
  	var dataPedido = "";
  	var campoDataPedido = $(".EstCampo")[0];
  
  	if(campoDataPedido)
    {
      	var dataPedidoString = campoDataPedido.innerHTML;
      	var quebraData = dataPedidoString.split(" ");
  	
  		var dataFinal = quebraData[0];
  		var quebraData = dataFinal.split("/")
  
  		dataPedido = new Date(quebraData[1]+"/"+quebraData[0]+"/"+quebraData[2]);
      	
    }
    
    for (var i = 0; i < itensCarrinho.length; i++)
    {
      var item = itensCarrinho[i];

	  if((item.innerHTML >= 30517 && item.innerHTML <= 30519) || (item.innerHTML >= 30546 && item.innerHTML <= 30549) || (item.innerHTML >= 30558 && item.innerHTML <= 30561)|| (item.innerHTML >= 32500 && item.innerHTML <= 32506) || (item.innerHTML >= 32517 && item.innerHTML <= 32524) || (item.innerHTML >= 32527 && item.innerHTML <= 32569))
      {
        var dataLigLe5 = new Date("03/18/20");
        var dataLigLeF = new Date("03/24/20");
        
        if(dataPedido>=dataLigLe5 && dataPedido<dataLigLeF)
          {
            achouLigLe5 = 1;
          }
      }
       if(item.innerHTML >= 42000 && item.innerHTML <= 42070)
       {
        var dataMerver4 = new Date("03/19/20");
        var dataMerverfim = new Date("03/21/20");

        if(dataPedido>=dataMerver4 && dataPedido<dataMerverfim)
        {
          achouMerver4 = 1;
        }
      }
    }
  
  	if(achouLigLe5) return "17/04/2020";
  	if(achouMerver4) return "13/04/2020";
    
  	return -1;

}