import { useEffect, useReducer, useState } from 'react'
import './App.css'
import { LEVELS } from './data.js'
import { saveEntry } from './leaderboard.js'
import { LevelScreen } from './levels.jsx'
import { CityMap, Finale, Hud, Intro, LevelResult } from './screens.jsx'
import { LevelSettings } from './LevelSettings.jsx'
import { loadLevelSettings, parseLevelSettings, SETTINGS_STORAGE_KEY } from './levelSettings.js'
import { play, setMuted } from './sound.js'

const initialState = {
  screen: 'intro', // intro | map | level | result | finale
  group: '',
  runId: 0,
  current: 1,
  results: {}, // { 1: { stars, points }, ... }
  walkerPos: 0,
  muted: false,
}

function doneCount(results) {
  let n = 0
  while (results[n + 1]) n += 1
  return n
}

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...state, group: action.group, runId: action.runId, screen: 'map' }
    case 'open':
      return {
        ...state,
        screen: 'level',
        current: action.id,
        walkerPos: Math.min(doneCount(state.results), 3),
      }
    case 'finish': {
      const old = state.results[action.id]
      const best = old && old.points >= action.points ? old : { stars: action.stars, points: action.points }
      return {
        ...state,
        screen: 'result',
        current: action.id,
        results: { ...state.results, [action.id]: best },
      }
    }
    case 'map':
      return { ...state, screen: 'map' }
    case 'custom':
      return { ...state, screen: 'custom' }
    case 'finale':
      return { ...state, screen: 'finale', walkerPos: 3 }
    case 'sound':
      return { ...state, muted: !state.muted }
    case 'restart':
      return { ...initialState, muted: state.muted }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [storedSettings] = useState(loadLevelSettings)
  const [levelSettings, setLevelSettings] = useState(storedSettings.settings)
  const levelsDone = doneCount(state.results)

  useEffect(() => {
    let active = true
    let hasLocalSettings = false
    try {
      hasLocalSettings = Boolean(localStorage.getItem(SETTINGS_STORAGE_KEY))
    } catch (error) {
      console.error('Gagal memeriksa pengaturan lokal:', error)
    }
    if (hasLocalSettings) return () => { active = false }

    fetch(`${import.meta.env.BASE_URL}level-content.json`)
      .then((response) => {
        if (!response.ok) throw new Error(`Gagal memuat level-content.json (${response.status}).`)
        return response.json()
      })
      .then((content) => {
        if (active) setLevelSettings(parseLevelSettings(content))
      })
      .catch((error) => {
        console.error('Gagal memuat konten level dari JSON publik:', error)
      })

    return () => { active = false }
  }, [])

  const toggleSound = () => {
    setMuted(!state.muted)
    dispatch({ type: 'sound' })
  }

  const finishLevel = (id, score) => {
    play('menang')
    dispatch({ type: 'finish', id, stars: score.stars, points: score.points })
  }

  // Simpan skor ke papan peringkat lalu buka sertifikat
  const goFinale = () => {
    const list = Object.values(state.results)
    saveEntry({
      id: state.runId,
      name: state.group,
      points: list.reduce((sum, r) => sum + r.points, 0),
      stars: list.reduce((sum, r) => sum + r.stars, 0),
    })
    play('menang')
    dispatch({ type: 'finale' })
  }

  return (
    <div className="app">
      <div className={`bg${levelSettings.appearance.backgroundImage ? ' bg--custom' : ''}`} aria-hidden="true">
        {levelSettings.appearance.backgroundImage && <img src={levelSettings.appearance.backgroundImage} alt="" />}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <i key={i} />
        ))}
      </div>

      {state.screen !== 'intro' && state.screen !== 'custom' && (
        <Hud group={state.group} results={state.results} muted={state.muted} onToggleSound={toggleSound} />
      )}

      <main className="stage">
        {state.screen === 'intro' && (
          <Intro
            appearance={levelSettings.appearance}
            onCustom={() => dispatch({ type: 'custom' })}
            onStart={(group) => {
              play('klik')
              dispatch({ type: 'start', group, runId: Date.now() })
            }}
          />
        )}

        {state.screen === 'map' && (
          <CityMap
            results={state.results}
            levelsDone={levelsDone}
            walkerPos={state.walkerPos}
            onOpen={(id) => {
              play('klik')
              dispatch({ type: 'open', id })
            }}
            onFinale={goFinale}
            levels={levelSettings.levels}
            appearance={levelSettings.appearance}
          />
        )}

        {state.screen === 'level' && (
          <LevelScreen id={state.current} onFinish={finishLevel} play={play} settings={levelSettings} />
        )}

        {state.screen === 'result' && (
          <LevelResult
            levelId={state.current}
            result={state.results[state.current]}
            isLast={levelsDone >= LEVELS.length}
            onRetry={() => dispatch({ type: 'open', id: state.current })}
            onNext={() => (levelsDone >= LEVELS.length ? goFinale() : dispatch({ type: 'map' }))}
            levels={levelSettings.levels}
          />
        )}

        {state.screen === 'finale' && (
          <Finale
            group={state.group}
            results={state.results}
            runId={state.runId}
            onRestart={() => dispatch({ type: 'restart' })}
          />
        )}

        {state.screen === 'custom' && (
          <LevelSettings
            initialSettings={levelSettings}
            loadError={storedSettings.error}
            onBack={() => dispatch({ type: 'restart' })}
            onSave={setLevelSettings}
          />
        )}
      </main>
    </div>
  )
}