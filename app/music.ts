// Procedural ambient music — a soft, "thinking" loop built live with WebAudio.
// No mp3 dependency: a warm pad drone + a slow, gentle pentatonic arpeggio that
// evokes a calm machine mind. Started by a user gesture (the wake splash).

export class MusicEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  playing = false;
  muted = false;
  private step = 0;

  // A pentatonic scale (C major pentatonic across two octaves) — always consonant.
  private readonly notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

  private ensure(): boolean {
    if (this.ctx) return true;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.0001;
      this.master.connect(this.ctx.destination);
      return true;
    } catch { return false; }
  }

  private pad() {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    [130.81, 196.0, 261.63].forEach((f, i) => {
      const o = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      o.type = "sine"; o.frequency.value = f;
      const lfo = this.ctx!.createOscillator(); const lg = this.ctx!.createGain();
      lfo.frequency.value = 0.07 + i * 0.03; lg.gain.value = 1.5;
      lfo.connect(lg); lg.connect(o.frequency);
      g.gain.value = 0.05;
      o.connect(g); g.connect(this.master!);
      o.start(t); lfo.start(t);
    });
  }

  private tick = () => {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    // pick a note from the scale with a gentle rolling pattern
    const idx = [0, 2, 4, 2, 5, 4, 2, 1][this.step % 8] + (this.step % 16 >= 8 ? 1 : 0);
    const f = this.notes[Math.min(idx, this.notes.length - 1)];
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "triangle"; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + 1.7);
    this.step++;
  };

  play() {
    if (!this.ensure() || !this.ctx || !this.master) return;
    if (this.ctx.state === "suspended") this.ctx.resume();
    if (this.playing) return;
    this.playing = true;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setValueAtTime(Math.max(0.0001, this.master.gain.value), this.ctx.currentTime);
    this.master.gain.exponentialRampToValueAtTime(this.muted ? 0.0001 : 0.9, this.ctx.currentTime + 2.5);
    this.pad();
    this.tick();
    this.timer = window.setInterval(this.tick, 620);
  }

  pause() {
    this.playing = false;
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    if (this.ctx && this.master) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
    }
  }

  toggle() { if (this.playing) this.pause(); else this.play(); }

  setMuted(m: boolean) {
    this.muted = m;
    if (this.ctx && this.master) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.exponentialRampToValueAtTime(m ? 0.0001 : 0.9, this.ctx.currentTime + 0.4);
    }
  }

  dispose() { this.pause(); try { this.ctx?.close(); } catch { /* */ } this.ctx = null; }
}

let _music: MusicEngine | null = null;
export function getMusic(): MusicEngine {
  if (!_music) {
    _music = new MusicEngine();
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") (window as unknown as { __music?: MusicEngine }).__music = _music;
  }
  return _music;
}
