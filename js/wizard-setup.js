'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var personageSetup = document.querySelector('.setup');
  var wizardCoat = personageSetup.querySelector('.wizard-coat');
  var wizardCoatField = personageSetup.querySelector('[name="coat-color"]');
  var wizardEyes = personageSetup.querySelector('.wizard-eyes');
  var wizardEyesField = personageSetup.querySelector('[name="eyes-color"]');
  var wizardFireball = personageSetup.querySelector('.setup-fireball-wrap');
  var wizardFireballField = personageSetup.querySelector('[name="fireball-color"]');
  window.wizardSetup = {
    personageSetupFieldName: personageSetup.querySelector('.setup-user-name'),
  };
  var coatColorNumber = 1;
  var eyesColorNumber = 1;
  var fireballColorNumber = 1;

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {},
  };

  // Функция которая возвращает номер текущего цвета
  var getCurrentNum = function (element) {
    var num;
    if (element.classList.contains('wizard-coat')) {
      num = coatColorNumber++;
    } else if (element.classList.contains('wizard-eyes')) {
      num = eyesColorNumber++;
    } else if (element.classList.contains('setup-fireball-wrap')) {
      num = fireballColorNumber++;
    }
    return num;
  };

  // Функция определяющая какой элемент изменяется и какую функцию следует вызвать для обработки этого изменения
  var onChange = function (element, newColor) {
    if (element.classList.contains('wizard-coat')) {
      wizard.onCoatChange(newColor);
    } else if (element.classList.contains('wizard-eyes')) {
      wizard.onEyesChange(newColor);
    }
  };

  // Функция добавляющая обработчик для отслеживания кликов по элементу
  // // Функция позволяющая менять цвет(из заданного массива цветов) объекта при клике на него, и передавать значение цвета в input атрибут value
  // // Прим: propertyType - это CSS свойство объекта, в которое можно передать цвет
  var changeWizardElementColor = function (element, arr, changedInput, propertyType) {
    element.addEventListener('click', function () {
      // По элементу определяем номер текущего цвета и меняем его на следующий в массиве
      var num = getCurrentNum(element);
      var newColor = arr[num % arr.length];
      // Записываем новый цвет в свойства элемента и в input элемента (для отправки данных на сервер)
      element.style[propertyType] = newColor;
      changedInput.value = newColor;
      // Определяем по элементу какую функцию применять при изменении(т.к. нам нужно каждый раз получать похожих магов, то потребуется сравнивать цвета => мы передаем значение нового цвета)
      onChange(element, newColor);
    });
  };

  // Добавление частям мага обработчиков
  changeWizardElementColor(wizardCoat, WIZARD_COAT_COLORS, wizardCoatField, 'fill');
  changeWizardElementColor(wizardEyes, WIZARD_EYES_COLORS, wizardEyesField, 'fill');
  changeWizardElementColor(wizardFireball, WIZARD_FIREBALL_COLORS, wizardFireballField, 'background');

  window.wizardSetup.wizard = wizard;
})();
