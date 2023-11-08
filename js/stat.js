'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var FONT_GAP = 15;
var TEXT_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP;

var renderCloud = function (ctx, x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
	var maxElement = arr[0];

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] > maxElement) {
			maxElement = arr[i];
		}
	}

	return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
	renderCloud(ctx, CLOUD_X + CLOUD_Y, CLOUD_Y + CLOUD_Y, 'rgba(0, 0, 0, 0.7)');
	renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

	var maxTime = getMaxElement(times);

	ctx.fillStyle = '#000';
	ctx.font = '16px PT Mono';
	ctx.textBaseline = 'hanging';
	ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, 30);
	ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, 50);

	for (var i = 0; i < players.length; i++) {
		ctx.fillStyle = '#000';
		ctx.fillText(players[i], CLOUD_X + GAP + FONT_GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP);
		ctx.fillText(parseInt(times[i]), CLOUD_X + GAP + FONT_GAP + (GAP + BAR_WIDTH) * i, GAP * 2 - 25 + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime));
		if (players[i] === 'Вы') {
			ctx.fillStyle = 'red';
		} else {
			ctx.fillStyle = 'blue';
		}
		ctx.fillRect(CLOUD_X + GAP + FONT_GAP + (GAP + BAR_WIDTH) * i, GAP * 2 - 5 + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);

	}
};