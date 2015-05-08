var master = $('.igraphic-graphic.witnesses');

var isLive = (location.host === 'www.bostonglobe.com' || location.host === 'bostonglobe.com');

// This file will convert the raw data into something usable.
var prepareData = require('../../../common/js/prepareData.js');

var util = require('../../../common/js/util.js');

function log(s) {
	console.log(JSON.stringify(s,null,4));
}

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

function populateWitnessDetails(container, witness) {

	container.html(_.templates.witnesses_details({
		witness: witness,
		evidences: evidenceDict
	}));
}

function populateEvidenceDetails(container, evidence) {

	container.html(_.templates.evidence_details({
		evidence: evidence,
		witnesses: witnessesDict
	}));

	brightcove.createExperiences();
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

	} else {

		// drawer is collapsed
		// animate shaybrawn up
		$('.to-up', this).get(0).beginElement();

		var sectionParent = $(this).parents('section');

		// only populate details if necessary
		if (!$('.details', parent).length) {

			// find the item in question
			// it's a witness
			if (sectionParent.hasClass('witnesses')) {

				populateWitnessDetails(
					$('.drawer-wrapper', parent),
					_.find(witnessesArray, {key: $('a.anchor', parent).attr('key')})
				);

			} else {

				// it's an evidence
				populateEvidenceDetails(
					$('.drawer-wrapper', parent),
					_.find(evidenceArray, {key: $('a.anchor', parent).attr('key')})
				);

			}
		}
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

function extractKeyFromHash(hash) {

	var match = hash.match(/#((e|w)\d+)/);
	var key = null;

	if (match) {
		key = match[1];
	}

	return key;
}

// if there is a hash in location, navigate to it
function dealWithHash() {

	var anchor;

	if (location.hash) {

		anchor = getAnchorByHash(location.hash.split('?')[0]);
		anchor.get(0).scrollIntoView();
		expandDrawerByAnchor(anchor);
	}
}

function getAnchorByHash(hash) {
	return $('a[name="' + hash.replace('#', '') + '"]');
}

function expandDrawerByAnchor(anchor) {

	var match = anchor.parents('li');

	// if this drawer is collapsed, expand it
	if (!match.hasClass('expanded')) {
		$('.shaybrawn', match).click();
	}
}

var witnessesArray;
var witnessesDict;
var evidenceArray;
var evidenceDict;
var witnessCategories;
var evidenceCategories;

function loadJsonData(json) {

	// Parse incoming JSON feed into something useful.
	var data = prepareData(json, isLive);

	// Create several convenience arrays and dictionaries.
	witnessesArray = _.values(data.witnesses);
	witnessesDict = data.witnesses;
	evidenceArray = _.values(data.evidences);
	evidenceDict = data.evidences;
	witnessCategories = ['All'].concat(getCategories(witnessesArray));
	evidenceCategories = ['All'].concat(getCategories(evidenceArray));

	// Create convenience jQuery variables.
	var $witnesses = $('section.witnesses', master);
	var $evidence = $('section.evidence', master);

	// Create the witness category buttons and wire them up.
	$('ul.categories', $witnesses)
		.html(_.templates.categories({
			categories: witnessCategories
		}))
		.on('click', 'button', handleCategoryClick);

	// Create the evidence category buttons and wire them up.
	$('ul.categories', $evidence)
		.html(_.templates.categories({
			categories: evidenceCategories
		}))
		.on('click', 'button', handleCategoryClick);

	// Wire up the drawer chevrons.
	$('section', master).on('click', '.shaybrawn', handleShayBrawnClick);

	// Wire up the drawers (if collapsed, clicking should open it).
	$('section').on('click', '.wrapper', handleDrawerClick);

	// Create the witness list.
	$('ul.list', $witnesses).html(_.templates.witnesses({
		witnesses: witnessesArray,
		categories: witnessCategories
	}));

	// Create the evidence list.
	$('ul.list', $evidence).html(_.templates.evidence({
		evidences: evidenceArray,
		categories: evidenceCategories
	}));

	// Click the first category buttons (All).
	$('section ul.categories li:eq(0) button', master).click();

	// Wire up the image curtains.
	$('section', master).on('click', '.media button', function(e) {

		var curtain = $(this).parents('.curtain');
		curtain.fadeOut();
	});

	// // Wire up the associated links.
	// $('section', master).on('click', '.associated a', function(e) {

	// 	e.preventDefault();

	// 	var hash = $(this).attr('href');
	// 	var key = extractKeyFromHash(hash);

	// 	var anchor = getAnchorByHash(hash);
	// 	var drawer = anchor.parents('li');
	// 	var category;

	// 	// if the drawer isn't visible,
	// 	if (!drawer.is(':visible')) {

	// 		// the user has hidden it via a category button.
	// 		// so find the category button, click it, then do the rest.

	// 		// is this witness?
	// 		if (key[0] === 'w') {

	// 			category = witnessesDict[key].category;
	// 			$('ul.categories li button', $witnesses).filter(function() {
	// 				return $(this).text().trim() === category;
	// 			}).click();

	// 		} else {

	// 			category = evidenceDict[key].category;
	// 			$('ul.categories li button', $evidence).filter(function() {
	// 				return $(this).text().trim() === category;
	// 			}).click();
	// 		}
	// 	}

	// 	// next, expand drawer
	// 	expandDrawerByAnchor(anchor);

	// 	// if location hash is the same, use scrollintoview
	// 	if (location.hash && location.hash === hash) {

	// 		anchor.get(0).scrollIntoView();

	// 	} else {

	// 		// otherwise let location hash handle the scrolling
	// 		location.hash = hash;
	// 	}

	// });

	dealWithHash();
}

window.loadedTsarnaevTrial = loadJsonData;
window.TsarnaevTrialPreview = loadJsonData;

if (isLive) {
	$.ajax({
		url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
		dataType: 'jsonp',
		jsonpCallback: 'loadedTsarnaevTrial'
	});
} else {
	$.getJSON('http://private.boston.com/newsprojects/2015/tsarnaev-witness/', function(json) {
		$.ajax({
			url: json.url,
			dataType: 'jsonp',
			jsonpCallback: 'TsarnaevTrialPreview'
		});
	});
}