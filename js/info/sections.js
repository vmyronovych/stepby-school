/* =========================================================
   ІНФОРМАТИКА — розділи-документи з даних INFO
   ---------------------------------------------------------
   На кожен клас (g3, g4) у DOCS з'являються:
     inf3-ktp        КТП на рік: таблиці по семестрах, файл для НІТ, структура року
     inf3-s1/-s2     конспекти уроків за семестр (урок = <h2 id="inf3-4">,
                     етап = id="inf3-4-2" — на них веде адреса …/inf3-4-2)
     inf3-keyboard,  схеми на проєктор (app:true) — окрема сторінка; на неї
     inf3-windows    ведуть посилання з етапів, де стоїть поле show
   Картки в списку тем — записи DB.topics (js/data.js) з цими doc.
   html — геттер: адреси будуються вже після завантаження роутера.
   ========================================================= */

// схеми на проєктор: як відкрити, закрити, перемкнути пресет
const INFO_SCREENS = {
  keyboard: {
    title:'Клавіатура на проєктор', icon:'⌨️',
    preset: p => KB_PRESETS[p] || KB_GROUPS[p] || null,
    open:  (p, mount) => kbOpen(p, mount),
    sub:   p => kbApply(p || null),
    close: () => kbClose(),
  },
  windows: {
    title:'Windows на проєктор', icon:'🪟',
    preset: p => WN_PRESETS[p] || null,
    open:  (p, mount) => wnOpen(p, mount),
    sub:   p => {
      if(!WN_PRESETS[p] || wn.ver === p) return;
      wn.ver = p; wn.menu = null; wn.start = null;
      wnLayoutDesk(); wnChips(); wnRender(); wnFit();
    },
    close: () => wnHide(),
  },
};

(function(){
  const PREFIX = /^Інструктаж з БЖД\.\s*/;          // є в кожній темі КТП; у списках ховаємо
  const short = topic => topic.replace(PREFIX, '');
  const once = f => { let v = null; return () => v === null ? (v = f()) : v; };

  for(const g of ['g3', 'g4']){
    const G = INFO[g], n = g.slice(1), id = s => 'inf'+n+'-'+s;
    const semOf = k => k < INFO.s2 ? 's1' : 's2';
    const lessonHref = (k, step) => hrefDoc(id(semOf(k)), id(k)+(step ? '-'+step : ''));

    // де в конспектах цього класу відкривають схему
    const uses = sc => {
      const out = [];
      for(const [k, p] of Object.entries(G.plans)) p.steps.forEach((s, i)=>{
        const [name, pr] = (s.show||'').split(':');
        if(name === sc) out.push({n:+k, step:i+1, h:s.h, pr:pr||null});
      });
      return out.sort((a,b)=>a.n-b.n || a.step-b.step);
    };
    // посилання на схему: сторінка цього класу, інакше — іншого, де вона є
    const screenHref = (sc, pr) => {
      const t = docTopicFor(id(sc)) || DB.topics.find(x=>x.doc && x.doc.endsWith('-'+sc));
      return t ? hrefTopic(t, pr) : hrefHome();
    };

    /* ---- КТП ---- */
    const ktpRows = (a, b) => `<div class="inf-ktpwrap"><table class="inf-ktp">
      <thead><tr><th>№</th><th>Дата</th><th>Тема</th><th>Змістова лінія</th><th></th></tr></thead><tbody>` +
      G.ktp.slice(a-1, b).map(r=>{
        const has = !!G.plans[r.n];
        return `<tr><td class="n">${r.n}</td><td class="dt">${infoDateShort(INFO.dates[r.n-1])}</td>
          <td class="tp"><a href="${lessonHref(r.n)}">${esc(short(r.topic))}</a></td>
          <td class="ln">${esc(r.line)}</td>
          <td><span class="inf-st ${has?'has':'no'}">${has?'конспект':'каркас'}</span></td></tr>`;
      }).join('') + '</tbody></table></div>';

    const cal = INFO.calendar, s2 = INFO.s2, last = INFO.dates.length;
    const range = (a, b) => a === b ? infoDate(a) : infoDate(a)+' — '+infoDate(b);
    const nitBtn = (seg, label) => `<button class="tool" data-nit="${seg}">${label}</button>`;
    const cnt = k => k+' '+infoPlural(k, 'тема', 'теми', 'тем');

    DOCS[id('ktp')] = {
      title: 'КТП на 2026/2027 · '+G.label,
      get html(){ return this._h(); },
      _h: once(()=>`
        <div class="inf-${g}">
        <p class="inf-lead">${g === 'g4'
          ? 'КТП 4 класу — за документом школи (типова освітня програма під керівництвом Р. Б. Шияна, автори Г. В. Ломаковська, Г. О. Проценко). Теми подано дослівно.'
          : 'КТП 3 класу складено на основі тієї ж програми й узгоджено з логікою 4 класу.'}
          Дати — понеділки, пораховані за структурою навчального року школи. Кожна тема починається
          з «Інструктаж з БЖД.»: у списках префікс сховано, у файлі для НІТ він є.</p>
        <h2 id="${id('ktp-s1')}">І семестр · уроки 1–${s2-1}</h2>${ktpRows(1, s2-1)}
        <p class="inf-note">Семестр закінчується уроком ${s2-1} (${infoDate(INFO.dates[s2-2])}).</p>
        <h2 id="${id('ktp-s2')}">ІІ семестр · уроки ${s2}–${last}</h2>${ktpRows(s2, last)}
        ${INFO.spare.length ? `<p class="inf-note">Запасні понеділки на перенесення: ${INFO.spare.map(infoDate).join(', ')}.</p>` : ''}
        <h2 id="${id('ktp-nit')}">Файл для НІТ</h2>
        <p>Один стовпець «Зміст робіт», у порядку уроків. У НІТ: план навчання → імпорт із файлу; дати НІТ проставляє сам за розкладом.</p>
        <p class="noprint">${nitBtn('all', 'Усі '+cnt(last))}${nitBtn('s1', 'І семестр · '+cnt(s2-1))}${nitBtn('s2', 'ІІ семестр · '+cnt(last-s2+1))}</p>
        <h2 id="${id('ktp-year')}">Структура року</h2>
        <div class="inf-year">
          <div><b>Навчальний рік</b>${range(cal.start, cal.end)}</div>
          ${cal.vacations.map(v=>`<div><b>${esc(v.name[0].toUpperCase()+v.name.slice(1))} канікули</b>${range(v.from, v.to)}</div>`).join('')}
          ${cal.holidays.map(h=>`<div><b>Святковий день</b>${infoDate(h.date)} · ${esc(h.name)}</div>`).join('')}
          <div><b>ІІ семестр</b>з уроку ${s2}, ${infoDate(INFO.dates[s2-1])}</div>
        </div>
        </div>`),
      init(body){
        body.addEventListener('click', e=>{
          const b = e.target.closest('[data-nit]');
          if(b) downloadNit(g, b.dataset.nit);
        });
      },
    };

    /* ---- конспект уроку ---- */
    const mins = t => { const m = /(\d+)\D+(\d+)/.exec(String(t)); return m ? m[2]-m[1] : 0; };
    const kind = s => /очей/i.test(s.h) ? 'eyes' : (/ПК/.test(s.d) || /15 хв/.test(s.tag||'') ? 'pc' : '');

    const stepHtml = (k, s, i) => {
      const tag = s.tag ? `<span class="inf-tag${s.tag.includes('журнал')?' doc':''}">${esc(s.tag)}</span>` : '';
      const say = s.say ? `<div class="inf-say"><b>${esc(s.say.l)}</b>${s.say.t}</div>` : '';
      let link = '';
      if(s.show){
        const [name, pr] = s.show.split(':'), sc = INFO_SCREENS[name];
        const ps = sc && pr ? sc.preset(pr) : null;
        if(sc) link = `<a class="inf-toollink" href="${screenHref(name, pr)}" title="Відкрити схему; правою кнопкою — у новій вкладці">${sc.icon} ${esc(sc.title)}${ps?' · '+esc(ps.label):''} <span class="arr">↗</span></a>`;
      }
      // b і say.t — навчальний текст із дозволеним інлайновим HTML
      return `<div class="inf-step" id="${id(k)}-${i+1}">
        <div class="inf-clock"><b>${esc(s.t)}</b><span>${esc(s.d)}</span></div>
        <div class="inf-sbody"><h3>${esc(s.h)}${tag}</h3>
          <ul>${(s.b||[]).map(x=>'<li>'+x+'</li>').join('')}</ul>${say}${link}</div></div>`;
    };

    const lessonHtml = k => {
      const r = G.ktp[k-1], p = G.plans[k];
      let h = `<div class="inf-lesson"><h2 id="${id(k)}"><span class="num">Урок ${k}.</span> ${esc(short(r.topic))}</h2>
        <div class="inf-facts"><span class="date">пн, ${infoDate(INFO.dates[k-1])}</span><span>45 хв</span><span>екран ≤ 15 хв</span>
          <span>${esc(r.line)}</span>${PREFIX.test(r.topic) ? '<span>інструктаж з БЖД</span>' : ''}</div>`;
      if(!p) return h + `<div class="inf-stub"><div class="inf-lbl">Каркас уроку</div>
          <p><b>Очікувані результати:</b> ${esc(r.res)}</p>
          <p class="inf-note">Детального конспекту ще немає — лише тема й очікувані результати з КТП.</p></div></div>`;
      const res = r.res.split(';').map(x=>x.trim()).filter(Boolean);
      h += `<p class="inf-goal">${esc(p.goal)}</p>
        <div class="inf-meta">
          <div><div class="inf-lbl">Очікувані результати</div><ul>${res.map(x=>'<li>'+esc(x)+'</li>').join('')}</ul></div>
          <div><div class="inf-lbl">Обладнання</div><ul>${(p.equip||[]).map(x=>'<li>'+esc(x)+'</li>').join('')}</ul></div>
        </div>`;
      // лінійка 45 хвилин: ширина етапу = його хвилини; за ПК — акцентом, гімнастика — зеленим
      h += `<div class="inf-bar" role="list" aria-label="Етапи уроку на 45 хвилин">${p.steps.map((s, i)=>{
          const w = mins(s.t) || 1;
          return `<a role="listitem" href="${lessonHref(k, i+1)}" class="${kind(s)}" style="flex:${w}" title="${esc(s.t+' · '+s.h)}">${w >= 4 ? esc(s.t) : ''}</a>`;
        }).join('')}</div>
        <div class="inf-barlegend"><span><i class="pc"></i>робота за ПК</span><span><i class="eyes"></i>гімнастика для очей</span><span><i></i>без екрана</span></div>
        <div class="inf-steps">${p.steps.map((s, i)=>stepHtml(k, s, i)).join('')}</div>`;
      if(p.hw) h += `<p class="inf-hw"><b>Домашнє завдання.</b> ${esc(p.hw)}</p>`;
      return h + '</div>';
    };

    const semester = (sec, a, b) => {
      DOCS[id(sec)] = {
        title: (sec === 's1' ? 'Конспекти · І семестр' : 'Конспекти · ІІ семестр')+' · '+G.label,
        get html(){ return this._h(); },
        _h: once(()=>{
          let h = `<div class="inf-${g}"><p class="inf-lead">Уроки ${a}–${b}. Урок — 45 хв, безперервна робота за екраном не довше 15 хв,
            перед практичною роботою — 2 хв гімнастики для очей. Домашніх завдань не задаємо, оцінювання вербальне.</p>`;
          for(let k = a; k <= b; k++) h += lessonHtml(k);
          return h + '</div>';
        }),
      };
    };
    semester('s1', 1, s2-1);
    semester('s2', s2, last);

    /* ---- схеми на проєктор ---- */
    for(const [name, sc] of Object.entries(INFO_SCREENS)){
      const used = uses(name);
      DOCS[id(name)] = {
        app: true,
        title: sc.title,
        get html(){ return this._h(); },
        _h: once(()=>`<div class="inf-${g}">
          <div class="inf-mount"></div>
          ${used.length ? `<div class="inf-used"><div class="inf-lbl">Де використовується в конспектах · ${G.label}</div>
            ${used.map(u=>{ const ps = u.pr ? sc.preset(u.pr) : null;
              return `<a href="${lessonHref(u.n, u.step)}"><b>Урок ${u.n}</b><span>${esc(u.h)}${ps?` <small>· ${esc(ps.label)}</small>`:''}</span></a>`; }).join('')}
          </div>` : ''}</div>`),
        init(body, sub){ sc.open(sub, body.querySelector('.inf-mount')); },
        onSub(sub){ sc.sub(sub); },
        leave(){ sc.close(); },
      };
      // картка схеми показує, на яких уроках її відкривають
      const t = DB.topics.find(x=>x.doc === id(name));
      if(t) t.chips = [...new Set(used.map(u=>u.n))].map(k=>'урок '+k);
    }
  }
})();
