module.exports = function(json, isLive) {

	function log(s) {
		console.log(JSON.stringify(s,null,4));
	}

	// Convert arrays to hashes.
	var witnesses = _.chain(json['data-witness'])
		.filter(function(v, i) {
			return v.category;
		})
		.filter(function(v, i) {
			if (isLive) {
				return v.publish === 'Yes';
			} else {
				return true;
			}
		})
		.indexBy('key')
		.value();

	var evidences = _.chain(json['data-evidence'])
		.filter(function(v, i) {
			return v.category;
		})
		.filter(function(v, i) {
			if (isLive) {
				return v.publish === 'Yes';
			} else {
				return true;
			}
		})
		.indexBy('key')
		.value();

	return {
		witnesses: witnesses,
		evidences: evidences
	};

};