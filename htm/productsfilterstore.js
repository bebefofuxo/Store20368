"use strict";

var StoreProductsFilter$=(function(){
  var idProd=0,aProds=[],customFile="",sty=0,cat=0,text="",pp=0,sale=false,rel=false,order=0,sNR=false,any=false,adv=false,priceF=0,priceT=0,a1=null,a2=null,a3=null;
  var aAFil={};
  var UA=false;
  var oFilOut=null;
  var catPath="";
  var sSearchFil=""; /*ids dos filtros 111+222+333*/
  var sTextFil=""; /*texto dos filtros*/
  var oVarConfig=null;

  /*par�metros de configura��o*/
  var iMaxItems=5;  /*acima desta quantidade de itens de filtros, � exibida a caixa de busca dentro dos filtros*/
  var iMaxSearch=20; /*tamanho m�ximo de caracteres para a busca de um filtro*/
  var bExibeCats=true;  /*indica se exibe categorias */
  var bExibeAdics=true;  /*indica se exibe adicionais (descritores especiais)*/
  var bIncludeCSS=true;  /*indica se inclui css padr�o*/

  var IdiomaLoja=FC$.Language;

  var aXYZ=[];
  aXYZ[0]=["Filtre por","Filter by","Filtrar por","Filtre por","products-filter-by"];
  aXYZ[1]=["Filtros atuais","Filtering by","Filtrado por","Filtros atuais","products-filter-filtering-by"];
  aXYZ[2]=["Remover todos os filtros","Remove all filters","Eliminar todo los filtros","Remover todos os filtros","products-filter-remove-all"];
  aXYZ[3]=["Mais op��es de busca","More search options","M�s opciones de b�squeda","Mais op��es da busca","products-filter-more-options"];
  aXYZ[4]=["Buscar","Search","Buscar","Buscar","products-filter-search"];
  aXYZ[5]=["n�o encontrado com o termo","not found with the term","no encontrado con el t�rmino","n�o encontrado com o termo","products-filter-not-found"];
  aXYZ[6]=["Departamento","Department","Departamento","Departamento","products-filter-department"];
  aXYZ[7]=["Filtre seus resultados","Filter your results","Filtrar sus resultados","Filtre os seus resultados","products-filter-your-results"];
  aXYZ[8]=["Termo","Term","B�squeda","Termo","products-filter-term"];
  aXYZ[9]=["Promo��es","On sale","En oferta","Promo��es","products-filter-on-sale"];
  aXYZ[10]=["Lan�amentos","New Releases","Novedades","Lan�amentos","products-filter-new-releases"];
  aXYZ[11]=["de","min.","de","de","products-filter-price-min"];
  aXYZ[12]=["at�","max.","hasta","at�","products-filter-price-max"];
  aXYZ[13]=["Sim","Yes","S�","Sim","products-filter-yes"];
  aXYZ[14]=["Remover este filtro","Remove this filter","Quitar este filtro","Remover este filtro","products-filter-remove-this-filter"];
  aXYZ[15]=["Alterar termo de busca","Change the search term","Cambiar el t�rmino de b�squeda","Alterar o termo da busca","products-filter-change-search-term"];
  aXYZ[16]=["Buscar por este termo","Search for this term","B�squeda de este t�rmino","Buscar por este termo","products-filter-search-for-this-term"];
  aXYZ[17]=["Cancelar altera��o de termo de busca","Cancel search term change","Cancelar cambio del t�rmino de b�squeda","Cancelar a altera��o do termo da busca","products-filter-cancel-search-term-change"];
  FCLib$.processLanguageResource(aXYZ);

  function fnInit(){
    fnMain();
  }

  /*########## FUN��O PRINCIPAL PARA MOSTRAR OS FILTROS, CATEGORIAS, ADICIONAIS ##########*/
  function fnMain(){

    oFilOut=FCLib$.GetID("ProductsFilterFC");
    if(oFilOut==null){ /*se n�o encontrou nenhum elemento com o id ProductsFilterFC, tenta criar uma div com o id ProductsFilterFC dentro da div que tem a classe left-bar no modelo de loja*/
      var oFilNewOut=document.getElementsByClassName("left-bar")[0];
      if(oFilNewOut){
        oFilNewOut=oFilNewOut.getElementsByTagName("h2")[0];
        if(oFilNewOut){
          var oDiv=document.createElement("div");
          oDiv.id="ProductsFilterFC";
          oFilNewOut.parentNode.insertBefore(oDiv,oFilNewOut);
          oFilOut=FCLib$.GetID("ProductsFilterFC");
        }     
      }
    }
    else{
      oVarConfig=oFilOut.getAttribute("data-max-items"); /*atributo da div ProductsFilterFC*/
      if(oVarConfig!=null){
        oVarConfig=parseInt(oVarConfig,10);
        if(!isNaN(oVarConfig))iMaxItems=oVarConfig;
      }
      oVarConfig=null;
      oVarConfig=oFilOut.getAttribute("data-exibe-cats"); /*atributo da div ProductsFilterFC*/
      if(oVarConfig!=null)bExibeCats=JSON.parse(oVarConfig);
      oVarConfig=null;
      oVarConfig=oFilOut.getAttribute("data-exibe-adics"); /*atributo da div ProductsFilterFC*/
      if(oVarConfig!=null)bExibeAdics=JSON.parse(oVarConfig);
      oVarConfig=null;
      oVarConfig=oFilOut.getAttribute("data-include-css"); /*atributo da div ProductsFilterFC*/
      if(oVarConfig!=null)bIncludeCSS=JSON.parse(oVarConfig);
    }
    
    if(typeof(FCLib$.pQuery)=="object" && FCLib$.pQuery!=null && oFilOut){

      if(bIncludeCSS)fnIncludeCSS();

      /* Par�metros da busca atual*/
      var oPar=FCLib$.pQuery.params;
      idProd=oPar.idProd;
      aProds=oPar.aProds;
      customFile=oPar.customFile;
      sty=oPar.sty;
      cat=oPar.cat;
      text=oPar.text;
      pp=oPar.pp;
      sale=oPar.sale;
      rel=oPar.rel;
      order=oPar.order;
      sNR=oPar.sNR;
      any=oPar.any;
      adv=oPar.adv;
      priceF=oPar.priceF;
      priceT=oPar.priceT;
      a1=oPar.a1;
      a2=oPar.a2;
      a3=oPar.a3;

      UA=FCLib$.pQuery.pURL.UA;
      catPath=FCLib$.pQuery.pURL.catPath;
      var sFiltrandoPor=""

      /* Insere em aAFil os ids dos itens dos filtros que est�o sendo usados nesta busca*/
      var oFil=oPar.fil;
      if(typeof(oFil)=="object"){
        for(var i in oFil){
          if(sSearchFil!=""){sSearchFil+="+";}
          sSearchFil+=oFil[i].id;
          aAFil[oFil[i].id]=true;
          if(sTextFil!=""){sTextFil+="+";}
          sTextFil+=oFil[i].value;
          sFiltrandoPor+="<li>"+ oFil[i].name +": <span class=SearchItem>"+ oFil[i].value +"</span> <img src='/images/x.gif' onclick='StoreProductsFilter$.fnRemoveFilter("+oFil[i].id+",true)' onmouseover='this.src=\"/images/xon.gif\"' onmouseout='this.src=\"/images/x.gif\"' title='"+ aXYZ[14][IdiomaLoja] +"'></li>";
        }
      }

      /*########## EXIBE FILTROS DISPON�VEIS ##########*/
      var opFil=FCLib$.pQuery.pFil;
      var sHTML="";
      if(typeof(opFil)=="object"){
        for(var i in opFil){
          var oFiltro=opFil[i];
          var oItemFil=oFiltro.items;
          if(typeof(oItemFil)=="object" && (opFil[i].show || opFil[i].show==undefined)){
            var sLiChecked=""
            var sLiUnChecked=""
            var sLi="";
            var sSearch=""
            var iQtdFound=0;
            var sChecked="";
            for(var z in oItemFil){
              var idItem=oItemFil[z].id;
              var sCont="";
              var Color=oItemFil[z].color;
              var Image=oItemFil[z].image;
              if(Image!="")sCont="<img onError='MostraImgOnErrorShim(this)' src='"+ FC$.PathPrd + Image +"' class=ImageFil>";
              else if(Color!="")sCont="<span style='background-color:"+ Color +";' class=ColorFil></span>";
              if(aAFil[idItem])sChecked=" checked"; else sChecked="";
              sLi="<li><input type=checkbox id=fil"+ idItem +" name=filters onclick='StoreProductsFilter$.fnCreateEvent(\"Filter\",\"Filtering by filter "+ oFiltro.name +"\",\""+ fnCleanValue(oItemFil[z].value) +"\");StoreProductsFilter$.fnChangeFilter();' value='"+ idItem +"'"+ sChecked +"><label for=fil"+ idItem +">"+ sCont + oItemFil[z].value + (oItemFil[z].res>0?" ("+ oItemFil[z].res +")":"") +"</label></li>";
              iQtdFound++;
              if(sChecked!=""){sLiChecked+=sLi;}
              else{sLiUnChecked+=sLi;}
            }
            if(iQtdFound>0){
              if(iQtdFound>iMaxItems)sSearch+="<li class='FilInputSearch FilInfo"+ i +"'><input maxlength="+ iMaxSearch +" class=SearchFil placeholder='"+ aXYZ[4][IdiomaLoja] +" "+ oFiltro.name +"' onkeyup='StoreProductsFilter$.fnSearchFil(this.value,"+ i +");' type=text></li>"
              sHTML+="<li class='FilName Fil"+ i +"' onclick='StoreProductsFilter$.fnHideFil("+i+")'><span id='FilName"+i+"' class='SetaBaixo'>"+ aXYZ[0][IdiomaLoja] +" "+ oFiltro.name +"</span></li>"+ sSearch +"<li class='FilItems FilInfo"+ i +"'><ul id=FilItemsList"+ i +" class=FilItemsList>"+ sLiChecked + sLiUnChecked +"</ul></li>";
            }
          }                      
        }       
        if(sHTML!="")sHTML="<ul class=FilSearch>"+ sHTML +"</ul>";
      }

      /*########## EXIBE CATEGORIAS ##########*/
      if(bExibeCats){
        var opCat=FCLib$.pQuery.pCat;
        var sHTMLCat="";
        if(typeof(opCat)=="object"){
          if(opCat.length>1){
            sHTMLCat+="<ul class=FilSearch>";
            var oCat=opCat;
            sHTMLCat+="<li class='FilName Cat' onclick='StoreProductsFilter$.fnHideFil(\"Cat\")'><span id='FilNameCat' class='SetaBaixo'>"+ aXYZ[0][IdiomaLoja] +" "+ aXYZ[6][IdiomaLoja] +"</span></li>"     
            var sLiChecked=""
            var sLiUnChecked=""
            var sLi="";
            var sSearch=""
            var sChecked="";
            for(var y in oCat){
              var idCat=oCat[y].id;
              if(idCat==cat.id)sChecked=" checked"; else sChecked="";
              sLi="<li><input type=radio id=Cat"+ idCat +" name=CatFil onclick='StoreProductsFilter$.fnCreateEvent(\"Filter\",\"Filtering by category\",\""+ fnCleanValue(oCat[y].name) +"\");StoreProductsFilter$.fnChangeCat(\""+ oCat[y].url +"\","+ idCat +");' value='"+ idCat +"'"+ sChecked +"><label for=Cat"+ idCat +">"+ oCat[y].name +" ("+ oCat[y].res +")</label></li>";
              if(sChecked!="")sLiChecked+=sLi; else sLiUnChecked+=sLi;
            }
            if(y>iMaxItems)sSearch+="<li class='FilInputSearch FilInfoCat'><input maxlength="+ iMaxSearch +" class=SearchFil placeholder='"+ aXYZ[4][IdiomaLoja] +" "+ aXYZ[6][IdiomaLoja] +"' onkeyup='StoreProductsFilter$.fnSearchCat(this.value);' type=text></li>"
            sHTMLCat+=sSearch+"<li class='FilItems FilInfoCat'><ul id=CatItemsList class=FilItemsList>"+sLiChecked+sLiUnChecked+"</ul></li>";
            sHTMLCat+="</ul>";
            sHTML=sHTMLCat+sHTML;
          }
        }
      }

      /*########## EXIBE FILTROS DE ADICIONAIS DISPON�VEIS (DESCRITORES ESPECIAIS DA LOJA) ##########*/
      if(bExibeAdics){
        for (var i=1;i<4;i++){
          var oA={};
          var sHTMLAdic="";
          oA[i]=eval("FCLib$.pQuery.pA"+i);
          if(typeof(oA[i])=="object"){
            var oAdic=oA[i];
            var oItemAdic=oAdic.items;
            if(typeof(oItemAdic)=="object"){
              var sLiChecked=""
              var sLiUnChecked=""
              var sLi="";
              var sSearch=""
              var iQtdFound=0;
              var sChecked="";
              for(var z in oItemAdic){
                var idItem=oItemAdic[z].id;
                if(idItem==eval("a"+i+".id"))sChecked=" checked"; else sChecked="";
                sLi="<li><input type=radio id=Adic"+ idItem +" name=Adic"+i+" onclick='StoreProductsFilter$.fnCreateEvent(\"Filter\",\"Filtering by descriptor "+ oAdic.name +"\",\""+ fnCleanValue(oItemAdic[z].value) +"\");StoreProductsFilter$.fnChangeAdic("+i+",this.value);' value='"+ idItem +"'"+ sChecked +"><label for=Adic"+ idItem +">"+ oItemAdic[z].value + (oItemAdic[z].res>0?" ("+ oItemAdic[z].res +")":"") +"</label></li>";
                iQtdFound++;
                if(sChecked!=""){sLiChecked+=sLi;}
                else{sLiUnChecked+=sLi;}
              }
              if(iQtdFound>0){
                if(iQtdFound>iMaxItems)sSearch+="<li class='FilInputSearch FilInfoAdic"+ i +"'><input maxlength="+ iMaxSearch +" class=SearchFil placeholder='"+ aXYZ[4][IdiomaLoja] +" "+ oAdic.name +"' onkeyup='StoreProductsFilter$.fnSearchAdic(this.value,"+ i +");' type=text></li>"
                sHTMLAdic+="<li class='FilName Adic"+ i +"' onclick='StoreProductsFilter$.fnHideFil(\"Adic"+i+"\")'><span id='FilNameAdic"+i+"' class='SetaBaixo'>"+ aXYZ[0][IdiomaLoja] +" "+ oAdic.name +"</span></li>"+ sSearch +"<li class='FilItems FilInfoAdic"+ i +"'><ul id=AdicItemsList"+ i +" class=FilItemsList>"+ sLiChecked + sLiUnChecked +"</ul></li>";
              }
            }
            if(sHTMLAdic!="")sHTML+="<ul class=FilSearch>"+ sHTMLAdic +"</ul>";
          }
        }
      }


      if(sHTML!="")sHTML="<div class=DivFiltrarPor><span class=Label>"+ aXYZ[7][IdiomaLoja] +":</span>"+sHTML+"</div>";

      /*########## FILTROS ATUAIS DA BUSCA ##########*/
      var sOutrosFiltros="";
      var sFiltroTxt="";
      if(cat.value!="")sOutrosFiltros+="<li>"+ aXYZ[6][IdiomaLoja] +": <span class=SearchItem>"+cat.value+"</span> <img src='/images/x.gif' onclick='StoreProductsFilter$.fnRemoveFilter(0,false)' onmouseover='this.src=\"/images/xon.gif\"' onmouseout='this.src=\"/images/x.gif\"' title='"+ aXYZ[14][IdiomaLoja] +"'></li>";
      if(sale)sOutrosFiltros+="<li>"+ aXYZ[9][IdiomaLoja] +": <span class=SearchItem>"+ aXYZ[13][IdiomaLoja] +"</span> <img src='/images/x.gif' onclick='StoreProductsFilter$.fnRemoveFilter(5,false)' onmouseover='this.src=\"/images/xon.gif\"' onmouseout='this.src=\"/images/x.gif\"' title='"+ aXYZ[14][IdiomaLoja] +"'></li>";
      if(rel)sOutrosFiltros+="<li>"+ aXYZ[10][IdiomaLoja] +": <span class=SearchItem>"+ aXYZ[13][IdiomaLoja] +"</span> <img src='/images/x.gif' onclick='StoreProductsFilter$.fnRemoveFilter(4,false)' onmouseover='this.src=\"/images/xon.gif\"' onmouseout='this.src=\"/images/x.gif\"' title='"+ aXYZ[14][IdiomaLoja] +"'></li>";
      if(priceF>0)sOutrosFiltros+="<li>"+ aXYZ[11][IdiomaLoja] +": <span class=SearchItem>"+ FormatPrice(priceF,FC$.Currency) +"</span> <img src='/images/x.gif' onclick='StoreProductsFilter$.fnRemoveFilter(6,false)' onmouseover='this.src=\"/images/xon.gif\"' onmouseout='this.src=\"/images/x.gif\"' title='"+ aXYZ[14][IdiomaLoja] +"'></li>";
      if(priceT>0)sOutrosFiltros+="<li>"+ aXYZ[12][IdiomaLoja] +": <span class=SearchItem>"+ FormatPrice(priceT,FC$.Currency) +"</span> <img src='/images/x.gif' onclick='StoreProductsFilter$.fnRemoveFilter(7,false)' onmouseover='this.src=\"/images/xon.gif\"' onmouseout='this.src=\"/images/x.gif\"' title='"+ aXYZ[14][IdiomaLoja] +"'></li>";
      if(typeof(a1)=="object" && a1.id>0)sOutrosFiltros+="<li>"+ FCLib$.pQuery.pA1.name +": <span class=SearchItem>"+ a1.value +"</span> <img src='/images/x.gif' onclick='StoreProductsFilter$.fnRemoveFilter(1,false)' onmouseover='this.src=\"/images/xon.gif\"' onmouseout='this.src=\"/images/x.gif\"' title='"+ aXYZ[14][IdiomaLoja] +"'></li>";
      if(typeof(a2)=="object" && a2.id>0)sOutrosFiltros+="<li>"+ FCLib$.pQuery.pA2.name +": <span class=SearchItem>"+ a2.value +"</span> <img src='/images/x.gif' onclick='StoreProductsFilter$.fnRemoveFilter(2,false)' onmouseover='this.src=\"/images/xon.gif\"' onmouseout='this.src=\"/images/x.gif\"' title='"+ aXYZ[14][IdiomaLoja] +"'></li>";
      if(typeof(a3)=="object" && a3.id>0)sOutrosFiltros+="<li>"+ FCLib$.pQuery.pA3.name +": <span class=SearchItem>"+ a3.value +"</span> <img src='/images/x.gif' onclick='StoreProductsFilter$.fnRemoveFilter(3,false)' onmouseover='this.src=\"/images/xon.gif\"' onmouseout='this.src=\"/images/x.gif\"' title='"+ aXYZ[14][IdiomaLoja] +"'></li>";
      if(text!=""){
        sFiltroTxt+="<li>";
        sFiltroTxt+="<span id=idFilSearchTextOriSpanFC>";
        sFiltroTxt+=   aXYZ[8][IdiomaLoja] +": <a href='#ns' onclick='ToggleIDs(\"idFilSearchTextInputSpanFC\",\"idFilSearchTextOriSpanFC\");'>\"<span class=SearchTextFil>"+text+"</span>\"<img src='/images/IcEditar.gif' title='"+ aXYZ[15][IdiomaLoja] +"'></a>";
        sFiltroTxt+="  <img src='/images/x.gif' onclick='StoreProductsFilter$.fnRemoveFilter(8,false)' onmouseover='this.src=\"/images/xon.gif\"' onmouseout='this.src=\"/images/x.gif\"' title='"+ aXYZ[14][IdiomaLoja] +"'>";
        sFiltroTxt+="</span>";
        sFiltroTxt+="<span style=display:none; id=idFilSearchTextInputSpanFC>";
        sFiltroTxt+="  <input type=text id=idFilSearchTextInputFC class=InputText onkeydown='if(event.keyCode==13)StoreProductsFilter$.fnChangeTxt(this.value);' maxlength=40 value='"+ text +"'>";
        sFiltroTxt+="  <span id=idFilSearchOKFC><a href='#ns' onclick='this.setAttribute(\"disabled\",\"true\");StoreProductsFilter$.fnChangeTxt(document.getElementById(\"idFilSearchTextInputFC\").value);'><img src='/images/ok_off.png' onmouseover='this.src=\"/images/ok_on.png\"' onmouseout='this.src=\"/images/ok_off.png\"' title='"+ aXYZ[16][IdiomaLoja] +"'></a></span>";
        sFiltroTxt+="  <span id=idFilSearchCancelFC><a href='#ns' onclick='ToggleIDs(\"idFilSearchTextOriSpanFC\",\"idFilSearchTextInputSpanFC\");'><img src='/images/cancel_off.png' onmouseover='this.src=\"/images/cancel_on.png\"' onmouseout='this.src=\"/images/cancel_off.png\"' title='"+ aXYZ[17][IdiomaLoja] +"'></a></span>";
        sFiltroTxt+="</span>";
        sFiltroTxt+="</li>";
      }
      else{
        if(sOutrosFiltros!="" || sFiltrandoPor!="" || aProds.length>0){
          sFiltroTxt+="<li id=idFilSearchTextEmptyFC>";
          sFiltroTxt+="<input type=text id=idFilSearchTextInputFC class=InputText onkeydown='if(event.keyCode==13)StoreProductsFilter$.fnChangeTxt(this.value);' maxlength=40 value='' placeholder='"+ aXYZ[4][IdiomaLoja] +"'>";
          sFiltroTxt+="<span id=idFilSearchOKFC><a href='#ns' onclick='this.setAttribute(\"disabled\",\"true\");StoreProductsFilter$.fnChangeTxt(document.getElementById(\"idFilSearchTextInputFC\").value);'><img src='/images/ok_off.png' title='"+ aXYZ[16][IdiomaLoja] +"'></a></span>";
          sFiltroTxt+="</li>";
        }
      }
      if(sFiltrandoPor!="" || sOutrosFiltros!="" || sFiltroTxt!=""){
        var sParamsBusca=fnMaisOpcoesBusca();
        var sParamsInit=fnSetParamsInit();
        sFiltrandoPor="<ul class=FiltrandoPor>"+sOutrosFiltros+sFiltrandoPor+sFiltroTxt;
        sFiltrandoPor+="<li><div class='FilRemoveFilters'><a href='"+FCLib$.uk("url-prod")+sParamsInit+"'>"+ aXYZ[2][IdiomaLoja] +"</a></div></li>";
        sFiltrandoPor+="<li><div class='FilMoreOptionsSearch'><a href='"+ FCLib$.uk("url-advanced-search") + sParamsBusca+"'>"+ aXYZ[3][IdiomaLoja] +"</a></div></li>";
        sFiltrandoPor+="</ul>";
      }

      if(sFiltrandoPor!="")sHTML="<div class=DivFiltrandoPor><span class=Label>"+ aXYZ[1][IdiomaLoja] +":</span>"+sFiltrandoPor+"</div>"+sHTML;

      if(sHTML!=""){
        oFilOut.innerHTML="<div id=ContentFil>"+ sHTML +"</div>";
      }

    }
  }
  


  /*########## FUN��ES PARA BUSCA ##########*/

  function fnSearchFil(sTxt,id){
    var oUL=FCLib$.GetID("FilItemsList"+id);
    if(oUL){
      var opFil=FCLib$.pQuery.pFil;
      if(typeof(opFil)=="object"){
        id=parseInt(id,10);
        for(var i in opFil){
          if(i==id){
            var oFiltro=opFil[i];
            var oItemFil=oFiltro.items;
            if(typeof(oItemFil)=="object"){
              var sLiChecked=""
              var sLiUnChecked=""
              var sLi="";
              var sChecked="";
              sTxt=sTxt.toLowerCase().substring(0,iMaxSearch);
              for(var z in oItemFil){
                sLi="";
                if(fnRemoveAcento(oItemFil[z].value.toLowerCase()).search(fnRemoveAcento(sTxt))!=-1)var bFound=true; else var bFound=false; /*se encontrou o item com a busca de itens do filtro*/
                var idItem=oItemFil[z].id;            
                var sCont="";
                var Color=oItemFil[z].color;
                var Image=oItemFil[z].image;
                if(Image!="")sCont="<img onError='MostraImgOnErrorShim(this)' src='"+ FC$.PathPrd + Image +"' class=ImageFil>";
                else if(Color!="")sCont="<span style='background-color:"+ Color +";' class=ColorFil></span>";
                if(aAFil[idItem])sChecked=" checked"; else sChecked="";
                if(bFound || sChecked!=""){  /*se encontrou ou se est� marcado insere no buffer*/
                  sLi+="<li"+ (!bFound && sChecked==""?" class=none":"") +"><input type=checkbox id=fil"+ idItem +" name=filters onclick='StoreProductsFilter$.fnCreateEvent(\"Filter\",\"Filtering by filter "+ oFiltro.name +"\",\""+ fnCleanValue(oItemFil[z].value) +"\");StoreProductsFilter$.fnChangeFilter();' value='"+ idItem +"'"+ sChecked +"><label for=fil"+ idItem +">"+ sCont + (bFound?fnReplaceSearchTxt(oItemFil[z].value,sTxt):oItemFil[z].value) +" ("+ oItemFil[z].res +")</label></li>";
                  if(sChecked!="")sLiChecked+=sLi; else sLiUnChecked+=sLi;
                }
              }
              if(sLiChecked+sLiUnChecked=="")oUL.innerHTML="<li><div class=FilNotFound><b>"+ oFiltro.name +"</b> "+ aXYZ[5][IdiomaLoja] +" <i>"+ sTxt +"</i>.</div></li>";
              else{
                if(sTxt=="") oUL.innerHTML=sLiChecked+sLiUnChecked;
                else oUL.innerHTML=sLiUnChecked+sLiChecked;
              }
            }                      
          }
        }
      }   
    }
  }

  function fnSearchAdic(sTxt,iAdic){
    var oUL=FCLib$.GetID("AdicItemsList"+iAdic);
    if(oUL){
      var oAdic=eval("FCLib$.pQuery.pA"+iAdic);
      var oItemAdic=oAdic.items;
      if(typeof(oItemAdic)=="object"){
        var sLiChecked=""
        var sLiUnChecked=""
        var sLi="";
        var sChecked="";
        sTxt=sTxt.toLowerCase().substring(0,iMaxSearch);
        for(var z in oItemAdic){
          sLi="";
          if(fnRemoveAcento(oItemAdic[z].value.toLowerCase()).search(fnRemoveAcento(sTxt))!=-1)var bFound=true; else var bFound=false; /*se encontrou o item com a busca de itens do adicional*/
          var idItem=oItemAdic[z].id;            
          if(idItem==eval("a"+iAdic+".id"))sChecked=" checked"; else sChecked="";
          if(bFound || sChecked!=""){  /*se encontrou ou se est� marcado insere no buffer*/
            sLi="<li"+ (!bFound && sChecked==""?" class=none":"") +"><input type=radio id=Adic"+ idItem +" name=Adic"+iAdic+" onclick='StoreProductsFilter$.fnCreateEvent(\"Filter\",\"Filtering by descriptor "+ oAdic.name +"\",\""+ fnCleanValue(oItemAdic[z].value) +"\");StoreProductsFilter$.fnChangeAdic("+iAdic+",this.value);' value='"+ idItem +"'"+ sChecked +"><label for=Adic"+ idItem +">"+ fnReplaceSearchTxt(oItemAdic[z].value,sTxt) +" ("+ oItemAdic[z].res +")</label></li>";
            if(sChecked!="")sLiChecked+=sLi; else sLiUnChecked+=sLi;
          }
        }
        if(sLiChecked+sLiUnChecked=="")oUL.innerHTML="<li><div class=FilNotFound><b>"+ oAdic.name +"</b> "+ aXYZ[5][IdiomaLoja] +" <i>"+ sTxt +"</i>.</div></li>";
        else{
          if(sTxt=="")oUL.innerHTML=sLiChecked+sLiUnChecked;
          else oUL.innerHTML=sLiUnChecked+sLiChecked;
        }
      }                      
    }
  }

  function fnSearchCat(sTxt,id){
    var oUL=FCLib$.GetID("CatItemsList");
    if(oUL){
      var opCat=FCLib$.pQuery.pCat;
      if(typeof(opCat)=="object"){
        var oCat=opCat;
        var sLiChecked=""
        var sLiUnChecked=""
        var sLi="";
        var sChecked="";
        sTxt=sTxt.toLowerCase().substring(0,iMaxSearch);
        for(var y in oCat){
          sLi="";
          if(fnRemoveAcento(oCat[y].name.toLowerCase()).search(fnRemoveAcento(sTxt))!=-1){ /*se encontrou o departamento com a busca de itens de departamentos*/
            var idCat=oCat[y].id;
            if(idCat==cat.id)sChecked=" checked"; else sChecked="";
            sLi="<li><input type=radio id=Cat"+ idCat +" name=CatFil onclick='StoreProductsFilter$.fnCreateEvent(\"Filter\",\"Filtering by category\",\""+ fnCleanValue(oCat[y].name) +"\");StoreProductsFilter$.fnChangeCat(\""+ oCat[y].url +"\","+ idCat +");' value='"+ idCat +"'"+ sChecked +"><label for=Cat"+ idCat +">"+ fnReplaceSearchTxt(oCat[y].name,sTxt) +" ("+ oCat[y].res +")</label></li>";
            if(sChecked!="")sLiChecked+=sLi; else sLiUnChecked+=sLi;
          }
        }
        if(sLiChecked+sLiUnChecked=="")oUL.innerHTML="<li><div class=FilNotFound><b>"+ aXYZ[6][IdiomaLoja] +" </b> "+ aXYZ[5][IdiomaLoja] +" <i>"+ sTxt +"</i>.</div></li>";
        else {
          if(sTxt=="") oUL.innerHTML=sLiChecked+sLiUnChecked;
          else oUL.innerHTML=sLiUnChecked+sLiChecked;      
        } 
      }
    }
  }

  /*########## FUN��ES AUXILIARES ##########*/

  function fnIncludeCSS(){
    var oHead=document.getElementsByTagName("head")[0];
    var oLink=document.createElement("link");
    oLink.rel="stylesheet";
    oLink.type="text/css";
    oLink.href="/css/ProductsFilter.css";
    oLink.media="all";
    oHead.appendChild(oLink);
  }
  
  function fnHideFil(dif){
    /*Fun��o para exibir/esconder filtro*/
    var oFilClass=oFilOut.getElementsByClassName("FilInfo"+dif);
    var oSpan=FCLib$.GetID("FilName"+dif);
    var bHide=false;
    var iTamFilClass=oFilClass.length;
    for (var z=0;z<iTamFilClass;z++){
      if(oFilClass[z].style.display=="none"){oFilClass[z].style.display="";}
      else {oFilClass[z].style.display="none";bHide=true;}
    }
    if(oSpan){
      if(bHide)oSpan.className="SetaDireita";
      else oSpan.className="SetaBaixo";
    }
  }

  function fnRemoveAcento(str){
    var ComAc='���������������������������������������������Ǵ`^�~';  
    var SemAc='aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC     ';
    for (var i in str){
      for (var j in ComAc){
        if (str[i]==ComAc[j]){
          str=str.replace(str[i],SemAc[j]);
        }
      }
    }
    return str;
  }

  function fnReplaceSearchTxt(Item,sSearch){
    /*Item � o nome completo do Item (ex: Jo�o Paulo) / sSearch � o termo procurado (ex: Paulo)*/
    if(sSearch!=""){
      sSearch=fnRemoveAcento(sSearch);
      var iPos=fnRemoveAcento(Item).toLowerCase().indexOf(sSearch.toLowerCase());   
      var regEx=new RegExp(Item.substring(iPos,sSearch.length+iPos), "i");
      var repMask="<span class=ColorSearch>"+Item.substring(iPos,sSearch.length+iPos)+"</span>";
      return Item.replace(regEx, repMask);
    }
    else{
      return Item;
    }
  }

  function fnRedefineTextFil(aFilItens){
    sTextFil="";
    var opFil=FCLib$.pQuery.pFil;
    if(typeof(opFil)=="object"){
      for(var j in opFil){
        var oFiltro=opFil[j];
        var oItemFil=oFiltro.items;
        if(typeof(oItemFil)=="object"){
          for(var h in oItemFil){
            var idItem=oItemFil[h].id;
            if(aFilItens[idItem]){
              if(sTextFil!=""){sTextFil+="+";}
              sTextFil+=oItemFil[h].value;
            }
          }
        }
      }
    }
  }

  function fnChangeFilter(){
    var oFiltroItens=document.getElementsByName("filters");
    if(oFiltroItens){
      var i;
      var sIDs="";
      var aFilItens={};
      var iTamFiltroItens=oFiltroItens.length;
      for(i=0;i<iTamFiltroItens;i++){
        if(oFiltroItens[i].checked){
          if(sIDs!="")sIDs+="+"
          sIDs+=oFiltroItens[i].value;
          aFilItens[oFiltroItens[i].value]=true;
        }
      }
      fnRedefineTextFil(aFilItens);
      fnGoNewSearchFil(sIDs,"",0,0,0,"");
    }
  }

  function fnChangeCat(CatURL,idCat){
    fnGoNewSearchFil("",CatURL,idCat,0,0,"");
  }

  function fnChangeAdic(iAdic,idItem){
    fnGoNewSearchFil(sSearchFil,"",0,iAdic,idItem,"");
  }

  function fnChangeTxt(sTxt){
    fnGoNewSearchFil(sSearchFil,"",0,0,0,sTxt);
  }

  function fnGoNewSearchFil(IDsFilters,urlcat,idcat,iAdic,idItemAdic,sTxt){
  /*se idcat>0 ent�o � uma mudan�a por categoria, usar o sSearchFil que tem os filtros atuais e urlcat para montar a url. Caso contr�rio usar IDsFilters*/
  /*se passar iAdic,idItemAdic em iAdic cont�m o n�mero do adicional (1,2 ou 3) e em idItemAdic o id para filtrar. Neste caso monta a URL com o informado*/
    var sURL="";
    var sParams="";
    if(idcat>0){
      if(urlcat!=""){
        sURL="/"+ catPath +"/"+urlcat;
        if(sSearchFil!="")sParams+=(sParams==""?"?":"&")+"fil="+ sSearchFil;
      }
      else{
        sURL=FCLib$.uk("url-prod")+"?";
        sParams+=(FCLib$.fnUseEHC()?"catid":"idcategoria")+"="+ idcat;
        if(sSearchFil!="")sParams+=(sParams==""?"?":"&")+"fil="+ sSearchFil;
      }
    }
    else{  
      if(cat.url!=""){
        sURL="/"+ catPath +"/"+cat.url;
      }
      else{
        sURL=FCLib$.uk("url-prod");
        if(typeof(cat)=="object" && cat.id>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"catid":"idcategoria") +"="+ cat.id;
      }
      if(IDsFilters!="")sParams+=(sParams==""?"?":"&")+"fil="+ IDsFilters;
    }   
    if(idProd>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"productid":"idproduto")+"="+idProd;
    if(customFile!="")sParams+=(sParams==""?"?":"&")+"th="+customFile;
    if(sty>0)sParams+=(sParams==""?"?":"&")+"sty="+sty;
    if(aProds.length>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"productida":"aidproduto")+"="+aProds.join("+");
    if(sTxt!="")sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"text":"texto")+"="+fnCleanTxt(sTxt);
    else if(text!="")sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"text":"texto")+"="+fnCleanTxt(text);
    if(pp>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"products":"produtos")+"="+pp;
    if(sale)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"offers":"promocao")+"=true";
    if(rel)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"releases":"lancamento")+"=true";
    if(order>0)sParams+=(sParams==""?"?":"&")+"order="+order;
    sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"adv":"avancada")+"=true";
    if(priceF>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"pricefrom":"precode")+"="+priceF;
    if(priceT>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"priceto":"precoate")+"="+priceT;
    if(iAdic==1)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"a1":"adicional1")+"="+idItemAdic;
    else if(typeof(a1)=="object" && a1.id>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"a1":"adicional1")+"="+a1.id;
    if(iAdic==2)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"a2":"adicional2")+"="+idItemAdic;
    else if(typeof(a2)=="object" && a2.id>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"a2":"adicional2")+"="+a2.id;
    if(iAdic==3)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"a3":"adicional3") +"="+ idItemAdic;
    else if(typeof(a3)=="object" && a3.id>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"a3":"adicional3")+"="+a3.id;  
    if(sNR)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"searchnameref":"buscanomeref")+"=true";
    if(any)sParams+=(sParams==""?"?":"&")+"any=true";
    if(sTextFil!="")sParams+=(sParams==""?"?":"&")+"tfil="+ fnCleanTextFil(sTextFil);
    if(sParams!="")sURL+=sParams;
    location.href=sURL;
  }

  function fnCleanTxt(sTxt){
    return sTxt.replace("/","%20");
  }

  function fnCleanValue(sValue){
    sValue=sValue.replace("'"," ");
    return sValue.replace("\""," ");
  }

  function fnCleanTextFil(sTxt){
    sTxt=fnRemoveAcento(sTxt);
    sTxt=sTxt.replace(/[^a-z0-9+]/gi,'+');
    sTxt=sTxt.replace(/ /g,"+");
    sTxt=sTxt.replace(/\++/g,'+');
    return sTxt;
  }

  function fnRemoveFilter(iTipo,IsFiltro){
    console.log("Removeu Filtro");
    var sURL="";
    var sParams="";
    if(IsFiltro){
      var sIDs="";
      var aFilItens={};
      for(var index in aAFil){ 
        if(index!=iTipo){ /*n�o adiciona o item que pediu para ser removido*/
          if(sIDs!="")sIDs+="+"
          sIDs+=index;
          aFilItens[index]=true;
        }
      }
      sSearchFil=sIDs; /*substitui a var sSearchFil com os filtros atuais menos o que ser� removido*/
      fnRedefineTextFil(aFilItens);
    }
    if(iTipo==0 || cat.url==""){  /*se esta removendo categoria ou n�o tem url da categoria*/
      sURL=FCLib$.uk("url-prod");
      if(typeof(cat)=="object" && cat.id>0 && iTipo!=0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"catid":"idcategoria")+"="+cat.id;
    }
    else if(cat.url!=""){
      sURL="/"+ catPath +"/"+cat.url;
    }
    if(sSearchFil!="")sParams+=(sParams==""?"?":"&")+"fil="+ sSearchFil;
    if(customFile!="")sParams+=(sParams==""?"?":"&")+"th="+customFile;
    if(sty>0)sParams+=(sParams==""?"?":"&")+"sty="+sty;
    if(aProds.length>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"productida":"aidproduto")+"="+aProds.join("+");
    if(text!="" && iTipo!=8)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"text":"texto")+"="+text;
    if(pp>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"products":"produtos")+"="+pp;
    if(sale && iTipo!=5)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"offers":"promocao")+"=true";
    if(rel && iTipo!=4)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"releases":"lancamento")+"=true";
    if(order>0)sParams+=(sParams==""?"?":"&")+"order="+order;
    sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"adv":"avancada")+"=true";
    if(priceF>0 && iTipo!=6)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"pricefrom":"precode")+"="+priceF;
    if(priceT>0 && iTipo!=7)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"priceto":"precoate")+"="+priceT;
    if(typeof(a1)=="object" && a1.id>0 && iTipo!=1)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"a1":"adicional1")+"="+a1.id;
    if(typeof(a2)=="object" && a2.id>0 && iTipo!=2)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"a2":"adicional2")+"="+a2.id;
    if(typeof(a3)=="object" && a3.id>0 && iTipo!=3)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"a3":"adicional3")+"="+a3.id;  
    if(sNR)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"searchnameref":"buscanomeref")+"=true";
    if(any)sParams+=(sParams==""?"?":"&")+"any=true";
    if(sTextFil!="")sParams+=(sParams==""?"?":"&")+"tfil="+fnCleanTextFil(sTextFil);
    
    var tratar_param = sParams.replace("?","");
    var array = tratar_param.split("&");
    

    if(array.length == 1)
    {
      array = tratar_param.split("=");
      
      if(array.length == 2 && array[0] == "avancada")
      {
        location.href=sURL;
      }
      else
      {
        if(sParams!="")sURL+=sParams;
        location.href=sURL;
      }
    }
    else if (array.length == 2)
    {
      var param_1 = array[0].split("=");
      var param_2 = array[1].split("=");
      
      if((param_1[0] == "th" && param_2[0] == "avancada") || (param_2[0] == "th" && param_1[0] == "avancada"))
      {
        location.href=sURL;
      }
      else if(param_1[0] == "th" && param_2[0] != "avancada")
      {
        var p = "?" + array[1];
        if(p!="")sURL+=p;
        location.href=sURL;
      }
      else if(param_2[0] == "th" && param_1[0] != "avancada")
      {
        var p = "?" + array[0];
        if(p!="")sURL+=p;
        location.href=sURL;
      }
      else
      {
        if(sParams!="")sURL+=sParams;
        location.href=sURL;
      }
      
    }
    else
    {
      if(sParams.includes("&th=") || sParams.includes("?th="))
      {
        var a = tratar_param.split("&");
        
        var p = "";
        for(var i = 0; i < a.length; i++)
        {
          if(i==0)
          {
            p = p + "?";
          }
          
          if(a[i].includes("th=") == false)
          {
            p = p + a[i];
            if(i+1 < a.length)
            {
              p = p + "&";
            }
            
          }
        }
        
        if(p!="")sURL+=p;
        location.href=sURL;
      }
      else
      {
        if(sParams!="")sURL+=sParams;
        location.href=sURL;
      }
      
    }
    
    

  }

  /*fun��o para coletar os par�metros que ser�o usados em link para busca avan�ada*/
  function fnMaisOpcoesBusca(){
    var sParams="";
    if(typeof(cat)=="object" && cat.id>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"catid":"idcategoria")+"="+cat.id;
    if(sSearchFil!="")sParams+=(sParams==""?"?":"&")+"fil="+sSearchFil;
    if(text!="")sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"text":"texto")+"="+text;
    if(pp>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"products":"produtos")+"="+pp;
    if(sale)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"offers":"promocao")+"=true";
    if(rel)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"releases":"lancamento")+"=true";
    if(order>0)sParams+=(sParams==""?"?":"&")+"order="+order;
    if(priceF>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"pricefrom":"precode")+"="+priceF;
    if(priceT>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"priceto":"precoate")+"="+priceT;
    if(typeof(a1)=="object" && a1.id>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"a1":"adicional1")+"="+a1.id;
    if(typeof(a2)=="object" && a2.id>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"a2":"adicional2")+"="+a2.id;
    if(typeof(a3)=="object" && a3.id>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"a3":"adicional3")+"="+a3.id;  
    if(sNR)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"searchnameref":"buscanomeref")+"=true";
    if(any)sParams+=(sParams==""?"?":"&")+"any=true";
    return sParams;
  }

  /*fun��o para coletar os par�metros iniciais que ser�o usados em link para remover todos os filtros*/
  function fnSetParamsInit(){
    var sParams="";
    if(customFile!="")sParams+=(sParams==""?"?":"&")+"th="+customFile;
    if(sty>0)sParams+=(sParams==""?"?":"&")+"sty="+sty;
    if(aProds.length>0)sParams+=(sParams==""?"?":"&")+(FCLib$.fnUseEHC()?"productida":"aidproduto")+"="+aProds.join("+");  
    return sParams;
  }

  function fnCreateEvent(sCategory,sAction,sLabel){
    if(typeof gtag!='undefined'){
      gtag('event', sAction,{'send_to': FC$.GA,'event_category': sCategory,'event_label': sLabel});
    }
    else if(typeof ga!=='undefined'){
      ga('send','event',sCategory,sAction,sLabel);
    }
  }

  return{
    fnInit:fnInit,
    aAFil:aAFil,
    sSearchFil:sSearchFil,
    fnHideFil:fnHideFil,
    fnChangeFilter:fnChangeFilter,
    fnChangeCat:fnChangeCat,
    fnChangeAdic:fnChangeAdic,
    fnChangeTxt:fnChangeTxt,
    fnRemoveFilter:fnRemoveFilter,
    fnSearchFil:fnSearchFil,
    fnSearchCat:fnSearchCat,
    fnSearchAdic:fnSearchAdic,
    fnGoNewSearchFil:fnGoNewSearchFil,
    fnCreateEvent:fnCreateEvent
  }
})();

FCLib$.onReady(StoreProductsFilter$.fnInit());
