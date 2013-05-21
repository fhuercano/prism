var Prism = require('./build/prism');

var prismRunner = function (runningFunction, text, language, callback) {
	var grammar = Prism.languages[language] || null;
	if (!grammar) {
		var err = new Error('Language definition for language "' + language + '" was not found.');
		if (!callback) {
			return err;
		}
		return callback(err);
	}
	if (!callback) {
		return Prism[runningFunction](text, grammar, language);
	}
	else {
		return callback(void 0, Prism[runningFunction](text, grammar, language));
	}
};

exports.highlight = function (text, language, callback) {
	return prismRunner('highlight', text, language, callback);
};
exports.tokenize = function (text, language, callback) {
	return prismRunner('tokenize', text, language, callback);
};

exports.languages = Prism.languages;
exports.Prism = Prism
