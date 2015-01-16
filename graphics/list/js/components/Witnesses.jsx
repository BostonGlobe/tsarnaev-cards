var React = require('react');

module.exports = React.createClass({

	render: function() {
		return (
			<div className='witnesses'>
				<div className='title'>{this.props.title}</div>
				<div className='categories'></div>
				<div className='items'></div>
			</div>
		);
	}

});