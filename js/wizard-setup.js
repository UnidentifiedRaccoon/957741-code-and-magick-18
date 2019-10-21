'use strict';

(function () {
  var personageSetup = document.querySelector('.setup');
  var wizardCoat = personageSetup.querySelector('.wizard-coat');
  var wizardCoatField = personageSetup.querySelector('[name="coat-color"]');
  var wizardEyes = personageSetup.querySelector('.wizard-eyes');
  var wizardEyesField = personageSetup.querySelector('[name="eyes-color"]');
  var wizardFireball = personageSetup.querySelector('.setup-fireball-wrap');
  var wizardFireballField = personageSetup.querySelector('[name="fireball-color"]');
  window.wizardSetup = {
    personageSetupFieldName: personageSetup.querySelector('.setup-user-name')
  };
  // console.log(window.wizardSetup.personageSetupFieldName);

  // Функция позволяющая менять цвет(из заданного массива цветов) объекта при клике на него, и передавать значение цвета в input атрибут value
  // Прим: propertyType - это CSS свойство объекта, в которое можно передать цвет
  var changeWizardPartColor = function (arr, changedItem, changedInput, propertyType) {
    var colorNumber = 0;
    changedItem.addEventListener('click', function () {
      colorNumber++;
      var color = arr[colorNumber % arr.length];
      if (propertyType === 'fill') {
        changedItem.style.fill = color;
      } else if (propertyType === 'background') {
        changedItem.style.background = color;
      } else if (propertyType === 'color') {
        changedItem.style.color = color;
      }
      changedInput.value = color;
    });
  };

  changeWizardPartColor(window.util.WIZARD_COAT_COLORS, wizardCoat, wizardCoatField, 'fill');
  changeWizardPartColor(window.util.WIZARD_EYES_COLORS, wizardEyes, wizardEyesField, 'fill');
  changeWizardPartColor(window.util.WIZARD_FIREBALL_COLORS, wizardFireball, wizardFireballField, 'background');
})();
