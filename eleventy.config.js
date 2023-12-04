const yaml = require('js-yaml');

module.exports = (config) => {
	// YAML

	config.addDataExtension('yml', (contents) => {
		return yaml.load(contents);
	});

	// Passthrough copy
	[
		'src/robots.txt'
	].forEach((path) => config.addPassthroughCopy(path));

	return {
		dir: {
			input: 'src',
			output: 'dist',
			includes: 'includes',
			layouts: 'layouts',
			data: 'data',
		},
		dataTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		templateFormats: ['md', 'njk'],
	}
}
