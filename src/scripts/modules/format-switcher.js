const formatSwitcher = document.querySelector('.format-switcher');
const formatButtons = document.querySelectorAll('.format-switcher__button');
const lyricalExperience = document.querySelectorAll('.experience__lyrical');
const factsExperience = document.querySelectorAll('.experience__facts');

function setupSwitcher() {
	const savedFormat = getSavedFormat();

	if (savedFormat !== null) {
		const currentButton = formatSwitcher.querySelector(`[value=${savedFormat}]`);
		pressButton(currentButton, true);
		setExperienceFormat(savedFormat);
	}

	formatSwitcher.addEventListener('click', (event) => {
		const isButton = event.target.tagName === 'BUTTON';
		const isPressed = event.target.getAttribute('aria-pressed') === 'true';

		if (!isButton || isPressed) return;

		pressButton(event.target, true);
		setExperienceFormat(event.target.value);
		setFormat(event.target.value);
	})
}


function setupFormat() {
	const savedFormat = getSavedFormat();

	if (savedFormat === null) return;

	setFormat(savedFormat);
}

function pressButton(button, press) {
	for (let button of formatButtons) {
		button.setAttribute('aria-pressed', !press);
	}
	button.setAttribute('aria-pressed', press);
}

function setExperienceFormat(format) {
	if (format === 'lyrically') {
		lyricalExperience.forEach((item) => {
			item.classList.remove('hidden');
		});
		factsExperience.forEach((item) => {
			item.classList.add('hidden');
		});
	} else {
		lyricalExperience.forEach((item) => {
			item.classList.add('hidden');
		});
		factsExperience.forEach((item) => {
			item.classList.remove('hidden');
		});
	}
}

function getSavedFormat() {
	return localStorage.getItem('experience-format');
}

function setFormat(format) {
	localStorage.setItem('experience-format', format);
}

setupSwitcher();
setupFormat();
