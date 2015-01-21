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

	var witnessCategories = ['All'].concat(getCategories(witnessesArray));
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

	function filterWitnesses(category) {

		var items = $('ul.list li', $witnesses);

		if (category === 'All') {

			// if 'All', show all items
			items.show();

		} else {

			// else only show category items
			items.hide();
			$("ul.list li[data-category='" + category + "']", $witnesses).show();

		}

	}

	$('ul.categories', $witnesses)
		.html(_.templates.categories({
			categories: witnessCategories
		}))
		.on('click', 'button', function(e) {

			var ul = $(this).parents('ul');
			var buttons = $('button', ul);

			// disable all the other buttons
			buttons.addClass('btn--disabled');

			// and enable this one
			$(this).removeClass('btn--disabled');

			// find this category
			var chosenCategory = $(this).text().trim();

			// and filter witnesses accordingly
			filterWitnesses(chosenCategory);
		});

	var animationOptions = {
		duration: 400,
		easing: [0.23, 1, 0.32, 1]
	};

	$witnesses.on('click', '.shaybrawn', function(e) {

		var parent = $(this).parents('li');

		var drawerSpacerHeight = 0;

		// drawer is expanded
		if (parent.hasClass('expanded')) {

			// animate shaybrawn down
			$('.to-down', this).get(0).beginElement();

			// collapse spacer
			Velocity($('.drawer-spacer', parent), {
				height: 0
			}, animationOptions);

		} else {

			// drawer is collapsed
			// animate shaybrawn up
			$('.to-up', this).get(0).beginElement();

			// find the right drawer spacer height
			drawerSpacerHeight = $('.drawer', parent).outerHeight(true);

			// expand drawer spacer
			Velocity($('.drawer-spacer', parent), {
				height: drawerSpacerHeight
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