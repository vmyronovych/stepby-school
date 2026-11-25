import type { Subject } from '../../types';
import { lesson as functionDomain } from './lessons/function-domain/lesson';
import { lesson as irrationalEquations } from './lessons/irrational-equations/lesson';
import { lesson as rationalPower } from './lessons/rational-power/lesson';
import { lesson as radians } from './lessons/radians/lesson';
export const algebraTopics = [
  functionDomain,
  irrationalEquations,
  rationalPower,
  radians,
];

export const algebraSubject: Subject = {
  id: 'algebra',
  name: 'Алгебра',
  description: 'Функції, рівняння, степені та тригонометричні вирази.',
  icon: '𝑥',
  color: 'var(--primary)',
  bg: 'var(--primary-l)',
  active: true,
  cls: ['10a'],
};
