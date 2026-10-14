import { useId, useRef, useState } from 'react'
import { parseLevelSettings, saveLevelSettings } from './levelSettings.js'

const LEVEL_TABS = [
  { title: 'Level 1', key: 'level1', description: 'Pertanyaan dan pilihan jawaban' },
  { title: 'Level 2', key: 'level2', description: 'Profil warga dan kalimat bukti' },
  { title: 'Level 3', key: 'level3Sentences', description: 'Susun kalimat dan pasangkan makna' },
  { title: 'Level 4', key: 'level4', description: 'Petunjuk dan tebak jawaban' },
  { title: 'Tampilan', key: 'appearance', description: 'Latar dan gambar detektif' },
]

function Field({ label, value, onChange, multiline = false, maxLength = 300 }) {
  const id = useId()
  const Input = multiline ? 'textarea' : 'input'
  return (
    <label className="custom-field" htmlFor={id}>
      <span className="field">{label}</span>
      <Input
        id={id}
        className="note"
        type={multiline ? undefined : 'text'}
        rows={multiline ? 3 : undefined}
        maxLength={maxLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

function QuestionCountField({ label, value, max, onChange, note }) {
  const id = useId()
  return (
    <label className="settings-question-count" htmlFor={id}>
      <span className="field">{label}</span>
      <input
        id={id}
        className="note"
        type="number"
        min={1}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <small className="meta">{note || `Pilih 1–${max} dari soal yang tersedia.`}</small>
    </label>
  )
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      const scale = Math.min(1, 1200 / Math.max(image.width, image.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(image.width * scale)
      canvas.height = Math.round(image.height * scale)
      const context = canvas.getContext('2d')
      if (!context) {
        reject(new Error('Foto tidak bisa diproses di browser ini.'))
        return
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.82))
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('File foto tidak bisa dibuka. Pilih file gambar lain.'))
    }
    image.src = url
  })
}

function PhotoField({ label, value, onChange, onError }) {
  const [dragging, setDragging] = useState(false)

  const acceptFile = async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      onError('Pilih file gambar yang valid.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      onError('Ukuran foto maksimal 10 MB.')
      return
    }
    try {
      onChange(await compressImage(file))
      onError('')
    } catch (error) {
      console.error('Gagal memproses foto level:', error)
      onError(error.message)
    }
  }

  return (
    <div
      className={`photo-drop${value ? ' has-photo' : ''}${dragging ? ' is-dragging' : ''}`}
      onDragOver={(event) => {
        event.preventDefault()
        setDragging(true)
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false)
      }}
      onDrop={(event) => {
        event.preventDefault()
        setDragging(false)
        acceptFile(event.dataTransfer.files?.[0])
      }}
    >
      {value ? (
        <div className="custom-image-preview">
          <img src={value} alt={`Pratinjau ${label}`} />
          <span className="photo-drop__status">✓ Foto terpasang</span>
          <div className="photo-drop__actions">
            <label className="btn btn--ghost btn--small photo-drop__browse">
              Ganti Foto
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  acceptFile(event.target.files?.[0])
                  event.target.value = ''
                }}
              />
            </label>
            <button className="btn btn--ghost btn--small" type="button" onClick={() => onChange('')}>
              Hapus
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className="photo-drop__icon" aria-hidden="true">＋</span>
          <strong>{label}</strong>
          <span className="meta">Seret foto ke sini atau</span>
          <label className="btn btn--ghost btn--small photo-drop__browse">
            Pilih Foto
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                acceptFile(event.target.files?.[0])
                event.target.value = ''
              }}
            />
          </label>
        </>
      )}
    </div>
  )
}

function AnswerEditor({ item, onUpdate, onError, label = 'Pilihan jawaban' }) {
  const updateOption = (index, changes) => {
    const options = [...item.options]
    const optionImages = [...item.optionImages]
    const icons = [...item.icons]
    if (changes.text !== undefined) options[index] = changes.text
    if (changes.image !== undefined) optionImages[index] = changes.image
    if (changes.icon !== undefined) icons[index] = changes.icon
    onUpdate({ options, optionImages, icons, ...(changes.answer === undefined ? {} : { answer: changes.answer }) })
  }

  const removeOption = (index) => {
    const options = item.options.filter((_, i) => i !== index)
    const optionImages = item.optionImages.filter((_, i) => i !== index)
    const icons = item.icons.filter((_, i) => i !== index)
    const answer = item.answer === index ? 0 : item.answer > index ? item.answer - 1 : item.answer
    onUpdate({ options, optionImages, icons, answer })
  }

  return (
    <fieldset className="custom-options-editor">
      <legend>{label} — pilih jawaban benar</legend>
      {item.options.map((option, index) => (
        <div className="custom-option-editor" key={index}>
          <div className="custom-option-row">
            <input
              type="radio"
              name={label}
              aria-label={`Tandai pilihan ${index + 1} sebagai jawaban benar`}
              checked={item.answer === index}
              onChange={() => updateOption(index, { answer: index })}
            />
            <label className="sr-only" htmlFor={`${label}-${index}`}>Pilihan {index + 1}</label>
            <input
              id={`${label}-${index}`}
              className="note"
              type="text"
              maxLength="100"
              placeholder={`Pilihan ${index + 1}`}
              value={option}
              onChange={(event) => updateOption(index, { text: event.target.value })}
            />
            <button
              className="btn btn--ghost btn--small"
              type="button"
              disabled={item.options.length <= 2}
              aria-label={`Hapus pilihan ${index + 1}`}
              onClick={() => removeOption(index)}
            >
              ×
            </button>
          </div>
          <PhotoField
            label={`Foto pilihan ${index + 1}`}
            value={item.optionImages[index]}
            onChange={(image) => updateOption(index, { image })}
            onError={onError}
          />
        </div>
      ))}
      <button
        className="btn btn--ghost btn--small"
        type="button"
        onClick={() => onUpdate({
          options: [...item.options, `Pilihan ${item.options.length + 1}`],
          optionImages: [...item.optionImages, ''],
          icons: [...item.icons, ''],
        })}
      >
        + Tambah Pilihan
      </button>
    </fieldset>
  )
}

function makeQuestion(level) {
  if (level === 1) {
    return { q: '', hint: '', options: ['', ''], answer: 0, icons: ['', ''], optionImages: ['', ''], image: '' }
  }
  if (level === 2) {
    return {
      name: '',
      look: { skin: '#f4c7a0', hair: '#3b2a20', shirt: '#17b3a3' },
      sentences: [''],
      evidence: [0],
      options: ['', ''],
      answer: 0,
      icons: ['', ''],
      optionImages: ['', ''],
      image: '',
    }
  }
  if (level === 3) return { words: '', answers: [''], image: '' }
  return {
    clues: [''],
    options: ['', ''],
    answer: 0,
    icons: ['', ''],
    optionImages: ['', ''],
    hint: '',
    chips: [''],
    image: '',
  }
}

function makePair() {
  return { term: '', meaning: '', image: '' }
}

function saveDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function replaceImagesWithPublicPaths(settings) {
  const exported = structuredClone(settings)
  const photos = []
  const collect = (holder, key, name) => {
    const source = holder[key]
    if (!source || source.startsWith('/images/')) return
    const filename = `${name}.jpg`
    holder[key] = `/images/${filename}`
    photos.push({ source, filename })
  }

  exported.level1.forEach((item, index) => {
    item.optionImages.forEach((_, optionIndex) => collect(item.optionImages, optionIndex, `level-1-soal-${index + 1}-pilihan-${optionIndex + 1}`))
  })
  exported.level2.forEach((item, index) => {
    item.optionImages.forEach((_, optionIndex) => collect(item.optionImages, optionIndex, `level-2-profil-${index + 1}-pilihan-${optionIndex + 1}`))
  })
  exported.level4.forEach((item, index) => {
    item.optionImages.forEach((_, optionIndex) => collect(item.optionImages, optionIndex, `level-4-kasus-${index + 1}-pilihan-${optionIndex + 1}`))
  })
  return { exported, photos }
}

function updateArrayItem(array, index, item) {
  return array.map((current, itemIndex) => (itemIndex === index ? item : current))
}

export function LevelSettings({ initialSettings, defaultSettings, loadError = '', onBack, onSave }) {
  const [settings, setSettings] = useState(initialSettings)
  const [selectedLevel, setSelectedLevel] = useState(0)
  const [selectedItem, setSelectedItem] = useState(0)
  const [level3Section, setLevel3Section] = useState('level3Sentences')
  const [error, setError] = useState(loadError)
  const [notice, setNotice] = useState('')
  const [dirty, setDirty] = useState(false)
  const importRef = useRef(null)
  const activeLevel = LEVEL_TABS[selectedLevel]
  const itemKey = selectedLevel === 2 ? level3Section : activeLevel.key
  const isPairSection = selectedLevel === 2 && level3Section === 'level3Pairs'
  const items = settings[itemKey]
  const item = items?.[selectedItem]
  const appearancePhotoCount = Object.values(settings.appearance).filter(Boolean).length

  const update = (changes, index = selectedItem, key = itemKey) => {
    setSettings((current) => ({
      ...current,
      [key]: updateArrayItem(current[key], index, { ...current[key][index], ...changes }),
    }))
    setDirty(true)
    setError('')
    setNotice('')
  }

  const updateLevel = (index, changes) => {
    setSettings((current) => ({
      ...current,
      levels: updateArrayItem(current.levels, index, { ...current.levels[index], ...changes }),
    }))
    setDirty(true)
    setError('')
    setNotice('')
  }

  const updateAppearance = (key, value) => {
    setSettings((current) => ({
      ...current,
      appearance: { ...current.appearance, [key]: value },
    }))
    setDirty(true)
    setError('')
    setNotice('')
  }

  const updateQuestionCount = (key, value) => {
    const max = settings[key]?.length
    if (!Number.isInteger(value) || value < 1 || value > max) return
    setSettings((current) => ({
      ...current,
      questionCounts: { ...current.questionCounts, [key]: value },
    }))
    setDirty(true)
    setError('')
    setNotice('')
  }

  const save = () => {
    try {
      saveLevelSettings(settings)
      onSave(settings)
      setDirty(false)
      setError('')
      setNotice('Tersimpan di browser ini. Untuk menyimpan ke proyek, gunakan “Ekspor JSON + foto”.')
    } catch (saveError) {
      console.error('Gagal menyimpan pengaturan level:', saveError)
      setError(saveError.message || 'Pengaturan gagal disimpan.')
      setNotice('')
    }
  }

  const addItem = () => {
    const nextItems = [...items, itemKey === 'level3Pairs' ? makePair() : makeQuestion(selectedLevel + 1)]
    setSettings((current) => ({ ...current, [itemKey]: nextItems }))
    setSelectedItem(nextItems.length - 1)
    setDirty(true)
    setError('')
    setNotice('')
  }

  const removeItem = () => {
    if (items.length <= 1) return
    if (!window.confirm(`Hapus ${selectedLevel === 2 ? (isPairSection ? 'pasangan makna' : 'kalimat') : 'soal'} ini?`)) return
    const nextItems = items.filter((_, index) => index !== selectedItem)
    setSettings((current) => ({
      ...current,
      [itemKey]: nextItems,
      questionCounts: {
        ...current.questionCounts,
        [itemKey]: Math.min(current.questionCounts[itemKey], nextItems.length),
      },
    }))
    setSelectedItem(Math.min(selectedItem, nextItems.length - 1))
    setDirty(true)
    setError('')
    setNotice('')
  }

  const saveWithQuestionCount = (index, delta, key = itemKey, field) => {
    const currentItem = settings[key][index]
    const currentArray = currentItem[field]
    let nextArray
    if (delta > 0) {
      nextArray = [...currentArray, field === 'evidence' ? currentArray.length : '']
    } else if (currentArray.length > 1) {
      nextArray = currentArray.filter((_, itemIndex) => itemIndex !== currentArray.length - 1)
    } else return

    let changes = { [field]: nextArray }
    if (field === 'sentences') {
      changes.evidence = currentItem.evidence
        .filter((evidenceIndex) => evidenceIndex < nextArray.length)
      if (!changes.evidence.length) changes.evidence = [0]
    }
    update(changes, index, key)
  }

  const exportProject = async () => {
    try {
      onSave(settings)
      setDirty(false)
      const { exported, photos } = replaceImagesWithPublicPaths(settings)
      for (const [key, name] of Object.entries({
        backgroundImage: 'latar-aplikasi',
        introImage: 'ilustrasi-pembuka',
        detectiveImage: 'detektif',
        mapImage: 'latar-peta',
      })) {
        const source = exported.appearance[key]
        if (!source || source.startsWith('/images/')) continue
        const filename = `${name}.jpg`
        exported.appearance[key] = `/images/${filename}`
        photos.push({ source, filename })
      }
      for (const photo of photos) {
        const response = await fetch(photo.source)
        if (!response.ok) throw new Error(`Foto ${photo.filename} gagal disiapkan untuk diunduh.`)
        saveDownload(await response.blob(), photo.filename)
        await new Promise((resolve) => setTimeout(resolve, 180))
      }
      const json = new Blob([`${JSON.stringify(exported, null, 2)}\n`], { type: 'application/json' })
      saveDownload(json, 'level-content.json')
      setNotice(`JSON dan ${photos.length} foto diunduh. Salin JSON ke public/level-content.json dan foto ke public/images/.`)
      setError('')
    } catch (exportError) {
      console.error('Gagal mengekspor konten level:', exportError)
      setError(exportError.message || 'Ekspor gagal.')
      setNotice('')
    }
  }

  const importProject = async (file) => {
    if (!file) return
    try {
      const imported = parseLevelSettings(JSON.parse(await file.text()))
      saveLevelSettings(imported)
      setSettings(imported)
      onSave(imported)
      setDirty(false)
      setSelectedLevel(0)
      setSelectedItem(0)
      setError('')
      setNotice('JSON berhasil dibuka dan diterapkan di browser ini.')
    } catch (importError) {
      console.error('Gagal membuka JSON konten level:', importError)
      setError(importError.message || 'File JSON tidak bisa dibuka.')
      setNotice('')
    }
  }

  const restoreDefaults = () => {
    if (!window.confirm('Pulihkan semua isi empat level dan tampilan ke pengaturan awal? Perubahan custom akan diganti.')) return
    setSettings(defaultSettings)
    setSelectedLevel(0)
    setSelectedItem(0)
    setDirty(true)
    setError('')
    setNotice('Konten dari public/level-content.json dimuat. Tekan Simpan di Browser atau Ekspor JSON + Foto untuk menerapkannya.')
  }

  if (selectedLevel !== 4 && !item) return null

  return (
    <section className="screen custom-quiz">
      <article className="card custom-panel settings-panel">
        <div className="custom-heading">
          <div>
            <p className="eyebrow">Pengaturan custom</p>
            <h1>Kustomisasi</h1>
            <p className="meta">Pilih level untuk mengedit. Perubahan hanya masuk ke proyek setelah file ekspor disalin ke folder public.</p>
          </div>
          <button className="btn btn--ghost btn--small" type="button" onClick={onBack}>Kembali</button>
        </div>

        <div className="settings-actions">
          <button className="btn btn--ghost btn--small" type="button" onClick={() => importRef.current?.click()}>
            Buka JSON
          </button>
          <input
            ref={importRef}
            className="sr-only"
            type="file"
            accept="application/json,.json"
            onChange={(event) => {
              importProject(event.target.files?.[0])
              event.target.value = ''
            }}
          />
          <button className="btn btn--ghost btn--small" type="button" onClick={save}>Simpan di Browser</button>
          <button className="btn btn--big btn--small" type="button" onClick={exportProject}>Ekspor JSON + Foto</button>
          <button className="link-btn" type="button" onClick={restoreDefaults}>Pulihkan bawaan</button>
        </div>

        <div className="settings-level-tabs" role="tablist" aria-label="Pilih level atau tampilan">
          {LEVEL_TABS.map((tab, index) => (
            <button
              key={tab.key}
              className={`settings-level-tab${selectedLevel === index ? ' is-active' : ''}`}
              role="tab"
              aria-selected={selectedLevel === index}
              type="button"
              onClick={() => {
                setSelectedLevel(index)
                setSelectedItem(0)
                if (index === 2) setLevel3Section('level3Sentences')
              }}
            >
              <strong>{tab.title}</strong>
              <span>
                {index === 4
                  ? `${appearancePhotoCount}/4 foto`
                  : index === 1
                    ? `${settings.level2.length} profil`
                    : index === 2
                      ? `${settings.level3Sentences.length + settings.level3Pairs.length} soal`
                      : `${settings[tab.key].length} soal`}
              </span>
            </button>
          ))}
        </div>

        {selectedLevel !== 4 && <details className="custom-level-settings settings-metadata">
          <summary>Nama level, lokasi, dan petunjuk layar</summary>
          <div className="settings-fields-grid">
            <Field label="Nama level" value={settings.levels[selectedLevel].title} onChange={(title) => updateLevel(selectedLevel, { title })} />
            <Field label="Lokasi peta" value={settings.levels[selectedLevel].place} onChange={(place) => updateLevel(selectedLevel, { place })} />
            <Field label="Kemampuan" value={settings.levels[selectedLevel].skill} onChange={(skill) => updateLevel(selectedLevel, { skill })} />
            {selectedLevel > 0 && (
              <Field label="Pertanyaan utama" value={settings.levels[selectedLevel].prompt} onChange={(prompt) => updateLevel(selectedLevel, { prompt })} />
            )}
            {(selectedLevel === 1 || selectedLevel === 2) && (
              <Field label="Pertanyaan bagian kedua" value={settings.levels[selectedLevel].secondaryPrompt} onChange={(secondaryPrompt) => updateLevel(selectedLevel, { secondaryPrompt })} />
            )}
          </div>
        </details>}

        {selectedLevel !== 4 && selectedLevel !== 2 && (
          <section className="settings-count-panel" aria-label="Jumlah soal permainan">
            <QuestionCountField
              label={selectedLevel === 1 ? 'Jumlah profil warga yang dimainkan' : `Jumlah soal Level ${selectedLevel + 1} per permainan`}
              value={settings.questionCounts[activeLevel.key]}
              max={items.length}
              note={selectedLevel === 1
                ? `Setiap profil memiliki 2 pertanyaan. Tersedia ${items.length} profil.`
                : `Soal dipilih acak dari ${items.length} soal yang tersedia.`}
              onChange={(value) => updateQuestionCount(activeLevel.key, value)}
            />
          </section>
        )}

        {selectedLevel === 2 && (
          <section className="settings-count-panel settings-count-panel--pair" aria-label="Jumlah soal Level 3">
            <QuestionCountField
              label="Susun kalimat per permainan"
              value={settings.questionCounts.level3Sentences}
              max={settings.level3Sentences.length}
              onChange={(value) => updateQuestionCount('level3Sentences', value)}
            />
            <QuestionCountField
              label="Pasangan makna per permainan"
              value={settings.questionCounts.level3Pairs}
              max={settings.level3Pairs.length}
              onChange={(value) => updateQuestionCount('level3Pairs', value)}
            />
          </section>
        )}

        {selectedLevel === 4 && (
          <section className="settings-editor appearance-editor" role="tabpanel">
            <h2>Tampilan petualangan</h2>
            <p className="meta">Tambahkan foto atau ilustrasi sendiri. Seret gambar ke kotak, atau pilih dari perangkat. Foto tersimpan dalam JSON dan ikut diekspor ke folder public/images.</p>
            <div className="appearance-grid">
              <div className="appearance-field">
                <h3>Latar aplikasi</h3>
                <PhotoField label="Foto latar aplikasi" value={settings.appearance.backgroundImage} onChange={(image) => updateAppearance('backgroundImage', image)} onError={setError} />
              </div>
              <div className="appearance-field">
                <h3>Ilustrasi halaman mulai</h3>
                <PhotoField label="Gambar pembuka" value={settings.appearance.introImage} onChange={(image) => updateAppearance('introImage', image)} onError={setError} />
              </div>
              <div className="appearance-field">
                <h3>Foto detektif</h3>
                <PhotoField label="Gambar detektif" value={settings.appearance.detectiveImage} onChange={(image) => updateAppearance('detectiveImage', image)} onError={setError} />
              </div>
              <div className="appearance-field">
                <h3>Latar peta kota</h3>
                <PhotoField label="Foto latar peta" value={settings.appearance.mapImage} onChange={(image) => updateAppearance('mapImage', image)} onError={setError} />
              </div>
            </div>
            <button className="btn btn--ghost btn--small" type="button" onClick={() => updateAppearance('backgroundImage', '')}>Hapus foto latar aplikasi</button>
          </section>
        )}

        {selectedLevel === 2 && (
          <div className="settings-subtabs" role="tablist" aria-label="Bagian Level 3">
            <button type="button" className={level3Section === 'level3Sentences' ? 'is-active' : ''} onClick={() => { setLevel3Section('level3Sentences'); setSelectedItem(0) }}>
              Susun Kalimat ({settings.level3Sentences.length})
            </button>
            <button type="button" className={level3Section === 'level3Pairs' ? 'is-active' : ''} onClick={() => { setLevel3Section('level3Pairs'); setSelectedItem(0) }}>
              Pasangan Makna ({settings.level3Pairs.length})
            </button>
          </div>
        )}

        {selectedLevel !== 4 && <div className="question-picker">
          <div className="question-picker__list" role="tablist" aria-label={`${activeLevel.title}: pilih soal`}>
            {items.map((_, index) => (
              <button
                key={index}
                className={selectedItem === index ? 'is-active' : ''}
                role="tab"
                aria-selected={selectedItem === index}
                type="button"
                onClick={() => setSelectedItem(index)}
              >
                {isPairSection ? `Pasangan ${index + 1}` : `${selectedLevel === 1 ? 'Profil' : selectedLevel === 3 ? 'Kasus' : 'Soal'} ${index + 1}`}
              </button>
            ))}
          </div>
          <div className="question-picker__actions">
            <button className="btn btn--ghost btn--small" type="button" onClick={addItem}>+ Tambah</button>
            <button className="btn btn--ghost btn--small" type="button" disabled={items.length <= 1} onClick={removeItem}>Hapus</button>
          </div>
        </div>}

        {selectedLevel !== 4 && <section className="settings-editor" role="tabpanel">
          <h2>{activeLevel.title} · {isPairSection ? 'Pasangan Makna' : `Soal ${selectedItem + 1}`}</h2>

          {selectedLevel === 0 && (
            <>
              <Field label="Teks soal" value={item.q} onChange={(q) => update({ q })} />
              <AnswerEditor item={item} onUpdate={(changes) => update(changes)} onError={setError} />
              <Field label="Petunjuk jika jawaban salah" value={item.hint} onChange={(hint) => update({ hint })} />
            </>
          )}

          {selectedLevel === 1 && (
            <>
              <Field label="Nama warga" value={item.name} onChange={(name) => update({ name })} />
              <div className="settings-repeat-list">
                <h3>Kalimat di profil</h3>
                {item.sentences.map((sentence, index) => (
                  <div className="settings-repeat-row" key={index}>
                    <Field
                      label={`Kalimat ${index + 1}`}
                      value={sentence}
                      onChange={(text) => {
                        const sentences = [...item.sentences]
                        sentences[index] = text
                        update({ sentences })
                      }}
                    />
                    <label className="evidence-toggle">
                      <input type="checkbox" checked={item.evidence.includes(index)} onChange={() => {
                        const evidence = item.evidence.includes(index)
                          ? item.evidence.filter((evidenceIndex) => evidenceIndex !== index)
                          : [...item.evidence, index]
                        update({ evidence })
                      }} />
                      Bukti hobi
                    </label>
                  </div>
                ))}
                <div className="settings-repeat-actions">
                  <button className="btn btn--ghost btn--small" type="button" onClick={() => saveWithQuestionCount(selectedItem, 1, itemKey, 'sentences')}>+ Kalimat</button>
                  <button className="btn btn--ghost btn--small" type="button" disabled={item.sentences.length <= 1} onClick={() => saveWithQuestionCount(selectedItem, -1, itemKey, 'sentences')}>− Hapus kalimat terakhir</button>
                </div>
              </div>
              <AnswerEditor item={item} label="Pilihan hobi" onUpdate={(changes) => update(changes)} onError={setError} />
            </>
          )}

          {selectedLevel === 2 && level3Section === 'level3Sentences' && (
            <>
              <Field label="Kata-kata (pisahkan dengan spasi)" value={item.words} onChange={(words) => update({ words })} />
              <Field label="Kalimat yang benar (satu jawaban per baris)" value={item.answers.join('\n')} multiline onChange={(text) => update({ answers: text.split('\n') })} />
              <p className="meta">Setiap kalimat benar harus memakai kata yang sama seperti di atas.</p>
            </>
          )}

          {selectedLevel === 2 && level3Section === 'level3Pairs' && (
            <>
              <Field label="Kata" value={item.term} onChange={(term) => update({ term })} />
              <Field label="Makna" value={item.meaning} onChange={(meaning) => update({ meaning })} />
            </>
          )}

          {selectedLevel === 3 && (
            <>
              <div className="settings-repeat-list">
                <h3>Petunjuk</h3>
                {item.clues.map((clue, index) => (
                  <Field key={index} label={`Petunjuk ${index + 1}`} value={clue} onChange={(text) => {
                    const clues = [...item.clues]
                    clues[index] = text
                    update({ clues })
                  }} />
                ))}
                <div className="settings-repeat-actions">
                  <button className="btn btn--ghost btn--small" type="button" onClick={() => update({ clues: [...item.clues, ''] })}>+ Petunjuk</button>
                  <button className="btn btn--ghost btn--small" type="button" disabled={item.clues.length <= 1} onClick={() => update({ clues: item.clues.slice(0, -1) })}>− Hapus petunjuk</button>
                </div>
              </div>
              <AnswerEditor item={item} label="Pilihan jawaban" onUpdate={(changes) => update(changes)} onError={setError} />
              <Field label="Petunjuk jika jawaban salah" value={item.hint} onChange={(hint) => update({ hint })} />
              <div className="settings-repeat-list">
                <h3>Potongan alasan</h3>
                {item.chips.map((chip, index) => (
                  <Field key={index} label={`Alasan ${index + 1}`} value={chip} onChange={(text) => {
                    const chips = [...item.chips]
                    chips[index] = text
                    update({ chips })
                  }} />
                ))}
                <div className="settings-repeat-actions">
                  <button className="btn btn--ghost btn--small" type="button" onClick={() => update({ chips: [...item.chips, ''] })}>+ Alasan</button>
                  <button className="btn btn--ghost btn--small" type="button" disabled={item.chips.length <= 1} onClick={() => update({ chips: item.chips.slice(0, -1) })}>− Hapus alasan</button>
                </div>
              </div>
            </>
          )}
        </section>}

        <div className="settings-sticky-footer">
          {error && <p className="custom-message is-incorrect" role="alert">{error}</p>}
          {notice && <p className="custom-message is-correct" role="status">{notice}</p>}
          {dirty && !error && <p className="meta">Ada perubahan yang belum disimpan.</p>}
          <div className="custom-actions">
            <button className="btn btn--big" type="button" onClick={save}>Simpan di Browser</button>
            <button className="btn btn--ghost" type="button" onClick={exportProject}>Ekspor JSON + Foto</button>
          </div>
        </div>
      </article>
    </section>
  )
}
