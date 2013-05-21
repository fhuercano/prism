// Load dependencies
var fs = require('fs');

// Load components
var components = require('./../components.js');

var files = [{
	'langKey': 'core'
}];

// add language definition from components
for (language in components.languages) {
	if (language && language !== 'meta' && components.languages[language]) {
		files.push({
			'langKey': language + '',
			'require': components.languages[language]['require'] || false
		});
	}
}

var filesNum = files.length;

var i = 0;
var totalRuns = 0;

var insertedLang = {};
var toBeInserted = [];

// Load files according to their requirements
// Languages without require go first; if required already available, load the new lang too
while (files.length) {
	if (!files[i]) {
		i = 0;
	}
	else if (!files[i].require || insertedLang[files[i].require]) {
		var found = files.splice(i, 1).pop();
		insertedLang[found['langKey']] = true;
		toBeInserted.push(found['langKey']);
		i = 0;
	}
	else if (i >= filesNum || i >= files.length) {
		i = 0;
	}
	else {
		i++;
	}
	if (totalRuns > 100) {
		// too many runs, exit
		console.error('Too many runs. Are there all required files?');
		console.log(JSON.stringify(files, null, '\t'));
		console.error('Unhandled files list above:');
		process.exit();
		break;
	}
	totalRuns++;
}

// work with the toBeInserted files-list, already in the right order
var loadedLangs    = [];
var loadedLangsNum = 0;

function handleError (error) {
	console.log('An error occured.');
	console.log(error);
	process.exit();
};

function handleFile (fileNamePart) {
	fs.readFile('./components/prism-' + fileNamePart + '.js', function(error, data) {
		if (error) return finishAll(error);

		loadedLangs.push(data.toString('utf8'));
		loadedLangsNum++;

		if (loadedLangsNum === filesNum) return finishAll(null);

		handleFile(toBeInserted.shift());

	});
};

function finishAll (error) {

	if (error) return handleError(error);

	var prismBuild = loadedLangs.shift();
	prismBuild = prismBuild.replace('/' + '*<Plugins>*' + '/', loadedLangs.join('\n\n'));

	fs.writeFile('./build/prism.js', prismBuild, 'utf8', function (error) {
		if (error) return handleError(error);
		console.log('Done.\n');
	});

};

handleFile(toBeInserted.shift());
