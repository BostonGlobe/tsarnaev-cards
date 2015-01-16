var React = require('react/addons');
var PubSub = require('pubsub-js');

var React = require('react');


var Category = React.createClass({

	render: function() {
		return (
			<li>
				{this.props.category}
			</li>
		);
	}

});

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

		// width equation is 100 = n*w + (n-1)*p
		// or w(p) = [100-(n-1)*p]/n
		var p = 1;
		var n = categories.length;
		var width = (100-(n-1)*p)/n;

		var self = this;

		var items = categories.map(function(category) {
			return (
				<Category category={category} categories={categories} />
			);
		});

		return (
			<ul className='categories'>
				{items}
			</ul>
		);
	},

	handleButtonClick: function(e) {
		var classes = e.currentTarget.className.split(' ');
		debugger;
		PubSub.publish(WitnessCategories.topics().CategoriesChange, 'a');
	}

});

module.exports = WitnessCategories;











			// var classes = {
			// 	'btn': true
			// };

			// classes['categoryNumber' + index] = true;
			// classes['categoryName' + category] = true;

			// var style = {
			// 	width: width + '%',
			// 	'marginRight': index === array.length - 1 ? '0' : p + '%'
			// };

			// return (
			// 	<li style={style} key={index}>
			// 		<button className={cx(classes)} onClick={self.handleButtonClick}>{category}</button>
			// 	</li>
			// );
