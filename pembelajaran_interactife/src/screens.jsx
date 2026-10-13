import { useState } from 'react'
import { BirdArt, Badge, Detective, Guide, Lock, PlaceArt, Star } from './art.jsx'
import { LEVELS, MAX_POINTS, titleFor } from './data.js'
import { clearBoard, loadBoard, sortBoard } from './leaderboard.js'

const TEAMS = ['Tim Elang', 'Tim Harimau', 'Tim Kancil', 'Tim Lumba-lumba', 'Tim Rajawali', 'Tim Singa']

const PIECES = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 8) * 0.18,
  dur: 2.6 + (i % 5) * 0.45,
  color: ['#ff7eb6', '#ffd23f', '#3ddc97', '#8b6cff', '#4cb8ff'][i % 5],
}))

export function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {PIECES.map((p, i) => (
        <i
          key={i}
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  )
}

export function Hud({ group, results, muted, onToggleSound }) {
  const total = Object.values(results).reduce((sum, r) => sum + r.points, 0)
  return (
    <header className="hud">
      <span className="hud__group">{group}</span>
      <span className="pips" aria-label="Level selesai">
        {LEVELS.map((_, i) => (
          <span key={i} className={'pip' + (results[i + 1] ? ' is-done' : '')} />
        ))}
      </span>
      <span className="hud__points">
        <b>{total}</b> poin
      </span>
      <button className="hud__sound" type="button" aria-pressed={!muted} onClick={onToggleSound}>
        Suara: {muted ? 'mati' : 'hidup'}
      </button>
    </header>
  )
}

// Daftar peringkat. Kelompok yang sedang main selalu ikut tampil walau di luar batas.
function Board({ list, highlightId, limit }) {
  if (list.length === 0) {
    return <p className="meta">Belum ada kelompok di papan peringkat. Jadilah yang pertama!</p>
  }
  const rows = list.map((e, i) => ({ ...e, rank: i + 1 })).filter((r) => r.rank <= limit || r.id === highlightId)
  return (
    <ol className="rank-list">
      {rows.map((r) => (
        <li
          key={r.id}
          className={'rank' + (r.id === highlightId ? ' is-me' : '') + (r.rank <= 3 ? ` rank--${r.rank}` : '')}
        >
          <span className="rank__no">{r.rank}</span>
          <span className="rank__name">{r.name}</span>
          <span className="rank__title">{titleFor(r.points)}</span>
          <span className="rank__pts">
            <b>{r.points}</b> poin
          </span>
        </li>
      ))}
    </ol>
  )
}

function Skyline() {
  return (
    <svg className="intro__skyline" viewBox="0 0 420 300" aria-hidden="true">
      <circle cx="324" cy="72" r="34" fill="#ffd66b" />
      <path d="M0 175 Q105 104 212 174 T420 158 V300 H0Z" fill="#a8dfb0" />
      <path d="M0 213 Q125 157 260 210 T420 194 V300 H0Z" fill="#75c98b" />
      <g stroke="#28516a" strokeWidth="3" strokeLinejoin="round">
        <path d="M14 201 V137 L46 109 L78 137 V201Z" fill="#fff0d2" />
        <path d="M7 139 L46 103 L86 139" fill="none" stroke="#e68459" strokeWidth="8" />
        <rect x="37" y="163" width="18" height="38" rx="8" fill="#58a6ba" />
        <rect x="26" y="145" width="13" height="13" fill="#bfe8eb" />
        <rect x="55" y="145" width="13" height="13" fill="#bfe8eb" />
        <path d="M100 201 V118 H157 V201Z" fill="#f8d28f" />
        <path d="M92 122 H165 L157 105 H100Z" fill="#e68459" />
        <rect x="111" y="136" width="13" height="16" fill="#bfe8eb" />
        <rect x="134" y="136" width="13" height="16" fill="#bfe8eb" />
        <path d="M266 201 V147 L304 118 L342 147 V201Z" fill="#fff0d2" />
        <path d="M257 149 L304 111 L351 149" fill="none" stroke="#d77957" strokeWidth="8" />
        <rect x="295" y="161" width="19" height="40" rx="9" fill="#58a6ba" />
        <rect x="275" y="151" width="13" height="13" fill="#bfe8eb" />
        <rect x="320" y="151" width="13" height="13" fill="#bfe8eb" />
        <path d="M353 202 V157 H396 V202Z" fill="#e5bf82" />
        <path d="M347 159 H402 L396 145 H353Z" fill="#6e9f81" />
      </g>
      <g stroke="#28516a" strokeWidth="3">
        <path d="M4 219 H416" stroke="#fff6da" strokeWidth="9" />
        <path d="M4 219 H416" stroke="#d7b879" strokeWidth="2" strokeDasharray="13 12" />
        <circle cx="202" cy="220" r="30" fill="#8bcf7d" />
        <circle cx="202" cy="220" r="20" fill="#9eddf3" />
        <path d="M202 201 V239 M183 220 H221" fill="none" stroke="#fff6da" strokeWidth="3" />
        <path d="M82 219 V185 M77 219 H89" fill="none" stroke="#76543b" strokeWidth="5" />
        <circle cx="82" cy="180" r="19" fill="#39956b" />
        <path d="M385 219 V178 M380 219 H392" fill="none" stroke="#76543b" strokeWidth="5" />
        <circle cx="385" cy="173" r="23" fill="#39956b" />
      </g>
    </svg>
  )
}

export function Intro({ onStart, onCustom, appearance = {} }) {
  const [name, setName] = useState('')
  const [board, setBoard] = useState(() => sortBoard(loadBoard()))
  const [showBoard, setShowBoard] = useState(false)
  const [confirm, setConfirm] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    onStart(name.trim() || 'Tim Detektif')
  }

  const clear = () => {
    if (!confirm) {
      setConfirm(true)
      return
    }
    clearBoard()
    setBoard([])
    setConfirm(false)
  }

  return (
    <section className="screen intro">
      <div className="intro__art" aria-hidden="true">
        <Skyline />
        <BirdArt className="intro__bird" />
        {appearance.introImage && <img className="intro__custom-art" src={appearance.introImage} alt="" />}
        {appearance.detectiveImage
          ? <img className="intro__detective-photo" src={appearance.detectiveImage} alt="" />
          : <Detective className="intro__detective" />}
        <span className="intro__stamp">KOTA HOBI<br />BUREAU</span>
      </div>

      <form className="card intro__card" onSubmit={submit}>
        <p className="eyebrow">Detektif Hobi · Episode 01</p>
        <h1 className="title">
          <span className="title__w title__w--1">Misi</span>{' '}
          <span className="title__w title__w--2">Detektif</span>{' '}
          <span className="title__w title__w--3">Hobi</span>
        </h1>
        <p className="lead">Temukan petunjuknya. Pecahkan misterinya. Jadilah Detektif Ahli Bahasa!</p>
        <Guide>Kartu hobi para warga Kota Hobi tertukar! Bantu aku mengembalikannya ke pemilik yang tepat.</Guide>

        <label className="field" htmlFor="nama-kelompok">
          Nama kelompok detektif
        </label>
        <input
          id="nama-kelompok"
          className="note"
          type="text"
          maxLength={24}
          autoComplete="off"
          placeholder="Ketik namamu atau pilih di bawah"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="team-chips">
          {TEAMS.map((t) => (
            <button key={t} type="button" className={'team' + (name === t ? ' is-on' : '')} onClick={() => setName(t)}>
              {t}
            </button>
          ))}
        </div>

        <button className="btn btn--big btn--pulse" type="submit">
          Mulai Misi
        </button>
        <p className="meta">4 level · 100 poin maksimal</p>

        <button className="btn btn--ghost" type="button" onClick={onCustom}>
          ⚙️ Kustomisasi 4 Level
        </button>
        <button className="btn btn--ghost btn--small" type="button" onClick={() => setShowBoard(!showBoard)}>
          {showBoard ? 'Tutup papan peringkat' : 'Lihat papan peringkat'}
        </button>
        {showBoard && (
          <div className="intro__board">
            <Board list={board} limit={10} />
            {board.length > 0 && (
              <button type="button" className="link-btn" onClick={clear}>
                {confirm ? 'Ketuk lagi untuk menghapus semua' : 'Hapus papan peringkat'}
              </button>
            )}
          </div>
        )}
      </form>
    </section>
  )
}

// Posisi tiap lokasi di peta (persen dari lebar dan tinggi peta)
const NODES = [
  { x: 15, y: 68 },
  { x: 38, y: 40 },
  { x: 62, y: 70 },
  { x: 85, y: 35 },
]
const KINDS = ['taman', 'rumah', 'markas', 'balai']

function stand(i) {
  return { x: NODES[i].x - 9, y: NODES[i].y + 14 }
}

export function CityMap({ results, levelsDone, walkerPos, onOpen, onFinale, levels = LEVELS, appearance = {} }) {
  const target = Math.min(levelsDone, 3)
  const from = stand(walkerPos)
  const to = stand(target)
  const allDone = levelsDone >= LEVELS.length

  let tip = 'Ketuk Taman Kota untuk memulai penyelidikan!'
  if (allDone) tip = 'Semua kasus terpecah! Ambil lencana detektifmu.'
  else if (levelsDone > 0) tip = 'Bagus! Lokasi berikutnya sudah terbuka. Ayo lanjut!'

  return (
    <section className="screen">
      <div className={`map${appearance.mapImage ? ' map--custom' : ''}`}>
        {appearance.mapImage && <img className="map__photo" src={appearance.mapImage} alt="" />}
        <svg className="map__bg" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
          <g className="cloud" fill="#fff" opacity="0.9">
            <ellipse cx="180" cy="70" rx="60" ry="22" />
            <ellipse cx="220" cy="56" rx="40" ry="20" />
          </g>
          <g className="cloud cloud--b" fill="#fff" opacity="0.9">
            <ellipse cx="700" cy="50" rx="70" ry="24" />
            <ellipse cx="750" cy="36" rx="44" ry="20" />
          </g>
          <path d="M0 210 L0 150 L74 150 L74 203 M84 205 L84 122 L172 122 L172 201 M179 211 L179 170 L244 170 L244 211 M770 184 L770 135 L842 135 L842 186 M850 182 L850 98 L944 98 L944 180 M954 182 L954 149 L1000 149" fill="#fff0d2" stroke="#537d83" strokeWidth="5" strokeLinejoin="round" />
          <path d="M70 151 L70 119 L126 86 L181 119 L181 152 M842 137 L842 103 L897 69 L952 103 L952 139" fill="#e98660" stroke="#537d83" strokeWidth="5" strokeLinejoin="round" />
          <g fill="#bfe8eb" stroke="#537d83" strokeWidth="3">
            <rect x="22" y="167" width="17" height="22" rx="3" />
            <rect x="49" y="167" width="17" height="22" rx="3" />
            <rect x="104" y="143" width="18" height="22" rx="3" />
            <rect x="139" y="143" width="18" height="22" rx="3" />
            <rect x="802" y="151" width="18" height="22" rx="3" />
            <rect x="871" y="113" width="18" height="22" rx="3" />
            <rect x="908" y="113" width="18" height="22" rx="3" />
          </g>
          <g fill="#318a65" stroke="#28516a" strokeWidth="4">
            <circle cx="65" cy="280" r="36" />
            <circle cx="120" cy="318" r="28" />
            <circle cx="918" cy="289" r="39" />
            <circle cx="962" cy="332" r="27" />
          </g>
          <g fill="#ffd66b">
            <circle cx="253" cy="142" r="9" />
            <circle cx="726" cy="263" r="8" />
            <circle cx="532" cy="105" r="7" />
          </g>
          <path d="M0 440 Q200 360 400 420 T800 400 T1000 420 V560 H0 Z" fill="#9be3b1" />
          <path d="M0 500 Q250 450 500 490 T1000 480 V560 H0 Z" fill="#86d99f" />
          <path
            d="M150 380 C 250 290, 300 290, 380 224 S 540 330, 620 392 S 780 230, 850 196"
            fill="none"
            stroke="#2b2d5e"
            strokeWidth="38"
            strokeLinecap="round"
          />
          <path
            d="M150 380 C 250 290, 300 290, 380 224 S 540 330, 620 392 S 780 230, 850 196"
            fill="none"
            stroke="#ffe8a3"
            strokeWidth="30"
            strokeLinecap="round"
          />
          <path
            d="M150 380 C 250 290, 300 290, 380 224 S 540 330, 620 392 S 780 230, 850 196"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeDasharray="14 16"
            strokeLinecap="round"
          />
          <path d="M0 460 Q180 414 320 460 T630 450 T1000 456" fill="none" stroke="#5ab58a" strokeWidth="5" strokeDasharray="4 12" opacity=".8" />
        </svg>
        <div className="map__heading"><span>🧭</span><div><b>PETA PENYELIDIKAN</b><small>Kota Hobi · 4 lokasi misteri</small></div></div>

        {NODES.map((n, i) => {
          const unlocked = i === 0 || Boolean(results[i])
          const done = results[i + 1]
          const next = unlocked && !done
          return (
            <button
              key={i}
              type="button"
              className={'node' + (unlocked ? '' : ' is-locked') + (next ? ' is-next' : '')}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              disabled={!unlocked}
              onClick={() => onOpen(i + 1)}
              aria-label={`Level ${i + 1}: ${levels[i].place}${unlocked ? '' : ' (terkunci)'}`}
            >
              <PlaceArt kind={KINDS[i]} className="node__art" />
              <span className="node__label">
                <b>{i + 1}</b> {levels[i].place}
              </span>
              {!unlocked && <Lock className="node__lock" />}
              {done && (
                <span className="node__stars" aria-label={`${done.stars} bintang`}>
                  {[1, 2, 3].map((s) => (
                    <Star key={s} on={s <= done.stars} className="node__star" />
                  ))}
                </span>
              )}
            </button>
          )
        })}

        <div className="walker" style={{ '--fx': from.x, '--fy': from.y, '--tx': to.x, '--ty': to.y }}>
        {appearance.detectiveImage ? <img src={appearance.detectiveImage} alt="" /> : <Detective />}
        </div>
      </div>

      <div className="map__foot">
        <Guide>{tip}</Guide>
        {allDone && (
          <button className="btn btn--big btn--pulse" type="button" onClick={onFinale}>
            Ambil lencana
          </button>
        )}
      </div>
    </section>
  )
}

export function LevelResult({ levelId, result, isLast, onNext, onRetry, levels = LEVELS }) {
  let msg = 'Kamu berhasil! Terus berlatih ya, detektif.'
  if (result.stars === 3) msg = 'Luar biasa, detektif! Hampir tanpa salah.'
  else if (result.stars === 2) msg = 'Bagus sekali! Kerja sama kelompokmu keren.'

  return (
    <section className="screen">
      <div className="card result">
        {result.stars >= 2 && <Confetti />}
        <p className="eyebrow">Level {levelId} selesai</p>
        <h2>{levels[levelId - 1].title}</h2>
        <div className="stars" aria-label={`${result.stars} dari 3 bintang`}>
          {[1, 2, 3].map((n) => (
            <Star key={n} on={n <= result.stars} className="stars__star" style={{ animationDelay: `${n * 0.28}s` }} />
          ))}
        </div>
        <p className="points">
          <b>{result.points}</b> / {MAX_POINTS} poin
        </p>
        <Guide>{msg}</Guide>
        <div className="row row--center">
          <button className="btn btn--ghost" type="button" onClick={onRetry}>
            Ulangi level
          </button>
          <button className="btn btn--big" type="button" onClick={onNext}>
            {isLast ? 'Ambil lencana' : 'Kembali ke peta'}
          </button>
        </div>
      </div>
    </section>
  )
}

export function Finale({ group, results, runId, onRestart }) {
  const list = Object.values(results)
  const total = list.reduce((sum, r) => sum + r.points, 0)
  const stars = list.reduce((sum, r) => sum + r.stars, 0)
  const [board] = useState(() => sortBoard(loadBoard()))
  const rank = board.findIndex((e) => e.id === runId) + 1
  const [tanggal] = useState(() =>
    new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
  )

  return (
    <section className="screen">
      <div className="card cert">
        <Confetti />
        <Badge className="cert__badge" />
        <p className="eyebrow">Sertifikat Detektif Hobi</p>
        <p className="cert__small">Diberikan kepada kelompok</p>
        <h1 className="cert__name">{group}</h1>
        <p className="cert__small">dengan gelar</p>
        <h2 className="cert__title">{titleFor(total)}</h2>
        <p className="points">
          <b>{total}</b> / 100 poin · {stars} dari 12 bintang
        </p>
        {rank > 0 && (
          <p className="rank-big">
            Peringkat <b>{rank}</b> dari {board.length} kelompok
          </p>
        )}
        <p className="meta">{tanggal}</p>

        <h3 className="cert__sub">Papan peringkat</h3>
        <Board list={board} highlightId={runId} limit={5} />

        <div className="row row--center no-print">
          <button className="btn btn--ghost" type="button" onClick={() => window.print()}>
            Cetak sertifikat
          </button>
          <button className="btn btn--big" type="button" onClick={onRestart}>
            Kelompok berikutnya
          </button>
        </div>
      </div>
    </section>
  )
}