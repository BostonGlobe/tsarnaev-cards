var master = $('.igraphic-graphic.witnesses');

var prepareData = require('../../../common/js/prepareData.js');

window.loadedTsarnaevTrial = function(json) {

	var data = prepareData(json);

	var witnesses = _.values(data.witnesses);

	$('ul.list', master).html(_.templates.witnesses({
		witnesses: witnesses,
		evidences: data.evidences
	}));

};

$.ajax({
	url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
	dataType: 'jsonp',
	jsonpCallback: 'loadedTsarnaevTrial'
});