const formatSwitcher = document.querySelector('.format-switcher');
const formatButtons = document.querySelectorAll('.format-switcher__button');

function setupSwitcher() {
	formatSwitcher.addEventListener('click', (event) => {
		const isButton = event.target.tagName === 'BUTTON';
		const isPressed = event.target.getAttribute('aria-pressed') === 'true';

		if (!isButton || isPressed) return;

		pressButton(event.target, true);
	})
}

function pressButton(button, press) {
	for (let button of formatButtons) {
		button.setAttribute('aria-pressed', !press);
	}
	button.setAttribute('aria-pressed', press);
}

setupSwitcher();
