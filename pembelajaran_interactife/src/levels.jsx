import { useState } from 'react'
import { Guide, HobiIcon, Warga } from './art.jsx'
import {
    LEVEL1,
    LEVEL2,
    LEVEL3_PAIRS,
    LEVEL3_SENTENCES,
    LEVEL4,
    LEVELS,
    rolesFor,
    scoreFrom,
} from './data.js'

// Bingkai yang sama untuk semua level
function Shell({ id, step, total, levelInfo, onBack, backDisabled = false, children }) {
    const lv = levelInfo ?? LEVELS[id - 1]
    return (
        <section className="screen level">
            <header className="level__head">
                <div>
                    <p className="eyebrow">
                        Level {id} · {lv.place}
                    </p>
                    <h2>{lv.title}</h2>
                </div>
                <p className="level__skill">{lv.skill}</p>
                <button className="btn btn--ghost btn--small" type="button" disabled={backDisabled} onClick={onBack}>
                    Kembali ke peta
                </button>
            </header>
            <ul className="roles" aria-label="Peran kelompok">
                {rolesFor(id).map((r) => (
                    <li key={r.role}>
                        <b>{r.no}</b> {r.role}
                    </li>
                ))}
            </ul>
            <div className="dots" aria-label={`Soal ${Math.min(step, total)} dari ${total}`}>
                {Array.from({ length: total }, (_, i) => (
                    <span key={i} className={'dot' + (i < step - 1 ? ' is-done' : i === step - 1 ? ' is-now' : '')} />
                ))}
            </div>
            <div className="card level__body">{children}</div>
        </section>
    )
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

function randomItems(items, count) {
    const shuffled = [...items]
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1))
        ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
    }
    return shuffled.slice(0, count)
}

/* ---------- Level 1: Jejak Hobi yang Hilang ---------- */
function Level1({ onFinish, onBack, play, settings, levelInfo }) {
    const [i, setI] = useState(0)
    const [attempt, setAttempt] = useState(0)
    const [firstTry, setFirstTry] = useState(0)
    const [pick, setPick] = useState(null)
    const questionPool = settings?.level1 ?? LEVEL1
    const [rounds] = useState(() => randomItems(
        questionPool,
        settings?.questionCounts?.level1 ?? questionPool.length,
    ))
    const round = rounds[i]
    const solved = pick?.ok === true

    const choose = (opt) => {
        if (solved) return
        if (opt === round.answer) {
            play('benar')
            setPick({ id: opt, ok: true, n: 0 })
            const ft = firstTry + (attempt === 0 ? 1 : 0)
            setFirstTry(ft)
            setTimeout(() => {
                if (i + 1 < rounds.length) {
                    setI(i + 1)
                    setAttempt(0)
                    setPick(null)
                } else {
                    onFinish(ft / rounds.length)
                }
            }, 1400)
        } else {
            play('salah')
            setAttempt(attempt + 1)
            setPick({ id: opt, ok: false, n: attempt + 1 })
        }
    }

    return (
        <Shell id={1} step={i + 1} total={rounds.length} levelInfo={levelInfo} onBack={onBack} backDisabled={solved}>
            <p className="question">{round.q}</p>
            <div className={'options' + (solved ? ' is-solved' : '')}>
                {round.options.map((opt, optionIndex) => {
                    const state = pick && pick.id === optionIndex ? (pick.ok ? ' is-ok' : ' is-wrong') : ''
                    return (
                        <button
                            key={`option-${optionIndex}`}
                            type="button"
                            className={'opt' + state}
                            disabled={solved}
                            onClick={() => choose(optionIndex)}
                        >
                            {round.optionImages?.[optionIndex] && (
                                <img className="custom-option-image" src={round.optionImages[optionIndex]} alt="" />
                            ) || <HobiIcon id={round.icons?.[optionIndex] ?? round.options[optionIndex]} />}
                            <span className="opt__name">{opt}</span>
                        </button>
                    )
                })}
            </div>
            {solved ? (
                <p className="banner banner--ok">
                    Benar! Jawabannya: <b>{round.options[round.answer]}</b>
                </p>
            ) : attempt > 0 ? (
                <Guide>Petunjuk: {round.hint}</Guide>
            ) : (
                <Guide>Pilih jawaban yang tepat. Diskusikan dulu dengan kelompokmu!</Guide>
            )}
        </Shell>
    )
}

/* ---------- Level 2: Rahasia di Balik Profil Warga ---------- */
function Level2({ onFinish, onBack, play, settings, levelInfo }) {
    const [w, setW] = useState(0)
    const [step, setStep] = useState('hobi')
    const [attempt, setAttempt] = useState(0)
    const [firstTry, setFirstTry] = useState(0)
    const [pick, setPick] = useState(null)
    const profilePool = settings?.level2 ?? LEVEL2
    const [profiles] = useState(() => randomItems(
        profilePool,
        settings?.questionCounts?.level2 ?? profilePool.length,
    ))
    const warga = profiles[w]
    const total = profiles.length * 2
    const solved = pick?.ok === true

    const answer = (value, ok) => {
        if (solved) return
        if (!ok) {
            play('salah')
            setAttempt(attempt + 1)
            setPick({ value, ok: false, n: attempt + 1 })
            return
        }
        play('benar')
        setPick({ value, ok: true, n: 0 })
        const ft = firstTry + (attempt === 0 ? 1 : 0)
        setFirstTry(ft)
        setTimeout(() => {
            if (step === 'hobi') {
                setStep('bukti')
                setAttempt(0)
                setPick(null)
            } else if (w + 1 < profiles.length) {
                setW(w + 1)
                setStep('hobi')
                setAttempt(0)
                setPick(null)
            } else {
                onFinish(ft / total)
            }
        }, 1400)
    }

    const question = step === 'hobi'
        ? (levelInfo?.prompt ?? 'Apa hobi {name}?').replace('{name}', warga.name)
        : (levelInfo?.secondaryPrompt ?? 'Kalimat mana yang menjadi bukti hobi {name}?').replace('{name}', warga.name)

    return (
        <Shell id={2} step={w * 2 + (step === 'hobi' ? 1 : 2)} total={total} levelInfo={levelInfo} onBack={onBack} backDisabled={solved}>
            <p className="question">{question}</p>
            <div className="profile">
                <Warga {...warga.look} className="profile__avatar" />
                <div className="profile__text">
                    <h3>Profil warga: {warga.name}</h3>
                    {step === 'hobi' ? (
                        <p className="story">{warga.sentences.join(' ')}</p>
                    ) : (
                        <ul className="sentences">
                            {warga.sentences.map((s, idx) => {
                                const state = pick && pick.value === idx ? (pick.ok ? ' is-ok' : ' is-wrong') : ''
                                return (
                                    <li key={idx}>
                                        <button
                                            key={`${idx}-${state === ' is-wrong' ? pick.n : 0}`}
                                            type="button"
                                            className={'sentence' + state}
                                            disabled={solved}
                                            onClick={() => answer(idx, (warga.evidence ?? warga.bukti).includes(idx))}
                                        >
                                            {s}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>

            {step === 'hobi' && (
                <div className={'options' + (solved ? ' is-solved' : '')}>
                    {warga.options.map((opt, optionIndex) => {
                            const state = pick && pick.value === optionIndex ? (pick.ok ? ' is-ok' : ' is-wrong') : ''
                            return (
                                <button
                                    key={`option-${optionIndex}`}
                                    type="button"
                                    className={'opt' + state}
                                    disabled={solved}
                                    onClick={() => answer(optionIndex, optionIndex === warga.answer)}
                                >
                                    {warga.optionImages?.[optionIndex] && (
                                        <img className="custom-option-image" src={warga.optionImages[optionIndex]} alt="" />
                                    ) || <HobiIcon id={warga.icons?.[optionIndex] ?? warga.options[optionIndex]} />}
                                    <span className="opt__name">{opt}</span>
                            </button>
                        )
                    })}
                </div>
            )}

            {solved ? (
                <p className="banner banner--ok">
                    {step === 'hobi'
                        ? `Benar! Hobi ${warga.name} adalah ${warga.options[warga.answer].toLowerCase()}.`
                        : 'Tepat! Kalimat itu menunjukkan kegiatan hobinya.'}
                </p>
            ) : attempt > 0 ? (
                <Guide>Baca lagi profilnya pelan-pelan. Cari kegiatan yang dilakukan.</Guide>
            ) : (
                <Guide>Baca profilnya bersama-sama. Pembaca petunjuk, giliranmu!</Guide>
            )}
        </Shell>
    )
}

/* ---------- Level 3: Papan Bukti Detektif ---------- */
function Level3({ onFinish, onBack, play, settings, levelInfo }) {
    const sentencePool = (settings?.level3Sentences ?? LEVEL3_SENTENCES).map((item) => ({
        ...item,
        words: Array.isArray(item.words) ? item.words : item.words.trim().split(/\s+/).filter(Boolean),
    }))
    const pairPool = settings?.level3Pairs ?? LEVEL3_PAIRS
    const [sentences] = useState(() => randomItems(
        sentencePool,
        settings?.questionCounts?.level3Sentences ?? sentencePool.length,
    ))
    const [pairs] = useState(() => randomItems(
        pairPool,
        settings?.questionCounts?.level3Pairs ?? pairPool.length,
    ))
    const nS = sentences.length
    const nP = pairs.length
    const total = nS + nP

    const [phase, setPhase] = useState('kalimat')
    const [firstTry, setFirstTry] = useState(0)

    // bagian A
    const [si, setSi] = useState(0)
    const [board, setBoard] = useState([])
    const [attempt, setAttempt] = useState(0)
    const [okSentence, setOkSentence] = useState(false)
    const [shake, setShake] = useState(0)

    // bagian B
    const [termSel, setTermSel] = useState(null)
    const [matched, setMatched] = useState([])
    const [wrong, setWrong] = useState({})
    const [bad, setBad] = useState(null)

    const item = sentences[si]
    const pool = item.words.map((_, idx) => idx).filter((idx) => !board.includes(idx))
    const boardText = board.map((idx) => item.words[idx]).join(' ')

    const addWord = (idx) => {
        if (okSentence) return
        play('klik')
        setBoard([...board, idx])
    }
    const removeWord = (idx) => {
        if (okSentence) return
        setBoard(board.filter((b) => b !== idx))
    }
    const check = () => {
        if (item.answers.some((a) => a.toLowerCase() === boardText.toLowerCase())) {
            play('benar')
            setOkSentence(true)
            setFirstTry(firstTry + (attempt === 0 ? 1 : 0))
            setTimeout(() => {
                if (si + 1 < nS) {
                    setSi(si + 1)
                    setBoard([])
                    setAttempt(0)
                    setShake(0)
                    setOkSentence(false)
                } else {
                    setPhase('pasangan')
                }
            }, 1700)
        } else {
            play('salah')
            setAttempt(attempt + 1)
            setShake(shake + 1)
        }
    }

    const pickTerm = (t) => {
        if (matched.includes(t)) return
        play('klik')
        setBad(null)
        setTermSel(t)
    }
    const pickMeaning = (pi) => {
        if (termSel === null || matched.includes(pi)) return
        if (pi === termSel) {
            play('benar')
            const nextMatched = [...matched, pi]
            const ft = firstTry + ((wrong[pi] ?? 0) === 0 ? 1 : 0)
            setMatched(nextMatched)
            setTermSel(null)
            setBad(null)
            setFirstTry(ft)
            if (nextMatched.length === nP) setTimeout(() => onFinish(ft / total), 1300)
        } else {
            play('salah')
            setWrong({ ...wrong, [termSel]: (wrong[termSel] ?? 0) + 1 })
            setBad({ m: pi, n: (bad?.n ?? 0) + 1 })
        }
    }

    if (phase === 'kalimat') {
        return (
            <Shell id={3} step={si + 1} total={total} levelInfo={levelInfo} onBack={onBack} backDisabled={okSentence}>
                <p className="question">{levelInfo?.prompt ?? 'Susun kata-kata ini menjadi kalimat yang benar.'}</p>
                <div key={`board-${shake}`} className={'board' + (okSentence ? ' is-ok' : '') + (shake > 0 ? ' is-shake' : '')}>
                    {board.length === 0 && <span className="board__hint">Ketuk kata di bawah untuk memasangnya di papan</span>}
                    {board.map((idx) => (
                        <button key={idx} type="button" className="tile" disabled={okSentence} onClick={() => removeWord(idx)}>
                            {item.words[idx]}
                        </button>
                    ))}
                </div>
                <div className="tiles">
                    {pool.map((idx) => (
                        <button key={idx} type="button" className="tile" onClick={() => addWord(idx)}>
                            {item.words[idx]}
                        </button>
                    ))}
                </div>
                <div className="row">
                    <button
                        className="btn btn--big"
                        type="button"
                        disabled={pool.length > 0 || okSentence}
                        onClick={check}
                    >
                        Periksa kalimat
                    </button>
                    <button className="btn btn--ghost" type="button" disabled={okSentence} onClick={() => setBoard([])}>
                        Susun ulang
                    </button>
                </div>
                {okSentence ? (
                    <p className="banner banner--ok">{capitalize(boardText)}.</p>
                ) : attempt > 0 ? (
                    <Guide>Belum tepat. Kalimat yang baik dimulai dari siapa yang melakukan kegiatan.</Guide>
                ) : (
                    <Guide>Penyusun jawaban, pasang kata-katanya. Teman-teman boleh membantu!</Guide>
                )}
            </Shell>
        )
    }

    return (
        <Shell id={3} step={nS + matched.length + 1} total={total} levelInfo={levelInfo} onBack={onBack} backDisabled={matched.length === nP}>
            <p className="question">{levelInfo?.secondaryPrompt ?? 'Pasangkan kata dengan maknanya. Ketuk kata, lalu ketuk maknanya.'}</p>
            <div className="pairs">
                <div className="pairs__col">
                    {pairs.map((p, idx) => {
                        const state = matched.includes(idx) ? ' is-ok' : termSel === idx ? ' is-sel' : ''
                        return (
                            <button key={idx} type="button" className={'pair' + state} onClick={() => pickTerm(idx)}>
                                {p.term}
                            </button>
                        )
                    })}
                </div>
                <div className="pairs__col">
                    {Array.from({ length: nP }, (_, i) => nP - i - 1).map((pi) => {
                        const state = matched.includes(pi) ? ' is-ok' : bad && bad.m === pi ? ' is-wrong' : ''
                        return (
                            <button
                                key={pi + (state === ' is-wrong' ? `-${bad.n}` : '')}
                                type="button"
                                className={'pair' + state}
                                onClick={() => pickMeaning(pi)}
                            >
                                {pairs[pi].meaning}
                            </button>
                        )
                    })}
                </div>
            </div>
            <Guide>
                {termSel === null ? 'Pilih satu kata di kolom kiri dulu.' : 'Sekarang pilih makna yang cocok di kolom kanan.'}
            </Guide>
        </Shell>
    )
}

/* ---------- Level 4: Kasus Terakhir, Siapakah Aku? ---------- */
function Level4({ onFinish, onBack, play, settings, levelInfo }) {
    const [ci, setCi] = useState(0)
    const [shown, setShown] = useState(1)
    const [pick, setPick] = useState(null)
    const [attempt, setAttempt] = useState(0)
    const [score, setScore] = useState(0)
    const [reason, setReason] = useState('')

    const casePool = settings?.level4 ?? LEVEL4
    const [cases] = useState(() => randomItems(
        casePool,
        settings?.questionCounts?.level4 ?? casePool.length,
    ))
    const c = cases[ci]
    const allShown = shown >= c.clues.length
    const solved = pick?.ok === true
    const words = reason.trim().split(/\s+/).filter(Boolean).length

    const choose = (opt) => {
        if (solved) return
        if (opt === c.answer) {
            play('benar')
            setPick({ id: opt, ok: true, n: 0 })
        } else {
            play('salah')
            setAttempt(attempt + 1)
            setPick({ id: opt, ok: false, n: attempt + 1 })
        }
    }

    const addChip = (text) => {
        play('klik')
        setReason((r) =>
            r.trim() ? `${r.trim()}, ${text}` : `Jawabanku ${c.options[c.answer].toLowerCase()} karena ${text}`,
        )
    }

    const submit = () => {
        if (words < 3) return
        const s = score + (attempt === 0 ? 1 : 0.5)
        if (ci + 1 < cases.length) {
            play('benar')
            setScore(s)
            setCi(ci + 1)
            setShown(1)
            setPick(null)
            setAttempt(0)
            setReason('')
        } else {
            onFinish(s / cases.length)
        }
    }

    return (
        <Shell id={4} step={ci + 1} total={cases.length} levelInfo={levelInfo} onBack={onBack}>
            <p className="question">{levelInfo?.prompt ?? 'Siapakah aku? Baca petunjuknya, lalu tebak hobi yang dimaksud.'}</p>
            <ol className="clues">
                {c.clues.slice(0, shown).map((text, i) => (
                    <li key={i} className="clue">
                        <span className="clue__no">{i + 1}</span>
                        {text}
                    </li>
                ))}
            </ol>

            {!allShown && (
                <div className="row">
                    <button
                        className="btn btn--ghost"
                        type="button"
                        onClick={() => {
                            play('klik')
                            setShown(shown + 1)
                        }}
                    >
                        Buka petunjuk {shown + 1}
                    </button>
                </div>
            )}

            {allShown && (
                <div className={'options' + (solved ? ' is-solved' : '')}>
                    {c.options.map((opt, optionIndex) => {
                        const state = pick && pick.id === optionIndex ? (pick.ok ? ' is-ok' : ' is-wrong') : ''
                        return (
                            <button
                                key={`option-${optionIndex}`}
                                type="button"
                                className={'opt' + state}
                                disabled={solved}
                                onClick={() => choose(optionIndex)}
                            >
                                {c.optionImages?.[optionIndex] && (
                                    <img className="custom-option-image" src={c.optionImages[optionIndex]} alt="" />
                                ) || <HobiIcon id={c.icons?.[optionIndex] ?? c.options[optionIndex]} />}
                                <span className="opt__name">{opt}</span>
                            </button>
                        )
                    })}
                </div>
            )}

            {solved && (
                <div className="reason">
                    <p className="banner banner--ok">
                        Tebakan benar! Sekarang tuliskan alasanmu berdasarkan petunjuk.
                    </p>
                    <label className="field" htmlFor="alasan">
                        Alasan kelompok (penulis: pencatat)
                    </label>
                    <div className="chips">
                        {c.chips.map((t) => (
                            <button key={t} type="button" className="chip" onClick={() => addChip(t)}>
                                {t}
                            </button>
                        ))}
                    </div>
                    <textarea
                        id="alasan"
                        className="note"
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Contoh: Jawabanku ... karena ..."
                    />
                    <p className="meta">Tulis minimal 3 kata. Guru dapat memeriksa tulisan ini di layar.</p>
                    <button className="btn btn--big" type="button" disabled={words < 3} onClick={submit}>
                        {ci + 1 < cases.length ? 'Kasus berikutnya' : 'Tutup kasus'}
                    </button>
                </div>
            )}

            {!solved &&
                (attempt > 0 ? (
                    <Guide>{c.hint}</Guide>
                ) : (
                    <Guide>
                        {allShown ? 'Semua petunjuk sudah terbuka. Ayo tebak!' : 'Buka petunjuk satu per satu dan baca bersama.'}
                    </Guide>
                ))}
        </Shell>
    )
}

export function LevelScreen({ id, onFinish, onBack, play, settings }) {
    const finish = (ratio) => onFinish(id, scoreFrom(ratio))
    const levelInfo = settings?.levels[id - 1]
    if (id === 1) return <Level1 onFinish={finish} onBack={onBack} play={play} settings={settings} levelInfo={levelInfo} />
    if (id === 2) return <Level2 onFinish={finish} onBack={onBack} play={play} settings={settings} levelInfo={levelInfo} />
    if (id === 3) return <Level3 onFinish={finish} onBack={onBack} play={play} settings={settings} levelInfo={levelInfo} />
    return <Level4 onFinish={finish} onBack={onBack} play={play} settings={settings} levelInfo={levelInfo} />
}