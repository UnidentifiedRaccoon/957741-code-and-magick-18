'use strict';

//  Список констант
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_AMOUNT = 4;
var WIZARDS = [];

// Получение окна пользователя и шаблона мага (а также места для вставки шаблона мага)
var userWindow = document.querySelector('.setup');
userWindow.classList.remove('hidden');
var similarListElement = userWindow.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Функция для получения рандомного числа в заданных пределах;
var getRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

// Функция возращаюшая обьект мага с рандомными свойствами, заданными на основании данных массивов
var getWizardObject = function (names, surnames, colors, eyesColors) {
  var wizard = {
    name: names[getRandomNumber(0, names.length - 1)] + ' ' + surnames[getRandomNumber(0, surnames.length - 1)],
    coatColor: colors[getRandomNumber(0, colors.length - 1)],
    eyesColor: eyesColors[getRandomNumber(0, eyesColors.length - 1)],
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

// Напонение массива WIZARDS обьектами магов
for (var i = 0; i < WIZARD_AMOUNT; i++) {
  WIZARDS[i] = getWizardObject(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COLORS, WIZARD_EYES_COLORS);
}

// Наполнение fragment`а DOM - элементами магов
var fragment = document.createDocumentFragment();
for (var j = 0; j < WIZARDS.length; j++) {
  fragment.appendChild(renderWizard(WIZARDS[j]));
}
// Вставка fragment`а на страницу
similarListElement.appendChild(fragment);

// Отображение окна пользователя
userWindow.querySelector('.setup-similar').classList.remove('hidden');
