import type { Subject } from '../../types';
import { lesson as vectors } from './lessons/vectors/lesson';
import { lesson as vectorScaling } from './lessons/vector-scaling/lesson';
import { lesson as scalarProduct } from './lessons/scalar-product/lesson';
export const geometryTopics = [vectors, vectorScaling, scalarProduct];

export const geometrySubject: Subject = {
  id: 'geometry',
  name: 'Геометрія',
  description: 'Вектори: інтерактивні досліди, пояснення та задачі.',
  icon: '📐',
  color: 'var(--primary)',
  bg: 'var(--primary-l)',
  active: true,
  cls: ['9a'],
};
