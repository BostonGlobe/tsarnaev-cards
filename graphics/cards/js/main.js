var master = $('.igraphic-graphic.cards');

// $('.days', master).html(_.templates.day({}));

var refineData = require('./refineData.js');

window.loadedTsarnaevTrial = function(json) {

	var data = refineData(json);

	$('pre').html(JSON.stringify(data, null, 4));

};

$.ajax({
	url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
	dataType: 'jsonp',
	jsonpCallback: 'loadedTsarnaevTrial'
});