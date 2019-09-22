'use strict';

// Список констант
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var FONT_FAMILY = 'PT Mono';
var FONT_SIZE = 16;
var COLUMN_X = 150;
var COLUMN_Y = 100;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var COLUMN_MAX_HEIGHT = 150;
var PLAYER_NAME_MARGIN = 20;
var PLAYER_TIME_MARGIN = 10;

// Функция для отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция для отрисовки текста
var renderText = function (ctx, x, y, text, color) {
  var textColor = (color === undefined) ? 'rgb(0, 0, 0)' : color;
  ctx.fillStyle = textColor;
  ctx.fillText(text, x, y);
  ctx.font = FONT_SIZE + 'px ' + FONT_FAMILY;
};

// Функция получения наибольшего элемента в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return Math.round(maxElement);
};

// Функция для отрисовки столбца гистограммы
var renderHistogramColumm = function (ctx, time, name, index, maxTime) {
  var playerTime = Math.round(time);
  var playerName = (name === undefined) ? 'Noname' : name;
  var rectRightOffset = index * (COLUMN_WIDTH + COLUMN_GAP);
  var rectHeight = playerTime / maxTime * COLUMN_MAX_HEIGHT;
  ctx.fillStyle = playerName === 'Вы' ? 'rgb(255, 0, 0)' : 'hsl(235, 55%, ' + Math.round(Math.random() * 100) + '%)';
  ctx.fillRect(COLUMN_X + rectRightOffset, COLUMN_Y + COLUMN_MAX_HEIGHT - rectHeight, COLUMN_WIDTH, rectHeight);
  renderText(ctx, COLUMN_X + rectRightOffset, COLUMN_Y + COLUMN_MAX_HEIGHT + PLAYER_NAME_MARGIN, playerName);
  renderText(ctx, COLUMN_X + rectRightOffset, COLUMN_Y + COLUMN_MAX_HEIGHT - rectHeight - PLAYER_TIME_MARGIN, playerTime);
};

// Метод объекта window выводящий информацию о результатах игроков
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, 'rgb(255, 255, 255)');
  renderText(ctx, 120, 40, 'Ура вы победили!');
  renderText(ctx, 120, 60, 'Список результатов:');
  var maxTime = getMaxElement(times);
  // Цикл построения гистограммы
  for (var j = 0; j < times.length; j++) {
    renderHistogramColumm(ctx, times[j], names[j], j, maxTime);
  }
};
