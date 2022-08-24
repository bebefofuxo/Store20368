
$(document).ready(function (){
    var promises = [];
    var preload = [
        "../lojas/00020368/images/blackfriday/black-friday.png",
        "../lojas/00020368/images/blackfriday/baby.png",
        "../lojas/00020368/images/blackfriday/dias.png",
        "../lojas/00020368/images/blackfriday/horas.png",
        "../lojas/00020368/images/blackfriday/minutos.png",
        "../lojas/00020368/images/blackfriday/relogio.png",
        "../lojas/00020368/images/blackfriday/oferta.png",
        "../lojas/00020368/images/blackfriday/icone-bodies.png",
        "../lojas/00020368/images/blackfriday/icone-vestidos.png",
        "../lojas/00020368/images/blackfriday/icone-acessorios.png",
        "../lojas/00020368/images/blackfriday/icone-culote.png",
        "../lojas/00020368/images/blackfriday/icone-jeans.png",
        "../lojas/00020368/images/blackfriday/icone-calcados.png",
        "../lojas/00020368/images/blackfriday/icone-macacao.png",
        "../lojas/00020368/images/blackfriday/icone-short.png",
        "../lojas/00020368/images/blackfriday/icone-jardineiras.png",
        "../lojas/00020368/images/blackfriday/esquenta.png",
        "../lojas/00020368/images/blackfriday/bg-rodape.jpg",
        "../lojas/00020368/images/blackfriday/bg-oferta.jpg",
        "../lojas/00020368/images/blackfriday/bg-header.png"
    ];
    
  
  
    for (var i = 0; i < preload.length; i++) {
        (function (url, promise) {
            var img = new Image();
            img.onload = function () {
                promise.resolve();
            };
            img.src = url;
        })(preload[i], promises[i] = $.Deferred());
    }
    $.when.apply($, promises).done(function () {
        // -------------------------------------------------------------
        //  preload da pagina
        // -------------------------------------------------------------
        //$(".gtco-loader").fadeOut("slow");
    });

    contagemRegressiva();
    setInterval(function(){contagemRegressiva()}, 10000);

    function contagemRegressiva(){
        var dias=0;
        var horas=0;
        var minutos=0;
        var dataInicial= new Date();
        var dataFinal=new Date("Nov 23, 2018 00:00:00");
        if(dataInicial<dataFinal){
            var data=countdown(dataInicial,dataFinal);
            if(data.months==1){
                dias+=31;
            }
            dias=dias+(parseInt(data.days));
            horas=data.hours;
            minutos=data.minutes;
        }
        $('.dias').text(dias+' dias');
        $('.horas').text(horas+' horas');
        $('.minutos').text(minutos+' minutos');
    }
    /*
    var w=$(window).width();
    if(w<1024){
        $('.contagem-regressiva').find('.contagem-regressiva-item-ativo').find('img').prop('src','../lojas/00020368/images/blackfriday/cccrosa.gif')
        $('.contagem-regressiva-rodape').find('.contagem-regressiva-item-ativo').find('img').prop('src','../lojas/00020368/images/blackfriday/ccc.gif')
    }
    $(window).on('resize', function(){
        var w=$(window).width();
        if(w<1024){
            $('.contagem-regressiva').find('.contagem-regressiva-item-ativo').find('img').prop('src','../lojas/00020368/images/blackfriday/cccrosa.gif')
            $('.contagem-regressiva-rodape').find('.contagem-regressiva-item-ativo').find('img').prop('src','../lojas/00020368/images/blackfriday/ccc.gif')
        }
    });*/
});