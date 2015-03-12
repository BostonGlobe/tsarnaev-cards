module.exports = function(json, isLive) {

	function log(s) {
		console.log(JSON.stringify(s,null,4));
	}

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

	// For each witness,
	_.forEach(witnesses, function(value) {

		var witness = value;

		// find the days it belongs to and add the witness key to each day.
		value.days.split(',').map(function(value) {
			return 'd' + value; // e.g. 'd2'
		}).forEach(function(value) {
			var day = days[value]; // e.g. get the 'd2' day

			if (day && witness.key) {
				day.witnesses.push(witness.key);
			}
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

			if (day && evidence.key) {
				day.evidences.push(evidence.key);
			}
		});

	});

	// Convert the days hash back to an array
	// so we can sort it and keep it sorted.
	var sortedDays = _.chain(days)
		.toArray()
		.sortBy(function(value) {
			return -(+value.day);
		})
		.value();

	return {
		days: sortedDays,
		witnesses: witnesses,
		evidences: evidences
	};

};