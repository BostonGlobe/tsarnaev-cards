var React = require('react/addons');

module.exports = React.createClass({

	render: function() {

		var cx = React.addons.classSet;
		var categories = this.props.categories;

		// width equation is 100 = n*w + (n-1)*p
		// or w(p) = [100-(n-1)*p]/n
		var p = 1;
		var n = categories.length;
		var width = (100-(n-1)*p)/n;

		var items = categories.map(function(category, index, array) {

			var classes = {
				'btn': true
			};

			classes['categoryNumber' + index] = true;

			var style = {
				width: width + '%',
				'margin-right': index === array.length - 1 ? '0' : p + '%'
			};

			return (
				<li style={style}>
					<button className={cx(classes)}>{category}</button>
				</li>
			);
		});

		return (
			<ul className='categories'>
				{items}
			</ul>
		);
	}

});