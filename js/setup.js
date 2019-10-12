'use strict';
//  Список констант
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_AMOUNT = 4;
var wizards = [];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Получение окна пользователя и шаблона мага (а также места для вставки шаблона мага)
var userSetup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userSetup.querySelector('.setup-close');
var userSetupFieldName = userSetup.querySelector('.setup-user-name');
var wizardCoat = userSetup.querySelector('.wizard-coat');
var wizardCoatField = userSetup.querySelector('[name="coat-color"]');
var wizardEyes = userSetup.querySelector('.wizard-eyes');
var wizardEyesField = userSetup.querySelector('[name="eyes-color"]');
var wizardFireball = userSetup.querySelector('.setup-fireball-wrap');
var wizardFireballField = userSetup.querySelector('[name="fireball-color"]');
var similarListElement = userSetup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Функция обработчика закрытия пользовательского окна нажатием на ESC
var popupEscKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// Функция открытия пользовательского окна
var openPopup = function () {
  userSetup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscKeydownHandler);
};

// Функция закрытия пользовательского окна
var closePopup = function () {
  userSetup.classList.add('hidden');
  document.removeEventListener('keydown', popupEscKeydownHandler);
};

// Обработчик открытия пользовательского окна через КЛИК
setupOpen.addEventListener('click', openPopup);

// Обработчик открытия пользовательского окна через ENTER
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Обработчик закрытия пользовательского окна через КЛИК
setupClose.addEventListener('click', closePopup);

// Обработчик закрытия пользовательского окна через ENTER
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Функция УДАЛЯЮЩАЯ возможность закрытия пользовательского окна кнопкой ESC, при ФОКУСИРОВКЕ на поле ввода
userSetupFieldName.addEventListener('focus', function () {
  document.removeEventListener('keydown', popupEscKeydownHandler);
});

// Функция ДОБАВЛЯЮЩАЯ возможность закрытия пользовательского окна кнопкой ESC, при РАСФОКУСИРОВКЕ с поля ввода
userSetupFieldName.addEventListener('blur', function () {
  document.addEventListener('keydown', popupEscKeydownHandler);
});

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

changeWizardPartColor(WIZARD_COAT_COLORS, wizardCoat, wizardCoatField, 'fill');
changeWizardPartColor(WIZARD_EYES_COLORS, wizardEyes, wizardEyesField, 'fill');
changeWizardPartColor(WIZARD_FIREBALL_COLORS, wizardFireball, wizardFireballField, 'background');

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
  wizards[i] = getWizardObject(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS);
  fragment.appendChild(renderWizard(wizards[i]));
}
// Вставка fragment`а на страницу
similarListElement.appendChild(fragment);

// Отображение блока с похожими персонажами
userSetup.querySelector('.setup-similar').classList.remove('hidden');
