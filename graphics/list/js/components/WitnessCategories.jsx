var React = require('react/addons');
var PubSub = require('pubsub-js');
var colors = require('../../../../common/js/colors.js');

var WitnessCategories = React.createClass({

	statics: {
		topics: function() {
			return {
				CategoriesChange: 'WitnessCategories_CategoriesChange'
			};
		}
	},

	render: function() {

		var cx = React.addons.classSet;
		var categories = this.props.categories;
		var selectedCategories = this.props.selectedCategories;

		// width equation is 100 = n*w + (n-1)*p
		// or w(p) = [100-(n-1)*p]/n
		var p = 1;
		var n = categories.length;
		var width = (100-(n-1)*p)/n;

		var self = this;

		var items = categories.map(function(category, index, array) {

			var classes = {
				'btn': true,
				'btn--disabled': !_.contains(selectedCategories, category)
			};

			var liStyle = {
				width: width + '%',
				'marginRight': index === array.length - 1 ? '0' : p + '%'
			};

			var buttonStyle = {
				'backgroundColor': colors[index]
			};

			return (
				<li style={liStyle} key={index}>
					<button style={buttonStyle} className={cx(classes)} onClick={self.handleButtonClick.bind(self, category)}>{category}</button>
				</li>
			);
		});

		return (
			<ul className='categories'>
				{items}
			</ul>
		);
	},

	handleButtonClick: function(category, e) {
		var isDisabled = e.currentTarget.className.match(/\bbtn--disabled\b/);
		PubSub.publish(WitnessCategories.topics().CategoriesChange, {
			category: category,
			select: isDisabled
		});
	}

});

module.exports = WitnessCategories;