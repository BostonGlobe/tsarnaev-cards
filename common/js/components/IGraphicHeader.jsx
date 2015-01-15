var React = require('react');

module.exports = React.createClass({

	render: function() {
		return (
			<div className='igraphic-header'>
				<div className='hed'>{this.props.hed}</div>
				<hr />
				<div className='subhed'>{this.props.subhed}</div>
			</div>
		);
	}

});