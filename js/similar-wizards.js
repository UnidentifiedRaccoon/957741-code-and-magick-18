'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  // var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  // var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  // var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_AMOUNT = 4;
  var wizards = [];
  var personageSetup = document.querySelector('.setup');
  var similarListElement = personageSetup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Функция возращаюшая обьект мага с рандомными свойствами, заданными на основании данных из массивов
  var getWizardObject = function (names, surnames, colors, eyesColors) {
    var wizard = {
      name: window.util.getRandomArrayElement(names) + ' ' + window.util.getRandomArrayElement(surnames),
      coatColor: window.util.getRandomArrayElement(colors),
      eyesColor: window.util.getRandomArrayElement(eyesColors.length),
    };
    return wizard;
  };

  // Создание DOM элемента мага на основании данных обьекта wizard
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  // Наполнение массива wizards обьектами магов
  // Наполнение fragment`а DOM - элементами магов
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < WIZARD_AMOUNT; i++) {
    wizards[i] = getWizardObject(WIZARD_NAMES, WIZARD_SURNAMES, window.util.WIZARD_COAT_COLORS, window.util.WIZARD_EYES_COLORS);
    fragment.appendChild(renderWizard(wizards[i]));
  }
  // Вставка fragment`а на страницу
  similarListElement.appendChild(fragment);

  // Отображение блока с похожими персонажами
  personageSetup.querySelector('.setup-similar').classList.remove('hidden');
})();
