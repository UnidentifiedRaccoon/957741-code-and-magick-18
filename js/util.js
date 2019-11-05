'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomNumber: function (min, max) {
      // Функция для получение СЛУЧАЙНОЙ ЦИФРЫ в указанном диапазоне
      // Прим: так как для округления случайного числа исп. Math.floor() то к максимальному числу необходимо добавить один (max + 1)
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    getRandomArrayElement: function (arr) {
      // Функция для получения случайного элемента из массива
      // Прим: так как величина длинны массива больше величины индекса последнего элемента массива, Math.random() никогда не выдает один, а Math.floor() округляет вниз
      var max = arr.length;
      var randomElement = Math.floor(Math.random() * max);
      return arr[randomElement];
    },
    onError: function (message) {
      // Создание и отображение окна c сообщением об ошибке
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = message;
      document.body.insertAdjacentElement('afterbegin', node);
    },
    // WIZARD_COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    // WIZARD_EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    // WIZARD_FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };
})();
