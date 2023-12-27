const slugify = require('@sindresorhus/slugify');

module.exports = window => {
  const headings = window.document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headings.forEach(heading => {
    const text = heading.textContent.trim();
    const id = slugify(text, {decamelize: false}).toLowerCase();

    heading.setAttribute('id', id);
  });
};
