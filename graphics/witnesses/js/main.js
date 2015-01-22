var master = $('.igraphic-graphic.witnesses');

var Velocity = require('velocity-animate');

// This file will convert the raw data into something usable.
var prepareData = require('../../../common/js/prepareData.js');

// function setupSection() {

// }

function getCategories(array) {

	return _.chain(array)
		.pluck('category')
		.uniq()
		.sortBy(function(v) {
			return v;		
		})
		.value();
}

function filterItems(category, parent) {
	var items = $('ul.list > li', parent);

	if (category === 'All') {

		// if 'All', show all items
		items.show();

	} else {

		// else only show category items
		items.hide();
		$("ul.list li[data-category='" + category + "']", parent).show();
	}
}

function handleCategoryClick(e) {

	var ul = $(this).parents('ul');
	var parent = ul.parents('section');
	var buttons = $('button', ul);

	// disable all the other buttons
	buttons.addClass('btn--disabled');

	// and enable this one
	$(this).removeClass('btn--disabled');

	// find this category
	var chosenCategory = $(this).text().trim();

	// and filter witnesses accordingly
	filterItems(chosenCategory, parent);
}

function handleShayBrawnClick(e) {

	var animationOptions = {
		duration: 400,
		easing: [0.23, 1, 0.32, 1]
	};

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

function handleDrawerClick(e) {

	var parent = $(this).parents('li');

	// if drawer is closed, expand it
	if (!parent.hasClass('expanded')) {

		$('.shaybrawn', parent).click();
	}
}

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

window.loadedTsarnaevTrial = function(json) {

	var data = prepareData(json);

	var witnessesArray = _.values(data.witnesses);
	var witnessesDict = data.witnesses;

	var evidenceArray = _.values(data.evidences);
	var evidenceDict = data.evidences;

	var witnessCategories = ['All'].concat(getCategories(witnessesArray));
	var evidenceCategories = ['All'].concat(getCategories(evidenceArray));

	var $witnesses = $('section.witnesses', master);
	var $evidence = $('section.evidence', master);

	$('ul.categories', $witnesses)
		.html(_.templates.categories({
			categories: witnessCategories
		}))
		.on('click', 'button', handleCategoryClick);

	$('ul.categories', $evidence)
		.html(_.templates.categories({
			categories: evidenceCategories
		}))
		.on('click', 'button', handleCategoryClick);

	$witnesses.on('click', '.shaybrawn', handleShayBrawnClick);
	$evidence.on('click', '.shaybrawn', handleShayBrawnClick);

	$witnesses.on('click', '.wrapper', handleDrawerClick);
	$evidence.on('click', '.wrapper', handleDrawerClick);

	$('ul.list', $witnesses).html(_.templates.witnesses({
		witnesses: witnessesArray,
		evidences: evidenceDict,
		categories: witnessCategories
	}));

	$('ul.list', $evidence).html(_.templates.evidence({
		evidences: evidenceArray,
		witnesses: witnessesDict,
		categories: evidenceCategories
	}));

	$('ul.categories li:eq(0) button', $witnesses).click();
	$('ul.categories li:eq(0) button', $evidence).click();

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

		// if location hash is the same, use scrollintoview
		if (location.hash === '#' + key) {

			anchor.get(0).scrollIntoView();

		} else {

			// otherwise let location hash handle the scrolling
			location.hash = '#' + key;
		}

	});

	dealWithHash();
};

$.ajax({
	url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
	dataType: 'jsonp',
	jsonpCallback: 'loadedTsarnaevTrial'
});