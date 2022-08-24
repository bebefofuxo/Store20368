/* LojaLibAsync.js */
/* Function : zFast @2018 Lingerie.com.br */
var zF$ = (function(){
	function fnGetID(id){
    return document.getElementById(id) ? document.getElementById(id) : null ;
  }
	var iPL=0;

	/* Name Products - NAO PODE APAGAR */
	function fnFormatNameProdZF(el, limit){
	  /*
	  function : limita q quantidade de palavras de acordo com o quantidade de letras no nome do produto
	  */
	  var name = el.textContent.replace(/\'/g,"\'").replace(/\"/g,"\""), outWords="", inWords=name.split(" ");
	  if(typeof name !== "undefined" && inWords.length > 0){
	    for(var i=0; i<inWords.length;i++){
	      var cont="", cont=outWords+inWords[i];
	      if(cont.length<=limit){outWords+=inWords[i]+" "}else{outWords+="...";break}
	    }
	  }
	  return outWords;
	}

	function fnProdName( dataAttr, limitLetter ){
	  var oElementsList = document.querySelectorAll( "*["+ dataAttr +"]" );
	  if(oElementsList && typeof oElementsList ===  "object" && oElementsList.length > 0 ){
	    for(var i=0; i < oElementsList.length ;i++){
	      var sNameProdData = typeof oElementsList[i].getAttribute( dataAttr ) !== 'undefined' ? true : false;
	      if(sNameProdData){
	        oElementsList[i].textContent = fnFormatNameProdZF(oElementsList[i], limitLetter);
	        oElementsList[i].removeAttribute( dataAttr );
	      }
	    }
	  }else{
	    return null;
	  }
	}

    /* Grade Imagens - NAO PODE APAGAR */
	function fnMagicZoomShow(ImagemProdDet, ImagemProdAmp, CodVideoProd){

		var oElemenMagicZoom = document.getElementById("idProdDetPhotoZF");
		if(!oElemenMagicZoom) {return false;}

	  var imgDetAll = oElemenMagicZoom.getAttribute("data-prod-img-det"), imgAmpAll = oElemenMagicZoom.getAttribute("data-prod-img-amp"), sVideo = oElemenMagicZoom.getAttribute("data-prod-codvideo"),
	  			novoArray = imgDetAll.split(','), novoArrayAmp = imgAmpAll.split(','), CountImgDet=novoArray.length, CountImgAmp=novoArrayAmp.length;

	  if (imgDetAll=="" || imgAmpAll==""){
	    return false;
	  }
	  else{
	    if (CountImgDet==CountImgAmp){
	      var FC_MaxImages=CountImgDet-1;
	      MostraZoomImgFC();
	    }
	    else{
	      var FC_MaxImages=0;
	      MostraZoomImgFC();
	    }
	  }

      /* Grade Imagens - NAO PODE APAGAR */
	  function MostraZoomImgFC(){
	    var sMin="", sZoom="", sNameProd = document.getElementById("idNameProdDetZF") ? document.getElementById("idNameProdDetZF").textContent: "";
	    sNameProd = sNameProd.replace(/\"/g,'\"').replace(/\'/g,"\'");

	    var sOnclickScrollTop = "jQuery(\'body,html\').animate({ scrollTop: 0 },500);";

	    for (var i=0;i<=FC_MaxImages;i++)
	    {
	      if(i==0)
	      {
	        var imgDetMini=novoArray[i];
	        var imgAmpMini=novoArrayAmp[i];

	        sZoom ="<div class='zFZoomContent'><div class='ZoomerDIV'><a href="+imgAmpMini+" title='"+ sNameProd +"' rel='' class=MagicZoom data-options='zoomWidth:350px; zoomHeight:350px; expandZoomMode: off' id=Zoomer><img src="+ imgDetMini +"></a></div></div>";
	        sMin ="<div><a class='foto' href="+imgAmpMini+"  rel='zoom-id:Zoomer; zoom-window-effect: false;zoom-width:400px; zoom-height:400px;' rev="+ imgDetMini +" onclick=\""+ sOnclickScrollTop +"\"><img src="+ imgDetMini +" class=ZoomIMG></a></div>";
	      }
	      else{
	        imgDetMini= FC$.PathPrd+novoArray[i];
	        imgAmpMini= FC$.PathPrd+novoArrayAmp[i];
	        sMin+="<div><a class='foto' href="+imgAmpMini+" rel='zoom-id:Zoomer;' rev="+ imgDetMini +" onclick=\""+ sOnclickScrollTop +"\"><img src="+ imgDetMini +" class=ZoomIMG></a></div>";
	      }
	    }

	    var oZoomTarget = document.getElementById("idProdDetPhotoZF");
	    oZoomTarget.innerHTML = "";
	    var oDiv = document.createElement("div");
	        oDiv.setAttribute("class", "boxImage");
	        oDiv.innerHTML = sZoom;

	    oZoomTarget.appendChild(oDiv);
	    var oDiv = document.createElement("div");
	        oDiv.setAttribute("class", "zFZoomThumbs");
	        oDiv.innerHTML = sMin;
	    oZoomTarget.appendChild(oDiv);

	  	// Video YouTube - NAO PODE APAGAR 
		  if (sVideo != ""){
		    var a = document.createElement("a");
		        a.setAttribute("class", "video");
		        a.style.outline = "0px none";
		        a.display = "inline-block";
		        a.innerHTML = "<img class='ZoomIMG' src='"+FC$.PathImg+"ic_video.svg'>";

		        a.addEventListener("click", function(event){
		        	event.preventDefault();
		          if(document.querySelector("#iframeVideoZoom") == null) {
		            var i = document.createElement("iframe");
		                i.setAttribute("id", "iframeVideoZoom");
		                i.src = "https://www.youtube.com/embed/"+ sVideo;
		                i.setAttribute("frameborder", "0");
		                i.setAttribute("allowfullscreen", "");
		            var oDiv = document.querySelector(".zFZoomContent");
		                oDiv.appendChild(i);
		            document.querySelector(".ZoomerDIV").style.display = "none";
		          }
		          jQuery('body,html').animate({ scrollTop: 0 },500);
		        });
		    document.querySelector("div.zFZoomThumbs").appendChild(a);
		  }

		  var aThumbs = document.querySelectorAll("div.zFZoomThumbs .foto");
		  if(aThumbs.length > 0){
		    for(var i=0; i < aThumbs.length; i++){
		      aThumbs[i].addEventListener("click", function(){
		        if(document.querySelector("#iframeVideoZoom") != null){
		          jQuery("#iframeVideoZoom").remove();
		          document.querySelector(".ZoomerDIV").style.display = "block";
		        }
		      });
		    }
		  }
		  try {
			  MagicZoom.start();
			}
			catch(err) {
			  console.log("err zoom ", err.message );
			}

		}
	}

	function fnExecAllFuncProducts(){
	/* ProdLista - order prod list */
    var eOrderList = document.getElementById("idSelectOrderZF");
    if(eOrderList)eOrderList.innerHTML = zF$.fnProdListSelectOrder();

    /* name, price and sale */
    zF$.fnProdName("data-prod-name", 70);
    zF$.fnMagicZoomShow(); /* / GRADE IMAGENS / */
  };

  // Ordenacao - NAO PODE APAGAR POR ENQUANTO 
  function fnProdListSelectOrder(){
    var selectTypeProd, aList = ["Ordenar por", "Padrão", "Lançamentos", "Destaques", "Nomes das categorias", "Nomes dos produtos", "Avaliações dos clientes", "Promoções", "Preços menores", "Preços maiores"];
    selectTypeProd = "<select id=OrderProd onchange=zF$.fnProdListNewOrder(this.value)>";
    for(var i=0; i < aList.length; i++){
      selectTypeProd += "<option value="+ (i-1) +">"+ aList[i] +"</option>";
    }
    selectTypeProd += "</select>";
    return selectTypeProd;
  }

  //Ordenacao - NAO PODE APAGAR POR ENQUANTO
  function fnProdListNewOrder(iOrder){
    var sPag=document.location.href.toUpperCase(), sConcat, sCharSep;
    if(sPag.indexOf("/PROD,")==-1){sConcat="&";sCharSep="=";} else {sConcat=",";sCharSep=",";}
    var oOrder=document.getElementById('OrderProd');
    var posOrder=sPag.indexOf("ORDER"+sCharSep);
    if(posOrder!=-1){
      var iOrderCurrent=sPag.substr(posOrder+6,1);
      if(!isNaN(iOrderCurrent))if(iOrderCurrent>=0){
        var i=0;
        while(i<oOrder.length && oOrder.options[i].value!=iOrderCurrent)i++;
        if(i<oOrder.length)oOrder.selectedIndex=i;
      }
    }
    var iOrder=iOrder;
    if(iOrder>=0){
      if(posOrder!=-1){ //encontrou order, substitui
        var sLoc=document.location.href.replace(new RegExp('order'+sCharSep+iOrderCurrent),'order'+sCharSep+iOrder);
      }
      else{ //se não encontrar
        if(sPag.indexOf("IDLOJA")>0){  //insere via subst idloja com order depois
          var sLoc=document.location.href.replace(new RegExp('idloja'+sCharSep+FC$.IDLoja,'gi'),'idloja'+sCharSep+FC$.IDLoja+sConcat+'order'+sCharSep+iOrder);
        }
        else{ //não tem idloja
          if(sPag.indexOf("?")>0){  //insere via subst idloja com order depois
            var sLoc=document.location.href+sConcat+'order'+sCharSep+iOrder;
          }
          else{
            var sLoc=document.location.href+'?order='+iOrder;
          }
        }
      }
      document.location.href=sLoc;
    }
  }


	/* exports */
	return{
		fnFormatNameProdZF:fnFormatNameProdZF,
		fnProdName:fnProdName,
		fnMagicZoomShow:fnMagicZoomShow,
		fnExecAllFuncProducts:fnExecAllFuncProducts,
		fnProdListSelectOrder:fnProdListSelectOrder,
		fnProdListNewOrder:fnProdListNewOrder
	}

/* end zF$ */
})();


/* call  function's, function anonymous */
(function(){

	/* EstiloProduto - name, price and sale */
  zF$.fnProdName("data-prod-name", 70);
	if(FC$.Page=="Products"){
		zF$.fnExecAllFuncProducts(); /* exec all function products*/
	}


})();

