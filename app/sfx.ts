// Minimal WebAudio SFX for the storybook — soft, papery, never harsh.
// Created lazily after a user gesture.
export class Sfx {
  private ctx: AudioContext | null = null;
  enabled = true;
  constructor() { try { this.enabled = localStorage.getItem("fablebull_muted") !== "1"; } catch { /* */ } }
  private ac(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx) { try { this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)(); } catch { this.enabled = false; return null; } }
    return this.ctx;
  }
  private blip(freq: number, dur: number, type: OscillatorType, vol: number, slideTo?: number) {
    const ac = this.ac(); if (!ac) return;
    const t = ac.currentTime; const o = ac.createOscillator(); const g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t); if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(30, slideTo), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur);
  }
  private noise(dur: number, filt: number, vol: number, hp = false) {
    const ac = this.ac(); if (!ac) return;
    const t = ac.currentTime; const len = Math.floor(ac.sampleRate * dur);
    const buf = ac.createBuffer(1, len, ac.sampleRate); const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const s = ac.createBufferSource(); s.buffer = buf;
    const f = ac.createBiquadFilter(); f.type = hp ? "highpass" : "lowpass"; f.frequency.value = filt;
    const g = ac.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(ac.destination); s.start(t); s.stop(t + dur + 0.02);
  }
  setEnabled(b: boolean) { this.enabled = b; try { localStorage.setItem("fablebull_muted", b ? "0" : "1"); } catch { /* */ } }

  pageTurn() { this.noise(0.22, 2600, 0.05, true); this.noise(0.1, 900, 0.03); }   // paper sweep
  choice() { this.blip(392, 0.09, "sine", 0.05, 523); }                            // soft select
  hover() { this.blip(660, 0.04, "sine", 0.02); }
  ding() { this.blip(880, 0.18, "triangle", 0.05, 1320); }                         // stat gain chime
  begin() { [392, 523, 659].forEach((f, i) => setTimeout(() => this.blip(f, 0.24, "triangle", 0.05), i * 110)); }
  ending() { [523, 659, 784, 1047, 1319].forEach((f, i) => setTimeout(() => this.blip(f, 0.28, "triangle", 0.06), i * 130)); }
  doom() { this.blip(330, 0.5, "sine", 0.06, 110); this.noise(0.4, 500, 0.04); }   // dark ending
  click() { this.blip(523, 0.04, "sine", 0.035, 700); }
}
let _sfx: Sfx | null = null;
export function getSfx(): Sfx { if (!_sfx) _sfx = new Sfx(); return _sfx; }
