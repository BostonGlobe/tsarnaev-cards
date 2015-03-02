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
	}
};