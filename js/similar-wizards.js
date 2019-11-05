'use strict';

(function () {
  // Функция присваивающая каждому магу ранг похожести на основного персонажа
  var getWizardRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === currentCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === currentEyesColor) {
      rank += 1;
    }
    return rank;
  };

  // Функция для фильтрации магов и отправки в функцию рендеринга
  var updateWizards = function () {
    window.render(wizards.slice()
    .sort(function (left, right) {
      var rankDiff = getWizardRank(right) - getWizardRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  // Позволяет менять правила подбора похожих магов
  var currentEyesColor;
  window.wizardSetup.wizard.onEyesChange = window.debounce(function (color) {
    currentEyesColor = color;
    updateWizards();
  });

  // Позволяет менять правила подбора похожих магов
  var currentCoatColor;
  window.wizardSetup.wizard.onCoatChange = window.debounce(function (color) {
    currentCoatColor = color;
    updateWizards();
  });

  var wizards = [];
  var onLoad = function (data) {
    wizards = data;
    updateWizards();
  };
  // Скачивание данных о магах, их рендеринг и вставка на страницу
  window.backend.load(onLoad, window.util.onError);

})();
