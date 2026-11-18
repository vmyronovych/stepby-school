/** Original, schematic illustrations. Sizes and distances are not to scale. */
const stars =
  '<path d="M34 43h10m-5-5v10M264 31h8m-4-4v8M244 133h10m-5-5v10M56 143h8m-4-4v8" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>';
const moon =
  '<circle cx="150" cy="90" r="48" fill="#dbeafe"/><circle cx="132" cy="75" r="9" fill="#94a3b8"/><circle cx="167" cy="106" r="12" fill="#94a3b8"/><circle cx="166" cy="64" r="5" fill="#94a3b8"/>';

const diagrams = [
  {
    label: 'Світлові промені йдуть від Сонця до Місяця',
    shapes:
      '<circle cx="63" cy="90" r="27" fill="#fbbf24"/><circle cx="239" cy="90" r="31" fill="#334155"/><path d="M239 59a31 31 0 0 0 0 62Z" fill="#dbeafe"/><path d="M109 78h82m-11-9 11 9-11 9m-71 17h80m-11-9 11 9-11 9" fill="none" stroke="#fbbf24" stroke-width="3"/>',
  },
  {
    label: 'Три вигляди диска: серп, половина та повня',
    shapes:
      '<g fill="#334155"><circle cx="65" cy="90" r="33"/><circle cx="150" cy="90" r="33"/></g><path d="M65 57a33 33 0 0 1 0 66c21-16 21-50 0-66m85 0a33 33 0 0 1 0 66Z" fill="#dbeafe"/><circle cx="235" cy="90" r="33" fill="#dbeafe"/>',
  },
  {
    label: 'Позначені боки Місяця в різних точках орбіти спрямовані до Землі',
    shapes:
      '<ellipse cx="150" cy="90" rx="82" ry="53" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="5 6"/><circle cx="150" cy="90" r="22" fill="#38bdf8"/><g fill="#dbeafe"><circle cx="68" cy="90" r="15"/><circle cx="232" cy="90" r="15"/><circle cx="150" cy="37" r="14"/><circle cx="150" cy="143" r="14"/></g><g fill="#d97706"><circle cx="78" cy="90" r="5"/><circle cx="222" cy="90" r="5"/><circle cx="150" cy="46" r="5"/><circle cx="150" cy="134" r="5"/></g>',
  },
  {
    label: 'Лінія відстані між Землею та Місяцем',
    shapes:
      '<circle cx="54" cy="90" r="29" fill="#38bdf8"/><path d="M39 76q9-11 20-4l5 10-8 9-10-5Z" fill="#34d399"/><circle cx="251" cy="90" r="14" fill="#dbeafe"/><path d="M98 90h128m-117-8-12 8 12 8m105-16 12 8-12 8" stroke="#fbbf24" stroke-width="3" fill="none"/>',
  },
  {
    label: 'Стрілка тяжіння біля Місяця коротша за стрілку біля Землі',
    shapes:
      '<circle cx="88" cy="132" r="28" fill="#38bdf8"/><circle cx="218" cy="132" r="20" fill="#dbeafe"/><path d="M88 31v59m-10-10 10 10 10-10M218 61v29m-10-10 10 10 10-10" stroke="#fbbf24" stroke-width="4" fill="none"/>',
  },
  {
    label: 'Кам’янисте тіло летить до поверхні з кратерами',
    shapes:
      moon +
      '<path d="m224 37-43 36m15-1-15 1 3-14" fill="none" stroke="#fbbf24" stroke-width="3"/><path d="m220 28 15 1 4 11-11 8-11-7Z" fill="#fca5a5"/>',
  },
  {
    label: 'Темні рівнини на світлому диску Місяця',
    shapes:
      '<circle cx="150" cy="90" r="58" fill="#dbeafe"/><path d="M108 69q19-25 32-15t5 27q-4 14-19 10t-18-22m46 35q21-30 34-15t-2 30q-18 18-27 8t-5-23" fill="#475569"/><circle cx="169" cy="59" r="6" fill="#94a3b8"/>',
  },
  {
    label: 'Розріджені частинки навколо Місяця',
    shapes:
      moon +
      '<g fill="#67e8f9"><circle cx="71" cy="85" r="3"/><circle cx="89" cy="50" r="3"/><circle cx="203" cy="42" r="3"/><circle cx="226" cy="101" r="3"/><circle cx="210" cy="136" r="3"/><circle cx="116" cy="151" r="3"/></g>',
  },
  {
    label: 'Кристали льоду в затіненій западині',
    shapes:
      '<path d="M25 66h42l52 51h60l51-51h45v87H25Z" fill="#7c89a1"/><path d="m67 66 52 51h60l51-51-19 65H92Z" fill="#1e293b"/><g fill="#67e8f9"><path d="m131 104 8-13 8 13-2 12h-12Zm27 2 7-15 10 14-5 11h-11Z"/></g><path d="m40 42 35 19m-11-15 11 15-18 1" fill="none" stroke="#fbbf24" stroke-width="3"/>',
  },
  {
    label: 'Сонце, Земля і Місяць у земній тіні',
    shapes:
      '<circle cx="46" cy="90" r="24" fill="#fbbf24"/><path d="m124 67 157 16v14l-157 16Z" fill="#334155"/><circle cx="128" cy="90" r="25" fill="#38bdf8"/><circle cx="238" cy="90" r="12" fill="#fb923c"/><path d="M79 69h20M79 112h20" stroke="#fbbf24" stroke-width="2"/>',
  },
];

export const moonArt = diagrams.map(({ label, shapes }, index) => ({
  filename: `moon-${String(index + 1).padStart(2, '0')}.svg`,
  label,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180" viewBox="0 0 300 180"><rect width="300" height="180" rx="16" fill="#111c35"/>${stars}${shapes}</svg>`,
}));
