import {
  HOBI,
  LEVEL1,
  LEVEL2,
  LEVEL3_PAIRS,
  LEVEL3_SENTENCES,
  LEVEL4,
  LEVELS,
} from './data.js'

const STORAGE_KEY = 'misi-detektif-level-settings'

export const DEFAULT_LEVEL_SETTINGS = {
  appearance: {
    backgroundImage: '',
    introImage: '',
    detectiveImage: '',
    mapImage: '',
  },
  questionCounts: {
    level1: 10,
    level2: 10,
    level3Sentences: 10,
    level3Pairs: 10,
    level4: 10,
  },
  levels: LEVELS.map((level, index) => ({
    ...level,
    prompt: [
      '',
      'Apa hobi {name}?',
      'Susun kata-kata ini menjadi kalimat yang benar.',
      'Siapakah aku? Baca petunjuknya, lalu tebak hobi yang dimaksud.',
    ][index],
    secondaryPrompt: index === 1
      ? 'Kalimat mana yang menjadi bukti hobi {name}?'
      : index === 2
        ? 'Pasangkan kata dengan maknanya. Ketuk kata, lalu ketuk maknanya.'
        : '',
  })),
  level1: LEVEL1.map((question) => ({
    q: question.q,
    hint: question.hint,
    icons: [...question.options],
    options: question.options.map((option) => HOBI[option]),
    optionImages: question.options.map(() => ''),
    answer: question.options.indexOf(question.answer),
  })),
  level2: LEVEL2.map((profile) => ({
    name: profile.name,
    look: { ...profile.look },
    sentences: [...profile.sentences],
    evidence: [...profile.bukti],
    icons: [...profile.options],
    options: profile.options.map((option) => HOBI[option]),
    optionImages: profile.options.map(() => ''),
    answer: profile.options.indexOf(profile.answer),
  })),
  level3Sentences: LEVEL3_SENTENCES.map((item) => ({
    words: item.words.join(' '),
    answers: [...item.answers],
  })),
  level3Pairs: LEVEL3_PAIRS.map((item) => ({
    ...item,
  })),
  level4: LEVEL4.map((item) => ({
    clues: [...item.clues],
    icons: [...item.options],
    options: item.options.map((option) => HOBI[option]),
    optionImages: item.options.map(() => ''),
    answer: item.options.indexOf(item.answer),
    hint: item.hint,
    chips: [...item.chips],
  })),
}

const isText = (value) => typeof value === 'string'
const isFilledText = (value) => isText(value) && value.trim().length > 0
const isImage = (value) => (
  value === ''
  || (typeof value === 'string' && (
    value.startsWith('data:image/')
    || /^\/images\/(?:[\w-]+\/)*[\w.-]+\.(?:png|jpe?g|webp|gif|svg)$/i.test(value)
  ))
)
const hasStringArray = (value, length, requireText = false) => (
  Array.isArray(value)
  && (length === null || value.length === length)
  && value.every(requireText ? isFilledText : isText)
)
const isAnswerIndex = (value, length) => Number.isInteger(value) && value >= 0 && value < length
const isQuestionCount = (value, items) => Number.isInteger(value) && value >= 1 && value <= items.length
const isEvidence = (value, sentenceCount) => (
  Array.isArray(value) && value.length > 0
  && value.every((index) => Number.isInteger(index) && index >= 0 && index < sentenceCount)
)

function isValidSettings(settings) {
  return Boolean(
    settings
    && settings.appearance
    && isImage(settings.appearance.backgroundImage)
    && isImage(settings.appearance.introImage)
    && isImage(settings.appearance.detectiveImage)
    && isImage(settings.appearance.mapImage)
    && settings.questionCounts
    && Array.isArray(settings.levels)
    && settings.levels.length === 4
    && settings.levels.every((level, index) => (
      isFilledText(level.title) && isFilledText(level.place) && isFilledText(level.skill)
      && (index === 0 || isFilledText(level.prompt))
      && ((index !== 1 && index !== 2) || isFilledText(level.secondaryPrompt))
    ))
    && Array.isArray(settings.level1)
    && settings.level1.length > 0
    && isQuestionCount(settings.questionCounts.level1, settings.level1)
    && settings.level1.every((item) => (
      isFilledText(item.q) && isFilledText(item.hint) && hasStringArray(item.options, null, true)
      && item.options.length >= 2 && hasStringArray(item.icons, item.options.length)
      && hasStringArray(item.optionImages, item.options.length) && item.optionImages.every(isImage)
      && isAnswerIndex(item.answer, item.options.length)
    ))
    && Array.isArray(settings.level2)
    && settings.level2.length > 0
    && isQuestionCount(settings.questionCounts.level2, settings.level2)
    && settings.level2.every((item) => (
      isFilledText(item.name) && hasStringArray(item.sentences, null, true) && item.sentences.length > 0
      && item.look && isText(item.look.skin) && isText(item.look.hair) && isText(item.look.shirt)
      && isEvidence(item.evidence, item.sentences.length)
      && hasStringArray(item.options, null, true) && item.options.length >= 2
      && hasStringArray(item.icons, item.options.length)
      && hasStringArray(item.optionImages, item.options.length) && item.optionImages.every(isImage)
      && isAnswerIndex(item.answer, item.options.length)
    ))
    && Array.isArray(settings.level3Sentences)
    && settings.level3Sentences.length > 0
    && isQuestionCount(settings.questionCounts.level3Sentences, settings.level3Sentences)
    && settings.level3Sentences.every((item) => (
      (() => {
        const words = isText(item.words) ? item.words.trim().split(/\s+/).filter(Boolean) : []
        const sameWords = (answer) => {
          const normalizedWords = answer.trim().toLowerCase().split(/\s+/).sort()
          return JSON.stringify(normalizedWords) === JSON.stringify([...words].map((word) => word.toLowerCase()).sort())
        }
        return words.length >= 2
          && Array.isArray(item.answers) && item.answers.length > 0
          && item.answers.every((answer) => isFilledText(answer) && sameWords(answer))
      })()
    ))
    && Array.isArray(settings.level3Pairs)
    && settings.level3Pairs.length > 0
    && isQuestionCount(settings.questionCounts.level3Pairs, settings.level3Pairs)
    && settings.level3Pairs.every((item) => isFilledText(item.term) && isFilledText(item.meaning))
    && Array.isArray(settings.level4)
    && settings.level4.length > 0
    && isQuestionCount(settings.questionCounts.level4, settings.level4)
    && settings.level4.every((item) => (
      hasStringArray(item.clues, null, true) && item.clues.length > 0
      && hasStringArray(item.options, null, true) && item.options.length >= 2
      && hasStringArray(item.icons, item.options.length)
      && hasStringArray(item.optionImages, item.options.length) && item.optionImages.every(isImage)
      && isAnswerIndex(item.answer, item.options.length) && isFilledText(item.hint)
      && hasStringArray(item.chips, null, true) && item.chips.length > 0
    ))
  )
}

export function normalizeSettings(stored) {
  if (!stored || typeof stored !== 'object') return stored
  const settingsWithoutQuestionArtVersion = { ...stored }
  delete settingsWithoutQuestionArtVersion.questionArtVersion
  const questionCount = (key, items) => (
    stored.questionCounts?.[key]
    ?? Math.max(1, Math.min(DEFAULT_LEVEL_SETTINGS.questionCounts[key], items?.length ?? DEFAULT_LEVEL_SETTINGS[key].length))
  )
  const normalizeSection = (actual, normalizeItem = (item) => item) => {
    if (!Array.isArray(actual) || actual.some((item) => !item || typeof item !== 'object')) return actual
    return actual.map((item, index) => normalizeItem(item, index))
  }
  const withoutQuestionImage = (item) => {
    const normalized = { ...item }
    delete normalized.image
    return normalized
  }

  return {
    ...DEFAULT_LEVEL_SETTINGS,
    ...settingsWithoutQuestionArtVersion,
    appearance: { ...DEFAULT_LEVEL_SETTINGS.appearance, ...stored.appearance },
    questionCounts: {
      level1: questionCount('level1', stored.level1),
      level2: questionCount('level2', stored.level2),
      level3Sentences: questionCount('level3Sentences', stored.level3Sentences),
      level3Pairs: questionCount('level3Pairs', stored.level3Pairs),
      level4: questionCount('level4', stored.level4),
    },
    levels: normalizeSection(stored.levels),
    level1: normalizeSection(stored.level1, (item) => ({
      ...withoutQuestionImage(item),
      icons: item.icons ?? item.options,
      optionImages: item.optionImages ?? item.options?.map(() => ''),
    })),
    level2: normalizeSection(stored.level2, (item) => ({
      ...withoutQuestionImage(item),
      look: item.look ?? { skin: '#f4c7a0', hair: '#3b2a20', shirt: '#17b3a3' },
      evidence: item.evidence ?? item.bukti,
      icons: item.icons ?? item.options,
      optionImages: item.optionImages ?? item.options?.map(() => ''),
    })),
    level3Sentences: normalizeSection(stored.level3Sentences, (item) => ({
      ...withoutQuestionImage(item),
      words: Array.isArray(item.words) ? item.words.join(' ') : item.words,
    })),
    level3Pairs: normalizeSection(stored.level3Pairs, withoutQuestionImage),
    level4: normalizeSection(stored.level4, (item) => ({
      ...withoutQuestionImage(item),
      icons: item.icons ?? item.options,
      optionImages: item.optionImages ?? item.options?.map(() => ''),
    })),
  }
}

export function loadLevelSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return { settings: DEFAULT_LEVEL_SETTINGS, error: '' }
    const settings = normalizeSettings(JSON.parse(stored))
    if (!isValidSettings(settings)) throw new Error('Data pengaturan tidak lengkap atau formatnya tidak sesuai.')
    return { settings, error: '' }
  } catch (error) {
    console.error('Gagal membaca pengaturan level:', error)
    return {
      settings: DEFAULT_LEVEL_SETTINGS,
      error: 'Pengaturan tersimpan tidak bisa dibaca. Periksa kembali atau simpan pengaturan baru.',
    }
  }
}

export function saveLevelSettings(settings) {
  if (!isValidSettings(settings)) throw new Error('Lengkapi semua isi level dengan format yang benar sebelum menyimpan.')
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function parseLevelSettings(value) {
  const settings = normalizeSettings(value)
  if (!isValidSettings(settings)) throw new Error('Format JSON tidak cocok atau ada soal yang belum lengkap.')
  return settings
}

export const SETTINGS_STORAGE_KEY = STORAGE_KEY
