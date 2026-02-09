(function () {
  const tg = window.Telegram?.WebApp;
  const isTg = !!tg;

  const el = (id) => document.getElementById(id);

  const pages = {
    home: el("pageHome"),
    profile: el("pageProfile"),
  };

  function setActivePage(page) {
    Object.values(pages).forEach((p) => p.classList.remove("active"));
    pages[page].classList.add("active");

    el("pageTitle").textContent = page === "home" ? "Главная" : "Профиль";

    document.querySelectorAll(".tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.page === page);
    });

    if (isTg && page !== "home") {
      tg.MainButton.hide();
    }
  }

  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => setActivePage(btn.dataset.page));
  });

  if (isTg) {
    tg.ready();
    tg.expand();

    const applyTheme = () => {
      const t = tg.themeParams || {};
      if (t.bg_color) document.documentElement.style.setProperty("--bg", t.bg_color);
      if (t.text_color) document.documentElement.style.setProperty("--text", t.text_color);
      if (t.hint_color) document.documentElement.style.setProperty("--muted", t.hint_color);
      if (t.button_color) document.documentElement.style.setProperty("--accent", t.button_color);
    };

    applyTheme();
    tg.onEvent("themeChanged", applyTheme);

    const user = tg.initDataUnsafe?.user;

    el("userInfo").textContent = user
      ? `${user.first_name}${user.last_name ? " " + user.last_name : ""}`
      : "Нет данных (открыто не из Telegram?)";

    el("platform").textContent = tg.platform || "—";
    el("theme").textContent = tg.colorScheme || "—";

    el("profileName").textContent = user
      ? `${user.first_name}${user.last_name ? " " + user.last_name : ""}`
      : "—";

    el("profileUsername").textContent = user?.username ? "@" + user.username : "—";
    el("profileId").textContent = user?.id ? String(user.id) : "—";

    el("btnHaptic").addEventListener("click", () => {
      tg.HapticFeedback?.impactOccurred("light");
    });

    el("btnAlert").addEventListener("click", () => {
      tg.showAlert("Привет! Это showAlert из Telegram WebApp 🙂");
    });

    el("btnMain").addEventListener("click", () => {
      tg.MainButton.setText("Отправить действие");
      tg.MainButton.show();
    });

    tg.onEvent("mainButtonClicked", () => {
      const payload = { action: "main_button_clicked", ts: Date.now() };
      tg.sendData(JSON.stringify(payload));
      tg.MainButton.hide();
      tg.HapticFeedback?.notificationOccurred("success");
    });

    el("btnSendData").addEventListener("click", () => {
      const payload = { action: "from_profile", user: tg.initDataUnsafe?.user || null };
      tg.sendData(JSON.stringify(payload));
      tg.HapticFeedback?.notificationOccurred("success");
    });
  } else {
    el("userInfo").textContent = "Открой в Telegram, чтобы увидеть user";
    el("platform").textContent = "browser";
    el("theme").textContent = "—";

    el("profileName").textContent = "—";
    el("profileUsername").textContent = "—";
    el("profileId").textContent = "—";

    el("btnHaptic").style.display = "none";
    el("btnAlert").addEventListener("click", () => alert("Открой в Telegram, чтобы работало tg.showAlert"));
    el("btnMain").addEventListener("click", () => alert("MainButton доступен только в Telegram"));
    el("btnSendData").addEventListener("click", () => alert("sendData работает только в Telegram"));
  }

  setActivePage("home");
})();