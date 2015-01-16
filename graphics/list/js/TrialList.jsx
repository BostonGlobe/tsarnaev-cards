var React = require('react');
var PubSub = require('pubsub-js');
var prepareData = require('../../../common/js/prepareData.js');

var IGraphicMast = require('../../../common/js/components/IGraphicMast.jsx');
var IGraphicHeader = require('../../../common/js/components/IGraphicHeader.jsx');
var Witnesses = require('./components/Witnesses.jsx');
var WitnessCategories = require('./components/WitnessCategories.jsx');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			selection: null, // e.g. '#Gun-e1' or '#JohnDoe-w3',
			witnessCategories: [],
			witnessSelectedCategories: []
		};
	},

	componentWillMount: function() {

		var self = this;

		// setup all the subscriptions
		PubSub.subscribe(WitnessCategories.topics().CategoriesChange, self.handleCategoriesChange);
	},

	render: function() {

					// <Witnesses witnesses={this.state.witnesses} />

		return (
			<div>
				<IGraphicMast title={'Boston Marathon bombing trial'} />
				<IGraphicHeader
					hed={'Tsarnaev trial witnesses and evidence'}
					subhed={'Lorem ipsum Exercitation ad do id id aliqua nisi esse consequat tempor mollit exercitation culpa tempor cupidatat Ut in in fugiat quis ea occaecat elit Excepteur est nulla culpa magna do eiusmod Ut. Lorem ipsum Dolore adipisicing Excepteur qui ad dolore veniam adipisicing amet cupidatat ad cupidatat velit in eu qui pariatur proident voluptate Ut in nisi.'}
				/>
				<section>
					<div className='title'>Witnesses</div>
					<WitnessCategories categories={this.state.witnessCategories} selectedCategories={this.state.witnessSelectedCategories} />
				</section>
			</div>
		);
	},

	componentDidMount: function() {

		var self = this;

		window.loadedTsarnaevTrial = function(json) {

			var data = prepareData(json);

			function getCategories(array) {
				return _.chain(array)
					.pluck('category')
					.uniq()
					.sortBy(function(v) {
						return v;		
					})
					.value();
			}

			var witnesses = _.values(data.witnesses);
			var witnessCategories = getCategories(witnesses);

			self.setState({
				witnessCategories: witnessCategories,
				witnessSelectedCategories: witnessCategories
			});
		};
	
		$.ajax({
			url: 'http://www.boston.com/partners/tsarnaevtrial.jsonp',
			dataType: 'jsonp',
			jsonpCallback: 'loadedTsarnaevTrial'
		});
	},

	handleCategoriesChange: function(topic, data) {

		// if data.select is true, add data.category to the list of selected categories
		// otherwise remove from list
		var categories;
		var select = data.select;
		var category = data.category;
		if (select) {
			categories = _.uniq(this.state.witnessSelectedCategories.concat([category]));
		} else {
			categories = _.reject(this.state.witnessSelectedCategories, function(x) {
				return x === category;
			});
		}

		this.setState({
			witnessSelectedCategories: categories
		});
	}

});