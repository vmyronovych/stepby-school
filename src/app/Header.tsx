import { hrefHome } from '../navigation/routes';

export function Header({ compact = false }: { compact?: boolean }) {
  return (
    <header className={`topbar${compact ? ' robotics-topbar' : ''}`}>
      <a className="logo" href={hrefHome()}>
        <span className="mark">🧮</span>
        <span className="brand">
          <span className="bn">
            StepBy <i>School</i>
          </span>
          <span className="bt">шкільні предмети крок за кроком</span>
        </span>
      </a>
    </header>
  );
}
