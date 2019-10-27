'use strict';

(function () {
  var WIZARD_AMOUNT = 4;
  var personageSetup = document.querySelector('.setup');
  var similarListElement = personageSetup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Создание DOM элемента мага на основании данных обьекта wizard
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var onLoad = function (dataWizards) {
    // dataWizards - массив объектов магов получаемый с сервера
    // Массив содержащий числа от 0 до dataWizards.length(наполняется при помоши цикла)
    var indexes = [];
    for (var i = 0; i < dataWizards.length; i++) {
      indexes[i] = i;
    }

    var fragment = document.createDocumentFragment(); // Создание фрагмента
    // Цикл для добавления нескольких случайных неповторяющихся карточек магов в фрагмент
    for (var j = 0; j < WIZARD_AMOUNT; j++) {
      // index - случайное число
      var index = window.util.getRandomNumber(0, indexes.length - 1);
      // numder - случайный элемент массива indexes
      var number = indexes[index];
      // Получение информации о маге под индексом number
      var currentWizardInfo = dataWizards[number];
      // Рендерин карточки этого мага
      var currentWizardCard = renderWizard(currentWizardInfo);
      // Вставка карточки в фрагмент
      fragment.appendChild(currentWizardCard);
      // Удаление number из массива indexes
      // Как результа массив indexes становится короче и мы больше не можем получить мага с индексом number(т.к. number удален)
      indexes.splice(index, 1);
    }
    similarListElement.appendChild(fragment); // Отображение фрагмента
  };

  // Скачивание данных о магах, их рендеринг и вставка на страницу
  window.backend.load(onLoad, window.util.onError);

  // Отображение блока с похожими персонажами
  personageSetup.querySelector('.setup-similar').classList.remove('hidden');


})();
