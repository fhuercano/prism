// Load dependencies
var fs = require('fs');
var components = require('./../components.js');

var contentLangs = [];
var insertedLang = {};
var toBeInserted = [];

var files = [{
  'langKey': 'core',
  'require': false
}];

for (language in components.languages) {
  if (language && language !== 'meta' && components.languages[language]) {
    files.push({
      'langKey': (language + ''),
      'require': (components.languages[language]['require'] || false)
    });
  }
}

var filesNum = files.length;

var i = 0;
var ii = 0;

console.log('====== WHILE ======');

while (files.length) {
  if (!files[i]) {
    i = 0;
  }
  else if (!files[i].require || insertedLang[files[i].require]) {
    var removed = files.splice(i, 1).pop();
    insertedLang[removed['langKey']] = true;
    toBeInserted.push(removed['langKey']);
    i = 0;
  }
  else if (i >= filesNum || i >= files.length) {
    i = 0;
  }
  else {
    i++;
  }
  if (ii > 100) {
    break;
  }
  ++ii;
}


var handleError = function (error) {
  console.log('An error occured.');
  console.log(error);
};

var contentLangsNum = 0;

var handleFile = function (fileName) {
  fs.readFile('./components/prism-' + fileName + '.js', function(error, data) {
    if (error) return finishAll(error);

    contentLangs.push(data.toString('utf8'));
    contentLangsNum++;

    if (contentLangsNum === filesNum) return finishAll(null);

    handleFile(toBeInserted.shift());

  });
};

finishAll = function (error) {

  if (error) return handleError(error);

  var prismBuild = contentLangs.shift();
  prismBuild = prismBuild.replace('/' + '*<Plugins>*' + '/', contentLangs.join('\n\n'));

  fs.writeFile('./build/prism.js', prismBuild, 'utf8', function (error) {
    if (error) return handleError(error);
    console.log('Done.\n');
  });

};

handleFile(toBeInserted.shift());
