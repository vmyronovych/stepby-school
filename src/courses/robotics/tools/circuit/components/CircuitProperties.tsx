import type { CircuitProperties as Properties, CircuitSession } from '../types';

export function CircuitProperties({
  properties,
  session,
}: {
  properties: Properties | null;
  session: CircuitSession | null;
}) {
  return (
    <div
      className="cb-pop"
      id="cbPop"
      hidden={!properties}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {properties && (
        <>
          <div className="cb-pop-h">
            <b>{properties.title}</b>
            <button
              className="x"
              data-act="close"
              aria-label="Закрити"
              onClick={() => session?.action('close')}
            >
              ✕
            </button>
          </div>
          {properties.params.map((parameter) => (
            <div key={parameter.key} className="cb-pop-row">
              <span>{parameter.label}</span>
              <div className="cb-seg">
                {parameter.options.map((option, index) => (
                  <button
                    key={index}
                    className={`rb${index === parameter.selectedIndex ? ' on' : ''}`}
                    data-key={parameter.key}
                    data-i={index}
                    onClick={() => session?.setParameter(parameter.key, index)}
                  >
                    {option[1]}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="cb-pop-acts">
            {properties.actions.map((action) => (
              <button
                key={action.id}
                className={
                  ['fix', 'charge'].includes(action.id) ? 'warn' : 'sec'
                }
                data-act={action.id}
                onClick={() => session?.action(action.id)}
              >
                {action.t}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
