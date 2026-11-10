import { htmlDocument, type WebTask } from './tasks';

const baseCss = `    body { margin: 16px; font-family: Arial, sans-serif; color: #134e4a; background-color: #f0fdfa; }
    h1 { font-size: 28px; text-align: center; }
    img { max-width: 100%; height: auto; }
    a { color: #075985; }
    a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible { outline: 3px solid #b45309; outline-offset: 3px; }`;

export const review3Tasks: WebTask[] = [
  {
    id: 'review3-helper-card',
    title: 'Картка помічника експедиції',
    brief:
      'Створи картку вигаданого помічника Тихолиста. Розмісти leaf.svg праворуч через float. Додай ім’я через span class="name", а роль і вміння — окремими абзацами. Центруй саму картку через margin, утримуй обтікання всередині через flow-root.',
    text: 'Помічник експедиції\nІм’я: Тихолист\nРоль: хранитель карти\nУміння: помічає знаки на стежках і записує напрямки.\nУсі відомості описують вигаданого персонажа.',
    checklist: [
      'Є h1 та div.card із зображенням, h2 й двома p. Після картки є примітка про вигаданого персонажа.',
      'card: display: flow-root, width: 340px, max-width: 100%, box-sizing: border-box, margin: 20px auto, padding: 20px, білий фон, рамка 2px solid #0f766e.',
      'leaf.svg має змістовний alt, float: right, width: 100px, max-width: 40%, height: auto, margin: 0 0 12px 15px та border-radius: 50%.',
      'h2 має font-size: 22px. Лише ім’я обгорнуто span class="name" із color: #075985.',
      'Картка охоплює всю картинку. Наступний абзац починається нижче картки й не обтікає її зображення.',
      'У вузькому вікні картка вміщується; для центрування не використано застарілий align.',
    ],
    hint: 'text-align вирівнює текст усередині блока. margin: 20px auto центрує сам блок. flow-root не дає float впливати на текст за межами картки.',
    referenceHeight: 450,
    reference: htmlDocument(
      'Тихолист — помічник експедиції',
      `<h1>Помічник експедиції</h1>
<div class="card">
  <img src="leaf.svg" alt="Листок — знак помічника Тихолиста">
  <h2>Ім’я: <span class="name">Тихолист</span></h2>
  <p>Роль: хранитель карти</p>
  <p>Уміння: помічає знаки на стежках і записує напрямки.</p>
</div>
<p>Усі відомості описують вигаданого персонажа.</p>`,
      baseCss +
        `
    .card { display: flow-root; width: 340px; max-width: 100%; box-sizing: border-box; margin: 20px auto; padding: 20px; background-color: white; border: 2px solid #0f766e; }
    .card img { float: right; width: 100px; max-width: 40%; height: auto; margin: 0 0 12px 15px; border-radius: 50%; }
    h2 { font-size: 22px; }
    .name { color: #075985; }`,
    ),
  },
  {
    id: 'review3-expedition-team',
    title: 'Команда на галявині',
    brief:
      'Створи три картки вигаданих помічників у flex-контейнері. Вирівняй верхні краї та дозволь перенос. Кожна картка має власний колір рамки, картинку, назву й опис. Додай невеликий підпис «Команда» у правому верхньому куті кожної картки через absolute.',
    text: 'Команда на галявині\nТихолист — Зберігає карту стежок.\nБлакитнокрил — Помічає знаки згори.\nСтрибунець — Збирає ідеї для привалу.\nПідпис кожної картки: Команда',
    checklist: [
      'Є h1 та div.team із трьома div.helper. Кожна картка має span.badge, img, h2 та p.',
      'team: display: flex, flex-wrap: wrap, justify-content: center, align-items: flex-start, gap: 20px, margin-top: 24px.',
      'helper: position: relative, width: 190px, max-width: 100%, box-sizing: border-box, padding: 40px 12px 12px, рамка 3px solid #0f766e, border-radius: 12px, білий фон, text-align: center.',
      'Класи bird і rabbit змінюють лише border-color на #0369a1 та #9a3412. Додатковий клас не замінює helper.',
      'badge: position: absolute, top: 8px, right: 8px, padding: 4px, фон #ccfbf1, font-size: 12px.',
      'Картинки leaf.svg, bird.svg, rabbit.svg мають width: 120px, height: auto й змістовні alt. h2: 20px, опис: 15px.',
      'На широкому екрані картки стоять поруч. У вузькому вікні вони переносяться, а підписи не перекривають вміст.',
    ],
    hint: 'helper із position: relative стає опорою для свого badge. padding-top: 40px резервує місце для підпису, який не займає місця у звичайному потоці.',
    referenceHeight: 460,
    reference: htmlDocument(
      'Команда на галявині',
      `<h1>Команда на галявині</h1>
<div class="team">
  <div class="helper"><span class="badge">Команда</span><img src="leaf.svg" alt="Знак Тихолиста"><h2>Тихолист</h2><p>Зберігає карту стежок.</p></div>
  <div class="helper bird"><span class="badge">Команда</span><img src="bird.svg" alt="Знак Блакитнокрила"><h2>Блакитнокрил</h2><p>Помічає знаки згори.</p></div>
  <div class="helper rabbit"><span class="badge">Команда</span><img src="rabbit.svg" alt="Знак Стрибунця"><h2>Стрибунець</h2><p>Збирає ідеї для привалу.</p></div>
</div>`,
      baseCss +
        `
    body { background-image: url("meadow.svg"); }
    .team { display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-start; gap: 20px; margin-top: 24px; }
    .helper { position: relative; width: 190px; max-width: 100%; box-sizing: border-box; padding: 40px 12px 12px; border: 3px solid #0f766e; border-radius: 12px; background-color: white; text-align: center; }
    .bird { border-color: #0369a1; }
    .rabbit { border-color: #9a3412; }
    .badge { position: absolute; top: 8px; right: 8px; padding: 4px; background-color: #ccfbf1; font-size: 12px; }
    .helper img { width: 120px; }
    .helper h2 { font-size: 20px; }
    .helper p { font-size: 15px; }`,
    ),
  },
  {
    id: 'review3-team-form',
    title: 'Домашня робота: анкета експедиції',
    brief:
      'Побудуй навчальну анкету між двома колонками ілюстрацій-посилань. Форма містить псевдонім, навчальний пароль, вибір однієї ролі, кількох умінь, однієї тривалості, місця старту та коментар. Додай submit і reset. Використовуй вигадані дані; макет не реєструє учасників.',
    text: 'Анкета експедиції\nНавчальний макет без реєстрації\nУчасник\nПсевдонім\nНавчальний пароль\nРоль\nКартограф\nСпостерігач\nУміння\nМалювати карту\nЗаписувати нотатки\nТривалість\nКороткий маршрут\nДовгий маршрут\nМісце старту\nГалявина\nМайстерня\nКоментар\nПеревірити анкету\nВідновити початкове\nЗнаки експедиції\nЛисток — карта, птах — спостереження, кролик — ідеї, квітка — привал.',
    checklist: [
      'Є h1 та div.layout із лівою div.side-images, формою та правою div.side-images. layout: flex, flex-wrap: wrap, justify-content: center, align-items: flex-start, gap: 16px.',
      'Кожна бічна колонка: display: flex, flex-direction: column, gap: 10px, width: 100px. Два посилання ведуть до #signs і містять картинки шириною 100px.',
      'Використано leaf.svg, bird.svg, rabbit.svg, flower.svg. Alt називає знак і дію посилання. a:focus img змінює колір рамки, не її товщину.',
      'form: width: 340px, max-width: 100%, box-sizing: border-box, padding: 16px, білий фон, border-radius: 12px; fieldset мають min-width: 0, margin: 0 0 12px, рамку 2px solid #0f766e та legend.',
      'Псевдонім і навчальний пароль мають label, унікальні id, name і required. Пароль має type="password"; звичайні текстові поля — width: 100% із border-box.',
      'Ролі — radio з name="role", тривалості — radio з name="duration". Це дві незалежні групи. Картограф і короткий маршрут мають checked.',
      'Два незалежні checkbox мають name="skills" та різні value. select з label має name="start", варіанти meadow/workshop; Галявина має selected.',
      'Коментар — підписаний textarea name="comment" із rows="3", resize: vertical. Кнопки мають явні type="submit" і type="reset".',
      'Усі поля доступні клавіатурою. Reset повертає початкові варіанти. У перегляді required працює, надсилання заблоковане.',
      'Під макетом є h2 id="signs" та опис знаків. HTML збережено й перевірено офлайн та при ширині 390px.',
    ],
    hint: 'Не задавай всім input ширину 100%: це розтягує radio й checkbox. Дай клас info лише текстовим полям. Різні name розділяють групи radio; видимий фокус не означає збереження вибору.',
    referenceHeight: 1120,
    reference: htmlDocument(
      'Анкета експедиції — макет',
      `<h1>Анкета експедиції</h1>
<p>Навчальний макет без реєстрації</p>
<div class="layout">
  <div class="side-images"><a href="#signs"><img src="leaf.svg" alt="Листок — перейти до опису знаків"></a><a href="#signs"><img src="bird.svg" alt="Птах — перейти до опису знаків"></a></div>
  <form>
    <fieldset><legend>Учасник</legend>
      <label for="expedition-alias">Псевдонім</label><input class="info" id="expedition-alias" name="alias" type="text" required>
      <label for="expedition-password">Навчальний пароль</label><input class="info" id="expedition-password" name="password" type="password" required>
    </fieldset>
    <fieldset><legend>Роль</legend>
      <label><input type="radio" name="role" value="mapmaker" checked> Картограф</label>
      <label><input type="radio" name="role" value="observer"> Спостерігач</label>
    </fieldset>
    <fieldset><legend>Уміння</legend>
      <label><input type="checkbox" name="skills" value="map"> Малювати карту</label>
      <label><input type="checkbox" name="skills" value="notes"> Записувати нотатки</label>
    </fieldset>
    <fieldset><legend>Тривалість</legend>
      <label><input type="radio" name="duration" value="short" checked> Короткий маршрут</label>
      <label><input type="radio" name="duration" value="long"> Довгий маршрут</label>
    </fieldset>
    <label for="expedition-start">Місце старту</label>
    <select id="expedition-start" name="start"><option value="meadow" selected>Галявина</option><option value="workshop">Майстерня</option></select>
    <label for="expedition-comment">Коментар</label><textarea id="expedition-comment" name="comment" rows="3"></textarea>
    <button type="submit">Перевірити анкету</button>
    <button type="reset">Відновити початкове</button>
  </form>
  <div class="side-images"><a href="#signs"><img src="rabbit.svg" alt="Кролик — перейти до опису знаків"></a><a href="#signs"><img src="flower.svg" alt="Квітка — перейти до опису знаків"></a></div>
</div>
<h2 id="signs">Знаки експедиції</h2>
<p>Листок — карта, птах — спостереження, кролик — ідеї, квітка — привал.</p>`,
      baseCss +
        `
    .layout { display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-start; gap: 16px; }
    .side-images { display: flex; flex-direction: column; gap: 10px; width: 100px; }
    .side-images img { box-sizing: border-box; width: 100px; border: 2px solid #0f766e; }
    a:focus img { border-color: #b45309; }
    form { width: 340px; max-width: 100%; box-sizing: border-box; padding: 16px; background-color: white; border-radius: 12px; }
    fieldset { min-width: 0; margin: 0 0 12px; padding: 10px; border: 2px solid #0f766e; }
    legend { font-weight: bold; }
    label { display: block; margin: 6px 0; }
    .info, select, textarea { width: 100%; box-sizing: border-box; padding: 6px; border: 1px solid #64748b; border-radius: 4px; font: inherit; }
    textarea { resize: vertical; }
    button { display: block; margin-top: 12px; padding: 8px 12px; border: 2px solid #0f766e; border-radius: 6px; background-color: #0f766e; color: white; font: inherit; }
    button:hover { background-color: #134e4a; }`,
    ),
  },
];

export const review3Starter = htmlDocument(
  'Повторення: блоки, Flexbox і форми',
  '  <!-- Побудуй сторінку за умовою вибраного завдання. -->',
  '    /* Повтори знайомі правила розташування та оформлення. */',
);
