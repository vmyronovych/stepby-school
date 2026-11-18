import { htmlDocument, type WebTask } from './tasks';

const baseCss = `    body { margin: 16px; font-family: Arial, sans-serif; color: #134e4a; background-color: #f0fdfa; }
    h1 { font-size: 28px; }
    p { line-height: 1.5; }
    label { display: inline-block; padding: 10px 8px; font-weight: bold; }
    input:focus { outline: 3px solid #d97706; outline-offset: 3px; }
    .stage { box-sizing: border-box; margin: 16px 0; padding: 16px; border: 2px solid #0f766e; border-radius: 12px; background-color: white; }
    .pause:checked ~ .stage .animated { animation-play-state: paused; }`;
const reducedCss = `
    @media (prefers-reduced-motion: reduce) {
      .stage .animated { animation: none; transform: none; }
    }`;

export const animationTasks: WebTask[] = [
  {
    id: 'animation-orbit',
    title: 'Листок на орбіті',
    brief:
      'Створи круговий рух leaf.svg навколо центра рамки. Поєднай translate, rotate і зворотний rotate так, щоб листок рухався по колу, але зберігав напрямок. Додай доступний прапорець паузи. Це геометрична модель, а не симуляція природного руху.',
    text: 'Листок на орбіті\nПризупинити рух\nЛисток обходить центр за 4 секунди. Зворотний поворот зберігає його напрямок.\nУ режимі зменшеного руху листок стоїть біля центра.',
    checklist: [
      'Є h1, input type="checkbox" class="pause" id="orbit-pause" і пов’язаний label. Прапорець стоїть перед .stage як сусід.',
      '.orbit має position: relative, width: 280px, max-width: 100%, height: 280px, box-sizing: border-box, margin: 0 auto, рамку 2px dashed #94a3b8.',
      '.leaf має класи leaf animated, position: absolute, top: 50%, left: 50%, width: 70px, height: auto, змістовний alt і animation: orbit 4s linear infinite.',
      'Кадри orbit: від translate(-50%, -50%) rotate(0deg) translateX(70px) rotate(0deg) до translate(-50%, -50%) rotate(360deg) translateX(70px) rotate(-360deg).',
      '.pause:checked ~ .stage .animated задає animation-play-state: paused. Зняття позначки продовжує рух, а не починає цикл заново.',
      'Медіазапит prefers-reduced-motion: reduce задає .stage .animated { animation: none; transform: none; }. Листок залишається видимим.',
      'Усі положення листка містяться в рамці. Tab і Пробіл керують паузою. HTML та leaf.svg збережено для роботи офлайн.',
    ],
    hint: 'Функції transform не можна довільно переставляти: порядок змінює результат. Перший translate центрує картинку, перший rotate повертає напрямок радіуса, translateX задає радіус, останній rotate компенсує поворот картинки.',
    referenceHeight: 600,
    referenceTimeMs: 1000,
    reference: htmlDocument(
      'Листок на орбіті',
      `<h1>Листок на орбіті</h1>
<input class="pause" id="orbit-pause" type="checkbox"><label for="orbit-pause">Призупинити рух</label>
<div class="stage"><div class="orbit"><span class="center">+</span><img class="leaf animated" src="leaf.svg" alt="Листок на круговій траєкторії"></div></div>
<p>Листок обходить центр за 4 секунди. Зворотний поворот зберігає його напрямок.</p>
<p>У режимі зменшеного руху листок стоїть біля центра.</p>`,
      baseCss +
        `
    .orbit { position: relative; box-sizing: border-box; width: 280px; max-width: 100%; height: 280px; margin: 0 auto; border: 2px dashed #94a3b8; }
    .center { position: absolute; top: 50%; left: 50%; color: #64748b; }
    .leaf { position: absolute; top: 50%; left: 50%; width: 70px; height: auto; animation: orbit 4s linear infinite; }
    @keyframes orbit {
      from { transform: translate(-50%, -50%) rotate(0deg) translateX(70px) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(360deg) translateX(70px) rotate(-360deg); }
    }` +
        reducedCss,
    ),
  },
  {
    id: 'animation-parcel',
    title: 'Пакунок на доріжці',
    brief:
      'Намалюй пакунок CSS і перемісти його на 180px праворуч за 5 секунд після затримки 1 секунда. Одночасно поверни його на 12deg і трохи збільш. Виконай один цикл із forwards, щоб пакунок залишився в кінцевому стані. Додай паузу та зменшений рух.',
    text: 'Пакунок на доріжці\nПризупинити рух\nПауза — 1 секунда, рух — 5 секунд, один прохід.\nПакунок залишається в кінці через forwards. Онови результат, щоб почати знову.',
    checklist: [
      'Є підписаний прапорець .pause перед .stage. Усередині .stage є .track та .parcel.animated із текстом «Пакунок».',
      '.track: position: relative, height: 140px, border-bottom: 3px solid #64748b. Пакунок: position: absolute, top: 40px, left: 8px, width: 48px, height: 48px, box-sizing: border-box.',
      'Пакунок має фон #fed7aa, рамку 2px solid #9a3412, font-size: 10px, display: flex, align-items: center, justify-content: center.',
      'Animation: delivery 5s ease-in-out 1s 1 forwards. Це ім’я, тривалість, функція часу, затримка, кількість циклів і збереження кінцевого стану.',
      'From: translateX(0) rotate(0deg) scale(1); to: translateX(180px) rotate(12deg) scale(1.1). У кінці тінь більша: box-shadow: 8px 8px 14px rgba(15, 23, 42, 0.25).',
      'Пауза керує animation-play-state. Після завершення руху зняття паузи не запускає новий цикл; онови результат для нового запуску.',
      'При prefers-reduced-motion: reduce анімацію вимкнено. На вузькому екрані пакунок і тінь не перекривають текст та не створюють прокрутки всього документа.',
    ],
    hint: 'Animation-delay додається перед тривалістю руху. Тут завершення настає через 1 + 5 = 6 секунд. Forwards зберігає кінцеві значення анімації, але не змінює початковий CSS у файлі.',
    referenceHeight: 460,
    referenceTimeMs: 2500,
    reference: htmlDocument(
      'Пакунок на доріжці',
      `<h1>Пакунок на доріжці</h1>
<input class="pause" id="parcel-pause" type="checkbox"><label for="parcel-pause">Призупинити рух</label>
<div class="stage"><div class="track"><div class="parcel animated">Пакунок</div></div></div>
<p>Пауза — 1 секунда, рух — 5 секунд, один прохід.</p>
<p>Пакунок залишається в кінці через forwards. Онови результат, щоб почати знову.</p>`,
      baseCss +
        `
    .track { position: relative; height: 140px; border-bottom: 3px solid #64748b; }
    .parcel { position: absolute; top: 40px; left: 8px; box-sizing: border-box; width: 48px; height: 48px; background-color: #fed7aa; border: 2px solid #9a3412; font-size: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 2px 2px 4px rgba(15, 23, 42, 0.2); animation: delivery 5s ease-in-out 1s 1 forwards; }
    @keyframes delivery {
      from { transform: translateX(0) rotate(0deg) scale(1); box-shadow: 2px 2px 4px rgba(15, 23, 42, 0.2); }
      to { transform: translateX(180px) rotate(12deg) scale(1.1); box-shadow: 8px 8px 14px rgba(15, 23, 42, 0.25); }
    }` +
        reducedCss,
    ),
  },
  {
    id: 'animation-timing-lab',
    title: 'Домашня робота: лабораторія швидкості',
    brief:
      'Порівняй п’ять однакових маркерів на підписаних доріжках. Усі проходять однакові 200px за 4 секунди, але використовують різні функції часу. Після проходу вони повертаються через alternate. Один прапорець ставить на паузу всю лабораторію.',
    text: 'Лабораторія швидкості\nПризупинити всі маркери\nlinear — рівномірно\nease — повільний початок і кінець\nease-in — прискорення\nease-out — сповільнення\nease-in-out — плавний початок і кінець\nШлях і тривалість однакові. Різниця — у зміні швидкості протягом проходу.',
    checklist: [
      'Є h1, підписаний прапорець .pause і .stage із п’ятьма p та div.lane. Кожна lane містить div.dot.animated.',
      'Кожна lane має box-sizing: border-box, width: 260px, max-width: 100%, height: 40px, рамку 1px solid #64748b і margin-bottom: 12px.',
      'Dot: width: 24px, height: 24px, border-radius: 50%, margin: 7px, фон #0f766e. Animation: travel 4s infinite alternate.',
      'Кадри travel: from transform: translateX(0), to transform: translateX(200px). Обидва напрямки залишаються всередині доріжки.',
      'П’ять додаткових класів задають animation-timing-function: linear, ease, ease-in, ease-out та ease-in-out.',
      'Пауза через .pause:checked ~ .stage .animated працює для всіх маркерів. При prefers-reduced-motion: reduce всі п’ять залишаються видимими без руху.',
      'Перевір на 0, 1, 2, 3 і 4 секундах: початкова й кінцева позиції збігаються між доріжками; проміжні можуть різнитися.',
      'HTML збережено, повторно відкрито й перевірено без мережі. Підписи дозволяють порівнювати рух без відмінностей кольору.',
    ],
    hint: 'Функція часу не змінює довжину шляху чи загальну тривалість. Alternate змінює напрямок кожного наступного проходу, тому маркер повертається без миттєвого стрибка на початок.',
    referenceHeight: 740,
    referenceTimeMs: 2000,
    reference: htmlDocument(
      'Лабораторія швидкості',
      `<h1>Лабораторія швидкості</h1>
<input class="pause" id="timing-pause" type="checkbox"><label for="timing-pause">Призупинити всі маркери</label>
<div class="stage">
<p>linear — рівномірно</p><div class="lane"><div class="dot animated linear"></div></div>
<p>ease — повільний початок і кінець</p><div class="lane"><div class="dot animated ease"></div></div>
<p>ease-in — прискорення</p><div class="lane"><div class="dot animated ease-in"></div></div>
<p>ease-out — сповільнення</p><div class="lane"><div class="dot animated ease-out"></div></div>
<p>ease-in-out — плавний початок і кінець</p><div class="lane"><div class="dot animated ease-in-out"></div></div>
</div>
<p>Шлях і тривалість однакові. Різниця — у зміні швидкості протягом проходу.</p>`,
      baseCss +
        `
    .lane { box-sizing: border-box; width: 260px; max-width: 100%; height: 40px; border: 1px solid #64748b; margin-bottom: 12px; }
    .dot { width: 24px; height: 24px; border-radius: 50%; margin: 7px; background-color: #0f766e; animation: travel 4s infinite alternate; }
    .linear { animation-timing-function: linear; }
    .ease { animation-timing-function: ease; }
    .ease-in { animation-timing-function: ease-in; }
    .ease-out { animation-timing-function: ease-out; }
    .ease-in-out { animation-timing-function: ease-in-out; }
    @keyframes travel { from { transform: translateX(0); } to { transform: translateX(200px); } }` +
        reducedCss,
    ),
  },
];

export const animationStarter = htmlDocument(
  'Моя CSS-анімація',
  '  <!-- Додай заголовок, прапорець паузи та сцену. -->',
  '    /* Спочатку оформи нерухомий стан. Потім додай @keyframes і animation. */',
);
