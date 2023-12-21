const formatSwitcher = document.querySelector('.format-switcher');
const formatButtons = document.querySelectorAll('.format-switcher__button');

function setupSwitcher() {
	const savedFormat = getSavedFormat();

	if (savedFormat !== null) {
		const currentButton = formatSwitcher.querySelector(`[value=${savedFormat}]`);
		pressButton(currentButton, true);
	}

	formatSwitcher.addEventListener('click', (event) => {
		const isButton = event.target.tagName === 'BUTTON';
		const isPressed = event.target.getAttribute('aria-pressed') === 'true';

		if (!isButton || isPressed) return;

		pressButton(event.target, true);
		setFormat(event.target.value);
	})
}

function pressButton(button, press) {
	for (let button of formatButtons) {
		button.setAttribute('aria-pressed', !press);
	}
	button.setAttribute('aria-pressed', press);
}

function getSavedFormat() {
	return localStorage.getItem('experience-format');
}

function setFormat(format) {
	localStorage.setItem('experience-format', format);
}

setupSwitcher();
