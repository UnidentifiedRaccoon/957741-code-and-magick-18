'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
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
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var onLoad = function (dataWizards) {
    console.log(dataWizards);
    // Наполнение массива wizards обьектами магов
    // Наполнение fragment`а DOM - элементами магов
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARD_AMOUNT; i++) {
      // wizards[i] = getWizardObject(WIZARD_NAMES, WIZARD_SURNAMES, window.util.WIZARD_COAT_COLORS, window.util.WIZARD_EYES_COLORS);
      fragment.appendChild(renderWizard(dataWizards[i]));
    }
    // Вставка fragment`а на страницу
    similarListElement.appendChild(fragment);
  };

  var onError = function (message) {
    // Создание и отображение сообщения об ошибке
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Скачивание данных о магах, их рендеринг и вставка на страницу
  window.backend.load(onLoad, onError);

  // Отображение блока с похожими персонажами
  personageSetup.querySelector('.setup-similar').classList.remove('hidden');


})();
