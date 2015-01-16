var master = $('.igraphic-graphic.witnesses');

// This file will convert the raw data into something usable.
var prepareData = require('../../../common/js/prepareData.js');

window.loadedTsarnaevTrial = function(json) {

	var data = prepareData(json);

	var witnessesArray = _.values(data.witnesses);
	var witnessesDict = data.witnesses;

	var evidenceArray = _.values(data.evidences);
	var evidenceDict = data.evidences;

	function getCategories(array) {

		return _.chain(array)
			.pluck('category')
			.uniq()
			.sortBy(function(v) {
				return v;		
			})
			.value();
	}

	var witnessCategories = getCategories(witnessesArray);
	var evidenceCategories = getCategories(evidenceArray);

	var $witnesses = $('section.witnesses', master);
	var $evidence = $('section.evidence', master);

	function renderWitnesses(witnesses) {
		$('ul.list', $witnesses).html(_.templates.witnesses({
			witnesses: witnesses,
			evidences: evidenceDict,
			categories: witnessCategories
		}));
	}

	$('ul.categories', $witnesses)
		.html(_.templates.categories({
			categories: witnessCategories
		}))
		.on('click', 'button', function(e) {
			$(this).toggleClass('btn--disabled');
		});

	// var	filteredWitnesses = _.filter(witnessesArray, function(witness) {
	// 	return _.contains(chosenCategories, witness.category);
	// });

	renderWitnesses(witnessesArray);

	// renderWitnesses(filteredWitnesses);


	// 		// var chosenCategories = $('section.witnesses ul.categories li button:not(.btn--disabled)', master).map(function() {
	// 		// 	var classes = $(this).attr('class').split(' ');
	// 		// 	var category = classes.filter(function(klass) {
	// 		// 		var match = klass.match(/^categoryName(.*)/);
	// 		// 		return match;
	// 		// 	})[0];
	// 		// 	return category.match(/^categoryName(.*)/)[1];
	// 		// }).get();

	// 	});

	// $('ul.categories', $evidence)
	// 	.html(_.templates.categories({
	// 		categories: evidenceCategories
	// 	}))
	// 	.on('click', 'button', function(e) {
	// 		$(this).toggleClass('btn--disabled');
	// 	});

	// 		// var chosenCategories = $('section.evidence ul.categories li button:not(.btn--disabled)', master).map(function() {
	// 		// 	var classes = $(this).attr('class').split(' ');
	// 		// 	var category = classes.filter(function(klass) {
	// 		// 		var match = klass.match(/^categoryName(.*)/);
	// 		// 		return match;
	// 		// 	})[0];
	// 		// 	return category.match(/^categoryName(.*)/)[1];
	// 		// }).get();

	// 		// var	filteredEvidence = _.filter(evidenceArray, function(evidence) {
	// 		// 	return _.contains(chosenCategories, evidence.category);
	// 		// });

	// 		renderEvidence(filteredEvidence);
	// 	});

	// renderWitnesses(witnessesArray);

	// function renderEvidence(evidence) {

	// 	$('section.evidence ul.list', master).html(_.templates.evidence({
	// 		evidences: evidence,
	// 		witnesses: witnessesDict,
	// 		categories: evidenceCategories
	// 	}));
	// }
	// renderEvidence(evidenceArray);

};

$.ajax({
	url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
	dataType: 'jsonp',
	jsonpCallback: 'loadedTsarnaevTrial'
});