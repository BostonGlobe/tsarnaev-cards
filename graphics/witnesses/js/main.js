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
	var evidenceCategories = ['All'].concat(getCategories(evidenceArray));

	var $witnesses = $('section.witnesses', master);
	var $evidence = $('section.evidence', master);

	function renderWitnesses(witnesses) {
		$('ul.list', $witnesses).html(_.templates.witnesses({
			witnesses: witnesses,
			evidences: evidenceDict,
			categories: witnessCategories
		}));
	}

	function renderEvidence(evidence) {
		$('ul.list', $evidence).html(_.templates.evidence({
			evidences: evidence,
			witnesses: witnessesDict,
			categories: evidenceCategories
		}));
	}

	function filterWitnesses(category) {

		var items = $('ul.list > li', $witnesses);

		if (category === 'All') {

			// if 'All', show all items
			items.show();

		} else {

			// else only show category items
			items.hide();
			$("ul.list li[data-category='" + category + "']", $witnesses).show();

		}

	}

	function filterEvidence(category) {

		var items = $('ul.list > li', $evidence);

		if (category === 'All') {

			// if 'All', show all items
			items.show();

		} else {

			// else only show category items
			items.hide();
			$("ul.list li[data-category='" + category + "']", $evidence).show();

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

	$('ul.categories', $evidence)
		.html(_.templates.categories({
			categories: evidenceCategories
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

			// and filter evidence accordingly
			filterEvidence(chosenCategory);
		});

	var animationOptions = {
		duration: 400,
		easing: [0.23, 1, 0.32, 1]
	};

	function handleDrawerClick(e) {

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
	}

	$witnesses.on('click', '.shaybrawn', handleDrawerClick);
	$evidence.on('click', '.shaybrawn', handleDrawerClick);

	renderWitnesses(witnessesArray);
	renderEvidence(evidenceArray);

	$('ul.categories li:eq(0) button', $witnesses).click();
	$('ul.categories li:eq(0) button', $evidence).click();

	// if there is a hash in location, navigate to it
	function dealWithHash() {

		var key;
		var anchor;

		if (location.hash) {

			key = location.hash.replace('#', '');
			anchor = getAnchorByKey(key);
			anchor.get(0).scrollIntoView();
			expandDrawerByAnchor(anchor);
		}

	}

	function getAnchorByKey(key) {
		return $('a[name="' + key + '"]');
	}

	function expandDrawerByAnchor(anchor) {

		var match = anchor.parents('li');

		// if this drawer is collapsed, expand it
		if (!match.hasClass('expanded')) {
			$('.shaybrawn', match).click();
		}
	}

	$('section', master).on('click', '.associated a', function(e) {

		e.preventDefault();

		var key = $(this).attr('href').replace('#', '');

		var anchor = getAnchorByKey(key);
		var drawer = anchor.parents('li');
		var category;

		// if the drawer isn't visible,
		if (!drawer.is(':visible')) {

			// the user has hidden it via a category button.
			// so find the category button, click it, then do the rest.

			// is this witness?
			if (key[0] === 'w') {

				category = witnessesDict[key].category;
				$('ul.categories li button', $witnesses).filter(function() {
					return $(this).text().trim() === category;
				}).click();

			} else {

				category = evidenceDict[key].category;
				$('ul.categories li button', $evidence).filter(function() {
					return $(this).text().trim() === category;
				}).click();
			}
		}

		// next, expand drawer
		expandDrawerByAnchor(anchor);

		// and scroll to it
		location.hash = '#' + key;
	});

	dealWithHash();
};

$.ajax({
	url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
	dataType: 'jsonp',
	jsonpCallback: 'loadedTsarnaevTrial'
});