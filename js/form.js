'use strict';

(function () {
  var personageSetup = document.querySelector('.setup');

  // Обработка события отправки формы
  var form = document.querySelector('.setup-wizard-form');

  var onLoad = function () {
    personageSetup.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onLoad, window.util.onError);
  });
})();
