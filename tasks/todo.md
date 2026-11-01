# Ірраціональні рівняння — 10 клас

## Мета

Додати урок «Ірраціональні рівняння» після теми «Область визначення функції».
Формат: покроковий інтерактивний інструмент у зошиті, як у наявних математичних темах.
План реалізовано. Урок містить теорію та одинадцять інтерактивних завдань.

## Дослідження

- [x] Знайти 10 клас: `DB.classes`, ідентифікатор `10a`, файл `js/data.js`.
- [x] Знайти предмет: `math`, адреса `#/10a/math`.
- [x] Перевірити наявну тему: `t9`, «Область визначення функції», адреса `#/10a/math/t9`.
- [x] Переглянути `domain.js`, реєстр інструментів і вимоги `CLAUDE.md`.
- [x] Скласти попередній план без змін коду уроків.

## План змісту

1. Пояснити ірраціональне рівняння: змінна міститься під знаком кореня.
2. Пояснити ОДЗ — область допустимих значень змінної.
   Це значення, за яких визначені обидві частини початкового рівняння.
   Для квадратного кореня підкореневий вираз має бути невід'ємним.
   Якщо є знаменник, він не може дорівнювати нулю.
   Додати посилання на наявний урок про область визначення.
3. Відокремити корінь, якщо потрібно. Піднести обидві частини до відповідного степеня.
   Для першої версії зосередитися на квадратних коренях і піднесенні до квадрата.
   Окремо пояснити невід'ємність правої частини у формі √f(x) = g(x).
   Не називати умову g(x) ≥ 0 частиною ОДЗ, якщо вона не обмежує визначеність виразу.
4. Розв'язати отримане лінійне або квадратне рівняння.
5. Перевірити кандидатів в ОДЗ та підстановкою в початкове рівняння.
   Пояснити, що піднесення до парного степеня може дати сторонні корені.
6. Записати відповідь або пояснити, чому розв'язків немає.

## Приклади

- `√(x − 2) = 3`: ОДЗ x ≥ 2; після піднесення x − 2 = 9; відповідь x = 11.
- `√(x + 2) = x`: ОДЗ x ≥ −2; права частина потребує x ≥ 0.
  Після піднесення кандидати −1 і 2; −1 — сторонній; відповідь x = 2.
- `√(x + 1) = −2`: ОДЗ x ≥ −1; розв'язків немає, бо квадратний корінь невід'ємний.
- `√(2x + 3) = √(x + 5)`: ОДЗ x ≥ −3/2; відповідь x = 2.

## Запланована реалізація

- [x] План схвалено користувачем. Перша версія: квадратні корені; після піднесення — многочлен до x².
- [x] Додати тему із завданнями в `js/data.js` для `cls:'10a'`, `subject:'math'`.
- [x] Створити `js/tools/irrational.js` та зареєструвати інструмент через `registerTool`.
- [x] Використати `js/core/formula.js` для коренів, степенів і точних значень.
- [x] Повторно використати придатні частини `domain.js` та лінійного ядра.
      Перевірити придатність квадратного розв'язувача до повторного використання.
- [x] Показувати розв'язання послідовними кроками; зберігати попередні рядки на аркуші.
- [x] Підключити інструмент у `index.html`; додати окремий CSS лише за потреби.

## План перевірки

- [x] Перевірити приклади з одним коренем, стороннім коренем і без розв'язків.
- [x] Перевірити межу ОДЗ: `√(x − 2) = 0`, відповідь x = 2.
- [x] Перевірити коректне повідомлення для непідтримуваних форм рівняння.
- [x] Перевірити всі кроки у браузері через `file://`, консоль і знімки аркуша.
- [x] Перевірити послідовну анімацію, стрибок між кроками та `prefers-reduced-motion`.
- [x] Перевірити пряму адресу уроку, переходи «Назад» і «Вперед».

## Результат перевірки

- Урок додано після теми про область визначення: `#/10a/math/irrational`.
- Теорія пояснює ОДЗ, піднесення до квадрата, розв’язання і перевірку коренів.
- Додано шість завдань та введення власної умови.
- Повторно використано формули, квадратний розв’язувач, інтервали та лінійні анімації.
- Перевірка кандидатів використовує точну арифметику BigInt у полі Q(√d).
- Перед лінійними кроками дробові коефіцієнти зведено до цілих без округлення.
- Виправлено злиття близьких меж ОДЗ у новому інструменті; спільне ядро не змінено.
- `node --test tests/irrational.test.cjs`: 38 перевірок пройдено.
- Chromium через Playwright: усі кроки шести завдань, власні умови, пряма адреса,
  історія браузера, ширина 390 px, послідовне письмо, лінійні польоти,
  стрибки вперед і назад та `prefers-reduced-motion` перевірено.
- Знімки уроку й аркушів переглянуто. Помилок у консолі та `pageerror` немає.
- Наявні інструменти області визначення, дільників і множення відкриваються та працюють.
- Незалежний review підтвердив математичні виправлення і проходження тестів.
- `git diff --check`: без зауважень.

Межі першої версії: квадратні корені; під коренем — многочлен до x²;
після відокремлення кореня права частина — лінійний вираз або квадратний корінь.
Непідтримувані форми отримують зрозуміле пояснення. Зміни не опубліковано.

## Уточнення: коротке лінійне розв’язання

- [x] Після усунення кореня розв’язувати лінійне рівняння з його поточними частинами.
- [x] Прибрати ділення на 1 та повторні рядки з одним доданком.
- [x] Перевірити точні дроби, анімацію перенесення та попередні сценарії.

Результат: `x − 2 = 9 → x = 9 + 2 → x = 11`.
Проміжний запис `x − 11 = 0`, ділення на 1 та повтор кандидата прибрано.
Для коефіцієнтів, відмінних від 1, ділення збережено.
Пройдено 41 тест і повторну перевірку Playwright, зокрема анімацію перенесення.
Знімок лінійного розв’язання переглянуто. Консоль без помилок.

## Кубічні корені

- [x] Додати пояснення ОДЗ кубічного кореня та рівносильного піднесення до куба.
- [x] Підтримати ∛P(x) = c та ∛P(x) = ∛Q(x), де P і Q мають степінь до 2.
- [x] Зберегти коротке лінійне розв’язання без ділення на 1.
- [x] Додати приклади з від’ємною правою частиною, двома коренями та квадратним рівнянням.
- [x] Перевірити моделі, повідомлення про межі підтримки, мобільний вигляд та анімацію.

План: повторно використати поточний розв’язувач лінійних і квадратних рівнянь.
Для кубічних коренів не додавати умов невід’ємності.
Рівняння третього степеня після піднесення та змішані показники коренів
поки відхиляти з окремим зрозумілим поясненням.

Результат: додано підтримку `root(3, …)`, `cbrt(…)` і `∛(…)`.
Урок містить 10 завдань: 6 попередніх і 4 з кубічними коренями.
Для кубічних коренів ОДЗ — усі дійсні числа в підтримуваних формах;
умови невід’ємності та попередження про сторонні корені при піднесенні до куба відсутні.
Перевірка кандидатів лишається точною. Лінійні кроки не містять ділення на 1.

Перевірено: 59 математичних тестів; усі кроки 10 завдань у Chromium;
мобільна ширина 390 px; показник кубічного кореня, послідовна анімація,
стрибки між кроками, `prefers-reduced-motion`, власні умови і попередні інструменти.
Знімки кубічного розв’язання на широкому та вузькому екранах переглянуто.
Консоль без помилок. `git diff --check` і синтаксична перевірка пройдені.
Локальний сервер відповідає HTTP 200.

## Метод заміни змінної

- [x] Додати завдання `x − 3√x + 2 = 0` із заміною `t = √x`.
- [x] Показати ОДЗ `x ≥ 0`, умову `t ≥ 0`, квадратне рівняння та повернення `x = t²`.
- [x] Повторно використати квадратний розв’язувач; відхиляти від’ємні t до піднесення до квадрата.
- [x] Додати вибір методу для власної умови та коротке пояснення в теорії.
- [x] Перевірити точні дроби, ірраціональні корені, нуль, відсутність розв’язків та браузерний вигляд.

Межі: рівняння, яке після заміни `t = √x` стає квадратним відносно t.
План перевірки: регресійні математичні тести, усі кроки нового завдання,
введення власної умови, мобільна ширина та анімація символу t.

Результат: додано завдання `ir11` і вибір методу «Заміна t = √x».
Приклад має відповіді x = 1 і x = 4. Від’ємні t відкидаються до повернення до x.
Квадратний розв’язувач повторно використано, символ t підтримує рукописну анімацію.
Точні дробові та ірраціональні значення x = t² обчислюються без округлення.

Перевірено 80 тестів та всі кроки 11 завдань у Chromium.
Перевірено вибір і збереження методу після оновлення сторінки, власну умову,
від’ємний t, мобільну ширину 390 px, анімацію символу t та стрибки між кроками.
Знімки нового розв’язання на широкому й вузькому екранах переглянуто.
Помилок у консолі немає. Незалежна перевірка 648 наборів коефіцієнтів підтвердила відповіді.
`git diff --check` пройдено. Нові зміни не закомічено.

# Степінь з раціональним показником — 10 клас

## План

- [x] Додати тему з означенням, обмеженнями й усіма основними властивостями без доведень.
- [x] Додати по одному покроковому прикладу з груп 6.1–6.13 на наданих сторінках.
- [x] Використати спільний рендер формул і послідовну рукописну анімацію.
- [x] Перевірити математичні перетворення, навігацію, мобільний вигляд і спокійний режим.

План представлено в чаті. Приклади будуть готовими розборами з вибором групи.
Властивості: добуток, частка, степінь степеня, степінь добутку й частки;
нульовий і від’ємний показники. Для дробових показників дотримуємося означення з підручника.


## Результат перевірки

Тема доступна в 10 класі, предмет «Математика», після ірраціональних рівнянь:
`#/10a/math/rational-power`.
Конспект містить означення, нульовий і від’ємний показники, обмеження,
п’ять основних властивостей без доведень і коротке пояснення степеневої функції.
Додано 13 готових інтерактивних розборів, по одному з груп 6.1–6.13.
Власні вирази інструмент не обчислює: учень вибирає готовий приклад.

- `node --test tests/*.test.cjs`: 97 тестів пройдено.
- Незалежний числовий інтерпретатор перевіряє всі формули кожного розбору,
  граничні значення, недопустимі основи та збереження обмеження a ≠ 25.
- Chromium через `file://`: усі кроки 13 завдань, прямі адреси,
  вибір іншого прикладу, оновлення сторінки, «Назад» і «Вперед» перевірено.
- Послідовні затримки штрихів, стрибки між кроками та спокійний режим перевірено.
- На ширині 390 px сторінки уроку, завдання та вільного інструмента не переповнюються.
- Знімки конспекту та аркушів переглянуто. Консоль без помилок.
- Попередні інструменти області визначення, ірраціональних рівнянь і дільників працюють.
- Незалежний перегляд підтвердив правильність формул та умов застосування.
- `git diff --check` пройдено. Зміни не закомічено.

## Уточнення: висота показника степеня

- [x] Виправити спільне розміщення показника, щоб дріб читався як показник степеня.
- [x] Переглянути дробові, цілі та вкладені показники у браузері.


Результат: спільна сітка степеня піднімає весь дріб над основою,
зберігаючи основу, знак рівності та сусідні вирази на спільній осі.
Переглянуто приклади 6.1, 6.9, 6.12, 6.13 і попередній урок ірраціональних рівнянь.
Chromium: дробові, цілі та вкладені показники, ширина 390 px, консоль без помилок.
Усі 97 тестів і `git diff --check` пройдено.


## Уточнення: прибрати номери вправ

- [x] Прибрати номери з карток, списку вибору та видимого тексту теми.
- [x] Зберегти внутрішні ключі прикладів для чинних адрес.


## Повторне уточнення: показники в конспекті

- [x] Підняти весь показник вище верхньої межі основи, включно зі знаменником.
- [x] Оновити версію CSS, щоб сторінка завантажила нове оформлення.
- [x] Перевірити саме приклад добутку степенів у конспекті та аркуш завдання.


Перевірено через HTTP на localhost: усі 41 показник у конспекті повністю вище
верхньої межі основи. Найменший просвіт — 1,94 px. Переглянуто знімок саме
прикладу добутку степенів і мобільний аркуш. CSS підключено з новою версією.
На ширині 390 px переповнення немає. Помилок у консолі немає.


## Відкат останнього підняття показника

- [x] За уточненням користувача повернути попередній відступ показника −0,25em.
- [x] Змінити версію CSS, щоб браузер завантажив повернуте оформлення.

Причина: користувач бачив закешовану версію. Останнє додаткове підняття не потрібне.

## Наочне скорочення дробу

- [x] Додати окремий крок скорочення спільних множників без повторного запису дробу.
- [x] Послідовно домалювати діагональні риски в чисельнику та знаменнику.
- [x] Перевірити збереження рисок, переходи назад, стрибки та спокійний режим.


Результат: приклад скорочення має чотири кроки. На третьому кроці
дві рожеві риски послідовно закреслюють спільні множники в уже записаному дробі.
На четвертому з’являється відповідь, риски залишаються. Умову a ≠ 25 збережено.

Перевірено: 97 тестів; незалежний перегляд; Chromium через localhost;
послідовні риски (0 та 0,6 с), відсутність повторного письма дробу,
повернення назад, стрибок до відповіді, спокійний режим і ширина 390 px.
Знімки широкого й мобільного аркушів переглянуто. Помилок у консолі немає.


## Коротка теорія ірраціональних рівнянь — 10 клас

- [x] Переглянути чинний конспект і надані сторінки підручника.
- [x] Додати короткі пояснення рівносильності, рівняння-наслідку та стороннього кореня без доведень.
- [x] Пояснити піднесення до непарного й парного степеня на простих прикладах.
- [x] Перевірити зміст, тести та вигляд конспекту на широкому й вузькому екранах.

План: доповнити лише конспект. Зберегти чинний алгоритм, метод заміни та інтерактивні завдання.

Результат: додано означення рівносильних рівнянь, рівняння-наслідку й стороннього кореня.
Правила для непарного та парного степенів пояснено на двох коротких прикладах, без доведень.
Незалежний перегляд підтвердив математичну правильність і відповідність рівню 10 класу.
Перевірено: 97 тестів, синтаксис `js/data.js`, `git diff --check`.
Chromium: конспект на ширині 1440 і 390 px, усі 11 посилань на завдання, без переповнення й помилок консолі.
Знімки обох розмірів переглянуто.


## Оформлення конспекту за зразком rational-power

- [x] Порівняти структуру та оформлення двох конспектів.
- [x] Поділити теорію на розділи й винести приклади в окремі рядки формул зі спільним рендером.
- [x] Перевірити широке й мобільне оформлення, тести та помилки консолі.

План: застосувати структуру `rational-power`: заголовки h2/h3, короткі абзаци, окремі прокручувані формули.

Результат: конспект поділено на розділи h2/h3, 12 рядків формул використовують спільний рендер.
Розміри формул, відступи та прокручування відповідають `rational-power`.
Перевірено 97 тестів; тестове оточення доповнено модулем рукописного рендера.
Chromium: ширина 1440 і 390 px, знімки переглянуто, переповнення й помилок консолі немає.
Усі 11 завдань доступні; інтерактивне завдання зі стороннім коренем відкривається.
## Геометрія — 9 клас

- [x] Додати 9 клас і доступний предмет «Геометрія» лише для цього класу.
- [x] Перевірити дані, маршрут розділу та стан без тем.

План: використати наявні картки класів і предметів та повідомлення «Тем поки немає».

Результат: додано розділ `#/9a/geometry` без тем.
Перевірено рендер карток, заголовок, стан без тем і прямий маршрут через Node VM.
Синтаксис `js/data.js` та `git diff --check` — без помилок.

## § 6. Вектори — інтерактивна панель

- [x] Знайти тему в наданому КТП та перевірити архітектуру інтерактивних сторінок.
- [x] Додати урок до геометрії 9 класу та панель із п’ятьма поясненнями без доведень.
- [x] Додати рухомі точки, готові приклади, визначення відношень і нульовий вектор.
- [x] Перевірити математику, керування, маршрути, вузький екран і помилки браузера.

План: окрема сторінка через `DOCS`, без змін спільної оболонки.
SVG-рисунок показує два вектори на сітці. Точки рухаються мишею, дотиком і клавішами.
Пояснення охоплюють початок і кінець, модуль, напрям, колінеарність та рівність.
Готові приклади показують рівні, протилежно напрямлені, неколінеарні й нульові вектори.
Координати, операції над векторами та доведення не входять до цієї панелі.

Результат: урок доступний за `#/9a/geometry/vectors`.
П’ять пояснень, шість готових прикладів, рухомі точки, прямі векторів,
модулі та поточні відношення між векторами. Є керування клавіатурою й кнопками.
Перевірено 103 тести, зокрема шість математичних тестів нової панелі.
Незалежний перегляд підтвердив означення, класифікацію та збереження вектора при переносі.
Chromium через `file://`: перетягування, клавіші, межі сітки, готові приклади,
перенос, перестановка кінців, скидання, історія, прямий маршрут, повторне відкриття,
ширина 390 px, спокійний режим і попередній урок ірраціональних рівнянь.
Широкий і мобільні знімки переглянуто; переповнення та помилок консолі немає.

## Задачі до § 6 про вектори

- [x] Додати сім задач із рисунками: модуль, напрям, колінеарність, рівність і нульовий вектор.
- [x] Додати введення відповіді, перевірку, підказки, пояснення та лічильник розв’язаних задач.
- [x] Перевірити відповіді, повторні спроби, збереження стану між задачами та мобільний вигляд.

План: окремий блок «Спробуй розв’язати» під наявною панеллю.
Дві задачі приймають числову відповідь, п’ять — вибір твердження.
Кожна задача має власний незмінний рисунок. Відповідь не показується до перевірки або відкриття розв’язання.

Результат: під панеллю додано блок «Спробуй розв’язати» з сімома задачами.
Правильна відповідь відкриває пояснення та збільшує прогрес лише один раз.
Підказка й відкриття розв’язання самі по собі не зараховують задачу.
Вибір, введене число й результати зберігаються між задачами до скидання або перезавантаження сторінки.
Рисунки мають текстові описи для читачів екрана.
Перевірено 107 тестів; незалежний перегляд підтвердив математику й однозначність відповідей.
Chromium: усі задачі, порожнє та неправильне введення, правильні відповіді,
Enter, підказки, відкриття розв’язань, прогрес, переходи, скидання, ширина 390 px.
Повторна перевірка початкової панелі пройдена, помилок консолі та переповнення немає.
Широкий і мобільні знімки переглянуто. Синтаксис і `git diff --check` — без помилок.

## Множення вектора на число — 9 клас

План представлено в чаті. Використати локальний підручник як джерело,
створити окрему сторінку DOCS у наявному розділі геометрії.
Книгу виключити з Git. Сайт має працювати автономно через file://.

- [x] Перевірити параграф підручника та додати /books/ до .gitignore.
- [x] Додати урок: означення, знак і модуль множника, нуль, координати, властивості.
- [x] Створити панель зі зміною множника й вектора, готовими дослідами та перевіркою знань.
- [x] Перевірити математику, браузерне керування, маршрути, ширину 390 px і попередній урок.
- [x] Записати результати перевірки. Не створювати коміт.


Результат: урок «§ 9. Множення вектора на число» доступний за
`#/9a/geometry/vector-scaling`. Джерело: Істер, § 9, друковані с. 73–77.
Додано чотири кроки дослідження, повзунки k, x, y, п’ять готових дій,
автоматичний масштаб сітки, модулі й напрям у поточному стані.
Конспект містить означення, нульовий добуток, властивості та ознаку колінеарності.
Шість авторських задач мають перевірку, повторні спроби, пояснення та прогрес.

Перевірено 110 тестів, зокрема всі 2025 комбінацій параметрів панелі.
Chromium через file://: чотири кроки, повзунок із клавіатури, готові дії,
порожня й неправильна відповіді, правильні відповіді всіх задач, повторний підрахунок,
історія браузера, прямий маршрут, повторне відкриття, ширина 390 px,
спокійний режим та попередній урок про вектори. Помилок консолі немає.
Широкий і мобільний знімки переглянуто. Синтаксис і git diff --check пройдено.
Папку /books/ виключено через .gitignore; PDF не змінено й не додано до Git.
Коміт не створено.
Незалежний перегляд виявив втрату фокуса після перевірки відповіді.
Виправлено: повідомлення, пояснення й прогрес оновлюються без заміни форми.
Chromium підтвердив збереження фокуса після Enter; повторні 110 тестів і браузерні перевірки пройдено.

## Читабельність рисунка множення вектора

- [x] Зменшити товщину зеленого вектора та поліпшити стрілки й підписи.
- [x] Перевірити рисунок при додатному, від’ємному й одиничному множнику на двох ширинах.

План: зберегти спільний початок і відмінність суцільної та штрихової ліній.

Результат: товщину зеленого вектора зменшено з 7 до 3, фіолетового — до 2,5.
Збільшено вістря й підписи, послаблено сітку. Оновлено версії JS/CSS.
Переглянуто рисунки при k = 2, k = 1 та k = −1,5 на ширинах 1440 і 390 px.
Браузерні перевірки панелі, задач, історії та попереднього уроку пройдено.
Помилок консолі немає; git diff --check пройдено.

## Скалярний добуток векторів — 9 клас, § 10

Мета: пояснити скалярний добуток і додати інтерактив для вправ 10.1, 10.3, 10.10, 10.12, 10.14.

- [x] Перевірити структуру уроків, правила проєкту та попередні уроки.
- [x] Звірити всі підпункти вправ із локальним підручником Істера.
- [x] Додати теорію: означення, кут, координати, знак, перпендикулярність, властивості.
- [x] Створити панель із рисунками, вибором вправи й підпункту, кроками та перевіркою відповіді.
- [x] Додати урок після § 9 та підключити локальні ресурси.
- [x] Перевірити математику тестами й роботу у браузері на широкому та вузькому екранах.
- [x] Переглянути знімки, перевірити консоль, навігацію та записати результат.

Рішення: окремий документ-урок через DOCS, як попередні геометричні уроки.
Спільні стилі векторів зберегти. Нову поведінку розмістити в хуку init уроку.
Назви карток описують дію; номери підручника показати як довідку в умові.


Результат: урок доступний за `#/9a/geometry/scalar-product` після § 9.
Додано теорію, дослід із повзунками кута й довжин та п’ять груп вправ.
Усі 11 підпунктів звірено зі сторінками 82–83 підручника Істера.
Є рисунки, перевірка точних радикалів і наближень, послідовні кроки та прогрес.
Спроби й відкриті кроки зберігаються при перемиканні підпунктів у межах уроку.

Перевірка: `node --test tests/*.test.cjs` — 113 тестів пройдено.
Chromium через `file://`: усі 11 підпунктів, правильні й неправильні відповіді,
порожня відповідь, кроки вперед і назад, збереження фокуса після Enter,
повзунки з клавіатури, кути 0°, 90°, 180°, прогрес, прямий маршрут та історія.
Перевірено ширини 1440 і 390 px, режим зменшеного руху та попередні уроки.
Знімки теорії, досліду та задач переглянуто. Виправлено обрізаний підпис кута.
Помилок консолі немає. Незалежний перегляд не виявив зауважень.
Синтаксис JS та `git diff --check` пройдено. Коміт не створено.

## Уточнення: задачі § 10 у зошиті, як в алгебрі 10 класу

- [x] Перевірити оболонку інструментів і формат `rational-power`.
- [x] Уточнити реалізацію: одна задача на екрані, накопичення рядків і послідовне письмо.
- [x] Зареєструвати інструмент для всіх 11 підпунктів зі спільним рендером формул.
- [x] Замінити панель відповідей у конспекті картками задач із прямими адресами.
- [x] Зберегти теорію й дослід; додати перехід до наступної задачі після розв’язання.
- [x] Перевірити моделі, письмо, стрибки між кроками, історію та мобільний вигляд.
- [x] Переглянути знімки та записати результати.

План перевірено зі структурою алгебри. Використати наявний реєстр і оболонку зошита.
Для теми-документа дозволити відкриття її зареєстрованих задач, зберігши маршрути до розділів.


Результат уточнення: замість панелі введення відповідей додано 11 окремих задач у зошиті.
Теорію й дослід збережено. Кожна задача має пряму адресу та накопичує рядки розв’язання.
Використано спільні renderFormula, hwGlyphs, hwTick та оболонку кроків алгебри.
Корені й дроби записуються точно. Після відповіді є перехід до наступної задачі.

Перевірено 117 тестів, зокрема числову рівність усіх перетворень і маршрути документів.
Chromium: усі кроки 11 задач, послідовні затримки письма, збереження попередніх рядків,
стрибки між кроками, переходи між задачами, історія, вибір іншої умови, мобільна ширина 390 px,
спокійний режим та попередні уроки геометрії й алгебри. Консоль без помилок.
Знімки зошита переглянуто. `git diff --check` пройдено.

## Уточнення: обчислення в одному рядку

- [x] Перевірити модель кроків і рендер зошита.
- [x] Прибрати посилання на вправу й підпункт із заголовка задачі.
- [x] Дописувати числові перетворення в рядку підстановки через знак рівності.
- [x] Зберегти послідовне письмо лише нового фрагмента й перевірити мобільний екран.
- [x] Перевірити тести, знімки та консоль.

Рішення: зберегти математичні кроки, згрупувати їхні фрагменти в одному рядку рендера.
Формулу й висновок залишити окремими змістовими рядками.


Результат: прибрано «За вправою …, підпункт …» із задач.
Числові кроки дописуються в рядок підстановки через «=»; попередні частини не анімуються повторно.
На вузькому екрані формула прокручується до нової частини рівності.
Перевірено всі 11 задач у Chromium, письмо нових фрагментів, стрибки між кроками,
переходи між задачами, режим зменшеного руху та ширину 390 px.
Знімки переглянуто; помилок консолі немає. Пройдено 118 тестів і `git diff --check`.

## Позначення кута α

- [x] Замінити φ на грецьку α на рисунку, у формулах, повзунку й умовах задач теми.
- [x] Оновити версії JS, перевірити браузер і знімок рисунка.

Перевірено 8 тестів теми. Chromium підтвердив α на рисунку й в умові задачі.
Знімок переглянуто; помилок браузера немає. `git diff --check` пройдено.

## Множення вектора на число — приклади замість тестів

- [x] Перевірити поточні шість тестів і формат зошита скалярного добутку.
- [x] Винести спільний рендер векторних записів для обох інструментів.
- [x] Створити шість покрокових прикладів: модуль, напрям, координати, множник, нуль і спрощення.
- [x] Замінити тести картками прикладів із прямими адресами; зберегти теорію й дослід.
- [x] Перевірити математику, послідовне письмо, дописування в рядку та переходи між прикладами.
- [x] Перевірити мобільний вигляд і попередній урок; записати результат.

План перевірено за реалізацією скалярного добутку. Використати спільну оболонку зошита.
Обчислення дописувати через «=» в одному рядку. Показувати одну задачу за раз.


Результат: тести замінено шістьма прикладами у зошиті за адресами
`#/9a/geometry/vector-scaling/scaling-1` … `scaling-6`.
Є послідовні кроки письма, дописування рівностей в одному рядку та перехід до наступної задачі.
Теорію, чотири кроки досліду, повзунки й готові досліди збережено.
Спільний рендер векторних записів і стилі винесено для обох векторних інструментів.

Перевірено 124 тести. Нові перевірки підтверджують числові перетворення,
обидві координати знайденого множника та умови ненульового вектора.
Chromium через file://: усі кроки шести прикладів, послідовне письмо лише нової частини,
стрибки, рух назад, переходи між задачами, прямі адреси, історія, вибір іншої умови,
ширина 390 px та режим зменшеного руху. Знімки зошитів переглянуто.
Повторно перевірено всі 11 задач скалярного добутку та урок про вектори.
Помилок консолі немає. Незалежний перегляд інтеграції не виявив зауважень.
`git diff --check` пройдено. Коміт не створено.

## Пряме відкриття другого прикладу

- [x] Перевірити відповідь локального сервера та сторінку через HTTP.
- [x] Додати версії ресурсів даних і маршрутизатора для оновлення кешованих копій.
- [x] Перевірити пряму адресу scaling-2, повне перезавантаження та перехід зі scaling-1.

Сервер повертає HTTP 200. У чистому сеансі помилку переходу не відтворено.
Можлива причина — застарілий стан відкритої вкладки; конкретну причину не підтверджено.
Оновлено версії js/data.js та js/app.js. Посилання з параметром перед hash
примусово завантажує документ замість самого переходу між розділами поточної сторінки.
Три перевірки маршрутів і Chromium через HTTP пройдено. Помилок браузера немає.

# React and TypeScript foundation

Scope: migrate student navigation and the shared tool shell to strict TypeScript and React.
Keep math engines, document hooks, hash URLs, styles, and animation contracts unchanged.
Build a local classic-script bundle so checked-in `index.html` still works offline and on GitHub Pages.
Use React components for Button, LinkButton, Card, Breadcrumbs, and Notebook.
Keep trusted lesson HTML behind one explicit adapter. Unmount React before legacy document rendering.

- [x] Inspect architecture, existing tests, and project lessons.
- [x] Present migration scope before implementation.
- [x] Add repeatable build, strict type checking, and dependency lockfile.
- [x] Migrate student pages and tool shell to reusable React components.
- [x] Preserve legacy routing and synchronous animation lifecycle at the bridge.
- [x] Run existing tests and browser checks: navigation, documents, custom inputs, steps, reduced motion, mobile, and file URLs.
- [x] Document development commands, migration boundary, and verification results.


## Review and verification

- Student pages and the shared tool shell now use React and strict TypeScript.
- Shared components cover buttons, cards, breadcrumbs, headings, and the notebook surface.
- Math engines, inline document APIs, document hooks, hash URLs, and existing styles remain compatible.
- The bridge commits synchronously before animation measurements and cancels pending animation frames on unmount.
- The production bundle and license notices are stored locally in `assets/`; no CDN is required.
- Added build/dev commands, a lockfile, migration guidance, and CI checks for stale generated assets.
- `npm run build`: passed, including strict TypeScript checking.
- `npm test`: all 124 existing checks passed; baseline also had 124 passing checks.
- `npm run test:browser`: all 7 Chromium tests passed. Coverage includes student navigation,
  browser history, custom input, validation, completion, document state, each lesson tool,
  animation timing, skipped steps, reduced motion, stale-frame cancellation, mobile layout, and `file://`.
- The column animation test confirmed separate flights for the written digit and carry digit.
- Desktop and 390 px notebook screenshots were inspected. No browser console errors occurred.
- Read-only independent review found no blocking lifecycle or routing regressions.
- `git diff --check`: passed.

Migration boundary: legacy lesson engines, data, routing, and documents still use JavaScript.
Their conversion can proceed one module at a time using the typed UI boundary.
Changes are local and have not been committed or published.

# Format React pages

- [x] Inspect the page source and existing formatter configuration.
- [x] Format `StudentPage.tsx` and `ToolPage.tsx` with consistent indentation and line breaks.
- [x] Verify TypeScript and rebuild the offline bundle.

Review: formatted both React pages with Prettier. TypeScript, production build, and `git diff --check` passed.

# Feature folders and focused components

Scope: organize React source under `src/features/student/` and `src/features/tools/`.
Keep generic UI and notebook components in `src/components/`.
StudentPage selects the current screen; each screen composes feature cards and sections with typed props.
ToolPage composes configuration and notebook panels; isolate animation timing in a feature hook.
Preserve DOM structure, text, routes, global bridge, and animation behavior.

- [x] Inspect existing pages and identify feature boundaries.
- [x] Present scope before implementation.
- [x] Split student screens, cards, and topic sections into feature components.
- [x] Split tool panels, step controls, and animation hook into feature components.
- [x] Update imports and architecture documentation; format changed source.
- [x] Run build, existing tests, browser tests, and diff checks.


Review: student feature now has four screens and focused cards, grids, breadcrumbs, and topic sections.
Tool feature now has configuration and stage panels, step controls, and `useToolAnimation`.
Only feature entry pages read `DB` and `S`; child components receive typed props.
Shared primitives remain in `src/components/`. Removed `src/pages/` and updated imports and documentation.
Formatted all feature files and rebuilt the offline bundle; updated its resource version.
Verification: strict TypeScript/build passed, 124 existing tests passed, 7 browser tests passed,
and `git diff --check` passed. Navigation, document state, file URLs, and sequential column flights remain covered.

# Whole-app React migration

Completion criteria: one React application owns every public route, document shell, tool form,
header, notification, navigation transition, and step lifecycle. `index.html` loads one local bundle.
No application page reads classic-script globals. Preserve lesson content, mathematical engines,
handwritten/SVG rendering, and specialist diagram simulations through a module-scoped engine API.
Keep feature folders and typed props. Do not add routes for disconnected teacher/admin prototypes.

Execution plan:

- [x] Inventory remaining scripts, forms, document hooks, and browser contracts.
- [x] Define full application boundary and present the execution plan.
- [x] Add typed hash routing, application state/actions, and a React application root.
- [x] Move header, notifications, student navigation, and tool lifecycle into React.
- [x] Replace every tool input HTML template with React fields and controls.
- [x] Migrate document navigation, article lifecycle, figures, printing, and KTP editing to React components.
- [x] Bundle data/math/document engines behind an explicit module API; remove classic script boot and global declarations.
- [x] Remove retired UI/router scripts and update routing tests to exercise TypeScript code.
- [x] Verify every tool, every document route, projector simulations, downloads/printing, history, mobile, and offline operation.
- [x] Update architecture docs and record remaining engine boundaries accurately.

Verification plan: retain the 124 math/routing assertions; add router edge cases, React form coverage,
document route and interaction coverage, and a single-bundle/offline assertion. Preserve sequential
writing, number flights, reduced motion, skipped steps, and same-document state. Review rendered
screenshots and check the production artifact before marking the migration complete.

## Scope correction after review

The projector and geometry engines contain control UI as well as drawing code.
A React wrapper alone does not complete their migration. Keep the numerical/rendering
engines, but migrate their control surfaces and interactive view composition too.

- [x] Migrate geometry exploration and practice controls to feature components.
- [x] Migrate keyboard projector controls and typing view to feature components.
- [x] Migrate Windows simulator view composition and controls to feature components.
- [x] Migrate circuit palette, toolbar, property controls, and view composition to feature components.


## Whole-app migration review

Implemented:

- One React root owns all public routes, header, notifications, navigation, documents, and tool steps.
- Routing, application state/actions, and the school catalog now use strict TypeScript modules.
- All 16 math forms are React; their old HTML/editor templates were removed from the engine registry.
- Documents use React contents, lightbox, print actions, KTP editing, and explicit mount cleanup.
- Geometry exploration, SVG handles, task forms, keyboard projector/editor, Windows desktop/Explorer/dialogs,
  and circuit palette/toolbar/properties now use focused React feature components.
- Mathematical calculations, handwritten/SVG output, circuit physics, keyboard editor operations,
  and Windows filesystem commands remain JavaScript engines behind a typed private runtime API.
- Removed classic bootstrap scripts, global declarations, old data script, and disconnected cabinet UI prototypes.
- `index.html` loads one local production bundle; there are no external imports or legacy browser globals.
- Added repeatable source formatting, a CI format check, graceful dev shutdown, and updated architecture docs.

Verification:

- `npm run format:check`: passed.
- `npm run build`: strict TypeScript and production bundle passed.
- `npm test`: 127 passed, including all original math checks and new route edge cases.
- `npm run test:browser`: 31 passed with four workers and no browser console/page errors.
- Coverage includes every document, every form, custom conditions, history, legacy URLs,
  validation, task completion, sequential writing/number flights, skipped steps, reduced motion,
  keyboard editor commands and cleanup, Windows folder/file/save/search operations,
  circuit part editing/wiring/undo/redo, KTP persistence, figures, printing, downloads, and file URLs.
- Independent runtime verification built 77 lesson task models and rendered all 656 step views.
- Desktop Windows/circuit screenshots and mobile notebook screenshots were visually inspected.
  Geometry/keyboard screenshots and detailed interactions were also reviewed during implementation.
- Rebuilding the production bundle produced identical SHA-256 hashes for both generated files.
- `git diff --check`: passed.

Boundary: lesson prose/static SVG and specialized math/drawing/model engines intentionally remain assets/JavaScript.
They no longer own application pages or interactive control markup. The migration does not convert numerical
algorithms to TypeScript or add previously disconnected teacher/admin routes.
Changes are local and uncommitted.

# Remaining JavaScript migration — delegated implementation plan

Status: planning only. Application source and generated assets are unchanged.

## Goal and completion contract

Move every source file in `js/` into strict TypeScript ES modules under `src/`.
Remove the shared lexical scope, source concatenation, and build-time source patches.
Preserve React ownership of all interactive controls and application pages.
Keep lesson prose and static SVG as trusted content; JSX conversion is not required.
Keep specialized handwritten and SVG renderers where their existing output is appropriate.

Completion means all of the following:

- [ ] Every `js/` file has a recorded destination or an evidence-backed removal decision.
- [ ] `js/` is removed; runtime source uses explicit imports and exports.
- [ ] Remove `scripts/engine-runtime.mjs`, `stepby:engines`, and `src/runtime/virtual.d.ts`.
- [ ] No source-string rewriting, ordered script loading, ambient engine declarations, or VM evaluation of engine sources remains.
- [ ] All migrated code passes the existing strict TypeScript configuration.
- [ ] No `@ts-nocheck`, migration-wide `any`, or unchecked casts conceal missing domain contracts.
- [ ] Tests exercise the imported implementations and retain their mathematical assertions.
- [ ] Routes, lesson text, task results, animation, controller state, and cleanup remain equivalent.
- [ ] The single local IIFE bundle still works through HTTP, GitHub Pages, offline, and `file://`.
- [ ] Documentation, CI, generated assets, and resource versions reflect the final source layout.

## Findings that determine the order

`scripts/engine-runtime.mjs` currently joins files into one module and patches `util.js` with regular expressions.
`src/runtime/index.ts` imports that generated module through `stepby:engines`.
Several math tests evaluate JavaScript files in a shared VM rather than importing modules.
Existing runtime interfaces cover consumers, but many internal models remain untyped.
Registry functions read the catalog and route-state mirror; tool definitions register during evaluation.
Circuit breadboard helpers call functions in `sim.js`, so naive imports would create a cycle.
Windows model, view-model helpers, and input commands also share mutable state and functions.
Document templates reference navigation services, projector metadata, and shared document registries.
`src/app/documentViews.tsx` discards old projector lifecycle hooks when mounting React projectors.
Remove those obsolete hooks only after confirming their public routes use the React path.

## Target ownership

| Current source | Target | Owner |
| --- | --- | --- |
| `js/core/` | `src/engines/core/` | Foundation agent |
| `js/tools/`, excluding vector/scalar tools | `src/features/tools/engines/` | Algebra agent |
| `js/geometry/`, vector/scalar tool engines | `src/features/geometry/engines/` | Geometry agent |
| `js/info/` document files and `js/robo/` document files | `src/features/documents/data/`, `content/`, `services/` | Content agent |
| `js/info/show/keyboard.js` | `src/features/keyboard/engine/` | Keyboard and Windows agent |
| `js/info/show/win/` | `src/features/windows/engine/` | Keyboard and Windows agent |
| `js/robo/circuit/` | `src/features/circuit/engine/` | Circuit agent |
| Runtime composition, build, shared tests, docs, bundle | Existing integration paths | Coordinator |

Keep feature-local types with their feature. Put shared formula, exact-number, rendering,
tool-definition, and animation contracts in the foundation. Prefer type-only imports where possible.
Retain the runtime facade initially to limit consumer changes; implement it with normal imports.
Do not build a second application store or move application UI back into engines.

## Stage 0 — baseline and contract design

Owner: coordinator. Complete before implementation agents start.

- [x] Inspect the manifest, compiler settings, runtime facade, tests, consumers, and project lessons.
- [x] Get independent dependency analysis for math/drawing and documents/simulations.
- [x] Present the execution order and delegated ownership for review.
- [ ] Record every source path, exported symbol, shared dependency, and destination in a migration ledger.
- [ ] Run baseline formatting, build, unit tests, and browser tests; record actual current counts and failures.
- [ ] Capture canonical task-model results, rendered step output, document IDs/content, and representative screenshots.
- [ ] Define typed registration, service injection, state ownership, and generic tool/model/animation interfaces.
- [ ] Define one test entry point per domain so bundled test imports share the intended registry instance.

Use explicit composition to assemble tool definitions and documents once, with duplicate-ID checks.
Keep pure helpers importable without constructing the app or reading the DOM.
Preserve the current in-memory state and error contracts during this migration.

## Stage 1 — shared foundation

Owner: foundation agent. Coordinator owns integration edits.

- [ ] Convert utilities, exact-number/formula helpers, handwriting, notebook, columns, number lines, and registry.
- [ ] Define precise formula AST, pen, geometry, step, animation, and DOM boundary types.
- [ ] Replace patched toast code with the existing typed notification service; remove the unused app lookup.
- [ ] Preserve synchronous DOM measurement and animation cancellation behavior.
- [ ] Establish explicit tool/document assembly APIs and typed navigation dependencies.
- [ ] Update test module loading to support imported domain entry points and isolated instances.
- [ ] Verify shared rendering and math output before handing stable interfaces to feature agents.

Transition rule: migrate one dependency group at a time and keep the application buildable.
If a short-lived bridge is needed, the coordinator owns it and records its removal in the ledger.
It must use explicit imports; it must not duplicate implementations or create new script concatenation.

## Stage 2 — parallel feature wave A

Run three workers with the coordinator as the fourth active agent.

**Agent A: algebra and arithmetic.** Own the non-geometry tool engines and their unit tests.

- [ ] Migrate shared `linear` helpers before domain, irrational, and rational-power dependents.
- [ ] Migrate arithmetic, divisibility, factorization, fractions, equations, and proportions in dependency order.
- [ ] Convert factorization helpers before NSD/NSK consumers.
- [ ] Export typed definitions; replace hidden registration and state reads with explicit contracts.
- [ ] Preserve BigInt exact arithmetic, validation strings, all step data, and animation hooks.
- [ ] Replace VM-loaded math tests with module imports without weakening assertions.

**Agent B: geometry.** Own geometry engines, vector/scalar tool engines, and their unit tests.

- [ ] Convert vector models, presets, practice checks, diagrams, and lesson data.
- [ ] Convert vector notebook tokens, step composition, scaling, and scalar-product tool models.
- [ ] Use foundation formula/pen types; keep controls in existing React components.
- [ ] Scope notebook scrolling to its mounted root instead of a global document query.
- [ ] Verify zero vectors, negative multipliers, collinearity, exact values, and appended formula steps.

**Agent C: document content.** Own info/robotics data, content assembly, and focused document tests.

- [ ] Convert calendar, KTP records, lesson plans, NIT export helpers, and robotics sections.
- [ ] Separate content data from registry mutation and runtime controller state.
- [ ] Preserve Ukrainian text, static markup, document IDs, anchors, downloads, and memory-only KTP edits.
- [ ] Replace controller references with typed preset metadata supplied at composition.
- [ ] Assemble cached document HTML and topic metadata explicitly after catalog/content data load.
- [ ] Separate NIT workbook byte generation from browser download effects; check all/semester export contents.
- [ ] Remove obsolete projector hooks and stale references to removed scripts after route verification.

Coordinator integrates completed slices, owns shared API changes, and checks composition for cycles.
Each worker updates only its domain tests; shared test infrastructure belongs to the coordinator.

## Stage 3 — parallel feature wave B

**Agent D: keyboard and Windows.** Own both engine directories and their controller type contracts.

- [ ] Convert keyboard presets, editing operations, subscriptions, events, and lifecycle cleanup.
- [ ] Split Windows data/icons, filesystem operations, view-model publication, and input commands.
- [ ] Give mutable state one owner; inject command dependencies where direct imports would create cycles.
- [ ] Use discriminated unions for filesystem nodes, windows, dialogs, commands, and interaction state.
- [ ] Preserve selection, clipboard, search, rename, save, drag behavior, and same-document state.
- [ ] Verify listener/timer cleanup and remount behavior with existing browser scenarios.

**Agent E: circuit.** Own circuit engines, circuit contracts, and focused solver/model tests.

- [ ] Type components, terminals, wires, properties, solver results, history, and simulation state.
- [ ] Extract shared terminal and wire operations before converting breadboard/simulator dependencies.
- [ ] Convert parts, solver, breadboard, drawing, and controller modules without import cycles.
- [ ] Preserve physics, wiring, undo/redo, schematic/breadboard views, sound, and animation timing.
- [ ] Verify electrical results and release rAF, audio, and event resources on unmount.

**Agent F: independent review.** Read-only review of completed wave A code and tests.

- [ ] Check exact math, content parity, registration order, import cycles, and unsafe type escapes.
- [ ] Report concrete regressions to the coordinator; domain owners apply fixes.

## Stage 4 — integration and verification

Owner: coordinator. Domain agents resolve findings in their assigned files.

- [ ] Assemble all engines/documents with ordinary TypeScript imports and explicit registration.
- [ ] Remove remaining compatibility bridges, the concatenation plugin, and the virtual declaration.
- [ ] Remove `js/` after every file is accounted for; update source-path tests and stale comments.
- [ ] Preserve the plain-script IIFE output and public `StepBySchool` browser API.
- [ ] Update README, CLAUDE.md, build/dev messages, and CI references.
- [ ] Run `npm run format:check`, `npm run build`, `npm test`, and `npm run test:browser`.
- [ ] Compare canonical task models, every rendered task step, document registry, and lesson content with baseline.
- [ ] Review notebook, geometry, keyboard, Windows, and circuit screenshots at desktop and mobile widths.
- [ ] Verify routes/history, custom input, exports/printing, reduced motion, sequential writing, and number flights.
- [ ] Verify HTTP and `file://` operation with no external runtime requests or console/page errors.
- [ ] Verify dev rebuilds for migrated modules and unchanged bundle hashes on a second production build.
- [ ] Run `git diff --check`; ensure generated assets match the source and resource versions are updated.
- [ ] Record final results, resolved findings, and any remaining limitations in this task section.

## Delegation rules and review gates

Each agent receives source paths, target paths, agreed contracts, required behavior, and focused checks.
Do not let multiple agents edit the runtime facade, shared types, build scripts, or generated assets.
Agents report changed files, verification results, unresolved dependencies, and behavior differences.
The coordinator merges and verifies one completed slice at a time.
After an API conflict or regression, stop the affected lane, revise the plan, and resume after agreement.
Do not combine this migration with UI redesign, new lesson content, or numerical algorithm changes.
Final completion requires both passing checks and an independent review of the integrated application.

Planning review: source inspection confirms that this needs module and internal type migration,
not extension renaming. Parallel work starts after the shared contracts and foundation are stable.
Implementation has not started; baseline execution and all implementation checks remain pending.
