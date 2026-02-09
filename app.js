// Мини‑приложение с тремя вкладками: калькулятор, игра и таймер
(function () {
  // Навигация между страницами
  const pages = {
    calculatorPage: document.getElementById('calculatorPage'),
    gamePage: document.getElementById('gamePage'),
    timerPage: document.getElementById('timerPage')
  };
  const pageTitle = document.getElementById('pageTitle');

  function setActivePage(pageId) {
    // Скрываем все страницы
    Object.values(pages).forEach(page => page.classList.remove('active'));
    // Показываем выбранную страницу
    pages[pageId].classList.add('active');
    // Изменяем заголовок
    if (pageId === 'calculatorPage') pageTitle.textContent = 'Калькулятор';
    else if (pageId === 'gamePage') pageTitle.textContent = 'Игра';
    else if (pageId === 'timerPage') pageTitle.textContent = 'Таймер';
    // Подсветка табов
    document.querySelectorAll('.tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });
  }

  // Навешиваем обработчики на навигационные кнопки
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => setActivePage(btn.dataset.page));
  });

  // Калькулятор
  const calcInput = document.getElementById('calcInput');
  const calcButton = document.getElementById('calcButton');
  const calcResult = document.getElementById('calcResult');

  calcButton.addEventListener('click', () => {
    const expr = calcInput.value;
    let result;
    try {
      // Используем Function вместо eval для безопасности
      // Но всё равно расчёт выражения от пользователя следует использовать с осторожностью
      result = new Function('return ' + expr)();
      if (isNaN(result)) {
        calcResult.textContent = 'Некорректное выражение';
      } else {
        calcResult.textContent = 'Результат: ' + result;
      }
    } catch (e) {
      calcResult.textContent = 'Ошибка: ' + e.message;
    }
  });

  // Игра камень-ножницы-бумага
  const gameMessage = document.getElementById('gameMessage');
  const gameButtons = document.querySelectorAll('.game-buttons button');

  function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let outcome;
    if (playerChoice === computerChoice) {
      outcome = 'Ничья!';
    } else if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'scissors' && computerChoice === 'paper') ||
      (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
      outcome = 'Вы выиграли!';
    } else {
      outcome = 'Вы проиграли!';
    }
    gameMessage.textContent =
      'Вы выбрали: ' + translateChoice(playerChoice) + '\nКомпьютер выбрал: ' + translateChoice(computerChoice) + '\n' + outcome;
  }

  function translateChoice(choice) {
    switch (choice) {
      case 'rock': return 'Камень';
      case 'paper': return 'Бумага';
      case 'scissors': return 'Ножницы';
      default: return choice;
    }
  }

  gameButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const choice = btn.dataset.choice;
      playGame(choice);
    });
  });

  // Таймер (секундомер)
  const timerDisplay = document.getElementById('timerDisplay');
  const timerStart = document.getElementById('timerStart');
  const timerStop = document.getElementById('timerStop');
  const timerReset = document.getElementById('timerReset');

  let timerInterval = null;
  let elapsedTime = 0;

  function updateTimerDisplay() {
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const format = n => (n < 10 ? '0' + n : n);
    timerDisplay.textContent = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  }

  timerStart.addEventListener('click', () => {
    if (timerInterval) return; // уже запущен
    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateTimerDisplay();
    }, 200);
  });

  timerStop.addEventListener('click', () => {
    if (!timerInterval) return;
    clearInterval(timerInterval);
    timerInterval = null;
  });

  timerReset.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    updateTimerDisplay();
  });

  // Инициализация
  updateTimerDisplay();
  // По умолчанию показываем первую страницу
  setActivePage('calculatorPage');
})();