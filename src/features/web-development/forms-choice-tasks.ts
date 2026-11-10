import { htmlDocument, type WebTask } from './tasks';

const baseCss = `    body { margin: 16px; color: #164e63; background-color: #f0fdfa; font-family: Arial, sans-serif; }
    h1 { font-size: 28px; text-align: center; }
    form { box-sizing: border-box; width: 380px; max-width: 100%; margin: 20px auto; padding: 16px; border: 2px solid #0f766e; border-radius: 12px; background-color: white; }
    fieldset { min-width: 0; margin: 0 0 14px; padding: 12px; border: 1px solid #64748b; border-radius: 8px; }
    legend { font-weight: bold; color: #115e59; }
    label { display: block; margin: 8px 0; }
    .text-field, select, textarea { box-sizing: border-box; width: 100%; padding: 8px; font: inherit; border: 1px solid #64748b; border-radius: 6px; }
    input[type="radio"], input[type="checkbox"] { margin-right: 8px; }
    button { margin: 4px; padding: 8px 12px; border: 2px solid #0f766e; border-radius: 6px; background-color: #ccfbf1; color: #134e4a; font: inherit; }
    button:hover { background-color: #99f6e4; }
    input:focus, select:focus, textarea:focus, button:focus { outline: 3px solid #d97706; outline-offset: 2px; }`;

export const formsChoiceTasks: WebTask[] = [
  {
    id: 'forms-choice-picnic',
    title: 'Набір для пікніка',
    brief:
      'Створи навчальну форму «Набір для пікніка» з чотирма fieldset. Додай псевдонім, вибір одного напою, незалежні доповнення та багаторядковий список фруктів. Задай початкові варіанти через checked і selected. Наприкінці додай submit і reset.',
    text: 'Набір для пікніка\nУчасник\nПсевдонім\nОдин напій\nВода\nЧай\nКомпот\nДоповнення\nСерветки\nЛожка\nТермос — недоступно\nФрукти\nМожна вибрати кілька\nЯблуко\nГруша\nСлива\nПеревірити вибір\nВідновити початкове',
    checklist: [
      'Є h1, form і чотири fieldset із legend. Псевдонім має label, унікальний id, name="alias", type="text" і required.',
      'Три radio мають спільний name="drink", різні value water/tea/compote та окремі підписи. Вода має checked.',
      'Три checkbox мають спільний name="extra" і різні value napkins/spoon/flask. Серветки мають checked, термос — disabled.',
      'select має id="fruit", name="fruit", multiple і size="3". Його label пов’язаний через for="fruit".',
      'Три option мають value apple/pear/plum; Яблуко має selected. Можна вибрати кілька фруктів.',
      'form: width 380px, max-width 100%, box-sizing border-box, padding 16px, margin 20px auto. fieldset має min-width: 0.',
      'Кнопки мають type="submit" та type="reset". Reset повертає Воду, Серветки та Яблуко, а псевдонім знову порожній.',
      'У майстерні submit перевіряє required, але не надсилає дані. Макет не оформлює справжнє замовлення.',
    ],
    hint: 'Radio об’єднує однаковий name, а не fieldset. У checkbox той самий name не забороняє кілька позначок. На комп’ютері кілька фруктів можна вибрати з Ctrl або Command; спосіб на телефоні залежить від браузера.',
    referenceHeight: 820,
    reference: htmlDocument(
      'Набір для пікніка',
      `<h1>Набір для пікніка</h1>
<form>
  <fieldset><legend>Учасник</legend>
    <label for="picnic-alias">Псевдонім</label>
    <input class="text-field" id="picnic-alias" name="alias" type="text" required>
  </fieldset>
  <fieldset><legend>Один напій</legend>
    <label><input type="radio" name="drink" value="water" checked>Вода</label>
    <label><input type="radio" name="drink" value="tea">Чай</label>
    <label><input type="radio" name="drink" value="compote">Компот</label>
  </fieldset>
  <fieldset><legend>Доповнення</legend>
    <label><input type="checkbox" name="extra" value="napkins" checked>Серветки</label>
    <label><input type="checkbox" name="extra" value="spoon">Ложка</label>
    <label><input type="checkbox" name="extra" value="flask" disabled>Термос — недоступно</label>
  </fieldset>
  <fieldset><legend>Фрукти</legend>
    <label for="fruit">Можна вибрати кілька</label>
    <select id="fruit" name="fruit" multiple size="3">
      <option value="apple" selected>Яблуко</option><option value="pear">Груша</option><option value="plum">Слива</option>
    </select>
  </fieldset>
  <button type="submit">Перевірити вибір</button><button type="reset">Відновити початкове</button>
</form>`,
      baseCss,
    ),
  },
  {
    id: 'forms-choice-companion',
    title: 'Супутник експедиції',
    brief:
      'Створи три картки з кнопкою перед зображенням: Листок, Птах і Кролик. Через button:focus + img змінюй рамку картинки, коли кнопка отримує фокус. Нижче створи окрему форму для справжнього вибору супутника через radio та двох незалежних умінь через checkbox.',
    text: 'Супутник експедиції\nЛисток\nПтах\nКролик\nФокус показує поточну кнопку. Супутника обираємо в самій формі.\nОдин супутник\nЛисток\nПтах\nКролик\nУміння\nЧитає карту\nПомічає сліди\nПеревірити вибір\nВідновити початкове',
    checklist: [
      'Є h1 та div.characters із трьома div.character. У кожній картці button type="button" стоїть безпосередньо перед img.',
      'characters: display flex, flex-wrap wrap, justify-content center, gap 16px. character: display flex, flex-direction column, align-items center.',
      'Зображення leaf.svg/bird.svg/rabbit.svg мають width 120px, height auto, alt і рамку 2px solid #64748b.',
      'button:focus + img змінює border-color на #b45309. Початковий контур фокуса кнопки залишається видимим.',
      'Під картками є видиме пояснення різниці між фокусом і вибором.',
      'Перший fieldset містить три radio name="companion" із value leaf/bird/rabbit. Птах має checked.',
      'Другий fieldset містить два checkbox name="skill" із value map/tracks. Усі radio й checkbox мають label.',
      'Перевірено Tab і Shift+Tab між кнопками, зміну рамки та збереження radio після переходу фокуса. Reset повертає Птаха.',
    ],
    hint: 'Знак + вибирає наступний сусідній елемент у того самого батька. Якщо між button і img вставити p, правило вже не вибере img. Фокус не зберігає вибір; для цього тут є radio.',
    referenceHeight: 760,
    reference: htmlDocument(
      'Супутник експедиції',
      `<h1>Супутник експедиції</h1>
<div class="characters">
  <div class="character"><button type="button">Листок</button><img src="leaf.svg" alt="Зелений листок"></div>
  <div class="character"><button type="button">Птах</button><img src="bird.svg" alt="Птах на гілці"></div>
  <div class="character"><button type="button">Кролик</button><img src="rabbit.svg" alt="Білий кролик"></div>
</div>
<p>Фокус показує поточну кнопку. Супутника обираємо в самій формі.</p>
<form>
  <fieldset><legend>Один супутник</legend>
    <label><input type="radio" name="companion" value="leaf">Листок</label>
    <label><input type="radio" name="companion" value="bird" checked>Птах</label>
    <label><input type="radio" name="companion" value="rabbit">Кролик</label>
  </fieldset>
  <fieldset><legend>Уміння</legend>
    <label><input type="checkbox" name="skill" value="map">Читає карту</label>
    <label><input type="checkbox" name="skill" value="tracks">Помічає сліди</label>
  </fieldset>
  <button type="submit">Перевірити вибір</button><button type="reset">Відновити початкове</button>
</form>`,
      baseCss +
        `
    .characters { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; }
    .character { display: flex; flex-direction: column; align-items: center; }
    .character img { width: 120px; height: auto; border: 2px solid #64748b; }
    button:focus + img { border-color: #b45309; }`,
    ),
  },
  {
    id: 'forms-choice-homework',
    title: 'Домашня робота: маршрут пригоди',
    brief:
      'Створи форму «Маршрут пригоди» з трьома змістовими групами. Учасник вводить псевдонім, обирає одну стежку зі списку, час через radio й кілька речей через checkbox. Додай поле коментаря, submit і reset. Усі дані вигадані.',
    text: 'Маршрут пригоди\nУчасник\nПсевдонім\nПлан прогулянки\nСтежка\nОберіть стежку\nЛісова\nЛугова\nГірська — недоступно\nРанок\nДень\nРечі в наплічнику\nКарта\nБлокнот\nОлівці\nКоментар\nЙдемо повільно й помічаємо деталі.\nПеревірити план\nВідновити початкове',
    checklist: [
      'Три fieldset мають legend «Учасник», «План прогулянки», «Речі в наплічнику».',
      'Псевдонім — підписаний input type="text" name="alias" required. Для поля використано клас text-field.',
      'Підписаний select name="trail" required містить початковий option value="" selected disabled «Оберіть стежку».',
      'Доступні стежки мають value forest/meadow; гірська має value mountain disabled. Порожній початковий варіант не задовольняє required.',
      'Ранок і День — radio name="time" із різними value morning/day; Ранок має checked.',
      'Карта, Блокнот та Олівці — незалежні checkbox name="equipment" із різними value map/notebook/pencils; Карта має checked.',
      'Підписаний textarea name="comment" має rows="3", resize: vertical і початковий текст між тегами.',
      'Submit перевіряє псевдонім і список. Reset повертає початкову стежку-підказку, Ранок, Карту й текст коментаря.',
      'Перевірено підписи, Tab, клавіші стрілок у radio/select, вузький екран і завантажений HTML офлайн.',
    ],
    hint: 'Початковий option із value="" залишає обов’язковий select без вибору. selected повертається під час reset. Disabled option не можна обрати самостійно, але він може бути початковою підказкою.',
    referenceHeight: 920,
    reference: htmlDocument(
      'Маршрут пригоди',
      `<h1>Маршрут пригоди</h1>
<form>
  <fieldset><legend>Учасник</legend>
    <label for="route-alias">Псевдонім</label><input class="text-field" id="route-alias" name="alias" type="text" required>
  </fieldset>
  <fieldset><legend>План прогулянки</legend>
    <label for="trail">Стежка</label>
    <select id="trail" name="trail" required>
      <option value="" selected disabled>Оберіть стежку</option><option value="forest">Лісова</option><option value="meadow">Лугова</option><option value="mountain" disabled>Гірська — недоступно</option>
    </select>
    <label><input type="radio" name="time" value="morning" checked>Ранок</label>
    <label><input type="radio" name="time" value="day">День</label>
  </fieldset>
  <fieldset><legend>Речі в наплічнику</legend>
    <label><input type="checkbox" name="equipment" value="map" checked>Карта</label>
    <label><input type="checkbox" name="equipment" value="notebook">Блокнот</label>
    <label><input type="checkbox" name="equipment" value="pencils">Олівці</label>
  </fieldset>
  <label for="route-comment">Коментар</label>
  <textarea id="route-comment" name="comment" rows="3">Йдемо повільно й помічаємо деталі.</textarea>
  <button type="submit">Перевірити план</button><button type="reset">Відновити початкове</button>
</form>`,
      baseCss + '\n    textarea { resize: vertical; }',
    ),
  },
];

export const formsChoiceStarter = htmlDocument(
  'Мої варіанти вибору',
  '  <!-- Створи форму, групи полів і зрозумілі підписи. -->',
  '    /* Оформи групи, текстові поля та видимий фокус. */',
);
