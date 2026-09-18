/* =========================================================
   МОДУЛЬ 1 — поурочні плани, заняття 1-5
   Витяг із вихідного порталу гуртка. Не редагується вручну по дрібницях:
   це навчальний матеріал, а не код.
   ========================================================= */
ROBO.sections['mod1'] = {
  title: `Модуль 1. Електричне коло без мікроконтролера`,
  html: `<p>П'ять занять на батарейках 3×AA (4,5 В), без комп'ютера. Кожне заняття розписане по хвилинах на два уроки по 45 хв. Ілюстрації зроблені так, щоб їх можна було показати на проєкторі або роздрукувати на парту: одна картинка, одна думка.</p>
<p>На всіх схемах макетки: червоний дріт це плюс, чорний це мінус, зелений і помаранчевий це з'єднання всередині схеми. Цифри в кружечках відповідають крокам збирання в тексті. Номери стовпчиків на картинці збігаються з номерами на справжній макетці, тому дітям можна диктувати: «резистор із 6c у 10c».</p>
<h2 id="mod1-0">Підготовка до модуля (один раз)</h2>
<ul>
<li><strong>Дроти батарейного відсіку.</strong> Багатожильні кінці тримача не лізуть у макетку й лохматяться. До кожного дроту заздалегідь припаяти штир (половинку перемички тато-тато) і закрити термоусадкою. Без цього перше заняття піде на боротьбу з дротами.</li>
<li><strong>Шини живлення макетки 830.</strong> У більшості плат довгі шини розірвані посередині. Перевірити мультиметром. Якщо розірвані, на модуль 1 домовитись працювати тільки в лівій половині плати або поставити перемички через розрив.</li>
<li><strong>Резистори.</strong> Розкласти по комірках органайзера з наліпками «220», «1 к», «10 к». Кольорові смужки діти не читають.</li>
<li><strong>Батарейки CR2032.</strong> По одній на пару для заняття 1, видаються й збираються під рахунок.</li>
<li><strong>Демонстраційна макетка.</strong> Одна велика роздруківка макетки формату A3 на дошці або камера над столом вчителя з виводом на проєктор. Показувати збирання «на пальцях» у повітрі не працює: діти не бачать отворів.</li>
</ul>
<h2 id="mod1-1">Заняття 1. Перше коло</h2>
<p>Наприкінці заняття кожна пара має світлодіод, що світить на макетці, і може показати пальцем шлях струму від плюса до мінуса.</p>
<p><strong>Що діти мають винести:</strong> струм тече тільки по замкненому колу; у світлодіода є плюс і мінус; світлодіод без резистора згорає; отвори макетки з'єднані стовпчиками по п'ять.</p>
<p><strong>На парту:</strong> макетка, тримач 3×AA з батарейками, 2 червоні й 1 зелений світлодіод, 3 резистори 220 Ом, 1 червона і 1 чорна перемичка, батарейка CR2032.</p>
<p><strong>Вчителю:</strong> пласкогубці, захисні окуляри, 2 зайві червоні світлодіоди на демо, 4 тенісні м'ячики, <a href="#rules">6 правил</a> на аркуші A3.</p>
<h3>Частина 1 (45 хв): що таке коло</h3>
<p><strong>0-8 хв. Знайомство і правила.</strong> Кожен називає ім'я і одну річ удома, яка працює від батарейок. <a href="#rules">Шість правил</a> читаємо вголос по одному, аркуш лишається на стіні. Наголосити на двох: плюс і мінус батарейок напряму не з'єднуємо; гріється або пахне, вимикаємо і кличемо вчителя.</p>
<p><strong>8-15 хв. Гра «Живе коло».</strong> Діти стають колом на відстані витягнутої руки, за руки не беруться. Вчитель у колі, він «батарейка»: запускає 4 м'ячики, кожен передає м'яч сусідові праворуч, з рук у руки. М'ячі це струм. Далі три досліди по хвилині:</p>
<ol>
<li>Одна дитина за командою «вимикач!» робить два кроки назад. Сусід не дотягується, усі м'ячі зупиняються. Питання: де зупинився струм? Відповідь, до якої підвести: всюди, а не тільки біля розриву.</li>
<li>Дитина повертається, коло знову працює.</li>
<li>Одна дитина стає «резистором»: перед тим як передати м'яч, рахує вголос до трьох. Питання: м'ячі сповільнились тільки біля неї чи в усьому колі? В усьому.</li>
</ol>
<p><strong>15-20 хв. Та сама думка на картинці.</strong> Показати ілюстрацію, діти пальцем у повітрі проводять шлях струму.</p>
<figure class="fig" data-name="l1_kolo"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 330'  data-h='330' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='330' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Струм тече по колу</text>
<rect x='20' y='125' width='150' height='70' rx='8' fill='#2b2f36'/>
<rect x='32.0' y='135' width='39.333333333333336' height='38' rx='5' fill='#f59f00'/>
<rect x='32.0' y='135' width='39.333333333333336' height='10' rx='4' fill='#495057'/>
<text x='51.66666666666667' y='165' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='75.33333333333334' y='135' width='39.333333333333336' height='38' rx='5' fill='#f59f00'/>
<rect x='75.33333333333334' y='135' width='39.333333333333336' height='10' rx='4' fill='#495057'/>
<text x='95.00000000000001' y='165' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='118.66666666666667' y='135' width='39.333333333333336' height='38' rx='5' fill='#f59f00'/>
<rect x='118.66666666666667' y='135' width='39.333333333333336' height='10' rx='4' fill='#495057'/>
<text x='138.33333333333334' y='165' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<text x='95.0' y='188' font-size='12' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3×AA  4,5 В</text>
<text x='150' y='118' font-size='22' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<text x='150' y='216' font-size='22' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<path d='M170,143 Q192.5,111.5 215,80' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M170,143 Q192.5,111.5 215,80' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='170' cy='143' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='215' cy='80' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M215,80 Q242.5,80.0 270,80' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M215,80 Q242.5,80.0 270,80' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='215' cy='80' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='270' cy='80' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='270' y1='80' x2='360' y2='80' stroke='#9aa0a6' stroke-width='3'/>
<rect x='285' y='69' width='60' height='22' rx='10' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/>
<rect x='296' y='69' width='5' height='22' fill='#c92a2a'/>
<rect x='306' y='69' width='5' height='22' fill='#c92a2a'/>
<rect x='316' y='69' width='5' height='22' fill='#7a4a1e'/>
<text x='315' y='58' font-size='16' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>резистор</text>
<path d='M360,80 Q377.5,80.0 395,80' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M360,80 Q377.5,80.0 395,80' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='360' cy='80' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='395' cy='80' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M395,80 Q395.0,115.0 395,150' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M395,80 Q395.0,115.0 395,150' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='395' cy='80' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='395' cy='150' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='462' cy='172' r='36' fill='#e03131' opacity='0.2'/>
<line x1='395' y1='150' x2='444' y2='162' stroke='#9aa0a6' stroke-width='3'/><line x1='395' y1='196' x2='444' y2='184' stroke='#9aa0a6' stroke-width='3'/>
<path d='M446,154 h14 a18,18 0 0 1 0,36 h-14 z' fill='#e03131' stroke='#a61e1e' stroke-width='2'/>
<rect x='440' y='150' width='7' height='44' rx='2' fill='#c92a2a'/>
<text x='452' y='232' font-size='16' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>світлодіод</text>
<path d='M395,196 Q395.0,233.0 395,270' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M395,196 Q395.0,233.0 395,270' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='395' cy='196' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='395' cy='270' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M395,270 Q305.0,270.0 215,270' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M395,270 Q305.0,270.0 215,270' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='395' cy='270' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='215' cy='270' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M215,270 Q192.5,223.5 170,177' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M215,270 Q192.5,223.5 170,177' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='215' cy='270' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='170' cy='177' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='225' y1='100' x2='265' y2='100' stroke='#f08c00' stroke-width='3' stroke-linecap='round'/>
<line x1='265' y1='100' x2='255.57422371294157' y2='105.6705150900361' stroke='#f08c00' stroke-width='3' stroke-linecap='round'/>
<line x1='265' y1='100' x2='255.57422371294157' y2='94.3294849099639' stroke='#f08c00' stroke-width='3' stroke-linecap='round'/>
<line x1='350' y1='100' x2='382' y2='100' stroke='#f08c00' stroke-width='3' stroke-linecap='round'/>
<line x1='382' y1='100' x2='372.5742237129416' y2='105.6705150900361' stroke='#f08c00' stroke-width='3' stroke-linecap='round'/>
<line x1='382' y1='100' x2='372.5742237129416' y2='94.3294849099639' stroke='#f08c00' stroke-width='3' stroke-linecap='round'/>
<line x1='400' y1='250' x2='350' y2='250' stroke='#f08c00' stroke-width='3' stroke-linecap='round'/>
<line x1='350' y1='250' x2='359.4257762870584' y2='244.3294849099639' stroke='#f08c00' stroke-width='3' stroke-linecap='round'/>
<line x1='350' y1='250' x2='359.4257762870584' y2='255.6705150900361' stroke='#f08c00' stroke-width='3' stroke-linecap='round'/>
<line x1='290' y1='250' x2='240' y2='250' stroke='#f08c00' stroke-width='3' stroke-linecap='round'/>
<line x1='240' y1='250' x2='249.42577628705843' y2='244.3294849099639' stroke='#f08c00' stroke-width='3' stroke-linecap='round'/>
<line x1='240' y1='250' x2='249.42577628705843' y2='255.6705150900361' stroke='#f08c00' stroke-width='3' stroke-linecap='round'/>
<text x='250.0' y='312' font-size='16' fill='#5b6475' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>Розірви будь-де, і струм зупиниться всюди</text>
</svg><figcaption>Струм тече по колу: батарея, резистор, світлодіод</figcaption></figure>

<p><strong>20-27 хв. Демо: світлодіод без резистора.</strong> Вчитель в окулярах тримає світлодіод пласкогубцями, лінзою від дітей, і торкається ніжками прямо до дротів батарейного відсіку. Світлодіод спалахує дуже яскраво, за кілька секунд тьмяніє або гасне, іноді з клацанням. Дати понюхати (запах горілого пластику запам'ятовується). Питання: чого бракувало в нашому колі? Дитини-резистора, яка рахує до трьох. Правило 4 тепер має причину.</p>
<p><strong>27-40 хв. Дослід з CR2032: шукаємо плюс.</strong> Роздати батарейку-таблетку і червоний світлодіод. Завдання: засвітити, затиснувши батарейку між ніжками. Половина класу одразу зробить навпаки, і це потрібно: нехай перевернуть. Тоді показати ілюстрацію й дати назви.</p>
<figure class="fig" data-name="l1_led"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 330'  data-h='330' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='330' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>У світлодіода є плюс і мінус</text>
<path d='M200,160 v-50 a50,50 0 0 1 100,0 v50 z' fill='#e03131' stroke='#a61e1e' stroke-width='3'/>
<rect x='188' y='158' width='124' height='16' rx='3' fill='#c92a2a'/><rect x='302' y='158' width='10' height='16' fill='#7a1515'/>
<circle cx='230' cy='100' r='12' fill='#fff' opacity='0.6'/>
<line x1='225' y1='174' x2='225' y2='290' stroke='#9aa0a6' stroke-width='6' stroke-linecap='round'/><line x1='275' y1='174' x2='275' y2='245' stroke='#9aa0a6' stroke-width='6' stroke-linecap='round'/>
<line x1='110' y1='245' x2='225' y2='280' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='225' cy='280' r='3' fill='#5b6475'/>
<rect x='46.9' y='222' width='126.2' height='27' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='110' y='242' font-size='17' fill='#e03131' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>довга: ПЛЮС</text>
<line x1='395' y1='257' x2='275' y2='238' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='275' cy='238' r='3' fill='#5b6475'/>
<rect x='316.6' y='254' width='156.79999999999998' height='27' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='395' y='274' font-size='17' fill='#1c7ed6' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>коротка: МІНУС</text>
<line x1='395' y1='115' x2='310' y2='166' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='310' cy='166' r='3' fill='#5b6475'/>
<rect x='296.8' y='93' width='196.4' height='26' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='395' y='112' font-size='16' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>зрізаний бік: мінус</text>
</svg><figcaption>Світлодіод: довга ніжка плюс, коротка мінус, зрізаний бік мінус</figcaption></figure>

<p>Пояснити, чому тут можна без резистора: таблетка слабка, вона сама не може дати великого струму. Три пальчикові батарейки можуть. Зібрати таблетки під рахунок.</p>
<p><strong>40-45 хв. Огляд набору.</strong> «Підніміть резистор. Підніміть червоний дріт. Покажіть на світлодіоді плюс». Органайзери закрити на перерву.</p>
<h3>Частина 2 (45 хв): макетна плата</h3>
<p><strong>0-10 хв. Як влаштована макетка.</strong> Показати ілюстрацію. Діти на своїй платі пальцем ведуть: стовпчик з п'яти отворів, канавка, довга шина. Якщо є стара зламана макетка, зняти з неї наліпку знизу й пустити по руках: видно металеві смужки.</p>
<figure class="fig" data-name="l1_maketka"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 445'  data-h='445' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='445' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Що з'єднано всередині макетки</text>
<rect x='21' y='45' width='458' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='229.0' width='442' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='58' x2='465' y2='58' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='74' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='102' x2='465' y2='102' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='96' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='366' x2='465' y2='366' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='382' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='410' x2='465' y2='410' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='404' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='65.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='87.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='123.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='189.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='211.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='249.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='271.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='293.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='315.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='337.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='116' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='140.0' y='116' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='250.0' y='116' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<text x='360.0' y='116' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='470' y='131' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='470' y='153' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='470' y='175' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='470' y='197' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='470' y='219' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='470' y='257' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='470' y='279' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='470' y='301' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='470' y='323' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='470' y='345' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='88.0' y='119' width='16' height='104' rx='8' fill='#2f9e44' opacity='0.45'/>
<rect x='88.0' y='245' width='16' height='104' rx='8' fill='#7048e8' opacity='0.45'/>
<rect x='110.0' y='119' width='16' height='104' rx='8' fill='#f08c00' opacity='0.45'/>
<rect x='110.0' y='245' width='16' height='104' rx='8' fill='#0c8599' opacity='0.45'/>
<rect x='132.0' y='119' width='16' height='104' rx='8' fill='#7048e8' opacity='0.45'/>
<rect x='132.0' y='245' width='16' height='104' rx='8' fill='#e64980' opacity='0.45'/>
<rect x='154.0' y='119' width='16' height='104' rx='8' fill='#0c8599' opacity='0.45'/>
<rect x='154.0' y='245' width='16' height='104' rx='8' fill='#2f9e44' opacity='0.45'/>
<rect x='176.0' y='119' width='16' height='104' rx='8' fill='#e64980' opacity='0.45'/>
<rect x='176.0' y='245' width='16' height='104' rx='8' fill='#f08c00' opacity='0.45'/>
<rect x='44.0' y='61' width='412' height='16' rx='8' fill='#e03131' opacity='0.35'/>
<rect x='44.0' y='83' width='412' height='16' rx='8' fill='#1c7ed6' opacity='0.35'/>
<rect x='44.0' y='369' width='412' height='16' rx='8' fill='#e03131' opacity='0.35'/>
<rect x='44.0' y='391' width='412' height='16' rx='8' fill='#1c7ed6' opacity='0.35'/>
<line x1='338.0' y1='140' x2='184.0' y2='149' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='184.0' cy='149' r='3' fill='#5b6475'/>
<rect x='223.0' y='119' width='230.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='338.0' y='137' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>стовпчик з 5 = один дріт</text>
<line x1='338.0' y1='264' x2='250.0' y2='234.0' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='250.0' cy='234.0' r='3' fill='#5b6475'/>
<rect x='254.5' y='263' width='167.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='338.0' y='281' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>канавка роз'єднує</text>
<line x1='360.0' y1='340' x2='360.0' y2='377' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='360.0' cy='377' r='3' fill='#5b6475'/>
<rect x='299.0' y='319' width='122.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='360.0' y='337' font-size='15' fill='#e03131' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>довга шина +</text>
</svg><figcaption>Що з&#x27;єднано всередині макетної плати</figcaption></figure>

<p>Контрольне питання з двома перемичками в руках вчителя: «Я вставив дроти в 5a і 5d. Вони з'єднані? А 5a і 6a? А 5e і 5f?» Відповіді: так, ні, ні.</p>
<p><strong>10-35 хв. Збираємо разом, по одному кроку.</strong> Вимикач на тримачі вимкнений. Вчитель робить крок на демонстраційній платі, діти повторюють, напарник перевіряє, тільки тоді наступний крок.</p>
<figure class="fig" data-name="l1_schema"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 525'  data-h='525' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='525' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Перша схема на макетці</text>
<rect x='21' y='125' width='458' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='309.0' width='442' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='138' x2='465' y2='138' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='154' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='182' x2='465' y2='182' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='176' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='446' x2='465' y2='446' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='462' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='490' x2='465' y2='490' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='484' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='140.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='250.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<text x='360.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='470' y='211' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='470' y='233' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='470' y='255' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='470' y='277' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='470' y='299' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='470' y='337' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='470' y='359' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='470' y='381' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='470' y='403' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='470' y='425' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='31' y='46' width='170' height='64' rx='8' fill='#2b2f36'/>
<rect x='43.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='43.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='66.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='93.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='93.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='116.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='143.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='143.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='166.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<text x='116.0' y='103' font-size='12' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3×AA  4,5 В</text>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='79' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='74.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='45' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='52.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M162.0,149 Q162.0,178.0 162.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M162.0,149 Q162.0,178.0 162.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='162.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='162.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='162.0' y1='251' x2='250.0' y2='251' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(206.0,251.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='206.0' y='238.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>220</text>
<circle cx='261.0' cy='295.0' r='30.0' fill='#e03131' opacity='0.4'/>
<line x1='250.0' y1='295' x2='272.0' y2='295' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='261.0' cy='295.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='257.0' cy='291.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<text x='241.0' y='286.0' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M272.0,207 Q272.0,189.0 272.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M272.0,207 Q272.0,189.0 272.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='272.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='272.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='138.0' cy='187' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='138.0' y='192.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<circle cx='206.0' cy='279' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='206.0' y='284.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>2</text>
<circle cx='261.0' cy='347' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='261.0' y='352.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3</text>
<circle cx='296.0' cy='205' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='296.0' y='210.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>4</text>
</svg><figcaption>Перша схема на макетці, кроки 1-4</figcaption></figure>

<ol>
<li>Дроти батареї: червоний у шину плюса, чорний у шину мінуса. Далі червона перемичка з шини плюса в 6a.</li>
<li>Резистор 220 Ом з 6c у 10c. Ніжки зігнути літерою П заздалегідь або показати, як гнути об край органайзера.</li>
<li>Світлодіод: довга ніжка в 10e, коротка в 11e.</li>
<li>Чорна перемичка з 11a в шину мінуса.</li>
<li>Перевірка напарником за картинкою, тоді вимикач. Світить.</li>
</ol>
<p>Хто зібрав, пальцем показує вчителю шлях струму по своїй платі. Це і є залік за заняття.</p>
<p><strong>35-42 хв. Зламай і полагодь.</strong> Кожен у парі непомітно робить одну помилку в схемі (перевертає світлодіод, переставляє дріт на сусідній стовпчик), напарник шукає. Показати найчастішу помилку:</p>
<figure class="fig" data-name="l1_pomylka"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 404'  data-h='404' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='404' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='19' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Помилка: обидві ніжки в одному стовпчику</text>
<rect x='20' y='50' width='216' height='264' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='28' y='176.0' width='200' height='10' rx='4' fill='#ddd7c6'/>
<rect x='47.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='69.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='91.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='113.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='135.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='157.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='179.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='201.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='47.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='69.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='91.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='113.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='135.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='157.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='179.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='201.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='47.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='69.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='91.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='113.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='135.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='157.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='179.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='201.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='47.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='69.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='91.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='113.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='135.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='157.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='179.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='201.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='47.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='69.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='91.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='113.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='135.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='157.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='179.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='201.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='47.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='69.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='91.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='113.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='135.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='157.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='179.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='201.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='47.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='69.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='91.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='113.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='135.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='157.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='179.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='201.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='47.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='69.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='91.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='113.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='135.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='157.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='179.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='201.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='47.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='69.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='91.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='113.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='135.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='157.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='179.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='201.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='47.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='69.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='91.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='113.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='135.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='157.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='179.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='201.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='131.0' y='66' width='16' height='104' rx='8' fill='#e03131' opacity='0.3'/>
<line x1='51.0' y1='118' x2='139.0' y2='118' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(95.0,118.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<line x1='139.0' y1='140' x2='139.0' y2='162' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='139.0' cy='151.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='0.55'/>
<circle cx='135.0' cy='147.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<circle cx='128.0' cy='344' r='16' fill='#e03131'/>
<path d='M122.0,338 l12,12 M134.0,338 l-12,12' stroke='#fff' stroke-width='3.5' stroke-linecap='round'/>
<text x='128.0' y='386' font-size='16' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>струм іде повз</text>
<rect x='264' y='50' width='216' height='264' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='272' y='176.0' width='200' height='10' rx='4' fill='#ddd7c6'/>
<rect x='291.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='313.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='335.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='357.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='379.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='401.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='423.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='445.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='291.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='313.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='335.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='357.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='379.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='401.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='423.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='445.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='291.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='313.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='335.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='357.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='379.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='401.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='423.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='445.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='291.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='313.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='335.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='357.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='379.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='401.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='423.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='445.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='291.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='313.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='335.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='357.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='379.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='401.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='423.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='445.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='291.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='313.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='335.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='357.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='379.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='401.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='423.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='445.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='291.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='313.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='335.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='357.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='379.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='401.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='423.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='445.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='291.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='313.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='335.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='357.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='379.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='401.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='423.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='445.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='291.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='313.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='335.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='357.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='379.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='401.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='423.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='445.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='291.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='313.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='335.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='357.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='379.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='401.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='423.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='445.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='375.0' y='66' width='16' height='104' rx='8' fill='#2f9e44' opacity='0.3'/>
<rect x='397.0' y='66' width='16' height='104' rx='8' fill='#f08c00' opacity='0.3'/>
<line x1='295.0' y1='118' x2='383.0' y2='118' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(339.0,118.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<circle cx='394.0' cy='162.0' r='30.0' fill='#e03131' opacity='0.4'/>
<line x1='383.0' y1='162' x2='405.0' y2='162' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='394.0' cy='162.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='390.0' cy='158.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<circle cx='372.0' cy='344' r='16' fill='#2f9e44'/>
<path d='M365.0,344 l5,6 l9,-11' fill='none' stroke='#fff' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'/>
<text x='372.0' y='386' font-size='16' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>сусідні стовпчики</text>
</svg><figcaption>Помилка: обидві ніжки світлодіода в одному стовпчику</figcaption></figure>

<p><strong>42-45 хв. Розбирання.</strong> Вимикач вимкнути, деталі по комірках, резистори вирівняти.</p>
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
<td>Не світить, усе ніби правильно</td>
<td>Світлодіод навпаки</td>
<td>Перевернути, знайти довгу ніжку</td>
</tr>
<tr>
<td>Не світить</td>
<td>Обидві ніжки деталі в одному стовпчику</td>
<td>Пересадити в сусідні стовпчики</td>
</tr>
<tr>
<td>Не світить у правій половині плати</td>
<td>Розрив шини посередині</td>
<td>Перенести дроти в ліву половину</td>
</tr>
<tr>
<td>Світить тьмяно або блимає</td>
<td>Дріт батареї не до кінця в отворі</td>
<td>Дотиснути, перевірити припаяний штир</td>
</tr>
<tr>
<td>Ніжка резистора не лізе</td>
<td>Ніжка зігнута або задовга</td>
<td>Вирівняти, вставляти вертикально</td>
</tr>
<tr>
<td>Теплий тримач батарей</td>
<td>Плюс і мінус замкнені десь на платі</td>
<td>Негайно вимкнути, шукати разом з вчителем</td>
</tr>
</tbody>
</table>
<h3>Перевірка розуміння (усно, наприкінці)</h3>
<ol>
<li>Що станеться, якщо вийняти чорний дріт? Згасне: коло розірване.</li>
<li>Навіщо резистор? Щоб світлодіод не згорів: він стримує струм.</li>
<li>Як знайти плюс у світлодіода? Довга ніжка.</li>
</ol>
<p><strong>Для швидких:</strong> замінити червоний світлодіод на зелений; додати другий світлодіод зі своїм резистором поруч (підказка: ще один дріт із шини плюса). Це заготовка до заняття 3.</p>
<h2 id="mod1-2">Заняття 2. Кнопка, провідники, азбука Морзе</h2>
<p>Наприкінці заняття діти керують світлодіодом з кнопки, знають з досліду, які матеріали проводять струм, і передали напарнику слово азбукою Морзе.</p>
<p><strong>Що діти мають винести:</strong> кнопка це розрив у колі, який ми замикаємо пальцем; метали й графіт проводять струм, пластик, дерево, гума ні; увімкнено і вимкнено це вже мова, якою можна передати слово.</p>
<p><strong>На парту:</strong> набір із заняття 1, кнопка 12×12, активний зумер, 2 помаранчеві перемички для щупів, таблиця для досліду, картка Морзе.</p>
<p><strong>Коробка предметів на пару</strong> (зібрати заздалегідь, однакові для всіх): монета, шматок фольги, металева скріпка без кольорового покриття, кольорова скріпка в пластику, ключ, олівець, заточений з обох боків, гумка, пластикова лінійка, дерев'яна паличка, смужка паперу.</p>
<p><strong>Вчителю:</strong> склянка води з-під крана, сіль, ложка. Дослід з водою тільки на вчительському столі: розлита вода на макетках закінчує заняття.</p>
<h3>Частина 1 (45 хв): кнопка і тестер</h3>
<p><strong>0-10 хв. Розминка на час.</strong> Зібрати схему із заняття 1 з пам'яті, картинка на проєкторі як підказка. Хто зібрав, піднімає руку. Мета в тому, щоб макетка перестала бути новою.</p>
<p><strong>10-18 хв. Як влаштована кнопка.</strong> Пустити по руках одну кнопку. У неї чотири ніжки, хоча дротів два. Показати ілюстрацію.</p>
<figure class="fig" data-name="l2_knopka"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 386'  data-h='386' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='386' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Як кнопка стоїть на макетці</text>
<rect x='120' y='50' width='238' height='264' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='128' y='176.0' width='222' height='10' rx='4' fill='#ddd7c6'/>
<rect x='147.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='169.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='191.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='213.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='235.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='257.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='279.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='301.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='323.5' y='70.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='147.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='169.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='191.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='213.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='235.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='257.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='279.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='301.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='323.5' y='92.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='147.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='169.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='191.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='213.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='235.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='257.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='279.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='301.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='323.5' y='114.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='147.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='169.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='191.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='213.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='235.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='257.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='279.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='301.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='323.5' y='136.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='147.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='169.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='191.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='213.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='235.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='257.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='279.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='301.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='323.5' y='158.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='147.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='169.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='191.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='213.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='235.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='257.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='279.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='301.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='323.5' y='196.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='147.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='169.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='191.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='213.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='235.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='257.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='279.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='301.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='323.5' y='218.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='147.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='169.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='191.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='213.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='235.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='257.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='279.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='301.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='323.5' y='240.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='147.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='169.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='191.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='213.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='235.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='257.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='279.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='301.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='323.5' y='262.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='147.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='169.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='191.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='213.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='235.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='257.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='279.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='301.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='323.5' y='284.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='209.0' y='66' width='16' height='104' rx='8' fill='#2f9e44' opacity='0.45'/>
<rect x='209.0' y='192' width='16' height='104' rx='8' fill='#2f9e44' opacity='0.45'/>
<rect x='253.0' y='66' width='16' height='104' rx='8' fill='#f08c00' opacity='0.45'/>
<rect x='253.0' y='192' width='16' height='104' rx='8' fill='#f08c00' opacity='0.45'/>
<rect x='210.0' y='155' width='58.0' height='52' rx='5' fill='#2b2f36'/>
<circle cx='239.0' cy='181.0' r='15' fill='#f08c00' stroke='#a85f00' stroke-width='2'/>
<line x1='60' y1='81' x2='217.0' y2='96' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='217.0' cy='96' r='3' fill='#5b6475'/>
<rect x='8.0' y='60' width='104.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='60' y='78' font-size='15' fill='#2f9e44' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>ліві ніжки</text>
<line x1='440' y1='81' x2='261.0' y2='96' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='261.0' cy='96' r='3' fill='#5b6475'/>
<rect x='383.5' y='60' width='113.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='440' y='78' font-size='15' fill='#c2410c' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>праві ніжки</text>
<text x='250.0' y='344' font-size='16' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>Кнопка сидить верхи на канавці.</text>
<text x='250.0' y='368' font-size='16' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>Натиснув: зелений стовпчик з'єднався з помаранчевим.</text>
</svg><figcaption>Як кнопка стоїть на макетці: верхи на канавці</figcaption></figure>

<p>Сказати дітям: «Кнопка сидить на канавці, як вершник на коні: дві ноги з одного боку, дві з другого. Поки не натиснув, лівий бік і правий не з'єднані». Якщо поставити кнопку не на канавку, а вздовж, вона або не влізе, або буде замкнена завжди.</p>
<p><strong>18-32 хв. Схема з кнопкою.</strong> Збираємо по кроках, як минулого разу.</p>
<figure class="fig" data-name="l2_schema"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 525'  data-h='525' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='525' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Кнопка керує світлодіодом</text>
<rect x='21' y='125' width='458' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='309.0' width='442' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='138' x2='465' y2='138' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='154' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='182' x2='465' y2='182' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='176' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='446' x2='465' y2='446' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='462' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='490' x2='465' y2='490' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='484' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='140.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='250.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<text x='360.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='470' y='211' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='470' y='233' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='470' y='255' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='470' y='277' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='470' y='299' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='470' y='337' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='470' y='359' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='470' y='381' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='470' y='403' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='470' y='425' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='31' y='46' width='170' height='64' rx='8' fill='#2b2f36'/>
<rect x='43.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='43.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='66.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='93.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='93.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='116.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='143.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='143.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='166.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<text x='116.0' y='103' font-size='12' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3×AA  4,5 В</text>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='79' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='74.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='45' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='52.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M140.0,149 Q140.0,178.0 140.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M140.0,149 Q140.0,178.0 140.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='140.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='140.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<rect x='133.0' y='288' width='58.0' height='52' rx='5' fill='#2b2f36'/>
<circle cx='162.0' cy='314.0' r='15' fill='#f08c00' stroke='#a85f00' stroke-width='2'/>
<line x1='184.0' y1='229' x2='272.0' y2='229' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(228.0,229.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='228.0' y='216.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>220</text>
<circle cx='283.0' cy='273.0' r='30.0' fill='#e03131' opacity='0.4'/>
<line x1='272.0' y1='273' x2='294.0' y2='273' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='283.0' cy='273.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='279.0' cy='269.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<text x='263.0' y='264.0' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M294.0,207 Q294.0,189.0 294.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M294.0,207 Q294.0,189.0 294.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='294.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='294.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='116.0' cy='207' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='116.0' y='212.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<circle cx='162.0' cy='365' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='162.0' y='370.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>2</text>
<circle cx='228.0' cy='261' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='228.0' y='266.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3</text>
<circle cx='283.0' cy='339' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='283.0' y='344.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>4</text>
<circle cx='318.0' cy='207' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='318.0' y='212.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
</svg><figcaption>Кнопка керує світлодіодом, кроки 1-5</figcaption></figure>

<ol>
<li>Червона перемичка з шини плюса в 5a.</li>
<li>Кнопка верхи на канавці: ніжки в 5e, 7e, 5f, 7f. Тиснути рівно, великим пальцем, до клацання.</li>
<li>Резистор 220 Ом з 7b у 11b.</li>
<li>Світлодіод: довга ніжка в 11d, коротка в 12d.</li>
<li>Чорна перемичка з 12a в шину мінуса.</li>
</ol>
<p>Питання після запуску: де зараз розрив у колі? Усередині кнопки, між стовпчиком 5 і стовпчиком 7.</p>
<p><strong>32-45 хв. Тестер провідності.</strong> Вийняти кнопку, у 5e і 9e вставити дві помаранчеві перемички з вільними кінцями, резистор і світлодіод зсунути, як на картинці. Вільні кінці це щупи.</p>
<figure class="fig" data-name="l2_tester"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 525'  data-h='525' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='525' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Тестер: що проводить струм?</text>
<rect x='21' y='125' width='458' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='309.0' width='442' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='138' x2='465' y2='138' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='154' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='182' x2='465' y2='182' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='176' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='446' x2='465' y2='446' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='462' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='490' x2='465' y2='490' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='484' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='140.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='250.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<text x='360.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='470' y='211' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='470' y='233' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='470' y='255' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='470' y='277' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='470' y='299' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='470' y='337' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='470' y='359' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='470' y='381' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='470' y='403' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='470' y='425' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='31' y='46' width='170' height='64' rx='8' fill='#2b2f36'/>
<rect x='43.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='43.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='66.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='93.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='93.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='116.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='143.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='143.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='166.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<text x='116.0' y='103' font-size='12' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3×AA  4,5 В</text>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='79' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='74.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='45' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='52.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M140.0,149 Q140.0,178.0 140.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M140.0,149 Q140.0,178.0 140.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='140.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='140.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='228.0' y1='229' x2='316.0' y2='229' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(272.0,229.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='272.0' y='216.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>220</text>
<circle cx='327.0' cy='273.0' r='30.0' fill='#e03131' opacity='0.4'/>
<line x1='316.0' y1='273' x2='338.0' y2='273' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='327.0' cy='273.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='323.0' cy='269.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<text x='307.0' y='264.0' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M338.0,207 Q338.0,189.0 338.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M338.0,207 Q338.0,189.0 338.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='338.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='338.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M140.0,295 Q170.6,333.8 166.0,383' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M140.0,295 Q170.6,333.8 166.0,383' fill='none' stroke='#f08c00' stroke-width='5' stroke-linecap='round'/>
<circle cx='140.0' cy='295' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='166.0' cy='383' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M228.0,295 Q197.4,333.8 202.0,383' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M228.0,295 Q197.4,333.8 202.0,383' fill='none' stroke='#f08c00' stroke-width='5' stroke-linecap='round'/>
<circle cx='228.0' cy='295' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='202.0' cy='383' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='184.0' cy='383' r='26' fill='#d4a017' stroke='#8a6d0b' stroke-width='3'/>
<text x='184.0' y='389' font-size='17' fill='#5c4300' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1 ₴</text>
<line x1='338.0' y1='402' x2='210.0' y2='383' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='210.0' cy='383' r='3' fill='#5b6475'/>
<rect x='241.0' y='401' width='194.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='338.0' y='419' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>сюди кладемо предмет</text>
</svg><figcaption>Тестер: предмет кладемо між двома щупами</figcaption></figure>

<p>Спочатку перевірка тестера: торкнутись щупами один до одного, світлодіод світить. Потім діти заповнюють таблицю: спершу прогноз, тоді дослід.</p>
<table>
<thead>
<tr>
<th>Предмет</th>
<th>Думаю, що</th>
<th>Насправді</th>
</tr>
</thead>
<tbody>
<tr>
<td>Монета</td>
<td></td>
<td>проводить</td>
</tr>
<tr>
<td>Фольга</td>
<td></td>
<td>проводить</td>
</tr>
<tr>
<td>Скріпка металева</td>
<td></td>
<td>проводить</td>
</tr>
<tr>
<td>Скріпка кольорова</td>
<td></td>
<td>не проводить, поки не зішкребти пластик</td>
</tr>
<tr>
<td>Ключ</td>
<td></td>
<td>проводить</td>
</tr>
<tr>
<td>Олівець (графіт з обох кінців)</td>
<td></td>
<td>проводить, хоч це не метал</td>
</tr>
<tr>
<td>Гумка, лінійка, дерево, папір</td>
<td></td>
<td>не проводять</td>
</tr>
</tbody>
</table>
<p>Два сюрпризи, на яких варто зупинитись: кольорова скріпка (метал під ізоляцією, так само влаштовані дроти) і олівець. Демо на вчительському столі: щупи у склянку води, світлодіод не світить або ледь жевріє; додаємо сіль ложка за ложкою й розмішуємо, світіння стає помітним. Висновок: мокрими руками до розетки не можна саме тому.</p>
<h3>Частина 2 (45 хв): азбука Морзе</h3>
<p><strong>0-8 хв. Звук замість світла.</strong> Повернути кнопку (схема з кроків 1-5). Замінити резистор і світлодіод на активний зумер: плюс зумера (позначка на корпусі або довша ніжка) в 7b, мінус у 9b, чорна перемичка з 9a в шину мінуса. Домовитись про сигнал тиші: піднята рука вчителя, усі відпускають кнопки.</p>
<p><strong>8-15 хв. Що таке Морзе.</strong> Коротко: так передавали повідомлення кораблі й телеграф, коли не було телефонів. Крапка це коротке натискання, тире це довге, на рахунок «раз-два-три». Між літерами пауза. Усі разом відстукують SOS: три коротких, три довгих, три коротких.</p>
<p><strong>15-35 хв. Передача слів.</strong> Картка з 12 літерами, з яких складаються всі слова завдання.</p>
<table>
<thead>
<tr>
<th>Літера</th>
<th>Код</th>
<th>Літера</th>
<th>Код</th>
<th>Літера</th>
<th>Код</th>
</tr>
</thead>
<tbody>
<tr>
<td>А</td>
<td>· −</td>
<td>М</td>
<td>− −</td>
<td>С</td>
<td>· · ·</td>
</tr>
<tr>
<td>Е</td>
<td>·</td>
<td>Н</td>
<td>− ·</td>
<td>Т</td>
<td>−</td>
</tr>
<tr>
<td>І</td>
<td>· ·</td>
<td>О</td>
<td>− − −</td>
<td>Р</td>
<td>· − ·</td>
</tr>
<tr>
<td>К</td>
<td>− · −</td>
<td>Л</td>
<td>· − · ·</td>
<td>У</td>
<td>· · −</td>
</tr>
</tbody>
</table>
<p>Слова на картках-завданнях: МАМА, ТАТО, КІТ, СОН, ОКО, НІС, СІК, ЛІС, РАК, УРОК. Один тягне картку і передає, другий записує крапки й тире, потім розшифровує. Після кожного слова міняються. Для імен потрібна повна українська таблиця: роздрукувати одну на клас з української Вікіпедії, стаття «Азбука Морзе».</p>
<p><strong>35-42 хв. Зв'язок між партами.</strong> Повернути світлодіод замість зумера. Пара передає слово сусідній парі світлом, мовчки. Працює на відстані однієї-двох парт, через весь клас п'ятиміліметровий світлодіод при денному світлі не видно.</p>
<p><strong>42-45 хв. Розбирання.</strong></p>
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
<td>Світить завжди, кнопка нічого не змінює</td>
<td>Кнопка повернута на 90° або стоїть не на канавці</td>
<td>Вийняти, повернути, поставити верхи на канавку</td>
</tr>
<tr>
<td>Кнопка вискакує з макетки</td>
<td>Ніжки зігнуті всередину</td>
<td>Розігнути пласкогубцями, тиснути рівно</td>
</tr>
<tr>
<td>Зумер мовчить</td>
<td>Полярність навпаки</td>
<td>Перевернути</td>
</tr>
<tr>
<td>Зумер пищить тихо й хрипко</td>
<td>Попався пасивний зумер</td>
<td>Замінити на активний, комірки підписати</td>
</tr>
<tr>
<td>Тестер не світить навіть на монеті</td>
<td>Щупи не в тих стовпчиках</td>
<td>Спершу замкнути щупи між собою</td>
</tr>
</tbody>
</table>
<h3>Перевірка розуміння</h3>
<ol>
<li>Чому дроти вкриті пластиком? Щоб струм не пішов туди, куди не треба, і щоб їх можна було тримати.</li>
<li>Де в кнопці розрив? Між лівою і правою парою ніжок.</li>
<li>Чим відрізняється крапка від тире? Тривалістю натискання.</li>
</ol>
<p><strong>Для швидких:</strong> дві кнопки одна за одною (світить, лише коли натиснуті обидві) і дві кнопки поруч, кожна своїм шляхом від плюса (світить від будь-якої). Назвати це «І» та «АБО»: так само думає комп'ютер.</p>
<h2 id="mod1-3">Заняття 3. Резистори, паралельно і послідовно</h2>
<p>Наприкінці заняття діти на власному досліді побачили, що більший опір дає тьмяніше світло, і знають різницю між «кожному свій шлях» і «один шлях на всіх».</p>
<p><strong>Що діти мають винести:</strong> резистори бувають різні, число на комірці означає, як сильно він стримує струм; у паралельній схемі лампочки незалежні; у послідовній вони ділять силу батареї і гаснуть разом.</p>
<p><strong>На парту:</strong> 3 червоні, 1 жовтий і 1 зелений світлодіод, резистори 3×220 Ом, 1×1 кОм, 1×10 кОм, 3 червоні, 3 чорні й 1 зелена перемичка, 3 кнопки.</p>
<p><strong>Вчителю:</strong> стара ялинкова гірлянда з лампочками розжарювання, якщо знайдеться (у ній лампочки з'єднані послідовно), мультиметр, дві соломинки для напоїв: широка і тонка для розмішування кави.</p>
<h3>Частина 1 (45 хв): що робить резистор</h3>
<p><strong>0-8 хв. Дослід із соломинками.</strong> Двоє добровольців дмуть: один крізь широку соломинку, другий крізь тонку, на смужку паперу з відстані долоні. Крізь тонку дути важче, папір ледь ворушиться. Резистор це тонка соломинка для струму. Що більше число на комірці, то тонша соломинка.</p>
<p><strong>8-30 хв. Три резистори, три яскравості.</strong> Збираємо три однакові гілки, відрізняються лише резистори.</p>
<figure class="fig" data-name="l3_rezystory"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 525'  data-h='525' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='525' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Більший опір: тьмяніше світло</text>
<rect x='21' y='125' width='458' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='309.0' width='442' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='138' x2='465' y2='138' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='154' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='182' x2='465' y2='182' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='176' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='446' x2='465' y2='446' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='462' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='490' x2='465' y2='490' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='484' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='140.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='250.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<text x='360.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='470' y='211' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='470' y='233' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='470' y='255' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='470' y='277' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='470' y='299' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='470' y='337' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='470' y='359' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='470' y='381' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='470' y='403' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='470' y='425' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='31' y='46' width='170' height='64' rx='8' fill='#2b2f36'/>
<rect x='43.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='43.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='66.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='93.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='93.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='116.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='143.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='143.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='166.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<text x='116.0' y='103' font-size='12' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3×AA  4,5 В</text>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='79' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='74.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='45' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='52.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M118.0,149 Q118.0,178.0 118.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M118.0,149 Q118.0,178.0 118.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='118.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='118.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='118.0' y1='251' x2='184.0' y2='251' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(151.0,251.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='151.0' y='238.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>220</text>
<circle cx='195.0' cy='295.0' r='30.0' fill='#e03131' opacity='0.4'/>
<line x1='184.0' y1='295' x2='206.0' y2='295' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='195.0' cy='295.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='191.0' cy='291.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<path d='M206.0,207 Q206.0,189.0 206.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M206.0,207 Q206.0,189.0 206.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='206.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='206.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M228.0,149 Q228.0,178.0 228.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M228.0,149 Q228.0,178.0 228.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='228.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='228.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='228.0' y1='251' x2='294.0' y2='251' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(261.0,251.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='-6.0' y='-8' width='4' height='16' fill='#111'/><rect x='2.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='261.0' y='238.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1 к</text>
<circle cx='305.0' cy='295.0' r='22.0' fill='#e03131' opacity='0.25'/>
<line x1='294.0' y1='295' x2='316.0' y2='295' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='305.0' cy='295.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='301.0' cy='291.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<path d='M316.0,207 Q316.0,189.0 316.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M316.0,207 Q316.0,189.0 316.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='316.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='316.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M338.0,149 Q338.0,178.0 338.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M338.0,149 Q338.0,178.0 338.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='338.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='338.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='338.0' y1='251' x2='404.0' y2='251' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(371.0,251.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='-6.0' y='-8' width='4' height='16' fill='#111'/><rect x='2.0' y='-8' width='4' height='16' fill='#f08c00'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='371.0' y='238.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>10 к</text>
<circle cx='415.0' cy='295.0' r='15.28' fill='#e03131' opacity='0.124'/>
<line x1='404.0' y1='295' x2='426.0' y2='295' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='415.0' cy='295.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='411.0' cy='291.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<path d='M426.0,207 Q426.0,189.0 426.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M426.0,207 Q426.0,189.0 426.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='426.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='426.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<rect x='155.62' y='343' width='78.75999999999999' height='27' rx='7' fill='#ffffff' opacity='0.95' stroke='#d0d4da'/>
<text x='195.0' y='361' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>яскраво</text>
<rect x='269.96' y='343' width='70.08' height='27' rx='7' fill='#ffffff' opacity='0.95' stroke='#d0d4da'/>
<text x='305.0' y='361' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>слабше</text>
<rect x='358.26' y='343' width='113.48' height='27' rx='7' fill='#ffffff' opacity='0.95' stroke='#d0d4da'/>
<text x='415.0' y='361' font-size='14' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>ледь жевріє</text>
</svg><figcaption>Три світлодіоди з резисторами 220 Ом, 1 кОм і 10 кОм</figcaption></figure>

<ol>
<li>Три червоні перемички з шини плюса в 4a, 9a, 14a.</li>
<li>Резистори в рядку c: 220 Ом з 4c у 7c, 1 кОм з 9c у 12c, 10 кОм з 14c у 17c.</li>
<li>Світлодіоди в рядку e, довга ніжка ліворуч: 7e-8e, 12e-13e, 17e-18e.</li>
<li>Три чорні перемички з 8a, 13a, 18a в шину мінуса.</li>
</ol>
<p>Діти замальовують у зошиті три кружечки й штрихують яскравість. Третій світлодіод при денному світлі майже не видно: накрити долонею «будиночком» і зазирнути. Питання: який резистор треба, щоб зробити нічник, який не заважає спати? А ліхтарик?</p>
<p>Кольорові смужки на резисторах не розбираємо. Досить знати, що смужки це код числа і що резистор повертається в комірку з тим самим написом.</p>
<p><strong>30-45 хв. Паралельно: кожному свій шлях.</strong> Замінити 1 кОм і 10 кОм на 220 Ом. Тепер усі три світять однаково.</p>
<figure class="fig" data-name="l3_paralelno"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 525'  data-h='525' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='525' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Паралельно: у кожного свій шлях</text>
<rect x='21' y='125' width='458' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='309.0' width='442' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='138' x2='465' y2='138' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='154' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='182' x2='465' y2='182' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='176' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='446' x2='465' y2='446' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='462' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='490' x2='465' y2='490' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='484' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='140.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='250.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<text x='360.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='470' y='211' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='470' y='233' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='470' y='255' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='470' y='277' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='470' y='299' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='470' y='337' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='470' y='359' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='470' y='381' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='470' y='403' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='470' y='425' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='31' y='46' width='170' height='64' rx='8' fill='#2b2f36'/>
<rect x='43.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='43.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='66.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='93.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='93.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='116.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='143.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='143.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='166.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<text x='116.0' y='103' font-size='12' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3×AA  4,5 В</text>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='79' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='74.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='45' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='52.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M118.0,149 Q118.0,178.0 118.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M118.0,149 Q118.0,178.0 118.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='118.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='118.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='118.0' y1='251' x2='184.0' y2='251' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(151.0,251.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='151.0' y='238.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>220</text>
<circle cx='195.0' cy='295.0' r='30' fill='#e03131' opacity='0.4'/>
<line x1='184.0' y1='295' x2='206.0' y2='295' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='195.0' cy='295.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='191.0' cy='291.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<path d='M206.0,207 Q206.0,189.0 206.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M206.0,207 Q206.0,189.0 206.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='206.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='206.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M228.0,149 Q228.0,178.0 228.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M228.0,149 Q228.0,178.0 228.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='228.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='228.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='228.0' y1='251' x2='294.0' y2='251' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(261.0,251.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='261.0' y='238.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>220</text>
<circle cx='305.0' cy='295.0' r='30' fill='#e03131' opacity='0.4'/>
<line x1='294.0' y1='295' x2='316.0' y2='295' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='305.0' cy='295.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='301.0' cy='291.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<path d='M316.0,207 Q316.0,189.0 316.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M316.0,207 Q316.0,189.0 316.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='316.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='316.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M338.0,149 Q338.0,178.0 338.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M338.0,149 Q338.0,178.0 338.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='338.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='338.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='338.0' y1='251' x2='404.0' y2='251' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(371.0,251.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='371.0' y='238.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>220</text>
<circle cx='415.0' cy='295.0' r='30' fill='#e03131' opacity='0.4'/>
<line x1='404.0' y1='295' x2='426.0' y2='295' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='415.0' cy='295.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='411.0' cy='291.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<path d='M426.0,207 Q426.0,189.0 426.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M426.0,207 Q426.0,189.0 426.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='426.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='426.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<rect x='55.0' y='358' width='390.0' height='28' rx='7' fill='#ffffff' opacity='0.95' stroke='#d0d4da'/>
<text x='250.0' y='377' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Вийми один світлодіод: інші світять далі</text>
</svg><figcaption>Паралельне з&#x27;єднання: три гілки від спільних шин</figcaption></figure>

<p>Досліди по черзі: вийняти середній світлодіод, інші світять; вийняти чорний дріт першої гілки, гасне лише перша. Діти пальцем ведуть три окремі шляхи струму. Приклад з життя: лампи в різних кімнатах квартири. Вимкнув світло на кухні, у кімнаті горить.</p>
<h3>Частина 2 (45 хв): послідовно і міні-проєкт</h3>
<p><strong>0-15 хв. Послідовно: один шлях на всіх.</strong></p>
<figure class="fig" data-name="l3_poslidovno"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 525'  data-h='525' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='525' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Послідовно: один шлях на всіх</text>
<rect x='21' y='125' width='458' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='309.0' width='442' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='138' x2='465' y2='138' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='154' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='182' x2='465' y2='182' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='176' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='446' x2='465' y2='446' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='462' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='490' x2='465' y2='490' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='484' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='140.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='250.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<text x='360.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='470' y='211' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='470' y='233' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='470' y='255' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='470' y='277' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='470' y='299' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='470' y='337' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='470' y='359' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='470' y='381' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='470' y='403' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='470' y='425' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='31' y='46' width='170' height='64' rx='8' fill='#2b2f36'/>
<rect x='43.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='43.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='66.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='93.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='93.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='116.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='143.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='143.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='166.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<text x='116.0' y='103' font-size='12' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3×AA  4,5 В</text>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='79' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='74.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='45' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='52.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M118.0,149 Q118.0,178.0 118.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M118.0,149 Q118.0,178.0 118.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='118.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='118.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='118.0' y1='251' x2='206.0' y2='251' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(162.0,251.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='162.0' y='238.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>220</text>
<circle cx='217.0' cy='295.0' r='19.6' fill='#e03131' opacity='0.20500000000000002'/>
<line x1='206.0' y1='295' x2='228.0' y2='295' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='217.0' cy='295.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='213.0' cy='291.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<text x='197.0' y='286.0' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M228.0,229 Q250.0,229.0 272.0,229' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M228.0,229 Q250.0,229.0 272.0,229' fill='none' stroke='#2f9e44' stroke-width='5' stroke-linecap='round'/>
<circle cx='228.0' cy='229' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='272.0' cy='229' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='283.0' cy='295.0' r='19.6' fill='#e03131' opacity='0.20500000000000002'/>
<line x1='272.0' y1='295' x2='294.0' y2='295' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='283.0' cy='295.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='279.0' cy='291.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<text x='263.0' y='286.0' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M294.0,207 Q294.0,189.0 294.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M294.0,207 Q294.0,189.0 294.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='294.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='294.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<rect x='36.400000000000006' y='358' width='427.2' height='28' rx='7' fill='#ffffff' opacity='0.95' stroke='#d0d4da'/>
<text x='250.0' y='377' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Світять тьмяніше. Вийми один: гаснуть обидва</text>
</svg><figcaption>Послідовне з&#x27;єднання двох світлодіодів</figcaption></figure>

<ol>
<li>Червона перемичка з шини плюса в 4a, резистор 220 Ом з 4c у 8c.</li>
<li>Перший світлодіод 8e-9e, зелена перемичка з 9b в 11b, другий світлодіод 11e-12e. В обох довга ніжка ліворуч.</li>
<li>Чорна перемичка з 12a в шину мінуса.</li>
</ol>
<p>Спостереження 1: обидва світять помітно тьмяніше, ніж один. Спостереження 2: вийняти будь-який, гаснуть обидва. Спостереження 3: додати третій світлодіод у ланцюжок, не світить жоден. Пояснення для дітей: кожен червоний світлодіод забирає собі близько 2 вольт, а в батареї їх 4,5. Двом ще вистачає, трьом уже ні. Якщо є стара гірлянда, викрутити одну лампочку й показати, що гасне вся: саме тому нові гірлянди роблять інакше.</p>
<p><strong>15-40 хв. Міні-проєкт «Світлофор на кнопках».</strong> Три гілки із частини 1 (усі з 220 Ом, світлодіоди червоний, жовтий, зелений), у кожну гілку замість червоної перемички ставимо кнопку, як на занятті 2. На макетці 830 місця вистачає: гілки ставити через 6 стовпчиків.</p>
<p>Гра в парі: один «регулювальник» на кнопках, другий веде іграшкову машинку по намальованій на аркуші дорозі й мусить реагувати на сигнали. Через 3 хв міняються. Наприкінці питання-місток до модуля 2: регулювальник втомився, хто б тиснув кнопки замість нього? Програма.</p>
<p><strong>40-45 хв. Розбирання.</strong> Резистори в правильні комірки: вчитель перевіряє кожен органайзер, бо переплутані 220 Ом і 10 кОм зіпсують наступне заняття.</p>
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
<td>У послідовній схемі не світить жоден</td>
<td>Один зі світлодіодів навпаки</td>
<td>Перевірити довгі ніжки в обох</td>
</tr>
<tr>
<td>Усі три гілки однаково тьмяні</td>
<td>Батарейки сіли</td>
<td>Мультиметр: менше 3,6 В на відсіку, міняти</td>
</tr>
<tr>
<td>Одна гілка не світить</td>
<td>Резистор і світлодіод не зустрілись в одному стовпчику</td>
<td>Провести пальцем шлях по картинці</td>
</tr>
<tr>
<td>Діти поставили один резистор на три паралельні світлодіоди</td>
<td>Економія деталей</td>
<td>Працює, але світлодіоди ділять струм нерівно; показати й повернути по резистору на кожен</td>
</tr>
</tbody>
</table>
<h3>Перевірка розуміння</h3>
<ol>
<li>Який резистор дасть найяскравіше світло: 220 чи 10 к? 220.</li>
<li>У гірлянді перегоріла одна лампочка і згасли всі. Як вони з'єднані? Послідовно.</li>
<li>Як з'єднані лампи у квартирі? Паралельно.</li>
</ol>
<p><strong>Для швидких:</strong> разом з учителем виміряти мультиметром напругу на відсіку батарей і на одному світлодіоді, записати обидва числа.</p>
<h2 id="mod1-4">Заняття 4. Потенціометр і фоторезистор</h2>
<p>Наприкінці заняття діти зібрали регулятор яскравості й схему, яскравість якої залежить від освітлення, і зрозуміли обидві деталі як «резистор, що змінюється».</p>
<p><strong>Що діти мають винести:</strong> потенціометр це резистор, опір якого міняємо рукою; фоторезистор це резистор, опір якого міняє світло; захисний резистор 220 Ом лишається в схемі завжди.</p>
<p><strong>На парту:</strong> потенціометр 10 кОм, фоторезистор, червоний світлодіод, резистор 220 Ом, перемички, аркуш чорного паперу або картонна трубка від паперових рушників довжиною 5 см. Для швидких: транзистор BC547, резистор 1 кОм, активний зумер.</p>
<p><strong>Вчителю:</strong> один розібраний потенціометр (кришка знімається ножем, видно доріжку й повзунок), ліхтарик.</p>
<h3>Частина 1 (45 хв): потенціометр</h3>
<p><strong>0-10 хв. Де ми це крутимо вдома.</strong> Питання до класу: що вдома регулюється ручкою, яка крутиться? Гучність на колонці, вогонь на плиті, димер лампи, температура в духовці. Пустити по руках розібраний потенціометр, показати ілюстрацію.</p>
<figure class="fig" data-name="l4_pot_vseredyni"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 330'  data-h='330' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='330' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Що всередині потенціометра</text>
<circle cx='250' cy='165' r='95' fill='#e7f0fb' stroke='#1971c2' stroke-width='3'/>
<path d='M190,215 A78,78 0 1 1 310,215' fill='none' stroke='#3a3a3a' stroke-width='16' stroke-linecap='round'/>
<line x1='250' y1='165' x2='298' y2='105' stroke='#f08c00' stroke-width='8' stroke-linecap='round'/><circle cx='250' cy='165' r='12' fill='#868e96'/>
<line x1='190' y1='215' x2='190' y2='300' stroke='#9aa0a6' stroke-width='6' stroke-linecap='round'/>
<circle cx='190' cy='312' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='190' y='317.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<line x1='250' y1='177' x2='250' y2='300' stroke='#9aa0a6' stroke-width='6' stroke-linecap='round'/>
<circle cx='250' cy='312' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='250' y='317.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>2</text>
<line x1='310' y1='215' x2='310' y2='300' stroke='#9aa0a6' stroke-width='6' stroke-linecap='round'/>
<circle cx='310' cy='312' r='13' fill='#1d2433' stroke='#fff' stroke-width='2'/>
<text x='310' y='317.5' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3</text>
<line x1='90' y1='65' x2='178' y2='135' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='178' cy='135' r='3' fill='#5b6475'/>
<rect x='11.0' y='44' width='158.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='90' y='62' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>доріжка-резистор</text>
<line x1='410' y1='65' x2='290' y2='115' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='290' cy='115' r='3' fill='#5b6475'/>
<rect x='367.0' y='44' width='86.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='410' y='62' font-size='15' fill='#c2410c' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>повзунок</text>
<text x='405' y='250' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>Беремо ніжки</text>
<text x='405' y='270' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>1 і 2 (середню)</text>
</svg><figcaption>Усередині потенціометра: доріжка-резистор і повзунок</figcaption></figure>

<p>Сказати дітям: «Струм заходить у ніжку 1 і йде по чорній доріжці до повзунка. Що далі повзунок від ніжки 1, то довша дорога і більший опір. Згадайте тонку соломинку: тепер вона ще й довга».</p>
<p><strong>10-35 хв. Регулятор яскравості.</strong></p>
<figure class="fig" data-name="l4_pot_schema"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 525'  data-h='525' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='525' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Регулятор яскравості</text>
<rect x='21' y='125' width='458' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='309.0' width='442' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='138' x2='465' y2='138' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='154' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='182' x2='465' y2='182' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='176' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='446' x2='465' y2='446' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='462' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='490' x2='465' y2='490' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='484' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='140.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='250.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<text x='360.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='470' y='211' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='470' y='233' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='470' y='255' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='470' y='277' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='470' y='299' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='470' y='337' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='470' y='359' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='470' y='381' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='470' y='403' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='470' y='425' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='31' y='46' width='170' height='64' rx='8' fill='#2b2f36'/>
<rect x='43.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='43.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='66.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='93.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='93.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='116.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='143.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='143.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='166.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<text x='116.0' y='103' font-size='12' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3×AA  4,5 В</text>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='79' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='74.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='45' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='52.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M118.0,149 Q118.0,178.0 118.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M118.0,149 Q118.0,178.0 118.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='118.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='118.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='118.0' y1='251' x2='206.0' y2='251' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(162.0,251.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='162.0' y='238.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>220</text>
<rect x='194.0' y='285' width='68.0' height='54' rx='6' fill='#1971c2' stroke='#0b4f8a' stroke-width='2'/>
<circle cx='206.0' cy='295' r='3.5' fill='#c0c4c9'/>
<circle cx='228.0' cy='295' r='3.5' fill='#c0c4c9'/>
<circle cx='250.0' cy='295' r='3.5' fill='#c0c4c9'/>
<circle cx='228.0' cy='319' r='15' fill='#e9ecef' stroke='#868e96' stroke-width='2'/>
<line x1='228.0' y1='319' x2='237.0' y2='310' stroke='#343a40' stroke-width='4' stroke-linecap='round'/>
<path d='M228.0,229 Q272.0,229.0 316.0,229' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M228.0,229 Q272.0,229.0 316.0,229' fill='none' stroke='#2f9e44' stroke-width='5' stroke-linecap='round'/>
<circle cx='228.0' cy='229' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='316.0' cy='229' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='327.0' cy='273.0' r='30.0' fill='#e03131' opacity='0.4'/>
<line x1='316.0' y1='273' x2='338.0' y2='273' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='327.0' cy='273.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='323.0' cy='269.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<text x='307.0' y='264.0' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M338.0,207 Q338.0,189.0 338.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M338.0,207 Q338.0,189.0 338.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='338.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='338.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='316.0' y1='394' x2='250.0' y2='295' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='250.0' cy='295' r='3' fill='#5b6475'/>
<rect x='228.0' y='393' width='176.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='316.0' y='411' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>третя ніжка вільна</text>
</svg><figcaption>Регулятор яскравості: резистор, потенціометр, світлодіод</figcaption></figure>

<ol>
<li>Червона перемичка з шини плюса в 4a, резистор 220 Ом з 4c у 8c.</li>
<li>Потенціометр трьома ніжками в 8e, 9e, 10e, корпус нависає над канавкою. Тиснути рівно, притримуючи за корпус, не за ручку.</li>
<li>Зелена перемичка з 9b (середня ніжка) в 13b.</li>
<li>Світлодіод 13d-14d, довга ніжка ліворуч. Чорна перемичка з 14a в шину мінуса.</li>
</ol>
<p>Крутимо. Найпомітніша зміна яскравості в першій чверті оберту, далі світлодіод тьмяний: це нормально для 10 кОм. Дослід: переставити зелену перемичку з 9b в 10b (крайня ніжка замість середньої). Ручка перестала діяти, світлодіод постійно тьмяний. Чому? Струм іде через усю доріжку, повзунок ні до чого.</p>
<p><strong>35-45 хв. Чому не можна прибрати 220 Ом.</strong> Питання класу: ручка в крайньому положенні, доріжки нуль. Що лишилось між батареєю і світлодіодом? Нічого, як на демо першого заняття. Дослід не проводимо, згадуємо запах.</p>
<h3>Частина 2 (45 хв): фоторезистор</h3>
<p><strong>0-10 хв. Резистор, що боїться темряви.</strong> Показати фоторезистор зблизька: зигзаг на поверхні це і є доріжка. На світлі її опір малий, у темряві величезний. Де це працює: вуличні ліхтарі, що самі вмикаються ввечері, яскравість екрана телефона.</p>
<p><strong>10-25 хв. Схема.</strong> Вийняти потенціометр, на його місце фоторезистор (полярності в нього немає).</p>
<figure class="fig" data-name="l4_ldr_schema"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 525'  data-h='525' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='525' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Фоторезистор замість ручки</text>
<rect x='21' y='125' width='458' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='309.0' width='442' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='138' x2='465' y2='138' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='154' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='182' x2='465' y2='182' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='176' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='446' x2='465' y2='446' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='462' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='490' x2='465' y2='490' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='484' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='140.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='250.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<text x='360.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='470' y='211' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='470' y='233' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='470' y='255' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='470' y='277' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='470' y='299' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='470' y='337' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='470' y='359' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='470' y='381' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='470' y='403' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='470' y='425' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='31' y='46' width='170' height='64' rx='8' fill='#2b2f36'/>
<rect x='43.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='43.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='66.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='93.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='93.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='116.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='143.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='143.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='166.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<text x='116.0' y='103' font-size='12' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3×AA  4,5 В</text>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='79' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='74.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='45' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='52.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M118.0,149 Q118.0,178.0 118.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M118.0,149 Q118.0,178.0 118.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='118.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='118.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='118.0' y1='251' x2='206.0' y2='251' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(162.0,251.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='162.0' y='238.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>220</text>
<line x1='206.0' y1='295' x2='250.0' y2='295' stroke='#9aa0a6' stroke-width='3'/>
<circle cx='228.0' cy='295.0' r='12' fill='#f6d9a8' stroke='#b5651d' stroke-width='2'/>
<path d='M221.0,290.0 h14 v3.5 h-14 v3.5 h14 v3.5 h-14' fill='none' stroke='#c2410c' stroke-width='1.8'/>
<path d='M250.0,229 Q283.0,229.0 316.0,229' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M250.0,229 Q283.0,229.0 316.0,229' fill='none' stroke='#2f9e44' stroke-width='5' stroke-linecap='round'/>
<circle cx='250.0' cy='229' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='316.0' cy='229' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='327.0' cy='273.0' r='22.0' fill='#e03131' opacity='0.25'/>
<line x1='316.0' y1='273' x2='338.0' y2='273' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='327.0' cy='273.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='323.0' cy='269.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<text x='307.0' y='264.0' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M338.0,207 Q338.0,189.0 338.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M338.0,207 Q338.0,189.0 338.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='338.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='338.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='228.0' y1='372' x2='228.0' y2='295' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='228.0' cy='295' r='3' fill='#5b6475'/>
<rect x='167.0' y='371' width='122.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='228.0' y='389' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>фоторезистор</text>
</svg><figcaption>Фоторезистор на місці потенціометра</figcaption></figure>

<ol>
<li>Фоторезистор у 8e і 10e.</li>
<li>Зелену перемичку переставити: з 10b у 13b.</li>
</ol>
<p>Досліди: накрити фоторезистор пальцем, потім трубкою з чорного паперу, потім посвітити ліхтариком телефона. У звичайному класному освітленні світлодіод світить слабко, під ліхтариком яскраво, під трубкою гасне.</p>
<p><strong>25-35 хв. Змагання «Найтемніша темрява».</strong> Хто зробить світлодіод найтьмянішим, не торкаючись схеми руками? Можна трубку, долоні будиночком, пенал, куртку. Потім навпаки: найяскравіший.</p>
<p><strong>35-42 хв. Проблема, яку лишаємо відкритою.</strong> Спитати: це нічник? Ні, він світить, коли світло, і гасне, коли темно. Нічник має робити навпаки. Хто придумає як? Прийняти всі ідеї, відповіді не давати: на занятті 17 це розв'яже програма з одним блоком «якщо».</p>
<p><strong>42-45 хв. Розбирання.</strong></p>
<h3>Для швидких: сигналізація для шухляди</h3>
<p>Схема за готовою картинкою, пояснення мінімальне: транзистор це кран, слабкий струм від фоторезистора відкриває сильний струм для зумера.</p>
<figure class="fig" data-name="l4_alarm"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 525'  data-h='525' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='525' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='19' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Сигналізація для шухляди (BC547)</text>
<rect x='21' y='125' width='458' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='309.0' width='442' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='138' x2='465' y2='138' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='154' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='182' x2='465' y2='182' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='176' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='446' x2='465' y2='446' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='462' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='490' x2='465' y2='490' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='484' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='140.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='250.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<text x='360.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='470' y='211' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='470' y='233' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='470' y='255' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='470' y='277' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='470' y='299' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='470' y='337' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='470' y='359' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='470' y='381' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='470' y='403' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='470' y='425' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='31' y='46' width='170' height='64' rx='8' fill='#2b2f36'/>
<rect x='43.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='43.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='66.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='93.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='93.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='116.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='143.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='143.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='166.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<text x='116.0' y='103' font-size='12' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3×AA  4,5 В</text>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='79' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='74.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='45' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='52.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M96.0,149 Q96.0,178.0 96.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M96.0,149 Q96.0,178.0 96.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='96.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='96.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='96.0' y1='251' x2='140.0' y2='251' stroke='#9aa0a6' stroke-width='3'/>
<circle cx='118.0' cy='251.0' r='12' fill='#f6d9a8' stroke='#b5651d' stroke-width='2'/>
<path d='M111.0,246.0 h14 v3.5 h-14 v3.5 h14 v3.5 h-14' fill='none' stroke='#c2410c' stroke-width='1.8'/>
<line x1='140.0' y1='295' x2='228.0' y2='295' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(184.0,295.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='-6.0' y='-8' width='4' height='16' fill='#111'/><rect x='2.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<path d='M198.0,281 h60.0 v-14 a30.0,22 0 0 0 -60.0,0 z' fill='#23262b'/>
<text x='206.0' y='276' font-size='10' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>К</text>
<text x='228.0' y='276' font-size='10' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Б</text>
<text x='250.0' y='276' font-size='10' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Е</text>
<path d='M250.0,207 Q250.0,189.0 250.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M250.0,207 Q250.0,189.0 250.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='250.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='250.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='360.0' cy='251.0' r='30' fill='#23262b' stroke='#000' stroke-width='1.5'/>
<circle cx='360.0' cy='251.0' r='5' fill='#555'/>
<text x='340.0' y='256' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M338.0,149 Q338.0,178.0 338.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M338.0,149 Q338.0,178.0 338.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='338.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='338.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M206.0,207 Q294.0,171.8 382.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M206.0,207 Q294.0,171.8 382.0,207' fill='none' stroke='#2f9e44' stroke-width='5' stroke-linecap='round'/>
<circle cx='206.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='382.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='382.0' y1='350' x2='360.0' y2='281' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='360.0' cy='281' r='3' fill='#5b6475'/>
<rect x='352.5' y='349' width='59.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='382.0' y='367' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>зумер</text>
<line x1='129.0' y1='350' x2='118.0' y2='251' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='118.0' cy='251' r='3' fill='#5b6475'/>
<rect x='68.0' y='349' width='122.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='129.0' y='367' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>фоторезистор</text>
<line x1='250.0' y1='398' x2='228.0' y2='259' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='228.0' cy='259' r='3' fill='#5b6475'/>
<rect x='103.5' y='397' width='293.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='250.0' y='415' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>транзистор, плоский бік до себе</text>
</svg><figcaption>Сигналізація на транзисторі BC547</figcaption></figure>

<ol>
<li>Червона перемичка з шини плюса в 3a. Фоторезистор 3c-5c.</li>
<li>Резистор 1 кОм з 5e в 9e.</li>
<li>Транзистор BC547 плоским боком до себе: ніжки в 8d, 9d, 10d.</li>
<li>Чорна перемичка з 10a в шину мінуса.</li>
<li>Зумер: плюс у 14c, мінус у 16c. Червона перемичка з шини плюса в 14a, зелена з 16a в 8a.</li>
</ol>
<p>Поклали макетку в коробку з-під взуття й закрили: тихо. Відкрили кришку: пищить. Саме BC547: у 2N2222 ніжки розташовані в іншому порядку, і картинка для нього неправильна.</p>
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
<td>Ручка крутиться, яскравість не міняється</td>
<td>Зелена перемичка на крайній ніжці</td>
<td>Переставити на середню, 9b</td>
</tr>
<tr>
<td>Світлодіод блимає, коли торкаєшся ручки</td>
<td>Ніжки потенціометра короткі, поганий контакт</td>
<td>Притиснути; якщо не допомагає, замінити деталь</td>
</tr>
<tr>
<td>З фоторезистором не світить зовсім</td>
<td>У класі темнувато</td>
<td>Посвітити ліхтариком: якщо засвітив, схема справна</td>
</tr>
<tr>
<td>Сигналізація пищить завжди</td>
<td>Транзистор повернутий навпаки</td>
<td>Плоский бік до себе, підпис на ньому читається</td>
</tr>
</tbody>
</table>
<h3>Перевірка розуміння</h3>
<ol>
<li>Що спільного в потенціометра і фоторезистора? Обидва резистори, опір яких змінюється.</li>
<li>Що змінює опір у першого й що в другого? Рука і світло.</li>
<li>Навіщо в схемі лишився резистор 220 Ом? Щоб світлодіод не згорів у крайньому положенні ручки.</li>
</ol>
<h2 id="mod1-5">Заняття 5. Проєкт «Нервовий дріт»</h2>
<p>Наприкінці заняття кожна пара має власну гру: провести петлю вздовж вигнутого дроту й не торкнутись. Торкнувся: пищить і світить. Це перший закінчений виріб, який можна показати батькам на фото.</p>
<p><strong>Що діти мають винести:</strong> вимикачем може бути що завгодно, що замикає коло, навіть два шматки дроту; зумер і світлодіод можна ввімкнути паралельно від одного «вимикача»; власний виріб треба випробувати й поправити.</p>
<p><strong>Вчителю підготувати на кожну пару:</strong></p>
<ul>
<li>Траса: 45 см мідного одножильного дроту 1,5 мм² (жила з електричного кабелю ВВГ, ізоляція знята). Наждачкою зняти окис, щоб блищав.</li>
<li>Петля: 15 см того ж дроту.</li>
<li>Основа: пінопласт 20×8 см товщиною 3 см або два шари гофрокартону, склеєні між собою.</li>
<li>2 дроти з «крокодилами» або 2 гнучкі проводи по 40 см із зачищеними кінцями.</li>
<li>Ізострічка, маркери.</li>
<li>Одна готова гра вчителя як зразок.</li>
</ul>
<p><strong>На парту з набору:</strong> активний зумер, червоний світлодіод, резистор 220 Ом, 2 червоні, 1 зелена перемичка, батарея.</p>
<h3>Частина 1 (45 хв): механіка</h3>
<p><strong>0-10 хв. Граємо в зразок.</strong> Троє-четверо добровольців проходять гру вчителя, клас рахує дотики. Питання: де тут коло? Що його замикає? Де тут «кнопка»? Відповідь: петля і траса це дві половинки вимикача.</p>
<figure class="fig" data-name="l5_gra"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 340'  data-h='340' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='340' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Гра «Нервовий дріт»</text>
<rect x='40' y='255' width='420' height='34' rx='6' fill='#c9a36b' stroke='#8a6a3a' stroke-width='2'/>
<path d='M80,255 C80,120 130,90 160,150 S210,230 250,140 S300,60 340,140 S400,210 420,255' fill='none' stroke='#b87333' stroke-width='7' stroke-linecap='round'/>
<line x1='80' y1='255' x2='80' y2='215' stroke='#212529' stroke-width='11' stroke-linecap='round'/>
<line x1='420' y1='255' x2='420' y2='215' stroke='#212529' stroke-width='11' stroke-linecap='round'/>
<circle cx='250' cy='140' r='17' fill='none' stroke='#868e96' stroke-width='5'/><line x1='250' y1='157' x2='250' y2='215' stroke='#868e96' stroke-width='5'/><rect x='241' y='200' width='18' height='46' rx='8' fill='#e03131'/>
<path d='M250,246 Q270.8,302.0 330,310' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M250,246 Q270.8,302.0 330,310' fill='none' stroke='#f08c00' stroke-width='5' stroke-linecap='round'/>
<circle cx='250' cy='246' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='330' cy='310' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M420,252 Q456.6,271.0 470,310' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M420,252 Q456.6,271.0 470,310' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='420' cy='252' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='470' cy='310' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='100' y1='75' x2='80' y2='225' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='80' cy='225' r='3' fill='#5b6475'/>
<rect x='12.0' y='54' width='176.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='100' y='72' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>старт (ізострічка)</text>
<line x1='440' y1='75' x2='420' y2='225' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='420' cy='225' r='3' fill='#5b6475'/>
<rect x='410.5' y='54' width='59.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='440' y='72' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>фініш</text>
<line x1='300' y1='57' x2='262' y2='128' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='262' cy='128' r='3' fill='#5b6475'/>
<rect x='230.0' y='36' width='140.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='300' y='54' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>петля з ручкою</text>
<text x='300' y='330' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>до схеми</text>
<text x='450' y='330' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>до мінуса</text>
</svg><figcaption>Гра «Нервовий дріт»: траса, петля з ручкою, два проводи</figcaption></figure>

<p><strong>10-30 хв. Гнемо трасу.</strong> Правила, які варто проговорити до початку, бо дріт один:</p>
<ol>
<li>Спершу намалювати трасу на папері в натуральну величину: 2-3 хвилі, без петель і гострих кутів.</li>
<li>Гнути руками плавно, навколо маркера або пальця. Гострий злам назад рівно не розігнеш.</li>
<li>По 3 см з кожного кінця лишити прямими і встромити в основу на всю товщину. Хитається: закріпити ізострічкою або термоклеєм (клей у руках вчителя).</li>
<li>Перші 4 см траси з обох боків обмотати ізострічкою. Це «старт» і «фініш», де петля може лежати й не пищати.</li>
</ol>
<p><strong>30-45 хв. Петля і ручка.</strong> Кінець короткого дроту обігнути навколо маркера: кільце діаметром близько 2 см, не замикати до кінця, інакше його не надіти на трасу. Хвіст обмотати ізострічкою в кілька шарів, це ручка. Надіти петлю на трасу, тоді дотиснути кільце. До ручки прикрутити гнучкий провід і замотати ізострічкою. Другий провід прикрутити до кінця траси під основою.</p>
<p>Діаметр кільця це складність гри: 2 см для третього класу якраз, 1 см не пройде ніхто.</p>
<h3>Частина 2 (45 хв): електрика і турнір</h3>
<p><strong>0-20 хв. Схема.</strong></p>
<figure class="fig" data-name="l5_schema"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 525'  data-h='525' xmlns:c2pa="http://c2pa.org/manifest">
<rect x='0' y='0'  height='525' rx='14' fill='#ffffff'/>
<text x='250.0' y='30' font-size='21' fill='#1d2433' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>Схема гри: дотик замикає коло</text>
<rect x='21' y='125' width='458' height='380' rx='10' fill='#f4f1e8' stroke='#c9c3b2' stroke-width='2'/>
<rect x='29' y='309.0' width='442' height='10' rx='4' fill='#ddd7c6'/>
<line x1='35' y1='138' x2='465' y2='138' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='154' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='182' x2='465' y2='182' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='176' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<line x1='35' y1='446' x2='465' y2='446' stroke='#e03131' stroke-width='2.5'/>
<text x='30' y='462' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<line x1='35' y1='490' x2='465' y2='490' stroke='#1c7ed6' stroke-width='2.5'/>
<text x='30' y='484' font-size='15' fill='#1c7ed6' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>−</text>
<rect x='48.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='145.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='167.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='203.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='225.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='247.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='269.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='291.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='329.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='351.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='373.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='395.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='417.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='453.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='48.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='70.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='92.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='114.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='136.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='158.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='180.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='202.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='224.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='246.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='268.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='290.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='312.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='334.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='356.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='378.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='400.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='422.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<rect x='444.5' y='475.5' width='7' height='7' rx='1.5' fill='#3a3a3a'/>
<text x='52.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>1</text>
<text x='140.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>5</text>
<text x='250.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>10</text>
<text x='360.0' y='196' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>15</text>
<text x='470' y='211' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>a</text>
<text x='470' y='233' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>b</text>
<text x='470' y='255' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>c</text>
<text x='470' y='277' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>d</text>
<text x='470' y='299' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>e</text>
<text x='470' y='337' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>f</text>
<text x='470' y='359' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>g</text>
<text x='470' y='381' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>h</text>
<text x='470' y='403' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>i</text>
<text x='470' y='425' font-size='10' fill='#8a8572' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>j</text>
<rect x='31' y='46' width='170' height='64' rx='8' fill='#2b2f36'/>
<rect x='43.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='43.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='66.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='93.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='93.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='116.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<rect x='143.0' y='56' width='46.0' height='32' rx='5' fill='#f59f00'/>
<rect x='143.0' y='56' width='46.0' height='10' rx='4' fill='#495057'/>
<text x='166.0' y='80' font-size='11' fill='#5c3b00' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>AA</text>
<text x='116.0' y='103' font-size='12' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>3×AA  4,5 В</text>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M79,110 Q76.5,129.5 74.0,149' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='79' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='74.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M45,110 Q48.5,140.5 52.0,171' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='45' cy='110' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='52.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M118.0,149 Q118.0,178.0 118.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M118.0,149 Q118.0,178.0 118.0,207' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='118.0' cy='149' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='118.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='140.0' cy='251.0' r='30' fill='#23262b' stroke='#000' stroke-width='1.5'/>
<circle cx='140.0' cy='251.0' r='5' fill='#555'/>
<text x='120.0' y='256' font-size='15' fill='#fff' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M118.0,295 Q173.0,328.0 228.0,295' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M118.0,295 Q173.0,328.0 228.0,295' fill='none' stroke='#e03131' stroke-width='5' stroke-linecap='round'/>
<circle cx='118.0' cy='295' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='228.0' cy='295' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='228.0' y1='251' x2='316.0' y2='251' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<g transform='translate(272.0,251.0) rotate(0.0)'><rect x='-22.0' y='-8' width='44' height='16' rx='7' fill='#e8cfa0' stroke='#b08d57' stroke-width='1.5'/><rect x='-14.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='-6.0' y='-8' width='4' height='16' fill='#c92a2a'/><rect x='2.0' y='-8' width='4' height='16' fill='#7a4a1e'/><rect x='13.0' y='-8' width='3' height='16' fill='#d4a017'/></g>
<text x='272.0' y='238.0' font-size='11' fill='#5b4a2a' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>220</text>
<circle cx='327.0' cy='295.0' r='30.0' fill='#e03131' opacity='0.4'/>
<line x1='316.0' y1='295' x2='338.0' y2='295' stroke='#9aa0a6' stroke-width='3' stroke-linecap='round'/>
<circle cx='327.0' cy='295.0' r='12' fill='#e03131' stroke='#00000055' stroke-width='1.5' opacity='1'/>
<circle cx='323.0' cy='291.0' r='3.5' fill='#ffffff' opacity='0.7'/>
<text x='307.0' y='286.0' font-size='15' fill='#e03131' text-anchor='middle' font-weight='bold' font-family='DejaVu Sans, Arial, sans-serif'>+</text>
<path d='M338.0,207 Q250.0,171.8 162.0,207' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M338.0,207 Q250.0,171.8 162.0,207' fill='none' stroke='#2f9e44' stroke-width='5' stroke-linecap='round'/>
<circle cx='338.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='162.0' cy='207' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<path d='M162.0,295 Q162.0,360.0 162.0,425' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M162.0,295 Q162.0,360.0 162.0,425' fill='none' stroke='#f08c00' stroke-width='5' stroke-linecap='round'/>
<circle cx='162.0' cy='295' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='162.0' cy='425' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='250.0' y1='390' x2='162.0' y2='399' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='162.0' cy='399' r='3' fill='#5b6475'/>
<rect x='207.0' y='369' width='86.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='250.0' y='387' font-size='15' fill='#c2410c' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>до петлі</text>
<path d='M404.0,171 Q404.0,263.0 404.0,355' fill='none' stroke='#00000030' stroke-width='7' stroke-linecap='round'/>
<path d='M404.0,171 Q404.0,263.0 404.0,355' fill='none' stroke='#212529' stroke-width='5' stroke-linecap='round'/>
<circle cx='404.0' cy='171' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<circle cx='404.0' cy='355' r='4' fill='#c0c4c9' stroke='#6b7280' stroke-width='1'/>
<line x1='371.0' y1='394' x2='404.0' y2='355' stroke='#5b6475' stroke-width='1.5' stroke-dasharray='4 3'/>
<circle cx='404.0' cy='355' r='3' fill='#5b6475'/>
<rect x='323.5' y='393' width='95.0' height='25' rx='6' fill='#ffffff' opacity='0.92' stroke='#d0d4da'/>
<text x='371.0' y='411' font-size='15' fill='#1d2433' text-anchor='middle' font-weight='normal' font-family='DejaVu Sans, Arial, sans-serif'>від траси</text>
</svg><figcaption>Схема гри: зумер і світлодіод паралельно, дотик замикає коло</figcaption></figure>

<ol>
<li>Червона перемичка з шини плюса в 4a.</li>
<li>Зумер: плюс у 4c, мінус у 6c.</li>
<li>Гілка світлодіода: червона перемичка з 4e в 9e, резистор 220 Ом з 9c у 13c, світлодіод 13e-14e (довга ніжка ліворуч), зелена перемичка з 14a в 6a.</li>
<li>Провід від петлі в 6e. Провід від траси в шину мінуса.</li>
</ol>
<p>Перевірка до гри: торкнутись петлею траси в оголеному місці. Пищить і світить. Питання для сильніших: чому зумеру резистор не потрібен, а світлодіоду потрібен? Зумер розрахований на цю напругу, світлодіод ні.</p>
<p><strong>20-38 хв. Турнір.</strong> Кожен проходить гру сусідньої пари, автори рахують дотики. Дві спроби, зараховується краща. Таблиця на дошці. Окрема номінація «найчесніша траса»: та, яку автори самі проходять без дотиків.</p>
<p><strong>38-45 хв. Підсумок модуля.</strong> Фото кожної пари з грою. П'ять запитань по одному на заняття: що таке коло; де плюс у світлодіода; що проводить струм; чим паралельне з'єднання краще для гірлянди; що змінює опір фоторезистора. Анонс: наступного разу в схемі з'явиться маленький комп'ютер, і кнопки за нас тиснутиме програма. Траси діти забирають додому, електричну частину розбирають.</p>
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
<td>Дотик є, сигналу немає</td>
<td>Окис або лак на дроті</td>
<td>Зачистити наждачкою трасу й кільце</td>
</tr>
<tr>
<td>Пищить постійно</td>
<td>Петля лежить на оголеній частині траси або проводи переплутані місцями з шиною плюса</td>
<td>Покласти петлю на ізострічку; перевірити крок 4</td>
</tr>
<tr>
<td>Пищить, але не світить</td>
<td>Світлодіод навпаки або зелена перемичка не в 6a</td>
<td>Пройти гілку пальцем за картинкою</td>
</tr>
<tr>
<td>Сигнал зникає, коли ворушиш провід</td>
<td>Скрутка на ручці ослабла</td>
<td>Перекрутити, замотати ізострічкою щільно</td>
</tr>
<tr>
<td>Траса падає</td>
<td>Основа затонка</td>
<td>Другий шар картону або термоклей</td>
</tr>
</tbody>
</table>
<p><strong>Для швидких:</strong> додати другий світлодіод, який світить постійно, поки гра ввімкнена (окрема гілка від шини плюса до шини мінуса, як на занятті 3). Або ускладнити власну трасу ще однією хвилею.</p>
<p><strong>Безпека.</strong> Кінці мідного дроту гострі: після відрізання загнути кінчик або замотати. Термоклей тільки в руках вчителя.</p>`
};

