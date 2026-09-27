/* =========================================================
   ІНФОРМАТИКА 3–4 (НУШ) — спільний простір імен
   ---------------------------------------------------------
   КТП на 2026/2027 і конспекти уроків для вчителя. Це матеріали,
   а не покрокові інструменти: сторінки збирає js/info/sections.js
   у спільний реєстр документів DOCS, показує їх js/ui/doc.js.

   Дані: ktp3/ktp4 (32 уроки, ключ n), plans3/plans4 (конспекти).
   Дати уроків руками НЕ задаються — їх рахує lessonDates() з
   календаря нижче. Змінився наказ школи — правиться лише calendar.
   ========================================================= */
const INFO = {
  // структура навчального року (наказ школи)
  calendar: {
    start: '2026-09-01', end: '2027-06-04',
    weekday: 1,                 // понеділок (1 = пн … 7 = нд)
    lessons: 32,
    semester2from: '2027-01-09',
    vacations: [
      {name:'осінні',    from:'2026-10-26', to:'2026-10-30'},
      {name:'зимові',    from:'2026-12-24', to:'2027-01-08'},
      {name:'весняні',   from:'2027-03-22', to:'2027-03-26'},
      {name:'великодні', from:'2027-04-30', to:'2027-05-03'},
    ],
    holidays: [
      {name:'8 Березня', date:'2027-03-08'},
    ],
  },
  g3: {label:'3 клас', cls:'3a'},   // cls — клас порталу (DB.classes)
  g4: {label:'4 клас', cls:'4a'},
  dates: [],   // дата кожного уроку (ISO), рахує lessonDates()
  spare: [],   // навчальні дні після останнього уроку — запас на перенесення
  s2: 0,       // номер першого уроку ІІ семестру
};

const INFO_MONTHS = ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];

/* Усі навчальні дні року, що припадають на день тижня уроку; канікули й
   свята відкидаються. Днів більше, ніж уроків, — залишок це запас.
   Дати — рядки ISO без часових поясів (опівдні UTC, щоб DST не зсував день). */
function lessonDates(cal){
  const off = cal.vacations.map(v=>[v.from, v.to]).concat(cal.holidays.map(h=>[h.date, h.date]));
  const days = [];
  for(let d = new Date(cal.start+'T12:00:00Z'); ; d.setUTCDate(d.getUTCDate()+1)){
    const iso = d.toISOString().slice(0, 10);
    if(iso > cal.end) break;
    const wd = d.getUTCDay() || 7;
    if(wd === cal.weekday && !off.some(([a,b])=>a <= iso && iso <= b)) days.push(iso);
  }
  if(days.length < cal.lessons)
    throw new Error('INFO.calendar: навчальних днів '+days.length+', а уроків '+cal.lessons+' — перевір канікули й свята');
  return days;
}

(function(){
  const days = lessonDates(INFO.calendar);
  INFO.dates = days.slice(0, INFO.calendar.lessons);
  INFO.spare = days.slice(INFO.calendar.lessons);
  INFO.s2 = INFO.dates.findIndex(d=>d >= INFO.calendar.semester2from) + 1;
})();

// 28 вересня 2026
function infoDate(iso){ const [y,m,d] = iso.split('-'); return (+d)+' '+INFO_MONTHS[+m-1]+' '+y; }
// 28.09
function infoDateShort(iso){ const [, m, d] = iso.split('-'); return d+'.'+m; }
// 1 тема, 2 теми, 5 тем
function infoPlural(n, one, few, many){
  const a = n%100, b = n%10;
  if(a>=11 && a<=14) return many;
  if(b===1) return one;
  if(b>=2 && b<=4) return few;
  return many;
}
