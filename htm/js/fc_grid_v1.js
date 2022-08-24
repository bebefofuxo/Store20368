// FastCommerce Grid [08.07.2015] - Bebê Fofuxo - Dez/2018 //
var produtoAdicionado;

var FCGrid$ = function () {
  "use strict";
  var product={}, myOptions={}, aProductList, aProductOnlyOne, aProductListAll=[], aProductOnlyOneAll=[], aDescriptorsPrevious=[], aSettingsAll=[], iGridQtd=0, iGridAtual=0, iGridAnterior=0;

  //Configuracoes internas da Funcao
  var settings = {
    descriptorsActive: null, //define os descritores existentes nos produtos [array de produtos, quantidade de descritores]
    descriptorsPrevious: [], //armazena os descritores dos produtos clicados
    pathColorsImg : FC$.PathPrd +"cores/",
    idElementGrid : null
  };
  
  // Video Produto (Detalhe)
  function fnVideoImageDet(IDProduto,videoProduct){
    if (videoProduct=="")return "&nbsp;";
    else return "<div id=videodet><div class='videobot' onclick='openvideo()'><img src='"+ FC$.PathImg +"botvideo.svg' alt='Play Video'></div><div id=videoplayfull><div id=prodVideo"+ IDProduto +" class='videoplay'><div class='videoclose' onclick='openvideo()'><img src='"+ FC$.PathImg +"botdontgoclose.svg' alt='Fechar'></div><div class='videoWrapper'><iframe id='popup-youtube-player' src='https://www.youtube.com/embed/"+ videoProduct +"?enablejsapi=1&version=3&playerapiid=ytplayer' width='560' height='315' frameborder='0' allowfullscreen></iframe></div></div></div></div>";
  }

  // Configuracoes
  var options = {
    autoSelect : false,
    cartOnPage : true,
    shippingUpdate : false,
    incMultGrid : false,
    separadorRGBCor : '|',
    qtyDescriptors : 2,
    htmlFlagChecked : '<i class="FCCheckedGrid"></i>',
    imageProduct : 'cor',
    colorName : false,
    colorImg : true,
	colorImgFormat : '.gif',
	stock: false,
    btnAnimation : true,
    btnSelectImg : 'botselecionegrid.svg',
    btnBuyImg : 'botcarrinho.svg',
	btnAddedImg : 'botadded.svg',
    btnContactUSImg : 'botconsultegrid.svg',
    btnSoldOut : 'botcarrinhoesgotado.svg',
	iconArrowPrevIMG : 'icon-grid-arrow-prev.svg',
    iconArrowNextIMG : 'icon-grid-arrow-next.svg',
    textGrid : 'Selecione as opções abaixo',
    order : ['cor','adicional1','adicional2','adicional3'],
    nameDescriptor : {
     cor : 'Cor',
     adicional1 : 'Tamanho',
     adicional2 : 'Sexo',
     adicional3 : 'Idade',
    },
    textDescriptor : {
      cor : 'Selecione a Cor',
      adicional1 : 'Selecione o Tamanho',
      adicional2 : 'Selecione o Sexo',
      adicional3 : 'Selecione a Idade',
    }
  };

  //Fn auxiliares Grid_FC:begin
  var fn = {
    eliminateDuplicates: function(arr){
      var i, len=arr.length, out=[], obj={}; for(i=0;i<len;i++){obj[arr[i]]=0;} for(i in obj){out.push(i);} return out;
    },

    //retorna [] o valor de um determinado descritor, ex. tamanho [ 'P', 'M', 'G' ]
    getDescriptorValueProducts: function(obj, value){
      var results=[];
      for(var i=0; i< obj.length; i++){ var prd = JSON.parse(obj[i]); results.push(prd[value]) ;}
      return results;
    },

    removeClass: function(elementHTML, classNameRemove){
      var rxp = new RegExp( "\\s?\\b"+classNameRemove+"\\b", "g" );
      if(typeof elementHTML.length != 'undefined' &&  typeof elementHTML.item != 'undefined' && typeof elementHTML === 'object'){
        for(var i=0; i< elementHTML.length; i++){
          var objClass=elementHTML[i];
          objClass.className = objClass.className.replace( rxp, '' );
        }
      }else if(elementHTML && typeof elementHTML.length == 'undefined'){
        elementHTML.className = elementHTML.className.replace( rxp, '' );
      }
    },

    addClass: function(elementHTML, classNameAdd){
      elementHTML.className += " " + classNameAdd.replace(/^\s+|\s+$/g,"");
    },

    hasClass: function(elementHTML, classNameHas){
      var has = true, names = String(classNameHas).replace(/^\s+|\s+$/g, '').split(/\s+/);
      for(var i = 0, len = names.length; i < len; i++){
        if(!(elementHTML.className.search(new RegExp('(?:\\s+|^)' + names[i] + '(?:\\s+|$)', 'i')) > -1)) {
          has = false;
          break;
        }
      }
      return has;
    },

    getColor: function(a){
      var name = a.slice(0,a.indexOf( options.separadorRGBCor )), rgb = a.slice(a.indexOf( options.separadorRGBCor )+1, a.length);
      return{
        name:name,
        rgb:rgb
      };
    },

    // Verifica se o descritor esta disponivel
    productAvailableFlag: function(oProd, iNivelAtual){
      var sFlag = {'htmlLabel': '', 'classLabel': ''};
      if(oProd!==null){
        var bNivelAtualDisp = parseInt(iNivelAtual)+1 == (settings.descriptorsActive.length-1) ? true : false; //pega o ultimo nivel
        if(oProd.length==1 || bNivelAtualDisp){
          var oProdParse = JSON.parse(oProd), fPriceDisp = parseFloat(oProdParse.priceNum), iEstoqueDisp = parseInt(oProdParse.estoque), sContentText="";
          if(iEstoqueDisp===0){ sContentText="E"; }else{ if(iEstoqueDisp>0 && fPriceDisp===0){ sContentText="!";}}
          if(sContentText!==""){
            sFlag.htmlLabel="<b class=\"FCFlagEsgotadoGrid\">"+ sContentText +"</b>";
            sFlag.classLabel="FCSoldOutLabel";
          }
        }
      }
      return sFlag;
    },

    getImageProd: function(aProductList, descriptorImg, iNivelAtual){
      for(var i=0; i< aProductList.length; i++){
        var oProd = JSON.parse(aProductList[i]);
        if(oProd[settings.descriptorsActive[iNivelAtual]] == descriptorImg){
          return {'imgPri': oProd.imgPri, 'imgDet': oProd.imgDet , 'imgAmp': oProd.imgAmp};
        }
      }
    },

    // Define descritores existentes
    setActiveDescriptors: function(aPrdListDescr, qtyDescriptors){
      var results = [], idProdutoSemDescritor="";
      for(var i=0; i< qtyDescriptors; i++){
        var iCont=aPrdListDescr.length;
        for(var j=0; j < aPrdListDescr.length;j++){
          var oProd = JSON.parse(aPrdListDescr[j]), sDescritor=oProd[options.order[i]];
          if(sDescritor===undefined || sDescritor===""){ iCont--; idProdutoSemDescritor=oProd.IDProduto;} //tratar erro quando faltar um descritor no produto
        }
        if(iCont==aPrdListDescr.length){results.push(options.order[i]);}
        else if(iCont!==aPrdListDescr.length && iCont>0){
          fn.consoleLogFC({'FC_Log_Grid_v1' : 'produto com descritor ausente', 'descritor' : options.order[i] + ' ('+ options.nameDescriptor[options.order[i]] +')', 'IDProduto' : idProdutoSemDescritor });
          document.getElementById( settings.idElementGrid ).innerHTML="<span>Existe um ou mais produtos com descritores ausentes!</span>";
          return false;
        }
      }
      return results;
    },

    setAttrProduct: function(arr){
  
      if(typeof arr === "object" && arr !== null){
        product.IDProduto=arr.IDProduto;
        product.IDProdutoPai=arr.IDProdutoPai;
        product.cor=arr.cor;
        product.codProd=arr.codProd;
        product.estoque=arr.estoque;
        product.peso=arr.peso;
        product.priceOri=arr.priceOri;
        product.priceNum=arr.priceNum;
        product.maxInstallmentsNum=arr.maxInstallmentsNum;
        product.adicional1=arr.adicional1;
        product.adicional2=arr.adicional2;
        product.adicional3=arr.adicional3;
        product.imgDet=arr.imgDet;
        product.imgAmp=arr.imgAmp;
        product.imgPri=arr.imgPri;
      }else{ fn.consoleLogFC({'FC_Log_Grid_v1' : 'json do subproduto inválido'}); }
    },

    magicZoomFC: function(id, novoArray, novoArrayAmp, FC_MaxImages, refreshZoom){
      var labelDesconto = $("#idDivBadge");
      var imgDetMini="", imgAmpMini="", sHtmlZoom="";
      var sNameProd = fn.getNameProduct();
      for (var i=0;i<=FC_MaxImages;i++)
      {
        if(i===0)
        {
          imgDetMini=novoArray[i];
          imgAmpMini=novoArrayAmp[i];
          sHtmlZoom+="<div class='fc-DivGridImg-Big'><div id=\"fc-grid-api-controls\"><img src=\""+ FC$.PathImg + options.iconArrowPrevIMG +"\" class=\"fc-grid-api-controls-prev\" alt=\"Voltar\" onclick=\"MagicZoom.prev('zoom2');\"><a href="+imgAmpMini.replace(/\s/g, '')+" class='MagicZoom' id=zoom2 data-options='hint:off;lazyZoom:true;' data-mobile-options='zoomMode: off;textClickZoomHint:' rel=\"selectors-class:active; zoom-width:350px; zoom-height:350px; selectors-change:mouseover;\"><img src="+ imgDetMini.replace(/\s/g, '') +" alt='"+sNameProd+"'></a><div class=\"FCGridBtnZoom\"><a onclick=\"$mjs(document.querySelector('a.MagicZoom > .mz-figure')).jCallEvent('btnclick',$mjs(new MouseEvent('btnclick'))); return false;\" href=\"#\"><img src='"+ FC$.PathImg +"botampliar.svg'></a></div><img src=\""+ FC$.PathImg + options.iconArrowNextIMG +"\" class=\"fc-grid-api-controls-next\"  alt=\"Voltar\" onclick=\"MagicZoom.next('zoom2');\"></div>"+ fnVideoImageDet(IDProdutoDet,CodVideoProdDet)+"</div>"
                    +"<div class='fc-DivGridImg-Small1'><a href=\""+imgAmpMini.replace(/\s/g, '')+"\" data-zoom-id=\"zoom2;\" rel=\"zoom-id:zoom2;\" rev=\""+ imgDetMini.replace(/\s/g, '') +"\"><img src=\""+ imgDetMini.replace(/\s/g, '') +"\" alt='"+sNameProd+"' class=ZoomIMG2></a></div>";
        }
        else{
          if(novoArray[i].indexOf('#')>=0){
            imgDetMini=novoArray[i].replace('#',FC$.PathPrdExt);
            imgAmpMini=novoArrayAmp[i].replace('#',FC$.PathPrdExt);
          }else{
            imgDetMini=FC$.PathPrd+novoArray[i];
            imgAmpMini=FC$.PathPrd+novoArrayAmp[i];
          }
          sHtmlZoom+="<div class='fc-DivGridImg-Small2'><a href="+imgAmpMini.replace(/\s/g, '')+" data-zoom-id=\"zoom2;\" rel='zoom-id:zoom2;' rev="+ imgDetMini.replace(/\s/g, '') +"><img src="+ imgDetMini.replace(/\s/g, '') +" alt='"+sNameProd+"' class=ZoomIMG2></a></div>";
	      }      
	  }
      document.getElementById(id).innerHTML=sHtmlZoom;

      setTimeout(function(){
        var mgZoomId = document.querySelector('#zoom2');
        mgZoomId.setAttribute('title',sNameProd);
        if(refreshZoom)MagicZoom.refresh();
      },700);
      
      $(".fc-DivGridImg-Big").append(labelDesconto);
    },
	
    imgView: function(srcImgDet, srcImgAmp, refreshZoom){
      var imgDetAll = srcImgDet;
      var imgAmpAll = srcImgAmp;
      var novoArray = imgDetAll.split(',');
      var novoArrayAmp = imgAmpAll.split(',');
	  var CountImgDet=novoArray.length;
      var CountImgAmp=novoArrayAmp.length;
	  
	  if (imgDetAll==="" || imgAmpAll===""){
        //fn.consoleLogFC({'FC_Log_Grid_v1' : 'subproduto sem imagem cadastrada'});
        return "";        
	  }
	  
      else{
        if(CountImgDet==CountImgAmp){var FC_MaxImages=CountImgDet-1;}else{var FC_MaxImages=0;}
        if(document.getElementById('idDivGridImg'))return this.magicZoomFC('idDivGridImg', novoArray, novoArrayAmp, FC_MaxImages, refreshZoom);
	    else{
          if(iGridAtual>0 && novoArray[0]){
            var IDProdutoPai=JSON.parse(aProductListAll[iGridAtual-1][0]).IDProdutoPai;
            var oImgPai=document.querySelector("#id-video-image"+ IDProdutoPai +" img");
            if(oImgPai)oImgPai.src=novoArray[0];
          }
        }
      }
	},
    isSingleDescriptor: function(){
      if(settings.descriptorsActive.length==1){return true;}else{return false;}
    },

    marge: function(obj1,obj2){
      var result={}, name; for(name in obj1) result[name]=obj1[name]; for(name in obj2) result[name]=obj2[name]; return result;
    },	

    popupSoldOutProduct: function(params){
      return new MostraDispCaptcha(FC$.IDLoja, product.IDProduto); //Função para popup de aviso de disponibilidade, produto esgotado
      
    },

    qtyIncFieldDisabled: function(isDisabled, isValueField){
      if(isDisabled){ document.getElementById("idQTIncMultGrid").disabled=true; }else{ document.getElementById("idQTIncMultGrid").disabled=false;}
      if(isValueField){
        if(document.getElementById("idQTIncMultGrid").value===0) document.getElementById("idQTIncMultGrid").value=1;
        var oQtdZip = document.querySelector("[id^='idQtdZip']");
        if(oQtdZip && oQtdZip==0)oQtdZip.value=1;
      }
    },

    consultUsAboutProduct: function(){
      var IDSubProd=product.IDProduto;
      var aNameRGB=product.cor.split(options.separadorRGBCor);
      var sNameColor=aNameRGB[0];
      var sCodeRef=product.codProd;
      if(sCodeRef!=="")sCodeRef="Cod%2E%20refer%EAncia%20"+sCodeRef;

      var sURLConsultUsAbout='/FaleConosco.asp?IDLoja='+ FC$.IDLoja +'&Assunto=Consulta%20sobre%20o%20produto%20'+ fn.getNameProduct() +'%20(ID%20'+ IDSubProd +')%20'+sCodeRef+'%20%2C';
      if(sNameColor!=='')sURLConsultUsAbout+=' '+ options.nameDescriptor['cor'] +' '+ sNameColor.replace(/\+/g,'%2B') +'%2C';
      if(product.adicional1!=='')sURLConsultUsAbout+=' '+ options.nameDescriptor['adicional1'] +' '+ fn.encodeURI( fn.charCode(product.adicional1) ) +'%2C';
      if(product.adicional2!=='')sURLConsultUsAbout+=' '+ options.nameDescriptor['adicional2'] +' '+ fn.encodeURI( fn.charCode(product.adicional2) ) +'%2C';
      if(product.adicional3!=='')sURLConsultUsAbout+=' '+ options.nameDescriptor['adicional3'] +' '+ fn.encodeURI( fn.charCode(product.adicional3) ) +'%2C';
      top.location.href=sURLConsultUsAbout;
    },

    setPriceProduct: function(product){
      var oPositionPrice=document.getElementById("idPriceGridFC");
      if(parseFloat(product.priceNum) > 0 && oPositionPrice){
        var oMaxInstallments = fnMaxInstallmentsGrid(product.priceNum, product.maxInstallmentsNum);
        var oEconomyJS = (typeof fnShowEconomyGrid == 'function') ?  fnShowEconomyGrid(product.priceNum, product.priceOri) : "";

        if(product.priceNum!=product.priceOri){
           return oPositionPrice.innerHTML="<span style='font-size:18px; font-weight:400; color:#a2a2a2'>de <strike>"+FCLib$.FormatPreco(FormatPrecoReais(product.priceOri))+"</strike>&nbsp;&nbsp;</span><span style='font-size:20px; font-weight:700; color:#da187f;'>por <span style='font-size:24px;'>"+FCLib$.FormatPreco(FormatPrecoReais(product.priceNum))+"</span></span>" + oMaxInstallments + oEconomyJS;
         }
         else{
           return oPositionPrice.innerHTML="<span style='font-size:24px; font-weight:700; color:#da187f'>"+FCLib$.FormatPreco(FormatPrecoReais(product.priceNum))+"</span>"+ oMaxInstallments;
         }
      }else{return oPositionPrice.innerHTML="Preço sob Consulta";}
    },

    setCodeProduct: function(){
      var oPositionCode=document.getElementById("idCodProdGrid");
      if(oPositionCode && product.codProd !== "") oPositionCode.innerHTML=product.codProd;
    },

    availableBuyProduct: function(product, sParamsGrid){
		
      var oBtnComprar=document.createElement("div");
      if(!product){
        oBtnComprar.setAttribute("class", "FCBtnGrid FCBtnSelectedOption FCBtnSelecioneGrid");
        oBtnComprar.innerHTML="<img src=\""+ FC$.PathImg + options.btnSelectImg +"\">"
                             +"<div class=\"FCTooltipGrid Off\" id=\"idTooltipGridFC\" style=\"display:\">Selecione primeiro as opções do produto</div>";
        oBtnComprar.onclick=function(a){
          if( fn.hasClass(document.getElementById("idTooltipGridFC"), "Off")){
            fn.removeClass(document.getElementById("idTooltipGridFC"), "Off");
            fn.addClass(document.getElementById("idTooltipGridFC"), "On");
            
            //scroll até as opções
            var item = $("#idNivelGridFC_0")[0];
            item.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
          }else{
            fn.removeClass(document.getElementById("idTooltipGridFC"), "On");
            fn.addClass(document.getElementById("idTooltipGridFC"), "Off");
          }
          var oTooltip=document.getElementById("idTooltipGridFC").style.display;
        };
      }
      else{
        
        if(parseInt(product.estoque)===0){
          oBtnComprar.setAttribute("class", "FCBtnGrid FCBtnEsgotadoGrid");
          oBtnComprar.innerHTML="<img src=\""+ FC$.PathImg + options.btnSoldOut +"\" />";
          oBtnComprar.onclick=function(){
            fn.popupSoldOutProduct(sParamsGrid);
            var frameSoldOut = $(".vex-content iframe")[0];
            frameSoldOut.frameBorder = "none";
            $(".vex-content").css("background-color","white");
            
            frameSoldOut.onload = function() {
            	console.log(frameSoldOut.contentWindow.document.body.offsetHeight);
            	$(".vex-content").height(frameSoldOut.contentWindow.document.body.offsetHeight + 20);
        	}
            
          };
          if(options.incMultGrid)fn.qtyIncFieldDisabled(true, false);
          fn.getShippingView(false); //simulação de frete
        }
        else if(parseInt(product.estoque)>0 && parseFloat(product.priceNum) === 0){
          oBtnComprar.setAttribute("class", "FCBtnGrid FCBtnConsultenos");
          oBtnComprar.innerHTML="<img src=\""+ FC$.PathImg + options.btnContactUSImg +"\">";
          oBtnComprar.onclick=function(){
            fn.consultUsAboutProduct(sParamsGrid);
          };
          if(options.incMultGrid)fn.qtyIncFieldDisabled(true, false);
          fn.getShippingView(false); //simulação de frete
        }
        else{
          oBtnComprar.setAttribute("class", "FCBtnGrid FCBtnComprarGrid");
          oBtnComprar.innerHTML="<img src=\""+ FC$.PathImg + options.btnBuyImg +"\" alt=\"Clique para adicionar ao Carrinho\">";
          oBtnComprar.onclick=function(obj){
            if($("#id_de").length > 0 && tem_erro_vale_presente()){

              if($("#id_de").val() == "" || $("#id_para").val() == "")
              {
                alert("Preencha os campos DE e PARA");
                var item = $("#id_de")[0];
                item.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
              }
              else if($("#id_emailpresenteado")[0].checked == false && $("#id_whatspresenteado")[0].checked == false && $("#id_meuemail")[0].checked == false)
              {
                alert("Selecione uma das 3 opções de envio do Vale Presente");
                var item = $("#id_emailpresenteado")[0];
                item.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
              }
              else if($("#id_emailpresenteado")[0].checked == true && validacaoEmail() == false)
              {
                alert("Preencha o e-mail do presenteado corretamente");
                var item = $("#id_emailpresenteado")[0];
                item.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
              }
              else if($("#id_whatspresenteado")[0].checked == true && validacaoWhats() == false)
              {
                alert("Preencha o Whatsapp do presenteado corretamente, com DDD e 9 dígitos.");
                var item = $("#id_whatspresenteado")[0];
                item.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
              }


            }
            else
            {
              if($("#id_de").length > 0)
              {
                var tem_vale = window.localStorage.vales;
                if(tem_vale)
                {
                  var vales =  JSON.parse(window.localStorage.vales);
                }
                else
                {
                  var vales = [];
                }
                
                var forma_envio = "";
                var dados_envio = "";
                
                if($("#id_meuemail")[0].checked == true)
                {
                  forma_envio = "email comprador";
                }
                else if($("#id_emailpresenteado")[0].checked == true)
                {
                  forma_envio = "email presenteado";
                  dados_envio = $("#input_email_presenteado").val();
                }
                else if($("#id_whatspresenteado")[0].checked == true)
                {
                  forma_envio = "whatsapp presenteado";
                  dados_envio = $("#input_whats_presenteado").val();
                }
                
                vales[vales.length] = {"tipo":product.codProd,"De":$("#id_de").val(),"Para":$("#id_para").val(),"forma_envio":forma_envio,"dados_envio":dados_envio};
                
                window.localStorage.setItem("vales",JSON.stringify(vales));
                
              }
              
              fnBuyProdutct(this);
            }
            
            
          };
          fn.getShippingView(true);
          if(options.incMultGrid)fn.qtyIncFieldDisabled(false, true);
        }
      }
      return oBtnComprar;
    },

    srcProduct: function(nivelAtual, descriptorImg, aProductList){
      var iNivelAtual=parseInt(nivelAtual);
      var aDataImagem=fn.getImageProd(aProductList, descriptorImg, iNivelAtual);
      return " data-img-det=\""+aDataImagem.imgDet+"\" data-img-amp=\""+aDataImagem.imgAmp+"\"" +
        " onclick='srcHoverImg(\"" + aDataImagem.imgPri + "\",\"" + descriptorImg.substring(descriptorImg.indexOf("-") + 1, descriptorImg.indexOf("|")) + "\",this);' onmouseout='srcHoverOutImg(\"" + aDataImagem.imgPri + "\",this);'";
    },

    viewStock: function(iEstoqueDetail, fPriceDetails){
        var sEstoqueDetailOut="";
        if(iEstoqueDetail === 0){sEstoqueDetailOut= "indisponivel";}
        else if(fPriceDetails === 0){sEstoqueDetailOut= "sob consulta"}
        else{sEstoqueDetailOut=iEstoqueDetail}
        return "<span class=\"AdicNome\">Quantidade em Estoque:</span> <span class=\"AdicItem\"><b>"+ sEstoqueDetailOut + "</b></span>";
    },

    getDetailsProduct: function(){
      var sHtmlDetails = "";
      for(var i=0; i< settings.descriptorsActive.length; i++){
        var str = settings.descriptorsActive[i];
        if(str.toUpperCase() == 'COR'){
          var aNameRGB=product[settings.descriptorsActive[i]];
          var sNameColor=aNameRGB.split(options.separadorRGBCor);
          var sNomeAdic=sNameColor[0];
        }
        else{
          var sNomeAdic = product[settings.descriptorsActive[i]];
        }
        sHtmlDetails+= "<div class=\"FCGridAdicContent FCGridAdicProductList\"><span class=\"AdicNome\">"+ options.nameDescriptor[settings.descriptorsActive[i]] +":</span><span class=\"AdicItem\">"+ sNomeAdic +"</span></div>";
      }
      //quantidade em estoque
      if(options.stock){
        var iEstoqueDetail = parseInt(product.estoque), fPriceDetails = parseFloat(product.priceNum);
        sHtmlDetails+= "<div class=\"FCGridAdicContent FCGridAdicProductList\">"+ fn.viewStock(iEstoqueDetail, fPriceDetails) +"</div>";
      }
      return sHtmlDetails;
    },

    classDescriptor: function(obj){
      return "FC"+ obj.charAt(0).toUpperCase() + obj.slice(1)+"Grid"; //formata a classe para cada descritor
    },

    charCode: function(obj){
      return obj.replace(/&amp;/g, '&#38;').replace(/&lt;/g, '&#60;').replace(/&gt;/g, '&#62;').replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(n); }); //& < >
    },

    sendPost: function(url, oParams){
      var oForm=document.createElement("form");
      oForm.action=url;
      oForm.method="Post";
      oForm.name="FormMult";

      for(var i=0; i< oParams.length; i++) {
        var oInput=document.createElement("input");
        oInput.type="hidden";
        oInput.name=oParams[i][0];
        oInput.setAttribute("value", oParams[i][1]);
        oForm.appendChild(oInput);
      }
      document.body.appendChild(oForm);
      oForm.submit();
    },

    getNameProduct: function(){
      var oNameProd=document.getElementById('idNameProductGridFC');
      return oNameProd ? oNameProd.innerHTML : "";
    },

    getShippingView: function(isView){

      if(options.shippingUpdate){
        var oButtonShipping = document.getElementById("idCEPButton");
        var oZipField = document.querySelector("[id^='idZip']");
        var oQtdZipField = document.querySelector("[id^='idQtdZip']");
        var oShippingValues = document.querySelector("[id^='idShippingValues']");

        if(oZipField && oShippingValues){
          if(isView){
            oZipField.disabled = false;
            oQtdZipField.disabled = false;
            var iPesoProdSub = product.peso;
            iPesoProdSub = parseFloat(iPesoProdSub.replace(",","."));
            //se o subproduto tem peso 0 é usado o peso do produto pai para a simulação de frete
            if(product.estoque !== "" && iPesoProdSub > 0 || product.estoque !== undefined && iPesoProdSub > 0){
              oZipField.id = "idZip"+ product.IDProduto;
              oQtdZipField.id = "idQtdZip"+ product.IDProduto;
              oShippingValues.id = "idShippingValues"+ product.IDProduto;
              oButtonShipping.onclick = function() {
                fnGetShippingValuesProdGrid(product.IDProduto);
                fn.consoleLogFC({'FC_Log_Grid_v1' : 'simulação de frete para o produto de ID ' + product.IDProduto});
              };
            }else{
              var oProdPai = JSON.parse(aProductOnlyOne);
              oZipField.id = "idZip"+ oProdPai.IDProduto;
              oQtdZipField.id = "idQtdZip"+ oProdPai.IDProduto;
              oShippingValues.id = "idShippingValues" + oProdPai.IDProduto;
              oButtonShipping.onclick = function() {
                fnGetShippingValuesProdGrid(oProdPai.IDProduto);
                fn.consoleLogFC({'FC_Log_Grid_v1' : 'simulação de frete para o produto de ID ' + oProdPai.IDProduto});
              };
            }
          }else{
            oButtonShipping.onclick = function() {
               alert("Selecione um produto disponivel primeiro.");
            };
            oZipField.disabled = true;
            oQtdZipField.disabled = true;
          }
        }
      }
    },

    creatInputIncMultQty: function(){
      var oInputIncMult = document.createElement("INPUT");
          oInputIncMult.setAttribute("type", "text");
          oInputIncMult.setAttribute("value", "1");
          oInputIncMult.setAttribute("size", "1");
          oInputIncMult.setAttribute("maxlength", "3");
          oInputIncMult.setAttribute("class", "QTIncMultGrid");
          oInputIncMult.setAttribute("id", "idQTIncMultGrid");
          oInputIncMult.setAttribute("name", "QTIncMultGrid");
          oInputIncMult.disabled=true;
          oInputIncMult.onkeyup = function (obj) { fn.validQuantityIncMult(this); };
      var oSpan = document.createElement('span');
      oSpan.setAttribute('class', 'FCContentIncMultGrid');
      oSpan.appendChild(oInputIncMult);

      //button's plus and decrease
      var oSpanButton = document.createElement("span");
      oSpanButton.setAttribute('class', 'FCIncMultGridButton');
      var oSpanButtonPlus = document.createElement('span');
      oSpanButtonPlus.innerHTML = '&#9650;';
      oSpanButtonPlus.onclick = function () {
        var elemQty = document.querySelector("#idQTIncMultGrid");
        if (elemQty && elemQty.disabled != true) {
          var newValue = parseInt(elemQty.value) + (1);
          if (newValue > 0 && newValue < 1000) {
            elemQty.value = newValue;
            fn.validQuantityIncMult(elemQty);
          }
        }
      };

      var oSpanButtonDecrease = document.createElement('span');
      oSpanButtonDecrease.innerHTML = '&#9660;';
      oSpanButtonDecrease.onclick = function () {
        var elemQty = document.querySelector("#idQTIncMultGrid");
        if (elemQty && elemQty.disabled != true) {
          var newValue = parseInt(elemQty.value) + (-1);
          if (newValue > 0 && newValue < 1000) {
            elemQty.value = newValue;
            fn.validQuantityIncMult(elemQty);
          }
        }
      };

      oSpanButton.appendChild(oSpanButtonPlus);
      oSpanButton.appendChild(oSpanButtonDecrease);
      oSpan.appendChild(oSpanButton);
      return oSpan;
    },

    validQuantityIncMult: function(objHTML){
      var sNumber = objHTML.value.replace(/[^0-9]/g, ""); //remove tudo que é diferente de 0-9
      sNumber = sNumber.replace(/^(0+)(\d)/g, "$2"); //remove zeros a esquerda
      var oQtdZipFieldIncMult = document.querySelector("[id^='idQtdZip']");
      if(sNumber > 0){
        objHTML.value= sNumber.substring(0,3);
        if(oQtdZipFieldIncMult)oQtdZipFieldIncMult.value=sNumber.substring(0,3);
      }else{
        objHTML.value=0;
        if(oQtdZipFieldIncMult)oQtdZipFieldIncMult.value=0;
      }
    },

    convertCharAT: function(aProductsAT){
      var results=[];
      var aDescriptorsList = ["cor", "adicional1", "adicional2", "adicional3"];
      for(var i=0; i< aProductsAT.length; i++ ){
         var oProdAT = JSON.parse(aProductsAT[i]);
         for(var j=0; j < aDescriptorsList.length; j++){
           var sDescriptorAT = oProdAT[aDescriptorsList[j]];
           if( sDescriptorAT !== "") oProdAT[aDescriptorsList[j]] = fn.charCode(sDescriptorAT);
         }
      results.push(JSON.stringify(oProdAT));
      }
      return results;
    },

    encodeURI: function(obj){
      //#$&+-_'.=?@"
      var objReplace = obj.replace(/\&quot;/g,"\"");
      return escape(objReplace).replace(/\"/g,"%22").replace(/\#/g,"%23").replace(/\$/g,"%24").replace(/\&/g,"%26").replace(/\'/g,"%27").replace(/\+/g,"%2B").replace(/\-/g,"%2D").replace(/\./g,"%2E").replace(/\=/g,"%3D").replace(/\?/g,"%3F").replace(/\@/g,"%40").replace(/\_/g,"%5F");
    },

    consoleLogFC: function(obj){
      if (typeof console !== 'undefined')console.log(obj); /* Loga informações do produto */
    }

  };
  //Fn auxiliares Grid_FC:end
  
  // Realiza animação de pulsar do botão
  function btnAnimation(posBtnComprar) {
    if(options.btnAnimation) {
      posBtnComprar.classList.add('btnFadeOut');
      posBtnComprar.innerHTML = "<img src=\""+ FC$.PathImg + options.btnAddedImg +"\" alt=\"Pronto, produto adicionado!\">";
    }
  };


  function fnSelectsProducts(aProductList, sDescritorAtual, iNivelAtual){
    var results=[];
    var getProd = function (prd){
      if(settings.descriptorsPrevious[-2] !== undefined){
        for(var k=0; k < settings.descriptorsPrevious.length; k++){
          for(var l=0; l< options.order.length ;l++){
            if( prd[options.order[l]] === settings.descriptorsPrevious[k-1]){
              return true;
            }
          }
        }
        return false;
      }else{
        return true;
      }
    };

    for(var i=0; i< aProductList.length; i++){
      var prd = JSON.parse(aProductList[i]);

      if(settings.descriptorsPrevious[iNivelAtual-1] !== undefined){
        var iCont=0;
        var sDescriptorsActiveCharAT=fn.charCode( prd[settings.descriptorsActive[iNivelAtual]] );

        if( sDescriptorsActiveCharAT == sDescritorAtual){
          for(var j=0; j< settings.descriptorsPrevious.length;j++){
            var sDescriptorsActivePreviousCharAT = prd[settings.descriptorsActive[parseInt(iNivelAtual)-(1+j)]];
            if( sDescriptorsActivePreviousCharAT == settings.descriptorsPrevious[iNivelAtual-(1+j)] ){
              if(getProd(prd))iCont++;
            }else{
              iCont=0; break;
            }
          }
          if(iCont>0) results.push(JSON.stringify(prd));
        }
      }else{
        if(prd[settings.descriptorsActive[iNivelAtual]] == sDescritorAtual)results.push(JSON.stringify(prd));
      }
    }
    return results;
  }
  
  function fnprocessRegistroAtividade_AddProduto()
  {
    //console.log("Registrado Add Produto com sucesso");
  }

  function fnBuyProdutct(posBtnComprar){

    var ja_apareceu_comprar_mais = window.localStorage.ja_apareceu_comprar_mais;
    
    if(ja_apareceu_comprar_mais)
    {
      var sessao_id = window.localStorage.sessao_id;
      
      AjaxExecFC("https://bebefofuxo.net/scripts/compre_mais/registrar_atividade.php","sessao_id="+ sessao_id + "&comprou_produto=" + "1" + "&cod_modelo=" + product.codProd,false,fnprocessRegistroAtividade_AddProduto);
    }
  

    produtoAdicionado = product;
    var iQtyIncMult=1;
    //incMult
    if(options.incMultGrid){
      var iQtyEstoque=product.estoque;
      iQtyIncMult=document.getElementById("idQTIncMultGrid").value;
      if(iQtyIncMult>iQtyEstoque){
        alert("Estoque solicitado maior que o diponivel. \n"+ "Estoque disponivel no momento ("+ iQtyEstoque +").");
        return document.getElementById("idQTIncMultGrid").focus();
      }
      if(iQtyIncMult==0){
        alert("A quantidade solicitada deve ser igual ou maior que 1.");
        return document.getElementById("idQTIncMultGrid").focus();
      }
    }

    // Todos os parametros do produto
    var aNameRGB=product.cor.split(options.separadorRGBCor), sNameColor=aNameRGB[0];
    if(options.cartOnPage){
      var IDSubProd=product.IDProduto, sParamsProd='&QTIncMult_'+IDSubProd+'='+iQtyIncMult;
      if(sNameColor!=='')sParamsProd+='&Cor_'+ IDSubProd +'='+ EncodeParamFC(sNameColor).replace(/\+/g,'%2B');
      if(product.adicional1!=='')sParamsProd+='&Adicional1_'+ IDSubProd +'='+ EncodeParamFC(fn.charCode(product.adicional1));
      if(product.adicional2!=='')sParamsProd+='&Adicional2_'+ IDSubProd +'='+ EncodeParamFC(fn.charCode(product.adicional2));
      if(product.adicional3!=='')sParamsProd+='&Adicional3_'+ IDSubProd +'='+ EncodeParamFC(fn.charCode(product.adicional3));
      btnAnimation(posBtnComprar);
      AjaxExecFC("/addmult.asp","IDLoja="+ FC$.IDLoja +"&xml=1"+sParamsProd,true,processXMLAddMult,FC$.IDLoja,posBtnComprar,sParamsProd);
      
      
      //RETIRAR LINHA ABAIXO QUANDO O TEMPO DE RESPOSTA DO CARRINHO MELHORAR
      $("body").addClass('running');
    }else{

      if(options.incMultGrid){
        var IDSubProd=product.IDProduto, oParams=[];
        oParams.push(['IDProduto', IDSubProd]);
        oParams.push(['QTIncMult_'+IDSubProd, iQtyIncMult]);
        oParams.push(['IDLoja', FC$.IDLoja]);
        oParams.push(['PostMult', true]);

        if(sNameColor!=='')oParams.push([ 'Cor_'+ IDSubProd, sNameColor]);
        if(product.adicional1!=='')oParams.push(['Adicional1_'+ IDSubProd, fn.charCode(product.adicional1)]);
        if(product.adicional2!=='')oParams.push(['Adicional2_'+ IDSubProd, fn.charCode(product.adicional2)]);
        if(product.adicional3!=='')oParams.push(['Adicional3_'+ IDSubProd, fn.charCode(product.adicional3)]);

        fn.sendPost('/addmult.asp', oParams);

      }else{
        var sURLBuy='AddProduto.asp?IDLoja='+ FC$.IDLoja +'&IDProduto='+ product.IDProduto;
        if(sNameColor!=='')sURLBuy+='&Cor='+ sNameColor.replace(/\+/g,'%2B');
        if(product.adicional1!=='')sURLBuy+='&Adicional1='+ fn.encodeURI( fn.charCode(product.adicional1) );
        if(product.adicional2!=='')sURLBuy+='&Adicional2='+ fn.encodeURI( fn.charCode(product.adicional2) );
        if(product.adicional3!=='')sURLBuy+='&Adicional3='+ fn.encodeURI( fn.charCode(product.adicional3) );
        top.location.href=sURLBuy;
      }
    }
  }
  
  function fnSelectForWishlist(oPos){
    if(oPos && FC$.Wishlist==1){
      var oBtnWL=document.createElement("div");
      oBtnWL.setAttribute("class","ProdWLSel");
      oBtnWL.innerHTML="Selecione as opções acima para inserir na lista de desejos.";
      oPos.appendChild(oBtnWL);
    }
  }

  function fnAddToWishlist(oPos,idp){
    if(FC$.Wishlist==1){
      var oBtnWL=document.createElement("div");
      oBtnWL.setAttribute("id","ProdWL"+ idp);
      oBtnWL.setAttribute("class","ProdWL");
      //oPos.appendChild(oBtnWL);
      fnInsertAfterGrid(oBtnWL,oPos);
      if(typeof FuncButtonAddToWL==="function"){WL$.fnButtonAddToWishlist(idp);} else {FCLib$.onReady(function(){WL$.fnButtonAddToWishlist(idp);});}
      var el=document.querySelectorAll('.ProdWLSel');
      if(el.length>0){
        for(var i=0; i< el.length;i++){el[i].parentNode.removeChild(el[i]);} //remove texto informando para selecionar opções
      }
    }
  }

  function fnInsertAfterGrid(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function fnResetWishlist(){
    if(FC$.Wishlist==1){
      var el=document.querySelectorAll('.ProdWL');
      if(el.length>0){
        for(var i=0; i< el.length;i++){el[i].parentNode.removeChild(el[i]);} //remove os botões já existem no html de wishlist
      }
    }
  }

  function fnExistsProduct(IDProduto, descritores, descrAnterior, aProductList){
    var sParms="";
    
    for(var i=0; i< aProductList.length; i++){
      var prd = JSON.parse(aProductList[i]);
      if(parseInt(prd.IDProduto) === parseInt(IDProduto)){
        sParms= "IDProduto="+ prd.IDProduto;
        for(var j=0; j< descritores.length; j++){
          if(descrAnterior[j] == prd[descritores[j]]){
            if((descritores[j]).toUpperCase() == "COR"){ sParms+= "&"+ descritores[j] +"="+ fn.getColor(descrAnterior[j]).name; }else{ sParms+= "&"+ descritores[j] +"="+ descrAnterior[j]; }
          }
        }
        fn.setAttrProduct(prd); //Seleciona o subproduto e Set na var product
      }
    }

    var oButton=fn.availableBuyProduct(product,sParms); //verificar disponibilidade e cria o botao [comprar / esgotado / consulte-nos]
    fn.setPriceProduct(product); // atualiza o valor do produto de acordo com o valor do subproduto
    fn.setCodeProduct(product); // atualza o codigo de referencia do produto

    var el=document.querySelectorAll('#idButtonBuyFC .FCBtnGrid');
    if(el.length>0)for(var i=0; i< el.length;i++){el[i].parentNode.removeChild(el[i]);} //remove os botoes ja existem no html

    var oPositionBtn = document.getElementById('idButtonBuyFC');
    oPositionBtn.appendChild(oButton);

    //exibe o resumo do produto, descritores e atributos
    var oPositionDetail = document.getElementById('idDetailProduct');
    var oPositionButtonBuy = document.getElementById('idButtonBuyFC');

    if(!oPositionDetail){
      var oPositionHtml = document.getElementById(settings.idElementGrid);
	  
	  //var oNewGuiaMedidas = document.createElement ("Div");
          //oNewGuiaMedidas.className='FCGuiaMedidas';
          //oNewGuiaMedidas.innerHTML='Tag Descricao HTM <DescrHTM>'+IDProduto;

      var oNewElement = document.createElement("Div");
          oNewElement.className='FCBoxGrid FCResumeProduct';
          oNewElement.id = "idDetailProduct";
          oNewElement.innerHTML = fn.getDetailsProduct();
      if(oPositionButtonBuy){
		  //oPositionButtonBuy.parentNode.insertBefore(oNewGuiaMedidas, oPositionButtonBuy);
		  oPositionButtonBuy.parentNode.insertBefore(oNewElement, oPositionButtonBuy);
	  }
    }else{
      oPositionDetail.innerHTML=fn.getDetailsProduct();
    }
    //fn.consoleLogFC({'FC_Log_Grid_v1' : 'descritores do produto selecionado', 'dscr' : sParms.replace(/\&/g,', ').replace(/\=/g,' : ')}); /*Loga os parâmetros do produto selecionado*/
  }


// COMECAR AQUI //

  //fnResetOptions:begin
  function fnResetOptions(objElementParent){
    if(options.incMultGrid)fn.qtyIncFieldDisabled(true, false);
    fn.getShippingView(false); //simulação de frete
    var el=document.querySelectorAll('#idButtonBuyFC .FCBtnGrid');
    var elSelect=document.querySelectorAll('#idButtonBuyFC .FCBtnSelectedOption');
    if(el.length>0 && elSelect.length===0){
      for(var i=0; i< el.length;i++){el[i].parentNode.removeChild(el[i]);}
      if(elSelect.length===0){
        var oButton=fn.availableBuyProduct(null);
        var oPositionBtn = document.getElementById('idButtonBuyFC');
        if(oPositionBtn)oPositionBtn.appendChild(oButton);
      }
    }

    var obj=objElementParent.getElementsByTagName("span")[0];
    var iNivelAtual=objElementParent.getAttribute("data-nivel");
    var sDescritorAtual=obj.getAttribute("data-attr");
    var srcImgDet=obj.getAttribute("data-img-det");
    var srcImgAmp=obj.getAttribute("data-img-amp");

    if(srcImgDet!= null && srcImgAmp!= null)fn.imgView(srcImgDet, srcImgAmp, true);

    fn.removeClass(document.querySelectorAll('#idNivelGridFC_'+ iNivelAtual+' .FCDescritorContent li'), 'FCSelectedGrid'); // remove classe das as LIs quando uma opcao e clicada
    fn.addClass(objElementParent,"FCSelectedGrid"); // adiciona classe ao elemento quando o mesmo e clicada
    settings.descriptorsPrevious[parseInt(iNivelAtual)]=sDescritorAtual; // definir o descritor que foi clicado e adiciona a variavel

    var aDestinosDescritores = settings.descriptorsActive; //define os descritores existentes nos produtos
    var oPositionHtml = document.getElementById(settings.idElementGrid);
    var iNextNivel = parseInt(iNivelAtual)+1;

    // incluir os valor dos descritores selecionados em cada nivel ex. (Cinza+Vermelho)
    if(aDestinosDescritores[iNivelAtual].toUpperCase() == 'COR'){
      document.getElementById('idNivelGridFC_'+ iNivelAtual +'_select').innerHTML= "("+ fn.getColor(sDescritorAtual).name +")";
    }else{
      document.getElementById('idNivelGridFC_'+ iNivelAtual +'_select').innerHTML= "("+ sDescritorAtual +")";
    }

    for(var i=iNextNivel; i< aDestinosDescritores.length; i++){
      var sHtmlUL="<ul class=\"FCDescritorContent\">";
      if(i==iNextNivel){var sDisabled="FCDescritorGridActivated", oClickEvent="onClick=FCGrid$.fnResetOptions(this)";}else{var sDisabled = "FCDescritorGridDisabled", oClickEvent="";}
      if(aDestinosDescritores.length > 0){
        var sClassDescritor = fn.classDescriptor(aDestinosDescritores[i]); //define uma classe especifica para cada nivel de descritores
        var oSelectProductsList = fnSelectsProducts(aProductList, sDescritorAtual, iNivelAtual); //seleciona os produtos de acordo com o nivel selecionado

        if(aDestinosDescritores.length>1){
          var aItens = fn.eliminateDuplicates(fn.getDescriptorValueProducts(oSelectProductsList, aDestinosDescritores[i])); //remove valores duplicados [array de produtos, descritor ex. COR]
        }else{
          var aItens = fn.getDescriptorValueProducts(aProductList, aDestinosDescritores[i]);
        }

        for(var j=0; j < aItens.length;j++){
          var sDescriptorValueReset = aItens[j]; // ex. Cinza+AzulClaro|0066FF
          var oFlagEsgotado = fn.productAvailableFlag(null); // retorns 'htmlLabel': "", 'classLabel' : ""
          if(iNivelAtual==(aDestinosDescritores.length-2)){
            var oProductSelect = fnSelectsProducts(aProductList, sDescriptorValueReset, parseInt(iNivelAtual)+1);
            oFlagEsgotado = fn.productAvailableFlag(oProductSelect, iNivelAtual);
          }
          // imagem do produto
          var sDataImagesProd="";
          if((options.imageProduct).toUpperCase() == (aDestinosDescritores[i]).toUpperCase()){
            var descriptorImg = sDescriptorValueReset;
            sDataImagesProd = fn.srcProduct(i, descriptorImg, aProductList);
          }
          // cria element LI > SPAN / verifica se o subproduto esta disponivel [x] [!]
          sHtmlUL+="<li class=\""+ sDisabled +" "+ oFlagEsgotado.classLabel +"\" data-nivel=\""+ i +"\" "+ oClickEvent +">"
                 +  options.htmlFlagChecked
                 +  "<span class=\"FCDescritorGrid "+ sClassDescritor +"\" data-attr=\""+ sDescriptorValueReset +"\" "+ sDataImagesProd+">"
                 +     sDescriptorValueReset + oFlagEsgotado.htmlLabel
                 +  "</span>"
                 +"</li>";
        }
        sHtmlUL+="</ul>";
        if(options.textDescriptor[ aDestinosDescritores[i] ] == "" || options.textDescriptor[ aDestinosDescritores[i] ]===undefined){
          var sTitDescr="Selecione";
        }else{
          var sTitDescr=options.textDescriptor[ aDestinosDescritores[i] ]
        }

        var oElementExists = document.getElementById('idNivelGridFC_'+i);
        if(!oElementExists){
          var oNewElement = document.createElement("Div");
          oNewElement.className='FCBoxGrid';
          oNewElement.id="idNivelGridFC_"+i;
          oNewElement.innerHTML = "<div class=\"FCStepGrid\"><span class=\"FCStepGridNumber\">"+ parseInt(i+1) +"</span>"
                                +   "<span class=\"FCStepGridTitle\">"+ sTitDescr + "</span>"
                                + "</div>"+ sHtmlUL ;
          oPositionHtml.appendChild(oNewElement);
        }else{
          oElementExists.innerHTML= "<div class=\"FCStepGrid\">"
                                  +   "<span class=\"FCStepGridNumber\">"+ parseInt(i+1) +"</span>"
                                  +   "<span class=\"FCStepGridTitle\">"+ sTitDescr + "</span>"
                                  +   "<strong class=\"FCOptionSelected\" id='idNivelGridFC_"+parseInt(i)+"_select'></strong>"
                                  + "</div>"+ sHtmlUL;
        }
      }
    }
    //vefica se e o ultimo nivel de descritor
    if(iNivelAtual==(aDestinosDescritores.length-1)){
      var oSelectProductsList = fnSelectsProducts(aProductList, sDescritorAtual, iNivelAtual);
      var IDProdutoData=obj.getAttribute("data-id");
      if(IDProdutoData!= null){
        IDProdutoData=IDProdutoData;
      }else{
        var IDProduto = fn.getDescriptorValueProducts(oSelectProductsList, 'IDProduto');
        IDProdutoData=IDProduto[0];
      }
      fnExistsProduct(IDProdutoData, settings.descriptorsActive, settings.descriptorsPrevious, aProductList);
    }
    orderTamanhos();
  }
  //fnResetOptions:end

  //fnInitProductList:begin
  function fnInitProductList(aProductList){

    var sDataImagesProd="";
    settings.descriptorsActive=fn.setActiveDescriptors(aProductList, options.qtyDescriptors); //define os descritores existentes [array de produtos, quantidade de descritores]
    var aDestinosDescritores=settings.descriptorsActive;

    //trata produtos com apenas 1 subproduto e sem descritores
    if(aDestinosDescritores.length == 0 && aProductList.length == 1){
      fnInitProductOnlyOne(aProductList[0]);
    }
    
    if(!settings.descriptorsActive || settings.descriptorsActive.length == 0)return false; //se exite subprodutos com erro no cadastro (usencia de descritores)

    var oPositionHtml = document.getElementById( settings.idElementGrid );

    if(options.textGrid!=="" && oPositionHtml){
      var oNewElement=document.createElement("div");
      oNewElement.setAttribute("id","idTxtGridFC");
      oNewElement.setAttribute("class","FCTxtGrid");
      oNewElement.innerHTML=options.textGrid;
      oPositionHtml.parentNode.insertBefore(oNewElement, oPositionHtml.previousSibling);
    }

    for(var i=0; i< aDestinosDescritores.length; i++){
      var sBgColor="", sHtmlUL="<ul class=\"FCDescritorContent\">";
      if(i==0){var sDisabled="FCDescritorGridActivated", oClickEvent="onClick=FCGrid$.fnResetOptions(this)"}else{var sDisabled = "FCDescritorGridDisabled", oClickEvent=""}

      if(aDestinosDescritores.length>0)
      {
        var sClassDescritor=fn.classDescriptor(aDestinosDescritores[i]); //define um classe para cada descritor

        if(fn.isSingleDescriptor()){ //Tem apenas um descritor? Apenas um nivel de opcao
          var uniqueDescriptorsAll = []  /* armazena descritor de todos o subprotudo para depois vericar a exitencia de duplicidade */
          for(var j=0; j< aProductList.length;j++){
            var prd = JSON.parse(aProductList[j]);

            if((options.imageProduct).toUpperCase() == (aDestinosDescritores[i]).toUpperCase()){
              sDataImagesProd=" data-img-det="+ prd['imgDet'] +" data-img-amp="+ prd['imgAmp']; // Obtem a imagem do produto detalhe / ampliada
            }

            var results=[];
            results.push(JSON.stringify(prd));
            var oFlagEsgotado=fn.productAvailableFlag(results); // verifica se o subproduto esta disponivel [x] [!]
            //se for do descritor cor
            if((aDestinosDescritores[i]).toUpperCase() == 'COR'){
              if(options.colorImg){
                var sBgColor = "url("+ settings.pathColorsImg + fn.getColor(prd['cor']).name.replace("+","_") + options.colorImgFormat +") no-repeat #"+ fn.getColor(prd['cor']).rgb +"; background-size: 100% 100%;";
              }else{
                var sBgColor = "#" + fn.getColor(prd['cor']).rgb;
              }
              var sNameCor= options.colorName == false ? "&nbsp;" : fn.getColor(prd['cor']).name; //Exibe ou não o nome da cor
              sHtmlUL+="<li class=\""+ sDisabled +" "+ oFlagEsgotado.classLabel +"\" data-nivel=\""+i+"\" "+ oClickEvent +"\>"
                    +  options.htmlFlagChecked
                    +  "<span style=\"background:"+ sBgColor +"\" class=\"FCDescritorGrid "+ sClassDescritor +"\" data-attr=\""+ prd[aDestinosDescritores[i]] +"\""+ sDataImagesProd +"\ data-id=\""+ prd['IDProduto']+"\">"
                    +     sNameCor + oFlagEsgotado.htmlLabel
                    +  "</span>"
                    +"</li>";
            }
            /* não e descritor cor */
            else{
              sHtmlUL+="<li class=\""+ sDisabled +" "+ oFlagEsgotado.classLabel +"\" data-nivel=\""+ i +"\" "+ oClickEvent +">"
                    +  options.htmlFlagChecked
                    +  "<span style=\""+ sBgColor +"\" class=\"FCDescritorGrid "+ sClassDescritor +"\" data-attr=\""+ prd[aDestinosDescritores[i]] +"\""+ sDataImagesProd +" data-id=\""+ prd['IDProduto'] +"\">"
                    +    prd[aDestinosDescritores[i]] + oFlagEsgotado.htmlLabel
                    +  "</span>"
                    +"</li>";
            }
            uniqueDescriptorsAll.push(prd[aDestinosDescritores[i]]); /* adiciona o valor do descritor ao array */
          }
          /* verifica se tem descritores duplicados */
          var uniqueDescriptorsResume = fn.eliminateDuplicates(uniqueDescriptorsAll);
          if(uniqueDescriptorsAll.length !== uniqueDescriptorsResume.length)fn.consoleLogFC({'FC_Log_Grid_v1' : 'Subprodutos com descritores duplicados', 'dscr' : uniqueDescriptorsAll});
        }
        else /* Mais de um descritor ex. cor/ tamanho */
        {
          var aItens = fn.eliminateDuplicates(fn.getDescriptorValueProducts(aProductList, aDestinosDescritores[i])); // remove valores duplicados [array de produtos, descritor ex. COR]
          for(var j=0; j < aItens.length;j++){
            var sDescriptorValueInit = aItens[j]; // ex. Cinza+AzulClaro|0066FF
            if((options.imageProduct).toUpperCase() == (aDestinosDescritores[i]).toUpperCase()){
              sDataImagesProd=fn.srcProduct(i, sDescriptorValueInit, aProductList); // imagem do produto para o atributo data-img
            }

            if((aDestinosDescritores[i]).toUpperCase() == 'COR'){ /* se for atributo cor */
              if(options.colorImg){
                var sBgColor = "url("+ settings.pathColorsImg + fn.getColor( sDescriptorValueInit ).name.replace("+","_") + options.colorImgFormat +") no-repeat #"+ fn.getColor( sDescriptorValueInit ).rgb +"; background-size: 100% 100%;";
              }else{
                var sBgColor = "#"+ fn.getColor( sDescriptorValueInit ).rgb;
              }
              var sNameCor = options.colorName == false ? "&nbsp;" : fn.getColor(sDescriptorValueInit).name; // Exibe ou nao o nome da cor
              sHtmlUL+="<li class=\""+ sDisabled +"\" data-nivel=\""+i+"\" "+ oClickEvent +">"
                    +  options.htmlFlagChecked
                    +  "<span style=\"background:"+ sBgColor +"\" class=\"FCDescritorGrid "+ sClassDescritor +"\" data-attr=\""+ sDescriptorValueInit +"\" "+ sDataImagesProd +">"
                    +    sNameCor
                    +  "</span>"
                    +"</li>";
            }else{
              sHtmlUL+="<li class=\""+ sDisabled +"\" data-nivel=\""+i+"\" "+ oClickEvent +">"
                    +  options.htmlFlagChecked
                    +  "<span style=\""+ sBgColor +"\" class=\"FCDescritorGrid "+ sClassDescritor +"\" data-attr=\""+ sDescriptorValueInit +"\" "+ sDataImagesProd +">"
                    +    sDescriptorValueInit
                    +  "</span>"
                    +'</li>';
            }
          }
        }
        sHtmlUL+="</ul>"; //fechamento elemento UL

        var oNewDiv = document.createElement("Div");
        oNewDiv.className='FCBoxGrid FCNivelGrid_'+i;
        oNewDiv.id="idNivelGridFC_"+i;

        if(options.textDescriptor[ aDestinosDescritores[i] ] == "" || options.textDescriptor[ aDestinosDescritores[i] ]==undefined){
          var sTitDescr="Selecione";
        }else{
          var sTitDescr=options.textDescriptor[ aDestinosDescritores[i] ]
        }
        oNewDiv.innerHTML = "<div class=\"FCStepGrid\">"
                          +   "<span class=\"FCStepGridNumber\">"+ parseInt(i+1) +"</span>"
                          +   "<span class=\"FCStepGridTitle\">"+ sTitDescr + "</span>"
                          +   "<strong class=\"FCOptionSelected\" id='idNivelGridFC_"+i+"_select'></strong>"
                          + "</div>"+ sHtmlUL ;
        oPositionHtml.appendChild(oNewDiv);
      }
    }
    orderTamanhos();

/// ACABA AQUI UL COM DESCRITORES //


    // criar incMult
    if(options.incMultGrid){
      var oNewDiv=document.createElement("Div");
          oNewDiv.setAttribute('class', 'FCBoxGrid FCFCBoxGridIncMult');
      var oLabelIncMult=document.createElement("span");
          oLabelIncMult.setAttribute('class', 'FCStepGridTitle FCTitQtyInc');
          oLabelIncMult.innerHTML="Quantidade&nbsp;";
      var oInputIncMult=fn.creatInputIncMultQty();

      var oPassoBuy = document.createElement("span");
          oPassoBuy.setAttribute('class', 'FCStepGridNumber');
          oPassoBuy.innerHTML= settings.descriptorsActive.length+1;
          oNewDiv.appendChild(oPassoBuy);
          oNewDiv.appendChild(oLabelIncMult);
          oNewDiv.appendChild(oInputIncMult);
          oPositionHtml.appendChild(oNewDiv);
    }

	//botao comprar
    var oPositionBtn = document.getElementById('idButtonBuyFC');
    if(!oPositionBtn){
      var oDivButtonBuy = document.createElement("div");
          oDivButtonBuy.setAttribute('id', 'idButtonBuyFC');
          oDivButtonBuy.setAttribute('class', 'FCBoxGrid FCBoxGridBuy');

      var iStepBuy = options.incMultGrid == true ? 2 : 1;
      var oPassoBuy = document.createElement("span");
          oPassoBuy.setAttribute('class', 'FCStepGridNumber');
          oPassoBuy.innerHTML= settings.descriptorsActive.length + iStepBuy;
      oDivButtonBuy.appendChild(oPassoBuy);
      oPositionHtml.appendChild(oDivButtonBuy);
    }

    // selecione o primeiro subproduto automaticamente
    if(options.autoSelect){
      for(var i=0; i < aDestinosDescritores.length; i++){
        var oProd=document.querySelectorAll('li[data-nivel="'+i+'"]');
        if(oProd[0] !== null)fnResetOptions(oProd[0]);
      }
      if(fn.isSingleDescriptor())fn.getShippingView(true) //simulacao de frete
    }else{
      var oButton=fn.availableBuyProduct(null);
      var oPositionBtn = document.getElementById('idButtonBuyFC');
      if(oPositionBtn)oPositionBtn.appendChild(oButton);
      fn.getShippingView(false) // simulacao de frete
    }
  }
  //fnInitProductList:end

  //fnInitProductOnlyOne:begin
  function fnInitProductOnlyOne(aProductOnlyOne){
    var oPositionHtml = document.getElementById( settings.idElementGrid );
    var oProd = JSON.parse(aProductOnlyOne);
    var sParms= "IDProduto="+oProd.IDProduto;

    var fnBuildHtmlAdic=function(oProd){
      var sHtmlAdic="";
      for(var i=0; i < options.order.length;i++ ){
        if(oProd[options.order[i]]!==""){
          if(options.order[i].toUpperCase() == "COR"){
            var sNomeAdic=fn.getColor(oProd.cor).name + "<span class=\"AdicItemCor\" style=\"background:#"+ fn.getColor(oProd.cor).rgb +"\">&nbsp;</span>";
          }else{
            var sNomeAdic=oProd[options.order[i]];
          }
          sHtmlAdic+="<div class=\"FCGridAdicContent\"><span class=\"AdicNome\">"+ options.nameDescriptor[options.order[i]] +"</span><span class=\"AdicItem\">"+ sNomeAdic +"</span></div>";
        }
      }

      /* quantidade em estoque */
      if(options.stock){
        var iEstoqueDetail = parseInt(oProd.estoque), fPriceDetails = parseFloat(oProd.priceNum);
        sHtmlAdic+= "<div class=\"FCGridAdicContent zf-qty-estoque\">"+ fn.viewStock(iEstoqueDetail, fPriceDetails) +"</div>";
      }
      return sHtmlAdic;
    }

    var oNewDiv = document.createElement("Div");
          oNewDiv.className='FCBoxGrid FCResumeProduct';
          oNewDiv.id="idDetailProduct";
          oNewDiv.innerHTML= fnBuildHtmlAdic(oProd);
          oPositionHtml.appendChild(oNewDiv);

    if(options.incMultGrid){
      var oNewDiv=document.createElement("Div");
          oNewDiv.setAttribute('class', 'FCBoxGrid FCFCBoxGridIncMult');
      var oLabelIncMult=document.createElement("span");
          oLabelIncMult.setAttribute('class', 'FCTitQtyInc');
          oLabelIncMult.innerHTML="Quantidade&nbsp;";
      var oInputIncMult=fn.creatInputIncMultQty();
          oNewDiv.appendChild(oLabelIncMult);
          oNewDiv.appendChild(oInputIncMult);
          oPositionHtml.appendChild(oNewDiv);
    }

    fn.setAttrProduct(oProd); // define o produto selecionado e inclui na variável product
    var oButton = fn.availableBuyProduct(oProd, sParms); // verificar disponibilidade e cria o botao [comprar/ esgotado/ consulte-nos]
    var el=document.querySelectorAll('#idButtonBuyFC .FCBtnGrid');
    if(el.length>0)for(var i=0; i< el.length;i++){el[i].parentNode.removeChild(el[i]);} //remove os botoes ja existem no html

    var oPositionBtn = document.getElementById('idButtonBuyFC');
    if(!oPositionBtn){
      var oDivButtonBuy = document.createElement("div");
          oDivButtonBuy.setAttribute('id', 'idButtonBuyFC');
          oDivButtonBuy.setAttribute('class', 'FCBoxGrid FCBoxGridBuy FCBoxGridOnly');
      oPositionHtml.appendChild(oDivButtonBuy);
    }
    oPositionBtn = document.getElementById('idButtonBuyFC');
    oPositionBtn.appendChild(oButton);
  }
  //fnInitProductOnlyOne:end

  function fnMultipleZoom(imgDet,imgAmp,refresh){
    if(imgDet!=="" && imgAmp!== "") return fn.imgView(imgDet,imgAmp,refresh);
  }

  //inicia a funcao
  function init(id, aProductListGrid, aProductOnlyOneGrid){

    settings.idElementGrid = id; //set ID in DIV
    if(this.myOptions)options = fn.marge(options, this.myOptions); //altera as configuracoes

    aProductOnlyOne= fn.convertCharAT(aProductOnlyOneGrid);
    aProductList= fn.convertCharAT(aProductListGrid);

    if(typeof aProductListGrid[aProductListGrid.length-1] !== 'undefined'){
      fnInitProductList(aProductList); // se for subproduto
    }else{
      fnInitProductOnlyOne(aProductOnlyOneGrid);
    }
  }

  function fnExecTabDescriptors(){
    if(typeof aProductList[aProductList.length-1] == 'undefined'){ aProductList=aProductOnlyOne; }
    var aDados = ["IDProduto","codProd","cor","estoque","peso","priceOri","priceNum","adicional1","adicional2","adicional3","imgDet","imgAmp"];
    var oTable = document.createElement("table"); oTable.border="1";

    var TRnode = document.createElement("tr");
    for(var i=0; i< aDados.length; i++ ){ var THnode = document.createElement("th"); THnode.style.border="1px solid #e4e4e4"; THnode.style.padding="3px 8px"; THnode.innerHTML = [aDados[i]]; TRnode.appendChild(THnode)}
    oTable.appendChild(TRnode);

    for(var i=0; i < aProductList.length;i++){
      var TRnode = document.createElement("tr");
      var prd = JSON.parse(aProductList[i]);
      for(var j=0; j< aDados.length; j++ ){ var TDnode = document.createElement("td"); TDnode.style.border="1px solid #e4e4e4"; TDnode.style.padding="3px 8px"; TDnode.innerHTML = prd[aDados[j]]; TRnode.appendChild(TDnode);}
      oTable.appendChild(TRnode);
    }
    var oNewElement=document.createElement("div"); oNewElement.setAttribute("id","idTabDescritoresGridFC"); oNewElement.setAttribute("class","FCTabDescritoresGrid"); oNewElement.appendChild(oTable);
    document.body.appendChild(oNewElement);
  }

  return{
    init:init,
    myOptions:myOptions,
    fnResetOptions:fnResetOptions,
    fnMultipleZoom:fnMultipleZoom,
    fnExecTabDescriptors:fnExecTabDescriptors
  }
}();
//FastCommerce Grid [08.07.2015] v1


/* ZipCode Grid FC - CEP - Begin */
/* Retirado a pedido do cliente */
/* ZipCode Grid FC - CEP - End */


/* Funcao Hover Cor Detalhe do Produo */
function srcHoverImg(imgDet, sNomeCor, obj) {
  if (imgDet && $(window).width() < 415) {
    var oToolTip = document.createElement("div");
    oToolTip.setAttribute("data-bool", "true");
    oToolTip.className = "hoverConteiner";
    oToolTip.innerHTML = "<img src=\"" + imgDet + "\" ><span>" + sNomeCor + "<span>";
    obj.appendChild(oToolTip);
  }
}
function srcHoverOutImg(imgDet, obj) {
  if (imgDet && $(window).width() < 415) {
    var elem = obj.querySelector(".hoverConteiner");
    var getDataBool = elem.getAttribute("data-bool");
    if (getDataBool === "true") {
      obj.removeChild(elem);
      getDataBool = "false";
    }
  }
}


/* Lightbox Detalhe Frete Gratis */
function lightbox_open1() {
  document.getElementById('light1').style.display = 'block';
  document.getElementById('fade1').style.display = 'block';
}
function lightbox_close1() {
  document.getElementById('light1').style.display = 'none';
  document.getElementById('fade1').style.display = 'none';
} 

/* Lightbox Detalhe Guia Medidas1 */
function lightbox_open2() {
  document.getElementById('light2').style.display = 'block';
  document.getElementById('fade2').style.display = 'block';
}
function lightbox_close2() {
  document.getElementById('light2').style.display = 'none';
  document.getElementById('fade2').style.display = 'none';
} 

/* Lightbox Detalhe Guia Medidas2 */
function lightbox_open3() {
  document.getElementById('light3').style.display = 'block';
  document.getElementById('fade3').style.display = 'block';
  setTimeout(function() { $("#light3")[0].scrollIntoView(true); window.scrollBy(0, -10);}, 301);
}
function lightbox_close3() { 
  document.getElementById('light3').style.display = 'none';
  document.getElementById('fade3').style.display = 'none';
}

/* Lightbox Pre-venda */
function lightbox_open4() {
  document.getElementById('light4').style.display = 'block';
  document.getElementById('fade4').style.display = 'block';
}
function lightbox_close4() {
  document.getElementById('light4').style.display = 'none';
  document.getElementById('fade4').style.display = 'none';
}

//ordenacao tamanhos
function orderTamanhos(){
  var ordem = ["PREMATURO","RN","PP","P","M","G","GG","EG","0-3M","0-4M","0-5M","0-6M","3-6M","5-8M","6M","6-9M","6-12M","9-12M","0-15","1","2","3","4","6","8","10","13-15","14-15","15-16","15-17","15-18","16-19","16-20","18-22","19-22","20-23","22-25","24-27","13","14","15","16","17","18","17-18","19","20","21","19-20","20-21","21-22","22","23","22-23","24","23-24","25","24-25","25-26","26","27","27-28","28","29","29-30","30","31","31-32","32","P-Adulto","M-Adulto","G-Adulto","GG-Adulto","PREMATUROE","RNE","PPE","PE","ME","GE","GGE","EGE","0-3ME","0-4ME","0-5ME","0-6ME","3-6ME","5-8ME","6ME","6-9ME","6-12ME","9-12ME","0-15E","1E","2E","3E","4E","6E","8E","10E","13-15E","14-15E","15-16E","15-17E","15-18E","16-19E","16-20E","18-22E","19-22E","20-23E","22-25E","24-27E","13E","14E","15E","16E","17E","18E","17-18E","19E","20E","21E","19-20E","20-21E","21-22E","22E","23E","22-23E","24E","23-24E","25E","24-25E","25-26E","26E","27E","27-28E","28E","29E","29-30E","30E","31E","31-32E","32E","P-AdultoE","M-AdultoE","G-AdultoE","GG-AdultoE"];
  var tamanhos = Array.prototype.slice.call(document.querySelectorAll('.FCAdicional1Grid'));
  if(tamanhos[0]){
    tamanhos[0].parentElement.parentElement.setAttribute('style','display:flex;');
    tamanhos.forEach(function(item){
      var placeOrder = ordem.indexOf(item.textContent);
      item.parentNode.style.order = placeOrder;
    })    
  }
}

function tem_erro_vale_presente()
{
  if($("#id_de").val() == "" || $("#id_para").val() == "")
  {
    return true;
  }
  else if($("#id_emailpresenteado")[0].checked == false && $("#id_whatspresenteado")[0].checked == false && $("#id_meuemail")[0].checked == false)
  {
    return true;
  }
  else if($("#id_emailpresenteado")[0].checked == true && validacaoEmail() == false)
  {
    return true;
  }
  else if($("#id_emailpresenteado")[0].checked == true && validacaoEmail() == false)
  {
    return true;
  }
  else if($("#id_whatspresenteado")[0].checked == true && validacaoWhats() == false)
  {
    return true;
  }
}

function validacaoEmail() {
  var usuario = document.getElementById("input_email_presenteado").value.substring(0, document.getElementById("input_email_presenteado").value.indexOf("@"));
  var dominio = document.getElementById("input_email_presenteado").value.substring(document.getElementById("input_email_presenteado").value.indexOf("@")+ 1, document.getElementById("input_email_presenteado").value.length);

  if ((usuario.length >=1) &&
      (dominio.length >=3) &&
      (usuario.search("@")==-1) &&
      (dominio.search("@")==-1) &&
      (usuario.search(" ")==-1) &&
      (dominio.search(" ")==-1) &&
      (dominio.search(".")!=-1) &&
      (dominio.indexOf(".") >=1)&&
      (dominio.lastIndexOf(".") < dominio.length - 1)) {
    return true;
  }
  else{
    return false;
  }
}

function validacaoWhats() {
 
  	var num_celular = $("#input_whats_presenteado").val();
    num_celular = num_celular.replace(/ /g,'');
    num_celular = num_celular.replace("(", "");
    num_celular = num_celular.replace("(", "");
    num_celular = num_celular.replace(")", "");
    num_celular = num_celular.replace(")", "");
    num_celular = num_celular.replace("-", "");
    num_celular = num_celular.replace("-", "");
    num_celular = num_celular.replace("-", "");
    num_celular = num_celular.replace("-", "");
    num_celular = num_celular.replace("+", "");
    num_celular = num_celular.replace("+", "");
    num_celular = num_celular.replace("+", "");
    num_celular = num_celular.replace("+", "");
  
  	if(num_celular.length < 11)
    {
      return false;
    }
  	else
    {
      return true;
    }
  
}