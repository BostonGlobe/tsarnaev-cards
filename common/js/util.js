module.exports = {
	toSentenceCase: function(s) {
		return s;
		// return s.substring(0, 1).replace(/^[a-z]/i, function(x) {
		// 	return x.toUpperCase();
		// }) + s.substring(1).toLowerCase();
	},

	evidenceTitle: function(evidence) {
		return this.toSentenceCase(evidence.title);
	},

	witnessTitle: function(witness) {
		return [witness.first, witness.last].join(' ');
	},

	slug: function(s) {
		return s.replace(/\W/g, '');
	},

	evidenceSlug: function(evidence) {
		return this.slug(this.evidenceTitle(evidence));
	},

	witnessSlug: function(witness) {
		return this.slug(this.witnessTitle(witness));
	},

	standardWitnessImage: function(url) {

		var re = new RegExp('(https?://c.o0bg.com/rf/image_)(\\d+w/)(.*)');

		var match = url.match(re);

		var result;

		if (match) {

			result = [match[1], '150x150/', match[3], match[4]].join('');

		} else {

			result = url;
		}

		return result;
	},

	standardEvidenceImage: function(url) {

		var re = new RegExp('(https?://c.o0bg.com/rf/image_)(\\d+w/)(.*)');

		var match = url.match(re);

		var result;

		if (match) {

			result = [match[1], '585w/', match[3]].join('');

		} else {

			result = url;
		}

		return result;
	}
};