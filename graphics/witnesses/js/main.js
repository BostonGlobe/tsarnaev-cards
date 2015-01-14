var master = $('.igraphic-graphic.witnesses');

var prepareData = require('../../../common/js/prepareData.js');

// var colors = require('../../../common/js/colors.js');

window.loadedTsarnaevTrial = function(json) {

	var data = prepareData(json);

	var witnesses = _.values(data.witnesses);

	var categories = _.chain(witnesses)
		.pluck('category')
		.uniq()
		.sortBy(function(v, i) {
			return v;		
		})
		.value();

	function renderItemsByCategories(chosenCategories) {

		var	filteredWitnesses = _.filter(witnesses, function(witness) {
			return _.contains(chosenCategories, witness.category);
		});
		
		// if chosenCategories is null, don't filter
		$('ul.list', master).html(_.templates.witnesses({
			witnesses: filteredWitnesses,
			evidences: data.evidences,
			categories: categories
		}));
	}

	$('ul.categories', master)
		.html(_.templates.categories({
			categories: categories
		}))
		.on('click', 'button', function(e) {
			$(this).toggleClass('btn--disabled');

			var chosenCategories = $('ul.categories li button:not(.btn--disabled)', master).map(function() {
				var classes = $(this).attr('class').split(' ');
				var category = classes.filter(function(klass) {
					var match = klass.match(/^categoryName(.*)/);
					return match;
				})[0];
				return category.match(/^categoryName(.*)/)[1];
			}).get();

			renderItemsByCategories(chosenCategories);
		});

	renderItemsByCategories(categories);

};

$.ajax({
	url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
	dataType: 'jsonp',
	jsonpCallback: 'loadedTsarnaevTrial'
});