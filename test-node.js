Prism = require('./prism-node.js');

if (Prism) {
	console.log('==== Prism ====');
	console.log(Prism.highlight('var a = new Animal({"color":"rainbow"});', 'javascript'));
}
else {
	console.error('Something went wrong. There is no Prism for NodeJS');
}