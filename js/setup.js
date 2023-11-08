'use strict';

var setup = document.querySelector('.setup');
var wizard = setup.querySelector('.setup-wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

setup.querySelector('.setup-similar').classList.remove('hidden');

var WIZARD_NAMES = [
	'Иван',
	'Хуан Себастьян',
	'Мария',
	'Кристоф',
	'Виктор',
	'Юлия',
	'Люпита',
	'Вашингтон'
];
var WIZARD_SURNAMES = [
	'да Марья',
	'Верон',
	'Мирабелла',
	'Вальц',
	'Онопко',
	'Топольницкая',
	'Нионго',
	'Ирвинг'
];
var WIZARD_COAT_COLOR = [
	'rgb(101, 137, 164)',
	'rgb(241, 43, 107)',
	'rgb(146, 100, 161)',
	'rgb(56, 159, 117)',
	'rgb(215, 210, 55)',
	'rgb(0, 0, 0)'
];
var WIZARD_EYES_COLOR = [
	'black',
	'red',
	'blue',
	'yellow',
	'green',
];
var WIZARD_FIREBALL_COLOR = [
	'#ee4830',
	'#30a8ee',
	'#5ce6c0',
	'#e848d5',
	'#e6e848'
];
var WIZARD_COUNT = 4;

var randomInteger = function (min, max) {
	// случайное число от min до (max+1)
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

var wizardFullNames = [];

var getWizardFullNames = function () {
	var fullNames = []
	for (var i = 0; i < WIZARD_COUNT; i++) {
		fullNames.push(WIZARD_NAMES[randomInteger(0, WIZARD_NAMES.length - 1)] + ' ' +
			WIZARD_SURNAMES[randomInteger(0, WIZARD_SURNAMES.length - 1)]);
	}
	return fullNames;
}

wizardFullNames = getWizardFullNames();

var wizards = [];

var generateWizards = function () {
	var wizards = []
	for (var i = 0; i < WIZARD_COUNT; i++) {
		wizards.push({
			name: wizardFullNames[i],
			coatColor: WIZARD_COAT_COLOR[randomInteger(0, WIZARD_COAT_COLOR.length - 1)],
			eyesColor: WIZARD_EYES_COLOR[randomInteger(0, WIZARD_EYES_COLOR.length - 1)],
		});
	}
	return wizards;
}

// wizards = generateWizards();
// console.log(wizards);

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
	.content.querySelector('.setup-similar-item');

var renderWizards = function (wizards) {
	for (var i = 0; i < wizards.length; i++) {
		var wizardElement = similarWizardTemplate.cloneNode(true);

		wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
		wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
		wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
		similarListElement.appendChild(wizardElement);
	}
}

// renderWizards();

window.load(function (wizards) {
	renderWizards(wizards);
	setup.querySelector('.setup-similar').classList.remove('hidden');
});



var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function (evt) {
	if (userNameInput.validity.tooShort) {
		userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
	} else if (userNameInput.validity.tooLong) {
		userNameInput.setCustomValidity('Имя не должно превышать из 25-ти символов');
	} else if (userNameInput.validity.valueMissing) {
		userNameInput.setCustomValidity('Обязательное поле');
	} else {
		userNameInput.setCustomValidity('');
	}
});

wizardCoat.addEventListener('click', function () {
	wizardCoat.style.fill = WIZARD_COAT_COLOR[randomInteger(0, WIZARD_COAT_COLOR.length - 1)];
});

wizardEyes.addEventListener('click', function () {
	wizardEyes.style.fill = WIZARD_EYES_COLOR[randomInteger(0, WIZARD_EYES_COLOR.length - 1)];
});

wizardFireball.addEventListener('click', function () {
	wizardFireball.style.background = WIZARD_FIREBALL_COLOR[randomInteger(0, WIZARD_FIREBALL_COLOR.length - 1)];
});

var form = setup.querySelector('.setup-wizard-form');
form.addEventListener('submit', function (evt) {
	window.upload(new FormData(form), function (response) {
		setup.classList.add('hidden');
	});
	evt.preventDefault();
});

fetch('https://js.dump.academy/code-and-magick/data')
	.then(response => response.json())
	.then(json => console.log(json))

