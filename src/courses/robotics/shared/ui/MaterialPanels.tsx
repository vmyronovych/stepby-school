import { useId, useRef, useState, type ReactNode } from 'react';

export interface ClassroomMaterial {
  id: string;
  title: string;
  prompt: string;
  render: (active: boolean) => ReactNode;
}

/** Keep each material mounted so switching views preserves experiments and disclosures. */
export function MaterialPanels({
  materials,
  active,
}: {
  materials: ClassroomMaterial[];
  active: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<HTMLDivElement>(null);
  const multiple = materials.length > 1;
  function select(index: number, focus = false) {
    setSelected(index);
    if (focus)
      tabs.current
        ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
        [index]?.focus();
  }
  return (
    <div className="robotics-classroom" aria-label="Разом у класі">
      <div className="robotics-stage-bar">
        {multiple && (
          <div
            ref={tabs}
            className="robotics-steps robotics-material-tabs"
            role="tablist"
            aria-label="Матеріали заняття"
          >
            {materials.map((material, index) => (
              <button
                key={material.id}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={selected === index}
                aria-controls={`${id}-panel-${index}`}
                tabIndex={selected === index ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => {
                  const next =
                    event.key === 'ArrowRight'
                      ? (index + 1) % materials.length
                      : event.key === 'ArrowLeft'
                        ? (index + materials.length - 1) % materials.length
                        : event.key === 'Home'
                          ? 0
                          : event.key === 'End'
                            ? materials.length - 1
                            : null;
                  if (next !== null) {
                    event.preventDefault();
                    select(next, true);
                  }
                }}
              >
                {material.title}
              </button>
            ))}
          </div>
        )}
        <p className="robotics-stage-prompt">{materials[selected].prompt}</p>
      </div>
      {materials.map((material, index) => (
        <section
          key={material.id}
          className="robotics-slide robotics-material-panel"
          data-material={material.id}
          role={multiple ? 'tabpanel' : undefined}
          id={`${id}-panel-${index}`}
          aria-labelledby={multiple ? `${id}-tab-${index}` : undefined}
          aria-label={multiple ? undefined : material.title}
          tabIndex={multiple ? 0 : undefined}
          hidden={selected !== index}
        >
          {material.render(active && selected === index)}
        </section>
      ))}
    </div>
  );
}
