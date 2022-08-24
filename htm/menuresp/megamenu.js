jQuery3.fn.megamenu = function(options){
	var settings = {
		interval	 		: 250    	// animation time (ms)
	}
	$.extend( settings, options );
	var menu = $(".megamenu");
	var lastScreenWidth = window.innerWidth;
	$(menu).prepend("<li class='showhide blue'><span class='title'>CATEGORIAS</span><span class='icon1'></span><span class='icon2'></span></li>");
	screenSize();
	
	$(window).resize(function() {
		if(lastScreenWidth <= 1024 && window.innerWidth > 1024){
			unbindEvents();
			hideCollapse();
			bindHover();
		}
		if(lastScreenWidth > 1024 && window.innerWidth <= 1024){
			unbindEvents();
			showCollapse();
			bindClick();
		}
		lastScreenWidth = window.innerWidth;
	});
	
	function screenSize(){
		if(window.innerWidth <= 1024){
			showCollapse();
			bindClick();
		}
		else{
			hideCollapse();
			bindHover();
		}
	}
	
	function bindHover(){
		if (navigator.userAgent.match(/Mobi/i) || window.navigator.msMaxTouchPoints > 0){						
			$(menu).find("a").on("click touchstart", function(e){
				e.stopPropagation(); 
				e.preventDefault();
				window.location.href = $(this).attr("href");
				$(this).parent("li").siblings("li").find(".dropdown, .megapanel").stop(true, true).fadeOut(settings.interval);
				if($(this).siblings(".dropdown, .megapanel").css("display") == "none"){
					$(this).siblings(".dropdown, .megapanel").stop(true, true).fadeIn(settings.interval);
				}
				else{
					$(this).siblings(".dropdown, .megapanel").stop(true, true).fadeOut(settings.interval);
					$(this).siblings(".dropdown").find(".dropdown").stop(true, true).fadeOut(settings.interval);
				}
			});
			
			$(document).bind("click.menu touchstart.menu", function(ev){
				if($(ev.target).closest(menu).length == 0){
					$(menu).find(".dropdown, .megapanel").fadeOut(settings.interval);
				}
			});
		}
		else{
			$(menu).find("li").bind("mouseenter", function(){
				$(this).children(".dropdown, .megapanel").stop(true, true).fadeIn(settings.interval);
			}).bind("mouseleave", function(){
				$(this).children(".dropdown, .megapanel").stop(true, true).fadeOut(settings.interval);
			});
		}
	}
	
	function bindClick(){
		$(menu).children("li").children("a").bind("click", function(e){
			if($(this).siblings(".dropdown, .megapanel").css("display") == "none"){
              	e.stopPropagation(); 
				e.preventDefault();
				$(this).siblings(".dropdown, .megapanel").slideDown(settings.interval);
				$(this).siblings(".dropdown").find("ul").slideDown(settings.interval);
			}
			else{
				$(this).siblings(".dropdown, .megapanel").slideUp(settings.interval);
			}
		});
	}

	
	function showCollapse(){
		$(menu).children("li:not(.showhide)").hide(0);
		$(menu).children("li.showhide").show(0);
		$(menu).children("li.showhide").bind("click", function(){
			if($(menu).children("li").is(":hidden")){
				$(menu).children("li").slideDown(settings.interval);
			}
			else{
				$(menu).children("li:not(.showhide)").slideUp(settings.interval);
				$(menu).children("li.showhide").show(0);
			}
		});
	}
	
	function hideCollapse(){
		$(menu).children("li").show(0);
		$(menu).children("li.showhide").hide(0);
	}	
	
	function unbindEvents(){
		$(menu).find("li, a").unbind();
		$(document).unbind("click.menu touchstart.menu");
		$(menu).find(".dropdown, .megapanel").hide(0);
	}
}