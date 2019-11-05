'use strict';

(function () {
  var similar = document.querySelector('.setup-similar');
  var similarList = similar.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var MAX_WIZARD_AMOUNT = 4;

  // Создание DOM элемента мага на основании данных обьекта wizard
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  // Функция которая очишает список(в который ма помещаем магов) и ограничивает количество отображаемых в нем магов
  window.render = function (dataWizards) {
    var wizardAmount = dataWizards.length > MAX_WIZARD_AMOUNT ? MAX_WIZARD_AMOUNT : dataWizards.length;
    similarList.innerHTML = '';
    for (var i = 0; i < wizardAmount; i++) {
      similarList.appendChild(renderWizard(dataWizards[i]));
    }
    // Отображение блока с похожими персонажами
    similar.classList.remove('hidden');
  };
})();
