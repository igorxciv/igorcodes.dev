const yaml = require('js-yaml');
const lightningcss = require('lightningcss');
const prettyData = require('pretty-data');
const htmlMin = require('html-minifier-terser');
const markdown = require('markdown-it')({ html: true });
const packageJson = require('./package.json');

module.exports = (config) => {
	const collections = {
		pages: 'src/pages/!(404)/index.njk'
	}

	config.addCollection('sitemap', (collection) => collection.getFilteredByGlob([
		collections.pages
	]));

	// Markdown

	config.addFilter('markdown', (value) => {
		return markdown.render(value);
	});

	config.setLibrary('md', markdown);

	// YAML
	config.addDataExtension('yml', (contents) => yaml.load(contents));

	// HTML

	config.addTransform('html-minify', async (content, path) => {
		if (path && path.endsWith('.html')) {
			return htmlMin.minify(content, {
				collapseBooleanAttributes: true,
				collapseWhitespace: true,
				decodeEntities: true,
				includeAutoGeneratedTags: false,
				removeComments: true,
			})
		}
		return content;
	});

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

	// XML

	config.addTransform('xmlMin', (content, path) => {
		if (path && path.endsWith('.xml')) {
			return prettyData.pd.xmlmin(content);
		}

		return content;
	});

	// Dates

	config.addFilter('dateISO', (value) => {
		return value.toISOString().split('T')[0];
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
