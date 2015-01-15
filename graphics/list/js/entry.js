(function() { globe.onDefine('window.jQuery && $(".igraphic-graphic.list").length', function() {

	require('./templates/templates.js');

	var masterSelector = '.igraphic-graphic.list';
	var master = $(masterSelector);

	var hed = $('.hed', master);
	if (hed.length) {
		$('.header .main-hed').html(hed.html());
	}

	var subhed = $('.subhed', master);
	if (subhed.length) {
		$('.header .subhed').html(subhed.html());
	}

	$('.header').addClass('visible');


	require('./main.js');

}); }());