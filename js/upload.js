(function () {
	var URL = 'https://js.dump.academy/code-and-magick';

	window.upload = function (data, onSucccess) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.addEventListener('load', function () {
			onSucccess(xhr.response);
		});

		xhr.open('POST', URL);
		xhr.send(data);
	};
})();