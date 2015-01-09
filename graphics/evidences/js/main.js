var master = $('.igraphic-graphic.evidences');

var prepareData = require('../../../common/js/prepareData.js');

window.loadedTsarnaevTrial = function(json) {

	var data = prepareData(json);

	var evidences = _.values(data.evidences);

	console.log(evidences);

	$('ul.list', master).html(_.templates.evidences({
		evidences: evidences,
		witnesses: data.witnesses
	}));

};

$.ajax({
	url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
	dataType: 'jsonp',
	jsonpCallback: 'loadedTsarnaevTrial'
});