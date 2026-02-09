(function(){
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    // аккуратная темизация
    const t = tg.themeParams || {};
    if (t.bg_color) document.documentElement.style.setProperty('--bg', t.bg_color);
    if (t.text_color) document.documentElement.style.setProperty('--text', t.text_color);
    if (t.button_color) document.documentElement.style.setProperty('--accent', t.button_color);
  }

  const pages = {
    mainPage: document.getElementById('mainPage'),
    productPage: document.getElementById('productPage'),
    reviewsPage: document.getElementById('reviewsPage'),
    supportPage: document.getElementById('supportPage'),
  };

  function setPage(id){
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages[id].classList.add('active');

    document.querySelectorAll('.tab').forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.page === id);
    });

    // если открыта страница товара, не подсвечиваем нижние вкладки кроме главной
    if (id === 'productPage') {
      document.querySelectorAll('.tab').forEach(btn=>{
        btn.classList.toggle('active', btn.dataset.page === 'mainPage');
      });
    }

    window.scrollTo({top:0, behavior:'instant'});
  }

  document.querySelectorAll('.tab').forEach(btn=>{
    btn.addEventListener('click', ()=> setPage(btn.dataset.page));
  });

  const products = [
    { id:'tee', name:'Футболка', emoji:'👕', variants:['👕','👚','🟦'], price:990, reviews:128, desc:'Мягкая хлопковая футболка. Подходит на каждый день.' },
    { id:'jeans', name:'Джинсы', emoji:'👖', variants:['👖','🟦','⬛️'], price:1990, reviews:64, desc:'Классические джинсы прямого кроя. Удобная посадка.' },
    { id:'jacket', name:'Куртка', emoji:'🧥', variants:['🧥','⬛️','🟫'], price:3990, reviews:57, desc:'Тёплая куртка на прохладную погоду. Ветровлагозащита.' },
    { id:'dress', name:'Платье', emoji:'👗', variants:['👗','🟥','🟪'], price:2490, reviews:91, desc:'Лёгкое платье, отлично смотрится и днём и вечером.' },
    { id:'cap', name:'Кепка', emoji:'🧢', variants:['🧢','🟦','⬛️'], price:590, reviews:33, desc:'Бейсболка с регулируемой застёжкой.' },
    { id:'sneakers', name:'Кроссовки', emoji:'👟', variants:['👟','⬜️','⬛️'], price:2990, reviews:142, desc:'Удобные кроссовки для прогулок и спорта.' },
    { id:'socks', name:'Носки', emoji:'🧦', variants:['🧦','⬜️','⬛️'], price:190, reviews:210, desc:'Носки из хлопка. Комплект 1 пара.' },
    { id:'bag', name:'Сумка', emoji:'👜', variants:['👜','🟫','⬛️'], price:1490, reviews:48, desc:'Компактная сумка через плечо. Влезает всё нужное.' },
    { id:'scarf', name:'Шарф', emoji:'🧣', variants:['🧣','🟥','🟩'], price:790, reviews:27, desc:'Тёплый шарф. Мягкий и приятный к коже.' },
    { id:'gloves', name:'Перчатки', emoji:'🧤', variants:['🧤','⬛️','🟫'], price:690, reviews:19, desc:'Перчатки для прохладной погоды. Удобная посадка.' },
  ];

  const grid = document.getElementById('productsGrid');
  const productEmoji = document.getElementById('productEmoji');
  const productVariants = document.getElementById('productVariants');
  const productName = document.getElementById('productName');
  const productReviews = document.getElementById('productReviews');
  const productPrice = document.getElementById('productPrice');
  const productDesc = document.getElementById('productDesc');
  const buyBtn = document.getElementById('buyBtn');

  function rub(n){ return `${n}₽`; }

  function renderGrid(){
    grid.innerHTML = '';
    products.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'product-card';
      card.dataset.id = p.id;
      card.innerHTML = `
        <div class="emoji">${p.emoji}</div>
        <div class="name">${p.name}</div>
        <div class="sub">отзывы: ${p.reviews} • ${rub(p.price)}</div>
      `;
      card.addEventListener('click', ()=> openProduct(p.id));
      grid.appendChild(card);
    });
  }

  function openProduct(id){
    const p = products.find(x=>x.id===id);
    if(!p) return;

    productEmoji.textContent = p.emoji;
    productName.textContent = p.name;

    // Варианты (как разные цвета/виды)
    productVariants.innerHTML = '';
    p.variants.forEach(v=>{
      const b = document.createElement('div');
      b.className = 'variant';
      b.textContent = v;
      productVariants.appendChild(b);
    });

    // Под фото: слева отзывы, справа цена
    productReviews.textContent = `Отзывы: ${p.reviews}`;
    productPrice.textContent = rub(p.price);

    productDesc.textContent = p.desc;

    // Купить -> поддержка
    buyBtn.onclick = ()=>{
      setPage('supportPage');
    };

    setPage('productPage');
  }

  document.getElementById('backToCatalog').addEventListener('click', ()=>{
    setPage('mainPage');
  });

  renderGrid();
  setPage('mainPage');
})();