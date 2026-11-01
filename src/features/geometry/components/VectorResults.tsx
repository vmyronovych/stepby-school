import type { VectorClassification } from '../types';
import { VectorSymbol } from './VectorSymbol';

export function VectorResults({ result }: { result: VectorClassification }) {
  const direction = result.zero
    ? 'Для нульового вектора напрям не визначають.'
    : result.same
      ? 'Співнапрямлені'
      : result.opposite
        ? 'Протилежно напрямлені'
        : 'Не співнапрямлені й не протилежно напрямлені';
  const zeroNote = result.zero
    ? result.n === 0 && result.m === 0
      ? 'Обидва вектори нульові. Вони рівні та колінеарні.'
      : 'Один вектор нульовий. Він колінеарний з іншим, але не дорівнює йому.'
    : '';
  return (
    <>
      <div className="vec-results" aria-live="polite" aria-atomic="true">
        <div>
          <span>Колінеарність</span>
          <strong>{result.collinear ? 'Колінеарні' : 'Неколінеарні'}</strong>
        </div>
        <div>
          <span>Напрям</span>
          <strong>{direction}</strong>
        </div>
        <div>
          <span>Модулі</span>
          <strong>{result.n === result.m ? 'Однакові' : 'Різні'}</strong>
        </div>
        <div className="vec-verdict">
          <span>Рівність</span>
          <strong>
            <VectorSymbol name="AB" /> {result.equal ? '=' : '≠'}{' '}
            <VectorSymbol name="CD" />
          </strong>
        </div>
      </div>
      <p className="vec-zero-note">{zeroNote}</p>
    </>
  );
}
