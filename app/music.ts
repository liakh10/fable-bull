// Fable Bull music — plays public/music/theme.mp3 on loop (started by the gate gesture).
// If the file is absent, play() fails silently — drop a soft ambient mp3 here later.

const TRACK_SRC = "/music/theme.mp3";

export class MusicEngine {
  private audio: HTMLAudioElement | null = null;
  playing = false; muted = false; volume = 0.42;

  private ensure() {
    if (this.audio) return;
    try { const a = new Audio(TRACK_SRC); a.loop = true; a.preload = "auto"; a.volume = this.muted ? 0 : this.volume; this.audio = a; } catch { /* */ }
  }
  play() { this.ensure(); if (!this.audio) return; this.playing = true; const p = this.audio.play(); if (p && typeof p.catch === "function") p.catch(() => { /* */ }); }
  pause() { this.playing = false; this.audio?.pause(); }
  toggle() { if (this.playing) this.pause(); else this.play(); }
  setMuted(m: boolean) { this.muted = m; if (this.audio) this.audio.volume = m ? 0 : this.volume; }
  dispose() { this.pause(); if (this.audio) { this.audio.src = ""; this.audio = null; } }
}

let _music: MusicEngine | null = null;
export function getMusic(): MusicEngine { if (!_music) _music = new MusicEngine(); return _music; }
