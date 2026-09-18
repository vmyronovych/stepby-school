/* =========================================================
   МОДУЛЬ 2 — поурочні плани, заняття 6-12
   Витяг із вихідного порталу гуртка. Не редагується вручну по дрібницях:
   це навчальний матеріал, а не код.
   ========================================================= */
ROBO.sections['mod2'] = {
  title: `Модуль 2. Pico і MicroBlocks: виходи`,
  html: `<p>Сім занять, у яких програма керує світлом і звуком. Живлення тільки від USB. Поняття програмування вводяться по одному на заняття: послідовність і нескінченний цикл (6), цикл з лічильником (7), власний блок (8), бібліотека й параметр (9), змінна (10), випадкове число (11), планування програми на папері (12).</p>
<p>Блок-програми на ілюстраціях намальовані умовно. Назви й вигляд блоків у твоїй версії MicroBlocks та мові інтерфейсу можуть відрізнятись, тому перед кожним заняттям збери програму сам і, якщо треба, зроби знімок екрана замість моєї картинки.</p>
<h2 id="mod2-0">Підготовка до модуля (один раз)</h2>
<ul>
<li><strong>Шкільні комп'ютери.</strong> На кожному ПК перевірити: відкривається MicroBlocks у Chrome або Edge, кнопка підключення бачить плату, блимає вбудований світлодіод. Перевіряти під обліковим записом учня, не вчителя. Якщо в школі немає інтернету в кабінеті або він нестабільний, потрібна встановлена версія MicroBlocks: з'ясувати це до заняття 6, не на ньому.</li>
<li><strong>Прошивка.</strong> Кожен Pico прошити заздалегідь: затиснути BOOTSEL, підключити USB, плата з'являється як флешка, перетягнути файл прошивки MicroBlocks. Підписати плати номерами пар.</li>
<li><strong>Pico в макетці.</strong> Вставити самому, один раз на рік: USB-роз'єм до лівого краю, ніжки в рядках c і h, стовпчики 1-20. Тиснути рівномірно з обох країв, плата йде туго. Дітям виймати заборонено.</li>
<li><strong>Правило нумерації, яке з цього виходить.</strong> Нижній ряд (h): номер стовпчика макетки дорівнює номеру піна. Верхній ряд (c): номер піна дорівнює 41 мінус стовпчик. Тобто GP15 (пін 20) це стовпчик 20 знизу, GP16 (пін 21) це стовпчик 20 зверху. Під кожною ніжкою лишається два вільні отвори: i та j знизу, a та b зверху.</li>
<li><strong>USB-кабелі.</strong> Кожен перевірити: частина дешевих кабелів лише заряджає, з ними плату не видно. Непридатні викинути одразу, інакше вони повернуться в коробку.</li>
<li><strong>Картка розпіновки</strong> на кожну парту, з головної вкладки.</li>
</ul>
<h2 id="mod2-1">Заняття 6. Знайомство з Pico і MicroBlocks</h2>
<p>Наприкінці заняття кожна пара написала програму, яка блимає спершу вбудованим світлодіодом, а потім зовнішнім на макетці, і змінила в ній числа за власним бажанням.</p>
<p><strong>Що діти мають винести:</strong> мікроконтролер це маленький комп'ютер, який робить те, що написано в програмі, рядок за рядком; «завжди» означає повторювати без кінця; схему тепер вмикає не палець, а програма.</p>
<p><strong>На парту:</strong> макетка з Pico, USB-кабель, зелений світлодіод, резистор 220 Ом, 1 зелена і 2 чорні перемички.</p>
<p><strong>Вчителю:</strong> проєктор з відкритим MicroBlocks, запасна прошита плата, запасний кабель.</p>
<h3>Частина 1 (45 хв): перша програма</h3>
<p><strong>0-8 хв. Хто тиснутиме кнопки замість нас.</strong> Згадати кінець заняття 3: регулювальник світлофора втомився. Сьогодні знайомимось з тим, хто не втомлюється. Питання класу: де вдома є пристрої, які самі щось вирішують? Пралка (скільки прати), мікрохвильовка (коли пискнути), іграшка, що співає. У кожному такий самий маленький комп'ютер.</p>
<p><strong>8-15 хв. Огляд плати.</strong> Макетки на столах, USB ще не підключений.</p>
<figure class="fig" data-name="l6_pico"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 350'  data-h='350' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='350' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Raspberry Pi Pico: що де</text>
<rect x='60' y='120' width='380' height='120' rx='8' fill='#2b8a3e' stroke='#1b5e28' stroke-width='3'/>
<rect x='46' y='160' width='40' height='40' rx='4' fill='#adb5bd' stroke='#495057' stroke-width='2'/>
<rect x='230' y='155' width='54' height='54' rx='4' fill='#212529'/>
<text x='257' y='186' font-size='11' fill='#adb5bd' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>RP2040</text>
<rect x='120' y='168' width='26' height='22' rx='3' fill='#f1f3f5' stroke='#495057'/><circle cx='133' cy='179' r='6' fill='#495057'/>
<rect x='96' y='138' width='12' height='8' rx='2' fill='#51cf66'/>
<circle cx='76.0' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='76.0' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='94.3' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='94.3' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='112.6' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='112.6' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='130.9' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='130.9' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='149.2' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='149.2' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='167.5' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='167.5' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='185.8' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='185.8' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='204.1' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='204.1' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='222.4' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='222.4' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='240.70000000000002' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='240.70000000000002' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='259.0' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='259.0' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='277.3' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='277.3' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='295.6' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='295.6' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='313.9' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='313.9' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='332.2' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='332.2' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='350.5' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='350.5' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='368.8' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='368.8' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='387.1' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='387.1' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='405.40000000000003' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='405.40000000000003' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='423.7' cy='129' r='5' fill='#c9a227' stroke='#7a5c00'/>
<circle cx='423.7' cy='231' r='5' fill='#c9a227' stroke='#7a5c00'/>
<line x1='150' y1='319' x2='66' y2='190' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='66' cy='190' r='3' fill='#5b6475'/>
<rect x='35.0' y='318' width='230.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='150' y='336' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>USB: живлення і програма</text>
<line x1='150' y1='73' x2='102' y2='142' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='102' cy='142' r='3' fill='#5b6475'/>
<rect x='48.5' y='52' width='203.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='150' y='70' font-size='15' fill='#2b8a3e' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>вбудований світлодіод</text>
<line x1='360' y1='319' x2='133' y2='179' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='133' cy='179' r='3' fill='#5b6475'/>
<rect x='290.0' y='318' width='140.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='360' y='336' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>кнопка BOOTSEL</text>
<line x1='50' y1='271' x2='76' y2='231' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='76' cy='231' r='3' fill='#5b6475'/>
<rect x='20.5' y='270' width='59.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='50' y='288' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>пін 1</text>
<line x1='440' y1='271' x2='423.7' y2='231' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='423.7' cy='231' r='3' fill='#5b6475'/>
<rect x='406.0' y='270' width='68.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='440' y='288' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>пін 20</text>
<line x1='440' y1='73' x2='423.7' y2='129' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='423.7' cy='129' r='3' fill='#5b6475'/>
<rect x='406.0' y='52' width='68.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='440' y='70' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>пін 21</text>
</svg><figcaption>Raspberry Pi Pico: USB, вбудований світлодіод, кнопка BOOTSEL, нумерація пінів</figcaption></figure>

<p>Діти пальцем знаходять: роз'єм USB, крихітний вбудований світлодіод біля нього, пін 1, пін 20, пін 21. Правило: плату з макетки не виймаємо, кнопку BOOTSEL не чіпаємо.</p>
<p><strong>15-25 хв. Підключення, усі разом.</strong> Крок за кроком на проєкторі, ніхто не біжить уперед: відкрити MicroBlocks, вставити кабель, натиснути кнопку підключення, вибрати плату у вікні браузера. Індикатор підключення став зеленим: підняти руку. Поки не підключились усі, далі не йдемо. На це реально йде 10 хвилин.</p>
<p><strong>25-32 хв. Блок виконується від клацання.</strong> Знайти блок керування вбудованим світлодіодом, витягти на поле, клацнути по ньому. Світлодіод на платі засвітився. Перемкнути значення, клацнути ще раз: згас. Дати хвилину просто поклацати. Сказати дітям: «Ви щойно віддали комп'ютеру наказ. Програма це багато наказів, складених у стовпчик».</p>
<p><strong>32-45 хв. Програма «блимання».</strong></p>
<figure class="fig" data-name="l6_prog"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'  data-h='300' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='300' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='20' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Перша програма: блимання</text>
<path d='M60,66 q40.150000000000006,-22 80.30000000000001,0 h80.30000000000001 v34 h-160.60000000000002 z' fill='#e67700' stroke='#00000033'/>
<text x='72' y='88.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>коли запущено</text>
<rect x='60' y='100' width='120' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='72' y='122.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>завжди</text>
<rect x='78' y='136' width='321.9' height='34' rx='6' fill='#1c7ed6' stroke='#00000033'/>
<text x='90' y='158.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>вбудований світлодіод </text>
<rect x='318.4' y='142' width='60.5' height='22' rx='11.0' fill='#fff'/>
<text x='348.65' y='158.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>увімк</text>
<rect x='78' y='172' width='180.9' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='90' y='194.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>чекати </text>
<rect x='165.4' y='178' width='41.9' height='22' rx='11.0' fill='#fff'/>
<text x='186.35' y='194.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>500</text>
<text x='212.3' y='194.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> мс</text>
<rect x='78' y='208' width='312.6' height='34' rx='6' fill='#1c7ed6' stroke='#00000033'/>
<text x='90' y='230.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>вбудований світлодіод </text>
<rect x='318.4' y='214' width='51.2' height='22' rx='11.0' fill='#fff'/>
<text x='344.0' y='230.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>вимк</text>
<rect x='78' y='244' width='180.9' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='90' y='266.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>чекати </text>
<rect x='165.4' y='250' width='41.9' height='22' rx='11.0' fill='#fff'/>
<text x='186.35' y='266.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>500</text>
<text x='212.3' y='266.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> мс</text>
<rect x='60' y='130' width='18' height='154' fill='#f08c00'/>
<rect x='60' y='282' width='72.0' height='16' rx='6' fill='#f08c00' stroke='#00000033'/>
</svg><figcaption>Перша програма: коли запущено, завжди, увімкнути, чекати, вимкнути, чекати</figcaption></figure>

<p>Збираємо разом, блок за блоком. Перед запуском гра «Я робот»: один учень читає програму вголос рядок за рядком, другий рукою показує, що робить світлодіод (долоня розкрита: світить, кулак: ні). Дійшли до кінця, куди далі? Нагору, бо «завжди». Запустити. Потім кожна пара міняє числа: 100 і 100, 1000 і 100, 50 і 50. Питання: що буде, якщо прибрати останнє «чекати»? Спершу прогноз, потім перевірка. Світлодіод ніби не гасне: він вимикається і за мить вмикається знову, око не встигає.</p>
<h3>Частина 2 (45 хв): програма керує схемою</h3>
<p><strong>0-5 хв. Правило живої плати.</strong> Кабель тепер підключений, на платі є напруга. Тому: схему міняємо акуратно, на макетку не кладемо нічого металевого (ножиці, скріпки, фольгу з минулих занять).</p>
<p><strong>5-25 хв. Зовнішній світлодіод.</strong></p>
<figure class="fig" data-name="l6_schema"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 444'  data-h='444' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='444' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='20' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Зовнішній світлодіод на GP15</text>
<rect x='21' y='48' width='480' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='232.0' width='464' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='61' x2='487' y2='61' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='77' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='105' x2='487' y2='105' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='99' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='369' x2='487' y2='369' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='385' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='413' x2='487' y2='413' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='407' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>11</text>
<text x='140.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='250.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>20</text>
<text x='360.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>25</text>
<text x='470.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>30</text>
<text x='492' y='134' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='492' y='156' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='492' y='178' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='492' y='200' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='492' y='222' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='492' y='260' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='492' y='282' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='492' y='304' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='492' y='326' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='492' y='348' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='41.0' y='163' width='222.0' height='148' rx='0' fill='#2b8a3e' stroke='#1b5e28' stroke-width='2'/>
<polygon points='39.0,163 41.0,163.0 47.0,181.5 41.0,200.0 47.0,218.5 41.0,237.0 47.0,255.5 41.0,274.0 47.0,292.5 41.0,311.0 39.0,311' fill='#f4f1e8'/>
<rect x='130.0' y='217.0' width='44' height='40' rx='3' fill='#212529'/>
<text x='152.0' y='241.0' font-size='9' fill='#adb5bd' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>RP2040</text>
<text x='152.0' y='209.0' font-size='11' fill='#d3f9d8' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Raspberry Pi Pico</text>
<circle cx='52.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='52.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='74.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='74.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='96.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='96.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='118.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='118.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='140.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='140.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='162.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='162.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='184.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='184.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='206.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='206.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='206.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>G</text>
<circle cx='228.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='228.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='250.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='250.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='250.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<path d='M250.0,344 Q283.0,367.1 316.0,344' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M250.0,344 Q283.0,367.1 316.0,344' fill='none' stroke='#2f9e44' stroke-width='5' stroke-linecap='round'/>
<circle cx='250.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='316.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='316.0' y1='278' x2='404.0' y2='278' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(360.0,278.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='360.0' y='265.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>220</text>
<circle cx='415.0' cy='322.0' r='30.0' fill='#e03131' opacity='0.4'/>
<line x1='404.0' y1='322' x2='426.0' y2='322' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='415.0' cy='322.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='411.0' cy='318.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<text x='395.0' y='313.0' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M426.0,344 Q426.0,373.0 426.0,402' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M426.0,344 Q426.0,373.0 426.0,402' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='426.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='426.0' cy='402' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M206.0,344 Q206.0,373.0 206.0,402' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M206.0,344 Q206.0,373.0 206.0,402' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='206.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='206.0' cy='402' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='283.0' cy='370' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='283.0' y='375.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<circle cx='360.0' cy='214' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='360.0' y='219.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>2</text>
<circle cx='454.6' cy='322' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='454.6' y='327.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3</text>
<circle cx='454.6' cy='380' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='454.6' y='385.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>4</text>
<circle cx='177.39999999999998' cy='380' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='177.39999999999998' y='385.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
</svg><figcaption>Зовнішній світлодіод на GP15, кроки 1-5</figcaption></figure>

<ol>
<li>Зелена перемичка з 20j (під піном GP15) у 23j.</li>
<li>Резистор 220 Ом з 23g у 27g.</li>
<li>Світлодіод: довга ніжка в 27i, коротка в 28i.</li>
<li>Чорна перемичка з 28j в нижню шину мінуса.</li>
<li>Чорна перемичка з 18j (під піном GND, на картці позначений G) у ту саму шину мінуса.</li>
</ol>
<p>Питання перед запуском: де тут батарейка? Роль плюса грає пін GP15: коли програма його вмикає, на ньому з'являється напруга. Мінус це пін GND. Діти ведуть пальцем шлях: пін 15, перемичка, резистор, світлодіод, шина, GND.</p>
<p><strong>25-35 хв. Та сама програма, інший блок.</strong> Замінити блок вбудованого світлодіода на блок цифрового піна з номером 15. Спершу перевірити клацанням по окремому блоку, потім запустити програму. Це правило на весь рік: спочатку клацанням перевіряємо схему, потім пишемо програму. Так зрозуміло, де шукати помилку.</p>
<p><strong>35-43 хв. Завдання: SOS.</strong> Згадати заняття 2. Три короткі спалахи, три довгі, три короткі, довга пауза. Програма виходить довгою, і це добре: на наступному занятті з'явиться блок, який її скоротить.</p>
<p><strong>43-45 хв.</strong> Зберегти програму у файл з іменем пари. Від'єднати кабель. Схему можна лишити: заняття 7 її розширює.</p>
<h3>Типові несправності</h3>
<table>
<thead>
<tr>
<th>Що бачимо</th>
<th>Причина</th>
<th>Що робити</th>
</tr>
</thead>
<tbody>
<tr>
<td>Плати немає в списку підключення</td>
<td>Кабель без ліній даних</td>
<td>Замінити кабель, непридатний у смітник</td>
</tr>
<tr>
<td>Плата є, але не підключається</td>
<td>MicroBlocks відкритий у двох вкладках, порт зайнятий</td>
<td>Закрити зайву вкладку</td>
</tr>
<tr>
<td>Підключилась, блоки не діють</td>
<td>Плата без прошивки MicroBlocks</td>
<td>Видати запасну, цю прошити після уроку</td>
</tr>
<tr>
<td>Вбудований блимає, зовнішній ні</td>
<td>Перемичка не під тим піном</td>
<td>Рахувати стовпчики від USB: GP15 це стовпчик 20, нижній ряд</td>
</tr>
<tr>
<td>Зовнішній не світить і від клацання</td>
<td>Немає перемички з GND або світлодіод навпаки</td>
<td>Пройти шлях пальцем за картинкою</td>
</tr>
</tbody>
</table>
<h3>Перевірка розуміння</h3>
<ol>
<li>Що робить блок «завжди»? Повторює все, що всередині, без кінця.</li>
<li>Що зміниться, якщо обидва «чекати» зробити по 2000? Блиматиме повільно: дві секунди світить, дві ні.</li>
<li>Хто тепер замість батарейки? Пін GP15, а мінус це GND.</li>
</ol>
<p><strong>Для швидких:</strong> «серцебиття»: два короткі спалахи, довга пауза. Або слово з картки Морзе заняття 2.</p>
<h2 id="mod2-2">Заняття 7. Три світлодіоди і цикл «повторити»</h2>
<p>Наприкінці заняття на макетці три світлодіоди, якими керує програма: біжучий вогонь і мигалка. Діти вперше скоротили програму циклом.</p>
<p><strong>Що діти мають винести:</strong> кожен пін керується окремо, своїм номером; якщо щось повторюється, це не копіюють, а загортають у «повторити»; схему перевіряємо клацанням до того, як писати програму.</p>
<p><strong>На парту:</strong> макетка з Pico, червоний, жовтий, зелений і синій світлодіоди, 3 резистори 220 Ом, червона, жовта, зелена і чорна перемички.</p>
<h3>Частина 1 (45 хв): три піни</h3>
<p><strong>0-5 хв. Повтор.</strong> Що робить «завжди»? Хто пам'ятає, під яким стовпчиком GP15?</p>
<p><strong>5-25 хв. Схема.</strong> Цього разу резистор стоїть після світлодіода і йде прямо в шину мінуса. Питання класу: а так можна? Можна: у колі байдуже, де стоїть «тонка соломинка», струм сповільнюється всюди (згадати дитину-резистора в колі з м'ячами).</p>
<figure class="fig" data-name="l7_schema"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 444'  data-h='444' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='444' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='20' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Три світлодіоди: GP13, GP14, GP15</text>
<rect x='21' y='48' width='480' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='232.0' width='464' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='61' x2='487' y2='61' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='77' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='105' x2='487' y2='105' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='99' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='369' x2='487' y2='369' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='385' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='413' x2='487' y2='413' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='407' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>11</text>
<text x='140.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='250.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>20</text>
<text x='360.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>25</text>
<text x='470.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>30</text>
<text x='492' y='134' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='492' y='156' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='492' y='178' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='492' y='200' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='492' y='222' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='492' y='260' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='492' y='282' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='492' y='304' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='492' y='326' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='492' y='348' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='41.0' y='163' width='222.0' height='148' rx='0' fill='#2b8a3e' stroke='#1b5e28' stroke-width='2'/>
<polygon points='39.0,163 41.0,163.0 47.0,181.5 41.0,200.0 47.0,218.5 41.0,237.0 47.0,255.5 41.0,274.0 47.0,292.5 41.0,311.0 39.0,311' fill='#f4f1e8'/>
<rect x='130.0' y='217.0' width='44' height='40' rx='3' fill='#212529'/>
<text x='152.0' y='241.0' font-size='9' fill='#adb5bd' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>RP2040</text>
<text x='152.0' y='209.0' font-size='11' fill='#d3f9d8' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Raspberry Pi Pico</text>
<circle cx='52.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='52.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='74.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='74.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='96.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='96.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='118.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='118.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='140.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='140.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='162.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='162.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='184.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='184.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='184.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>13</text>
<circle cx='206.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='206.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='206.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>G</text>
<circle cx='228.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='228.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='228.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>14</text>
<circle cx='250.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='250.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='250.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<path d='M184.0,344 Q239.0,404.5 294.0,344' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M184.0,344 Q239.0,404.5 294.0,344' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='184.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='294.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='305.0' cy='278.0' r='30.0' fill='#e03131' opacity='0.4'/>
<line x1='294.0' y1='278' x2='316.0' y2='278' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='305.0' cy='278.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='301.0' cy='274.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<line x1='316.0' y1='322' x2='316.0' y2='402' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(316.0,362.0) rotate(90.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<path d='M228.0,344 Q294.0,396.8 360.0,344' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M228.0,344 Q294.0,396.8 360.0,344' fill='none' stroke='#f59f00' stroke-width='5' stroke-linecap='round'/>
<circle cx='228.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='360.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='371.0' cy='278.0' r='30.0' fill='#f59f00' opacity='0.4'/>
<line x1='360.0' y1='278' x2='382.0' y2='278' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='371.0' cy='278.0' r='12' fill='#f59f00' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='367.0' cy='274.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<line x1='382.0' y1='322' x2='382.0' y2='402' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(382.0,362.0) rotate(90.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<path d='M250.0,344 Q338.0,388.0 426.0,344' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M250.0,344 Q338.0,388.0 426.0,344' fill='none' stroke='#2f9e44' stroke-width='5' stroke-linecap='round'/>
<circle cx='250.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='426.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='437.0' cy='278.0' r='30.0' fill='#2f9e44' opacity='0.4'/>
<line x1='426.0' y1='278' x2='448.0' y2='278' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='437.0' cy='278.0' r='12' fill='#2f9e44' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='433.0' cy='274.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<line x1='448.0' y1='322' x2='448.0' y2='402' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(448.0,362.0) rotate(90.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<path d='M206.0,322 Q206.0,362.0 206.0,402' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M206.0,322 Q206.0,362.0 206.0,402' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='206.0' cy='322' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='206.0' cy='402' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<rect x='246.68' y='140' width='248.64' height='25' rx='7' fill='#ffffff' opacity='0.95' stroke='#d0d4da'/>
<text x='371.0' y='156' font-size='12' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>резистори 220 Ом ідуть у шину −</text>
</svg><figcaption>Три світлодіоди на GP13, GP14, GP15 з резисторами в шину мінуса</figcaption></figure>

<ol>
<li>Чорна перемичка з 18i (GND) в нижню шину мінуса.</li>
<li>Червоний світлодіод: довга ніжка в 22g, коротка в 23g. Резистор з 23i в шину мінуса. Червона перемичка з 17j (GP13) у 22j.</li>
<li>Жовтий: 25g і 26g, резистор з 26i в шину, жовта перемичка з 19j (GP14) у 25j.</li>
<li>Зелений: 28g і 29g, резистор з 29i в шину, зелена перемичка з 20j (GP15) у 28j.</li>
</ol>
<p>Колір перемички збігається з кольором світлодіода: потім легше шукати помилки.</p>
<p><strong>25-32 хв. Перевірка клацанням.</strong> Три окремі блоки цифрового піна: 13, 14, 15. Клацнути кожен. Хто не світить, того лагодимо зараз, до програми.</p>
<p><strong>32-45 хв. Біжучий вогонь.</strong> У «завжди»: увімкнути 13, чекати 200, вимкнути 13, увімкнути 14, чекати 200, вимкнути 14, так само 15. Діти пишуть самі за зразком заняття 6. Змінити швидкість. Питання: як зробити, щоб вогонь біг у зворотний бік? Переставити блоки, не дроти.</p>
<h3>Частина 2 (45 хв): цикл «повторити»</h3>
<p><strong>0-10 хв. Проблема довгої програми.</strong> Завдання на дошці: поліцейська мигалка. Червоний швидко блимає 3 рази, потім синій 3 рази, і так без кінця. Замінити жовтий світлодіод на синій (ті самі отвори). Спитати: скільки блоків вийде, якщо писати як SOS минулого разу? Порахувати разом: 24. А якщо блимати по 10 разів?</p>
<p><strong>10-30 хв. Блок «повторити».</strong></p>
<figure class="fig" data-name="l7_prog"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 560'  data-h='560' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='560' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='20' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Цикл «повторити»: мигалка</text>
<path d='M60,66 q40.150000000000006,-22 80.30000000000001,0 h80.30000000000001 v34 h-160.60000000000002 z' fill='#e67700' stroke='#00000033'/>
<text x='72' y='88.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>коли запущено</text>
<rect x='60' y='100' width='120' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='72' y='122.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>завжди</text>
<rect x='78' y='136' width='213.3' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='90' y='158.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>повторити </text>
<rect x='196.0' y='142' width='23.3' height='22' rx='11.0' fill='#fff'/>
<text x='207.65' y='158.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3</text>
<text x='224.3' y='158.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> рази</text>
<rect x='96' y='172' width='190.10000000000002' height='34' rx='6' fill='#1c7ed6' stroke='#00000033'/>
<text x='108' y='194.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>пін </text>
<rect x='152.8' y='178' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='169.10000000000002' y='194.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>13</text>
<text x='190.4' y='194.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> </text>
<rect x='204.6' y='178' width='60.5' height='22' rx='11.0' fill='#fff'/>
<text x='234.85' y='194.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>увімк</text>
<rect x='96' y='208' width='171.6' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='108' y='230.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>чекати </text>
<rect x='183.4' y='214' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='199.70000000000002' y='230.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>80</text>
<text x='221.0' y='230.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> мс</text>
<rect x='96' y='244' width='180.8' height='34' rx='6' fill='#1c7ed6' stroke='#00000033'/>
<text x='108' y='266.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>пін </text>
<rect x='152.8' y='250' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='169.10000000000002' y='266.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>13</text>
<text x='190.4' y='266.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> </text>
<rect x='204.6' y='250' width='51.2' height='22' rx='11.0' fill='#fff'/>
<text x='230.2' y='266.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>вимк</text>
<rect x='96' y='280' width='171.6' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='108' y='302.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>чекати </text>
<rect x='183.4' y='286' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='199.70000000000002' y='302.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>80</text>
<text x='221.0' y='302.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> мс</text>
<rect x='78' y='166' width='18' height='154' fill='#f08c00'/>
<rect x='78' y='318' width='127.98' height='16' rx='6' fill='#f08c00' stroke='#00000033'/>
<rect x='78' y='336' width='213.3' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='90' y='358.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>повторити </text>
<rect x='196.0' y='342' width='23.3' height='22' rx='11.0' fill='#fff'/>
<text x='207.65' y='358.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3</text>
<text x='224.3' y='358.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> рази</text>
<rect x='96' y='372' width='190.10000000000002' height='34' rx='6' fill='#1c7ed6' stroke='#00000033'/>
<text x='108' y='394.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>пін </text>
<rect x='152.8' y='378' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='169.10000000000002' y='394.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>14</text>
<text x='190.4' y='394.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> </text>
<rect x='204.6' y='378' width='60.5' height='22' rx='11.0' fill='#fff'/>
<text x='234.85' y='394.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>увімк</text>
<rect x='96' y='408' width='171.6' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='108' y='430.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>чекати </text>
<rect x='183.4' y='414' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='199.70000000000002' y='430.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>80</text>
<text x='221.0' y='430.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> мс</text>
<rect x='96' y='444' width='180.8' height='34' rx='6' fill='#1c7ed6' stroke='#00000033'/>
<text x='108' y='466.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>пін </text>
<rect x='152.8' y='450' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='169.10000000000002' y='466.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>14</text>
<text x='190.4' y='466.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> </text>
<rect x='204.6' y='450' width='51.2' height='22' rx='11.0' fill='#fff'/>
<text x='230.2' y='466.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>вимк</text>
<rect x='96' y='480' width='171.6' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='108' y='502.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>чекати </text>
<rect x='183.4' y='486' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='199.70000000000002' y='502.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>80</text>
<text x='221.0' y='502.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> мс</text>
<rect x='78' y='366' width='18' height='154' fill='#f08c00'/>
<rect x='78' y='518' width='127.98' height='16' rx='6' fill='#f08c00' stroke='#00000033'/>
<rect x='60' y='130' width='18' height='410' fill='#f08c00'/>
<rect x='60' y='538' width='72.0' height='16' rx='6' fill='#f08c00' stroke='#00000033'/>
</svg><figcaption>Мигалка: два цикли «повторити 3 рази» всередині «завжди»</figcaption></figure>

<p>Розібрати картинку: цикл у циклі. Зовнішній «завжди» ніколи не закінчується, внутрішні закінчуються після трьох разів. Гра «Я робот» знову: один читає, другий показує пальцями, скільки повторів лишилось. Зібрати й запустити. Змінити 3 на 10: програма не подовшала ні на блок.</p>
<p><strong>30-42 хв. Власний ефект.</strong> Кожна пара вигадує свій світловий ефект з трьох світлодіодів, дає йому назву й показує сусідам. Приклади, якщо ідей немає: «маяк» (довго, коротко, коротко), «сходинки» (один, два, три світять разом, гаснуть), «туди й назад» (13, 14, 15, 14).</p>
<p><strong>42-45 хв.</strong> Зберегти. Повернути жовтий світлодіод на місце синього: на занятті 8 це світлофор. Схему не розбирати, якщо макетки лишаються в кабінеті.</p>
<h3>Типові несправності</h3>
<table>
<thead>
<tr>
<th>Що бачимо</th>
<th>Причина</th>
<th>Що робити</th>
</tr>
</thead>
<tbody>
<tr>
<td>Один світлодіод не реагує на клацання</td>
<td>Перемичка під сусіднім піном (стовпчик 18 це GND, не GP)</td>
<td>Перерахувати стовпчики: 17, 19, 20</td>
</tr>
<tr>
<td>Усі три не світять</td>
<td>Немає чорної перемички GND у шину</td>
<td>Крок 1</td>
</tr>
<tr>
<td>Світлодіод ніби не вимикається</td>
<td>Після «вимкнути» немає «чекати»</td>
<td>Додати паузу</td>
</tr>
<tr>
<td>Мигалка блимає один раз і стоїть</td>
<td>Цикли «повторити» поставлені поза «завжди»</td>
<td>Перетягнути всередину</td>
</tr>
<tr>
<td>Синій тьмяніший за червоний</td>
<td>Синьому треба більша напруга, на 3,3 В він слабший</td>
<td>Це нормально</td>
</tr>
</tbody>
</table>
<h3>Перевірка розуміння</h3>
<ol>
<li>Чим «повторити 3» відрізняється від «завжди»? Перший закінчується.</li>
<li>Як змусити вогонь бігти в інший бік? Змінити порядок блоків.</li>
<li>Навіщо перевіряти схему клацанням? Щоб знати, що помилка не в дротах.</li>
</ol>
<p><strong>Для швидких:</strong> переписати SOS із заняття 6 через три цикли «повторити». Порахувати, на скільки блоків програма стала коротшою.</p>
<h2 id="mod2-3">Заняття 8. Світлофор і власні блоки</h2>
<p>Наприкінці заняття світлофор працює з правильною послідовністю фаз, а головна програма складається з п'яти рядків, які читаються як речення.</p>
<p><strong>Що діти мають винести:</strong> перш ніж програмувати, треба розібратись, як воно працює насправді; довгу програму розбивають на шматки з власними назвами; власний блок можна використати багато разів.</p>
<p><strong>На парту:</strong> схема із заняття 7 (червоний, жовтий, зелений), аркуш паперу, іграшкова машинка. Макетка стоїть вертикально, червоним догори: підперти пеналом або приклеїти скотчем до коробки.</p>
<p><strong>Вчителю:</strong> 30-секундне відео справжнього світлофора, зняте на телефон біля школи. Діти впевнені, що знають порядок сигналів, і помиляються.</p>
<h3>Частина 1 (45 хв): від спостереження до програми</h3>
<p><strong>0-12 хв. Як насправді працює світлофор.</strong> Спершу опитати: який порядок сигналів? Записати версії дітей на дошці. Показати відео. Виправити. В Україні: червоний, червоний разом із жовтим, зелений, зелений блимає, жовтий, знову червоний.</p>
<figure class="fig" data-name="l8_fazy"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 330'  data-h='330' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='330' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Фази світлофора</text>
<rect x='38' y='60' width='64' height='190' rx='14' fill='#2b2f36'/>
<circle cx='70' cy='95' r='30' fill='#e03131' opacity='0.3'/>
<circle cx='70' cy='95' r='22' fill='#e03131' />
<circle cx='70' cy='155' r='22' fill='#495057' />
<circle cx='70' cy='215' r='22' fill='#495057' />
<text x='70' y='278' font-size='16' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>5 с</text>
<circle cx='70' cy='308' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='70' y='313.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<line x1='106' y1='155' x2='124' y2='155' stroke='#868e96' stroke-width='3' stroke-linecap='round'/>
<line x1='124' y1='155' x2='114.57422371294157' y2='160.6705150900361' stroke='#868e96' stroke-width='3' stroke-linecap='round'/>
<line x1='124' y1='155' x2='114.57422371294157' y2='149.3294849099639' stroke='#868e96' stroke-width='3' stroke-linecap='round'/>
<rect x='128' y='60' width='64' height='190' rx='14' fill='#2b2f36'/>
<circle cx='160' cy='95' r='30' fill='#e03131' opacity='0.3'/>
<circle cx='160' cy='95' r='22' fill='#e03131' />
<circle cx='160' cy='155' r='30' fill='#f59f00' opacity='0.3'/>
<circle cx='160' cy='155' r='22' fill='#f59f00' />
<circle cx='160' cy='215' r='22' fill='#495057' />
<text x='160' y='278' font-size='16' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1 с</text>
<circle cx='160' cy='308' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='160' y='313.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>2</text>
<line x1='196' y1='155' x2='214' y2='155' stroke='#868e96' stroke-width='3' stroke-linecap='round'/>
<line x1='214' y1='155' x2='204.57422371294157' y2='160.6705150900361' stroke='#868e96' stroke-width='3' stroke-linecap='round'/>
<line x1='214' y1='155' x2='204.57422371294157' y2='149.3294849099639' stroke='#868e96' stroke-width='3' stroke-linecap='round'/>
<rect x='218' y='60' width='64' height='190' rx='14' fill='#2b2f36'/>
<circle cx='250' cy='95' r='22' fill='#495057' />
<circle cx='250' cy='155' r='22' fill='#495057' />
<circle cx='250' cy='215' r='30' fill='#2f9e44' opacity='0.3'/>
<circle cx='250' cy='215' r='22' fill='#2f9e44' />
<text x='250' y='278' font-size='16' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>5 с</text>
<circle cx='250' cy='308' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='250' y='313.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3</text>
<line x1='286' y1='155' x2='304' y2='155' stroke='#868e96' stroke-width='3' stroke-linecap='round'/>
<line x1='304' y1='155' x2='294.5742237129416' y2='160.6705150900361' stroke='#868e96' stroke-width='3' stroke-linecap='round'/>
<line x1='304' y1='155' x2='294.5742237129416' y2='149.3294849099639' stroke='#868e96' stroke-width='3' stroke-linecap='round'/>
<rect x='308' y='60' width='64' height='190' rx='14' fill='#2b2f36'/>
<circle cx='340' cy='95' r='22' fill='#495057' />
<circle cx='340' cy='155' r='22' fill='#495057' />
<circle cx='340' cy='215' r='30' fill='#2f9e44' opacity='0.3'/>
<circle cx='340' cy='215' r='22' fill='#2f9e44' stroke-dasharray="6 5" stroke="#fff" stroke-width="3"/>
<text x='340' y='278' font-size='16' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>блимає</text>
<circle cx='340' cy='308' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='340' y='313.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>4</text>
<line x1='376' y1='155' x2='394' y2='155' stroke='#868e96' stroke-width='3' stroke-linecap='round'/>
<line x1='394' y1='155' x2='384.5742237129416' y2='160.6705150900361' stroke='#868e96' stroke-width='3' stroke-linecap='round'/>
<line x1='394' y1='155' x2='384.5742237129416' y2='149.3294849099639' stroke='#868e96' stroke-width='3' stroke-linecap='round'/>
<rect x='398' y='60' width='64' height='190' rx='14' fill='#2b2f36'/>
<circle cx='430' cy='95' r='22' fill='#495057' />
<circle cx='430' cy='155' r='30' fill='#f59f00' opacity='0.3'/>
<circle cx='430' cy='155' r='22' fill='#f59f00' />
<circle cx='430' cy='215' r='22' fill='#495057' />
<text x='430' y='278' font-size='16' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1 с</text>
<circle cx='430' cy='308' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='430' y='313.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
</svg><figcaption>П&#x27;ять фаз світлофора з тривалістю кожної</figcaption></figure>

<p>Діти перемальовують п'ять фаз у зошит і підписують час. Час скорочуємо, щоб не чекати: 5, 1, 5, блимання 3 рази, 1 секунда.</p>
<p><strong>12-35 хв. Програма «в лоб».</strong> Одна довга стрічка в «завжди». Підказка на дошці для першої фази: увімкнути 13, чекати 5000, потім для другої: увімкнути 14, чекати 1000, вимкнути 13, вимкнути 14. Далі діти самі. Типова помилка тут корисна: забувають вимкнути попередній колір, і горять усі три. Не підказувати одразу, хай подивляться на макетку й знайдуть.</p>
<p><strong>35-45 хв. Тест машинкою.</strong> Один учень веде машинку по аркушу з намальованим перехрестям і мусить підкорятись світлофору, другий стежить за порушеннями. Помінятись.</p>
<h3>Частина 2 (45 хв): власні блоки</h3>
<p><strong>0-8 хв. Що не так з нашою програмою.</strong> Вивести на проєктор програму однієї з пар. Завдання класу: знайдіть, де тут жовтий. Шукати довго. Завдання: зробіть, щоб зелений блимав не 3, а 5 разів. Незручно. Висновок: програма працює, але читати її важко.</p>
<p><strong>8-25 хв. Перший власний блок.</strong> Створити блок «зелений блимає» з параметром «скільки разів».</p>
<figure class="fig" data-name="l8_blok"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'  data-h='300' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='300' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='20' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Усередині блока «зелений блимає»</text>
<rect x='60' y='52' width='376.50000000000006' height='34' rx='6' fill='#d6336c' stroke='#00000033'/>
<text x='72' y='74.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>визначити: зелений блимає </text>
<rect x='341.20000000000005' y='58' width='23.3' height='22' rx='11.0' fill='#fff'/>
<text x='352.85' y='74.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>n</text>
<text x='369.50000000000006' y='74.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> рази</text>
<rect x='60' y='88' width='213.3' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='72' y='110.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>повторити </text>
<rect x='178.0' y='94' width='23.3' height='22' rx='11.0' fill='#fff'/>
<text x='189.65' y='110.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>n</text>
<text x='206.3' y='110.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> рази</text>
<rect x='78' y='124' width='190.10000000000002' height='34' rx='6' fill='#1c7ed6' stroke='#00000033'/>
<text x='90' y='146.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>пін </text>
<rect x='134.8' y='130' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='151.10000000000002' y='146.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='172.4' y='146.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> </text>
<rect x='186.6' y='130' width='60.5' height='22' rx='11.0' fill='#fff'/>
<text x='216.85' y='146.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>увімк</text>
<rect x='78' y='160' width='180.9' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='90' y='182.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>чекати </text>
<rect x='165.4' y='166' width='41.9' height='22' rx='11.0' fill='#fff'/>
<text x='186.35' y='182.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>400</text>
<text x='212.3' y='182.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> мс</text>
<rect x='78' y='196' width='180.8' height='34' rx='6' fill='#1c7ed6' stroke='#00000033'/>
<text x='90' y='218.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>пін </text>
<rect x='134.8' y='202' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='151.10000000000002' y='218.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='172.4' y='218.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> </text>
<rect x='186.6' y='202' width='51.2' height='22' rx='11.0' fill='#fff'/>
<text x='212.2' y='218.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>вимк</text>
<rect x='78' y='232' width='180.9' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='90' y='254.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>чекати </text>
<rect x='165.4' y='238' width='41.9' height='22' rx='11.0' fill='#fff'/>
<text x='186.35' y='254.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>400</text>
<text x='212.3' y='254.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> мс</text>
<rect x='60' y='118' width='18' height='154' fill='#f08c00'/>
<rect x='60' y='270' width='127.98' height='16' rx='6' fill='#f08c00' stroke='#00000033'/>
</svg><figcaption>Усередині власного блока: повторити n разів, увімкнути, чекати, вимкнути, чекати</figcaption></figure>

<p>Пояснення для дітей: «Ми навчили комп'ютер нового слова. Тепер він знає, що означає „зелений блимає“. Усередині слова написано, як це робити». Перевірити клацанням по новому блоку з числом 2, потім з числом 6.</p>
<p><strong>25-38 хв. Решта блоків і головна програма.</strong> Блоки «червоний», «червоний з жовтим», «зелений», «жовтий», кожен з параметром секунд. Усередині: увімкнути, чекати (секунди помножити на 1000), вимкнути. Множення роблять блоком множення, це перша арифметика в програмі.</p>
<figure class="fig" data-name="l8_prog"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 350'  data-h='350' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='350' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='20' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Світлофор із власних блоків</text>
<path d='M60,66 q40.150000000000006,-22 80.30000000000001,0 h80.30000000000001 v34 h-160.60000000000002 z' fill='#e67700' stroke='#00000033'/>
<text x='72' y='88.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>коли запущено</text>
<rect x='60' y='100' width='120' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='72' y='122.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>завжди</text>
<rect x='78' y='136' width='172.50000000000003' height='34' rx='6' fill='#d6336c' stroke='#00000033'/>
<text x='90' y='158.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>червоний </text>
<rect x='185.8' y='142' width='23.3' height='22' rx='11.0' fill='#fff'/>
<text x='197.45000000000002' y='158.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='214.10000000000002' y='158.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> с</text>
<rect x='78' y='172' width='264.3' height='34' rx='6' fill='#d6336c' stroke='#00000033'/>
<text x='90' y='194.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>червоний з жовтим </text>
<rect x='277.6' y='178' width='23.3' height='22' rx='11.0' fill='#fff'/>
<text x='289.25' y='194.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='305.90000000000003' y='194.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> с</text>
<rect x='78' y='208' width='162.3' height='34' rx='6' fill='#d6336c' stroke='#00000033'/>
<text x='90' y='230.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>зелений </text>
<rect x='175.60000000000002' y='214' width='23.3' height='22' rx='11.0' fill='#fff'/>
<text x='187.25000000000003' y='230.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='203.90000000000003' y='230.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> с</text>
<rect x='78' y='244' width='264.3' height='34' rx='6' fill='#d6336c' stroke='#00000033'/>
<text x='90' y='266.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>зелений блимає </text>
<rect x='247.0' y='250' width='23.3' height='22' rx='11.0' fill='#fff'/>
<text x='258.65' y='266.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3</text>
<text x='275.3' y='266.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> рази</text>
<rect x='78' y='280' width='152.1' height='34' rx='6' fill='#d6336c' stroke='#00000033'/>
<text x='90' y='302.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>жовтий </text>
<rect x='165.4' y='286' width='23.3' height='22' rx='11.0' fill='#fff'/>
<text x='177.05' y='302.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='193.70000000000002' y='302.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> с</text>
<rect x='60' y='130' width='18' height='190' fill='#f08c00'/>
<rect x='60' y='318' width='72.0' height='16' rx='6' fill='#f08c00' stroke='#00000033'/>
</svg><figcaption>Головна програма світлофора з п&#x27;яти власних блоків</figcaption></figure>

<p>Прочитати головну програму вголос: вона звучить як опис із зошита. Тепер завдання «зелений блимає 5 разів» це зміна одного числа.</p>
<p><strong>38-45 хв. Знову машинка.</strong> Тепер регулювальник може змінити час фаз за 10 секунд: зробити довгий червоний, щоб напарник «постояв у заторі». Зберегти програму: на занятті 12 вона знадобиться.</p>
<h3>Типові несправності</h3>
<table>
<thead>
<tr>
<th>Що бачимо</th>
<th>Причина</th>
<th>Що робити</th>
</tr>
</thead>
<tbody>
<tr>
<td>Горять усі три одночасно</td>
<td>Попередній колір не вимкнено</td>
<td>Наприкінці кожної фази вимикати свої піни</td>
</tr>
<tr>
<td>Фаза триває мить</td>
<td>У «чекати» 5 замість 5000</td>
<td>Мілісекунди: тисяча в секунді</td>
</tr>
<tr>
<td>Власний блок нічого не робить</td>
<td>Визначення порожнє або блоки лежать поруч, не приєднані</td>
<td>Приєднати стрічку під заголовок визначення</td>
</tr>
<tr>
<td>Блимає завжди 3 рази, хоч яке число</td>
<td>У «повторити» вписано число, а не параметр</td>
<td>Перетягнути параметр із заголовка в цикл</td>
</tr>
</tbody>
</table>
<h3>Перевірка розуміння</h3>
<ol>
<li>Який сигнал перед зеленим? Червоний разом із жовтим.</li>
<li>Навіщо власні блоки, якщо й без них працювало? Легше читати й змінювати.</li>
<li>Що таке параметр блока? Число, яке ми даємо блоку, коли його викликаємо.</li>
</ol>
<p><strong>Для швидких:</strong> нічний режим. Після трьох повних циклів світлофор 10 разів блимає жовтим. Підказка: «повторити 3» навколо п'яти фаз і ще один власний блок.</p>
<h2 id="mod2-4">Заняття 9. Зумер і мелодії</h2>
<p>Наприкінці заняття пара запрограмувала сирену з мигалкою та коротку мелодію, зібрану з власного блока-мотиву.</p>
<p><strong>Що діти мають винести:</strong> звук це швидкі коливання, що частіші, то вища нота; активний зумер вміє лише пищати, пасивний грає ту ноту, яку скаже програма; мотив, що повторюється, це власний блок.</p>
<p><strong>На парту:</strong> схема з трьома світлодіодами, пасивний п'єзозумер, фіолетова і чорна перемички, картка з нотами.</p>
<p><strong>Вчителю:</strong> пластикова або металева лінійка 30 см, гумка для грошей, натягнута на відкриту коробку.</p>
<h3>Частина 1 (45 хв): звідки береться нота</h3>
<p><strong>0-12 хв. Дослід з лінійкою.</strong> Кожна пара притискає лінійку до краю парти так, щоб 20 см звисало, і відтягує вільний кінець. Лінійка гуде низько, коливання видно оком. Засунути так, щоб звисало 8 см: звук вищий, коливання швидкі, майже не видно. Висновок дітей своїми словами. Те саме на гумці: натягнути сильніше, нота вища.</p>
<figure class="fig" data-name="l9_zvuk"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'  data-h='300' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='300' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Звук це коливання</text>
<line x1='40' y1='105' x2='460' y2='105' stroke='#ced4da' stroke-width='2'/><polyline points='40.0,105.0 41.0,103.4 42.1,101.8 43.1,100.2 44.2,98.6 45.2,97.1 46.3,95.5 47.4,94.0 48.4,92.5 49.5,91.0 50.5,89.6 51.5,88.2 52.6,86.8 53.6,85.4 54.7,84.2 55.8,82.9 56.8,81.7 57.9,80.6 58.9,79.5 60.0,78.5 61.0,77.5 62.0,76.6 63.1,75.7 64.2,75.0 65.2,74.2 66.2,73.6 67.3,73.0 68.3,72.5 69.4,72.1 70.5,71.7 71.5,71.4 72.6,71.2 73.6,71.1 74.7,71.0 75.7,71.0 76.8,71.1 77.8,71.3 78.8,71.5 79.9,71.8 81.0,72.2 82.0,72.7 83.1,73.2 84.1,73.8 85.2,74.5 86.2,75.2 87.2,76.0 88.3,76.9 89.3,77.8 90.4,78.8 91.5,79.9 92.5,81.0 93.6,82.1 94.6,83.3 95.7,84.6 96.7,85.9 97.8,87.2 98.8,88.6 99.8,90.0 100.9,91.5 102.0,93.0 103.0,94.5 104.0,96.0 105.1,97.6 106.2,99.2 107.2,100.7 108.2,102.3 109.3,103.9 110.4,105.5 111.4,107.1 112.5,108.7 113.5,110.3 114.5,111.9 115.6,113.5 116.7,115.0 117.7,116.5 118.8,118.0 119.8,119.5 120.9,120.9 121.9,122.3 123.0,123.7 124.0,125.0 125.0,126.3 126.1,127.5 127.2,128.7 128.2,129.8 129.2,130.9 130.3,131.9 131.4,132.8 132.4,133.7 133.4,134.5 134.5,135.3 135.6,136.0 136.6,136.6 137.7,137.2 138.7,137.6 139.8,138.1 140.8,138.4 141.9,138.7 142.9,138.8 143.9,139.0 145.0,139.0 146.1,139.0 147.1,138.8 148.2,138.7 149.2,138.4 150.2,138.1 151.3,137.6 152.4,137.2 153.4,136.6 154.4,136.0 155.5,135.3 156.6,134.5 157.6,133.7 158.7,132.8 159.7,131.9 160.8,130.9 161.8,129.8 162.9,128.7 163.9,127.5 164.9,126.3 166.0,125.0 167.1,123.7 168.1,122.3 169.2,120.9 170.2,119.5 171.2,118.0 172.3,116.5 173.3,115.0 174.4,113.5 175.5,111.9 176.5,110.3 177.6,108.7 178.6,107.1 179.7,105.5 180.7,103.9 181.8,102.3 182.8,100.7 183.8,99.2 184.9,97.6 186.0,96.0 187.0,94.5 188.1,93.0 189.1,91.5 190.2,90.0 191.2,88.6 192.2,87.2 193.3,85.9 194.3,84.6 195.4,83.3 196.5,82.1 197.5,81.0 198.6,79.9 199.6,78.8 200.7,77.8 201.7,76.9 202.8,76.0 203.8,75.2 204.8,74.5 205.9,73.8 207.0,73.2 208.0,72.7 209.1,72.2 210.1,71.8 211.2,71.5 212.2,71.3 213.2,71.1 214.3,71.0 215.3,71.0 216.4,71.1 217.5,71.2 218.5,71.4 219.6,71.7 220.6,72.1 221.7,72.5 222.7,73.0 223.8,73.6 224.8,74.2 225.8,75.0 226.9,75.7 228.0,76.6 229.0,77.5 230.1,78.5 231.1,79.5 232.2,80.6 233.2,81.7 234.2,82.9 235.3,84.2 236.3,85.4 237.4,86.8 238.5,88.2 239.5,89.6 240.6,91.0 241.6,92.5 242.7,94.0 243.7,95.5 244.8,97.1 245.8,98.6 246.9,100.2 247.9,101.8 249.0,103.4 250.0,105.0 251.1,106.6 252.1,108.2 253.2,109.8 254.2,111.4 255.2,112.9 256.3,114.5 257.4,116.0 258.4,117.5 259.5,119.0 260.5,120.4 261.6,121.8 262.6,123.2 263.6,124.6 264.7,125.8 265.8,127.1 266.8,128.3 267.9,129.4 268.9,130.5 270.0,131.5 271.0,132.5 272.1,133.4 273.1,134.3 274.1,135.0 275.2,135.8 276.2,136.4 277.3,137.0 278.4,137.5 279.4,137.9 280.5,138.3 281.5,138.6 282.6,138.8 283.6,138.9 284.6,139.0 285.7,139.0 286.8,138.9 287.8,138.7 288.9,138.5 289.9,138.2 291.0,137.8 292.0,137.3 293.1,136.8 294.1,136.2 295.1,135.5 296.2,134.8 297.2,134.0 298.3,133.1 299.4,132.2 300.4,131.2 301.4,130.1 302.5,129.0 303.6,127.9 304.6,126.7 305.7,125.4 306.7,124.1 307.8,122.8 308.8,121.4 309.9,120.0 310.9,118.5 311.9,117.0 313.0,115.5 314.1,114.0 315.1,112.4 316.2,110.8 317.2,109.3 318.2,107.7 319.3,106.1 320.4,104.5 321.4,102.9 322.4,101.3 323.5,99.7 324.6,98.1 325.6,96.5 326.7,95.0 327.7,93.5 328.8,92.0 329.8,90.5 330.9,89.1 331.9,87.7 332.9,86.3 334.0,85.0 335.1,83.7 336.1,82.5 337.2,81.3 338.2,80.2 339.2,79.1 340.3,78.1 341.4,77.2 342.4,76.3 343.4,75.5 344.5,74.7 345.6,74.0 346.6,73.4 347.7,72.8 348.7,72.4 349.8,71.9 350.8,71.6 351.9,71.3 352.9,71.2 353.9,71.0 355.0,71.0 356.1,71.0 357.1,71.2 358.2,71.3 359.2,71.6 360.2,71.9 361.3,72.4 362.4,72.8 363.4,73.4 364.4,74.0 365.5,74.7 366.6,75.5 367.6,76.3 368.7,77.2 369.7,78.1 370.8,79.1 371.8,80.2 372.9,81.3 373.9,82.5 374.9,83.7 376.0,85.0 377.1,86.3 378.1,87.7 379.2,89.1 380.2,90.5 381.2,92.0 382.3,93.5 383.4,95.0 384.4,96.5 385.4,98.1 386.5,99.7 387.6,101.3 388.6,102.9 389.7,104.5 390.7,106.1 391.8,107.7 392.8,109.3 393.9,110.8 394.9,112.4 395.9,114.0 397.0,115.5 398.1,117.0 399.1,118.5 400.2,120.0 401.2,121.4 402.2,122.8 403.3,124.1 404.4,125.4 405.4,126.7 406.4,127.9 407.5,129.0 408.6,130.1 409.6,131.2 410.7,132.2 411.7,133.1 412.8,134.0 413.8,134.8 414.9,135.5 415.9,136.2 416.9,136.8 418.0,137.3 419.1,137.8 420.1,138.2 421.2,138.5 422.2,138.7 423.2,138.9 424.3,139.0 425.4,139.0 426.4,138.9 427.4,138.8 428.5,138.6 429.6,138.3 430.6,137.9 431.7,137.5 432.7,137.0 433.8,136.4 434.8,135.8 435.9,135.0 436.9,134.3 437.9,133.4 439.0,132.5 440.1,131.5 441.1,130.5 442.2,129.4 443.2,128.3 444.2,127.1 445.3,125.8 446.4,124.6 447.4,123.2 448.5,121.8 449.5,120.4 450.6,119.0 451.6,117.5 452.7,116.0 453.7,114.5 454.8,112.9 455.8,111.4 456.9,109.8 457.9,108.2 459.0,106.6 460.0,105.0' fill='none' stroke='#1c7ed6' stroke-width='4' stroke-linejoin='round'/>
<text x='250' y='163' font-size='16' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>низька нота: коливань мало</text>
<line x1='40' y1='225' x2='460' y2='225' stroke='#ced4da' stroke-width='2'/><polyline points='40.0,225.0 41.0,220.2 42.1,215.5 43.1,211.0 44.2,206.8 45.2,202.9 46.3,199.5 47.4,196.6 48.4,194.2 49.5,192.5 50.5,191.4 51.5,191.0 52.6,191.3 53.6,192.2 54.7,193.8 55.8,196.0 56.8,198.8 57.9,202.1 58.9,205.9 60.0,210.0 61.0,214.5 62.0,219.2 63.1,223.9 64.2,228.7 65.2,233.5 66.2,238.0 67.3,242.3 68.3,246.3 69.4,249.8 70.5,252.8 71.5,255.3 72.6,257.2 73.6,258.4 74.7,259.0 75.7,258.8 76.8,258.1 77.8,256.6 78.8,254.5 79.9,251.9 81.0,248.7 82.0,245.0 83.1,240.9 84.1,236.5 85.2,231.9 86.2,227.1 87.2,222.3 88.3,217.6 89.3,213.0 90.4,208.6 91.5,204.6 92.5,201.0 93.6,197.8 94.6,195.2 95.7,193.2 96.7,191.8 97.8,191.1 98.8,191.1 99.8,191.7 100.9,193.0 102.0,195.0 103.0,197.5 104.0,200.6 105.1,204.2 106.2,208.2 107.2,212.5 108.2,217.1 109.3,221.8 110.4,226.6 111.4,231.4 112.5,236.0 113.5,240.4 114.5,244.6 115.6,248.3 116.7,251.5 117.7,254.3 118.8,256.4 119.8,257.9 120.9,258.8 121.9,259.0 123.0,258.5 124.0,257.3 125.0,255.5 126.1,253.1 127.2,250.1 128.2,246.7 129.2,242.8 130.3,238.5 131.4,234.0 132.4,229.3 133.4,224.5 134.5,219.7 135.6,215.0 136.6,210.5 137.7,206.3 138.7,202.5 139.8,199.1 140.8,196.3 141.9,194.0 142.9,192.4 143.9,191.3 145.0,191.0 146.1,191.3 147.1,192.4 148.2,194.0 149.2,196.3 150.2,199.1 151.3,202.5 152.4,206.3 153.4,210.5 154.4,215.0 155.5,219.7 156.6,224.5 157.6,229.3 158.7,234.0 159.7,238.5 160.8,242.8 161.8,246.7 162.9,250.1 163.9,253.1 164.9,255.5 166.0,257.3 167.1,258.5 168.1,259.0 169.2,258.8 170.2,257.9 171.2,256.4 172.3,254.3 173.3,251.5 174.4,248.3 175.5,244.6 176.5,240.4 177.6,236.0 178.6,231.4 179.7,226.6 180.7,221.8 181.8,217.1 182.8,212.5 183.8,208.2 184.9,204.2 186.0,200.6 187.0,197.5 188.1,195.0 189.1,193.0 190.2,191.7 191.2,191.1 192.2,191.1 193.3,191.8 194.3,193.2 195.4,195.2 196.5,197.8 197.5,201.0 198.6,204.6 199.6,208.6 200.7,213.0 201.7,217.6 202.8,222.3 203.8,227.1 204.8,231.9 205.9,236.5 207.0,240.9 208.0,245.0 209.1,248.7 210.1,251.9 211.2,254.5 212.2,256.6 213.2,258.1 214.3,258.8 215.3,259.0 216.4,258.4 217.5,257.2 218.5,255.3 219.6,252.8 220.6,249.8 221.7,246.3 222.7,242.3 223.8,238.0 224.8,233.5 225.8,228.7 226.9,223.9 228.0,219.2 229.0,214.5 230.1,210.0 231.1,205.9 232.2,202.1 233.2,198.8 234.2,196.0 235.3,193.8 236.3,192.2 237.4,191.3 238.5,191.0 239.5,191.4 240.6,192.5 241.6,194.2 242.7,196.6 243.7,199.5 244.8,202.9 245.8,206.8 246.9,211.0 247.9,215.5 249.0,220.2 250.0,225.0 251.1,229.8 252.1,234.5 253.2,239.0 254.2,243.2 255.2,247.1 256.3,250.5 257.4,253.4 258.4,255.8 259.5,257.5 260.5,258.6 261.6,259.0 262.6,258.7 263.6,257.8 264.7,256.2 265.8,254.0 266.8,251.2 267.9,247.9 268.9,244.1 270.0,240.0 271.0,235.5 272.1,230.8 273.1,226.1 274.1,221.3 275.2,216.5 276.2,212.0 277.3,207.7 278.4,203.7 279.4,200.2 280.5,197.2 281.5,194.7 282.6,192.8 283.6,191.6 284.6,191.0 285.7,191.2 286.8,191.9 287.8,193.4 288.9,195.5 289.9,198.1 291.0,201.3 292.0,205.0 293.1,209.1 294.1,213.5 295.1,218.1 296.2,222.9 297.2,227.7 298.3,232.4 299.4,237.0 300.4,241.4 301.4,245.4 302.5,249.0 303.6,252.2 304.6,254.8 305.7,256.8 306.7,258.2 307.8,258.9 308.8,258.9 309.9,258.3 310.9,257.0 311.9,255.0 313.0,252.5 314.1,249.4 315.1,245.8 316.2,241.8 317.2,237.5 318.2,232.9 319.3,228.2 320.4,223.4 321.4,218.6 322.4,214.0 323.5,209.6 324.6,205.4 325.6,201.7 326.7,198.5 327.7,195.7 328.8,193.6 329.8,192.1 330.9,191.2 331.9,191.0 332.9,191.5 334.0,192.7 335.1,194.5 336.1,196.9 337.2,199.9 338.2,203.3 339.2,207.2 340.3,211.5 341.4,216.0 342.4,220.7 343.4,225.5 344.5,230.3 345.6,235.0 346.6,239.5 347.7,243.7 348.7,247.5 349.8,250.9 350.8,253.7 351.9,256.0 352.9,257.6 353.9,258.7 355.0,259.0 356.1,258.7 357.1,257.6 358.2,256.0 359.2,253.7 360.2,250.9 361.3,247.5 362.4,243.7 363.4,239.5 364.4,235.0 365.5,230.3 366.6,225.5 367.6,220.7 368.7,216.0 369.7,211.5 370.8,207.2 371.8,203.3 372.9,199.9 373.9,196.9 374.9,194.5 376.0,192.7 377.1,191.5 378.1,191.0 379.2,191.2 380.2,192.1 381.2,193.6 382.3,195.7 383.4,198.5 384.4,201.7 385.4,205.4 386.5,209.6 387.6,214.0 388.6,218.6 389.7,223.4 390.7,228.2 391.8,232.9 392.8,237.5 393.9,241.8 394.9,245.8 395.9,249.4 397.0,252.5 398.1,255.0 399.1,257.0 400.2,258.3 401.2,258.9 402.2,258.9 403.3,258.2 404.4,256.8 405.4,254.8 406.4,252.2 407.5,249.0 408.6,245.4 409.6,241.4 410.7,237.0 411.7,232.4 412.8,227.7 413.8,222.9 414.9,218.1 415.9,213.5 416.9,209.1 418.0,205.0 419.1,201.3 420.1,198.1 421.2,195.5 422.2,193.4 423.2,191.9 424.3,191.2 425.4,191.0 426.4,191.6 427.4,192.8 428.5,194.7 429.6,197.2 430.6,200.2 431.7,203.7 432.7,207.7 433.8,212.0 434.8,216.5 435.9,221.3 436.9,226.1 437.9,230.8 439.0,235.5 440.1,240.0 441.1,244.1 442.2,247.9 443.2,251.2 444.2,254.0 445.3,256.2 446.4,257.8 447.4,258.7 448.5,259.0 449.5,258.6 450.6,257.5 451.6,255.8 452.7,253.4 453.7,250.5 454.8,247.1 455.8,243.2 456.9,239.0 457.9,234.5 459.0,229.8 460.0,225.0' fill='none' stroke='#e03131' stroke-width='4' stroke-linejoin='round'/>
<text x='250' y='283' font-size='16' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>висока нота: коливань багато</text>
</svg><figcaption>Низька нота: коливань мало; висока нота: коливань багато</figcaption></figure>

<p>Сказати дітям: «Усередині зумера тонка пластинка. Програма смикає її сотні разів за секунду. Число в блоці це скільки разів за секунду. Називається герц».</p>
<p><strong>12-25 хв. Схема.</strong></p>
<figure class="fig" data-name="l9_schema"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 444'  data-h='444' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='444' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='20' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Зумер на GP16</text>
<rect x='21' y='48' width='480' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='232.0' width='464' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='61' x2='487' y2='61' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='77' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='105' x2='487' y2='105' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='99' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='369' x2='487' y2='369' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='385' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='413' x2='487' y2='413' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='407' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>11</text>
<text x='140.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='250.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>20</text>
<text x='360.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>25</text>
<text x='470.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>30</text>
<text x='492' y='134' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='492' y='156' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='492' y='178' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='492' y='200' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='492' y='222' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='492' y='260' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='492' y='282' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='492' y='304' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='492' y='326' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='492' y='348' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='41.0' y='163' width='222.0' height='148' rx='0' fill='#2b8a3e' stroke='#1b5e28' stroke-width='2'/>
<polygon points='39.0,163 41.0,163.0 47.0,181.5 41.0,200.0 47.0,218.5 41.0,237.0 47.0,255.5 41.0,274.0 47.0,292.5 41.0,311.0 39.0,311' fill='#f4f1e8'/>
<rect x='130.0' y='217.0' width='44' height='40' rx='3' fill='#212529'/>
<text x='152.0' y='241.0' font-size='9' fill='#adb5bd' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>RP2040</text>
<text x='152.0' y='209.0' font-size='11' fill='#d3f9d8' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Raspberry Pi Pico</text>
<circle cx='52.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='52.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='74.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='74.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='96.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='96.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='118.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='118.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='140.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='140.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='162.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='162.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='184.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='184.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='206.0' cy='174' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='206.0' y='195' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>G</text>
<circle cx='206.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='228.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='228.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='250.0' cy='174' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='250.0' y='195' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>16</text>
<circle cx='250.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<path d='M250.0,130 Q294.0,94.8 338.0,130' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M250.0,130 Q294.0,94.8 338.0,130' fill='none' stroke='#ae3ec9' stroke-width='5' stroke-linecap='round'/>
<circle cx='250.0' cy='130' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='338.0' cy='130' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='360.0' cy='196.0' r='30' fill='#23262b' stroke='#000' stroke-width='1.5'/>
<circle cx='360.0' cy='196.0' r='5' fill='#555'/>
<text x='340.0' y='201' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M382.0,130 Q294.0,182.8 206.0,130' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M382.0,130 Q294.0,182.8 206.0,130' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='382.0' cy='130' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='206.0' cy='130' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='338.0' y1='317' x2='360.0' y2='226' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='360.0' cy='226' r='3' fill='#5b6475'/>
<rect x='213.4' y='317' width='249.2' height='24' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='338.0' y='334' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>пасивний зумер, плюс ліворуч</text>
</svg><figcaption>Пасивний зумер на GP16: верхній ряд, стовпчик 20</figcaption></figure>

<ol>
<li>Зумер у верхню половину макетки: плюс у 24d, мінус у 26d.</li>
<li>Фіолетова перемичка з 20a (над піном GP16) у 24a.</li>
<li>Чорна перемичка з 26a у 18a (над піном GND верхнього ряду).</li>
</ol>
<p>Увага на відмінність від попередніх схем: GP16 це вже верхній ряд плати, вільні отвори над ним a та b.</p>
<p><strong>25-35 хв. Перша нота.</strong> Підключити бібліотеку тонів. Знайти блок, що грає ноту заданої частоти й тривалості, клацнути: 440 Гц, 500 мс. Дослід «сходинки»: 200, 400, 800, 1600. Кожне подвоєння звучить як «та сама нота, але вище»: це октава. Спитати, яке найвище число ще чути (п'єзозумер добре пищить до кількох тисяч герц, далі стихає).</p>
<p><strong>35-45 хв. Сирена.</strong> У «завжди»: нота 600 на 400 мс, нота 900 на 400 мс. Додати мигалку із заняття 7 так, щоб червоний світив на низькій ноті, синій на високій. Домовленість про шум: звук вмикаємо тільки для перевірки, на слово вчителя «тиша» всі тиснуть кнопку зупинки програми.</p>
<h3>Частина 2 (45 хв): мелодія</h3>
<p><strong>0-10 хв. Ноти як числа.</strong> Картка на парту:</p>
<table>
<thead>
<tr>
<th>Нота</th>
<th>до</th>
<th>ре</th>
<th>мі</th>
<th>фа</th>
<th>соль</th>
<th>ля</th>
<th>сі-бемоль</th>
<th>сі</th>
<th>до вище</th>
</tr>
</thead>
<tbody>
<tr>
<td>Гц</td>
<td>262</td>
<td>294</td>
<td>330</td>
<td>349</td>
<td>392</td>
<td>440</td>
<td>466</td>
<td>494</td>
<td>523</td>
</tr>
</tbody>
</table>
<p>Зіграти гаму: вісім блоків підряд по 300 мс (без сі-бемоль). Хто грає на інструменті, хай перевірить на слух.</p>
<p><strong>10-30 хв. «Щедрик».</strong> Мотив з чотирьох нот, який знають усі: сі-бемоль довга, ля коротка, сі-бемоль коротка, соль довга. Числами: 466 на 400 мс, 440 на 200, 466 на 200, 392 на 400. Зробити власний блок «мотив». Головна програма: «повторити 4: мотив». Звучить початок «Щедрика». Це той самий прийом, що й у світлофорі: назвали шматок і використали багато разів.</p>
<p><strong>30-40 хв. Своя мелодія.</strong> Пара складає мелодію з 6-8 нот з картки або підбирає знайому (Jingle Bells починається так: мі, мі, мі, мі, мі, мі, мі, соль, до, ре, мі). Кожній ноті можна призначити свій світлодіод.</p>
<p><strong>40-45 хв. Концерт.</strong> Пари по черзі вмикають свою мелодію, решта слухає. Зумер лишити на макетці: він потрібен на занятті 12.</p>
<h3>Типові несправності</h3>
<table>
<thead>
<tr>
<th>Що бачимо</th>
<th>Причина</th>
<th>Що робити</th>
</tr>
</thead>
<tbody>
<tr>
<td>Усі ноти звучать однаково</td>
<td>У схемі активний зумер</td>
<td>Замінити на пасивний; активний пищить і від батарейки, пасивний лише клацає</td>
</tr>
<tr>
<td>Тихо</td>
<td>П'єзо від 3,3 В негучний, це нормально</td>
<td>Накрити зумер паперовим стаканчиком з діркою: стає гучніше</td>
</tr>
<tr>
<td>Зовсім мовчить</td>
<td>Перемичка не над GP16: рахували нижній ряд</td>
<td>Верхній ряд, стовпчик 20</td>
</tr>
<tr>
<td>Мелодія зливається в одну ноту</td>
<td>Немає пауз між однаковими нотами</td>
<td>Додати «чекати 50 мс» після кожної ноти</td>
</tr>
</tbody>
</table>
<h3>Перевірка розуміння</h3>
<ol>
<li>Лінійка звисає сильніше. Нота вища чи нижча? Нижча.</li>
<li>Що означає 440 у блоці ноти? 440 коливань за секунду.</li>
<li>Навіщо блок «мотив»? Щоб не набирати ті самі чотири ноти чотири рази.</li>
</ol>
<p><strong>Для швидких:</strong> змінна «темп». Усі тривалості в мелодії записати як темп, темп помножити на 2, і змінити швидкість усієї мелодії одним числом. Це забігання на заняття 10, давати тільки тим, хто справді нудьгує.</p>
<h2 id="mod2-5">Заняття 10. Яскравість, ШІМ і змінна</h2>
<p>Наприкінці заняття світлодіод плавно розгоряється і згасає, а діти вперше створили змінну й бачили, як її значення змінюється під час роботи програми.</p>
<p><strong>Що діти мають винести:</strong> пін уміє лише «увімкнено» і «вимкнено», а півтони робляться дуже швидким блиманням; змінна це підписана коробка, в якій лежить одне число; число в коробці можна змінювати й використовувати в інших блоках.</p>
<p><strong>На парту:</strong> схема з трьома світлодіодами (працюємо із зеленим на GP15), коробка від сірників або маленький конверт, папірці, олівець.</p>
<h3>Частина 1 (45 хв): як зробити «наполовину»</h3>
<p><strong>0-10 хв. Дослід: блимаємо все швидше.</strong> Програма блимання із заняття 6 на GP15. Зменшувати обидва «чекати»: 200, 50, 20, 10, 5 мс. На 20 мс видно мерехтіння, на 5 мс світлодіод просто світить, але тьмяніше, ніж увімкнений постійно. Питання: він справді світить наполовину? Ні, він половину часу вимкнений, а око цього не помічає.</p>
<p>Перевірка, що він таки блимає: швидко провести поглядом повз світлодіод у затемненому куті класу. Замість суцільної смуги видно пунктир. Ще краще видно через камеру телефона в режимі сповільненого відео.</p>
<p><strong>10-20 хв. Несиметричне блимання.</strong> Увімкнути на 1 мс, вимкнути на 9 мс: дуже тьмяно. Увімкнути на 9, вимкнути на 1: майже повна яскравість.</p>
<figure class="fig" data-name="l10_shim"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 340'  data-h='340' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='340' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>ШІМ: дуже швидке блимання</text>
<path d='M40,120 L40,120 L40,70 L46.0,70 L46.0,120 L100,120 L100,70 L106.0,70 L106.0,120 L160,120 L160,70 L166.0,70 L166.0,120 L220,120 L220,70 L226.0,70 L226.0,120 L280,120 L280,70 L286.0,70 L286.0,120 L340,120 L340,70 L346.0,70 L346.0,120 L400,120' fill='none' stroke='#1c7ed6' stroke-width='3.5' stroke-linejoin='round'/>
<circle cx='450' cy='95' r='14.4' fill='#e03131' opacity='0.16499999999999998'/><circle cx='450' cy='95' r='12' fill='#e03131' opacity='0.4475'/>
<text x='220' y='144' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>100 з 1023: ледь світить</text>
<path d='M40,212 L40,212 L40,162 L70.0,162 L70.0,212 L100,212 L100,162 L130.0,162 L130.0,212 L160,212 L160,162 L190.0,162 L190.0,212 L220,212 L220,162 L250.0,162 L250.0,212 L280,212 L280,162 L310.0,162 L310.0,212 L340,212 L340,162 L370.0,162 L370.0,212 L400,212' fill='none' stroke='#1c7ed6' stroke-width='3.5' stroke-linejoin='round'/>
<circle cx='450' cy='187' r='20.8' fill='#e03131' opacity='0.28500000000000003'/><circle cx='450' cy='187' r='12' fill='#e03131' opacity='0.7075'/>
<text x='220' y='236' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>512: наполовину</text>
<path d='M40,304 L40,304 L40,254 L97.0,254 L97.0,304 L100,304 L100,254 L157.0,254 L157.0,304 L160,304 L160,254 L217.0,254 L217.0,304 L220,304 L220,254 L277.0,254 L277.0,304 L280,304 L280,254 L337.0,254 L337.0,304 L340,304 L340,254 L397.0,254 L397.0,304 L400,304' fill='none' stroke='#1c7ed6' stroke-width='3.5' stroke-linejoin='round'/>
<circle cx='450' cy='279' r='28.0' fill='#e03131' opacity='0.42'/><circle cx='450' cy='279' r='12' fill='#e03131' opacity='1.0'/>
<text x='220' y='328' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1000: майже на повну</text>
</svg><figcaption>ШІМ: три сигнали з різною часткою увімкненого часу і яскравість світлодіода</figcaption></figure>

<p>Назвати: це ШІМ. Запам'ятовувати розшифровку не треба, досить ідеї «яскравість це частка часу, коли увімкнено».</p>
<p><strong>20-35 хв. Готовий блок.</strong> Контролер уміє блимати так сам, без нашого циклу. Блок аналогового запису в пін: число від 0 до 1023. Клацанням: 0, 50, 200, 500, 1023. Діти заповнюють у зошиті шкалу: число, і поруч словом «не світить, ледь, тьмяно, середньо, яскраво». Спостереження, яке варто проговорити: між 500 і 1023 різниця майже непомітна, між 0 і 100 величезна. Так влаштоване око.</p>
<p><strong>35-45 хв. Сходинки вручну.</strong> Програма: 0, чекати, 100, чекати, 300, чекати, 1023, чекати. Світлодіод розгоряється чотирма сходинками. Питання-місток: а якщо треба сто сходинок? Сто пар блоків?</p>
<h3>Частина 2 (45 хв): змінна</h3>
<p><strong>0-12 хв. Коробка з числом.</strong> Без комп'ютера. На коробці від сірників пара пише «яскравість». Усередину кладе папірець із числом 0. Вчитель диктує команди, діти виконують руками: «збільшити яскравість на 10» (дістати папірець, закреслити, написати 10, покласти назад), ще раз, ще раз. «Яке число в коробці?» 30. «Увімкнути світлодіод на яскравість»: зазирнути в коробку й назвати число. Головне, що має осісти: у коробці завжди одне число, старе зникає.</p>
<p><strong>12-32 хв. Те саме в програмі.</strong></p>
<figure class="fig" data-name="l10_prog"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 330'  data-h='330' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='330' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='20' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Плавне розгоряння зі змінною</text>
<path d='M60,66 q40.150000000000006,-22 80.30000000000001,0 h80.30000000000001 v34 h-160.60000000000002 z' fill='#e67700' stroke='#00000033'/>
<text x='72' y='88.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>коли запущено</text>
<rect x='60' y='100' width='192.90000000000003' height='34' rx='6' fill='#e8590c' stroke='#00000033'/>
<text x='72' y='122.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>яскравість = </text>
<rect x='208.60000000000002' y='106' width='23.3' height='22' rx='11.0' fill='#fff'/>
<text x='220.25000000000003' y='122.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>0</text>
<rect x='60' y='136' width='242.10000000000002' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='72' y='158.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>повторити </text>
<rect x='178.0' y='142' width='41.9' height='22' rx='11.0' fill='#fff'/>
<text x='198.95' y='158.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>100</text>
<text x='224.9' y='158.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> разів</text>
<rect x='78' y='172' width='314.40000000000003' height='34' rx='6' fill='#e8590c' stroke='#00000033'/>
<text x='90' y='194.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>збільшити яскравість на </text>
<rect x='338.8' y='178' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='355.1' y='194.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<rect x='78' y='208' width='369.2' height='34' rx='6' fill='#1c7ed6' stroke='#00000033'/>
<text x='90' y='230.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>аналоговий пін </text>
<rect x='247.0' y='214' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='263.3' y='230.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='284.6' y='230.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> = </text>
<rect x='319.20000000000005' y='214' width='107.0' height='22' rx='11.0' fill='#fff'/>
<text x='372.70000000000005' y='230.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>яскравість</text>
<rect x='78' y='244' width='171.6' height='34' rx='6' fill='#f08c00' stroke='#00000033'/>
<text x='90' y='266.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>чекати </text>
<rect x='165.4' y='250' width='32.6' height='22' rx='11.0' fill='#fff'/>
<text x='181.70000000000002' y='266.4' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>20</text>
<text x='203.0' y='266.4' font-size='15' fill='#fff' text-anchor='start' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'> мс</text>
<rect x='60' y='166' width='18' height='118' fill='#f08c00'/>
<rect x='60' y='282' width='145.26000000000002' height='16' rx='6' fill='#f08c00' stroke='#00000033'/>
</svg><figcaption>Плавне розгоряння: змінна яскравість, цикл на 100 повторів, аналоговий запис</figcaption></figure>

<p>Створити змінну «яскравість». Зібрати програму з картинки. Увімкнути показ значення змінної на екрані й дивитись, як число біжить від 0 до 1000, поки світлодіод розгоряється. Найчастіша помилка: в аналоговий блок вписали число, а не перетягнули туди змінну. Тоді коробка наповнюється, а світлодіод про це не знає.</p>
<p><strong>32-42 хв. І назад.</strong> Другий цикл: 100 разів зменшити на 10. Обидва цикли загорнути в «завжди». Вийшло «дихання», як індикатор сну на ноутбуці. Поекспериментувати: крок 10 і пауза 20 мс; крок 50 і пауза 100 мс (видно сходинки); крок 2, повторів 500, пауза 5 мс (дуже плавно).</p>
<p><strong>42-45 хв.</strong> Зберегти.</p>
<h3>Типові несправності</h3>
<table>
<thead>
<tr>
<th>Що бачимо</th>
<th>Причина</th>
<th>Що робити</th>
</tr>
</thead>
<tbody>
<tr>
<td>Світлодіод одразу яскравий і не змінюється</td>
<td>У блоці піна число замість змінної</td>
<td>Перетягнути змінну у віконце блока</td>
</tr>
<tr>
<td>Розгоряється один раз і все</td>
<td>Немає «завжди» або змінна не обнуляється на початку</td>
<td>Перший блок: яскравість дорівнює 0</td>
</tr>
<tr>
<td>Після розгоряння дивно блимає</td>
<td>Змінна вийшла за 1023</td>
<td>Повторів помножити на крок має бути не більше 1023</td>
</tr>
<tr>
<td>Значення змінної не видно</td>
<td>Не ввімкнено показ змінної</td>
<td>Поставити позначку біля змінної в палітрі</td>
</tr>
</tbody>
</table>
<h3>Перевірка розуміння</h3>
<ol>
<li>Світлодіод на «500» світить наполовину чи блимає? Блимає дуже швидко, половину часу увімкнений.</li>
<li>У коробці було 40, виконали «збільшити на 10» двічі. Що в коробці? 60.</li>
<li>Як зробити розгоряння повільнішим? Збільшити паузу або зменшити крок і додати повторів.</li>
</ol>
<p><strong>Для швидких:</strong> два світлодіоди дихають у протифазі: на GP15 яскравість, на GP13 «1023 мінус яскравість».</p>
<h2 id="mod2-6">Заняття 11. RGB і змішування кольорів</h2>
<p>Наприкінці заняття пара отримала з одного світлодіода щонайменше шість кольорів і зробила лампу настрою, що сама змінює колір.</p>
<p><strong>Що діти мають винести:</strong> будь-який колір на екрані складається з червоного, зеленого й синього світла; світло змішується не так, як фарби; випадкове число робить програму непередбачуваною.</p>
<p><strong>На парту:</strong> RGB-світлодіод зі спільним катодом, 3 резистори 220 Ом, червона, зелена, синя і чорна перемички, кулька для пінг-понгу з отвором 5 мм або смужка білого паперу й скотч.</p>
<p><strong>Вчителю:</strong> лупа або крапля води на екрані старого телефона з білою картинкою: видно червоні, зелені й сині точки. Перевірити партію RGB заздалегідь: якщо трапились зі спільним анодом, усе працюватиме навпаки.</p>
<h3>Частина 1 (45 хв): три в одному</h3>
<p><strong>0-10 хв. З чого зроблений білий на екрані.</strong> Пустити по рядах телефон з лупою (або краплею води на склі). Біла картинка зблизька складається з червоних, зелених і синіх смужок. Питання: де тут жовтий? Його немає. Це ми сьогодні й дослідимо.</p>
<p><strong>10-25 хв. Схема.</strong></p>
<figure class="fig" data-name="l11_rgb"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 356'  data-h='356' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='356' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>RGB: три світлодіоди в одному</text>
<path d='M70,150 v-40 a40,40 0 0 1 80,0 v40 z' fill='#f1f3f5' stroke='#868e96' stroke-width='3'/><rect x='62' y='148' width='96' height='12' rx='3' fill='#dee2e6' stroke='#868e96'/>
<line x1='80' y1='160' x2='80' y2='255' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<text x='80' y='275' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>R</text>
<line x1='100' y1='160' x2='100' y2='290' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<text x='100' y='310' font-size='15' fill='#212529' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='120' y1='160' x2='120' y2='265' stroke='#2f9e44' stroke-width='5' stroke-linecap='round'/>
<text x='120' y='285' font-size='15' fill='#2f9e44' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>G</text>
<line x1='140' y1='160' x2='140' y2='245' stroke='#1c7ed6' stroke-width='5' stroke-linecap='round'/>
<text x='140' y='265' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>B</text>
<text x='110' y='326' font-size='13' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>найдовша ніжка:</text>
<text x='110' y='342' font-size='13' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>спільний мінус</text>
<circle cx='340' cy='130' r='62' fill='#ff2a2a'/>
<circle cx='305' cy='195' r='62' fill='#22dd22'/>
<circle cx='375' cy='195' r='62' fill='#3355ff'/>
<path d='M278.6,138.9 A62,62 0 0 1 366.4,186.1 A62,62 0 0 1 278.6,138.9 z' fill='#ffe600'/>
<path d='M313.6,186.1 A62,62 0 0 1 401.4,138.9 A62,62 0 0 1 313.6,186.1 z' fill='#ff33dd'/>
<path d='M340.0,246.2 A62,62 0 0 1 340.0,143.8 A62,62 0 0 1 340.0,246.2 z' fill='#22e5e5'/>
<path d='M366.4,186.1 A62,62 0 0 1 313.6,186.1 A62,62 0 0 1 340.0,143.8 A62,62 0 0 1 366.4,186.1 z' fill='#ffffff'/>
<text x='340' y='100' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>червоний</text>
<text x='282' y='222' font-size='11' fill='#063' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>зелений</text>
<text x='398' y='222' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>синій</text>
<text x='303' y='156' font-size='11' fill='#5c4300' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>жовтий</text>
<text x='378' y='156' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>малино-</text>
<text x='378' y='168' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>вий</text>
<text x='340' y='232' font-size='11' fill='#044' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>бірюзовий</text>
<text x='340' y='178' font-size='11' fill='#333' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>білий</text>
</svg><figcaption>RGB-світлодіод: чотири ніжки, найдовша спільний мінус; змішування світла</figcaption></figure>

<p>Знайти найдовшу ніжку: це спільний мінус. З одного боку від неї одна ніжка (червоний), з другого дві (зелений, синій).</p>
<figure class="fig" data-name="l11_schema"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 444'  data-h='444' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='444' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='20' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>RGB-світлодіод на GP10, GP11, GP12</text>
<rect x='21' y='48' width='480' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='232.0' width='464' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='61' x2='487' y2='61' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='77' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='105' x2='487' y2='105' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='99' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='369' x2='487' y2='369' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='385' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='413' x2='487' y2='413' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='407' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>12</text>
<text x='118.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='228.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>20</text>
<text x='338.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>25</text>
<text x='448.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>30</text>
<text x='492' y='134' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='492' y='156' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='492' y='178' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='492' y='200' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='492' y='222' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='492' y='260' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='492' y='282' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='492' y='304' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='492' y='326' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='492' y='348' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='41.0' y='163' width='200.0' height='148' rx='0' fill='#2b8a3e' stroke='#1b5e28' stroke-width='2'/>
<polygon points='39.0,163 41.0,163.0 47.0,181.5 41.0,200.0 47.0,218.5 41.0,237.0 47.0,255.5 41.0,274.0 47.0,292.5 41.0,311.0 39.0,311' fill='#f4f1e8'/>
<rect x='119.0' y='217.0' width='44' height='40' rx='3' fill='#212529'/>
<text x='141.0' y='241.0' font-size='9' fill='#adb5bd' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>RP2040</text>
<text x='141.0' y='209.0' font-size='11' fill='#d3f9d8' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Raspberry Pi Pico</text>
<circle cx='52.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='52.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='74.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='74.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='96.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='96.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='96.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<circle cx='118.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='118.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='118.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>11</text>
<circle cx='140.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='140.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='140.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>12</text>
<circle cx='162.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='162.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='184.0' cy='174' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='184.0' y='195' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>G</text>
<circle cx='184.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='206.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='206.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='228.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='228.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<path d='M96.0,344 Q217.0,465.0 338.0,344' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M96.0,344 Q217.0,465.0 338.0,344' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='96.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='338.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='338.0' y1='196' x2='338.0' y2='278' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(338.0,237.0) rotate(90.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<path d='M118.0,344 Q250.0,444.32 382.0,344' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M118.0,344 Q250.0,444.32 382.0,344' fill='none' stroke='#2f9e44' stroke-width='5' stroke-linecap='round'/>
<circle cx='118.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='382.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='382.0' y1='196' x2='382.0' y2='278' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(382.0,237.0) rotate(90.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<path d='M140.0,344 Q272.0,412.64 404.0,344' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M140.0,344 Q272.0,412.64 404.0,344' fill='none' stroke='#1c7ed6' stroke-width='5' stroke-linecap='round'/>
<circle cx='140.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='404.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='404.0' y1='196' x2='404.0' y2='278' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(404.0,237.0) rotate(90.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<circle cx='371.0' cy='152' r='30' fill='#ffffff' opacity='0.5'/><circle cx='371.0' cy='152' r='17' fill='#f8f9fa' stroke='#868e96' stroke-width='2'/>
<circle cx='338.0' cy='152' r='4' fill='#e03131'/>
<circle cx='360.0' cy='152' r='4' fill='#212529'/>
<circle cx='382.0' cy='152' r='4' fill='#2f9e44'/>
<circle cx='404.0' cy='152' r='4' fill='#1c7ed6'/>
<path d='M360.0,130 Q272.0,182.8 184.0,130' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M360.0,130 Q272.0,182.8 184.0,130' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='360.0' cy='130' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='184.0' cy='130' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<rect x='232.44' y='308' width='189.12' height='25' rx='7' fill='#ffffff' opacity='0.95' stroke='#d0d4da'/>
<text x='327.0' y='324' font-size='12' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>220 Ом ×3 через канавку</text>
</svg><figcaption>RGB на GP10, GP11, GP12: резистори стоять через канавку</figcaption></figure>

<ol>
<li>RGB-світлодіод у верхню половину, рядок b: червона ніжка в 25b, найдовша в 26b, зелена в 27b, синя в 28b. Ніжки трохи розвести, щоб стали в сусідні стовпчики.</li>
<li>Три резистори 220 Ом через канавку: з 25d у 25g, з 27d у 27g, з 28d у 28g. Новий прийом: резистор сам переносить сигнал з нижньої половини у верхню.</li>
<li>Перемички: червона з 14j (GP10) у 25j, зелена з 15j (GP11) у 27j, синя з 16j (GP12) у 28j.</li>
<li>Чорна з 26a у 18a (GND верхнього ряду).</li>
</ol>
<p><strong>25-32 хв. Перевірка клацанням.</strong> Три блоки цифрового піна: 10, 11, 12. Кожен дає свій чистий колір. Якщо кольори переплутані, переставити перемички внизу, світлодіод не чіпати.</p>
<p><strong>32-45 хв. Дослід зі змішуванням.</strong> Таблиця в зошит, спершу прогноз («як у фарбах»), потім дослід:</p>
<table>
<thead>
<tr>
<th>Вмикаємо</th>
<th>Прогноз</th>
<th>Вийшло</th>
</tr>
</thead>
<tbody>
<tr>
<td>червоний + зелений</td>
<td></td>
<td>жовтий</td>
</tr>
<tr>
<td>червоний + синій</td>
<td></td>
<td>малиновий</td>
</tr>
<tr>
<td>зелений + синій</td>
<td></td>
<td>бірюзовий</td>
</tr>
<tr>
<td>усі три</td>
<td></td>
<td>білий (з відтінком)</td>
</tr>
</tbody>
</table>
<p>Сюрприз для всіх: червоний із зеленим у фарбах дає бруд, у світлі жовтий. Білий вийде рожевим, а жовтий ближче до помаранчевого: від 3,3 В червоний кристал світить на повну, а зеленому й синьому напруги ледь вистачає. Це привід підбирати колір числами в частині 2. Накрити світлодіод кулькою для пінг-понгу: кольори змішуються рівніше, видно саме колір, а не три точки.</p>
<h3>Частина 2 (45 хв): лампа настрою</h3>
<p><strong>0-12 хв. Власний блок «колір».</strong> Три параметри: ч, з, с, кожен від 0 до 1023. Усередині три блоки аналогового запису на піни 10, 11, 12. Перевірка клацанням: колір 1023, 300, 0 це помаранчевий; 1023, 0, 300 це рожевий; 300, 0, 1023 це фіолетовий. Діти підбирають улюблений колір і записують його три числа, як рецепт.</p>
<p><strong>12-25 хв. Випадкове число.</strong> Гра без комп'ютера: кинути кубик тричі, записати три числа, помножити кожне на 150 (на дошці готова табличка: 1 це 150, 2 це 300, до 6 це 900), ввести в блок «колір». Ніхто не знав заздалегідь, який колір вийде. Тепер блок випадкового числа робить це сам. Програма: завжди, колір (випадкове від 0 до 1023, і так тричі), чекати 1000.</p>
<p><strong>25-38 хв. Плавний перехід.</strong> Прийом із заняття 10: змінна, цикл на 100 кроків, червоний зростає (змінна), синій спадає (1023 мінус змінна). Колір пливе від синього через фіолетовий до червоного. Потім назад.</p>
<p><strong>38-45 хв. Виставка.</strong> Вимкнути світло в класі на хвилину, усі лампи настрою працюють одночасно. Зберегти. RGB розібрати: на занятті 12 піни GP10 і GP11 потрібні для іншого.</p>
<h3>Типові несправності</h3>
<table>
<thead>
<tr>
<th>Що бачимо</th>
<th>Причина</th>
<th>Що робити</th>
</tr>
</thead>
<tbody>
<tr>
<td>Світить, коли пін вимкнений, і гасне, коли ввімкнений</td>
<td>RGB зі спільним анодом</td>
<td>Замінити деталь; партію перевіряти заздалегідь</td>
</tr>
<tr>
<td>Немає одного кольору</td>
<td>Ніжка не потрапила у свій стовпчик або резистор стоїть не в тому стовпчику через канавку</td>
<td>Перевірити 25, 27, 28 зверху і знизу</td>
</tr>
<tr>
<td>Кольори не ті (просили червоний, світить синій)</td>
<td>Переплутані перемички</td>
<td>Переставити внизу: 14j, 15j, 16j</td>
</tr>
<tr>
<td>Червоний значно яскравіший за зелений і синій</td>
<td>Зеленому й синьому кристалам треба близько 3 В, червоному 2 В</td>
<td>Нормально для 3,3 В; можна поставити на червоний 1 кОм замість 220 Ом</td>
</tr>
</tbody>
</table>
<h3>Перевірка розуміння</h3>
<ol>
<li>З яких трьох кольорів складається картинка на екрані? Червоний, зелений, синій.</li>
<li>Як отримати жовтий? Червоний разом із зеленим.</li>
<li>Чим випадкове число відрізняється від змінної? Змінну міняємо ми, випадкове число щоразу інше й невідоме наперед.</li>
</ol>
<p><strong>Для швидких:</strong> веселка. Три переходи підряд: від червоного до зеленого, від зеленого до синього, від синього до червоного, у «завжди».</p>
<h2 id="mod2-7">Заняття 12. Проєкт «Перехрестя»</h2>
<p>Наприкінці заняття в кожної пари працює макет перехрестя: світлофор для машин, світлофор для пішоходів і звуковий сигнал, під який можна переходити із заплющеними очима. Усе з того, що вже вміємо, нового тут лише планування.</p>
<p><strong>Що діти мають винести:</strong> великий проєкт спочатку малюють на папері; дві частини програми мають бути узгоджені між собою; помилку в плані дешевше знайти олівцем, ніж у програмі.</p>
<p><strong>На парту:</strong> 2 червоні, 1 жовтий, 2 зелені світлодіоди, 5 резисторів 220 Ом, пасивний зумер, перемички, роздрукована порожня таблиця фаз, аркуш A4 з намальованим перехрестям, іграшкова машинка і фігурка пішохода (підійде фігурка з конструктора).</p>
<p><strong>Вчителю:</strong> заздалегідь вирізати з картону стійки-рамки 10×4 см з отворами 5 мм під світлодіоди, якщо хочеться, щоб макет стояв вертикально. Без них теж працює: макетка лежить біля намальованої дороги.</p>
<h3>Частина 1 (45 хв): план і схема</h3>
<p><strong>0-5 хв. Навіщо цокає світлофор.</strong> Хто чув, як пішохідний світлофор цокає або пищить? Для кого це? Для людей, які не бачать. Сьогодні робимо саме такий.</p>
<p><strong>5-20 хв. Таблиця фаз олівцем.</strong> Роздати порожню таблицю: шість рядків (три сигнали для машин, два для пішоходів, зумер), шість стовпчиків-фаз. Діти зафарбовують клітинки. Потім показати зразок.</p>
<figure class="fig" data-name="l12_fazy"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 330'  data-h='330' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='330' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Перехрестя: хто коли світить</text>
<text x='235' y='62' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='280' y='62' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>2</text>
<text x='325' y='62' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3</text>
<text x='370' y='62' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>4</text>
<text x='415' y='62' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='460' y='62' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>6</text>
<text x='200' y='97' font-size='14' fill='#1d2433' text-anchor='end' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>машини: червоний</text>
<rect x='215' y='75' width='41' height='32' rx='6' fill='#e03131'/>
<rect x='260' y='75' width='41' height='32' rx='6' fill='#e03131'/>
<rect x='305' y='75' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='350' y='75' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='395' y='75' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='440' y='75' width='41' height='32' rx='6' fill='#e03131'/>
<text x='200' y='135' font-size='14' fill='#1d2433' text-anchor='end' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>машини: жовтий</text>
<rect x='215' y='113' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='260' y='113' width='41' height='32' rx='6' fill='#f59f00'/>
<rect x='305' y='113' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='350' y='113' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='395' y='113' width='41' height='32' rx='6' fill='#f59f00'/>
<rect x='440' y='113' width='41' height='32' rx='6' fill='#e9ecef'/>
<text x='200' y='173' font-size='14' fill='#1d2433' text-anchor='end' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>машини: зелений</text>
<rect x='215' y='151' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='260' y='151' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='305' y='151' width='41' height='32' rx='6' fill='#2f9e44'/>
<rect x='350' y='151' width='41' height='32' rx='6' fill='#2f9e44'/>
<rect x='395' y='151' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='440' y='151' width='41' height='32' rx='6' fill='#e9ecef'/>
<text x='200' y='211' font-size='14' fill='#1d2433' text-anchor='end' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>пішоходи: червоний</text>
<rect x='215' y='189' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='260' y='189' width='41' height='32' rx='6' fill='#e03131'/>
<rect x='305' y='189' width='41' height='32' rx='6' fill='#e03131'/>
<rect x='350' y='189' width='41' height='32' rx='6' fill='#e03131'/>
<rect x='395' y='189' width='41' height='32' rx='6' fill='#e03131'/>
<rect x='440' y='189' width='41' height='32' rx='6' fill='#e03131'/>
<text x='200' y='249' font-size='14' fill='#1d2433' text-anchor='end' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>пішоходи: зелений</text>
<rect x='215' y='227' width='41' height='32' rx='6' fill='#2f9e44'/>
<rect x='260' y='227' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='305' y='227' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='350' y='227' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='395' y='227' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='440' y='227' width='41' height='32' rx='6' fill='#e9ecef'/>
<text x='200' y='287' font-size='14' fill='#1d2433' text-anchor='end' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>зумер цокає</text>
<rect x='215' y='265' width='41' height='32' rx='6' fill='#9c36b5'/>
<rect x='260' y='265' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='305' y='265' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='350' y='265' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='395' y='265' width='41' height='32' rx='6' fill='#e9ecef'/>
<rect x='440' y='265' width='41' height='32' rx='6' fill='#e9ecef'/>
<text x='250.0' y='322' font-size='14' fill='#5b6475' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>Перевір кожен стовпчик: зелений обом одночасно = аварія</text>
</svg><figcaption>Таблиця фаз перехрестя: шість сигналів, шість фаз</figcaption></figure>

<p>Перевірка, яку роблять самі: провести пальцем по кожному стовпчику. Якщо в одному стовпчику зелений і машинам, і пішоходам, це аварія. Фаза 6 (усім червоний) потрібна, щоб останній пішохід встиг дійти. Пари обмінюються таблицями й шукають аварії одне в одного.</p>
<p><strong>20-45 хв. Схема.</strong> Нижня половина повторює заняття 7, верхня нова.</p>
<figure class="fig" data-name="l12_schema"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 444'  data-h='444' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='444' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='19' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Перехрестя: повна схема</text>
<rect x='21' y='48' width='480' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='232.0' width='464' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='61' x2='487' y2='61' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='77' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='105' x2='487' y2='105' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='99' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='369' x2='487' y2='369' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='385' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='413' x2='487' y2='413' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='407' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='68.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='90.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='126.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='148.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='170.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='192.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='214.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='252.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='274.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='296.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='318.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='340.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='376.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='466.5' y='398.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>13</text>
<text x='96.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='206.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>20</text>
<text x='316.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>25</text>
<text x='426.0' y='119' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>30</text>
<text x='492' y='134' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='492' y='156' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='492' y='178' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='492' y='200' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='492' y='222' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='492' y='260' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='492' y='282' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='492' y='304' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='492' y='326' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='492' y='348' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='41.0' y='163' width='178.0' height='148' rx='0' fill='#2b8a3e' stroke='#1b5e28' stroke-width='2'/>
<polygon points='39.0,163 41.0,163.0 47.0,181.5 41.0,200.0 47.0,218.5 41.0,237.0 47.0,255.5 41.0,274.0 47.0,292.5 41.0,311.0 39.0,311' fill='#f4f1e8'/>
<rect x='108.0' y='217.0' width='44' height='40' rx='3' fill='#212529'/>
<text x='130.0' y='241.0' font-size='9' fill='#adb5bd' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>RP2040</text>
<text x='130.0' y='209.0' font-size='11' fill='#d3f9d8' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Raspberry Pi Pico</text>
<circle cx='52.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='52.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='74.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='74.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='74.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<circle cx='96.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='96.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='96.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>11</text>
<circle cx='118.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='118.0' cy='300' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='140.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='140.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='140.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>13</text>
<circle cx='162.0' cy='174' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='162.0' y='195' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>G</text>
<circle cx='162.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='162.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>G</text>
<circle cx='184.0' cy='174' r='5' fill='#c9a227' stroke='#7a5c00' stroke-width='1'/>
<circle cx='184.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='184.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>14</text>
<circle cx='206.0' cy='174' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='206.0' y='195' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>16</text>
<circle cx='206.0' cy='300' r='7' fill='#ffd43b' stroke='#7a5c00' stroke-width='1'/>
<text x='206.0' y='287' font-size='11' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<path d='M140.0,344 Q195.0,404.5 250.0,344' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M140.0,344 Q195.0,404.5 250.0,344' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='140.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='250.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='261.0' cy='278.0' r='30.0' fill='#e03131' opacity='0.4'/>
<line x1='250.0' y1='278' x2='272.0' y2='278' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='261.0' cy='278.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='257.0' cy='274.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<line x1='272.0' y1='322' x2='272.0' y2='402' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(272.0,362.0) rotate(90.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<path d='M184.0,344 Q250.0,396.8 316.0,344' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M184.0,344 Q250.0,396.8 316.0,344' fill='none' stroke='#f59f00' stroke-width='5' stroke-linecap='round'/>
<circle cx='184.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='316.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='327.0' cy='278.0' r='30.0' fill='#f59f00' opacity='0.4'/>
<line x1='316.0' y1='278' x2='338.0' y2='278' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='327.0' cy='278.0' r='12' fill='#f59f00' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='323.0' cy='274.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<line x1='338.0' y1='322' x2='338.0' y2='402' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(338.0,362.0) rotate(90.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<path d='M206.0,344 Q294.0,388.0 382.0,344' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M206.0,344 Q294.0,388.0 382.0,344' fill='none' stroke='#2f9e44' stroke-width='5' stroke-linecap='round'/>
<circle cx='206.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='382.0' cy='344' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='393.0' cy='278.0' r='30.0' fill='#2f9e44' opacity='0.4'/>
<line x1='382.0' y1='278' x2='404.0' y2='278' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='393.0' cy='278.0' r='12' fill='#2f9e44' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='389.0' cy='274.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<line x1='404.0' y1='322' x2='404.0' y2='402' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(404.0,362.0) rotate(90.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<path d='M162.0,322 Q162.0,362.0 162.0,402' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M162.0,322 Q162.0,362.0 162.0,402' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='162.0' cy='322' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='162.0' cy='402' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M74.0,322 Q150.12,226.44 272.0,218' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M74.0,322 Q150.12,226.44 272.0,218' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='74.0' cy='322' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='272.0' cy='218' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='283.0' cy='174.0' r='30.0' fill='#e03131' opacity='0.4'/>
<line x1='272.0' y1='174' x2='294.0' y2='174' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='283.0' cy='174.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='279.0' cy='170.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<line x1='294.0' y1='130' x2='294.0' y2='94' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(294.0,112.0) rotate(-90.0)'><rect x='-11.0' y='-8' width='22.0' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-3.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='5.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='13.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='2.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<path d='M96.0,322 Q196.2,221.6 338.0,218' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M96.0,322 Q196.2,221.6 338.0,218' fill='none' stroke='#2f9e44' stroke-width='5' stroke-linecap='round'/>
<circle cx='96.0' cy='322' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='338.0' cy='218' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='349.0' cy='174.0' r='30.0' fill='#2f9e44' opacity='0.4'/>
<line x1='338.0' y1='174' x2='360.0' y2='174' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='349.0' cy='174.0' r='12' fill='#2f9e44' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='345.0' cy='170.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<line x1='360.0' y1='130' x2='360.0' y2='94' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(360.0,112.0) rotate(-90.0)'><rect x='-11.0' y='-8' width='22.0' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-3.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='5.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='13.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='2.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<path d='M206.0,130 Q305.0,80.5 404.0,130' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M206.0,130 Q305.0,80.5 404.0,130' fill='none' stroke='#ae3ec9' stroke-width='5' stroke-linecap='round'/>
<circle cx='206.0' cy='130' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='404.0' cy='130' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='426.0' cy='196.0' r='30' fill='#23262b' stroke='#000' stroke-width='1.5'/>
<circle cx='426.0' cy='196.0' r='5' fill='#555'/>
<text x='406.0' y='201' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M448.0,130 Q448.0,112.0 448.0,94' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M448.0,130 Q448.0,112.0 448.0,94' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='448.0' cy='130' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='448.0' cy='94' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M162.0,130 Q162.0,112.0 162.0,94' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M162.0,130 Q162.0,112.0 162.0,94' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='162.0' cy='130' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='162.0' cy='94' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
</svg><figcaption>Повна схема перехрестя: три світлодіоди знизу, два зверху, зумер</figcaption></figure>

<table>
<thead>
<tr>
<th>Що</th>
<th>Пін</th>
<th>Перемичка</th>
<th>Деталь</th>
</tr>
</thead>
<tbody>
<tr>
<td>Машини, червоний</td>
<td>GP13</td>
<td>17j у 22j</td>
<td>світлодіод 22g-23g, резистор з 23i в нижню шину −</td>
</tr>
<tr>
<td>Машини, жовтий</td>
<td>GP14</td>
<td>19j у 25j</td>
<td>світлодіод 25g-26g, резистор з 26i в нижню шину −</td>
</tr>
<tr>
<td>Машини, зелений</td>
<td>GP15</td>
<td>20j у 28j</td>
<td>світлодіод 28g-29g, резистор з 29i в нижню шину −</td>
</tr>
<tr>
<td>Пішоходи, червоний</td>
<td>GP10</td>
<td>14i у 23e, через плату</td>
<td>світлодіод 23c-24c, резистор з 24a у верхню шину −</td>
</tr>
<tr>
<td>Пішоходи, зелений</td>
<td>GP11</td>
<td>15i у 26e, через плату</td>
<td>світлодіод 26c-27c, резистор з 27a у верхню шину −</td>
</tr>
<tr>
<td>Зумер</td>
<td>GP16</td>
<td>20a у 29a</td>
<td>плюс 29d, мінус 31d, чорна з 31a у верхню шину −</td>
</tr>
<tr>
<td>Земля</td>
<td>GND</td>
<td>18i у нижню шину −, 18a у верхню шину −</td>
<td>обидві шини мінуса мають бути підключені</td>
</tr>
</tbody>
</table>
<p>Збирати рядок за рядком і кожен рядок одразу перевіряти клацанням по блоку піна. Шість перевірок по хвилині економлять пів години пошуку помилок потім.</p>
<h3>Частина 2 (45 хв): програма і показ</h3>
<p><strong>0-25 хв. Програма з власних блоків.</strong> Один власний блок на кожну фазу таблиці: «фаза 1» до «фаза 6». Усередині блока: увімкнути потрібні піни, зачекати, вимкнути. Назви краще змістовні: «пішоходи йдуть», «увага», «машини їдуть», «зелений блимає», «жовтий», «усім стояти». Головна програма: шість рядків у «завжди». Хто зберіг програму заняття 8, переносить звідти блоки для машин.</p>
<p>Цокання у фазі «пішоходи йдуть»: повторити 8 разів: нота 1000 Гц на 50 мс, чекати 450 мс. Останні три секунди цокати вдвічі частіше: так роблять справжні світлофори, щоб попередити, що час спливає.</p>
<p><strong>25-35 хв. Випробування із заплющеними очима.</strong> Один учень заплющує очі й тримає фігурку пішохода біля «переходу». Йти можна тільки під цокання. Другий стежить, чи не вийшов пішохід під машину. Якщо вийшов, помилка в програмі або в таблиці: знайти й виправити.</p>
<p><strong>35-43 хв. Показ.</strong> Кожна пара показує макет і відповідає на одне питання вчителя на вибір: яка фаза найкоротша й чому; що буде, якщо прибрати фазу 6; де у вашій програмі жовтий. Фото кожного макета для батьків.</p>
<p><strong>43-45 хв.</strong> Зберегти програму. Схему не розбирати: заняття 13 додає до неї кнопку пішохода.</p>
<h3>Типові несправності</h3>
<table>
<thead>
<tr>
<th>Що бачимо</th>
<th>Причина</th>
<th>Що робити</th>
</tr>
</thead>
<tbody>
<tr>
<td>Верхні світлодіоди не світять жоден</td>
<td>Верхня шина мінуса не з'єднана з GND</td>
<td>Чорна перемичка з 18a у верхню шину</td>
</tr>
<tr>
<td>Пішохідний червоний керується не тим піном</td>
<td>GP10 і GP11 поруч, перемички переплутані</td>
<td>Стовпчики 14 і 15, рахувати від USB</td>
</tr>
<tr>
<td>Зумер цокає, але дуже тихо</td>
<td>Нота 50 мс закоротка для цього зумера</td>
<td>Збільшити до 100 мс</td>
</tr>
<tr>
<td>Обом зелений одночасно</td>
<td>Помилка в таблиці або забули вимкнути пін наприкінці фази</td>
<td>Повернутись до таблиці, пройти стовпчики пальцем</td>
</tr>
<tr>
<td>Діти одразу сіли програмувати без таблиці</td>
<td>Нетерплячка</td>
<td>Комп'ютери вмикаються після того, як вчитель підписав таблицю</td>
</tr>
</tbody>
</table>
<h3>Перевірка розуміння</h3>
<ol>
<li>Навіщо фаза, коли всім червоний? Щоб перехрестя встигло звільнитись.</li>
<li>Як перевірити таблицю на аварії? Пройти кожен стовпчик: зелений не може бути в обох одночасно.</li>
<li>Чому спершу таблиця, а потім програма? Помилку на папері видно одразу й виправити легко.</li>
</ol>
<p><strong>Для швидких:</strong> нічний режим. Після трьох повних циклів машинам 10 разів блимає жовтий, пішохідні сигнали вимкнені, зумер мовчить. Додати це сьомим стовпчиком у таблицю й перевірити, що вона досі без аварій.</p>
<h2 id="mod2-8">Підсумок модуля: що діти вже вміють</h2>
<table>
<thead>
<tr>
<th>Уміння</th>
<th>З якого заняття</th>
</tr>
</thead>
<tbody>
<tr>
<td>Підключити плату, запустити й зберегти програму</td>
<td>6</td>
</tr>
<tr>
<td>Знайти пін за номером стовпчика, зібрати схему за картинкою</td>
<td>6, 7</td>
</tr>
<tr>
<td>Перевірити схему клацанням до написання програми</td>
<td>7</td>
</tr>
<tr>
<td>Цикли «завжди» і «повторити»</td>
<td>6, 7</td>
</tr>
<tr>
<td>Власні блоки з параметрами</td>
<td>8, 9</td>
</tr>
<tr>
<td>Змінна, аналоговий вихід</td>
<td>10</td>
</tr>
<tr>
<td>Випадкове число</td>
<td>11</td>
</tr>
<tr>
<td>Спланувати програму таблицею на папері</td>
<td>12</td>
</tr>
</tbody>
</table>`
};

