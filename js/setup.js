'use strict';

//  Список констант
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_AMOUNT = 4;
var wizards = [];

// Получение окна пользователя и шаблона мага (а также места для вставки шаблона мага)
var userWindow = document.querySelector('.setup');
userWindow.classList.remove('hidden');
var similarListElement = userWindow.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Функция для получения случайного элемента из массива
// Прим: так как величина длинны массива больше величины индекса последнего элемента массива, Math.random() никогда не выдает один, а Math.floor() округляет вниз
var getRandomArrayElement = function (arr) {
  var max = arr.length;
  var randomElement = Math.floor(Math.random() * max);
  return arr[randomElement];
};

// Функция возращаюшая обьект мага с рандомными свойствами, заданными на основании данных массивов
var getWizardObject = function (names, surnames, colors, eyesColors) {
  var wizard = {
    name: getRandomArrayElement(names) + ' ' + getRandomArrayElement(surnames),
    coatColor: getRandomArrayElement(colors),
    eyesColor: getRandomArrayElement(eyesColors.length),
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
  wizards[i] = getWizardObject(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COLORS, WIZARD_EYES_COLORS);
  fragment.appendChild(renderWizard(wizards[i]));
}
// Вставка fragment`а на страницу
similarListElement.appendChild(fragment);

// Отображение окна пользователя
userWindow.querySelector('.setup-similar').classList.remove('hidden');
