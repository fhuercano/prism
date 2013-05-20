;(function () {
	"use strict";

var components = {
	core: {
		meta: {
			path: 'components/prism-core.js',
			option: 'mandatory'
		},
		'core': 'Core'
	},
	themes: {
		meta: {
			path: '{id}.css',
			link: 'index.html?theme={id}',
			exclusive: true
		},
		'prism': {
			title: 'Default',
			option: 'default'
		},
		'prism-dark': 'Dark',
		'prism-funky': 'Funky',
		'prism-okaidia': 'Okaidia'
	},
	plugins: {
		meta: {
			path: 'plugins/{id}/prism-{id}',
			link: 'plugins/{id}/',
			hasCSS: true
		},
		'line-highlight': 'Line Highlight',
		'line-numbers': 'Line Numbers',
		'show-invisibles': 'Show Invisibles',
		'autolinker': 'Autolinker',
		'wpd': 'WebPlatform Docs',
		'file-highlight': 'File Highlight'
	},
	languages: {
		meta: {
			path: 'components/prism-{id}'
		},
		'markup': {
			title: 'Markup',
			option: 'default'
		},
		'css': {
			title: 'CSS',
			option: 'default'
		},
		'clike': {
			title: 'C-like',
			option: 'default'
		},
		'javascript': {
			title: 'JavaScript',
			option: 'default',
			require: 'clike'
		},
		'java' : {
			title: 'Java',
			require: 'clike'
		},
		'php' : {
			title: 'PHP',
			require: 'clike'
		},
		'coffeescript': {
			title: 'CoffeeScript',
			require: 'javascript'
		},
		'scss': {
			title: 'Sass (Scss)',
			require: 'css'
		},
		'bash' : {
			title: 'Bash',
			require: 'clike'
		},
		'c': {
			title: 'C',
			require: 'clike'
		},
		'cpp': {
			title: 'C++',
			require: 'c'
		},
		'python': {
			title: 'Python'
		},
		'sql': {
			title: 'SQL'
		},
		'groovy': {
			title: 'Groovy',
			require: 'clike'
		}
	}
};

// export components, when module is present, or pass it to window or global
if (typeof module !== "undefined") {
	module.exports = components;
}
else if (typeof define !== "undefined") {
	define([],function() {
		return components;
	});
}
else if (typeof window !== "undefined") {
	window['components'] = components;
}
else {
	global.components = components;
}

})();