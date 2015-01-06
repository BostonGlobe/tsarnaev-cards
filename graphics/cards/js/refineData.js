module.exports = function(json) {

	// data-witness and data-evidence have 'key'. Add one to data-daily.
	json['data-daily'].forEach(function(value) {
		value.key = 'd' + value.day;
	});

	var days = _.chain(json['data-daily'])
		.map(function(value) {

			// Add witnesses and evidences properties to each day.
			_.extend(value, {
				'witnesses': [],
				'evidences': []
			});
			return value;
		})
		// Convert array to hash.
		.indexBy('key')
		.value();

	// Convert arrays to hashes.
	var witnesses = _.indexBy(json['data-witness'], 'key');
	var evidences = _.indexBy(json['data-evidence'], 'key');

	// For each witness,
	_.forEach(witnesses, function(value) {

		var witness = value;

		// find the days it belongs to and add the witness key to each day.
		value.days.split(',').map(function(value) {
			return 'd' + value;
		}).forEach(function(value) {
			var day = days[value];
			day.witnesses.push(witness.key);
		});

	});

	// For each evidence,
	_.forEach(evidences, function(value) {

		var evidence = value;

		// find the days it belongs to and add the evidence key to each day.
		value.days.split(',').map(function(value) {
			return 'd' + value;
		}).forEach(function(value) {
			var day = days[value];
			day.evidences.push(evidence.key);
		});

	});

	return {
		days: days,
		witnesses: witnesses,
		evidences: evidences
	};

};