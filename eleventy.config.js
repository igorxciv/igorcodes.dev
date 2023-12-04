const yaml = require('js-yaml');
const lightningcss = require('lightningcss');
const packageJson = require('./package.json');

module.exports = (config) => {
	// YAML
	config.addDataExtension('yml', (contents) => yaml.load(contents));

	// CSS
	const styles = [
		'./src/styles/index.css',
		'./src/styles/light.css',
		'./src/styles/dark.css',
	];

	const processStyles = (path) => lightningcss.bundle({
		filename: path,
		minify: true,
		sourceMap: false,
		targets: lightningcss.browserslistToTargets(packageJson.browserslist),
		include: lightningcss.Features.MediaQueries | lightningcss.Features.Nesting
	});

	config.addTemplateFormats('css');

	config.addExtension('css', {
		outputFileExtension: 'css',
		compile: async (content, path) => {
			if (!styles.includes(path)) return;

			return async () => {
				const { code } = await processStyles(path);
				return code;
			}
		}
	});

	config.addFilter('css', async (path) => {
		const { code } = await processStyles(path);
		return code;
	});

	// Passthrough copy
	[
		'src/robots.txt',
		'src/fonts',
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
