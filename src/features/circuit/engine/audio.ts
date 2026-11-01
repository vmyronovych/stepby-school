interface Voice {
  osc: OscillatorNode;
  gain: GainNode;
}
const CB_AUDIO: { ctx: AudioContext | null; voices: Map<string, Voice> } = {
  ctx: null,
  voices: new Map(),
};
export function cbSound(list: { id: string; vol: number; tone: number }[]) {
  const want = new Map(list.filter((v) => v.vol > 0).map((v) => [v.id, v]));
  for (const [id, v] of CB_AUDIO.voices)
    if (!want.has(id)) {
      v.osc.stop();
      v.osc.disconnect();
      v.gain.disconnect();
      CB_AUDIO.voices.delete(id);
    }
  if (!want.size) return;
  const legacyWindow: Window & { webkitAudioContext?: typeof AudioContext } =
    window;
  const AC = window.AudioContext || legacyWindow.webkitAudioContext;
  if (!AC) return;
  const context = CB_AUDIO.ctx ?? (CB_AUDIO.ctx = new AC());
  for (const [id, w] of want) {
    let v = CB_AUDIO.voices.get(id);
    if (!v) {
      const osc = context.createOscillator(),
        gain = context.createGain();
      osc.type = 'square';
      osc.connect(gain);
      gain.connect(context.destination);
      osc.start();
      v = { osc, gain };
      CB_AUDIO.voices.set(id, v);
    }
    v.osc.frequency.value = w.tone;
    v.gain.gain.value = w.vol;
  }
}

export function disposeAudio(): void {
  cbSound([]);
  const context = CB_AUDIO.ctx;
  CB_AUDIO.ctx = null;
  if (context && context.state !== 'closed')
    void context.close().catch(() => {});
}
