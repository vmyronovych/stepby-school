---
name: robotics-prepare-wiring
description: Підготуй і перевір схеми, проєкти Mcar та зображення блоків для робототехніки StepBy School. Застосовуй після змін проводки, програм або їхніх зображень.
---

# Підготовка схем і програм

Прочитай [правила схем](../../../CLAUDE.md#схеми) та [обмеження матеріалів](../../../docs/course.md#обмеження-матеріалів). Зміну лише тексту чи розміщення файлів не супроводжуй перегенерацією навчальних матеріалів.

## Підготовка

Виконуй команди з кореня репозиторію. Для Mcar потрібні сусідній каталог `../mcar` з установленими залежностями, зібраний `../mcar/web/dist` і Chromium Playwright. Якщо їх немає, назви недоступний крок; не підміняй знімок Mcar намальованою імітацією.

Редагуй джерела в папці курсу. `dist/` містить лише копії публікації.

## Вибір команди

| Що змінилося | Команда | Результат |
|---|---|---|
| Програми Mcar | `node src/courses/robotics/scripts/generate-projects.mjs ../mcar` | 70 проєктів у `lessons/*/files/` і `scripts/data/projects.json`; переглянь увесь diff |
| Зображення заняття 8 | `node src/courses/robotics/scripts/render-mcar.mjs ../mcar` | Знімки та `lessons/lesson-08/captures.json` |
| Блоки іншого заняття | `node src/courses/robotics/scripts/render-course.mjs --lessons=7` | Зображення вибраного заняття; заміни `7` потрібними номерами через кому |
| Кола занять 1–3 і малюнок гри | `node src/courses/robotics/scripts/render-circuits.mjs` | Зображення, початкові кола в `shared/content/circuit-examples.json` |
| Схеми вибору руху й зупинки | `node src/courses/robotics/scripts/render-line-diagrams.mjs` | Спільні пояснювальні SVG |

Знімки курсу описані в `shared/content/captures.json`; дозволені маршрути проводів — у `scripts/data/wiring-routes.json`. Генератори знімків також оновлюють `shared/content/resources.ts`. Не змінюй контрольну суму без повторного отримання відповідного зображення.

`render-circuits.mjs` відкриває готовий `dist/index.html`: перед ним виконай `npm run build`. Після генерації знову виконай збірку, щоб опублікувати оновлені джерела.

## Перевірка

```sh
npm run build
node src/courses/robotics/scripts/check.mjs ../mcar
node src/courses/robotics/scripts/check-course.mjs ../mcar
```

Потім виконай загальні тести зі спільного `CLAUDE.md`. Переглянь змінені зображення в занятті на комп’ютері й телефоні: контакти, підписи, посадку на макетці та остаточні маршрути проводів. Успішна симуляція не підтверджує відсутності перетинів або роботу фізичного робота.

У підсумку назви змінені матеріали, виконані перевірки й обмеження, що залишилися.
