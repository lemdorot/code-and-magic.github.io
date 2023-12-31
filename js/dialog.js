var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
	if (evt.key === 'Escape' &&
		!(document.activeElement === setup.querySelector('.setup-user-name'))) {
		closePopup();
	}
}

var openPopup = function () {
	setup.classList.remove('hidden');
	document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
	setup.classList.add('hidden');
	document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
	openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
	if (evt.key === 'Enter') {
		openPopup();
	}
});

setupClose.addEventListener('click', function () {
	closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
	if (evt.key === 'Enter') {
		closePopup();
	}
});

var dialogHandler = setup.querySelector('.upload');

dialogHandler.addEventListener('mousedown', function (evt) {
	evt.preventDefault();

	var startCoords = {
		x: evt.clientX,
		y: evt.clientY
	};

	var dragged = false;

	var onMouseMove = function (moveEvt) {
		moveEvt.preventDefault();
		dragged = true;

		var shift = {
			x: startCoords.x - moveEvt.clientX,
			y: startCoords.y - moveEvt.clientY,
		}

		startCoords = {
			x: moveEvt.clientX,
			y: moveEvt.clientY
		};

		setup.style.top = (setup.offsetTop - shift.y) + 'px';
		setup.style.left = (setup.offsetLeft - shift.x) + 'px';
	}

	var onMouseUp = function (upEvt) {
		upEvt.preventDefault();

		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);

		if (dragged) {
			var onClickPreventDefault = function (evt) {
				evt.preventDefault();
				dialogHandler.removeEventListener('click', onClickPreventDefault);
			};
			dialogHandler.addEventListener('click', onClickPreventDefault);
		}
	}

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
});