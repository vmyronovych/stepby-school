import { htmlDocument, type WebTask } from './tasks';

const formCss = `    body { margin: 20px; background-color: #f0fdfa; color: #134e4a; font-family: Arial, sans-serif; }
    h1 { font-size: 28px; text-align: center; }
    form { box-sizing: border-box; width: 320px; max-width: 100%; margin: 20px auto; padding: 20px; border: 2px solid #0f766e; border-radius: 16px; background-color: white; }
    label { display: block; margin-top: 12px; font-weight: bold; }
    input, textarea { box-sizing: border-box; width: 100%; margin-top: 6px; padding: 8px; border: 1px solid #64748b; border-radius: 6px; font: inherit; }
    textarea { min-height: 90px; resize: vertical; }
    button { margin-top: 16px; padding: 10px 16px; border: 2px solid #0f766e; border-radius: 8px; background-color: #0f766e; color: white; font: inherit; cursor: pointer; }
    button:hover { background-color: #134e4a; }
    input:focus, textarea:focus, button:focus { outline: 3px solid #d97706; outline-offset: 2px; }`;

export const formsTasks: WebTask[] = [
  {
    id: 'forms-club-account',
    title: 'Макет облікового запису',
    brief:
      'Створи навчальний макет «Кабінет читача». Додай форму з чотирма підписаними полями: псевдонім, назва команди, навчальний пароль, повтор навчального пароля. Два перші поля мають type="text", два останні — type="password". Усі поля обов’язкові. Кнопка «Перевірити поля» має type="submit". Це макет без реєстрації; використовуй вигадані значення.',
    text: 'Кабінет читача\nНавчальний макет без реєстрації. Вводь лише вигадані дані.\nПсевдонім\nНазва команди\nНавчальний пароль\nПовтор навчального пароля\nПеревірити поля',
    checklist: [
      'Є один h1 і form. Кожен input має унікальний id та name.',
      'Чотири label пов’язані з відповідними input через for та id.',
      'Є два type="text", два type="password" та required у всіх полях.',
      'Для псевдоніма є placeholder="Наприклад, Лис". Підпис залишається видимим після введення.',
      'Форма: width 320px, max-width 100%, box-sizing border-box, padding 20px, margin 20px auto, рамка 2px solid #0f766e, радіус 16px.',
      'Поля займають 100% ширини з box-sizing: border-box; підписи display: block. Кнопка змінює фон при hover і має видимий фокус.',
      'Порожня форма показує вбудовану перевірку required. Після заповнення майстерня не надсилає дані. Збіг паролів HTML тут не перевіряє.',
    ],
    hint: 'Наприклад: <label for="nickname">Псевдонім</label><input id="nickname" name="nickname" type="text" required>. Парольне поле лише приховує символи. Не вводь справжній пароль.',
    referenceHeight: 660,
    reference: htmlDocument(
      'Кабінет читача — макет',
      `<h1>Кабінет читача</h1>
<p>Навчальний макет без реєстрації. Вводь лише вигадані дані.</p>
<form>
  <label for="nickname">Псевдонім</label>
  <input id="nickname" name="nickname" type="text" placeholder="Наприклад, Лис" required>
  <label for="team">Назва команди</label>
  <input id="team" name="team" type="text" required>
  <label for="practice-password">Навчальний пароль</label>
  <input id="practice-password" name="practice-password" type="password" required>
  <label for="repeat-password">Повтор навчального пароля</label>
  <input id="repeat-password" name="repeat-password" type="password" required>
  <button type="submit">Перевірити поля</button>
</form>`,
      formCss,
    ),
  },
  {
    id: 'forms-workshop-entry',
    title: 'Запрошення до майстерні',
    brief:
      'Створи сторінку «Зелена майстерня» з ілюстрацією leaf.svg і формою поруч. Використай flex із перенесенням рядків. Форма містить підписані поля «Назва команди» і «Код запрошення», кнопку submit «Перевірити запрошення» та звичайну кнопку «Гостьовий режим». Додай посилання до пояснення під макетом. Жодна кнопка не виконує справжній вхід.',
    text: 'Зелена майстерня\nНавчальний макет запрошення\nНазва команди\nКод запрошення\nПеревірити запрошення\nГостьовий режим\nЯк працює макет?\nПро цей макет\nПоля й кнопки допомагають вивчити HTML. Справжній вхід потребує окремої програми.',
    checklist: [
      'Є h1, контейнер entry із leaf.svg та формою. Ілюстрація має змістовний alt.',
      'entry: display flex, flex-wrap wrap, justify-content center, align-items center, gap 24px.',
      'Зображення має width 260px, max-width 100%, height auto. Форма має ширину 320px та max-width 100%.',
      'Обидва input мають type="text", name, required та label з відповідними for/id.',
      'Кнопки мають явні type="submit" і type="button". Звичайна кнопка без програми не має дії.',
      'Посилання href="#about-demo" веде до h2 id="about-demo". Фокус посилання та кнопок видно.',
      'У вузькому вікні блоки переносяться. Немає горизонтальної прокрутки всієї сторінки.',
    ],
    hint: 'Не використовуй фіксовану висоту сторінки. flex-wrap: wrap дозволяє формі перейти під ілюстрацію. Завантаж leaf.svg з матеріалів для локального редактора.',
    referenceHeight: 660,
    reference: htmlDocument(
      'Зелена майстерня — запрошення',
      `<h1>Зелена майстерня</h1>
<p>Навчальний макет запрошення</p>
<div class="entry">
  <img src="leaf.svg" alt="Зелений листок — знак майстерні">
  <form>
    <label for="entry-team">Назва команди</label>
    <input id="entry-team" name="team" type="text" required>
    <label for="entry-code">Код запрошення</label>
    <input id="entry-code" name="code" type="text" placeholder="Навчальний код" required>
    <button type="submit">Перевірити запрошення</button>
    <button type="button">Гостьовий режим</button>
    <p><a href="#about-demo">Як працює макет?</a></p>
  </form>
</div>
<h2 id="about-demo">Про цей макет</h2>
<p>Поля й кнопки допомагають вивчити HTML. Справжній вхід потребує окремої програми.</p>`,
      formCss +
        `
    .entry { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 24px; }
    .entry img { width: 260px; max-width: 100%; height: auto; }
    .entry form { margin: 0; }
    a { color: #075985; }
    a:focus { outline: 3px solid #d97706; outline-offset: 2px; }`,
    ),
  },
  {
    id: 'forms-homework-order',
    title: 'Домашня робота: набір для творчості',
    brief:
      'Створи макет «Набір для творчості». У формі розмісти псевдонім автора з required, пункт видачі з disabled, назву набору та опис із readonly, а також поле коментаря textarea. Додай кнопки submit «Перевірити заявку» і reset «Відновити початкове». Не підключай надсилання заявки.',
    text: 'Набір для творчості\nНавчальна заявка\nПсевдонім автора\nПункт видачі\nШкільна майстерня\nНазва набору\nПаперовий сад\nОпис набору\nКольоровий папір, картон і шаблони листків.\nКоментар\nПотрібен зелений папір.\nПеревірити заявку\nВідновити початкове',
    checklist: [
      'Є h1, form і підписані поля з унікальними id та name.',
      'Псевдонім — input type="text" required з коротким placeholder.',
      'Пункт видачі має value="Шкільна майстерня" disabled; назва набору — value="Паперовий сад" readonly.',
      'Опис — textarea readonly. Його початковий текст записано між тегами textarea.',
      'Коментар — редагований textarea з початковим текстом «Потрібен зелений папір.».',
      'Кнопки мають type="submit" і type="reset". Reset відновлює початковий коментар, а не робить його порожнім.',
      'textarea: min-height 90px, resize vertical. Поля мають padding 8px, width 100%, box-sizing border-box і видимий фокус.',
      'Перевірено Tab, редагування коментаря, повернення початкових значень і required. HTML збережено та відкрито окремо.',
    ],
    hint: 'readonly дозволяє фокус і копіювання; disabled вимикає поле. Reset повертає value та початковий текст textarea. Для порожнього початку залиш текст між тегами textarea порожнім.',
    referenceHeight: 820,
    reference: htmlDocument(
      'Набір для творчості — макет',
      `<h1>Набір для творчості</h1>
<form>
  <h2>Навчальна заявка</h2>
  <label for="author">Псевдонім автора</label>
  <input id="author" name="author" type="text" placeholder="Наприклад, Сова" required>
  <label for="pickup">Пункт видачі</label>
  <input id="pickup" name="pickup" type="text" value="Шкільна майстерня" disabled>
  <label for="kit">Назва набору</label>
  <input id="kit" name="kit" type="text" value="Паперовий сад" readonly>
  <label for="description">Опис набору</label>
  <textarea id="description" name="description" readonly>Кольоровий папір, картон і шаблони листків.</textarea>
  <label for="comment">Коментар</label>
  <textarea id="comment" name="comment">Потрібен зелений папір.</textarea>
  <button type="submit">Перевірити заявку</button>
  <button type="reset">Відновити початкове</button>
</form>`,
      formCss,
    ),
  },
];

export const formsStarter = htmlDocument(
  'Моя навчальна форма',
  '  <!-- Додай заголовок, форму та підписи полів. Використовуй вигадані дані. -->',
  '    /* Оформи форму, поля, кнопки й видимий фокус. */',
);
