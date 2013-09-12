(function(){for(var a,b=function(){},c=['assert','clear','count','debug','dir','dirxml','error','exception','group','groupCollapsed','groupEnd','info','log','markTimeline','profile','profileEnd','table','time','timeEnd','timeStamp','trace','warn'],d=c.length,e=window.console=window.console||{};d--;)a=c[d],e[a]||(e[a]=b)})();
var Nodes = (function(app, $) {
	var isPlaceholder = false;

	/**
	 * Browser fallbacks
	 *
	 * If the browser has no placeholder support - use a polyfil to simulate them
	 * If the browser has no canvas support - use a polyfil to simulate them
	 * If PIE is loaded, we're in IE < 10 - simulate css3 effects
	 * In IE < 9, reload the font css tag. This forces IE to apply the font css which
	 * it otherwise only applies the very first time it loads the css file
	 * and so on
	 */
	function fallbacks() {
		Modernizr.load({
			test : Modernizr.mq('only all'),
			nope : ['/js/libs/css3-mediaqueries.js']
		}, {
			test : Modernizr.canvas,
			nope : ['/js/libs/excanvas.js']
		}, {
 			test: Modernizr.input.placeholder,
 			nope: ['/js/libs/jquery.placeholder.min.js'],
 			complete : function() {
 				if (!Modernizr.input.placeholder) {
					isPlaceholder = true;
 				}
			}
		});

		if ($('body').hasClass('ie7') || $('body').hasClass('ie8')) {
			$('#font-css')[0].href = $('#font-css')[0].href;
		}

		render();
	}

	/**
	 * Correct for visual elements
	 */
	function visual() {
		$(document.body)
			.ajaxSuccess(function() {
				render();
			})
			.on('click', 'a.active, a.cur, a.curr', function(e) {
				e.preventDefault();
				e.stopPropagation();
			});
	}

	function render() {
		if ($('html').hasClass('cufon-active cufon-ready')) {
			Cufon.refresh();
		}

		if (window.PIE) {
			$('.fb-popup-tpl-overlay, .fb-popup-tpl-container, .fb-popup-tpl-footer a.button, .ie-pie').each(function() {
   				PIE.attach(this);
			});
		}

		if (isPlaceholder) {
			$('input, textarea').placeholder();
 		}
 	}

	function fbScrollTo(y, speed) {
		if (typeof(FB) != 'undefined' && window.name.match(/^app_runner/)) {
			FB && FB.Canvas && FB.Canvas.scrollTo(0, y);
			FB && FB.Canvas && FB.Canvas.setAutoGrow();
		} else {
			$('html, body')
				.stop(true, true)
				.animate({
					scrollTop: y +'px',
					duration: speed || 1000
				});
		}
	}

	/**
	 * Please, place all yours custom code here
	 */
	function events() {

	}

	app.init = function() {
		fallbacks();
		visual();
		events();
	}

	// Call the init handler automatically - since the js is at the end of the page it
	// is not necessary to wait for document ready
	app.init();

	return app;
}(Nodes || {}, jQuery));