var master = $('.igraphic-graphic.cards');

var refineData = require('./refineData.js');

window.loadedTsarnaevTrial = function(json) {

	var data = refineData(json);

	$('.days', master).html(_.templates.days({
		days: data.days,
		witnesses: data.witnesses,
		evidences: data.evidences
	}));

};

$.ajax({
	url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
	dataType: 'jsonp',
	jsonpCallback: 'loadedTsarnaevTrial'
});