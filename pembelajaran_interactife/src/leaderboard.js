// Papan peringkat disimpan di browser (localStorage), tanpa server
const KEY = 'detektif-hobi-peringkat'

export function loadBoard() {
  try {
    const raw = localStorage.getItem(KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

// Menyimpan atau memperbarui entri dengan id yang sama
export function saveEntry(entry) {
  try {
    const list = loadBoard().filter((e) => e.id !== entry.id)
    list.push(entry)
    localStorage.setItem(KEY, JSON.stringify(list.slice(-100)))
  } catch {
    // abaikan kalau penyimpanan diblokir
  }
}

export function clearBoard() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // abaikan
  }
}

// Poin tertinggi dulu, lalu bintang, lalu yang lebih dulu selesai
export function sortBoard(list) {
  return [...list].sort((a, b) => b.points - a.points || b.stars - a.stars || a.id - b.id)
}