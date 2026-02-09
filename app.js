// JavaScript для навигации между страницами магазина ШКАФ
(function () {
  // Объект страниц
  const pages = {
    mainPage: document.getElementById('mainPage'),
    reviewsPage: document.getElementById('reviewsPage'),
    supportPage: document.getElementById('supportPage'),
  };

  // Название в шапке
  const pageTitle = document.getElementById('pageTitle');

  // Функция переключения страниц
  function setActivePage(pageId) {
    // Скрываем все
    Object.values(pages).forEach(page => page.classList.remove('active'));
    // Показываем выбранную
    pages[pageId].classList.add('active');
    // Обновляем заголовок
    switch (pageId) {
      case 'mainPage':
        pageTitle.textContent = 'ШКАФ';
        break;
      case 'reviewsPage':
        pageTitle.textContent = 'Отзывы';
        break;
      case 'supportPage':
        pageTitle.textContent = 'Поддержка';
        break;
    }
    // Подсветка кнопок
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });
  }

  // Обработчики для кнопок навигации
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => setActivePage(btn.dataset.page));
  });

  // Telegram WebApp: применяем тему Telegram, если возможно
  const tg = window.Telegram && window.Telegram.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    function applyTheme() {
      const t = tg.themeParams || {};
      if (t.bg_color) document.documentElement.style.setProperty('--bg', t.bg_color);
      if (t.text_color) document.documentElement.style.setProperty('--text', t.text_color);
      if (t.hint_color) document.documentElement.style.setProperty('--muted', t.hint_color);
      if (t.button_color) document.documentElement.style.setProperty('--accent', t.button_color);
    }
    applyTheme();
    tg.onEvent('themeChanged', applyTheme);
  }

  // Запускаем с первой страницы
  setActivePage('mainPage');
})();