var politica_frete_gratis_geral_ativo = true;
var cupom_frete_gratis_ativo = true;
var id_cupom_frete_gratis = 135894;
var mostrar_comprar_mais = false;
var pagina_comprar_mais;
var global_cesta, global_entrega_normal, global_entrega_jato;
var primeiraTentativaPesquisarCEP = true;
var deuErroBuscaFrete = false;
var totalCesta;
var idJaEnviado = false;
var mobile = 'nao';
var Juros=new Array(0,0,0,0,0,0,0,0,0,0,0,0);
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  mobile = 'sim'
}
// Imagem de Loading
ImgLoadingFC=FC$.PathImg+"loading.svg?cccfc=1"; // Loading da AutoPaginacao
ImgOnError=FC$.PathImg+"nd";
FCLib$.LazyLoadWaitImage=FC$.PathImg+"loading.svg?cccfc=1"; // Loading usado no Lazy Load

//remover localstorage de compra mais quando passar de 1 dia
var data_comprar_mais = window.localStorage.comprar_mais_data;

if(data_comprar_mais)
{
  data_comprar_mais = new Date(window.localStorage.comprar_mais_data);
  var now = new Date();

  var diff = Math.abs(now-data_comprar_mais);
  
  diff = diff/1000/24/60/60;
  
  if(diff > 1)
  {
    window.localStorage.removeItem("carrinho_genero");
    window.localStorage.removeItem("carrinho_faixa_etaria");
    window.localStorage.removeItem("mostrar_comprar_mais");
    window.localStorage.removeItem("ja_apareceu_comprar_mais");
    window.localStorage.removeItem("sessao_id");
    window.localStorage.removeItem("comprar_mais_data");
  }

}
else
{
  window.localStorage.removeItem("carrinho_genero");
  window.localStorage.removeItem("carrinho_faixa_etaria");
  window.localStorage.removeItem("mostrar_comprar_mais");
  window.localStorage.removeItem("ja_apareceu_comprar_mais");
  window.localStorage.removeItem("sessao_id");
  window.localStorage.removeItem("comprar_mais_data");
}


var promocao_nomes = {};
promocao_nomes["9 kits por 259 discount"] = "9 kits por R$259";
promocao_nomes["5 kits por 149 discount"] = "5 kits por R$149";
promocao_nomes["80 mijoes por 480 discount"] = "80 mijões por R$480";
promocao_nomes["3 macaquinhos por 4899 discount"] = "3 Macaquinhos por R$48,99";
promocao_nomes["verao menina 5 por 110 discount"] = "Verão Meninas - 5 por R$110";
promocao_nomes["verao menino 5 por 100 discount"] = "Verão Meninos - 5 por R$100";
promocao_nomes["kit 5 pecas 2 por 110 discount"] = "Kit 5 peças - 2 por R$110";
promocao_nomes["kit body 3 pecas 5 por 145 discount"] = "Kit Body 3 peças - 5 por R$145";
promocao_nomes["4 calcados por 100 discount"] = "4 Calçados por R$100";
promocao_nomes["3 pimpolhos por 90 discount"] = "3 Pimpolhos por R$90";
promocao_nomes["2 pares por 88 discount"] = "2 pares por R$88";
promocao_nomes["2 pares por 84 discount"] = "2 pares por R$84";

promocao_nomes["4 calcados por 110 discount"] = "4 Calçados por R$110";
promocao_nomes["kit 5 pecas 2 por 115 discount"] = "Kit 5 peças - 2 por R$115";
promocao_nomes["kit body 3 pecas 5 por 149 discount"] = "Kit Body 3 peças - 5 por R$149";

promocao_nomes["3 baby soffete por 60 discount"] = "3 Baby Soffete por R$60";
promocao_nomes["2 linda ju por 80 discount"] = "2 Linda Ju por R$80";


promocao_nomes["verao 5 por 100 discount"] = "Verão 5 por R$100";

promocao_nomes["3 macaquinhos por 49 discount"] = "3 Macaquinhos por R$49";

promocao_nomes["kit body 3 pecas 3 por 96 discount"] = "Kit Body 3 peças - 3 por R$96";

promocao_nomes["2 pares por 105 discount"] = "2 pares por R$105";

promocao_nomes["kit body longo 9 pecas por 118 discount"] = "Kit Body Inverno 3 peças - 3 por R$118";
promocao_nomes["kit body curto 9 pecas por 96 discount"] = "Kit Body Curto 3 peças - 3 por R$96";

promocao_nomes["conjunto inverno 3 por 120 discount"] = "Conjunto Inverno Estilo - 3 por R$120";
promocao_nomes["conjunto inverno basico 3 por 90 discount"] = "Conjunto Inverno Básico - 3 por R$90";
promocao_nomes["conjunto inverno premium 3 por 150 discount"] = "Conjunto Inverno Premium - 3 por R$150";

promocao_nomes["4 baby soffete por 90 discount"] = "4 Baby Soffete por R$90";

promocao_nomes["2 macacao por 70 discount"] = "2 Macacões por R$70";
promocao_nomes["3 macacao por 99 discount"] = "3 Macacões por R$99";

promocao_nomes["2 pijamas por 66 discount"] = "2 Pijamas por R$66";


promocao_nomes["kit body 9 pecas por 105 discount"] = "Kit Body 3 peças - 3 por R$105";
promocao_nomes["kit body 12 pecas por 136 discount"] = "Kit Body 3 peças - 4 por R$136";

promocao_nomes["3 por 99 discount"] = "3 por R$99";

promocao_nomes["3 por 105 discount"] = "3 por R$105";

promocao_nomes["3 baby soffete por 79 discount"] = "3 Baby Soffete por R$79";
promocao_nomes["4 baby soffete por 105 discount"] = "4 Baby Soffete por R$105";

promocao_nomes["2 kits por 115 discount"] = "2 kits bodies por R$115";
promocao_nomes["3 kits por 170 discount"] = "3 kits bodies por R$170";

promocao_nomes["5 por 179 discount"] = "5 por R$179";


promocao_nomes["4 macaquinho por 90 discount"] = "4 Macaquinhos e Banho de Sol por R$90";
promocao_nomes["4 por 142 discount"] = "4 por R$142";
promocao_nomes["verao masc 5 por 143 discount"] = "Verão Masculino - 5 por R$143";
promocao_nomes["verao fem 5 por 143 discount"] = "Verão Feminino - 5 por R$143";
promocao_nomes["3 kit body por 106 discount"] = "Kit Body 3 peças - 3 por R$106";
promocao_nomes["4 kit body por 140 discount"] = "Kit Body 3 peças - 4 por R$140";

promocao_nomes["4 pares por 99 discount"] = "4 pares por R$99";

//combo black friday
promocao_nomes["2 pares por 99 discount"] = "2 pares por R$99";
promocao_nomes["4 calcados por 95 discount"] = "4 Calçados por R$95";

promocao_nomes["2 pares por 104 discount"] = "2 pares por R$104";
promocao_nomes["4 calcados por 105 discount"] = "4 Calçados por R$105";

promocao_nomes["verao masc 5 por 138 discount"] = "Verão Masculino - 5 por R$138";
promocao_nomes["verao fem 5 por 138 discount"] = "Verão Feminino - 5 por R$138";
promocao_nomes["4 por 138 discount"] = "4 por R$138";
promocao_nomes["3 kit body por 103 discount"] = "Kit Body 3 peças - 3 por R$103";
promocao_nomes["4 kit body por 136 discount"] = "Kit Body 3 peças - 4 por R$136";

promocao_nomes["4 calcados por 97 discount"] = "4 Calçados por R$97";
promocao_nomes["2 jardineiras por 57 discount"] = "2 Jardineiras por R$57";
promocao_nomes["3 por 126 discount"] = "3 Kits por R$126";
//fim combo black friday

promocao_nomes["verao 5 por 143 discount"] = "Verão - 5 por R$143";
promocao_nomes["3 por 113 discount"] = "3 produtos por R$113";
promocao_nomes["3 por 105 discount"] = "3 por R$105";

promocao_nomes["4 pares por 96 discount"] = "4 pares por R$96";
promocao_nomes["3 por 99 discount"] = "3 peças - 3 por R$99";
promocao_nomes["3 por 104 discount"] = "3 peças - 3 por R$104";
promocao_nomes["3 por 129 discount"] = "3 peças - 3 por R$129";
promocao_nomes["3 calcados por 85 discount"] = "3 Calçados por R$85";
promocao_nomes["10 por 115 discount"] = "10 peças por R$115";
promocao_nomes["3 pares por 80 discount"] = "3 pares por R$80";
promocao_nomes["4 pares por 103 discount"] = "4 pares por R$103";
promocao_nomes["2 kit body por 67 discount"] = "Kit Body 3 peças - 2 por R$67";
promocao_nomes["3 kit body por 100 discount"] = "Kit Body 3 peças - 3 por R$100";
promocao_nomes["4 kit body por 130 discount"] = "Kit Body 3 peças - 4 por R$130";
promocao_nomes["3 macacoes por 95 discount"] = "3 Macacões por R$95";
promocao_nomes["10 por 105 discount"] = "10 peças por R$105";
promocao_nomes["3 por 89 discount"] = "3 por R$89";
promocao_nomes["3 por 85 discount"] = "3 por R$85";


var capital_rm_estadoSP = 0;
function verificaCapital_RM_EstadoSP(cepInserido)
{
  cepInserido = cepInserido.replace("-", "");
  cepInserido = cepInserido.replace(" ", "");
  if(
    (cepInserido >= 1000001 && cepInserido <= 19999999) ||
    (cepInserido >= 20000001 && cepInserido <= 23859999) ||
    (cepInserido >= 23890001 && cepInserido <= 23899999) ||
    (cepInserido >= 24000001 && cepInserido <= 25779999) ||
    (cepInserido >= 25900001 && cepInserido <= 25949999) ||
    (cepInserido >= 26000001 && cepInserido <= 26649999) ||
    (cepInserido >= 28680000 && cepInserido <= 28699999) ||
    (cepInserido >= 28800000 && cepInserido <= 28819999) ||
    (cepInserido >= 29000001 && cepInserido <= 29189999) ||
    (cepInserido >= 29200001 && cepInserido <= 29229999) ||
    (cepInserido >= 30000001 && cepInserido <= 32499999) ||
    (cepInserido >= 32600001 && cepInserido <= 32699999) ||
    (cepInserido >= 32900000 && cepInserido <= 34999999) ||
    (cepInserido >= 35460000 && cepInserido <= 35469999) ||
    (cepInserido >= 35485000 && cepInserido <= 35489999) ||
    (cepInserido >= 35670000 && cepInserido <= 35679999) ||
    (cepInserido >= 35685000 && cepInserido <= 35693999) ||
    (cepInserido >= 35720000 && cepInserido <= 35735999) ||
    (cepInserido >= 35740000 && cepInserido <= 35759999) ||
    (cepInserido >= 35830000 && cepInserido <= 35844999) ||
    (cepInserido >= 40000001 && cepInserido <= 43999999) ||
    (cepInserido >= 44460000 && cepInserido <= 44479999) ||
    (cepInserido >= 48120000 && cepInserido <= 48129999) ||
    (cepInserido >= 48280000 && cepInserido <= 48289999) ||
    (cepInserido >= 49000001 && cepInserido <= 49119999) ||
    (cepInserido >= 49140000 && cepInserido <= 49169999) ||
    (cepInserido >= 50000001 && cepInserido <= 53989999) ||
    (cepInserido >= 54000001 && cepInserido <= 54599999) ||
    (cepInserido >= 54700001 && cepInserido <= 54999999) ||
    (cepInserido >= 55590000 && cepInserido <= 55599999) ||
    (cepInserido >= 55900000 && cepInserido <= 55919999) ||
    (cepInserido >= 57000001 && cepInserido <= 57199999) ||
    (cepInserido >= 57690000 && cepInserido <= 57699999) ||
    (cepInserido >= 57820000 && cepInserido <= 57829999) ||
    (cepInserido >= 57925000 && cepInserido <= 57929999) ||
    (cepInserido >= 57935000 && cepInserido <= 57939999) ||
    (cepInserido >= 57990000 && cepInserido <= 57994999) ||
    (cepInserido >= 58000001 && cepInserido <= 58109999) ||
    (cepInserido >= 58297000 && cepInserido <= 58309999) ||
    (cepInserido >= 58315000 && cepInserido <= 58329999) ||
    (cepInserido >= 58337000 && cepInserido <= 58337999) ||
    (cepInserido >= 59000001 && cepInserido <= 59167999) ||
    (cepInserido >= 59170000 && cepInserido <= 59177999) ||
    (cepInserido >= 59182000 && cepInserido <= 59184999) ||
    (cepInserido >= 59270000 && cepInserido <= 59274999) ||
    (cepInserido >= 59280000 && cepInserido <= 59299999) ||
    (cepInserido >= 59490000 && cepInserido <= 59499999) ||
    (cepInserido >= 59570000 && cepInserido <= 59577999) ||
    (cepInserido >= 59580000 && cepInserido <= 59581999) ||
    (cepInserido >= 60000001 && cepInserido <= 61999999) ||
    (cepInserido >= 62665000 && cepInserido <= 62699999) ||
    (cepInserido >= 62850000 && cepInserido <= 62899999) ||
    (cepInserido >= 64000001 && cepInserido <= 64099999) ||
    (cepInserido >= 65000001 && cepInserido <= 65152999) ||
    (cepInserido >= 65160000 && cepInserido <= 65179999) ||
    (cepInserido >= 65250000 && cepInserido <= 65254999) ||
    (cepInserido >= 66000001 && cepInserido <= 67999999) ||
    (cepInserido >= 68740001 && cepInserido <= 68747999) ||
    (cepInserido >= 68790000 && cepInserido <= 68799999) ||
    (cepInserido >= 68900001 && cepInserido <= 68914999) ||
    (cepInserido >= 68925001 && cepInserido <= 68944999) ||
    (cepInserido >= 69000001 && cepInserido <= 69129999) ||
    (cepInserido >= 69240000 && cepInserido <= 69259999) ||
    (cepInserido >= 69300001 && cepInserido <= 69342999) ||
    (cepInserido >= 69350000 && cepInserido <= 69354999) ||
    (cepInserido >= 69380000 && cepInserido <= 69424999) ||
    (cepInserido >= 69435000 && cepInserido <= 69439999) ||
    (cepInserido >= 69730000 && cepInserido <= 69739999) ||
    (cepInserido >= 69900001 && cepInserido <= 69924999) ||
    (cepInserido >= 70000001 && cepInserido <= 72799999) ||
    (cepInserido >= 73000001 && cepInserido <= 73699999) ||
    (cepInserido >= 74000001 && cepInserido <= 74999999) ||
    (cepInserido >= 75170000 && cepInserido <= 75179999) ||
    (cepInserido >= 75195000 && cepInserido <= 75199999) ||
    (cepInserido >= 75240000 && cepInserido <= 75259999) ||
    (cepInserido >= 75340000 && cepInserido <= 75354999) ||
    (cepInserido >= 75360000 && cepInserido <= 75394999) ||
    (cepInserido >= 75400000 && cepInserido <= 75409999) ||
    (cepInserido >= 75430000 && cepInserido <= 75449999) ||
    (cepInserido >= 75460000 && cepInserido <= 75479999) ||
    (cepInserido >= 76800001 && cepInserido <= 76849999) ||
    (cepInserido >= 76860000 && cepInserido <= 76860999) ||
    (cepInserido >= 77000001 && cepInserido <= 77299999) ||
    (cepInserido >= 77500000 && cepInserido <= 77564999) ||
    (cepInserido >= 77580000 && cepInserido <= 77589999) ||
    (cepInserido >= 77600000 && cepInserido <= 77604999) ||
    (cepInserido >= 77620000 && cepInserido <= 77629999) ||
    (cepInserido >= 77640000 && cepInserido <= 77654999) ||
    (cepInserido >= 77660000 && cepInserido <= 77669999) ||
    (cepInserido >= 78000001 && cepInserido <= 78174999) ||
    (cepInserido >= 78180000 && cepInserido <= 78189999) ||
    (cepInserido >= 78195000 && cepInserido <= 78199999) ||
    (cepInserido >= 78480000 && cepInserido <= 78489999) ||
    (cepInserido >= 79000001 && cepInserido <= 79129999) ||
    (cepInserido >= 80000001 && cepInserido <= 83199999) ||
    (cepInserido >= 83300001 && cepInserido <= 83349999) ||
    (cepInserido >= 83400001 && cepInserido <= 83899999) ||
    (cepInserido >= 88000001 && cepInserido <= 88199999) ||
    (cepInserido >= 90000001 && cepInserido <= 92849999) ||
    (cepInserido >= 92990000 && cepInserido <= 93939999) ||
    (cepInserido >= 93950000 && cepInserido <= 93989999) ||
    (cepInserido >= 94000001 && cepInserido <= 94999999) ||
    (cepInserido >= 95500000 && cepInserido <= 95514999) ||
    (cepInserido >= 95600000 && cepInserido <= 95624999) ||
    (cepInserido >= 95630000 && cepInserido <= 95659999) ||
    (cepInserido >= 95690000 && cepInserido <= 95694999) ||
    (cepInserido >= 95745000 && cepInserido <= 95747999) ||
    (cepInserido >= 95760000 && cepInserido <= 95764999) ||
    (cepInserido >= 95780000 && cepInserido <= 95782999) ||
    (cepInserido >= 95840000 && cepInserido <= 95859999) ||
    (cepInserido >= 96700000 && cepInserido <= 96734999) ||
    (cepInserido >= 96740000 && cepInserido <= 96749999)
  )
  {
    capital_rm_estadoSP = 1;
    return 1;
  }
  else
  {
    capital_rm_estadoSP = 0;
    return 0;
  }
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

function getPriceCart()
{
  var valorCarrinho;
  if($(".CartDesign-product-subtotal-price .FCPriceValue").length > 0)
  {
    valorCarrinho = $(".CartDesign-product-subtotal-price .FCPriceValue").children()[0].innerHTML + $(".CartDesign-product-subtotal-price .FCPriceValue").children()[1].innerHTML;

  }
  else if($("#FCCartSubtotals .FCPriceValue").length > 0)
  {
    valorCarrinho = $("#FCCartSubtotals .FCPriceValue").children()[0].innerHTML + $("#FCCartSubtotals .FCPriceValue").children()[1].innerHTML;

  }

  valorCarrinho = valorCarrinho.replace(",",".");
  valorCarrinho = parseFloat(valorCarrinho);
  return valorCarrinho;
}

function fnprocessExisteTransportadora(obj)
{
  if (this.readyState == 4 && this.status == 200)
  {

    if(this.responseText != "null" && this.responseText != null)
    {
      var obj = JSON.parse(this.responseText);

      var oShippingValue=document.getElementById("idShippingValue");
      var oShippingValue1=document.getElementById("idShippingValue1");
      var oShippingValue2=document.getElementById("idShippingValue2");

      if(obj["tem_transportadora"] == true)
      {
        if(oShippingValue)
        {
          Cart$.fnGetShippingValueCart($("#TabFinalCart .FCPriceValue")[0].innerText);
        }
        else if(oShippingValue1 || oShippingValue2)
        {
          fnGetShippingValue(0);
        }

      }
      else
      {
        if(oShippingValue)
        {
          var oImgLoadingCEP=document.getElementById("idImgLoadingCEP");
          if(oImgLoadingCEP){oImgLoadingCEP.style.display="none";}
          oShippingValue.innerHTML="<span id=idErrXMLCEPFC style=color:#990000;>CEP inválido</span>";

        }
        else if(oShippingValue1 || oShippingValue2)
        {
          oShippingValue1.innerHTML="<span id=idErrXMLCEPFC style=color:#dc087f;>CEP inválido</span>";
          oShippingValue2.innerHTML="<span id=idErrXMLCEPFC style=color:#dc087f;>CEP inválido</span>";
          var oImgLoadingCEP1=document.getElementById("idImgLoadingCEP1");
          if(oImgLoadingCEP1){oImgLoadingCEP1.style.display="none";}
          var oImgLoadingCEP2=document.getElementById("idImgLoadingCEP2");
          if(oImgLoadingCEP2){oImgLoadingCEP2.style.display="none";}
        }	


      }
    }
  }
  else if (this.readyState == 4 && this.status == 0)
  {
    var oShippingValue=document.getElementById("idShippingValue");
    var oShippingValue1=document.getElementById("idShippingValue1");
    var oShippingValue2=document.getElementById("idShippingValue2");

    if(oShippingValue)
    {
      Cart$.fnGetShippingValueCart($("#TabFinalCart .FCPriceValue")[0].innerText);
    }
    else if(oShippingValue1 || oShippingValue2)
    {
      fnGetShippingValue(0);
    }
  }
}

function verificar_carrinho(carrinho)
{
  var tem_topchot = false;
  var tem_calcado = false;
  var tem_verao = false;
  var tem_kit_body = false;
  var tem_body_kappes = false;
  var tem_bs_jard = false;
  var array_temas = [];
  
  var qtde_infant = 0; var qtde_toddler = 0;
  var qtde_unissex = 0; var qtde_masc = 0; var qtde_fem = 0;
  
  if(carrinho.items == null) return;
  
  for(var i = 0; i < carrinho.items.length; i++)
  {
    var nome_produto = carrinho.items[i]["prod"].toLowerCase();
    var cat_produto = carrinho.items[i]["cat"];
    var codigo_produto = carrinho.items[i]["codprod"];
    var tamanho_produto = carrinho.items[i]["d1"];
    var genero_produto = carrinho.items[i]["d2"];

    
    if(nome_produto.indexOf("top chot") !== -1 || codigo_produto == "451A" || codigo_produto == "451B" || codigo_produto == "451C" || codigo_produto == "451D" || codigo_produto == "451E" || codigo_produto == "451F")
    {
      tem_topchot = true;
    }
    
    if(cat_produto == "Tênis" || cat_produto == "Sandália"  || cat_produto == "Sapatilha"  || cat_produto == "Chinelo"  || cat_produto == "Babuche"  || cat_produto == "Mocassim" || cat_produto == "Galocha")
    {
      tem_calcado = true;
    }
    
    
    
    if(eh_verao(codigo_produto))
    {
      tem_verao = true;
    }
    
    if(cat_produto.toUpperCase().indexOf("KIT") !== - 1 && cat_produto.toUpperCase().indexOf("BOD") !== - 1)
    {
      tem_kit_body = true;
    }
    
    if((cat_produto == "Body Manga Curta" || cat_produto == "Body Manga Longa"  || cat_produto == "Body Regata") && nome_produto.indexOf("kappes") !== -1)
    {
      tem_body_kappes = true;
    }
    
    if(cat_produto == "Macaquinho e Banho de Sol" || cat_produto == "Kit Banho de Sol"  || cat_produto == "Jardineira")
    {
      tem_bs_jard = true;
    }
    
    
    if(tamanho_produto == "PREMATURO" || tamanho_produto == "RN" || tamanho_produto == "P" || tamanho_produto == "M" || tamanho_produto == "G" || tamanho_produto == "GG" || tamanho_produto == "" || tamanho_produto == "14-15" || tamanho_produto == "15-16" || tamanho_produto == "15-17" || tamanho_produto == "15-18" || tamanho_produto == "16-19" || tamanho_produto == "16-20" || tamanho_produto == "20-23" || tamanho_produto == "19-20" || tamanho_produto == "13" || tamanho_produto == "14" || tamanho_produto == "15" || tamanho_produto == "16" || tamanho_produto == "17" || tamanho_produto == "18" || tamanho_produto == "19" || tamanho_produto == "20")
    {
      qtde_infant++;
    }
    else if(tamanho_produto == "1" || tamanho_produto == "2" || tamanho_produto == "3" || tamanho_produto == "24-27" || tamanho_produto == "21" || tamanho_produto == "20-21" || tamanho_produto == "21-22" || tamanho_produto == "22" || tamanho_produto == "23" || tamanho_produto == "22-23" || tamanho_produto == "24" || tamanho_produto == "23-24" || tamanho_produto == "25" || tamanho_produto == "24-25" || tamanho_produto == "25-26" || tamanho_produto == "26" || tamanho_produto == "27" || tamanho_produto == "27-28" || tamanho_produto == "28" || tamanho_produto == "29" || tamanho_produto == "29-30" || tamanho_produto == "30" || tamanho_produto == "4" || tamanho_produto == "6" || tamanho_produto == "8")
    {
      qtde_toddler++;
    }
    
    if(genero_produto == "masculino")
    {
      qtde_masc++;
    }
    else if(genero_produto == "feminino")
    {
      qtde_fem++;
    }
    else if(genero_produto == "unissex")
    {
      qtde_unissex++;
    }
    
  }
  

  if(qtde_infant/carrinho.items.length >= 0.5)
  {
    carrinho_faixa_etaria = 0;
  }
  else if(qtde_toddler/carrinho.items.length >= 0.5)
  {
    carrinho_faixa_etaria = 1;
  }
  else
  {
    carrinho_faixa_etaria = -1;
  }
  
  if(qtde_masc > qtde_fem)
  {
    carrinho_genero = 1;
  }
  else if(qtde_fem > qtde_masc)
  {
    carrinho_genero = 2;
  }
  else
  {
    carrinho_genero = 0;
  }
  
  //if(tem_topchot == false && carrinho_faixa_etaria == 0) array_temas[array_temas.length] = "basico";
  if(tem_calcado == false) array_temas[array_temas.length] = "calcado";
  if(tem_kit_body == false && carrinho_faixa_etaria == 0) array_temas[array_temas.length] = "kit_body";
  if(tem_kit_body == false && carrinho_faixa_etaria == 1 && tem_body_kappes == false) array_temas[array_temas.length] = "kit_body";
  if(tem_verao == false) array_temas[array_temas.length] = "verao";
  if(tem_bs_jard == false) array_temas[array_temas.length] = "banhosol_jardineira";
  
  
  console.log(array_temas);
  
  if(array_temas.length > 0 && carrinho_faixa_etaria != -1 && mobile == "sim")
  {
    var tema_aleatorio = array_temas[Math.floor(Math.random() * array_temas.length)];
    
    if(tema_aleatorio == "basico")
    {
      pagina_comprar_mais = "dica_fofuxa_basico.htm";
    }
    else if(tema_aleatorio == "calcado")
    {
      pagina_comprar_mais = "dica_fofuxa.htm";
    }
    else if(tema_aleatorio == "kit_body")
    {
      pagina_comprar_mais = "dica_fofuxa_kit_body.htm";
    }
    else if(tema_aleatorio == "verao")
    {
      pagina_comprar_mais = "dica_fofuxa_verao.htm";
    }
    else if(tema_aleatorio == "banhosol_jardineira")
    {
      pagina_comprar_mais = "dica_fofuxa_banho_sol.htm";
    }
    
    window.localStorage.setItem("carrinho_genero", carrinho_genero);
    window.localStorage.setItem("carrinho_faixa_etaria", carrinho_faixa_etaria);
    
    mostrar_comprar_mais = true;
    window.localStorage.setItem("mostrar_comprar_mais", 1);
    
    window.localStorage.setItem("comprar_mais_data", new Date());
    

  }
  else
  {
    mostrar_comprar_mais = false;
    window.localStorage.removeItem("mostrar_comprar_mais");
    if(!window.localStorage.ja_apareceu_comprar_mais)
    {
      window.localStorage.removeItem("carrinho_genero");
      window.localStorage.removeItem("carrinho_faixa_etaria");
    }


  }
  
}

// Formatação de Numero
function fnFormatNumber(num){
  num=num.toString().replace(/\$|\,/g,'');
  if(isNaN(num))num="0";
  sign=(num==(num=Math.abs(num)));
  num=Math.floor(num*100+0.50000000001);
  num=Math.floor(num/100).toString();
  for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
  return ((sign)?'':'-')+num;
}


var sF$=(function(){

  // Login Social
  function fnLoginUserName(NameUser,PicUser){
    var oImgGlobalSign=document.getElementById("idImgGlobalSignFC");
    if(NameUser==""){
      document.getElementById("idLoginInfo").innerHTML="<!--div class='logintext'>Olá <b>Visitante</b>. <a href='/cadastro.asp?idloja="+FC$.IDLoja+"&pp=3&passo=1&sit=1'>Clique aqui</a> e faça seu login</div-->";
      if(oImgGlobalSign){oImgGlobalSign.style.display="";}
    }
    else{
      NameUser=fnFirstName(NameUser);
      document.getElementById("idLoginInfo").innerHTML="<!--div class='logintext'>Olá <b>"+NameUser+"</b>. <a href='#Logout' onclick=FCLib$.fnClientLogout('',sF$.fnCliLogout)>Clique</a> para sair.</div-->";
      if(oImgGlobalSign){oImgGlobalSign.style.display="none";}
    }
    var oFoto=document.getElementById("UserImage");
    if(oFoto){
      if(PicUser==undefined || PicUser==""){oFoto.src=FC$.PathImg+"ic_user_topo.svg";}
      else{oFoto.src=PicUser;}   
    } 
  }

  function fnFirstName(NameUser){
    var iPos=NameUser.search(" ");
    if(iPos>0) return NameUser.charAt(0).toUpperCase() + NameUser.substring(0,iPos).slice(1).toLowerCase();
    else return NameUser.charAt(0).toUpperCase() + NameUser.slice(1).toLowerCase();
  }

  function fnLogout(){
    if(FC$.ClientID!=0){
      var oLinkLogin=fnGetID("idLinkLoginFC");
      if(oLinkLogin){
        oLinkLogin.innerHTML="Logout";
        oLinkLogin.href="/cadastro.asp?idloja="+ FC$.IDLoja +"&logoff=true";
      }
    }
  }

  function fnCliLogout(obj,sPag){
    sF$.fnLoginUserName("","");
    FC$.ClientID==0;
    fnShowGlobalSignin();
  }
  // Fim Login Social

  return{
    fnLogout:fnLogout,
    fnFirstName:fnFirstName,
    fnLoginUserName:fnLoginUserName,
    fnCliLogout:fnCliLogout
  }

})();


function fnShowGlobalSignin(){
  var oImgGlobalSign=FCLib$.GetID("idImgGlobalSignFC");
  if(oImgGlobalSign){
    var bFacebookLogin=false;
    var bGoogleLogin=false;
    var sImgs="";
    if(typeof FC$.FacebookSigninID!="undefined"){
      sImgs+="<img src='"+ FC$.PathImg +"facebooklogin.svg' class='FacebookSigninClass' data-loginsuccess='fnLoginShowUserName'>";
      bFacebookLogin=true;
    } 
    if(typeof FC$.GoogleSigninID!="undefined"){
      sImgs+="<img src='"+ FC$.PathImg +"googlelogin.svg' class='GoogleSigninClass' data-loginsuccess='fnLoginShowUserName'>";
      bGoogleLogin=true;
    }
    if(bFacebookLogin||bGoogleLogin)oImgGlobalSign.innerHTML=sImgs;
    if(bFacebookLogin)FCLib$.signinFacebook();
    if(bGoogleLogin)FCLib$.signinGoogle();
  }
}

function fnLoginShowUserName(user){
  sF$.fnLoginUserName(user.fullName,user.pictureURL);
}
// Fim Global Signin


/* Lista de Desejos */
var bBuyWishlist=false; //para desabilitar o comprar da lista de desejos
function FuncButtonAddToWL(idp,bAdd){
  var sCont="";
  var bProdDet=(document.body.className.search("ProductDet")>0);
  if(bProdDet){
    if(bAdd==true)sCont="<div id=\"FCBtnDesejosDet\"><a title='Produto adicionado a Lista de Desejos. Clique aqui para ir para a Lista de Desejos.' href=\"/account.asp?idloja="+ FC$.IDLoja +"&wishlist=1#Wishlist\"><img src='"+ FC$.PathImg +"botdesejosdet_on.svg'></a></div>";
    else sCont="<div id=\"FCBtnDesejosDet\"><a href=\"#wl\" title='Adicione este produto a Lista de Desejos' onclick=\"WL$.fnAddToWishlist("+idp+")\" rel=\"nofollow\"><img src='"+ FC$.PathImg +"botdesejosdet_off.svg'></a></div>";
  }
  else{
    if(bAdd==true)sCont="<a title='Produto adicionado a Lista de Desejos. Clique aqui para ir para a Lista de Desejos.' href=\"/account.asp?idloja="+ FC$.IDLoja +"&wishlist=1#Wishlist\"><img src='"+ FC$.PathImg +"botdesejoslista_on.svg'></a>";
    else sCont="<a href=\"#wl\" title='Adicione este produto a Lista de Desejos' onclick=\"WL$.fnAddToWishlist("+idp+")\" rel=\"nofollow\"><img src='"+ FC$.PathImg +"botdesejoslista_off.svg'></a>";
    //FC$.PathImg caminho da imagem
  }
  return sCont;
}

/* Preco Home + Lista de Produtos */
function fnShowProd(PrecoProd,PrecoOri,IDProd,MaxParcelas){
  var sPreco="";
  var ComSem="";
  // preço
  if(PrecoProd==0 && PrecoOri==0){sPreco="&nbsp;";return void(0);}
  if(PrecoProd!=PrecoOri){
    sPreco="<span class='PrecoDeHome'>de <strike>"+FC$.Currency+""+FormatPrice(PrecoOri,'')+"</strike>&nbsp;&nbsp;</span><span class='PrecoPorHome'>por "+FC$.Currency+"<b>"+FormatPrice(PrecoProd,'')+"</b></span>";
  }
  else{
    sPreco="<div class='PrecoPorHome'>"+FC$.Currency+"<b>"+FormatPrice(PrecoProd,'')+"</b></div>";
  }
  //parcelamento
  if(PrecoProd>0 && MaxParcelas!=1 && Juros.length>0){
    if(MaxParcelas==0||MaxParcelas>Juros.length)MaxParcelas=Juros.length;
    if(Juros[MaxParcelas-1]>0)ComSem=""; else ComSem="sem juros";
    sPreco+="<div class='EstParcHome'>"+MaxParcelas+"X de "+FormatPrecoReais(CalculaParcelaJurosCompostos(PrecoProd,MaxParcelas))+" "+ComSem+"</div>";
  }
  var oPrecoProd=document.getElementById("PrecoProd"+IDProd);
  if(oPrecoProd){oPrecoProd.innerHTML=sPreco;}

  //badge
  var oBadge=$("#DivProd"+IDProd+" [data-sale]")[0];
  if(!oBadge)var oBadge=document.getElementById("DivProd"+IDProd);
  if(oBadge){
    var sBadges="";

    /*
    var arrayIDs = [5786698,5831010,4919612,5786701,4919606,4901574,6529613,6529602,6529466,6529586,6242562,6433934,6433946,6433808,6433938,6434181,6433930,6433942,6433829,6433922,6434058,6434081,6433815,6433833,6433825,6242527,6542415,6542441,6542419,6542444,6542428,6542432,6542437,6476285,6476280,6532568,6476346,6476454,6510710,6510695,6510720,6510700,6510690,6531429,6532126,6531756,6531726,6531414,6531748,6531765,6532598,6532452,6532375,6532109,6531406,6512672,6512572,6512678,6512555,6512533,6512542,6512565,5966716,5966715,6532069,6541560,6541546,6559207,6532445,6532335,6532572,6532147,6532160,6532151,6532156,6559287,5789282,4621892,6535872,6535857,6535851,6535864,5943043,6478083,6478089,6478116,6478095,6478233,6478238,6449496,6449358,6449721,6449351,6449418,5966714,6516781,6516794,6516798,4621889,5786694,4621891,5038005,4621896,5529449,4621939,4621879,5532212,4621890,5038000,6552563,4621886,5542694,4621876,4621881,5531474,5532175,4900883,4900877,6455309,4900873,5074523,5529325,6541551,5543665,4901577,5531507,4621910,4919611,6432161,6478327,6478333,6478338,6478343,4621906,5038001,5038004,4621883,5037999,4621900,5038003,5038002,5786696,4621901,5786691,6497223,6497228,6497232,4900887,6541565,6516737,6518724,6518511,6516723,6518720,6516758,6516751,6517416,6518477,6518716,6518515,6516732,6517394,6531652,6531662,6531636,6531676,6531627,6532046,6531691,6531642,4900886,4621875,6198995,6509332,6509412,6514561,6540504,6540425,6540646,6540667,6540631,6518437,6518048,6518414,6518401,6518148,6518427,6516884,6518166,6516910,6518185,6518110,6518133,6449880,6449872,6449866,5966719,5786697,4621899,4621907,5552858,5529485,5552882,6545436,6413346,6535913,6536285,6535893,6535880,6536292,6535897,6535901,6535889,6535841,6535820,6535885,6535816,6514484,6514459,6517306,6514194,6514206,6476489,6476483,6476493,6500377,6500396,6514569,6513298,6449703,6449694,6509429,6509333,6509405,6517310,6517373,6413334,6413322,6514052,6516423,6514056,6515326,4621936,5552929,6516493,6516504,6516497,6516330,6517337,6513938,6516268,6513989,6516508,6516477,6516318,6517281,6517366,6469233];

    var arrayDesc = [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,52,52,53,53,53,53,53,53,53,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,58,58,58,58,59,60,60,60,60,60,60,61,62,62,62,62,62,62,62,62,62,62,62,62,63,63,64,64,64,64,64,64,64,64,64,65,66,66,67,67,67,69,69,70,70,70,70,70,70,70,70,73,73,73,73,73,73,73,73,73,73,73,73,73,76];

    var indexID = arrayIDs.indexOf(IDProd);

    if(indexID != -1)
    {
      	var valorDesc = arrayDesc[indexID];
      	var nomeImgDesc = "tag_dc_" + valorDesc + ".png";
        if(oBadge.hasAttribute("data-sale") && PrecoOri>PrecoProd)sBadges+="<div class='badgePromRemark' title='Oferta'>-"+ getPromocao() +"%</div><div class='tag_remark' style='background-image: url(lojas/00020368/images/"+nomeImgDesc+");'></div>";
    }
    else
    {
        if(oBadge.hasAttribute("data-sale") && PrecoOri>PrecoProd)sBadges+="<div class='badgeProm' title='Oferta'>-"+ getPromocao() +"%</div>";
    }
    */

    if(oBadge.hasAttribute("data-sale") && PrecoOri>PrecoProd)sBadges+="<div class='badgeProm' title='Oferta'>-"+ getPromocao() +"%</div>";

    //if(oBadge.hasAttribute("data-release"))sBadges+="<div class='badgeNew' title='Lançamento'>NOVO</div>";
    //if(oBadge.hasAttribute("data-highlight"))sBadges+="<div class='badgeHigh' title='Destaque'>&#9733;</div>";
    if(sBadges!="")oBadge.innerHTML+="<div class='badgesProd'>"+ sBadges +"</div>";
  }
  function getPromocao(){return parseInt(Math.round((PrecoOri-PrecoProd)/PrecoOri*100));}
}

/* Preco Detalhe */
/*
function MostraPrecoDet(PrecoProd,PrecoOri,Cod){
  if(PrecoProd==0 && PrecoOri==0){document.write("&nbsp;");return void(0);}
  if(PrecoProd!=PrecoOri){
    document.write("<span style='font-size:18px; font-weight:400; color:#a2a2a2;'>de <strike>"+FormatPrice(PrecoOri,'R$')+"</strike>&nbsp;&nbsp;</span><span style='font-size:20px; font-weight:700; color:#da187f;'>por <span style='font-size:24px;'>"+FormatPrice(PrecoProd,'R$')+"</span></span>");
  }
  else{
    document.write("<span style='font-size:24px; font-weight:700; color:#da187f;'>"+FormatPrice(PrecoProd,'R$')+"</span>");
  }
}
*/
function MostraPrecoDet(PrecoProd,PrecoOri,Cod){
  const priceGridEl = document.getElementById('idPriceGridFC');
  if(PrecoProd==0 && PrecoOri==0){
    priceGridEl.innerHTML = "&nbsp;";
    return void(0)
  }
  if(PrecoProd!=PrecoOri){
    priceGridEl.innerHTML = "<span style='font-size:18px; font-weight:400; color:#a2a2a2;'>de <strike>"+FormatPrice(PrecoOri,'R$')+"</strike>&nbsp;&nbsp;</span><span style='font-size:20px; font-weight:700; color:#da187f;'>por <span style='font-size:24px;'>"+FormatPrice(PrecoProd,'R$')+"</span></span>"
  }
  else{
    priceGridEl.innerHTML = "<span style='font-size:24px; font-weight:700; color:#da187f;'>"+FormatPrice(PrecoProd,'R$')+"</span>"
  }
}

function fnShowProdMenu(PrecoProd,PrecoOri,IDProd,MaxParcelas){
  var sPrecoMenu="";
  var ComSem="";
  // preço
  if(PrecoProd==0 && PrecoOri==0){sPrecoMenu="&nbsp;";return void(0);}
  if(PrecoProd!=PrecoOri){
    sPrecoMenu="<font style='font-size:12px; font-weight:400; color:#a2a2a2;'>de <strike>"+FC$.Currency+""+FormatPrice(PrecoOri,'')+"</strike>&nbsp;&nbsp;</font><font style='font-size:14px; font-weight:700; color:#da187f;'>por "+FC$.Currency+"<font style='font-size:16px;'>"+FormatPrice(PrecoProd,'')+"</font></font>";
  }
  else{
    sPrecoMenu="<div style='font-size:14px; font-weight:700; color:#da187f;'>"+FC$.Currency+"<font style='font-size:16px;'>"+FormatPrice(PrecoProd,'')+"</font></div>";
  }
  //parcelamento
  if(PrecoProd>0 && MaxParcelas!=1 && Juros.length>0){
    if(MaxParcelas==0||MaxParcelas>Juros.length)MaxParcelas=Juros.length;
    if(Juros[MaxParcelas-1]>0)ComSem=""; else ComSem="sem juros";
    sPrecoMenu+="<div class='EstParcHome'>"+MaxParcelas+"X de "+FormatPrecoReais(CalculaParcelaJurosCompostos(PrecoProd,MaxParcelas))+" "+ComSem+"</div>";
  }
  var oPrecoProd=document.getElementById("PrecoProdMenu"+IDProd);
  if(oPrecoProd){oPrecoProd.innerHTML=sPrecoMenu;}

  //badge
  var oBadge=document.getElementById("DivProdMenu"+IDProd);
  if(oBadge){
    var sBadges="";
    if(oBadge.hasAttribute("data-sale") && PrecoOri>PrecoProd)sBadges+="<div class='badgeProm' title='Oferta'>-"+ getPromocao() +"%</div>";
    //if(oBadge.hasAttribute("data-release"))sBadges+="<div class='badgeNew' title='Lançamento'>NOVO</div>";
    //if(oBadge.hasAttribute("data-highlight"))sBadges+="<div class='badgeHigh' title='Destaque'>&#9733;</div>";
    if(sBadges!="")oBadge.innerHTML+="<div class='badgesProd'>"+ sBadges +"</div>";
  }
  function getPromocao(){return parseInt((Math.round(PrecoOri-PrecoProd)/PrecoOri*100));}
}


var altura_filtro_ajustada_customBanner = false;
/* Exibir Filtros na Lista de Produtos < 640px */
function showDivFilter() {
  var divfil1=document.getElementById("ProductsFilterFC");
  var divfil2=document.getElementById("FilCatClose");
  var divfil3=document.getElementById("ProdFilterShadow");
  
  if($('#idDivArqCustomFC').length > 0 && altura_filtro_ajustada_customBanner == false)
  {
    
    fnInsertAfter(divfil3,divfil1);
    $('#ProdFilterShadow').height($("#idFCLeftContentRight").height());
    window.scrollTo(0,0);
    altura_filtro_ajustada_customBanner = true;
  }
  
  window.scrollTo(0,0);
  
  
  if(divfil1.style.display=="none" || divfil1.style.display==""){
    divfil1.style.display="block";
    divfil2.style.display="block";
    divfil3.style.display="block";

    //fernando - 11/09/19
    //evitar que o tamanho do filtro quebre o layout para quando ele for maior que o conteudo
    if(FC$.Page=='Products')
    {
      var divFiltro = FCLib$.GetID("ProductsFilterFC");
      var alturaFiltro = divFiltro.offsetHeight;
      var divConteudo = FCLib$.GetID("idFCContent");
      var alturaConteudo = divConteudo.offsetHeight;

      if(alturaFiltro > alturaConteudo)
      {
        divConteudo.style.height = alturaFiltro + "px";
      }
      

    }
    //fernando - 11/09/19

  } else {
    divfil1.style.display="none";
    divfil2.style.display="none";
    divfil3.style.display="none";
  }
}


/* Insercao de texto no final das Categorias */
function CategoryDescription(){
  
  var d = $(".category-description");

  //$("#rodape_alinha").hide();
  for(var i = 0; i < d.length; i++)
  {
    if (d[i] && typeof d[i] != "undefined") {
      if(i==0)
      {
        
        
        var c = document.querySelector("#idFCContent");
        jQuery(c).append(d[i]);
        d[i].style.cssText="display:block;clear:both;padding-top:50px;";
      }
     
    }
  }
  
  

}


/* Formato dos Juros */
function FormatJuros(num){
  num=num.toString().replace(/\$|\,/g,'');
  if(isNaN(num))num="0";
  sign=(num==(num=Math.abs(num)));
  num=Math.floor(num*100+0.54440001);
  cents=num%100;
  num=Math.floor(num/100).toString();
  if(cents<10)cents="0"+cents;
  for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
  if(num==0&&cents==0)return '0%'; else return ((sign)?'':'-')+' '+num+','+cents+'%';
}

function FormatNum(num){
  num=num.toString().replace(/\$|\,/g,'');
  if(isNaN(num))num="0";
  sign=(num==(num=Math.abs(num)));
  num=Math.floor(num*100+0.54440001);
  num=Math.floor(num/100).toString();
  for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
  return ((sign)?'':'-')+num;
}

/* Funcao para mostrar Parcelamento */
function fnMaxInstallmentsGrid(PrecoProd,MaxParcelas){
  var ComSem;
  if(typeof Juros!="undefined"){
    if(PrecoProd==0||MaxParcelas==1||Juros.length==0)return "";
    if(MaxParcelas==0||MaxParcelas>Juros.length)MaxParcelas=Juros.length;
    if(Juros[MaxParcelas-1]>0)ComSem=""; else ComSem="sem juros";
    return "<div class=EstParc><b>"+MaxParcelas+"X</b> de <b>"+FormatPrecoReais(CalculaParcelaJurosCompostos(PrecoProd,MaxParcelas))+"</b> "+ComSem+"</div>";
  }else{
    return "";
  }
}

/* Funcao para mostrar valor formatado */
function FormatNumber(num){
  var num=num.toString().replace(/\$|\,/g,'');
  if(isNaN(num))num="0";
  sign=(num==(num=Math.abs(num))); num=Math.floor(num*100+0.54440001); num=Math.floor(num/100).toString();
  for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
  return ((sign)?'':'-')+num;
}

/* Funcao para mostrar valor economizado em produtos em promocao */
function fnShowEconomyGrid(ProdPrice,ProdPriceOri){
  if(ProdPrice!=ProdPriceOri && typeof FormatNumber == 'function' && typeof FormatPrice == 'function' ){
    var oBadgeDetProm=document.getElementById("idDivBadge");
    if(oBadgeDetProm)oBadgeDetProm.innerHTML="<div class='badgesProdDet'>-"+parseInt(Math.round((ProdPriceOri-ProdPrice)/ProdPriceOri*100))+"%</div>";
    return " <!--div class=Economize>Economize <b>"+ FormatPrice(ProdPriceOri-ProdPrice,'R$') +"</b></div-->";
  }
  else{
    return "";
  }
}


/* Funcao de apoio para inserir algum codigo */
function fnInsertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/* Funcoes para o Rodape */
function fnFooter() {


  if(FC$.ClientID==0)FCLib$.onReady(fnShowGlobalSignin);

  // Select - Ordenacao de Produtos na Lista
  if(FC$.Page=="Products"){
    if(iQtdProds>2){
      var oScript=document.createElement('script');
      oScript.type='text/javascript';
      oScript.async=true;
      oScript.src=FC$.PathHtm+'incpaginacaoorder.js';
      var sAddScript=document.getElementsByTagName('script')[0];
      sAddScript.parentNode.insertBefore(oScript,sAddScript);
    }
  }
  // Imagens do Pedido
  else if(FC$.Page=="Track")FCLib$.onReady(FCLib$.fnOrderTrack());

  // Quebra Formulario Cadastro
  else if (FC$.Page=="Register" && FC$.Step=="Registration") {
    var tables = document.getElementById('idRegisterFC');
    tables.classList.add("pass2");}

  /* Botao no Cupom de Desconto no Carrinho */
  else if(FC$.Page=="Cart")fnButCupom();

  /* Texto final na Lista de Produtos */
  //CategoryDescription();

  
}

/* Botao Adicionar Cupom no Carrinho */
function fnButCupom(){
  var oCupom=document.getElementById("Cupom");
  if(oCupom){
    var oNewElement=document.createElement("span");
    oNewElement.innerHTML="&nbsp;<button id='FCCartCupomBut' type='submit' onclick=\"document.Lista.Buy.value='';\">Aplicar Cupom</button>";
    fnInsertAfter(oNewElement,oCupom);
  }
}

/* Funcao Adicionado no Carrinho */
var oDivShowCartOnPage=null;
var iLastCartOnPage=0;

function ShowCartOnPage(IDLoja,iErr,sMsg,sCartText,sCheckoutText,este){

  if(!IsFramePage){
    Cart$.fnShowCartCheckout(null,iErr,sMsg);
  }
  else {
    var oPos=getPos(este);
    if(oDivShowCartOnPage==null){
      var oNewElement=document.createElement("div");
      oNewElement.setAttribute("id","DivShowCartOnPage");
      oDivShowCartOnPage=este.parentNode.insertBefore(oNewElement,este);
    }
    oDivShowCartOnPage.style.visibility="visible";
    var sHTML="<div style='width:100%;'>";
    sHTML+="<div class='ShowCartTxt1'>Adicionado<br>ao CARRINHO <img src='images/cancel_off.png' style='cursor:pointer;margin-left:5px;' onclick=oDivShowCartOnPage.style.visibility='hidden'></div>";
    if(iErr==0){
      sHTML+="<div class='ShowCartTxt2'><a href='/addproduto.asp?idloja="+ IDLoja +"' target='_top'>Fechar Pedido?</a></div>";
    }
    else{
      sHTML+="<div style='text-align:center'><img src='images/cancel_off.png' style='cursor:pointer;margin-left:5px;' onclick=oDivShowCartOnPage.style.visibility='hidden'></div>";
    }
    sHTML+="</div>";
    oDivShowCartOnPage.innerHTML=sHTML;
    iLastCartOnPage++;
    setTimeout("if(iLastCartOnPage=="+ iLastCartOnPage +")oDivShowCartOnPage.style.visibility='hidden';",5000);
    sF$.fnUpdateCart(true,IsFramePage); //função para atualizar carrinho

  }

}

function fnUpdateCart(IsAdd,IsSpy){FCLib$.fnAjaxExecFC("/xmlcart.asp","idloja="+FC$.IDLoja,false,fnCallbackUpdateCart,IsAdd,IsSpy);}

function fnCallbackUpdateCart(oHTTP,IsAdd,IsSpy){
  if(oHTTP.responseXML){
    oXML=oHTTP.responseXML;
    var oCarts=oXML.getElementsByTagName("cart");
    try{TotalQtyProdCart=(oCarts[0].getElementsByTagName("TotalQty")[0].childNodes[0].nodeValue);}catch(e){TotalQtyProdCart="0"}
    iItensCesta=TotalQtyProdCart;
    if(IsSpy){
      var oReferrer=window.parent;
      try{oReferrer.document.getElementById("idCartItemsTop").innerHTML=iItensCesta;if(iItensCesta>99){$(".topocart a").css("font-size","11px")}else{$(".topocart a").css("font-size","12px")}}catch(e){}
    }
    else {
      try{document.getElementById("idCartItemsTop").innerHTML=iItensCesta;if(iItensCesta>99){$(".topocart a").css("font-size","11px")}else{$(".topocart a").css("font-size","12px")}}catch(e){}
    }
  }
}


// Don't Go Popup
if(FC$.Page=="Home"){
  FCLib$.onReady(function(){
    if(FCLib$.GetID("overlay")){

      /*
  //Dynamic Don't Go Container
  var dynamicDontGoContainer = document.createElement('div');
  dynamicDontGoContainer.id = 'ShowDontGoPopup';
  dynamicDontGoContainer.className = 'DontGoPopup';
  document.getElementsByTagName('body')[0].appendChild(dynamicDontGoContainer);

  //Dynamic Don't Go Container Elements
  var dynamicDontGoContainerElements = document.createElement('div');
  dynamicDontGoContainerElements.className = 'DontGoPopupContent';
  dynamicDontGoContainer.appendChild(dynamicDontGoContainerElements);

  //Dynamic Don't Go Elements Close Button
  var dynamicDontGoElementsCloseButton = document.createElement('div');
  dynamicDontGoElementsCloseButton.className = 'DontGoPopupCloseButton';
  dynamicDontGoContainerElements.appendChild(dynamicDontGoElementsCloseButton);
  dynamicDontGoElementsCloseButton.innerHTML = "<img id='idBtnDontGoClose' border='0'>";

  //Dynamic Don't Go Elements Banner
  var dynamicDontGoElementsBanner = document.createElement('div');
  dynamicDontGoElementsBanner.className = 'DontGoBanner';
  dynamicDontGoContainerElements.appendChild(dynamicDontGoElementsBanner);
  dynamicDontGoElementsBanner.innerHTML = "<a target='_self' href='/page,idloja,"+FC$.IDLoja+",arq,promocao.htm,promocao'><img id='idImgDontGo' src='' border='0'></a>";

  //PreLoading Image Banner
  var preLoadingDontGoBanner = new Image();
  preLoadingDontGoBanner.onload = function () {
  document.getElementById('idImgDontGo').src = preLoadingDontGoBanner.src;
  };
  preLoadingDontGoBanner.src = FC$.PathImg +"bannerpopupdontgo.jpg?cccfc=1";
  */
      //Show Don't Go Popup
      /*FCLib$.fnDontGo(userDontGo,{
  DontGoBtnClose:FC$.PathImg +"botdontgoclose.svg?cccfc=1", //Close button
  DontGoBanner:FC$.PathImg +"bannerpopupdontgo.jpg?cccfc=1", //Banner
  DontGoAltParam:"UM DESCONTO ESPECIAL PARA VOCÊ!"}, //Alt Param
  "DontGoCookie"); //Cookie name
  */
    }
  });
}
function userDontGo(oParam){
  var OpenDontGoPopup=document.getElementById('ShowDontGoPopup');
  if(OpenDontGoPopup){
    document.getElementById("idBtnDontGoClose").src=oParam.DontGoBtnClose; //Close button
    window.onload=OpenDontGoPopup.style.display="block";
    var CloseDontGoPopup=document.getElementsByClassName("DontGoPopupCloseButton")[0];
    CloseDontGoPopup.onclick=function(){OpenDontGoPopup.style.display="none";}
  }
}


/* Funcao Cookie */
function fnGetCookie(name){
  var arg=name+"=";
  var alen=arg.length;
  var clen=document.cookie.length;
  var i=0;
  while (i<clen){
    var j=i+alen;
    if(document.cookie.substring(i,j)==arg)return fnGetCookieVal(j);
    i=document.cookie.indexOf(" ",i)+1;
    if(i==0)break;
  }
  return null;
}
function fnGetCookieVal(offset){
  var endstr=document.cookie.indexOf(";",offset);
  if (endstr==-1)endstr=document.cookie.length;
  return unescape(document.cookie.substring(offset,endstr));
}
function fnSetCookie(name,value){
  var argv=fnSetCookie.arguments;
  var argc=fnSetCookie.arguments.length;
  var expires=(argc>2)?argv[2]:null;
  var path=(argc>3)?argv[3]:null;
  var domain=(argc>4)?argv[4]:null;
  var secure=(argc>5)?argv[5]:false;
  document.cookie=name+"="+escape(value)+((expires==null)?"":(";expires=" + expires.toGMTString()))+((path==null)?"":(";path="+path))+((domain==null)?"":(";domain="+domain))+((secure==true)?"; secure":"");
}

/* Troca da Segunda Foto - Home */
function changeImages(sImagemProdPri, sImagemProdDet, sDescUrl, sIdProduto, sNomeProd) {
  var replaceNomeProd = sNomeProd.replace(/-/g,' ');
  var tagImgPri = sImagemProdPri.replace(/\s/g, '');
  var sIdCampo = "DivImagemProdDouble" + sIdProduto;
  if (tagImgPri == "") {
    document.getElementById(sIdCampo).innerHTML = "<img src='/images/nd0.gif'>";
  } else {
    var tagImgDet = sImagemProdDet.replace(/\s/g, '');
    var sLenghtImg = tagImgDet;
    var nLenghtImg = sLenghtImg.search(",");
    if (nLenghtImg < 0) {
      document.getElementById(sIdCampo).innerHTML = "<a href=" + sDescUrl + "><img src='" + sImagemProdPri + "' alt=\""+ replaceNomeProd +"\" loading='lazy'></a>";
    } else {
      var valImgDet = null;
      if (tagImgDet != null) {
        valImgDet = tagImgDet.split(",");
      }
      var imgDet0 = valImgDet[0];
      var imgDet1 = valImgDet[1];
      if ((imgDet0.indexOf('#') >= 0 && imgDet0.indexOf('/') >= 0) || (imgDet1.indexOf('#') >= 0 && imgDet1.indexOf('/') >= 0)) {
        imgDet0 = valImgDet[0].replace('#', "/lojas/");
        imgDet1 = valImgDet[1].replace('#', "/lojas/");
      } else if (imgDet0.indexOf('#') >= 0 || imgDet1.indexOf('#') >= 0) {
        imgDet0 = valImgDet[0].replace('#', FC$.PathPrdExt);
        imgDet1 = valImgDet[1].replace('#', FC$.PathPrdExt);
      } else {
        imgDet1 = FC$.PathPrd + valImgDet[1];
      }
      if (imgDet0 == null) {
        document.getElementById(sIdCampo).innerHTML = "<a href=" + sDescUrl + "><img src='" + sImagemProdPri + "' alt=\""+ replaceNomeProd +"\" loading='lazy'></a>";
      } else {
        document.getElementById(sIdCampo).innerHTML = "<a href=" + sDescUrl + "><img src='" + imgDet0 + "'' border='0'' onmouseover=\"this.src='" + imgDet1 + "'\" onmouseout=\"this.src='" + imgDet0 + "'\" alt=\""+ replaceNomeProd +"\" loading='lazy'></a>";
      }
    }
  }
}


//  Calculo de Frete no Carrinho //
function fnCustomizeCart(){

  //insere campo solicitando o CEP para calculo do lado esquerdo
  var oFCCartSubtotals=document.getElementById("FCCartSubtotals");
  if(document.getElementById("idColPesoFC"))var sColspan=3; else var sColspan=2;
  if(oFCCartSubtotals){
    var oNewElement=document.createElement("tr");
    oNewElement.setAttribute("id","FCCartFreightCalc");
    oNewElement.setAttribute("class","not-on-small");
    var oTRFreightCalc=oFCCartSubtotals.parentNode.insertBefore(oNewElement,oFCCartSubtotals);
    oTRFreightCalc.innerHTML="<td>Digite o CEP para calcular o Frete: <input type=text id=idZipC1 size=10 maxlength=9 class=InputText> <input type=button value='Calcular Frete' class=idBut class=InputButton onclick='fnGetShippingValue(1)'></td><td colspan="+ sColspan +"><span id=idShippingObs1></span></td><td align=right><span id=idShippingValue1></span><img src='/images/loading.gif' vspace=3 style='display:none' id=idImgLoadingCEP1></td>";
  }
  //insere tr para mostrar info sobre frete grátis
  $("#FCCartFreightCalc").after("<tr id='Cart-mensagemFrete' style='display:none; color:#da187f; text-align:right;'><td colspan='4'>Em compras acima de R$ 199,00 seu frete é GRÁTIS!<br><a href='/home.asp?idloja=20368'>Clique aqui para comprar mais</a></td></tr>");
  //insere tr para mostrar info sobre item em pre-venda prevenda
  $("#FCCartFreightCalc").after("<tr id='Cart-mensagemPreVenda' style='display:none; color:red; text-align:right;'><td colspan='4'>Prazo diferenciado: pedido contém item em pré-venda</td></tr>");
  //insere campo solicitando o CEP para calculo do lado direito
  var oFCCartRight=document.getElementById("FCCartSmallSubtotalPrice");
  if(!oFCCartRight)oFCCartRight=document.getElementById("FCCartSmallSubtotals");
  if(oFCCartRight){
    var oNewElement=document.createElement("div");
    oNewElement.setAttribute("id","FCCartSmallFreightCalc");
    var oTRFreightCalc=oFCCartRight.parentNode.insertBefore(oNewElement,oFCCartRight);
    var sCEPCont="<div id='FCCartSmallFreight'>";
    sCEPCont+=" <div class='FCCartFreightInfo'>";
    sCEPCont+=" <span class='FCCartFreightLabel'>Digite o CEP para calcular o Frete:</span>";
    sCEPCont+=" <input type=number id=idZipC2 size=10 maxlength=9 class=InputText>";
    sCEPCont+=" <div id='FCCartSmallFreightBut'>";
    sCEPCont+=" <input type=button value='Calcular Frete' class=idBut class=InputButton onclick='fnGetShippingValue(2)'>";
    sCEPCont+=" </div>";
    sCEPCont+=" <img src='/images/loading.gif' vspace=3 style='display:none' id=idImgLoadingCEP2>";
    sCEPCont+=" </div>";
    sCEPCont+="</div>";
    sCEPCont+="<div id='FCCartSmallFreightPrice'>";
    sCEPCont+=" <ul>";
    sCEPCont+=" <li class='FCCartFreightPriceLabel' id=idShippingObs2>Frete:</li>";
    sCEPCont+=" <li class='FCCartFreightPriceValue' id=idShippingValue2>Calcule Acima</li>";
    sCEPCont+=" </ul>";
    sCEPCont+="</div>";
    oTRFreightCalc.innerHTML=sCEPCont;
    fnGetCEP();
  }

  $(".idBut").click(function() {

    primeiraTentativaPesquisarCEP = true;

  });

}
function fnGetCEP(){
  //se já tem CEP em cookie já mosta cálculo
  var sNumCEP=FCLib$.GetCookie("CEP"+FC$.IDLoja);
  if(sNumCEP!=""){
    document.getElementById("idZipC1").value=sNumCEP;
    document.getElementById("idZipC2").value=sNumCEP;
    fnGetShippingValue(0);
  }
}
function fnGetShippingValue(iField){
  if(iField==0){
    var sCEP=document.getElementById("idZipC1").value;
    if(sCEP=="")sCEP=document.getElementById("idZipC2").value;
  }
  else{
    var sCEP=document.getElementById("idZipC"+iField).value;
  }

  //mensagem para frete gratis
  $("#Cart-mensagemFrete").hide();

  if (verificaCapital_RM_EstadoSP(sCEP) == 0)
  {
    //Alteração em 04/02/2021 por Gabriela - Colocar quanto falta para ganhar frete grátis
    var valorCarrinho = $("#FCCartSubtotals .FCPriceValue")[0].innerText;
    valorCarrinho = valorCarrinho.replace(",",".");
    
    //voltar 99 para 239
    //voltar frete para 99 - colocar 99 no lugar do 1 na formula
    var faltaFrete = (99 - valorCarrinho).toFixed(2).toString();
    var widthBarra = ((100 - (faltaFrete/99)*100));
    faltaFrete = faltaFrete.replace(".",",");
    
    /*document.getElementById("Cart-mensagemFrete").innerHTML = `<td colspan='4'>Faltam apenas R$${faltaFrete} para ganhar <span style='color: #008ae1'>FRETE GRÁTIS!</span><br>
                                                                <div id='Cart-ProgressoFreteGratis' class='Cart-Design-progresso-frete-gratis'><div id='Cart-InternoProgFreteGratis' class='Cart-Design-interno-prog-frete-gratis'></div>																	<br></div>
                                                                <a href='/home.asp?idloja=20368' class='right'>Clique aqui para comprar mais</a></td>`;
    

	  if (widthBarra < 100) {
        document.querySelector('#Cart-InternoProgFreteGratis').style.width = `${widthBarra}%` ;
      }*/
   // document.getElementById("Cart-mensagemFrete").innerHTML = "<td colspan='4'>Em compras acima de R$ 239,00 seu frete é GRÁTIS!<br><a href='/home.asp?idloja=20368'>Clique aqui para comprar mais</a></td>";
  }
  else
  {
    //Alteração em 04/02/2021 por Gabriela - Colocar quanto falta para ganhar frete grátis
    var valorCarrinho = $("#FCCartSubtotals .FCPriceValue")[0].innerText;
    valorCarrinho = valorCarrinho.replace(",",".");
    
    //voltar 99 para 199
    //voltar frete para 99 - colocar 99 no lugar do 1 na formula
    var faltaFrete = (99 - valorCarrinho).toFixed(2).toString();
    var widthBarra = ((100 - (faltaFrete/99)*100));
    faltaFrete = faltaFrete.replace(".",",");
    
    /*document.getElementById("Cart-mensagemFrete").innerHTML = `<td colspan='4'>Faltam apenas R$${faltaFrete} para ganhar <span style='color: #008ae1'>FRETE GRÁTIS!</span><br>
																<div id='Cart-ProgressoFreteGratis' class='Cart-Design-progresso-frete-gratis'><div id='Cart-InternoProgFreteGratis' class='Cart-Design-interno-prog-frete-gratis'></div></div>
																<a href='/home.asp?idloja=20368' class='right'>Clique aqui para comprar mais</a><br></td>`;
    
      
	  if (widthBarra < 100) {
        document.querySelector('#Cart-InternoProgFreteGratis').style.width = `${widthBarra}%` ;
      }*/
    //document.getElementById("Cart-mensagemFrete").innerHTML = "<td colspan='4'>Em compras acima de R$ 199,00 seu frete é GRÁTIS!<br><a href='/home.asp?idloja=20368'>Clique aqui para comprar mais</a></td>";
  }

	document.getElementById("Cart-mensagemFrete").innerHTML = `<td colspan='4'>Faltam R$${faltaFrete} para ganhar <span style='color: #008ae1'>FRETE GRÁTIS!</span><br>
																<div id='Cart-ProgressoFreteGratis' class='Cart-Design-progresso-frete-gratis'><div id='Cart-InternoProgFreteGratis' class='Cart-Design-interno-prog-frete-gratis'></div></div>
																<a href='/home.asp?idloja=20368' class='right'>Clique aqui para comprar mais</a><br></td>`;
    
      
	  if (widthBarra < 100) {
        document.querySelector('#Cart-InternoProgFreteGratis').style.width = `${widthBarra}%` ;
      }
  
  document.getElementById("idZipC1").value=sCEP;
  document.getElementById("idZipC2").value=sCEP;
  FCLib$.SetCookie("CEP"+FC$.IDLoja,sCEP);
  if(sCEP==""){
    document.getElementById("idShippingValue1").innerHTML="<span style=color:#dc087f;>Informe o CEP</span>";
    document.getElementById("idShippingValue2").innerHTML="<span style=color:#dc087f;>Informe o CEP</span>";
  }
  else{
    document.getElementById("idShippingValue1").innerHTML="";
    document.getElementById("idShippingValue2").innerHTML="";
    var oImgLoadingCEP1=document.getElementById("idImgLoadingCEP1");
    if(oImgLoadingCEP1){oImgLoadingCEP1.style.display="";}
    var oImgLoadingCEP2=document.getElementById("idImgLoadingCEP2");
    if(oImgLoadingCEP2){oImgLoadingCEP2.style.display="";}
    AjaxExecFC("/XMLShippingCEP.asp","IDLoja="+ FC$.IDLoja +"&cep="+ sCEP,false,fnprocessXMLCEPC);
  }
}

function fnprocessErroConsultaFrete(obj){}

function fnprocessXMLCEPC(obj){

  var oShippingObs1=document.getElementById("idShippingObs1");
  var oShippingObs2=document.getElementById("idShippingObs2");
  var oShippingValue1=document.getElementById("idShippingValue1");
  var oShippingValue2=document.getElementById("idShippingValue2");
  var iErr=ReadXMLNode(obj,"err");if(iErr==null)return;
  if(iErr!="0"){
    var oImgLoadingCEP1=document.getElementById("idImgLoadingCEP1");
    if(oImgLoadingCEP1){oImgLoadingCEP1.style.display="none";}
    var oImgLoadingCEP2=document.getElementById("idImgLoadingCEP2");
    if(oImgLoadingCEP2){oImgLoadingCEP2.style.display="none";}
    oShippingValue1.innerHTML="<span id=idErrXMLCEPFC style=color:#dc087f;>"+ "CEP inválido" +"</span>";
    oShippingValue2.innerHTML="<span id=idErrXMLCEPFC style=color:#dc087f;>"+ "CEP inválido" +"</span>";
    return;
  }
  oShippingObs1.innerHTML="";oShippingObs2.innerHTML="";oShippingValue1.innerHTML="";oShippingValue2.innerHTML="";
  var OptName=ReadXMLNode(obj,"Opt1Name");
  var OptValue=ReadXMLNode(obj,"Opt1Value");
  var OptObs=ReadXMLNode(obj,"Opt1Obs");
  //oShippingObs1.innerHTML="<b>"+ OptName +"</b><br><span class=ObsFreightCalc>"+ OptObs +"</span>";
  //oShippingObs2.innerHTML="<b>"+ OptName +"</b><br><span class=ObsFreightCalc>"+ OptObs +"</span>";
  

  if(OptName == "Retirar na loja")
  {
    OptName=ReadXMLNode(obj,"Opt2Name");
    OptValue=ReadXMLNode(obj,"Opt2Value");
    OptObs=ReadXMLNode(obj,"Opt2Obs");
  }


  deuErroBuscaFrete = false;

  //AJUSTE PROBLEMA CONEXAO COM SERVICO EXTERNO DE FRETE
  //o máximo de modos de entrega que pode ser retornado é 3 + Retirar Loja. Portanto, se for maior ou igual a 5, é porque deu erro de consulta
  if(ReadXMLNode(obj,"OptQt") >= 5)
  {
    var sCEP=document.getElementById("idZipC1").value;
    if(sCEP=="")sCEP=document.getElementById("idZipC2").value;
    AjaxExecFC("https://bebefofuxo.net/scripts/calculo_frete/falhaComunicacaoServicoFrete.php","cep="+ sCEP,false,fnprocessErroConsultaFrete);

    if(primeiraTentativaPesquisarCEP == false)
    {

      var total = ReadXMLNode(obj,"OptQt");
      for(var i = 0; i < total; i++)
      {
        var a = i + 1;
        var t = "Opt" + a + "Name";
        var s = "Opt" + a + "Value";
        var u = "Opt" + a + "Obs";
        if(ReadXMLNode(obj,t) == "Encomenda PAC")
        {
          OptName=ReadXMLNode(obj,t);
          OptValue=ReadXMLNode(obj,s);
          OptObs=ReadXMLNode(obj,u);
        }
        else if(ReadXMLNode(obj,t) == "SEDEX")
        {
          OptName=ReadXMLNode(obj,t);
          OptValue=ReadXMLNode(obj,s);
          OptObs=ReadXMLNode(obj,u);
        }
      }
    }
    else
    {
      primeiraTentativaPesquisarCEP = false;
      deuErroBuscaFrete = true;

      var pesoTotal = 1000;

      pesoTotal = pesoTotal/1000;

      var valorCarrinho = $("#FCCartSubtotals .FCPriceValue")[0].innerText;
      valorCarrinho = valorCarrinho.replace(",",".");

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = fnprocessExisteTransportadora;
      xhr.open("GET","https://bebefofuxo.net.br/scripts/calculo_frete/existe_transportadora.php?cep="+sCEP+"&peso="+pesoTotal+"&valor="+valorCarrinho,true);
      xhr.send();
    }

  }



  /* ajuste info de frete */

  //calcula prazo pre-venda prevenda

  //var prazoPreVenda = calcularPrazoPreVenda();
  prazoPreVenda = 0;
  
  if(prazoPreVenda != 0)
  {
    $("#Cart-mensagemFrete").css('color','gray');
    $("#Cart-mensagemPreVenda").show();
  }


  var textoFinal = "";

  //console.log(OptName);
  //se for Correios
  if (OptName == "Encomenda PAC" || OptName == "SEDEX") {


    //prazo de entrega
    var prazo = OptObs;


    var array = prazo.split(" ");

    var dias;
    if(array.length == 6)
    {
      //prazo retornado pelos Correios + qtde extra de dias adicionado pela loja
      dias = parseInt(array[3]) + prazoPreVenda;
    }
    else if(array.length == 3)
    {
      //prazo retornado pelos Correios + qtde extra de dias adicionado pela loja
      dias = parseInt(array[0]) + prazoPreVenda;
    }

    //definindo o texto com "dias úteis"
    var diasUteis = dias+" dias úteis";

    textoFinal = diasUteis;


  } else {

    //prazo de entrega
    var prazo = OptObs;


    var array = prazo.split(" ");

    var dias;
    if(array.length == 6)
    {
      //prazo retornado pelos Correios + qtde extra de dias adicionado pela loja
      dias = parseInt(array[3]) + prazoPreVenda;
    }
    else if(array.length == 3)
    {
      //prazo retornado pelos Correios + qtde extra de dias adicionado pela loja
      dias = parseInt(array[0]) + prazoPreVenda;
    }

    //definindo o texto com "dias úteis"
    var diasUteis = dias+" dias úteis";

    textoFinal = diasUteis;
    
    if (textoFinal == "1 dias úteis") textoFinal = "1 dia útil";
  }

  //mensagem sobre valor mínimo para frete grátis
  var valorMinimo = 0;
  if(capital_rm_estadoSP == 1)
  {
    //voltar 99 para 199
    //voltar frete para 99
    valorMinimo = 99;
  }
  else
  {
    //voltar 99 para 239
    //voltar frete para 99
    valorMinimo = 99;
  }
  var valorCarrinho = getPriceCart();
  if (valorCarrinho < valorMinimo) {
    $("#Cart-mensagemFrete").show();
    
	if((cupom_frete_gratis_ativo && FC$.CouponID == id_cupom_frete_gratis) || politica_frete_gratis_geral_ativo == true)
    {
      $("#Cart-mensagemFrete").hide();
    }
  }
  
  
  var OptNameAJato = "";
  var OptValueAJato = "";
  var OptObsAJato = "";
  
  var total = ReadXMLNode(obj,"OptQt");
  //verificar se tem entrega a jato
  for(var i = 0; i < total; i++)
  {
    var a = i + 1;
    var t = "Opt" + a + "Name";
    var s = "Opt" + a + "Value";
    var u = "Opt" + a + "Obs";
    if(ReadXMLNode(obj,t) == "PEX")
    {
      OptNameAJato=ReadXMLNode(obj,t);
      OptValueAJato=ReadXMLNode(obj,s);
      OptObsAJato=ReadXMLNode(obj,u);
    }
  }
  
  var texto_entrega_jato = "";
  
  
  //OptObsAJato verifica se o prazo é de um dia ou diferente. Se for diferente é que veio da base interna, então não mostramos.
  if(OptValueAJato != ""  && OptName != "PEX" && OptObsAJato == "1 dias úteis")
  {
    
    
    var data_hoje = new Date();
    var dia_hoje = data_hoje.getDay();
    var hora_atual = data_hoje.getHours();

    texto_entrega_jato += qual_dia();

  }
  
  /* ajuste info de frete */

  if(deuErroBuscaFrete == false)
  {
    oShippingObs1.innerHTML="<b>Frete: </b>";
    oShippingObs2.innerHTML="<b>Frete: </b>";
    
    if(texto_entrega_jato == "")
    {
      
      	$("#idShippingValue1").parent().prev().prop("colspan","2");
      	$("#idShippingValue1").parent().prop("colspan","1");
      
      	$("#idShippingValue2").attr ("style","width: 50% !important");
      	$("#idShippingObs2").attr ("style","width: 50% !important");
      
      	oShippingValue1.innerHTML="<b>"+OptValue+"</b><br>"+textoFinal;oShippingValue1.style.display="block";
    	oShippingValue2.innerHTML="<b>"+OptValue+"</b><br>"+textoFinal;oShippingValue2.style.display="block";
    }
    else
    {
      	$("#idShippingValue1").parent().prev().prop("colspan","1");
      	$("#idShippingValue1").parent().prop("colspan","2");
      
        oShippingValue1.innerHTML="<input type='radio' id='id_radio_entrega_normal' name='tipo_entrega' value='entrega_normal' checked><label for='id_radio_entrega_normal' id='id_lbl_entrega_normal'><b>"+OptValue+"</b> ("+textoFinal+")</label><br><input type='radio' id='id_radio_entrega_jato' name='tipo_entrega' value='entrega_jato'><label for='id_radio_entrega_jato' id='id_lbl_entrega_jato'><b>"+OptValueAJato+"</b> <span style='color:#008ae1'><b>("+texto_entrega_jato+")</b></span>&#x1F680;</label>";


        $('#id_radio_entrega_jato').click(function() {
          if($('#id_radio_entrega_jato').is(':checked'))
          {
            var iValFrete=OptValueAJato.replace("R$ ","").replace(",",".");
    		var iTotalCesta=parseFloat(iValorCesta)+parseFloat(iValFrete);

			if(document.getElementById("idColPesoFC"))var sColspan=" colspan=2"; else var sColspan="";
            $('#FCCartTotalCalc').html("<td colspan=3 align=right><b>Total:</b></td><td align=right"+ sColspan +"><b>"+ FormatPrice(iTotalCesta,FC$.Currency) +"</b></td>");

            window.localStorage.setItem('entrega_jato', 1);

          }
        });


        $('#id_radio_entrega_normal').click(function() {
          if($('#id_radio_entrega_normal').is(':checked'))
          {
            var iValFrete=OptValue.replace("R$ ","").replace(",",".");
    		var iTotalCesta=parseFloat(iValorCesta)+parseFloat(iValFrete);

			if(document.getElementById("idColPesoFC"))var sColspan=" colspan=2"; else var sColspan="";
            $('#FCCartTotalCalc').html("<td colspan=3 align=right><b>Total:</b></td><td align=right"+ sColspan +"><b>"+ FormatPrice(iTotalCesta,FC$.Currency) +"</b></td>");

            if(window.localStorage.getItem('entrega_jato') == 1)
            {
              window.localStorage.removeItem('entrega_jato');
            }
          }
        });
      
      
      
      	$("#idShippingValue2").attr("style","width: 75% !important");
      	$("#idShippingObs2").attr("style","width: 25% !important");
      
      
      
    	oShippingValue2.innerHTML="<input type='radio' id='id_radio_entrega_normal_small' name='tipo_entrega_small' value='entrega_normal_small' checked><label for='id_radio_entrega_normal_small' id='id_lbl_entrega_normal_small'><b>"+OptValue+"</b> ("+textoFinal+")</label><br><input type='radio' id='id_radio_entrega_jato_small' name='tipo_entrega_small' value='entrega_jato_small'><label for='id_radio_entrega_jato_small' id='id_lbl_entrega_jato_small'><b>"+OptValueAJato+"</b> <span style='color:#008ae1'><b>("+texto_entrega_jato+")</b></span>&#x1F680;</label>";
      
      $('#id_radio_entrega_jato_small').click(function() {
          if($('#id_radio_entrega_jato_small').is(':checked'))
          {
            var iValFrete=OptValueAJato.replace("R$ ","").replace(",",".");
    		var iTotalCesta=parseFloat(iValorCesta)+parseFloat(iValFrete);

            $('#FCCartSmallTotalPrice').html("<ul><li class='FCCartSubtotalPriceLabel'>Total:</li><li class='FCCartSubtotalPriceValue'><b>"+ FormatPrice(iTotalCesta,FC$.Currency) +"</b></li></ul>");

            window.localStorage.setItem('entrega_jato', 1);

          }
        });


        $('#id_radio_entrega_normal_small').click(function() {
          if($('#id_radio_entrega_normal_small').is(':checked'))
          {
            var iValFrete=OptValue.replace("R$ ","").replace(",",".");
    		var iTotalCesta=parseFloat(iValorCesta)+parseFloat(iValFrete);


            $('#FCCartSmallTotalPrice').html("<ul><li class='FCCartSubtotalPriceLabel'>Total:</li><li class='FCCartSubtotalPriceValue'><b>"+ FormatPrice(iTotalCesta,FC$.Currency) +"</b></li></ul>");

            if(window.localStorage.getItem('entrega_jato') == 1)
            {
              window.localStorage.removeItem('entrega_jato');
            }
          }
        });
      

        if(window.localStorage.getItem('entrega_jato') == 1)
        {
          $('#id_radio_entrega_jato').prop("checked",true).trigger("click");
          $('#id_radio_entrega_jato_small').prop("checked",true).trigger("click");
        }
        else
        {
          $('#id_radio_entrega_normal').prop("checked",true).trigger("click");
          $('#id_radio_entrega_normal_small').prop("checked",true).trigger("click");
        }

      
        
    }
    
    
    var oImgLoadingCEP1=document.getElementById("idImgLoadingCEP1");
    if(oImgLoadingCEP1){oImgLoadingCEP1.style.display="none";}
    var oImgLoadingCEP2=document.getElementById("idImgLoadingCEP2");
    if(oImgLoadingCEP2){oImgLoadingCEP2.style.display="none";}
    //remove elementos
    var oFCCartTotalCalc=document.getElementById("FCCartTotalCalc");
    if(oFCCartTotalCalc){oFCCartTotalCalc.parentNode.removeChild(oFCCartTotalCalc);}
    var oFCCartSmallTotalPrice=document.getElementById("FCCartSmallTotalPrice");
    if(oFCCartSmallTotalPrice){oFCCartSmallTotalPrice.parentNode.removeChild(oFCCartSmallTotalPrice);}
    //exibe total com frete
    var iValFrete=OptValue.replace("R$ ","").replace(",",".");
    if(texto_entrega_jato != "" && window.localStorage.getItem('entrega_jato') == 1)iValFrete=OptValueAJato.replace("R$ ","").replace(",",".");
    var iTotalCesta=parseFloat(iValorCesta)+parseFloat(iValFrete);
    //insere totais na tabela principal
    var oLocalInsert=document.getElementById("FCCartSubtotalPrice");
    if(!oLocalInsert)oLocalInsert=document.getElementById("FCCartSubtotals");
    if(oLocalInsert){
      var oNewElement=document.createElement("tr");
      oNewElement.setAttribute("id","FCCartTotalCalc");
      oNewElement.setAttribute("class","not-on-small");
      if(document.getElementById("idColPesoFC"))var sColspan=" colspan=2"; else var sColspan="";
      oNewElement.innerHTML="<td colspan=3 align=right><b>Total:</b></td><td align=right"+ sColspan +"><b>"+ FormatPrice(iTotalCesta,FC$.Currency) +"</b></td>";
      fnInsertAfter(oNewElement,oLocalInsert);
    }
    //insere totais na tabela small
    var oLocalInsert=document.getElementById("FCCartSmallSubtotalPrice");
    if(!oLocalInsert)oLocalInsert=document.getElementById("FCCartSmallSubtotals");
    if(oLocalInsert){
      var oNewElement=document.createElement("div");
      oNewElement.setAttribute("id","FCCartSmallTotalPrice");
      oNewElement.innerHTML="<ul><li class='FCCartSubtotalPriceLabel'>Total:</li><li class='FCCartSubtotalPriceValue'><b>"+ FormatPrice(iTotalCesta,FC$.Currency) +"</b></li></ul>";
      fnInsertAfter(oNewElement,oLocalInsert);
    }
  }
  else
  {
    oShippingObs1.innerHTML="<b>Frete: </b>";
    oShippingObs2.innerHTML="<b>Frete: </b>";
    oShippingValue1.innerHTML="aguarde<br>um pouco";
    oShippingValue2.innerHTML="aguarde<br>um pouco";
    oShippingValue1.style.display="block";
    oShippingValue2.style.display="block";
    var oImgLoadingCEP1=document.getElementById("idImgLoadingCEP1");
    if(oImgLoadingCEP1){oImgLoadingCEP1.style.display="none";}
    var oImgLoadingCEP2=document.getElementById("idImgLoadingCEP2");
    if(oImgLoadingCEP2){oImgLoadingCEP2.style.display="none";}
  }

}
function fnInsertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
// Calculo de Frete no Carrinho//


// Mostrar Icone (Eye) Password
FCLib$.onReady(FCLib$.showPwdViewer);

// Botão Ver Mais Produtos na Lista 
var iNextPageButFC=1;

// Scroll to the Top
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// Cart Design Right bar
var dadosCarrinho;
var Cart$=(function(){

  function fnShowCartCheckout(oRet,iErr,sMsg){
    //RETIRAR LINHA ABAIXO QUANDO O TEMPO DE RESPOSTA DO CARRINHO MELHORAR
    $("body").removeClass('running');
    
    
    primeiraTentativaPesquisarCEP = true;

    if(FC$.Page=="Cart")
      var oObj=document.getElementById("idTitTextoFC");
    if(oObj)oObj.scrollIntoView();
    else{
      FCLib$.fnAjaxExecFC("/cartlist.asp","idloja="+ FC$.IDLoja +"&format=1&n=20&d=1",false,fnProcessShowCart,iErr,sMsg);
      document.getElementsByTagName("BODY")[0].style.position = "fixed";
      document.getElementsByTagName("BODY")[0].style.top = "0";
      document.getElementsByTagName("BODY")[0].style.left = "0";
    }
  }

  function fnProcessShowCart(oHTTP,iErr,sMsg){
    var sHTTP=oHTTP.responseText;
    if(sHTTP!=""){
      var oJSON=null;
      try{oJSON=JSON.parse(sHTTP);dadosCarrinho=oJSON;
        //verificarPreVenda(dadosCarrinho.items);
         }
      catch(e){console.log("invalid JSON from /cartlist.asp");}
      if(oJSON)fnShowCartDesign(oJSON,iErr,sMsg);
    }
    else{console.log("blank response from /cartlist.asp");}
  }


  function fnShowCartDesign(oJSON,iErr,sMsg){
    var sProdutosNaCesta=""
    var sFinalCart="";
    iItensCesta=0;
    
    if(oJSON.msg!=undefined){
      if(oJSON.msg!=""){console.log("msg "+oJSON.msg)}
    }
    else{
      var currencyProdCart=oJSON.currency;
      var TotalQtyProdCart=oJSON.TotalQty;
      var subtotalProdCart=oJSON.subtotal;
      var totalProds=oJSON.totalProds;
      var totalWrapValue=oJSON.totalWrapValue;
      iItensCesta=TotalQtyProdCart;
      var oItems=oJSON.items;
      var iQtdProdsXML=oItems.length;
      for(i=0;i<iQtdProdsXML;i++){
        var sAtrRuleNameItem=oItems[i].ruleName;
        var sProdAtual="";
        var ImgProdCart=oItems[i].image;
        var NomeProdCart=oItems[i].prod;
        var qtyProdCart=oItems[i].qty;
        var priceProdCart=oItems[i].price;
        var idProdCart=oItems[i].id;
        var idProdPed=oItems[i].iditem;
        var cor=oItems[i].cor; if(cor==undefined)cor="";
        var fil=oItems[i].fil; if(fil==undefined)fil="";
        var d1=oItems[i].d1; if(d1==undefined)d1="";
        var d2=oItems[i].d2; if(d2==undefined)d2="";
        var d3=oItems[i].d3; if(d3==undefined)d3="";
        var s1=oItems[i].s1; if(s1==undefined)s1="";
        var s2=oItems[i].s2; if(s2==undefined)s2="";
        var s3=oItems[i].s3; if(s3==undefined)s3="";
        var wrap=oItems[i].wrap; if(wrap==undefined)wrap=false;
        var wrapValue=oItems[i].wrapValue; if(wrapValue==undefined)wrapValue=0;
        //Informações do produto       
        sProdAtual+="<div id='DivItem"+ idProdPed +"' class='CartDesign-product-container'>";
        sProdAtual+="  <div class='CartDesign-product-img'>";
        sProdAtual+="    <div class='ImgProdCart'><a href='/listaprodutos.asp?idloja="+ FC$.IDLoja +"&idproduto="+ idProdCart +"'><img src='"+ ImgProdCart +"' border='0'></a></div>";
        sProdAtual+="  </div>";
        sProdAtual+="  <div class='CartDesign-product-info-container'>";
        sProdAtual+="    <div class='CartDesign-product-info-name-delete'>";
        sProdAtual+="      <div class='CartDesign-product-info-name'>";
        sProdAtual+="        <a href='/listaprodutos.asp?idloja="+ FC$.IDLoja +"&idproduto="+ idProdCart +"'>"+ NomeProdCart +"</a>";
        sProdAtual+="      </div>";
        sProdAtual+="      <div class='CartDesign-product-info-delete'>";
        sProdAtual+="        <img title='Remover item da cesta' src='"+ FC$.PathImg +"delete_off.svg?cccfc=1' onmouseover='this.src=FC$.PathImg+\"delete.svg\"' onmouseout='this.src=FC$.PathImg+\"delete_off.svg\"' width=16 onclick='Cart$.fnRemoveProd("+ idProdPed +");'>";
        sProdAtual+="      </div>";
        sProdAtual+="    </div>";        
        sProdAtual+="    <div class='CartDesign-product-info-desc'>";
        sProdAtual+="     "+ cor +" "+ fil +" "+ d1 +" "+ d2 +" "+ d3 +" "+ s1 +" "+ s2 +" "+ s3 +"";
        sProdAtual+="    </div>";
        sProdAtual+="    <div class='CartDesign-product-info-qty-price'>";
        sProdAtual+="      <div class='CartDesign-product-info-qty QtdProdCart'>";
        sProdAtual+="        <div class=QtdMenos onclick='Cart$.fnChangeQtdProd("+ idProdCart +","+ idProdPed +",false);'>-</div>";
        sProdAtual+="        <div class=QtdVal id=QtdVal"+ idProdPed +">"+ qtyProdCart +"</div>";
        sProdAtual+="        <div class=QtdMais onclick='Cart$.fnChangeQtdProd("+ idProdCart +","+ idProdPed +",true);'>+</div>";
        sProdAtual+="      </div>";
        sProdAtual+="      <div class='CartDesign-product-info-price'>";
        sProdAtual+="        "+ currencyProdCart +" "+ priceProdCart +"";   
        sProdAtual+="      </div>"; 
        sProdAtual+="    </div>";      
        sProdAtual+="  </div>";
        sProdAtual+="</div>";


        var showBadgeFreeSideCartFree = sAtrRuleNameItem.indexOf("free");
        var showBadgeFreeSideCartDiscount = sAtrRuleNameItem.indexOf("discount");
        if(showBadgeFreeSideCartFree > -1){
          sProdAtual+="<div class='fc-cart-discount-badge-free'>GRÁTIS</div>";
        }else if(showBadgeFreeSideCartDiscount > -1){
          sProdAtual+="<div class='fc-sidecart-discount-badge-discount'>Item com desconto especial<br>Promoção: " + promocao_nomes[sAtrRuleNameItem] + "</div>";
        }

        sProdutosNaCesta=sProdAtual+sProdutosNaCesta;        
      }
      if(iQtdProdsXML>=20)sProdutosNaCesta="<div class='CartDesign-20-products'>Listando os&nbsp;<b>20 primeiros</b>&nbsp;produtos da&nbsp;<a href='/addproduto.asp?idloja="+ FC$.IDLoja +"'>cesta</a>:</div>"+sProdutosNaCesta;
      if(sProdutosNaCesta!=""){
        ValCesta=subtotalProdCart.replace(".","").replace(",",".");
        sFinalCart=""; 
        if(totalWrapValue>0)ValCesta=ValCesta-totalWrapValue; //se tem valor de presente, retira do valor da cesta       
        //Se valor do total dos produtos é diferente do subtotal calculado exibe descontos
        if(totalProds!=subtotalProdCart){
          var ValProds=totalProds.replace(".","").replace(",",".");
          var ValorDesconto=(ValProds-ValCesta);
          var PercDesconto=(100*(1-(ValCesta/ValProds)))+0.001;
          PercDesconto=fnArredonda(PercDesconto,2);
          //Exibe total sem descontos
          sFinalCart+="<div class='CartDesign-totalitens-container'>";
          sFinalCart+="<div class=TotItProdCart>Total dos itens:</div>";
          sFinalCart+="<div class=TotItProdCartValor>&nbsp;&nbsp;"+ FormatPrice(ValProds,currencyProdCart) +"</div>";
          sFinalCart+="</div>";
          //Exibe descontos
          if(ValorDesconto>0){
            sFinalCart+="<div class='CartDesign-descontos-container'>";
            sFinalCart+="<div class=DescProdCart>Descontos ("+ PercDesconto +"%):</div>";
            sFinalCart+="<div class=DescProdCartValor>&nbsp;-&nbsp;"+ FormatPrice(ValorDesconto,currencyProdCart) +"</div>";
            sFinalCart+="</div>";
          }           
        }       
        //Exibe embalagem  
        if(totalWrapValue>0){ //Se tem valor de embalagem mostra
          sFinalCart+="<tr>";
          sFinalCart+="<td colspan=3 align=right class=TotItProdCart>Embalagem para presente:</td>";
          sFinalCart+="<td colspan=2 align=right class=TotItProdCartValor>&nbsp;&nbsp;"+ FormatPrice(totalWrapValue,currencyProdCart) +"</td>";
          sFinalCart+="</tr>";
        }
        //Exibe Subtotal  
        sFinalCart+="<div class='CartDesign-product-subtotal-container-separator'><div class='CartDesign-product-subtotal-container'>";
        sFinalCart+="  <div class='CupomProdCart'>";
        sFinalCart+="    <input type=button value='INSERIR CUPOM' id=idButCup class=InputButton onclick='Cart$.fnGoCupom();'>";
        sFinalCart+="  </div>";
        sFinalCart+="  <div class='CartDesign-product-subtotal-price'>";
        sFinalCart+="    Subtotal:";
        sFinalCart+="    &nbsp;"+ FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart) +"";
        sFinalCart+="  </div>";
        sFinalCart+="</div></div>";        
        //Insere cálculo de frete se loja tem configurado por CEP
        if(FC$.TypeFrt==3 || FC$.TypeFrt==4){
          sFinalCart+="<div id='FCCartLembretePreVenda' class='CartDesign-lembrete-pre-venda'>Prazo diferenciado: pedido contém item em pré-venda";
          sFinalCart+="</div>";
          sFinalCart+="<div id='FCCartPreenchaFreteGratis' class='CartDesign-preencha-frete-gratis'><b>FRETE GRÁTIS?</b> Preencha CEP abaixo e descubra";
          sFinalCart+="</div>";
          sFinalCart+="<div id='FCCartLembreteFreteGratis' class='CartDesign-lembrete-frete-gratis'>Em compras acima de R$ 199,00 seu frete é GRÁTIS!";
          sFinalCart+="</div>";
          sFinalCart+="<div id='FCCartContemFreteGratis' class='CartDesign-contem-frete-gratis'>Eba! Seu frete é GRÁTIS! Aproveite!";
          sFinalCart+="</div>";
          sFinalCart+="<div id='FCCartProgressoFreteGratis' class='CartDesign-progresso-frete-gratis' style='display:none'>";
          sFinalCart+="<div id='FCCartInternoProgFreteGratis' class='CartDesign-interno-prog-frete-gratis'>";
          sFinalCart+="</div>";
          sFinalCart+="</div>";
          sFinalCart+="<div id='FCCartTotalFreight' class='CartDesign-product-zipcode-container'>";
          sFinalCart+="  <div class='CartDesign-product-zipcode-field'>";
          sFinalCart+="    <input type=text id=idZipC size=10 maxlength=9 class=InputText placeholder='CEP'><input type=button value='Calcular' id=idButC class=InputButton onclick='Cart$.fnGetShippingValueCart(\""+subtotalProdCart+"\")'>";
          sFinalCart+="    <span id=idShippingObs></span>";
          sFinalCart+="  </div>";
          sFinalCart+="  <div class='CartDesign-product-zipcode-price'>";
          sFinalCart+="    <span id=idShippingValue>a calcular</span><img src='/images/loading.gif' vspace=3 style='display:none' id=idImgLoadingCEP>";
          sFinalCart+="  </div>";
          
          //frete para quando tem entregra a jato
          sFinalCart+="  <div class='CartDesign-product-zipcode-field-jato'>";
          sFinalCart+="    <span id=idCEPCliente></span><br><input type=button value='Trocar CEP' id=idButC class=InputButton onclick='trocarCEP()'>";
          sFinalCart+="  </div>";
          sFinalCart+="  <div class='CartDesign-product-zipcode-price-jato'>";
          sFinalCart+="  <input type='radio' id='id_radio_entrega_normal' name='tipo_entrega' value='entrega_normal' checked><label for='id_radio_entrega_normal' id='id_lbl_entrega_normal'></label><br><input type='radio' id='id_radio_entrega_jato' name='tipo_entrega' value='entrega_jato'><label for='id_radio_entrega_jato' id='id_lbl_entrega_jato'></label>";
          sFinalCart+="  </div>";
          //FIM - frete para quando tem entregra a jato
          
          sFinalCart+="</div>";
          
          
        }
        //Parcelamento
        //sFinalCart+="<div id='FCCartTotalParcCalc' class='ParcProdCart'>"+ fnMontaMaxParcelaCart(ValCesta) +"</div>";
        //Botão ir para carrinho
        //sFinalCart+="<div class=ProdCartGo><a href='/addproduto.asp?idloja="+ FC$.IDLoja +"'>IR PARA O CARRINHO</a></div>";
        // Botao Continuar Comprando
        sFinalCart+="<div class='ProdCartCont ProdCartInvisivel'><a href='#' onclick='Cart$.fnCloseCartDesign();'><&nbsp; Continuar Comprando</a></div>";  
        //Botão Ir para Pagamento
        //sFinalCart+="<div class='ProdCartPagto ProdCartInvisivel'><a href='/checkout.asp?idloja="+ FC$.IDLoja +"'>IR PARA O PAGAMENTO &nbsp;></a></div>";
        sFinalCart+="<div class='ProdCartPagto ProdCartInvisivel'><a href='#' onclick='processar_clique_pagamento();return false;'>IR PARA O PAGAMENTO &nbsp;></a></div>";
        //Botões carrinho em 320px
        sFinalCart+="<div class='containerProdCart' style='display:none'>";
        // Botao Continuar Comprando
        sFinalCart+="<div class='ProdCartCont'><a href='#' onclick='Cart$.fnCloseCartDesign();'><&nbsp; Comprar Mais</a></div>";  
        //Botão Ir para Pagamento
        //sFinalCart+="<div class='ProdCartPagto'><a href='/checkout.asp?idloja="+ FC$.IDLoja +"'>PAGAR &nbsp;></a></div>";
        sFinalCart+="<div class='ProdCartPagto'><a href='#' onclick='processar_clique_pagamento();return false;'>PAGAR &nbsp;></a></div>";
        sFinalCart+="</div>";
      }
    }
    var oCartDesign=document.getElementById("CartDesign");
    //Insere elemento (carrinho) se ele não existir
    if(!oCartDesign){
      var oInsert=document.getElementById("idFCLeftContentRight");
      if(oInsert){
        var oNewElement=document.createElement("div");
        oNewElement.setAttribute("id","CartDesign");
        oNewElement.setAttribute("class","cart-design");
        oCartDesign=oInsert.parentNode.insertBefore(oNewElement,oInsert);
      }
    }

    var oBlocker=document.getElementById("Blocker");
    //Insere elemento (tela bloqueada) se ele não existir
    if(oBlocker){
      oBlocker.style.display="block";
    }
    else{
      var oNewElement=document.createElement("div");
      oNewElement.setAttribute("id","Blocker"); 
      oBlocker=document.body.appendChild(oNewElement);
      oBlocker.style.position="fixed";
      oBlocker.style.top="0";
      oBlocker.style.left="0";
      oBlocker.style.width="100%";
      oBlocker.style.height="100%";
      oBlocker.style.zIndex ="1109";  //#CartDesign tem zIndex de 1110 //alert do Vex tem 1111
      oBlocker.style.cursor="pointer";
      oBlocker.style.backgroundColor="rgba(51, 51, 51, 0.50)";
      oBlocker.onclick=fnCloseBloker;
    }

    document.onkeyup=function(e){
      e=e||window.event;
      if(e.keyCode==27){
        Cart$.fnCloseCartDesign();
      }
    };

    var bTemProds=true;
    if(sProdutosNaCesta==""){bTemProds=false;sProdutosNaCesta+="<div class='CartDesign-empty'>Seu Carrinho está vazio.</div>";}

    //Se ocorreu erro ao incluir exibe mensagem de erro. Se não ocorrer erro não mostra a mensagem
    if(iErr>0 && sMsg!=""){sProdutosNaCesta="<div id=DivMsgCart><div style='color:"+(iErr>0?"#ffffff":"#ffffff") +";background:"+(iErr>0?"#b61f24":"#1a75d7") +";'>"+ sMsg +"</div></div>"+sProdutosNaCesta;}

    var sTopo="<div class='CartDesign-header'>";
    sTopo+="<div class='CartDesign-header-title'>";
    sTopo+="<a style='color:#fff;' href='/addproduto.asp?idloja="+ FC$.IDLoja +"'>CARRINHO";
    if(iItensCesta>0)sTopo+="&nbsp; [ <span>"+ iItensCesta +" "+ ((iItensCesta>1)?"itens":"item") +"</span> ]";
    sTopo+="<div class='CartDesign-header-peq'>Clique aqui para ver o Carrinho completo</div></a>";
    sTopo+="</div>";
    sTopo+="<div class='CartDesign-header-close'>";
    sTopo+="<img src='"+ FC$.PathImg +"icon-bot-close-cart.svg?cccfc=1' alt='close cart' onclick='Cart$.fnCloseCartDesign();' style='cursor:pointer;'>";   
    sTopo+="</div>";
    sTopo+="</div>";    

    //Carrinho
    var sContCart=sTopo;
    sContCart+="<div id=idContentItensCart class=ContentItensCart>"+ sProdutosNaCesta +"</div>";
    if(sFinalCart!="")sContCart+="<div id='TabFinalCart' class='EstTabFinalCart'>"+ sFinalCart +"</div>";

    //Insere o elemento do carrinho
    oCartDesign.innerHTML=sContCart;

    //lista de produtos tem que ter o tamanho adequado ao tamanho da div inferior
    var t = $("#CartDesign .EstTabFinalCart").outerHeight() + $("#CartDesign .CartDesign-header").outerHeight();
    $("#CartDesign .ContentItensCart").css("height","calc(100% - " + t + "px)");

    //Mostra carrinho (opção com aninação)
    //oCartDesign.style.display="";
    //jQuery(oCartDesign).show(300);
    if(oCartDesign.style.right=="" || oCartDesign.style.right=="-350px")jQuery(oCartDesign).animate({ "right": "+=350px" }, 200 );

    //Muda tamanho e posição dependendo da largura
    /*var iClientWidth=document.documentElement.clientWidth;
    if(iClientWidth<350){oCartDesign.style.width="320px";}
    if(iClientWidth<440){oCartDesign.style.top="0px";}
    var iClientHeight=document.documentElement.clientHeight;
    if(iClientHeight<590){
      var oContentItensCart=document.getElementById("idContentItensCart");
      if(oContentItensCart)oContentItensCart.style.maxHeight="215px";
    }*/

    //Se não está vazio, carrega função do cálculo de frete
    if((FC$.TypeFrt==3 || FC$.TypeFrt==4) && bTemProds)fnGetCEP(subtotalProdCart); 

    //Atualiza carrinho do topo
    fnUpdateCartTop(iItensCesta,currencyProdCart,subtotalProdCart);

    //Remove mensagem de produto adicionado ao carrinho ou produto não adicionado
    setTimeout(function(){if(document.getElementById('DivMsgCart'))jQuery(document.getElementById('DivMsgCart')).hide(500);},2000);


    $("#idButC").click(function() {

      $(".CartDesign-totalcart-container").remove();
      primeiraTentativaPesquisarCEP = true;

    });


    //Consertar BUG (travando) no scroll do iOS
    var lastY = 0; // Needed in order to determine direction of scroll.
    $(".ContentItensCart").on('touchstart', function(event) {
      
      lastY = event.originalEvent.touches[0].clientY;
    });

    $('.ContentItensCart').on('touchmove', function(event) {
      var top = event.originalEvent.touches[0].clientY;

      // Determine scroll position and direction.
      var scrollTop = event.currentTarget.scrollTop;
      var direction = (lastY - top) < 0 ? "up" : "down";

      // FIX IT!
      if (scrollTop == 0 && direction == "up") {
        // Prevent scrolling up when already at top as this introduces a freeze.
        event.preventDefault();
      } else if (scrollTop >= (event.currentTarget.scrollHeight - event.currentTarget.offsetHeight) && direction == "down") {
        // Prevent scrolling down when already at bottom as this also introduces a freeze.
        event.preventDefault();
      }

      lastY = top;
    });

    //verificação para mostrar comprar mais
    verificar_carrinho(oJSON);
  }

  function fnUpdateCartTop(iItensCesta,currencyProdCart,subtotalProdCart){
    if(currencyProdCart==undefined)currencyProdCart=FC$.Currency;
    if(subtotalProdCart==undefined)subtotalProdCart="0,00";
    var oCartItemsTop=document.getElementById("idCartItemsTop");if(oCartItemsTop){oCartItemsTop.innerHTML=iItensCesta;if(iItensCesta>99){$(".topocart a").css("font-size","11px")}else{$(".topocart a").css("font-size","12px")}}
    var oCartItemsToolTop=document.getElementById("idCartItemsToolTop");if(oCartItemsToolTop)oCartItemsToolTop.innerHTML=iItensCesta;
    var oCartTotalTop=document.getElementById("idCartTotalTop");if(oCartTotalTop)oCartTotalTop.innerHTML=FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart);
    var oCartTotalToolTop=document.getElementById("idCartTotalToolTop");if(oCartTotalToolTop)oCartTotalToolTop.innerHTML=FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart);   
  }

  function fnCloseBloker(){
    var oBlocker=document.getElementById("Blocker");
    if(oBlocker)oBlocker.style.display="none";
    fnCloseCartDesign();
  }

  function fnCloseCartDesign(){
    var oCartDesign=document.getElementById("CartDesign");   
    if(oCartDesign){
      //Esconde carrinho (opção com aninação)
      //oCartDesign.style.display="none";
      //jQuery(oCartDesign).hide(300);
      if(oCartDesign.style.right=="0px")jQuery(oCartDesign).animate({ "right": "-=350px" }, 200 );
      document.getElementsByTagName("BODY")[0].style.position = "initial";
    }
    var oBlocker=document.getElementById("Blocker");
    if(oBlocker)oBlocker.style.display="none";
    document.onkeyup=null;
  }

  function fnArredonda(Val,iCasas) {
    iCasas=typeof iCasas!=='undefined'?iCasas:2;
    return +(Math.floor(Val+('e+'+iCasas))+('e-'+iCasas));
  };

  function fnGoCupom(){
    if(confirm("Deseja inserir o código de um cupom de desconto?\n\nCaso tenha um cupom de desconto você será redirecionado para a página onde pode inserir este cupom para obter o desconto.")){top.location.href="/addproduto.asp?idloja="+ FC$.IDLoja +"#acupom";}
  }

  function fnChangeQtdProd(idProdCart,idProdPed,bMais){
    var oQtdValOri=document.getElementById("QtdVal"+idProdPed);
    if(oQtdValOri){
      var iQtdOri=parseInt(oQtdValOri.innerHTML);
      if(bMais)var iQtd=iQtdOri+1; else var iQtd=iQtdOri-1;
      //Se controla estoque checa quantos tem no produto, caso contrário altera a quantidade direto
      if(FC$.StockControl)FCLib$.fnAjaxExecFC("/infoprod.asp","idloja="+ FC$.IDLoja +"&idprod="+ idProdCart +"&format=1",false,fnChangeQtdProdStock,idProdPed,iQtd,iQtdOri);
      else fnChangeQtdProdExec(idProdPed,iQtd);
    }
  }

  function fnChangeQtdProdStock(oHTTP,idProdPed,iQtdSolic,iQtdOri){
    var sMsgErr="";
    var iQtdProd=null;
    var sHTTP=oHTTP.responseText;
    var bLeuEstoque=false;
    if(sHTTP!=""){
      var oJSON=null;
      try{oJSON=JSON.parse(sHTTP);}
      catch(e){console.log("invalid JSON from /infoprod.asp");}
      if(oJSON){iQtdProd=oJSON.qtd;bLeuEstoque=(iQtdProd!=undefined);}
    }
    else{console.log("blank response from /infoprod.asp");}
    //console.log("bLeuEstoque:"+bLeuEstoque);
    if(bLeuEstoque){
      if(iQtdProd<iQtdOri){
        iQtdSolic=iQtdProd; //se a qtd original é maior que a qtd em estoque, a quantidade solicitada é a qtd do produto
        if(iQtdSolic==0){sMsgErr="O produto foi removido do carrinho pois não temos mais em estoque";}
        else {sMsgErr="A quantidade foi alterada para a quantidade máxima em estoque disponível nesse momento: "+ iQtdProd;}
      }
    }
    else{
      iQtdProd=iQtdSolic; //se não consegue ler estoque do produto, usa o estoque solicitado
    }
    if(iQtdSolic<=iQtdProd)fnChangeQtdProdExec(idProdPed,iQtdSolic); else sMsgErr="Infelizmente não temos "+ iQtdSolic +" unidades em estoque";
    if(sMsgErr!="")alert(sMsgErr);
  }

  function fnChangeQtdProdExec(idProdPed,iQtdSolic){
    fnInsertLoading(idProdPed);
    if(iQtdSolic==0)var sMsg="Produto removido"; else var sMsg="Quantidade alterada";
    AjaxExecFC("/recalcula.asp","idloja="+ FC$.IDLoja+"&q"+ idProdPed +"="+iQtdSolic,false,fnShowCartCheckout,0,sMsg); 
  }

  function fnRemoveProd(idProdPed){
    fnInsertLoading(idProdPed);
    AjaxExecFC("/recalcula.asp","idloja="+ FC$.IDLoja+"&q"+ idProdPed +"=0",false,Cart$.fnShowCartCheckout,0,"Produto removido");
  }

  function fnInsertLoading(idProdPed){
    var oObj=document.getElementById("DivItem"+idProdPed);
    var sH="112";//altura padrão
    var sM="28";//margin top padrão
    var iHeight=oObj.offsetHeight;
    if(iHeight && iHeight>0){sH=iHeight-1;sM=((iHeight-50)/2);}
    if(oObj)oObj.innerHTML="<div style='width:100%;height:"+ sH +"px;text-align:center;'><img style='margin-top:"+ sM +"px;' src=/images/loading_ajax.gif></div>"
      }

  function fnGetCEP(iValorCesta){
    //Se já tem CEP em cookie já mostra cálculo
    var sNumCEP=FCLib$.GetCookie("CEP"+FC$.IDLoja);
    if(sNumCEP && sNumCEP!=""){
      document.getElementById("idZipC").value=sNumCEP;
      fnGetShippingValueCart(iValorCesta);
    }
  }

  function fnGetShippingValueCart(iValorCesta){

    var sCEP=document.getElementById("idZipC").value;

    //mensagem para frete gratis
    $(".CartDesign-lembrete-frete-gratis").hide();
    $(".CartDesign-contem-frete-gratis").hide();
    $(".CartDesign-progresso-frete-gratis").hide();

    if (verificaCapital_RM_EstadoSP(sCEP) == 0)
    {
      //Alteração em 04/02/2021 por Gabriela - Colocar quanto falta para ganhar frete grátis
      var valorCarrinho = $("#TabFinalCart .FCPriceValue")[0].innerText;
      valorCarrinho = valorCarrinho.replace(",",".");
      
      //voltar 99 para 239
	  //voltar frete para 99 - colocar 99 no lugar do 1 na formula
      var faltaFrete = (99 - valorCarrinho).toFixed(2).toString();
      var widthBarra = ((100 - (faltaFrete/99)*100));
	  if (widthBarra < 100) {
        document.querySelector('#FCCartInternoProgFreteGratis').style.width = `${widthBarra}%` ;
      }
      faltaFrete = faltaFrete.replace(".",",");

      $(".CartDesign-lembrete-frete-gratis").html(`<b>Faltam R$${faltaFrete} para ganhar FRETE GRÁTIS!</b>`);
      //$(".CartDesign-lembrete-frete-gratis").html("Em compras acima de R$ 239,00 seu frete é GRÁTIS!");
    }
    else
    {
      //Alteração em 04/02/2021 por Gabriela - Colocar quanto falta para ganhar frete grátis
      var valorCarrinho = $("#TabFinalCart .FCPriceValue")[0].innerText;
      valorCarrinho = valorCarrinho.replace(",",".");
      
      //voltar 99 para 199
	  //voltar frete para 99 - colocar 99 no lugar do 1 na formula
      var faltaFrete = (99 - valorCarrinho).toFixed(2).toString();
      var widthBarra = ((100 - (faltaFrete/99)*100));
	  if (widthBarra < 100) {
        document.querySelector('#FCCartInternoProgFreteGratis').style.width = `${widthBarra}%` ;
      }
      faltaFrete = faltaFrete.replace(".",",");
      $(".CartDesign-lembrete-frete-gratis").html(`<b>Faltam R$${faltaFrete} para ganhar FRETE GRÁTIS!</b>`);
    }

    FCLib$.SetCookie("CEP"+FC$.IDLoja,sCEP);
    if(sCEP=="")
    {
      document.getElementById("idShippingValue").innerHTML="<span style=color:#990000;>CEP inválido</span>";
      
      var t = $("#CartDesign .EstTabFinalCart").outerHeight() + $("#CartDesign .CartDesign-header").outerHeight() - $(".CartDesign-totalcart-container").outerHeight();
      $("#CartDesign .ContentItensCart").css("height","calc(100% - " + t + "px)");
      
      
    }
    else{
      document.getElementById("idShippingValue").innerHTML="";
      var oImgLoadingCEP=document.getElementById("idImgLoadingCEP");
      if(oImgLoadingCEP){oImgLoadingCEP.style.display="";}
      AjaxExecFC("/xmlshippingcep.asp","idloja="+ FC$.IDLoja +"&cep="+ sCEP,false,fnProcessXMLCEPCart,iValorCesta);
    }
  }




  function fnProcessXMLCEPCart(obj,iValorCesta){
    
    global_cesta = iValorCesta;
    
    var t = $("#CartDesign .EstTabFinalCart").outerHeight() + $("#CartDesign .CartDesign-header").outerHeight();
    $("#CartDesign .ContentItensCart").css("height","calc(100% - " + t + "px)");
    
    var oShippingObs=document.getElementById("idShippingObs");
    var oShippingValue=document.getElementById("idShippingValue");
    var iErr=ReadXMLNode(obj,"err");if(iErr==null)return;
    if(iErr!="0"){
      var oImgLoadingCEP=document.getElementById("idImgLoadingCEP");
      if(oImgLoadingCEP){oImgLoadingCEP.style.display="none";}
      oShippingValue.innerHTML="<span id=idErrXMLCEPFC style=color:#990000;>"+ "CEP inválido" +"</span>";
      return;
    }
    oShippingObs.innerHTML="";
    oShippingValue.innerHTML="";


    var OptName=ReadXMLNode(obj,"Opt1Name");
    var OptValue=ReadXMLNode(obj,"Opt1Value");
    var OptObs=ReadXMLNode(obj,"Opt1Obs");

    if(OptName == "Retirar na loja")
    {
      OptName=ReadXMLNode(obj,"Opt2Name");
      OptValue=ReadXMLNode(obj,"Opt2Value");
      OptObs=ReadXMLNode(obj,"Opt2Obs");
    }

    global_entrega_normal = OptValue;


    deuErroBuscaFrete = false;

    //AJUSTE PROBLEMA CONEXAO COM SERVICO EXTERNO DE FRETE
    //o máximo de modos de entrega que pode ser retornado é 3 + Retirar Loja. Portanto, se for maior ou igual a 5, é porque deu erro de consulta
    if(ReadXMLNode(obj,"OptQt") >= 5)
    {
      var sCEP=document.getElementById("idZipC").value;
      AjaxExecFC("https://bebefofuxo.net/scripts/calculo_frete/falhaComunicacaoServicoFrete.php","cep="+ sCEP,false,fnprocessErroConsultaFrete);

      if(primeiraTentativaPesquisarCEP == false)
      {
        var total = ReadXMLNode(obj,"OptQt");
        for(var i = 0; i < total; i++)
        {
          var a = i + 1;
          var t = "Opt" + a + "Name";
          var s = "Opt" + a + "Value";
          var u = "Opt" + a + "Obs";
          if(ReadXMLNode(obj,t) == "Encomenda PAC")
          {
            OptName=ReadXMLNode(obj,t);
            OptValue=ReadXMLNode(obj,s);
            OptObs=ReadXMLNode(obj,u);
          }
          else if(ReadXMLNode(obj,t) == "SEDEX")
          {
            OptName=ReadXMLNode(obj,t);
            OptValue=ReadXMLNode(obj,s);
            OptObs=ReadXMLNode(obj,u);
          }
          
        }
      }
      else
      {
        primeiraTentativaPesquisarCEP = false;
        deuErroBuscaFrete = true;

        var pesoTotal = 0;
        for (var a = 0; a < dadosCarrinho.items.length; a++)
        {
          pesoTotal = pesoTotal + parseInt(dadosCarrinho.items[a]["weight"]);
        }

        pesoTotal = pesoTotal/1000;

        var valorCarrinho = $("#TabFinalCart .FCPriceValue")[0].innerText;
        valorCarrinho = valorCarrinho.replace(",",".");

        var sCEP = document.getElementById("idZipC").value;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = fnprocessExisteTransportadora;
        xhr.open("GET","https://bebefofuxo.net.br/scripts/calculo_frete/existe_transportadora.php?cep="+sCEP+"&peso="+pesoTotal+"&valor="+valorCarrinho,true);
        xhr.send();
      }

    }

    /* ajuste info de frete */

    //calcula prazo pre-venda prevenda
    //var prazoPreVenda = calcularPrazoPreVenda();
	prazoPreVenda = 0;
    if(prazoPreVenda != 0)
    {
      $("#FCCartLembretePreVenda").show();
      $(".CartDesign-lembrete-frete-gratis").css('color', 'gray');
    }

    var textoFinal = "";
    //se for Correios
    if(OptName == "Encomenda PAC" || OptName == "SEDEX")
    {
      //prazo de entrega
      var prazo = OptObs;

      var array = prazo.split(" ");

      var dias;
      if(array.length == 6)
      {
        //prazo retornado pelos Correios + qtde extra de dias adicionado pela loja
        dias = parseInt(array[3]) + prazoPreVenda;
      }
      else if(array.length == 3)
      {
        //prazo retornado pelos Correios + qtde extra de dias adicionado pela loja
        dias = parseInt(array[0]) + prazoPreVenda;
      }



      //definindo o texto com "dias úteis"
      var diasUteis = dias+" dias úteis";

      textoFinal = diasUteis;



    }
    else
    {
      //prazo de entrega
      var prazo = OptObs;


      var array = prazo.split(" ");

      var dias;
      if(array.length == 6)
      {
        //prazo retornado pelos Correios + qtde extra de dias adicionado pela loja
        dias = parseInt(array[3]) + prazoPreVenda;
      }
      else if(array.length == 3)
      {
        //prazo retornado pelos Correios + qtde extra de dias adicionado pela loja
        dias = parseInt(array[0]) + prazoPreVenda;
      }

      //definindo o texto com "dias úteis"
      var diasUteis = dias+" dias úteis";

      textoFinal = diasUteis;
      if (textoFinal == "1 dias úteis") textoFinal = "1 dia útil";
    }

    //mensagem sobre valor mínimo para frete grátis
    var valorMinimo = 0;
    if(capital_rm_estadoSP == 1)
    {
      //voltar 99 para 199
      //voltar frete para 99
      valorMinimo = 99;
    }
    else
    {
      //voltar 99 para 239
      //voltar frete para 99
      valorMinimo = 99;
    }
    var valorCarrinho = getPriceCart();
    if (valorCarrinho < valorMinimo)
    {
      $(".CartDesign-preencha-frete-gratis").hide();
      $(".CartDesign-lembrete-frete-gratis").show();
      $(".CartDesign-progresso-frete-gratis").show();
      $(".CartDesign-contem-frete-gratis").hide();
      
      if((cupom_frete_gratis_ativo && FC$.CouponID == id_cupom_frete_gratis) || politica_frete_gratis_geral_ativo == true)
      {
        $(".CartDesign-lembrete-frete-gratis").hide();
      	$(".CartDesign-progresso-frete-gratis").hide();
        $(".CartDesign-contem-frete-gratis").show();
      }
    }
    else
    {
      $(".CartDesign-preencha-frete-gratis").hide();
      $(".CartDesign-lembrete-frete-gratis").hide();
      $(".CartDesign-progresso-frete-gratis").show();
      $(".CartDesign-contem-frete-gratis").show();
      $(".CartDesign-interno-prog-frete-gratis").css("background","#128e03");
      
    }
    
    
    //ENTREGA A JATO
    var OptNameAJato = "";
    var OptValueAJato = "";
    var OptObsAJato = "";

    var total = ReadXMLNode(obj,"OptQt");
    //verificar se tem entrega a jato
    for(var i = 0; i < total; i++)
    {
      var a = i + 1;
      var t = "Opt" + a + "Name";
      var s = "Opt" + a + "Value";
      var u = "Opt" + a + "Obs";
      if(ReadXMLNode(obj,t) == "PEX")
      {
        OptNameAJato=ReadXMLNode(obj,t);
        OptValueAJato=ReadXMLNode(obj,s);
        global_entrega_jato = OptValueAJato;
        OptObsAJato=ReadXMLNode(obj,u);
      }
    }

    var texto_entrega_jato = "";


    if(OptValueAJato != "" && OptName != "PEX" && OptObsAJato == "1 dias úteis")
    {

      var data_hoje = new Date();
      var dia_hoje = data_hoje.getDay();
      var hora_atual = data_hoje.getHours();

      
      texto_entrega_jato += qual_dia();
      
    }
    //FIM - ENTREGA A JATO

    /* ajuste info de frete */

    if(deuErroBuscaFrete == false)
    {
      
      //oShippingObs.innerHTML="<span class=ObsFreightCalc>"+ textoFinal +"</span>"; //Insere observações
      oShippingValue.innerHTML="<b>"+OptValue+"</b><br>"+textoFinal;
      oShippingValue.style.display="block";
      var oImgLoadingCEP=document.getElementById("idImgLoadingCEP");
      if(oImgLoadingCEP){oImgLoadingCEP.style.display="none";}
      //Remove elementos    
      var oFCCartTotalCalc=document.getElementById("FCCartTotalCalc");
      if(oFCCartTotalCalc){oFCCartTotalCalc.parentNode.removeChild(oFCCartTotalCalc);}
      var oFCCartTotalParcCalc=document.getElementById("FCCartTotalParcCalc");
      if(oFCCartTotalParcCalc){oFCCartTotalParcCalc.parentNode.removeChild(oFCCartTotalParcCalc);}
      //Exibe total com frete
      var iValFrete=OptValue.replace("R$ ","").replace(",",".");
      iValorCesta=iValorCesta.replace(".","").replace(",",".");
      var iTotalCesta=parseFloat(iValorCesta)+parseFloat(iValFrete);
      //Insere totais na tabela principal
      var oLocalInsert=document.getElementById("FCCartTotalFreight");
      if(oLocalInsert){
        var oNewElement=document.createElement("div");
        oNewElement.setAttribute("id","FCCartTotalCalc");
        oNewElement.innerHTML="<div class='CartDesign-totalcart-container'><div class='TotalFProdCart'>Total a pagar:</div><div class='TotalFProdCartValor'>&nbsp;&nbsp;"+ FormatPrice(iTotalCesta,FC$.Currency) +"</div></div>";
        fnInsertAfter(oNewElement,oLocalInsert);
      }
      /*insere parcelamento na tabela principal
    	var oLocalInsert=document.getElementById("FCCartTotalCalc");
    	if(oLocalInsert){
      	var oNewElement=document.createElement("tr");
      	oNewElement.setAttribute("id","FCCartTotalParcCalc");
      	if(document.getElementById("idColPesoFC"))var sColspan="5"; else var sColspan="4";
      	oNewElement.innerHTML="<td colspan=5 align=right class=ParcProdCart>"+ fnMontaMaxParcelaCart(iTotalCesta) +"</td>";
     	 fnInsertAfter(oNewElement,oLocalInsert);
    	}*/
      
     
      
      	//trocar divs para mostrar info sobre AJATO
      	if(texto_entrega_jato != "")
     	{
          	$('#id_radio_entrega_jato').click(function() {
            	if($('#id_radio_entrega_jato').is(':checked'))
                {
                  
                  	var iValFrete_jato=global_entrega_jato.replace("R$ ","").replace(",",".");
      				var iValorCesta=global_cesta.replace(".","").replace(",",".");
      				var iTotalCesta_jato=parseFloat(iValorCesta)+parseFloat(iValFrete_jato);
                  
                  	$('.TotalFProdCartValor').html("&nbsp;&nbsp;"+ FormatPrice(iTotalCesta_jato,FC$.Currency));
                  
                  	window.localStorage.setItem('entrega_jato', 1);
                  
                }
          	});
          
          
          	$('#id_radio_entrega_normal').click(function() {
            	if($('#id_radio_entrega_normal').is(':checked'))
                {
                  	var iValFrete_normal=global_entrega_normal.replace("R$ ","").replace(",",".");
      				var iValorCesta=global_cesta.replace(".","").replace(",",".");
                  	var iTotalCesta_normal=parseFloat(iValorCesta)+parseFloat(iValFrete_normal);
                  	$('.TotalFProdCartValor').html("&nbsp;&nbsp;"+ FormatPrice(iTotalCesta_normal,FC$.Currency));

                  	if(window.localStorage.getItem('entrega_jato') == 1)
                  	{
                    	window.localStorage.removeItem('entrega_jato');
  					}
                }
          	});
          
          	if(window.localStorage.getItem('entrega_jato') == 1)
  			{
    			$('#id_radio_entrega_jato').prop("checked",true).trigger("click");
  			}
          	else
            {
              	$('#id_radio_entrega_normal').prop("checked",true).trigger("click");
            }
          	
          	$("#idShippingValue").text("");
         	$("#idCEPCliente").text($("#idZipC").val());
          	
         	$(".CartDesign-product-zipcode-price").hide();
          	$(".CartDesign-product-zipcode-field").hide();
          	$(".CartDesign-product-zipcode-field-jato").show();
          	$(".CartDesign-product-zipcode-price-jato").show();
          
          	$("#id_lbl_entrega_normal").html("<b>"+OptValue+"</b> ("+textoFinal+")");
          
          	$("#id_lbl_entrega_jato").html("<b>"+OptValueAJato+"</b> <span style='color:#008ae1'><b>("+texto_entrega_jato+")</b></span>&#x1F680;");

            
          
       	}

      
     
    }
    else
    {
      oShippingValue.innerHTML="aguarde<br>um pouco";
      oShippingValue.style.display="block";
      var oImgLoadingCEP=document.getElementById("idImgLoadingCEP");
      if(oImgLoadingCEP){oImgLoadingCEP.style.display="none";}
    }

    //lista de produtos tem que ter o tamanho adequado ao tamanho da div inferior
    var t = $("#CartDesign .EstTabFinalCart").outerHeight() + $("#CartDesign .CartDesign-header").outerHeight();
    $("#CartDesign .ContentItensCart").css("height","calc(100% - " + t + "px)");


  }

  /* function fnMontaMaxParcelaCart(Valor){
    return("Em até 10x de "+ FormatPrecoReais(CalculaParcelaJurosCompostos(Valor,10)));
  } */


  return{
    fnShowCartCheckout:fnShowCartCheckout,
    fnRemoveProd:fnRemoveProd,
    fnGetShippingValueCart:fnGetShippingValueCart,
    fnCloseCartDesign:fnCloseCartDesign,
    fnChangeQtdProd:fnChangeQtdProd,
    fnGoCupom:fnGoCupom
  }



})();

/* Discount Badges - Side Cart, Cart, Checkout, Track */
function fnBadgeDiscount(){
  var createDivElemFree=document.createElement("div");
  createDivElemFree.className="fc-cart-discount-badge-free";
  createDivElemFree.innerHTML="GRÁTIS";

  if(FC$.Page=="Cart"){
    var showBadgeFree=document.querySelectorAll('[rulename*="free"] .FCCartItemCont');
    var showBadgeDiscount=document.querySelectorAll('[rulename*="discount"] .FCCartItemCont');

    var promocoes_existentes = [];

    for(var i=0;i<showBadgeFree.length;i++)
    {
      showBadgeFree[i].appendChild(createDivElemFree);
    }

    for(var i=0;i<showBadgeDiscount.length;i++)
    {
      var createDivElemDiscount=document.createElement("div");
      createDivElemDiscount.className="fc-cart-discount-badge-discount";
      createDivElemDiscount.innerHTML="Item com desconto especial";

      showBadgeDiscount[i].appendChild(createDivElemDiscount);
      promocoes_existentes[promocoes_existentes.length] = showBadgeDiscount[i].parentNode.getAttribute("rulename");
    }

    promocoes_existentes = uniq(promocoes_existentes);

    if(promocoes_existentes.length > 0)
    {
      var promocoes_divs = "";

      for(var i=0;i<promocoes_existentes.length;i++)
      {
        promocoes_divs += "<div class='fc-cart-discount-badge-name'>"+promocao_nomes[promocoes_existentes[i]]+"</div>"

      }

      $("#TabItens tr:contains('Digite o CEP')").before("<tr><td colspan='4'>Você está participando da promoção"+ promocoes_divs +"</td></tr>");
    }



  }else if(FC$.Page=="Track"){
    var showBadgeFreeTrack=document.querySelectorAll('[rulename*="free"] td:first-child');
    var showBadgeDiscountTrack=document.querySelectorAll('[rulename*="discount"] td:first-child');
    for(var i=0;i<showBadgeFreeTrack.length;i++){

      showBadgeFreeTrack[i].appendChild(createDivElemFree);
    }
    for(var i=0;i<showBadgeDiscountTrack.length;i++){

      var createDivElemDiscount=document.createElement("div");
      createDivElemDiscount.className="fc-track-discount-badge-discount";
      createDivElemDiscount.innerHTML="Item com desconto especial - Promoção: " + promocao_nomes[showBadgeDiscountTrack[i].parentNode.getAttribute("rulename")];

      showBadgeDiscountTrack[i].appendChild(createDivElemDiscount);
    }
  }
}

function uniq(a) {
  return a.sort().filter(function(item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}

function trocarCEP(){

  $(".CartDesign-product-zipcode-field-jato").hide();
  $(".CartDesign-product-zipcode-price-jato").hide();
  $(".CartDesign-product-zipcode-price").show();
  $(".CartDesign-product-zipcode-field").show();
  
  var iValorCesta=global_cesta.replace(".","").replace(",",".");
  var iTotalCesta=parseFloat(iValorCesta);
                  
  $('.TotalFProdCartValor').html("&nbsp;&nbsp;"+ FormatPrice(iValorCesta,FC$.Currency));
  
  if(window.localStorage.getItem('entrega_jato') == true)
  {
    window.localStorage.removeItem('entrega_jato');
  }


}



//RETIRAR ISSO QUANDO O TEMPO DE RESPOSTA DO CARRINHO MELHORAR
$(window).on('beforeunload', function(){
    if($("body").hasClass('running')){
        return "Estamos adicionando o seu produto no carrinho, você deseja mesmo sair?";
    }
});



//verificar dia que a entreega a jato vai entregar
function qual_dia()
{
  var achouDia = false;

  var hoje = new Date();

  var incremento = 0;

  var texto_dia = "";

  while(!achouDia)
  {

    if(incremento == 0 && hoje.getHours() < 11)
    {
      if(!eh_feriado(hoje) && hoje.getDay() != 6 && hoje.getDay() != 0)
      {
        texto_dia = "HOJE";
        break;
      }
      else
      {
        incremento++;
      }

    }
    else
    {
      incremento++;
    }

    var data_analisada = new Date();
    data_analisada.setDate(hoje.getDate() + incremento);

    if(!eh_feriado(data_analisada) && data_analisada.getDay() != 6 && data_analisada.getDay() != 0)
    {
      achouDia = true;

      if(incremento == 1)
      {
        texto_dia = "AMANHÃ";
      }
      else
      {
        if(data_analisada.getDay() == 1) texto_dia = "SEGUNDA";
        else if(data_analisada.getDay() == 2) texto_dia = "TERÇA";
        else if(data_analisada.getDay() == 3) texto_dia = "QUARTA";
        else if(data_analisada.getDay() == 4) texto_dia = "QUINTA";
        else if(data_analisada.getDay() == 5) texto_dia = "SEXTA";

      }
    }

  }

  return texto_dia;


}

//lista dde feriados deve ser atualizada anualmente
function eh_feriado(data)
{
  var feriados = ["01/01","25/01","01/03","15/04","21/04","01/05","16/06","09/07","07/09","12/10","02/11","15/11","20/11","23/12","24/12","25/12","30/12","31/12"];

  var dia = data.getDate();
  var mes = data.getMonth() + 1;

  var sDia = "";
  var sMes = "";

  if(dia < 10)
  {
    sDia = "0" + dia;
  }
  else
  {
    sDia = dia;
  }

  if(mes < 10)
  {
    sMes = "0" + mes;
  }
  else
  {
    sMes = mes;
  }

  var sData = sDia + "/" + sMes;

  return feriados.includes(sData);
}

function processar_clique_pagamento()
{
  if(mostrar_comprar_mais && pagina_comprar_mais != "")
  {
    if(window.localStorage.ja_apareceu_comprar_mais)
    {
      //já apareceu comprar mais
      window.location.href = "/checkout.asp?idloja=20368";
    }
    else
    {
      //ainda não apareceu comprar mais
      window.location.href = "/page,idloja,20368,arq," + pagina_comprar_mais;
    }
  }
  else
  {
    window.location.href = "/checkout.asp?idloja=20368";
  }
  
  
  
}


function eh_verao(codigo)
{
  var array = ["15892","15886","15894","15895","15891","15884","15888","15893","15890","15887","15898","15900","15899","15901","15896","15897","15885","15889","15907","15903","15902","15906","15904","15905","14817","14812","16715","16085","14939","16714","16716","16088","16718","16717","14938","16501","16713","15910","15912","15913","16096","15909","16097","15908","15911","16100","14670","14816","16108","14813","16310","16110","16313","16616","16311","16312","16314","16556","16113","16317","16499","16315","14669","14814","14815","16320","16307","14828","16500","16321","16503","16104","16141","16086","14829","16102","16146","14924","16418","16318","16415","16419","16105","16107","16319","16413","16410","16414","16323","16358","16172","16417","14662","16039","16171","14818","16040","16152","16157","16322","16412","16038","16056","16411","16103","16147","16156","16164","15712","16035","16148","16158","16165","16502","16057","16106","16109","16149","16155","16160","16166","16416","15710","14823","15706","16167","16169","14822","15711","16052","15704","16359","14661","14821","16336","16051","16144","16173","16424","16425","16428","16429","14941","15705","16087","16154","16422","16426","14820","16420","16423","16427","14830","16058","15692","15696","15697","16421","16053","16153","14940","16059","16161","16659","16184","15806","16060","16163","16186","16188","14819","15695","16356","16033","16037","16062","16198","15802","15803","16162","14923","16048","16151","16181","16195","16360","16355","16661","16032","16054","16111","16183","16615","16185","15709","15714","16354","16098","16182","16657","14831","15818","16142","16361","16034","16077","16081","16196","16080","16341","16658","15707","15708","16055","16159","14827","14906","15713","15715","15817","16083","16099","16170","14672","15816","16078","14665","16660","16663","16075","16095","14664","14880","15701","15702","15703","16239","16046","16066","16114","16174","16187","15698","15699","15700","16131","16118","16134","16227","16250","14671","15807","15811","16129","16036","16229","16233","14904","14867","16357","16065","16091","16093","16115","16126","16128","16234","16244","16246","16261","16262","16130","16240","15993","16009","16076","16082","16117","16119","16133","16140","16394","14659","14699","16067","16245","16263","14900","15809","15814","15815","16662","15983","15985","15991","16068","16072","16127","16132","16316","14879","14899","15812","16670","16011","16063","16089","16230","16257","14878","16044","16064","16238","16243","15693","15813","15987","15989","16004","16049","16069","16070","16249","16258","14130","16672","15981","16007","16145","16668","14866","14868","15694","16669","16092","16094","16309","16666","14158","14887","15808","15986","16237","16393","16667","14129","14156","14157","14872","14912","15980","14903","16498","16264","14911","15977","15979","15988","16010","14898","16112","16339","16340","16228","16251","16308","14874","15971","15975","15978","16061","16247","16674","16395","14889","16050","15680","15681","15805","16248","16362","14039","14142","14173","14660","15974","16090","16150","16665","16266","14402","14666","15965","15976","15982","16017","16205","16612","16617","14018","14143","14145","14214","14700","14910","16012","16015","16019","16193","16207","16208","16209","16216","16344","14144","14146","16008","16071","16084","16101","16192","16206","16211","16212","14909","15810","16618","14404","14882","16013","16014","16016","16116","16194","16199","16204","16210","16241","16265","14678","14679","14877","16079","16342","16338","14416","14914","16001","16003","16042","16168","16197","16218","16242","16252","16337","14141","14171","14205","14406","14414","14623","14886","14921","15999","16006","16018","16073","14902","16673","16614","14151","14595","14602","14603","15970","15984","15996","16005","16043","16045","16217","15682","15691","16671","14073","14418","14649","15967","15973","15990","16143","15688","14128","14154","14213","14596","14915","16200","14131","14162","14163","14165","14166","14167","14170","14410","14420","14633","14701","14919","15998","16613","14119","14204","14403","14884","14905","15962","15968","15994","15995","16000","14680","14155","14164","14196","14197","14424","14445","14446","14622","14890","16074","16343","14026","14120","14159","14168","14201","14271","14422","14448","14592","14883","14918","15966","14133","14169","14172","14412","14419","14447","14485","14703","14885","15969","15992","15997","16002","14901","15804","14033","14034","14134","14152","14209","14452","14490","14491","13868","13869","13870","14871","14908","15685","14016","14153","14444","14449","14626","14635","15963","15964","15972","13978","14697","15684","16235","12951","14132","14160","14200","14208","14293","14405","14450","14489","14497","14500","14696","14876","14891","15801","12954","14408","14415","14454","14494","14495","14496","14498","14605","14624","14628","14629","14702","14888","14895","16255","13977","14598","14689","14273","14453","14650","14668","14916","14922","16041","16256","16236","16664"];

  var index = array.indexOf(codigo);

  if(index != -1)
  {
    return true;
  }
  else
  {
    return false;
  }

}