var React = require('react');

var IGraphicMast = require('../../../common/js/components/IGraphicMast.jsx');
var IGraphicHeader = require('../../../common/js/components/IGraphicHeader.jsx');

var TrialList = React.createClass({

	render: function() {

		return (
			<div>
				<IGraphicMast title={'Boston Marathon bombing trial'} />
				<IGraphicHeader title={'Boston Marathon bombing trial'} />
			</div>
		);
	}
});

module.exports = TrialList;