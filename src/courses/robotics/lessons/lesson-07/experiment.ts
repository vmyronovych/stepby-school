import {
  cbNewBoard,
  cbAddPart,
  cbAddWire,
} from '../../tools/circuit/engine/board';
import type { CircuitPreset } from '../../tools/circuit/types';
import type {
  CircuitPart,
  Point,
  Wire,
} from '../../tools/circuit/engine/types';

function transistorMotor(): CircuitPreset {
  const board = cbNewBoard(false);
  const control = cbAddPart(board, 'battery', 130, 260);
  const power = cbAddPart(board, 'battery', 1000, 300);
  const transistor = cbAddPart(board, 'npn', 650, 360);
  const motor = cbAddPart(board, 'motor', 650, 150, 1);
  const baseResistor = cbAddPart(board, 'resistor', 480, 300, 1);
  control.props.volt = 3.3;
  const controlSwitch = cbAddPart(board, 'switch', 350, 220);
  const powerSwitch = cbAddPart(board, 'switch', 900, 90);
  controlSwitch.props.label = 'Керування';
  powerSwitch.props.label = 'Живлення мотора';
  powerSwitch.s.on = true;
  baseResistor.props.ohm = 1000;
  function wire(
    a: CircuitPart,
    at: number,
    b: CircuitPart,
    bt: number,
    role: Wire['role'],
    route: Point[],
  ) {
    const w = cbAddWire(board, { p: a.id, t: at }, { p: b.id, t: bt });
    if (w) {
      w.role = role;
      w.route = route;
    }
  }
  wire(control, 0, controlSwitch, 0, 'signal', [
    [230, 220],
    [290, 220],
  ]);
  wire(controlSwitch, 1, baseResistor, 0, 'signal', [
    [410, 220],
    [480, 220],
    [480, 240],
  ]);
  wire(baseResistor, 1, transistor, 2, 'signal', [
    [480, 360],
    [560, 360],
  ]);
  wire(control, 1, transistor, 1, 'ground', [
    [230, 300],
    [250, 300],
    [250, 560],
    [650, 560],
    [650, 430],
  ]);
  wire(power, 0, powerSwitch, 1, 'power', [
    [1100, 260],
    [1140, 260],
    [1140, 90],
    [960, 90],
  ]);
  wire(powerSwitch, 0, motor, 0, 'power', [
    [840, 90],
    [650, 90],
  ]);
  wire(motor, 1, transistor, 0, 'power', [
    [650, 210],
    [650, 290],
  ]);
  wire(power, 1, transistor, 1, 'ground', [
    [1100, 340],
    [1140, 340],
    [1140, 520],
    [700, 520],
    [700, 430],
    [650, 430],
  ]);
  return {
    id: 'transistor-motor',
    title: 'Транзистор керує мотором',
    description:
      'Натисніть вимикач «Керування», а потім розімкніть «Живлення мотора». Що змінилося? Резистор перед базою B обмежує струм керування. C — колектор, E — емітер.',
    board,
    viewBox: [0, 0, 1200, 620],
  };
}
export const transistorMotorPreset = transistorMotor();
