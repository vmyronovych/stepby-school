/* =========================================================
   ДЕМО-ДАНІ ТА СТАН ІНТЕРФЕЙСУ
   Дані живуть у пам'яті: оновлення сторінки скидає прогрес.
   ========================================================= */
const DB = {
  classes: [
    {id:'5a', name:'5'},
    {id:'6a', name:'6'},
  ],
  subjects: [
    {id:'math', name:'Математика', icon:'📐', color:'var(--primary)', bg:'var(--primary-l)', active:true},
    {id:'ukr',  name:'Українська мова', icon:'📖', color:'var(--pink)', bg:'var(--pink-l)', active:false},
    {id:'phys', name:'Фізика', icon:'⚛️', color:'var(--amber)', bg:'var(--amber-l)', active:false},
    {id:'chem', name:'Хімія', icon:'🧪', color:'var(--green)', bg:'var(--green-l)', active:false},
  ],
  users: {
    student:{name:'Олег Петренко', cls:'5a'},
    teacher:{name:'Марія Іванівна', subject:'Математика'},
    admin:{name:'Адміністратор школи'},
  },
  // теми: кожна прив'язана до класу + предмета, містить матеріали і завдання-інструменти
  topics: [
    {id:'t1', cls:'5a', subject:'math', title:'Множення багатоцифрових чисел',
     desc:'Множення в стовпчик, властивості множення, задачі.',
     materials:[
       {type:'video', title:'Відео: як множити в стовпчик'},
       {type:'text',  title:'Конспект: алгоритм множення'},
       {type:'test',  title:'Тест: перевір себе (10 завдань)'},
     ],
     tasks:[
       {id:'k1', tool:'mult', title:'Обчисли 284 × 36', cfg:{a:284,b:36}, done:true},
       {id:'k2', tool:'mult', title:'Обчисли 507 × 48', cfg:{a:507,b:48}, done:false},
     ]},
    {id:'t2', cls:'5a', subject:'math', title:'Ділення багатоцифрових чисел',
     desc:'Ділення в стовпчик (куточком), ділення з остачею.',
     materials:[
       {type:'video', title:'Відео: ділення куточком'},
       {type:'text',  title:'Конспект: крок за кроком'},
     ],
     tasks:[
       {id:'k3', tool:'div', title:'Виконай ділення 7256 : 8', cfg:{n:7256,d:8}, done:false},
       {id:'k4', tool:'div', title:'Виконай ділення 9450 : 15', cfg:{n:9450,d:15}, done:false},
     ]},
    {id:'t3', cls:'5a', subject:'math', title:'Звичайні дроби',
     desc:'Додавання і віднімання дробів, зведення до спільного знаменника, скорочення.',
     materials:[
       {type:'text',  title:'Конспект: спільний знаменник'},
       {type:'test',  title:'Тест: дії з дробами'},
     ],
     tasks:[
       {id:'k5', tool:'frac', title:'Обчисли 1/4 + 1/6', cfg:{a:1,b:4,op:'+',c:1,d:6}, done:false},
       {id:'k6', tool:'frac', title:'Обчисли 5/6 − 1/4', cfg:{a:5,b:6,op:'-',c:1,d:4}, done:false},
     ]},
    {id:'t7', cls:'6a', subject:'math', title:'Дільники і кратні числа',
     desc:'Чим дільник відрізняється від кратного, зв’язок між ними.',
     materials:[
       {type:'video', title:'Відео: дільник чи кратне?'},
       {type:'text',  title:'Конспект: дільники ≤ числа, кратні ≥ числа'},
       {type:'test',  title:'Тест: відрізни дільник від кратного'},
     ],
     tasks:[
       {id:'k12', tool:'dvk', title:'Порівняй дільники і кратні числа 12', cfg:{n:12}, done:false},
       {id:'k13', tool:'dvk', title:'Порівняй дільники і кратні числа 7', cfg:{n:7}, done:false},
     ]},
    {id:'t8', cls:'6a', subject:'math', title:'Розкладання на прості множники',
     desc:'Перебір дільників 2, 3, 5, 7…, ознаки подільності, запис розкладу степенями.',
     materials:[
       {type:'video', title:'Відео: драбинка ділення на прості множники'},
       {type:'text',  title:'Конспект: ознаки подільності на 2, 3, 5'},
       {type:'test',  title:'Тест: розклади число на прості множники'},
     ],
     tasks:[
       {id:'k14', tool:'factor', title:'Розклади 360 на прості множники', cfg:{n:360}, done:false},
       {id:'k15', tool:'factor', title:'Розклади 84 на прості множники', cfg:{n:84}, done:false},
       {id:'k16', tool:'factor', title:'Розклади 91 на прості множники', cfg:{n:91}, done:false},
     ]},
    {id:'t5', cls:'6a', subject:'math', title:'Дії з дробами',
     desc:'Додавання, віднімання дробів з різними знаменниками.',
     materials:[{type:'text', title:'Конспект: НСК знаменників'}],
     tasks:[
       {id:'k9', tool:'frac', title:'Обчисли 7/10 + 2/15', cfg:{a:7,b:10,op:'+',c:2,d:15}, done:false},
     ]},
    {id:'t4', cls:'6a', subject:'math', title:'Розв’язування рівнянь',
     desc:'Лінійні рівняння, перенесення доданків, зведення подібних.',
     materials:[
       {type:'video', title:'Відео: що таке рівняння'},
       {type:'text',  title:'Конспект: правила перенесення'},
       {type:'test',  title:'Тест: розв’яжи рівняння'},
     ],
     tasks:[
       {id:'k7', tool:'eq', title:'Розв’яжи 3x + 5 = 20', cfg:{text:'3x + 5 = 20'}, done:false},
       {id:'k8', tool:'eq', title:'Розв’яжи 5x - 4 = 2x + 11', cfg:{text:'5x - 4 = 2x + 11'}, done:false},
     ]},
    {id:'t6', cls:'6a', subject:'math', title:'Пропорції',
     desc:'Основна властивість пропорції, зведення навхрест до лінійного рівняння.',
     materials:[
       {type:'video', title:'Відео: що таке пропорція'},
       {type:'text',  title:'Конспект: множення навхрест'},
     ],
     tasks:[
       {id:'k10', tool:'prop', title:'Знайди x: x : 3 = 4 : 6', cfg:{a:'x',b:'3',c:'4',d:'6'}, done:false},
       {id:'k11', tool:'prop', title:'Знайди x: 2x : 5 = 6 : 15', cfg:{a:'2x',b:'5',c:'6',d:'15'}, done:false},
     ]},
  ],
  // Довідник інструментів наповнює js/core/registry.js — кожен інструмент
  // реєструє себе сам. Порядок ключів (= порядок <script> у index.html)
  // визначає порядок відображення.
  tools:{}
};

/* =========================================================
   СТАН ІНТЕРФЕЙСУ
   model — модель поточного інструмента (те, що повернув build)
   anim  — «посилка» від prepare() до animate(): знімок позицій перед перемальовуванням
   ========================================================= */
const S = {
  role:'student', view:'home',
  cls:null, subject:null, topic:null,
  tool:null, toolCfg:null, toolTaskId:null,
  step:0, steps:[], model:null, anim:null,
};
