/** Commands publish through an injected callback, avoiding a model/view/input cycle. */
let publish: () => void = () => {};
export function setWindowsPublisher(listener: () => void) {
  publish = listener;
}
export function wnRender() {
  publish();
}
