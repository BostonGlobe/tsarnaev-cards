module.exports = {
	toSentenceCase: function(s) {
		return s.substring(0, 1).replace(/^[a-z]/i, function(x) { return x.toUpperCase(); }) + s.substring(1).toLowerCase();
	}
};