// Efek suara sederhana dari WebAudio (tanpa file audio)
let ctx = null
let muted = false
let musicGain = null
let musicTimer = null
let nextMusicNote = 0
let musicStep = 0

const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 523.25, 659.25, 783.99, 987.77, 880, 783.99, 659.25, 587.33]
const beatDuration = 0.32

export function setMuted(value) {
  muted = value
  if (musicGain && ctx) {
    const now = ctx.currentTime
    musicGain.gain.cancelScheduledValues(now)
    musicGain.gain.setTargetAtTime(muted ? 0 : 0.035, now, 0.08)
  }
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

function musicNote(frequency, start, duration, volume, type = 'sine') {
  const oscillator = ctx.createOscillator()
  const envelope = ctx.createGain()
  oscillator.type = type
  oscillator.frequency.value = frequency
  envelope.gain.setValueAtTime(0.0001, start)
  envelope.gain.exponentialRampToValueAtTime(volume, start + 0.025)
  envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  oscillator.connect(envelope)
  envelope.connect(musicGain)
  oscillator.start(start)
  oscillator.stop(start + duration + 0.02)
}

function scheduleMusic() {
  while (nextMusicNote < ctx.currentTime + 0.12) {
    const note = melody[musicStep % melody.length]
    musicNote(note, nextMusicNote, beatDuration * 0.82, 0.42, 'triangle')

    if (musicStep % 4 === 0) {
      musicNote(note / 2, nextMusicNote, beatDuration * 3.5, 0.32, 'sine')
    }

    nextMusicNote += beatDuration
    musicStep += 1
  }
}

export function startMusic() {
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return

  try {
    if (!ctx) ctx = new AC()
    if (!musicGain) {
      musicGain = ctx.createGain()
      musicGain.connect(ctx.destination)
    }
    musicGain.gain.cancelScheduledValues(ctx.currentTime)
    musicGain.gain.setTargetAtTime(muted ? 0 : 0.035, ctx.currentTime, 0.08)
    if (ctx.state === 'suspended') ctx.resume()
    if (musicTimer) return

    nextMusicNote = ctx.currentTime + 0.05
    musicTimer = window.setInterval(scheduleMusic, 100)
  } catch {
    stopMusic()
  }
}

export function stopMusic() {
  if (musicTimer) {
    window.clearInterval(musicTimer)
    musicTimer = null
  }
  if (musicGain && ctx) {
    const now = ctx.currentTime
    musicGain.gain.cancelScheduledValues(now)
    musicGain.gain.setTargetAtTime(0, now, 0.08)
  }
}