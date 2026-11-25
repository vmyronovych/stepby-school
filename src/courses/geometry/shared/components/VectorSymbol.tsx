export function VectorSymbol({ name }: { name: string }) {
  return (
    <span className="vec-symbol" aria-label={`вектор ${name}`}>
      {name}
    </span>
  );
}
