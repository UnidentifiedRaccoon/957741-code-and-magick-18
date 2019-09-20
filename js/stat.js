'use strict';

function renderStatistics(ctx, names, times) {
  var columnWidth = 40;
  var columnWhiteSpace = 50;
  var columnMaxHeight = 150;
  // Отрисовка белого окошка
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);
  var maxTime = 0;
  // Цикл находяший индекс высоты на основынии данных массива times
  for (var i = 0; i < times.length; i++) {
    var currentTime = Math.round(times[i]);
    if (currentTime > maxTime) {
      maxTime = currentTime;
    }
    var heightIndex = Math.trunc(maxTime / columnMaxHeight * 100) / 100;
  }
  // Цикл построения гистограммы
  for (var j = 0; j < names.length; j++) {
    var currentTime = Math.round(times[j]);
    var currentName = names[j];
    var rightOffset = j * (columnWidth + columnWhiteSpace);
    var currentRectHeight = Math.round(currentTime / heightIndex);
    // Отрисовка столбца с подписью
    ctx.fillStyle = currentName === 'Вы' ? 'rgb(255, 0, 0)' : 'hsl(235, 55%, ' + Math.round(Math.random() * 100) + '%)';
    ctx.beginPath();
    ctx.moveTo(150 + rightOffset, 250);
    ctx.lineTo(150 + rightOffset, 250 - currentRectHeight);
    ctx.lineTo(190 + rightOffset, 250 - currentRectHeight);
    ctx.lineTo(190 + rightOffset, 250);
    ctx.fill();
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = '16px PT Mono';
    ctx.fillText(currentTime, 150 + rightOffset, 250 - currentRectHeight - 10);
    ctx.fillText(currentName, 150 + rightOffset, 250 + 20);
  }
}
