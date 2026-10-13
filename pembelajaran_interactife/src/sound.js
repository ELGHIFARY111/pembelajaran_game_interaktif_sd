// Efek suara sederhana dari WebAudio (tanpa file audio)
let ctx = null
let muted = false

export function setMuted(value) {
  muted = value
}

function tone(freq, start, dur, type = 'sine', vol = 0.15) {
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return
  if (!ctx) ctx = new AC()
  if (ctx.state === 'suspended') ctx.resume()
  const t0 = ctx.currentTime + start
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, t0)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.02)
}

export function play(name) {
  if (muted) return
  try {
    if (name === 'benar') {
      tone(660, 0, 0.12)
      tone(880, 0.1, 0.18)
    } else if (name === 'salah') {
      tone(180, 0, 0.25, 'square', 0.08)
    } else if (name === 'klik') {
      tone(520, 0, 0.06, 'triangle', 0.1)
    } else if (name === 'menang') {
      ;[523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.2))
    }
  } catch {
    // suara tidak wajib, abaikan kalau gagal
  }
}