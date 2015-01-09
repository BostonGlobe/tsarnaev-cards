var master = $('.igraphic-graphic.days');

var prepareData = require('../../../common/js/prepareData.js');

window.loadedTsarnaevTrial = function(json) {

	var data = prepareData(json);

	var days = _.values(data.days);

	console.log(days);

	$('ul.list', master).html(_.templates.days({
		days: days,
		evidences: data.evidences,
		witnesses: data.witnesses
	}));

};

$.ajax({
	url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
	dataType: 'jsonp',
	jsonpCallback: 'loadedTsarnaevTrial'
});