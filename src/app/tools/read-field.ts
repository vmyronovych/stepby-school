export function readField(id: string): string {
  const field = document.getElementById(id);
  if (
    field instanceof HTMLInputElement ||
    field instanceof HTMLSelectElement ||
    field instanceof HTMLTextAreaElement
  )
    return field.value;
  throw new Error(`Поле «${id}» не знайдено`);
}
