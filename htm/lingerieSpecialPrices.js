/* function : zFast @2018*/
if(FC$.Page=="Products"){
  "use strict";
  var zF$ = (function () {

    var isDet = document.querySelector("body.ProductDet"); 

    function fnFormatNumber(num) {
      num = num.toString().replace(/\$|\,/g, '');
      if (isNaN(num)) num = "0";
      var sign = (num == (num = Math.abs(num)));
      num = Math.floor(num * 100 + 0.50000000001);
      num = Math.floor(num / 100).toString();
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
      return ((sign) ? '' : '-') + num;
    }

    function getProperty(props) {
      var out = {}, props = props.toString().split(';');
      for (var i = 0; i < props.length; i++) {
        var propsData = props[i].split(':'), key = (typeof propsData[0] !== 'undefined') ? propsData[0] : null,
          value = (typeof propsData[1] !== 'undefined') ? propsData[1] : null;
        if (key && value) out[key.trim()] = value.trim();
      }
      return out;
    }

    //return html para o price
    function fnShowPrice(data) {

      if (typeof data === 'undefined') return null;

      var out = "", interest = "", priceNormal = data.pn, priceOriginal = data.po, code = data.cp, maxParcels = parseInt(data.mp), isSub = (typeof data.issub !== 'undefined') ? JSON.parse(data.issub) : false;
      var pricemin = data.pricemin, pricemax = data.pricemax;
      // console.log('pricemin', pricemin, 'pricemax', pricemax);
      /* verifica preços diferentes entre os subprodutos */
      if (typeof pricemin !== "undefined" && typeof pricemax !== "undefined") {
        if (parseFloat(pricemin) > 0 && parseFloat(pricemax) > 0 && parseFloat(pricemin) !== parseFloat(pricemax)) {
          var priceInicial = pricemin.toString().split(".");
          if (priceInicial.length == 2) {
            var priceIntMin = priceInicial[0], priceDecimalMin = priceInicial[1];
            if (priceDecimalMin.length == 1) priceDecimalMin += "0";
          }
          else {
            var priceIntMin = priceInicial, priceDecimalMin = "00";
          }

          var priceFinal = pricemax.toString().split(".");
          if (priceFinal.length == 2) {
            var priceInt = priceFinal[0], priceDecimal = priceFinal[1];
            if (priceDecimal.length == 1) priceDecimal += "0";
          }
          else {
            var priceInt = priceFinal, priceDecimal = "00";
          }

          var text_prom = "";
          if (priceNormal != priceOriginal && priceOriginal != pricemax) { //verfica se o produto está em promoção e também se não é igual ao valor maior
            text_prom = "<div class=\"old-price\"><span><strike>" + FormatPrice(priceOriginal, 'R$') + "</strike></span></div>";
          }
          var txt = (isSub == false) ? '<span style="font-size:14px">Escolha o produto para ver o preço.</span>' : "";
          return '<div class="prices">'
            + text_prom
            + "<div class=\"price\">&nbsp;&nbsp;<span class=\"price-intro\"></span><span class=\"currency font-primary\">R$ </span><span class=\"int font-primary\">" + fnFormatNumber(priceIntMin) + "</span><span class=\"dec font-primary\">," + priceDecimalMin + "</span></div>"
            + "<div class=\"price\"><span class=\"price-intro\"> - </span><span class=\"currency font-primary\">R$ </span><span class=\"int font-primary\">" + fnFormatNumber(priceInt) + "</span><span class=\"dec font-primary\">," + priceDecimal + "</span></div>"
            + '</div>'
            + txt;
        }
      }

      if (priceNormal == 0 && priceOriginal == 0) {
        return "<div class=\"prices\">"
          + "  <div class=price>"
          + "    <div class='currency zf-consult-price'>"
          + "      <a href='/faleconosco.asp?idloja=" + FC$.IDLoja + "&assunto=Consulta%20sobre%20produto%20(Código%20" + code + ")' target='_top' >Preço Especial - Consulte!</a>"
          + "    </div>"
          + "  </div>"
          + "</div>";
      }

      var priceFinal = priceNormal.toString().split(".");
      if (priceFinal.length == 2) {
        var priceInt = priceFinal[0], priceDecimal = priceFinal[1];
        if (priceDecimal.length == 1) priceDecimal += "0";
      }
      else {
        var priceInt = priceFinal, priceDecimal = "00";
      }

      if (typeof Juros !== "undefined") {
        maxParcels = (maxParcels == 0 || maxParcels > Juros.length) ? Juros.length : maxParcels;
        interest = (Juros[maxParcels - 1] > 0) ? "" : " s/juros";
      }
      else {
        maxParcels = 0;
      }

      var text = (isSub == true) ? 'a partir de ' : (priceNormal != priceOriginal) ? '' : ''; //var text = (isSub==true) ? 'a partir de ': (priceNormal != priceOriginal)? 'de ': '';

      if (priceNormal != priceOriginal) {
        out += "<div class=\"prices\">";
        out += "  <div class=\"old-price\">" + text + " <span class=\"font-primary\"><strike>" + FormatPrice(priceOriginal, 'R$') + "</strike>&nbsp;</span></div>";
        out += "  <div class=\"price font-primary\">por&nbsp;<span class=\"currency\">R$ </span><span class=\"int\">" + fnFormatNumber(priceInt) + "</span><span class=\"dec\">," + priceDecimal + "</span></div>";
        out += "</div>";
        if (maxParcels > 1) out += "<div class=\"installments\">ou&nbsp;<strong><span class=\"installment-count\">" + maxParcels + "</span>x</strong> de <strong><span class=\"installment-price\">" + FormatPrecoReais(CalculaParcelaJurosCompostos(priceNormal, maxParcels)) + "</span></strong>" + interest + "</div>";
      }
      else {
        out += "<div class=\"prices\">";
        out += "<div class=\"price\"><span class=\"price-intro\">" + text + "</span><span class=\"currency font-primary\">R$ </span><span class=\"int font-primary\">" + fnFormatNumber(priceInt) + "</span><span class=\"dec font-primary\">," + priceDecimal + "</span></div>";
        out += "</div>";
        if (maxParcels > 1) out += "<div class=\"installments\">ou&nbsp;<strong><span class=\"installment-count\">" + maxParcels + "</span>x</strong> de <strong><span class=\"installment-price\">" + FormatPrecoReais(CalculaParcelaJurosCompostos(priceNormal, maxParcels)) + "</span></strong>" + interest + "</div>";
      }
      //retorna html da preço
      return out;
    }

    function fnShowPriceProdDet(data) { //Preços para detalhe do produto
      if (typeof data === 'undefined') return null;
      var out = "", interest = "", priceNormal = data.pn, priceOriginal = data.po, code = data.cp, maxParcels = parseInt(data.mp), isSub = (typeof data.issub !== 'undefined') ? JSON.parse(data.issub) : false;
      var pricemin = data.pricemin, pricemax = data.pricemax, idprod = data.idprod;
      // console.log('pricemin', pricemin, 'pricemax', pricemax);

      /* verifica preços diferentes entre os subprodutos */
      if (isDet && typeof isDet != undefined) {
        if (typeof pricemin !== "undefined" && typeof pricemax !== "undefined") {

          // console.log(parseFloat(pricemin), parseFloat(pricemax), "Funcao do detalhe");
          var oPriceDest = document.getElementById("idPriceGridFC");
          var newClass = oPriceDest.className = "newPriceMod";
          if (parseFloat(pricemin) > 0 && parseFloat(pricemax) > 0 && parseFloat(pricemin) !== parseFloat(pricemax)) {

            var priceInicial = pricemin.toString().split(".");
            if (priceInicial.length == 2) {
              var priceIntMin = priceInicial[0], priceDecimalMin = priceInicial[1];
              if (priceDecimalMin.length == 1) priceDecimalMin += "0";
            }
            else {
              var priceIntMin = priceInicial, priceDecimalMin = "00";
            }

            var priceFinal = pricemax.toString().split(".");
            if (priceFinal.length == 2) {
              var priceInt = priceFinal[0], priceDecimal = priceFinal[1];
              if (priceDecimal.length == 1) priceDecimal += "0";
            }
            else {
              var priceInt = priceFinal, priceDecimal = "00";
            }

            var text_prom = "";
            if (priceNormal != priceOriginal && priceOriginal != pricemax) { //verfica se o produto está em promoção e também se não é igual ao valor maior
              text_prom = "<div class=\"old-price\"><span><strike>" + FormatPrice(priceOriginal, 'R$') + "</strike></span></div>";
            }
            var txt = (isSub == false) ? '<span style="font-size:14px">Escolha o produto para ver o preço.</span>' : "";
            var output = '<div class="prices">'
              + text_prom
              + "<div class=\"price\">&nbsp;&nbsp;<span class=\"price-intro\"></span><span class=\"currency font-primary\">R$ </span><span class=\"int font-primary\">" + fnFormatNumber(priceIntMin) + "</span><span class=\"dec font-primary\">," + priceDecimalMin + "</span></div>"
              + "<div class=\"price\"><span class=\"price-intro\"> - </span><span class=\"currency font-primary\">R$ </span><span class=\"int font-primary\">" + fnFormatNumber(priceInt) + "</span><span class=\"dec font-primary\">," + priceDecimal + "</span></div>"
              + '</div>'
              + txt;
            return output;
          }
        }

        if (priceNormal == 0 && priceOriginal == 0) {
          return "<div class=\"prices\">"
            + "  <div class=price>"
            + "    <div class='currency zf-consult-price'>"
            + "      <a href='/faleconosco.asp?idloja=" + FC$.IDLoja + "&assunto=Consulta%20sobre%20produto%20(Código%20" + code + ")' target='_top' >Preço Especial - Consulte!</a>"
            + "    </div>"
            + "  </div>"
            + "</div>";
        }

        var priceFinal = priceNormal.toString().split(".");
        if (priceFinal.length == 2) {
          var priceInt = priceFinal[0], priceDecimal = priceFinal[1];
          if (priceDecimal.length == 1) priceDecimal += "0";
        }
        else {
          var priceInt = priceFinal, priceDecimal = "00";
        }

        if (typeof Juros !== "undefined") {
          maxParcels = (maxParcels == 0 || maxParcels > Juros.length) ? Juros.length : maxParcels;
          interest = (Juros[maxParcels - 1] > 0) ? "" : " s/juros";
        }
        else {
          maxParcels = 0;
        }

        var text = (isSub == true) ? 'a partir de ' : (priceNormal != priceOriginal) ? '' : ''; //var text = (isSub==true) ? 'a partir de ': (priceNormal != priceOriginal)? 'de ': '';

        if (priceNormal != priceOriginal) {
          out += "<div class=\"prices\">";
          out += "  <div class=\"old-price\">" + text + " <span class=\"font-primary\"><strike>" + FormatPrice(priceOriginal, 'R$') + "<strike></span></div>";
          out += "  <div class=\"price font-primary\">Bpor&nbsp;<span class=\"currency\">R$ </span><span class=\"int\">" + fnFormatNumber(priceInt) + "</span><span class=\"dec\">," + priceDecimal + "</span></div>";
          out += "</div>";
          if (maxParcels > 1) out += "<div class=\"installments\">ou&nbsp;<strong><span class=\"installment-count\">" + maxParcels + "</span>x</strong> de <strong><span class=\"installment-price\">" + FormatPrecoReais(CalculaParcelaJurosCompostos(priceNormal, maxParcels)) + "</span></strong>" + interest + "</div>";
        }
        else {
          out += "<div class=\"prices\">";
          out += "<div class=\"price\"><span class=\"price-intro\">" + text + "</span><span class=\"currency font-primary\">R$ </span><span class=\"int font-primary\">" + fnFormatNumber(priceInt) + "</span><span class=\"dec font-primary\">," + priceDecimal + "</span></div>";
          out += "</div>";
          if (maxParcels > 1) out += "<div class=\"installments\">ou&nbsp;<strong><span class=\"installment-count\">" + maxParcels + "</span>x</strong> de <strong><span class=\"installment-price\">" + FormatPrecoReais(CalculaParcelaJurosCompostos(priceNormal, maxParcels)) + "</span></strong>" + interest + "</div>";
        }
        //retorna html da preço
        return out;
      }
    }

    /* Price Products */
    function fnProdShowPrice(dataAttr) {
      /*
      function: exibe o valor do produto com/ sem promoção
      */
      var data = document.querySelectorAll("*[" + dataAttr + "]"); /* criar Array com todos os elementos com atributo data : dataAttr */
      if (data && typeof data === "object" && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var sPriceProdData = data[i].getAttribute(dataAttr) != "" ? data[i].getAttribute(dataAttr) : "";
          if (sPriceProdData && sPriceProdData !== "") {
            var priceJson = getProperty(sPriceProdData); /* "pn": "0.00"; "po": "0.00"; "cp": "ref0001";"mp":"0" priceJson.pn, priceJson.po, priceJson.cp, priceJson.mp */
            data[i].removeAttribute(dataAttr); /* remove data in dom */

            if (isDet && typeof isDet != undefined) {
              data[i].insertAdjacentHTML('beforeend', fnShowPriceProdDet(priceJson)); //execute function fnShowPrice (){}
            } else {
              data[i].insertAdjacentHTML('beforeend', fnShowPrice(priceJson)); //execute function fnShowPrice (){}
            }
          }
        }
      } else {
        return null;
      }
    }
    function fnExecAllFuncProducts() {
      zF$.fnProdShowPrice("data-prod-price");
    };

    /* exports */
    return {
      fnFormatNumber: fnFormatNumber,
      fnProdShowPrice: fnProdShowPrice,
      fnShowPriceProdDet: fnShowPriceProdDet,
      fnExecAllFuncProducts: fnExecAllFuncProducts,
      fnShowPrice: fnShowPrice
    }
  })();

  (function () {
    zF$.fnProdShowPrice("data-prod-price");
    zF$.fnExecAllFuncProducts();
  })();
  /*checa se tem preço de subs na prod det e esconde o principal*/
  (function () {
    var checkProDetPage = document.querySelector('.ProductDet');
    var checkPricesSubs = document.querySelector('.prices');
    if (checkPricesSubs != null && checkProDetPage != null){
      checkPricesSubs.previousElementSibling.previousElementSibling.previousElementSibling.innerText= "";
      checkPricesSubs.previousElementSibling.previousElementSibling.innerText= "";
      checkPricesSubs.previousElementSibling.innerText = "";
    }
  })();

}