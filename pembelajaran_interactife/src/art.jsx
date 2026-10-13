import { HOBI } from './data.js'

const ICONS = {
  kuas: (
    <g transform="rotate(-35 50 50)">
      <rect x="46" y="6" width="8" height="50" rx="4" fill="#b8793e" stroke="#1e2a4a" strokeWidth="3" />
      <rect x="42" y="54" width="16" height="14" fill="#c9d3e0" stroke="#1e2a4a" strokeWidth="3" />
      <path d="M42 68 Q50 98 58 68 Z" fill="#ff6f61" stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round" />
    </g>
  ),
  bola: (
    <g stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round">
      <circle cx="50" cy="50" r="38" fill="#fff" />
      <polygon points="50,33 66,45 60,64 40,64 34,45" fill="#1e2a4a" />
      <path d="M50 33 V14 M66 45 L84 38 M60 64 L72 80 M40 64 L28 80 M34 45 L16 38" fill="none" />
    </g>
  ),
  buku: (
    <g stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round">
      <path d="M50 28 Q32 18 12 24 V76 Q32 70 50 80 Z" fill="#7a5cff" />
      <path d="M50 28 Q68 18 88 24 V76 Q68 70 50 80 Z" fill="#9b84ff" />
      <path
        d="M22 38 Q34 36 42 40 M22 50 Q34 48 42 52 M58 40 Q66 36 78 38 M58 52 Q66 48 78 50"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
      />
    </g>
  ),
  gitar: (
    <g transform="rotate(-40 50 50)" stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round">
      <rect x="46" y="12" width="8" height="40" fill="#7a4a21" />
      <rect x="43" y="4" width="14" height="10" rx="2" fill="#1e2a4a" />
      <ellipse cx="50" cy="58" rx="14" ry="12" fill="#e08a3c" />
      <ellipse cx="50" cy="76" rx="20" ry="17" fill="#e08a3c" />
      <circle cx="50" cy="70" r="6" fill="#1e2a4a" />
    </g>
  ),
  tanaman: (
    <g stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M50 64 V40" fill="none" stroke="#2e9e5b" strokeWidth="5" />
      <ellipse cx="38" cy="50" rx="12" ry="6" fill="#3fb36b" transform="rotate(-30 38 50)" />
      <ellipse cx="62" cy="44" rx="12" ry="6" fill="#56c47e" transform="rotate(30 62 44)" />
      <circle cx="50" cy="32" r="10" fill="#ffc83d" />
      <path d="M30 64 H70 L64 92 H36 Z" fill="#ff6f61" />
    </g>
  ),
  raket: (
    <g stroke="#1e2a4a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <g transform="rotate(35 50 50)">
        <ellipse cx="52" cy="34" rx="18" ry="24" fill="#eaf6ff" />
        <path d="M52 10 V58 M34 34 H70 M38 20 H66 M38 48 H66" fill="none" strokeWidth="1.6" />
        <rect x="49" y="56" width="6" height="34" rx="3" fill="#ff6f61" />
      </g>
      <path d="M14 84 L26 70 L30 86 Z" fill="#fff" />
      <circle cx="14" cy="86" r="6" fill="#ffc83d" />
    </g>
  ),
}

export function HobiIcon({ id, className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label={HOBI[id]}>
      {ICONS[id]}
    </svg>
  )
}

export function Detective({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 120" aria-hidden="true">
      <ellipse cx="50" cy="113" rx="28" ry="6" fill="rgba(30,42,74,.18)" />
      <path d="M37 98 V112 H47 V98 M54 98 V112 H65 V98" fill="#36476b" stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M32 108 H48 Q50 116 44 117 H31 Q27 114 32 108 M54 108 H69 Q75 112 70 117 H55 Q51 114 54 108" fill="#fff" stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M25 76 Q25 62 50 62 Q75 62 75 76 L70 103 Q50 111 30 103 Z" fill="#26866a" stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M50 66 L39 79 L50 88 L61 79 Z" fill="#ffc83d" stroke="#1e2a4a" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M50 88 V103 M35 83 L30 99 M65 83 L71 96" fill="none" stroke="#1e2a4a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="84" r="2" fill="#fff3c4" />
      <circle cx="60" cy="84" r="2" fill="#fff3c4" />
      <circle cx="50" cy="43" r="19" fill="#f4c7a0" stroke="#1e2a4a" strokeWidth="3" />
      <path d="M32 43 Q30 29 42 25 Q55 20 67 31 L68 42 Q58 36 49 39 Q40 36 32 43 Z" fill="#5b3927" />
      <circle cx="43" cy="46" r="2.6" fill="#1e2a4a" />
      <circle cx="57" cy="46" r="2.6" fill="#1e2a4a" />
      <path d="M43 54 Q50 59 57 54" stroke="#1e2a4a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M29 34 Q32 9 52 10 Q70 10 73 34 Q51 28 29 34 Z" fill="#c78945" stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="50" cy="34" rx="29" ry="5.5" fill="#a96b34" stroke="#1e2a4a" strokeWidth="3" />
      <path d="M62 84 L71 91" stroke="#1e2a4a" strokeWidth="4" strokeLinecap="round" />
      <circle cx="77" cy="79" r="10" fill="#d9f5ff" fillOpacity=".85" stroke="#1e2a4a" strokeWidth="3" />
      <circle cx="77" cy="79" r="5.5" fill="none" stroke="#79cce0" strokeWidth="1.5" />
      <line x1="83" y1="86" x2="91" y2="95" stroke="#1e2a4a" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  )
}

export function BirdArt({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M20 54 L4 46 L10 64 Z" fill="#2f7fe0" stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="50" cy="58" rx="32" ry="28" fill="#4fa3ff" stroke="#1e2a4a" strokeWidth="3" />
      <ellipse cx="56" cy="68" rx="20" ry="13" fill="#cfe6ff" />
      <path d="M30 56 Q42 46 52 62 Q40 72 30 56 Z" fill="#2f7fe0" stroke="#1e2a4a" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="64" cy="46" r="8" fill="#fff" stroke="#1e2a4a" strokeWidth="2.5" />
      <circle cx="66" cy="46" r="3.6" fill="#1e2a4a" />
      <path d="M76 50 L94 56 L76 62 Z" fill="#ffb02e" stroke="#1e2a4a" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M60 30 Q64 20 70 28" stroke="#2f7fe0" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M44 84 V92 M56 84 V92" stroke="#ffb02e" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

// Burung pemandu dengan balon ucapan
export function Guide({ children }) {
  return (
    <div className="guide">
      <BirdArt className="guide__bird" />
      <p className="bubble">{children}</p>
    </div>
  )
}

export function Warga({ skin, hair, shirt, className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="#dff3ff" stroke="#1e2a4a" strokeWidth="3" />
      <path d="M18 92 Q18 70 50 70 Q82 70 82 92 A48 48 0 0 1 18 92 Z" fill={shirt} />
      <circle cx="50" cy="46" r="20" fill={skin} stroke="#1e2a4a" strokeWidth="3" />
      <path d="M30 44 Q30 24 50 24 Q70 24 70 44 Q60 34 50 36 Q40 34 30 44 Z" fill={hair} />
      <circle cx="43" cy="48" r="2.4" fill="#1e2a4a" />
      <circle cx="57" cy="48" r="2.4" fill="#1e2a4a" />
      <path d="M44 56 Q50 61 56 56" stroke="#1e2a4a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function Star({ on, className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <polygon
        points="50,6 62,37 95,39 69,60 78,93 50,75 22,93 31,60 5,39 38,37"
        fill={on ? '#ffc83d' : '#d7deea'}
        stroke={on ? '#e39a00' : '#bcc6d8'}
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Lock({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" fill="none" stroke="#1e2a4a" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="4.5" y="11" width="15" height="10" rx="2.5" fill="#ffc83d" stroke="#1e2a4a" strokeWidth="2" />
    </svg>
  )
}

export function Badge({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 120" aria-hidden="true">
      <path d="M30 70 L18 116 L38 106 L50 118 L50 74 Z" fill="#ff6f61" stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M70 70 L82 116 L62 106 L50 118 L50 74 Z" fill="#e5483b" stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="50" cy="44" r="38" fill="#ffc83d" stroke="#1e2a4a" strokeWidth="4" />
      <circle cx="50" cy="44" r="28" fill="#fff3c4" stroke="#e39a00" strokeWidth="3" />
      <polygon
        points="50,22 56,38 74,39 60,50 65,67 50,57 35,67 40,50 26,39 44,38"
        fill="#7a5cff"
        stroke="#1e2a4a"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const PLACES = {
  taman: (
    <g stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round">
      <rect x="20" y="56" width="8" height="30" fill="#8a5628" />
      <circle cx="24" cy="44" r="22" fill="#3fb36b" />
      <rect x="88" y="62" width="7" height="24" fill="#8a5628" />
      <circle cx="91" cy="52" r="16" fill="#56c47e" />
      <rect x="44" y="68" width="32" height="7" rx="2" fill="#ffc83d" />
      <path d="M48 75 V86 M72 75 V86" fill="none" />
    </g>
  ),
  rumah: (
    <g stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round">
      <rect x="26" y="44" width="68" height="44" fill="#ffd9a0" />
      <polygon points="18,46 60,12 102,46" fill="#ff6f61" />
      <rect x="52" y="62" width="16" height="26" fill="#7a5cff" />
      <rect x="32" y="56" width="14" height="14" fill="#bfe7ff" />
      <rect x="74" y="56" width="14" height="14" fill="#bfe7ff" />
    </g>
  ),
  markas: (
    <g stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round">
      <rect x="30" y="24" width="60" height="64" fill="#4a5f9c" />
      <rect x="38" y="34" width="12" height="12" fill="#ffc83d" />
      <rect x="70" y="34" width="12" height="12" fill="#ffc83d" />
      <rect x="38" y="54" width="12" height="12" fill="#ffc83d" />
      <rect x="70" y="54" width="12" height="12" fill="#ffc83d" />
      <rect x="52" y="68" width="16" height="20" fill="#1e2a4a" />
      <circle cx="60" cy="12" r="8" fill="#bfe7ff" />
      <path d="M66 18 L74 26" fill="none" strokeLinecap="round" />
    </g>
  ),
  balai: (
    <g stroke="#1e2a4a" strokeWidth="3" strokeLinejoin="round">
      <rect x="22" y="84" width="76" height="6" fill="#c9d3e0" />
      <rect x="28" y="44" width="64" height="40" fill="#fff" />
      <polygon points="22,46 60,22 98,46" fill="#ffc83d" />
      <path d="M38 50 V84 M52 50 V84 M68 50 V84 M82 50 V84" fill="none" />
      <path d="M60 22 V6" fill="none" />
      <path d="M60 6 L76 11 L60 16 Z" fill="#ff6f61" />
    </g>
  ),
}

export function PlaceArt({ kind, className }) {
  return (
    <svg className={className} viewBox="0 0 120 100" aria-hidden="true">
      {PLACES[kind]}
    </svg>
  )
}