var React = require('react');

var IGraphicMast = require('../../../common/js/components/IGraphicMast.jsx');
var IGraphicHeader = require('../../../common/js/components/IGraphicHeader.jsx');

var TrialList = React.createClass({

	render: function() {

		return (
			<div>
				<IGraphicMast title={'Boston Marathon bombing trial'} />
				<IGraphicHeader
					hed={'Tsarnaev trial witnesses and evidence'}
					subhed={'Lorem ipsum Exercitation ad do id id aliqua nisi esse consequat tempor mollit exercitation culpa tempor cupidatat Ut in in fugiat quis ea occaecat elit Excepteur est nulla culpa magna do eiusmod Ut. Lorem ipsum Dolore adipisicing Excepteur qui ad dolore veniam adipisicing amet cupidatat ad cupidatat velit in eu qui pariatur proident voluptate Ut in nisi.'}
				/>
			</div>
		);
	}
});

module.exports = TrialList;