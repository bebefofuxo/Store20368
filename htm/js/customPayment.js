jQuery(document).ready(function(){

var sPag=document.location.href.toUpperCase();

if(sPag.indexOf("YPREDIR.ASP") != -1) {
  
  if($("#idTabRedirPagtoFC").parent().parent().parent().parent().parent().length == 0)
  {
    $("#idTabRedirPagtoFC")[0].style.width="90%";
    $("#idTabRedirPagtoFC")[0].style.maxWidth="500px";

    $('#idDadosPagtoTitFC').css("background-color","rgb(242 242 242)");
    $('#idDadosPagtoTitFC').css("color","rgb(102 102 102)");
    var a = $('#idDadosPagtoTitFC .EstTabTopo').text();
    a = a.replace("   (Loja Bebê Fofuxo)","");
    $('#idDadosPagtoTitFC .EstTabTopo').text(a);
  }
  else
  {
    $("#idTabRedirPagtoFC").parent().parent().parent().parent().parent()[0].removeAttribute("width");
    $("#idDadosPagtoTitFC").parent().parent()[0].removeAttribute("width");
    $("#idTabRedirPagtoFC").parent().parent().parent().parent().parent()[0].style.width="90%";
    $("#idTabRedirPagtoFC").parent().parent().parent().parent().parent()[0].style.maxWidth="500px";

    $(".EstTabQuadro tr").eq(1).css('height', '30px');


    $("#idDadosPagtoTitFC").parent().parent()[0].style.width = '100%';
    $("#idTabRedirPagtoFC")[0].style.width = '100%';

    $(".EstNomeCampo")[0].parentNode.children[0].innerHTML = "<strong>" + $(".EstNomeCampo")[0].parentNode.children[0].innerText + "</strong> " + $(".EstNomeCampo")[0].parentNode.children[1].innerText + " (precisa trocar de bandeira? <a href='#trocar_bandeira'>Clique aqui</a>)";
    $(".EstNomeCampo")[0].parentNode.children[1].remove();

    $(".EstNomeCampo")[1].parentNode.children[0].innerHTML = "<strong>" + $(".EstNomeCampo")[1].parentNode.children[0].innerText + "</strong> " + $(".EstNomeCampo")[1].parentNode.children[1].innerText;
    $(".EstNomeCampo")[1].parentNode.children[1].remove();

    $(".EstNomeCampo")[2].parentNode.children[0].innerHTML = "<strong>" + $(".EstNomeCampo")[2].parentNode.children[0].innerText + "</strong> " + $(".EstNomeCampo")[2].parentNode.children[1].innerText;
    $(".EstNomeCampo")[2].parentNode.children[1].remove();

    $(".EstNomeCampo")[0].parentNode.children[0].align = "left";
    $(".EstNomeCampo")[1].parentNode.children[0].align = "left";
    $(".EstNomeCampo")[2].parentNode.children[0].align = "left";


    var texto = $("#P2ccNum").parent().parent()[0].children[0].innerText;
    $("#P2ccNum").parent().parent()[0].children[0].remove();
    var newNode = document.createElement("div");
    var textNode = document.createTextNode(texto);
    newNode.appendChild(textNode);
    $("#P2ccNum").parent().parent()[0].children[0].insertBefore(newNode,$("#P2ccNum").parent().parent()[0].children[0].children[0]);
    $("#idTRccNumFC div").css('margin-top', '30px');
    $("#idTRccNumFC input").css('width', '100%');
    $("#idTRccNumFC input").css('height', '44px');

    $("#P2ccMesExp").parent().parent()[0].children[0].remove();
    var newNode = document.createElement("div");
    var textNode = document.createTextNode("Validade:");
    newNode.appendChild(textNode);
    $("#P2ccMesExp").parent().parent()[0].children[0].insertBefore(newNode,$("#P2ccMesExp").parent().parent()[0].children[0].children[0]);
    $("#idTRccExpFC div").css('margin-top', '10px');
    $("#idTRccExpFC select").css('width', '90px');

    $("#P2ccNome").parent().parent().parent().parent().parent().parent()[0].children[0].remove();
    $("#P2ccNome").parent().parent()[0].children[1].remove();
    $("#P2ccNome").parent().parent().parent().parent().parent().parent()[0].innerHTML = $("#P2ccNome").parent().parent()[0].innerHTML;
    var newNode = document.createElement("div");
    var textNode = document.createTextNode("Titular (impresso no cartão):");
    newNode.appendChild(textNode);
    $("#P2ccNome").parent().parent()[0].children[0].insertBefore(newNode,$("#P2ccNome").parent().parent()[0].children[0].children[0]);
    $("#idTRccNomeFC div").css('margin-top', '10px');
    $("#idTRccNomeFC input").css('width', '100%');

    $("#P2ccSeg").parent().parent().parent().parent().parent().parent()[0].children[0].remove();
    var oqeh = $("#P2ccSeg").parent().parent()[0].children[1].innerHTML;
    $("#P2ccSeg").parent().parent()[0].children[1].remove();
    $("#P2ccSeg").parent().parent().parent().parent().parent().parent()[0].innerHTML = $("#P2ccSeg").parent().parent()[0].innerHTML;
    var newNode = document.createElement("div");
    var textNode = document.createTextNode("Código de segurança (CVV):");
    newNode.appendChild(textNode);
    $("#P2ccSeg").parent().parent()[0].children[0].insertBefore(newNode,$("#P2ccSeg").parent().parent()[0].children[0].children[0]);
    $("#P2ccSeg").parent().parent()[0].children[0].innerHTML += oqeh;
    $("#idTRccSegFC div").css('margin-top', '10px');

    $("#P2TitularCPF").parent().parent()[0].children[0].remove();
    var newNode = document.createElement("div");
    var textNode = document.createTextNode("CPF do titular");
    newNode.appendChild(textNode);
    $("#P2TitularCPF").parent().parent()[0].children[0].insertBefore(newNode,$("#P2TitularCPF").parent().parent()[0].children[0].children[0]);
    $("#idTRTitularCPFFC div").css('margin-top', '10px');
    $("#idTRTitularCPFFC input").css('width', '100%');

    $("#P2TitularFone").parent().parent().parent().parent().parent().parent()[0].children[0].remove();
    $("#P2TitularFone").parent().parent()[0].children[1].remove();
    $("#P2TitularFone").parent().parent().parent().parent().parent().parent()[0].innerHTML = $("#P2TitularFone").parent().parent()[0].innerHTML;
    var newNode = document.createElement("div");
    var textNode = document.createTextNode("Telefone do titular (com DDD):");
    newNode.appendChild(textNode);
    $("#P2TitularFone").parent().parent()[0].children[0].insertBefore(newNode,$("#P2TitularFone").parent().parent()[0].children[0].children[0]);
    $("#idTRTitularFoneFC div").css('margin-top', '10px');
    $("#idTRTitularFoneFC input").css('width', '100%');

    var elemTitulo = document.getElementById('idDadosPagtoTitFC').querySelector(".EstTabTopo");
    $('.InputText').each(function(index, element) {

      this.style.height = "44px";
      this.style.padding = "5px 0 5px 5px";
      $(this).css("input[type='text']:focus","16px !important");
      this.onpaste = function(){alert("Digite os dados ao invés de colar.");return false};
      this.onpaste = function(){alert("Digite os dados ao invés de colar.");return false};
      this.onpaste = function(){alert("Digite os dados ao invés de colar.");return false};

    });

    $('#EnviaCardMPT').css('background-color',"#00ae7c");
    $('#EnviaCardMPT').css('font-size',"22px");
    $('#EnviaCardMPT').css("height","50px");
    $('#EnviaCardMPT').attr("value","EFETUAR PAGAMENTO");
    $('.smText:contains(obriga)').parent().html("");
    $('#idDadosPagtoTitFC').css("background-color","rgb(242 242 242)");
    $('#idDadosPagtoTitFC').css("color","rgb(102 102 102)");
    var a = $('#idDadosPagtoTitFC .EstTabTopo').text();
    a = a.replace("   (Loja Bebê Fofuxo)","");
    $('#idDadosPagtoTitFC .EstTabTopo').text(a);

    var num_pedido = a.replace("Pagamento do pedido #","");

    var newNode = document.createElement("div");
    newNode.style.marginTop = "20px";
    newNode.style.paddingTop = "30px";
    newNode.id = "trocar_bandeira";
    newNode.style.marginBottom = "400px";
    newNode.style.width = "90%";
    newNode.style.maxWidth = "500px";
    newNode.style.marginLeft = "auto";
    newNode.style.marginRight = "auto";
    newNode.innerHTML = "Para trocar a bandeira do cartão de crédito e efetuar o pagamento você precisa <strong>refazer o seu pedido</strong>, mas não se preocupe, é bem fácil:<br><br>- Clique no link abaixo<br>- Faça o login (caso ainda não esteja logado)<br>- Clique no botão verde da página indicando para refazer o pedido<br><br><a href='https://www.bebefofuxo.com.br/track.asp?numpedido="+num_pedido+"'>Desejo trocar a bandeira do cartão</a>";
    insertAfter($("#idTabRedirPagtoFC").parent().parent().parent().parent().parent()[0],newNode);


    $.getScript("https://www.bebefofuxo.com.br/lojas/00020368/htm/js/vanillamaskermin.js",function() {

      /*masks*/
      function inputHandler(masks, max, event) {
        var c = event.target;
        var v = c.value.replace(/\D/g, '');
        var m = c.value.length > max ? 1 : 0;
        VMasker(c).unMask();
        VMasker(c).maskPattern(masks[m]);
        c.value = VMasker.toPattern(v, masks[m]);
      }

      var docMask = ['999.999.999-999'];
      var docTitular = document.querySelector('#P2TitularCPF');
      if(docTitular)
      {
        VMasker(docTitular).maskPattern(docMask[0]);
        docTitular.addEventListener('input', inputHandler.bind(undefined, docMask, 14), false);
        document.querySelector('#P2TitularCPF').maxLength='14';
      }

      var telMask = ['(99) 9999-99999', '(99) 99999-9999'];
      var tel = document.querySelector('#P2TitularFone');
      VMasker(tel).maskPattern(telMask[0]);
      tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);

      var ccMask = ['99999999999999999999'];
      var cc = document.querySelector('#P2ccNum');
      VMasker(cc).maskPattern(ccMask[0]);
      cc.addEventListener('input', inputHandler.bind(undefined, ccMask, 20), false);



    });
  }  
  
  
  
  
  
  
}
  
  if(sPag.indexOf("PIX.EHC") != -1) {

    var newNode = document.createElement("div");
    newNode.style.width = "200px";
    newNode.style.marginLeft = "auto";
    newNode.style.marginRight = "auto";
    newNode.style.marginTop = "30px";
    newNode.style.marginBottom = "30px";
    newNode.innerHTML = "<div style='text-align:center;'>Seu pagamento será processado pela <br> <img style='margin-top:10px;' src='/lojas/00020368/images/yapay.png' width='150px' height='42'></div>";
    insertAfter($(".qrMain")[0],newNode);

  }
  
  if(sPag.indexOf("BOLETO13.ASP") != -1) {

    var newNode = document.createElement("div");
    newNode.style.width = "200px";
    newNode.style.marginLeft = "auto";
    newNode.style.marginRight = "auto";
    newNode.style.marginTop = "30px";
    newNode.style.marginBottom = "30px";
    newNode.innerHTML = "<div style='text-align:center;'>Seu pagamento será processado pela <br> <img style='margin-top:10px;' src='/lojas/00020368/images/yapay.png' width='150px' height='42'></div>";
    insertAfter($("#idTabRedirPagtoFC")[0],newNode);

  }
  
});

var head  = document.getElementsByTagName('head')[0];
var link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = '/lojas/00020368/htm/css/customPayment.css';
link.media = 'all';
head.appendChild(link);

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
