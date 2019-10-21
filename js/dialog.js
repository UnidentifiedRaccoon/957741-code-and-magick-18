'use strict';
(function () {
  var personageSetup = document.querySelector('.setup');
  var personageSetupStartOffsetX = personageSetup.style.left;
  var personageSetupStartOffsetY = personageSetup.style.top;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = personageSetup.querySelector('.setup-close');
  var setupHandle = personageSetup.querySelector('.upload');

  // Функция обработчика закрытия пользовательского окна нажатием на ESC
  var onPopupEscKeydown = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  // Функция открытия пользовательского окна
  var openPopup = function () {
    personageSetup.classList.remove('hidden');
    personageSetup.style.top = personageSetupStartOffsetY;
    personageSetup.style.left = personageSetupStartOffsetX;
    document.addEventListener('keydown', onPopupEscKeydown);
  };

  // Функция закрытия пользовательского окна
  var closePopup = function () {
    personageSetup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  // Обработчик открытия пользовательского окна через КЛИК
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  // Обработчик открытия пользовательского окна через ENTER
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  // Обработчик закрытия пользовательского окна через КЛИК
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  // Обработчик закрытия пользовательского окна через ENTER
  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  // Функция УДАЛЯЮЩАЯ возможность закрытия пользовательского окна кнопкой ESC, при ФОКУСИРОВКЕ на поле ввода
  window.wizardSetup.personageSetupFieldName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscKeydown);
  });

  // Функция ДОБАВЛЯЮЩАЯ возможность закрытия пользовательского окна кнопкой ESC, при РАСФОКУСИРОВКЕ с поля ввода
  window.wizardSetup.personageSetupFieldName.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscKeydown);
  });

  // Обработчик для передвижения окна настройки персонажа
  setupHandle.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    var shift = {
      x: 0,
      y: 0
    };
    var onClickPreventDefault = function (evt) {
      evt.preventDefault();
      setupHandle.removeEventListener('click', onClickPreventDefault);
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      shift.x = moveEvt.movementX;
      shift.y = moveEvt.movementY;
      personageSetup.style.left = (personageSetup.offsetLeft + shift.x) + 'px';
      personageSetup.style.top = (personageSetup.offsetTop + shift.y) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (shift.x !== 0 || shift.y !== 0) {
        setupHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
