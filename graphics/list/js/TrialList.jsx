var React = require('react');

var IGraphicHeader = require('../../../common/js/components/IGraphicHeader.jsx');

var TrialList = React.createClass({

	render: function() {

		return (
			<div>
				<IGraphicHeader title={'Boston Marathon bombing trial'} />
			</div>
		);
	}
});

module.exports = TrialList;