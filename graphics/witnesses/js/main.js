var master = $('.igraphic-graphic.witnesses');

var Velocity = require('velocity-animate');

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

			var chosenCategories = $('ul.categories li button:not(.btn--disabled)', $witnesses).map(function() {
				return $(this).parent().attr('class');
			}).get();

			var	filteredWitnesses = _.filter(witnessesArray, function(witness) {
				return _.contains(chosenCategories, witness.category);
			});

			renderWitnesses(filteredWitnesses);

		});

	var animationOptions = {
		duration: 400,
		easing: [0.23, 1, 0.32, 1]
	};

	$witnesses.on('click', '.shaybrawn', function(e) {

		var parent = $(this).parents('li');

		var associatedSpacerHeight = 0;

		// drawer is expanded
		if (parent.hasClass('expanded')) {

			// animate shaybrawn down
			$('.to-down', this).get(0).beginElement();

			// collapse associated spacer
			Velocity($('.associated-spacer', parent), {
				height: 0
			}, animationOptions);

		} else {

			// drawer is collapsed
			// animate shaybrawn up
			$('.to-up', this).get(0).beginElement();

			// find the right associated spacer height
			associatedSpacerHeight = $('.associated', parent).outerHeight(true);

			Velocity($('.associated-spacer', parent), {
				height: associatedSpacerHeight
			}, animationOptions);

		}

		parent.toggleClass('expanded');

	});

	renderWitnesses(witnessesArray);
};

$.ajax({
	url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
	dataType: 'jsonp',
	jsonpCallback: 'loadedTsarnaevTrial'
});