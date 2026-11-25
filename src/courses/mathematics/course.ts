import type { Course } from '../../types';
import type { Subject } from '../../types';
import { lesson as columnAddSubtract } from './lessons/column-add-subtract/lesson';
import { lesson as columnMultiply } from './lessons/column-multiply/lesson';
import { lesson as columnDivide } from './lessons/column-divide/lesson';
import { lesson as divisorsMultiples } from './lessons/divisors-multiples/lesson';
import { lesson as primeFactors } from './lessons/prime-factors/lesson';
import { lesson as greatestCommonDivisor } from './lessons/greatest-common-divisor/lesson';
import { lesson as leastCommonMultiple } from './lessons/least-common-multiple/lesson';
import { lesson as fractions } from './lessons/fractions/lesson';
import { lesson as linearEquations } from './lessons/linear-equations/lesson';
import { lesson as proportions } from './lessons/proportions/lesson';
export const mathematicsTopics = [
  columnAddSubtract,
  columnMultiply,
  columnDivide,
  divisorsMultiples,
  primeFactors,
  greatestCommonDivisor,
  leastCommonMultiple,
  fractions,
  linearEquations,
  proportions,
];

export const mathematicsSubject: Subject = {
  id: 'math',
  name: 'Математика',
  description: 'Обчислення, подільність, дроби, рівняння та пропорції.',
  icon: '🧮',
  bg: 'var(--primary-l)',
  cls: ['5a', '6a'],
};

export const mathematics: Course = {
  subject: mathematicsSubject,
  topics: mathematicsTopics,
};
