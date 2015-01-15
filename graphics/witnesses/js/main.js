var master = $('.igraphic-graphic.witnesses');

var prepareData = require('../../../common/js/prepareData.js');

window.loadedTsarnaevTrial = function(json) {

	var data = prepareData(json);

	var witnessesArray = _.values(data.witnesses);
	var witnessesDict = data.witnesses;

	var evidenceArray = _.values(data.evidences);
	var evidenceDict = data.evidences;

	var witnessCategories = _.chain(witnessesArray)
		.pluck('category')
		.uniq()
		.sortBy(function(v) {
			return v;		
		})
		.value();

	var evidenceCategories = _.chain(evidenceArray)
		.pluck('category')
		.uniq()
		.sortBy(function(v) {
			return v;		
		})
		.value();

	$('.witnesses-section ul.categories', master)
		.html(_.templates.categories({
			categories: witnessCategories
		}))
		.on('click', 'button', function(e) {
			$(this).toggleClass('btn--disabled');

			var chosenCategories = $('.witnesses-section ul.categories li button:not(.btn--disabled)', master).map(function() {
				var classes = $(this).attr('class').split(' ');
				var category = classes.filter(function(klass) {
					var match = klass.match(/^categoryName(.*)/);
					return match;
				})[0];
				return category.match(/^categoryName(.*)/)[1];
			}).get();

			var	filteredWitnesses = _.filter(witnessesArray, function(witness) {
				return _.contains(chosenCategories, witness.category);
			});

			renderWitnesses(filteredWitnesses);
		});

	$('.evidence-section ul.categories', master)
		.html(_.templates.categories({
			categories: evidenceCategories
		}))
		.on('click', 'button', function(e) {
			$(this).toggleClass('btn--disabled');

			var chosenCategories = $('.evidence-section ul.categories li button:not(.btn--disabled)', master).map(function() {
				var classes = $(this).attr('class').split(' ');
				var category = classes.filter(function(klass) {
					var match = klass.match(/^categoryName(.*)/);
					return match;
				})[0];
				return category.match(/^categoryName(.*)/)[1];
			}).get();

			var	filteredEvidence = _.filter(evidenceArray, function(evidence) {
				return _.contains(chosenCategories, evidence.category);
			});

			renderEvidence(filteredEvidence);
		});

	function renderWitnesses(witnesses) {

		$('.witnesses-section ul.list', master).html(_.templates.witnesses({
			witnesses: witnesses,
			evidences: evidenceDict,
			categories: witnessCategories
		}));
	}
	renderWitnesses(witnessesArray);

	function renderEvidence(evidence) {

		$('.evidence-section ul.list', master).html(_.templates.evidence({
			evidences: evidence,
			witnesses: witnessesDict,
			categories: evidenceCategories
		}));
	}
	renderEvidence(evidenceArray);

};

$.ajax({
	url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
	dataType: 'jsonp',
	jsonpCallback: 'loadedTsarnaevTrial'
});