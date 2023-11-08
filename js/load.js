(function () {
	var URL = 'https://js.dump.academy/code-and-magick/data';

	window.load = function (onSucccess, onError) {
		var xhr = new XMLHttpRequest();
		// xhr.withCredentials = true;
		xhr.responseType = 'json';

		xhr.open('GET', URL);

		xhr.addEventListener('load', function () {
			onSucccess(xhr.response);
		});

		xhr.send();
	};
})();