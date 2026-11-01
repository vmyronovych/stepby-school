import type { KeyboardController, KeyboardSnapshot } from '../types';
import { KeyboardKeyButton } from './KeyboardKeyButton';

export function KeyboardBoard({
  controller,
  snapshot,
}: {
  controller: KeyboardController;
  snapshot: KeyboardSnapshot;
}) {
  const group = snapshot.focus ? controller.groups[snapshot.focus] : undefined;
  const preset = snapshot.focus
    ? controller.presets[snapshot.focus]
    : undefined;
  const focused = !!(group || preset);
  return (
    <div className="kb-scroll">
      <div className={`kb${focused ? ' focus' : ''}`} id="kbBoard">
        {controller.keys.map((key) => (
          <KeyboardKeyButton
            key={key.c}
            keyDefinition={key}
            label={controller.keyName(key)}
            active={
              !!(group
                ? key.g === snapshot.focus
                : preset?.keys?.includes(key.c))
            }
            down={snapshot.down.includes(key.c)}
            selected={snapshot.selected === key.c}
            onSelect={(event) => controller.showKey(key.c, event)}
          />
        ))}
        <div className="kb-leds">
          <span className={`led${snapshot.num ? ' on' : ''}`} id="ledNum">
            <i />
            Num Lock
          </span>
          <span className={`led${snapshot.caps ? ' on' : ''}`} id="ledCaps">
            <i />
            Caps Lock
          </span>
        </div>
      </div>
    </div>
  );
}
