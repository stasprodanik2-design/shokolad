import { useState, useEffect } from "react";

// ============================================================
// INITIAL DATA — редагується через адмін-панель
// ============================================================
const DEFAULT_DATA = {
  contacts: {
    phone1: "0683782524",
    phone1Name: "Стас",
    phone2: "0978395823",
    phone2Name: "Юля",
    address: "м. Тернопіль, вул. Шоколадна, 1",
    email: "shokolad.ternopil@gmail.com",
    workHours: "Пн-Нд: 10:00 – 22:00",
  },
  about: {
    title: "Ресторан «Шоколад»",
    description:
      "Ресторан «Шоколад» — це місце, де кожна подія стає незабутньою. Ми спеціалізуємось на організації бенкетів, весіль, поминальних обідів, хрестин та корпоративних заходів. Наша кухня поєднує традиційну українську рецептуру з сучасними кулінарними тенденціями.",
    capacity: "до 200 осіб",
    founded: "2010",
  },
  menus: {
    "Дитяче": [
      { id: 1, name: "Курячий суп з локшиною", price: 85, category: "Супи" },
      { id: 2, name: "Картопляне пюре з котлеткою", price: 110, category: "Другі страви" },
      { id: 3, name: "Млинці з варенням", price: 75, category: "Десерти" },
      { id: 4, name: "Компот з сухофруктів", price: 40, category: "Напої" },
    ],
    "Доросле": [
      { id: 5, name: "Борщ українській з пампушками", price: 120, category: "Супи" },
      { id: 6, name: "Стейк зі свинини", price: 280, category: "Другі страви" },
      { id: 7, name: "Салат «Олів'є»", price: 95, category: "Салати" },
      { id: 8, name: "Шоколадний фондан", price: 130, category: "Десерти" },
      { id: 9, name: "Вино червоне (бутилка)", price: 450, category: "Напої" },
    ],
    "Весільне": [
      { id: 10, name: "Холодні закуски (асорті)", price: 350, category: "Закуски" },
      { id: 11, name: "Рибне філе запечене", price: 320, category: "Другі страви" },
      { id: 12, name: "Весільний торт (1 кг)", price: 800, category: "Десерти" },
      { id: 13, name: "Шампанське (бутилка)", price: 600, category: "Напої" },
      { id: 14, name: "Салат «Цезар»", price: 140, category: "Салати" },
    ],
    "Поминальне": [
      { id: 15, name: "Кутя", price: 60, category: "Традиційне" },
      { id: 16, name: "Борщ пісний", price: 90, category: "Супи" },
      { id: 17, name: "Вареники з картоплею", price: 110, category: "Другі страви" },
      { id: 18, name: "Голубці", price: 130, category: "Другі страви" },
      { id: 19, name: "Кисіль", price: 45, category: "Напої" },
    ],
    "Хрестини": [
      { id: 20, name: "Святковий салат", price: 130, category: "Салати" },
      { id: 21, name: "Курка запечена", price: 240, category: "Другі страви" },
      { id: 22, name: "Торт «Хрещений»", price: 750, category: "Десерти" },
      { id: 23, name: "Сік натуральний (1 л)", price: 120, category: "Напої" },
    ],
    "Для свят": [
      { id: 24, name: "М'ясна тарілка (асорті)", price: 380, category: "Закуски" },
      { id: 25, name: "Піца «Шоколад»", price: 210, category: "Другі страви" },
      { id: 26, name: "Торт іменинний", price: 700, category: "Десерти" },
      { id: 27, name: "Безалкогольний пунш", price: 160, category: "Напої" },
    ],
  },
  bookedDates: ["2025-05-10", "2025-05-15", "2025-05-20", "2025-06-01", "2025-06-14"],
};

const MENU_THEMES = ["Дитяче", "Доросле", "Весільне", "Поминальне", "Хрестини", "Для свят"];
const ADMIN_PASSWORD = "Stas2409";

const THEME_ICONS = {
  "Дитяче": "🍭",
  "Доросле": "🍷",
  "Весільне": "💍",
  "Поминальне": "🕯️",
  "Хрестини": "👶",
  "Для свят": "🎉",
};

// ============================================================
// STYLES
// ============================================================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

  :root {
    --bg: #0d0a08;
    --bg2: #161210;
    --bg3: #1e1815;
    --gold: #c9a84c;
    --gold2: #e8c97a;
    --cream: #f5ede0;
    --text: #e8ddd0;
    --muted: #8a7a6a;
    --danger: #c0392b;
    --success: #27ae60;
    --border: rgba(201,168,76,0.2);
    --shadow: 0 8px 40px rgba(0,0,0,0.6);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    line-height: 1.7;
  }

  .playfair { font-family: 'Playfair Display', serif; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(13,10,8,0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 24px;
    display: flex; align-items: center; justify-content: space-between;
    height: 64px;
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    color: var(--gold);
    letter-spacing: 2px;
    cursor: pointer;
  }
  .nav-links { display: flex; gap: 8px; flex-wrap: wrap; }
  .nav-btn {
    background: none; border: none; color: var(--muted);
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem; letter-spacing: 1px; text-transform: uppercase;
    cursor: pointer; padding: 8px 12px; border-radius: 4px;
    transition: color 0.2s, background 0.2s;
  }
  .nav-btn:hover, .nav-btn.active { color: var(--gold); background: rgba(201,168,76,0.1); }
  .nav-admin-btn {
    background: none; border: 1px solid var(--border);
    color: var(--muted); font-size: 0.7rem;
    padding: 6px 14px; border-radius: 4px; cursor: pointer;
    font-family: 'Montserrat', sans-serif; letter-spacing: 1px;
    transition: all 0.2s;
  }
  .nav-admin-btn:hover { border-color: var(--gold); color: var(--gold); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 100px 24px 60px;
    background: radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.08) 0%, transparent 70%),
                linear-gradient(180deg, #0d0a08 0%, #1a1208 100%);
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.4;
  }
  .hero-badge {
    display: inline-block;
    border: 1px solid var(--border);
    color: var(--gold); font-size: 0.7rem; letter-spacing: 3px;
    text-transform: uppercase; padding: 6px 20px; border-radius: 40px;
    margin-bottom: 32px;
    background: rgba(201,168,76,0.05);
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 8vw, 6rem);
    color: var(--cream); line-height: 1.1;
    margin-bottom: 8px;
  }
  .hero-title span { color: var(--gold); font-style: italic; }
  .hero-sub {
    color: var(--muted); font-size: clamp(0.85rem, 2vw, 1rem);
    letter-spacing: 3px; text-transform: uppercase;
    margin-bottom: 40px;
  }
  .hero-desc {
    max-width: 540px; color: var(--text); font-size: 0.95rem;
    margin-bottom: 48px; line-height: 1.8;
  }
  .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
  .btn-gold {
    background: linear-gradient(135deg, var(--gold), var(--gold2));
    color: #0d0a08; border: none;
    padding: 14px 36px; border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(201,168,76,0.3);
  }
  .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,168,76,0.4); }
  .btn-outline {
    background: none;
    border: 1px solid var(--border); color: var(--text);
    padding: 14px 36px; border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

  /* SECTION */
  .section { padding: 100px 24px; max-width: 1100px; margin: 0 auto; }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    color: var(--cream); margin-bottom: 12px;
  }
  .section-title span { color: var(--gold); font-style: italic; }
  .section-line {
    width: 60px; height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
    margin-bottom: 48px;
  }

  /* MENU TABS */
  .menu-tabs {
    display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px;
  }
  .menu-tab {
    background: var(--bg3); border: 1px solid var(--border);
    color: var(--muted); padding: 10px 20px; border-radius: 40px;
    cursor: pointer; font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem; letter-spacing: 1px; transition: all 0.2s;
  }
  .menu-tab:hover { border-color: var(--gold); color: var(--gold); }
  .menu-tab.active {
    background: linear-gradient(135deg, var(--gold), var(--gold2));
    border-color: transparent; color: #0d0a08; font-weight: 600;
  }

  /* MENU GRID */
  .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
  .menu-card {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 8px; padding: 20px;
    transition: border-color 0.2s, transform 0.2s;
  }
  .menu-card:hover { border-color: var(--gold); transform: translateY(-2px); }
  .menu-card-category {
    font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 8px;
  }
  .menu-card-name { color: var(--cream); font-size: 0.95rem; margin-bottom: 8px; font-weight: 500; }
  .menu-card-price { color: var(--gold2); font-size: 1.1rem; font-weight: 600; }

  /* CALENDAR */
  .calendar-wrapper {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 12px; padding: 32px; max-width: 500px;
  }
  .cal-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 24px;
  }
  .cal-month {
    font-family: 'Playfair Display', serif;
    color: var(--cream); font-size: 1.2rem;
  }
  .cal-nav {
    background: none; border: 1px solid var(--border);
    color: var(--gold); width: 36px; height: 36px;
    border-radius: 50%; cursor: pointer; font-size: 1rem;
    transition: all 0.2s; display: flex; align-items: center; justify-content: center;
  }
  .cal-nav:hover { background: rgba(201,168,76,0.1); }
  .cal-days-header {
    display: grid; grid-template-columns: repeat(7, 1fr);
    text-align: center; margin-bottom: 8px;
  }
  .cal-day-label { color: var(--muted); font-size: 0.7rem; letter-spacing: 1px; padding: 4px; }
  .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
  .cal-day {
    aspect-ratio: 1; border-radius: 6px; display: flex;
    align-items: center; justify-content: center;
    font-size: 0.85rem; cursor: pointer; transition: all 0.15s;
    color: var(--text); border: 1px solid transparent;
  }
  .cal-day:hover:not(.booked):not(.past):not(.empty) {
    border-color: var(--gold); color: var(--gold);
  }
  .cal-day.empty { cursor: default; }
  .cal-day.past { color: var(--muted); cursor: default; opacity: 0.4; }
  .cal-day.booked { background: rgba(192,57,43,0.2); color: var(--danger); cursor: not-allowed; }
  .cal-day.selected { background: linear-gradient(135deg, var(--gold), var(--gold2)); color: #0d0a08; font-weight: 700; }
  .cal-legend { display: flex; gap: 20px; margin-top: 20px; flex-wrap: wrap; }
  .cal-legend-item { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: var(--muted); }
  .cal-dot { width: 12px; height: 12px; border-radius: 3px; }
  .cal-dot.free { border: 1px solid var(--gold); }
  .cal-dot.booked { background: rgba(192,57,43,0.4); }

  /* BOOKING */
  .booking-panel {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 12px; padding: 32px; margin-top: 32px;
  }
  .booking-title {
    font-family: 'Playfair Display', serif;
    color: var(--cream); font-size: 1.3rem; margin-bottom: 20px;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .form-label { font-size: 0.75rem; letter-spacing: 1px; color: var(--gold); text-transform: uppercase; }
  .form-input, .form-select, .form-textarea {
    background: var(--bg3); border: 1px solid var(--border);
    color: var(--text); padding: 12px 16px; border-radius: 6px;
    font-family: 'Montserrat', sans-serif; font-size: 0.9rem;
    transition: border-color 0.2s; width: 100%;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    outline: none; border-color: var(--gold);
  }
  .form-textarea { min-height: 100px; resize: vertical; }
  .form-select option { background: var(--bg2); }
  .sms-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
  .btn-sms {
    display: flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #1a6b3a, #27ae60);
    color: white; border: none; padding: 14px 24px;
    border-radius: 6px; cursor: pointer; font-size: 0.85rem;
    font-family: 'Montserrat', sans-serif; font-weight: 500;
    text-decoration: none; transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 15px rgba(39,174,96,0.3);
  }
  .btn-sms:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(39,174,96,0.4); }

  /* CONTACTS */
  .contacts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
  .contact-card {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 10px; padding: 28px; text-align: center;
  }
  .contact-icon { font-size: 2rem; margin-bottom: 12px; }
  .contact-label { color: var(--muted); font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
  .contact-value { color: var(--cream); font-size: 1rem; font-weight: 500; }
  .contact-link { color: var(--gold); text-decoration: none; font-size: 1rem; font-weight: 500; }
  .contact-link:hover { color: var(--gold2); }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
  .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 32px; }
  .stat-card {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 8px; padding: 20px; text-align: center;
  }
  .stat-number { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--gold); }
  .stat-label { font-size: 0.7rem; letter-spacing: 2px; color: var(--muted); text-transform: uppercase; }

  /* ADMIN */
  .admin-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.85); display: flex;
    align-items: center; justify-content: center; padding: 20px;
  }
  .admin-modal {
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 12px; padding: 40px; width: 100%; max-width: 900px;
    max-height: 90vh; overflow-y: auto;
  }
  .admin-modal::-webkit-scrollbar { width: 6px; }
  .admin-modal::-webkit-scrollbar-track { background: var(--bg3); }
  .admin-modal::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }
  .admin-title {
    font-family: 'Playfair Display', serif;
    color: var(--gold); font-size: 1.8rem; margin-bottom: 8px;
  }
  .admin-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin: 24px 0; }
  .admin-tab {
    background: var(--bg3); border: 1px solid var(--border);
    color: var(--muted); padding: 8px 18px; border-radius: 4px;
    cursor: pointer; font-size: 0.8rem; transition: all 0.2s;
    font-family: 'Montserrat', sans-serif;
  }
  .admin-tab.active { background: var(--gold); color: #0d0a08; font-weight: 600; border-color: var(--gold); }
  .admin-section-title { color: var(--gold); font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; margin: 24px 0 12px; }
  .admin-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
  .admin-input {
    background: var(--bg3); border: 1px solid var(--border);
    color: var(--text); padding: 10px 14px; border-radius: 6px;
    font-family: 'Montserrat', sans-serif; font-size: 0.85rem;
    flex: 1; transition: border-color 0.2s;
  }
  .admin-input:focus { outline: none; border-color: var(--gold); }
  .btn-danger {
    background: rgba(192,57,43,0.2); border: 1px solid rgba(192,57,43,0.4);
    color: var(--danger); padding: 8px 14px; border-radius: 4px;
    cursor: pointer; font-size: 0.8rem; transition: all 0.2s;
    font-family: 'Montserrat', sans-serif;
  }
  .btn-danger:hover { background: rgba(192,57,43,0.3); }
  .btn-success {
    background: rgba(39,174,96,0.2); border: 1px solid rgba(39,174,96,0.4);
    color: var(--success); padding: 8px 14px; border-radius: 4px;
    cursor: pointer; font-size: 0.8rem; transition: all 0.2s;
    font-family: 'Montserrat', sans-serif;
  }
  .btn-success:hover { background: rgba(39,174,96,0.3); }
  .btn-sm {
    background: var(--bg3); border: 1px solid var(--border);
    color: var(--text); padding: 8px 14px; border-radius: 4px;
    cursor: pointer; font-size: 0.8rem; transition: all 0.2s;
    font-family: 'Montserrat', sans-serif;
  }
  .btn-sm:hover { border-color: var(--gold); color: var(--gold); }
  .close-btn {
    background: none; border: none; color: var(--muted);
    font-size: 1.5rem; cursor: pointer; transition: color 0.2s; float: right;
  }
  .close-btn:hover { color: var(--cream); }
  .saved-toast {
    position: fixed; bottom: 30px; right: 30px; z-index: 999;
    background: var(--success); color: white;
    padding: 14px 24px; border-radius: 8px; font-size: 0.85rem;
    font-family: 'Montserrat', sans-serif;
    box-shadow: 0 4px 20px rgba(39,174,96,0.4);
  }
  .menu-item-row {
    background: var(--bg3); border: 1px solid var(--border);
    border-radius: 6px; padding: 12px; margin-bottom: 8px;
    display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 8px; align-items: center;
  }
  .cal-admin-grid {
    display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-top: 16px;
  }
  .cal-admin-day {
    aspect-ratio: 1; border-radius: 4px; display: flex;
    align-items: center; justify-content: center;
    font-size: 0.8rem; cursor: pointer; border: 1px solid var(--border);
    color: var(--text); transition: all 0.15s;
  }
  .cal-admin-day.booked { background: rgba(192,57,43,0.3); color: var(--danger); border-color: rgba(192,57,43,0.4); }
  .cal-admin-day.empty { opacity: 0; cursor: default; }
  .cal-admin-day.past { opacity: 0.3; cursor: default; }
  .cal-admin-day:not(.booked):not(.empty):not(.past):hover { border-color: var(--danger); color: var(--danger); }

  /* FOOTER */
  .footer {
    background: var(--bg2); border-top: 1px solid var(--border);
    padding: 40px 24px; text-align: center;
  }
  .footer-logo {
    font-family: 'Playfair Display', serif;
    color: var(--gold); font-size: 1.5rem; letter-spacing: 3px; margin-bottom: 16px;
  }
  .footer-text { color: var(--muted); font-size: 0.8rem; }

  /* DIVIDER */
  .divider {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin: 0;
  }

  /* MOBILE */
  @media (max-width: 640px) {
    .nav-links { display: none; }
    .mobile-menu-btn {
      background: none; border: 1px solid var(--border);
      color: var(--gold); padding: 6px 12px; border-radius: 4px; cursor: pointer;
      font-size: 0.9rem;
    }
    .mobile-nav {
      position: fixed; top: 64px; left: 0; right: 0;
      background: var(--bg2); border-bottom: 1px solid var(--border);
      z-index: 99; padding: 16px;
      display: flex; flex-direction: column; gap: 4px;
    }
    .about-grid { grid-template-columns: 1fr; gap: 32px; }
    .form-row { grid-template-columns: 1fr; }
    .menu-item-row { grid-template-columns: 1fr 1fr; }
    .menu-item-row input:last-of-type { display: none; }
  }
  @media (min-width: 641px) {
    .mobile-menu-btn { display: none; }
    .mobile-nav { display: none !important; }
  }
`;

// ============================================================
// UTILS
// ============================================================
const MONTHS_UA = ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];
const DAYS_UA = ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"];

function getCalDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7; // Monday first
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  return cells;
}

function pad(n) { return String(n).padStart(2, "0"); }
function toDateStr(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}`; }

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ShokoladWebsite() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("shokolad_data");
      return saved ? JSON.parse(saved) : DEFAULT_DATA;
    } catch { return DEFAULT_DATA; }
  });

  const [page, setPage] = useState("home");
  const [menuTheme, setMenuTheme] = useState("Доросле");
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: "", phone: "", guests: "", theme: "Доросле", comment: "" });
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminTab, setAdminTab] = useState("menu");
  const [adminMenuTheme, setAdminMenuTheme] = useState("Доросле");
  const [savedToast, setSavedToast] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("shokolad_data", JSON.stringify(data)); } catch {}
  }, [data]);

  const save = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const navTo = (p) => { setPage(p); setMobileNav(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  // ---- ADMIN HELPERS ----
  const updateContact = (key, val) => setData(d => ({ ...d, contacts: { ...d.contacts, [key]: val } }));
  const updateAbout = (key, val) => setData(d => ({ ...d, about: { ...d.about, [key]: val } }));

  const updateMenuItem = (theme, id, key, val) => setData(d => ({
    ...d,
    menus: {
      ...d.menus,
      [theme]: d.menus[theme].map(item => item.id === id ? { ...item, [key]: val } : item)
    }
  }));

  const addMenuItem = (theme) => {
    const newId = Date.now();
    setData(d => ({
      ...d,
      menus: {
        ...d.menus,
        [theme]: [...d.menus[theme], { id: newId, name: "Нова страва", price: 0, category: "Страви" }]
      }
    }));
  };

  const removeMenuItem = (theme, id) => setData(d => ({
    ...d,
    menus: { ...d.menus, [theme]: d.menus[theme].filter(item => item.id !== id) }
  }));

  const toggleBookedDate = (dateStr) => {
    setData(d => {
      const booked = d.bookedDates.includes(dateStr)
        ? d.bookedDates.filter(x => x !== dateStr)
        : [...d.bookedDates, dateStr];
      return { ...d, bookedDates: booked };
    });
  };

  // ---- BUILD SMS URL ----
  const buildSms = (phone) => {
    const d = selectedDate || "не вказано";
    const txt = `Бронювання: ${bookingForm.name}, ${bookingForm.guests} осіб, дата: ${d}, тема: ${bookingForm.theme}. Тел: ${bookingForm.phone}`;
    return `sms:${phone}?body=${encodeURIComponent(txt)}`;
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navTo("home")}>ШОКОЛАД</div>
        <div className="nav-links">
          {[["home","Головна"],["menu","Меню"],["booking","Бронювання"],["about","Про нас"],["contacts","Контакти"]].map(([p,l]) => (
            <button key={p} className={`nav-btn ${page===p?"active":""}`} onClick={() => navTo(p)}>{l}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          <button className="mobile-menu-btn" onClick={() => setMobileNav(!mobileNav)}>☰</button>
          <button className="nav-admin-btn" onClick={() => setAdminOpen(true)}>⚙ Адмін</button>
        </div>
      </nav>

      {mobileNav && (
        <div className="mobile-nav">
          {[["home","Головна"],["menu","Меню"],["booking","Бронювання"],["about","Про нас"],["contacts","Контакти"]].map(([p,l]) => (
            <button key={p} className={`nav-btn ${page===p?"active":""}`} onClick={() => navTo(p)}>{l}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      {page === "home" && (
        <section className="hero">
          <div className="hero-badge">Ресторан • Тернопіль</div>
          <h1 className="hero-title">Рес<span>то</span>ран<br /><span>«Шоколад»</span></h1>
          <p className="hero-sub">Смак, що залишається назавжди</p>
          <p className="hero-desc">{data.about.description}</p>
          <div className="hero-btns">
            <button className="btn-gold" onClick={() => navTo("booking")}>Забронювати</button>
            <button className="btn-outline" onClick={() => navTo("menu")}>Переглянути меню</button>
          </div>
        </section>
      )}

      {/* MENU */}
      {page === "menu" && (
        <div className="section" style={{paddingTop:"100px"}}>
          <h2 className="section-title">Наше <span>Меню</span></h2>
          <div className="section-line" />
          <div className="menu-tabs">
            {MENU_THEMES.map(t => (
              <button key={t} className={`menu-tab ${menuTheme===t?"active":""}`} onClick={() => setMenuTheme(t)}>
                {THEME_ICONS[t]} {t}
              </button>
            ))}
          </div>
          <div className="menu-grid">
            {(data.menus[menuTheme] || []).map(item => (
              <div className="menu-card" key={item.id}>
                <div className="menu-card-category">{item.category}</div>
                <div className="menu-card-name">{item.name}</div>
                <div className="menu-card-price">{item.price} грн</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOKING */}
      {page === "booking" && (
        <div className="section" style={{paddingTop:"100px"}}>
          <h2 className="section-title">Бро<span>ню</span>вання</h2>
          <div className="section-line" />
          <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:"40px",flexWrap:"wrap"}}>
            {/* Calendar */}
            <div>
              <div className="calendar-wrapper">
                <div className="cal-header">
                  <button className="cal-nav" onClick={() => {
                    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
                    else setCalMonth(m => m - 1);
                  }}>‹</button>
                  <div className="cal-month">{MONTHS_UA[calMonth]} {calYear}</div>
                  <button className="cal-nav" onClick={() => {
                    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
                    else setCalMonth(m => m + 1);
                  }}>›</button>
                </div>
                <div className="cal-days-header">
                  {DAYS_UA.map(d => <div className="cal-day-label" key={d}>{d}</div>)}
                </div>
                <div className="cal-grid">
                  {getCalDays(calYear, calMonth).map((day, i) => {
                    if (!day) return <div key={i} className="cal-day empty" />;
                    const dateStr = toDateStr(calYear, calMonth, day);
                    const today = new Date(); today.setHours(0,0,0,0);
                    const thisDate = new Date(dateStr);
                    const isPast = thisDate < today;
                    const isBooked = data.bookedDates.includes(dateStr);
                    const isSel = selectedDate === dateStr;
                    let cls = "cal-day";
                    if (isPast) cls += " past";
                    else if (isBooked) cls += " booked";
                    else if (isSel) cls += " selected";
                    return (
                      <div key={i} className={cls}
                        onClick={() => { if (!isPast && !isBooked) setSelectedDate(dateStr); }}>
                        {day}
                      </div>
                    );
                  })}
                </div>
                <div className="cal-legend">
                  <div className="cal-legend-item"><div className="cal-dot free" /> Вільно</div>
                  <div className="cal-legend-item"><div className="cal-dot booked" /> Зайнято</div>
                </div>
              </div>
            </div>

            {/* Booking form */}
            <div>
              <div className="booking-panel">
                <div className="booking-title">
                  {selectedDate ? `📅 Дата: ${selectedDate}` : "Оберіть дату на календарі"}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Ваше ім'я</label>
                    <input className="form-input" value={bookingForm.name}
                      onChange={e => setBookingForm(f => ({...f, name: e.target.value}))}
                      placeholder="Ім'я та прізвище" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Телефон</label>
                    <input className="form-input" value={bookingForm.phone}
                      onChange={e => setBookingForm(f => ({...f, phone: e.target.value}))}
                      placeholder="0XX XXX XX XX" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Кількість гостей</label>
                    <input className="form-input" type="number" value={bookingForm.guests}
                      onChange={e => setBookingForm(f => ({...f, guests: e.target.value}))}
                      placeholder="Кількість осіб" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Тип заходу</label>
                    <select className="form-select" value={bookingForm.theme}
                      onChange={e => setBookingForm(f => ({...f, theme: e.target.value}))}>
                      {MENU_THEMES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Коментар</label>
                  <textarea className="form-textarea" value={bookingForm.comment}
                    onChange={e => setBookingForm(f => ({...f, comment: e.target.value}))}
                    placeholder="Побажання, особливі вимоги..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Зв'язатися через SMS</label>
                  <div className="sms-btns">
                    <a href={buildSms(data.contacts.phone1)} className="btn-sms">
                      📱 {data.contacts.phone1Name} — {data.contacts.phone1}
                    </a>
                    <a href={buildSms(data.contacts.phone2)} className="btn-sms">
                      📱 {data.contacts.phone2Name} — {data.contacts.phone2}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT */}
      {page === "about" && (
        <div className="section" style={{paddingTop:"100px"}}>
          <h2 className="section-title">Про <span>нас</span></h2>
          <div className="section-line" />
          <div className="about-grid">
            <div>
              <p style={{color:"var(--text)", lineHeight:"1.9", fontSize:"1rem"}}>{data.about.description}</p>
              <div className="about-stats">
                <div className="stat-card">
                  <div className="stat-number">{data.about.founded}</div>
                  <div className="stat-label">Рік заснування</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{data.about.capacity}</div>
                  <div className="stat-label">Місткість</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{MENU_THEMES.length}</div>
                  <div className="stat-label">Теми меню</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Підтримка</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"12px",padding:"32px"}}>
                <div style={{color:"var(--gold)",fontSize:"0.75rem",letterSpacing:"2px",marginBottom:"20px"}}>НАШІ ТЕМИ ЗАХОДІВ</div>
                {MENU_THEMES.map(t => (
                  <div key={t} style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px 0",borderBottom:"1px solid var(--border)"}}>
                    <span style={{fontSize:"1.3rem"}}>{THEME_ICONS[t]}</span>
                    <span style={{color:"var(--cream)"}}>{t}</span>
                    <span style={{marginLeft:"auto",color:"var(--muted)",fontSize:"0.8rem"}}>{data.menus[t]?.length || 0} позицій</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACTS */}
      {page === "contacts" && (
        <div className="section" style={{paddingTop:"100px"}}>
          <h2 className="section-title">Конта<span>кти</span></h2>
          <div className="section-line" />
          <div className="contacts-grid">
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <div className="contact-label">Адреса</div>
              <div className="contact-value">{data.contacts.address}</div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <div className="contact-label">{data.contacts.phone1Name}</div>
              <a className="contact-link" href={`tel:${data.contacts.phone1}`}>{data.contacts.phone1}</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <div className="contact-label">{data.contacts.phone2Name}</div>
              <a className="contact-link" href={`tel:${data.contacts.phone2}`}>{data.contacts.phone2}</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <div className="contact-label">Email</div>
              <a className="contact-link" href={`mailto:${data.contacts.email}`}>{data.contacts.email}</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon">🕐</div>
              <div className="contact-label">Години роботи</div>
              <div className="contact-value">{data.contacts.workHours}</div>
            </div>
          </div>
          <div style={{marginTop:"40px",display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <a href={`tel:${data.contacts.phone1}`} className="btn-gold" style={{textDecoration:"none",display:"inline-block"}}>
              📞 Зателефонувати Стасу
            </a>
            <a href={`tel:${data.contacts.phone2}`} className="btn-outline" style={{textDecoration:"none",display:"inline-block"}}>
              📞 Зателефонувати Юлі
            </a>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="divider" />
      <footer className="footer">
        <div className="footer-logo">ШОКОЛАД</div>
        <div className="footer-text">© {new Date().getFullYear()} Ресторан «Шоколад», Тернопіль. Всі права захищені.</div>
      </footer>

      {/* ADMIN OVERLAY */}
      {adminOpen && (
        <div className="admin-overlay" onClick={e => { if (e.target === e.currentTarget) setAdminOpen(false); }}>
          <div className="admin-modal">
            <button className="close-btn" onClick={() => setAdminOpen(false)}>×</button>
            <div className="admin-title">⚙ Адмін-панель</div>

            {!adminAuth ? (
              <div style={{marginTop:"24px"}}>
                <div className="form-group">
                  <label className="form-label">Пароль</label>
                  <input
                    className="admin-input" type="password"
                    value={adminPass}
                    onChange={e => setAdminPass(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { if (adminPass === ADMIN_PASSWORD) setAdminAuth(true); else alert("Невірний пароль!"); }}}
                    placeholder="Введіть пароль..."
                    style={{maxWidth:"300px"}}
                  />
                </div>
                <button className="btn-gold" onClick={() => {
                  if (adminPass === ADMIN_PASSWORD) setAdminAuth(true);
                  else alert("Невірний пароль!");
                }}>Увійти</button>
              </div>
            ) : (
              <>
                <div className="admin-tabs">
                  {[["menu","🍽 Меню"],["calendar","📅 Календар"],["contacts","📞 Контакти"],["about","ℹ Про нас"]].map(([t,l]) => (
                    <button key={t} className={`admin-tab ${adminTab===t?"active":""}`} onClick={() => setAdminTab(t)}>{l}</button>
                  ))}
                </div>

                {/* MENU TAB */}
                {adminTab === "menu" && (
                  <div>
                    <div className="menu-tabs" style={{marginBottom:"20px"}}>
                      {MENU_THEMES.map(t => (
                        <button key={t} className={`menu-tab ${adminMenuTheme===t?"active":""}`} onClick={() => setAdminMenuTheme(t)}>
                          {THEME_ICONS[t]} {t}
                        </button>
                      ))}
                    </div>
                    <div className="admin-section-title">Позиції меню — {adminMenuTheme}</div>
                    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr auto",gap:"8px",marginBottom:"8px",padding:"0 4px"}}>
                      <span style={{color:"var(--muted)",fontSize:"0.7rem",letterSpacing:"1px"}}>НАЗВА</span>
                      <span style={{color:"var(--muted)",fontSize:"0.7rem",letterSpacing:"1px"}}>КАТЕГОРІЯ</span>
                      <span style={{color:"var(--muted)",fontSize:"0.7rem",letterSpacing:"1px"}}>ЦІНА, грн</span>
                      <span />
                    </div>
                    {(data.menus[adminMenuTheme] || []).map(item => (
                      <div className="menu-item-row" key={item.id}>
                        <input className="admin-input" value={item.name}
                          onChange={e => updateMenuItem(adminMenuTheme, item.id, "name", e.target.value)} />
                        <input className="admin-input" value={item.category}
                          onChange={e => updateMenuItem(adminMenuTheme, item.id, "category", e.target.value)} />
                        <input className="admin-input" type="number" value={item.price}
                          onChange={e => updateMenuItem(adminMenuTheme, item.id, "price", Number(e.target.value))} />
                        <button className="btn-danger" onClick={() => removeMenuItem(adminMenuTheme, item.id)}>✕</button>
                      </div>
                    ))}
                    <div style={{display:"flex",gap:"12px",marginTop:"16px"}}>
                      <button className="btn-success" onClick={() => addMenuItem(adminMenuTheme)}>+ Додати позицію</button>
                      <button className="btn-gold" onClick={save}>💾 Зберегти</button>
                    </div>
                  </div>
                )}

                {/* CALENDAR TAB */}
                {adminTab === "calendar" && (
                  <div>
                    <div className="admin-section-title">Натисніть на дату, щоб позначити як зайняту / вільну</div>
                    <div style={{display:"flex",gap:"12px",alignItems:"center",marginBottom:"16px"}}>
                      <button className="cal-nav" onClick={() => {
                        if (calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1);
                      }}>‹</button>
                      <span style={{color:"var(--cream)",fontFamily:"Playfair Display,serif"}}>{MONTHS_UA[calMonth]} {calYear}</span>
                      <button className="cal-nav" onClick={() => {
                        if (calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1);
                      }}>›</button>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"4px",marginBottom:"8px"}}>
                      {DAYS_UA.map(d=><div key={d} style={{textAlign:"center",color:"var(--muted)",fontSize:"0.7rem"}}>{d}</div>)}
                    </div>
                    <div className="cal-admin-grid">
                      {getCalDays(calYear, calMonth).map((day,i) => {
                        if (!day) return <div key={i} className="cal-admin-day empty" />;
                        const dateStr = toDateStr(calYear, calMonth, day);
                        const today = new Date(); today.setHours(0,0,0,0);
                        const isPast = new Date(dateStr) < today;
                        const isBooked = data.bookedDates.includes(dateStr);
                        let cls = "cal-admin-day";
                        if (isPast) cls += " past";
                        else if (isBooked) cls += " booked";
                        return (
                          <div key={i} className={cls}
                            onClick={() => { if (!isPast) { toggleBookedDate(dateStr); save(); }}}>
                            {day}
                          </div>
                        );
                      })}
                    </div>
                    <div style={{marginTop:"16px",color:"var(--muted)",fontSize:"0.8rem"}}>
                      Зайнято: {data.bookedDates.length} дат
                    </div>
                    <button className="btn-gold" style={{marginTop:"16px"}} onClick={save}>💾 Зберегти</button>
                  </div>
                )}

                {/* CONTACTS TAB */}
                {adminTab === "contacts" && (
                  <div>
                    {[
                      ["phone1","Телефон 1 (Стас)"],
                      ["phone1Name","Ім'я 1"],
                      ["phone2","Телефон 2 (Юля)"],
                      ["phone2Name","Ім'я 2"],
                      ["address","Адреса"],
                      ["email","Email"],
                      ["workHours","Години роботи"],
                    ].map(([key, label]) => (
                      <div className="form-group" key={key}>
                        <label className="form-label">{label}</label>
                        <input className="admin-input" value={data.contacts[key]}
                          onChange={e => updateContact(key, e.target.value)} />
                      </div>
                    ))}
                    <button className="btn-gold" onClick={save}>💾 Зберегти</button>
                  </div>
                )}

                {/* ABOUT TAB */}
                {adminTab === "about" && (
                  <div>
                    {[
                      ["title","Назва ресторану"],
                      ["capacity","Місткість"],
                      ["founded","Рік заснування"],
                    ].map(([key, label]) => (
                      <div className="form-group" key={key}>
                        <label className="form-label">{label}</label>
                        <input className="admin-input" value={data.about[key]}
                          onChange={e => updateAbout(key, e.target.value)} />
                      </div>
                    ))}
                    <div className="form-group">
                      <label className="form-label">Опис</label>
                      <textarea className="form-textarea" value={data.about.description}
                        style={{background:"var(--bg3)",border:"1px solid var(--border)",color:"var(--text)",padding:"12px",borderRadius:"6px",fontFamily:"Montserrat,sans-serif",minHeight:"140px",resize:"vertical",width:"100%"}}
                        onChange={e => updateAbout("description", e.target.value)} />
                    </div>
                    <button className="btn-gold" onClick={save}>💾 Зберегти</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {savedToast && <div className="saved-toast">✓ Збережено успішно!</div>}
    </>
  );
}
