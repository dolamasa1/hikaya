import type { ReactNode } from 'react'
import type { Scene } from '../data/books'

const paper = '#f6f1e7'
const cream = '#fffdf8'

function Sky({ cover }: { cover: string }) {
  return <rect width="300" height="400" fill={cover} />
}

function Ground({ ink }: { ink: string }) {
  return (
    <g>
      <path d="M0 268c40 18 80-8 130 4s90 22 170-6v134H0Z" fill={paper} />
      <path d="M0 286c50 10 90-12 150 2s80 16 150-8" fill="none" stroke={ink} strokeOpacity="0.18" strokeWidth="3" />
    </g>
  )
}

function Night({ ink }: { ink: string }) {
  return (
    <g>
      <rect width="300" height="400" fill={ink} />
      <circle cx="48" cy="54" r="1.6" fill={paper} />
      <circle cx="90" cy="36" r="1.2" fill={paper} />
      <circle cx="210" cy="48" r="1.4" fill={paper} />
      <circle cx="250" cy="78" r="1" fill={paper} />
      <circle cx="168" cy="28" r="1.3" fill={paper} />
    </g>
  )
}

function Moon({ cx, cy, r, cut }: { cx: number; cy: number; r: number; cut: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#f4efe6" />
      <circle cx={cx + r * 0.28} cy={cy - r * 0.12} r={r * 0.82} fill={cut} />
    </g>
  )
}

function Sun() {
  return (
    <g>
      <circle cx="236" cy="68" r="28" fill="#f6e2a8" />
      <circle cx="236" cy="68" r="16" fill="#fff6d4" />
    </g>
  )
}

function House({ ink, x = 78 }: { ink: string; x?: number | string }) {
  const left = Number(x)
  return (
    <g>
      <path d={`M${left} 214 L${left + 72} 168 L${left + 144} 214 V300 H${left} Z`} fill={cream} stroke={ink} strokeWidth="3" />
      <rect x={left + 58} y="236" width="28" height="40" fill={ink} />
      <rect x={left + 22} y="228" width="22" height="18" fill="#f6e2a8" stroke={ink} strokeWidth="2" />
      <rect x={left + 100} y="228" width="22" height="18" fill="#f6e2a8" stroke={ink} strokeWidth="2" />
    </g>
  )
}

function Child({ ink, x = 150, hideHead = false }: { ink: string; x?: number | string; hideHead?: boolean }) {
  const cx = Number(x)
  return (
    <g>
      {!hideHead && <circle cx={cx} cy="168" r="28" fill={cream} stroke={ink} strokeWidth="3" />}
      <path d={`M${cx - 24} 200 h48 c6 34 2 72 -24 78 c-26 -6 -30 -44 -24 -78z`} fill={ink} />
      <path
        d={`M${cx - 20} 214c-16 12-20 30-12 44M${cx + 20} 214c16 12 20 30 12 44`}
        fill="none"
        stroke={ink}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </g>
  )
}

function Grown({ ink, x }: { ink: string; x: number | string }) {
  const cx = Number(x)
  return (
    <g>
      <circle cx={cx} cy="150" r="22" fill={cream} stroke={ink} strokeWidth="3" />
      <path d={`M${cx - 22} 176 h44 c4 40 2 86 -22 92 c-24 -6 -26 -52 -22 -92z`} fill={ink} opacity="0.82" />
    </g>
  )
}

function Balloon({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="16" ry="20" fill={color} />
      <path d={`M${cx} ${cy + 20} q6 16 -2 28`} fill="none" stroke="#1c1b19" strokeWidth="1.4" />
    </g>
  )
}

function sceneArt(scene: Scene, cover: string, ink: string): ReactNode {
  switch (scene) {
    case 'cover':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <House ink={ink} />
          <Sun />
        </g>
      )
    case 'dedication':
      return (
        <g>
          <rect width="300" height="400" fill={cream} />
          <rect x="36" y="48" width="228" height="250" rx="8" fill={cover} />
          <path d="M150 78c28 22 48 22 76 0-8 48-28 78-76 108-48-30-68-60-76-108 28 22 48 22 76 0z" fill={paper} />
          <path d="M70 250h160M86 268h128" stroke={ink} strokeOpacity="0.35" strokeWidth="3" />
        </g>
      )
    case 'house-wait':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <House ink={ink} x="70" />
          <circle cx="230" cy="250" r="10" fill={ink} opacity="0.25" />
        </g>
      )
    case 'morning-window':
      return (
        <g>
          <Sky cover={cover} />
          <Sun />
          <Ground ink={ink} />
          <House ink={ink} />
          <path d="M118 228h22M129 220v26" stroke={ink} strokeWidth="2" />
        </g>
      )
    case 'welcome-hands':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <Grown ink={ink} x="86" />
          <Child ink={ink} />
          <path d="M104 214c18 10 28 8 46 0" fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" />
        </g>
      )
    case 'sleep-tiptoe':
      return (
        <g>
          <rect width="300" height="400" fill="#2a241c" />
          <circle cx="214" cy="70" r="26" fill="#f4efe6" opacity="0.85" />
          <rect x="70" y="210" width="160" height="70" rx="16" fill={cream} />
          <circle cx="118" cy="236" r="16" fill={cover} />
          <path d="M210 248c8 18 6 30-8 34" fill="none" stroke={paper} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        </g>
      )
    case 'toys':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <rect x="48" y="150" width="70" height="120" fill={ink} />
          <rect x="58" y="168" width="50" height="14" fill={cover} />
          <rect x="58" y="190" width="50" height="14" fill={paper} />
          <circle cx="190" cy="230" r="22" fill="#c45c26" />
          <rect x="214" y="210" width="28" height="36" rx="4" fill={cream} stroke={ink} strokeWidth="2" />
        </g>
      )
    case 'first-word':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <House ink={ink} x="40" />
          <Child ink={ink} x="210" />
        </g>
      )
    case 'hands':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <Child ink={ink} x="108" />
          <Grown ink={ink} x="198" />
          <path d="M128 220c20 12 36 12 58 0" fill="none" stroke={ink} strokeWidth="7" strokeLinecap="round" />
        </g>
      )
    case 'apples':
      return (
        <g>
          <Sky cover={cover} />
          <rect x="40" y="168" width="220" height="90" rx="8" fill={cream} stroke={ink} strokeWidth="3" />
          <circle cx="110" cy="150" r="16" fill="#c4483a" />
          <circle cx="150" cy="142" r="16" fill="#c4483a" />
          <circle cx="190" cy="152" r="16" fill="#d7e3c8" stroke={ink} strokeWidth="2" />
          <Child ink={ink} x="78" />
        </g>
      )
    case 'pillows':
      return (
        <g>
          <rect width="300" height="400" fill={cover} />
          <rect x="48" y="150" width="90" height="64" rx="18" fill="#7aa0c4" />
          <rect x="156" y="164" width="96" height="64" rx="18" fill="#c4483a" />
          <Child ink={ink} x="92" />
        </g>
      )
    case 'playhouse':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <path d="M70 250 L150 170 L230 250 V310 H70Z" fill={paper} stroke={ink} strokeWidth="3" />
          <rect x="132" y="250" width="36" height="60" fill={ink} />
          <Child ink={ink} x="150" />
        </g>
      )
    case 'rebuild':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <path d="M60 280 L120 240 L150 300" fill="none" stroke={ink} strokeWidth="8" strokeLinecap="round" />
          <path d="M150 300 L200 220 L250 290" fill="none" stroke={ink} strokeWidth="8" strokeLinecap="round" />
          <Child ink={ink} x="150" />
        </g>
      )
    case 'still-holding':
      return (
        <g>
          <rect width="300" height="400" fill="#243028" />
          <circle cx="230" cy="64" r="22" fill="#f4efe6" opacity="0.8" />
          <Ground ink={paper} />
          <Child ink={ink} x="118" />
          <Grown ink={ink} x="196" />
          <path d="M136 220c18 8 34 8 52 0" fill="none" stroke={paper} strokeWidth="6" strokeLinecap="round" />
        </g>
      )
    case 'search':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <House ink={ink} />
          <circle cx="214" cy="188" r="26" fill="none" stroke={ink} strokeWidth="6" />
          <path d="M232 208l18 22" stroke={ink} strokeWidth="6" strokeLinecap="round" />
        </g>
      )
    case 'kitchen-empty':
      return (
        <g>
          <rect width="300" height="400" fill={cover} />
          <rect x="36" y="120" width="228" height="160" rx="6" fill={cream} />
          <rect x="56" y="148" width="70" height="50" fill={ink} opacity="0.15" />
          <circle cx="190" cy="176" r="18" fill="none" stroke={ink} strokeWidth="3" />
        </g>
      )
    case 'curtain':
      return (
        <g>
          <rect width="300" height="400" fill="#efe6d6" />
          <path d="M70 40c30 80 20 180 8 280h40c8-90 28-180 8-280z" fill={cover} />
          <path d="M150 40c36 70 18 170 6 280h48c10-100 30-190 4-280z" fill={ink} opacity="0.85" />
          <Child ink={ink} x="118" />
        </g>
      )
    case 'cat':
      return (
        <g>
          <Sky cover={cover} />
          <rect x="40" y="188" width="220" height="16" fill={ink} />
          <rect x="58" y="204" width="12" height="70" fill={ink} />
          <rect x="230" y="204" width="12" height="70" fill={ink} />
          <ellipse cx="150" cy="250" rx="36" ry="18" fill="#c47a3a" />
          <circle cx="122" cy="242" r="8" fill="#c47a3a" />
          <path d="M186 248c16 4 22 2 28-6" stroke={ink} strokeWidth="3" fill="none" />
        </g>
      )
    case 'door-hug':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <rect x="96" y="120" width="108" height="180" rx="4" fill={cream} stroke={ink} strokeWidth="3" />
          <circle cx="184" cy="210" r="4" fill={ink} />
          <Child ink={ink} x="150" />
        </g>
      )
    case 'found':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <Grown ink={ink} x="108" />
          <Child ink={ink} x="168" />
          <path d="M124 200c16 20 28 22 48 4" fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" />
        </g>
      )
    case 'eid-lights':
      return (
        <g>
          <Night ink="#1d2430" />
          <Moon cx={210} cy={78} r={34} cut="#1d2430" />
          <path d="M40 120c30 16 50-10 80 6s50-8 80 8 50 4 70-6" fill="none" stroke="#f0d48a" strokeWidth="3" />
          <circle cx="70" cy="132" r="5" fill="#f0d48a" />
          <circle cx="140" cy="118" r="5" fill="#f0d48a" />
          <circle cx="210" cy="130" r="5" fill="#f0d48a" />
          <House ink={paper} x="78" />
        </g>
      )
    case 'kahk':
      return (
        <g>
          <rect width="300" height="400" fill="#f3e2c4" />
          <ellipse cx="150" cy="210" rx="70" ry="28" fill="#e2b56a" stroke={ink} strokeWidth="3" />
          <ellipse cx="150" cy="196" rx="46" ry="16" fill="#f0d48a" />
          <path d="M150 150c8-24 8-24 0-40" stroke={ink} strokeOpacity="0.35" strokeWidth="3" fill="none" />
          <Child ink={ink} x="78" />
        </g>
      )
    case 'new-clothes':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <Child ink={ink} />
          <path d="M126 214c-22 20-18 48-6 62M174 214c22 20 18 48 6 62" fill="none" stroke={paper} strokeWidth="10" strokeLinecap="round" />
        </g>
      )
    case 'gift':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <rect x="118" y="188" width="64" height="52" fill="#c4483a" />
          <path d="M150 188v52M118 210h64" stroke="#f0d48a" strokeWidth="6" />
          <path d="M150 188c-14-18-28-6-14 4 12-16 28-8 14-4z" fill="#f0d48a" />
          <Child ink={ink} x="86" />
        </g>
      )
    case 'eid-said':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <Grown ink={ink} x="70" />
          <Child ink={ink} />
          <Grown ink={ink} x="230" />
          <circle cx="150" cy="78" r="16" fill="#f0d48a" />
        </g>
      )
    case 'sleep-gift':
      return (
        <g>
          <rect width="300" height="400" fill="#2c2418" />
          <circle cx="230" cy="60" r="18" fill="#f0d48a" opacity="0.7" />
          <rect x="64" y="200" width="150" height="64" rx="16" fill={cream} />
          <rect x="176" y="214" width="36" height="28" fill="#c4483a" />
          <path d="M194 214v28M176 226h36" stroke="#f0d48a" strokeWidth="3" />
        </g>
      )
    case 'roof':
      return (
        <g>
          <Night ink={cover} />
          <Moon cx={220} cy={70} r={28} cut={cover} />
          <path d="M20 230h260l-30 50H50z" fill="#3d4c5c" />
          <Child ink={paper} x="150" hideHead />
          <circle cx="150" cy="168" r="30" fill={cream} />
        </g>
      )
    case 'moon-reach':
      return (
        <g>
          <Night ink={cover} />
          <Moon cx={168} cy={92} r={54} cut={cover} />
          <Child ink={paper} x="150" hideHead />
          <circle cx="150" cy="200" r="30" fill={cream} />
          <path d="M168 214c10-28 8-48 0-70" stroke={paper} strokeWidth="7" strokeLinecap="round" />
        </g>
      )
    case 'lanterns':
      return (
        <g>
          <Night ink={cover} />
          <path d="M40 90h220" stroke="#f0d48a" strokeWidth="2" />
          <rect x="70" y="98" width="22" height="30" rx="4" fill="#f0d48a" />
          <rect x="140" y="98" width="22" height="30" rx="4" fill="#f0d48a" />
          <rect x="210" y="98" width="22" height="30" rx="4" fill="#f0d48a" />
          <Child ink={paper} x="150" hideHead />
          <circle cx="150" cy="190" r="30" fill={cream} />
        </g>
      )
    case 'moon-step':
      return (
        <g>
          <Night ink={cover} />
          <Moon cx={150} cy={150} r={40} cut={cover} />
          <Child ink={paper} x="210" hideHead />
          <circle cx="210" cy="220" r="26" fill={cream} />
        </g>
      )
    case 'i-see-you':
      return (
        <g>
          <Night ink={cover} />
          <Moon cx={188} cy={120} r={46} cut={cover} />
          <Child ink={paper} x="112" hideHead />
          <circle cx="112" cy="190" r="30" fill={cream} />
        </g>
      )
    case 'pocket-light':
      return (
        <g>
          <Night ink={cover} />
          <path d="M40 250h220v80H40z" fill="#3a4654" />
          <Child ink={paper} x="150" hideHead />
          <circle cx="150" cy="188" r="30" fill={cream} />
          <circle cx="168" cy="230" r="10" fill="#f4efe6" />
        </g>
      )
    case 'market-enter':
      return (
        <g>
          <Sky cover={cover} />
          <path d="M30 150h240v18H30z" fill={ink} />
          <path d="M40 168h50v90H40zM110 168h50v90h-50zM180 168h70v90h-70z" fill={cream} />
          <Child ink={ink} x="120" />
          <Grown ink={ink} x="190" />
        </g>
      )
    case 'spices':
      return (
        <g>
          <rect width="300" height="400" fill="#f4e2c8" />
          <rect x="48" y="150" width="36" height="70" fill="#c45c26" />
          <rect x="96" y="138" width="36" height="82" fill="#e2b56a" />
          <rect x="144" y="156" width="36" height="64" fill="#6d2438" />
          <rect x="192" y="144" width="36" height="76" fill="#12382f" />
          <Child ink={ink} x="150" />
        </g>
      )
    case 'count-balloons':
      return (
        <g>
          <Sky cover={cover} />
          <Balloon cx={90} cy={110} color="#c4483a" />
          <Balloon cx={150} cy={90} color="#f0d48a" />
          <Balloon cx={210} cy={116} color="#2f6b45" />
          <Child ink={ink} />
        </g>
      )
    case 'red-balloon':
      return (
        <g>
          <Sky cover={cover} />
          <Balloon cx={168} cy={100} color="#c4483a" />
          <path d="M168 148c-8 30-6 50-16 70" fill="none" stroke={ink} strokeWidth="2" />
          <Child ink={ink} x="130" />
        </g>
      )
    case 'crowd':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <Grown ink={ink} x="70" />
          <Grown ink={ink} x="230" />
          <Child ink={ink} />
          <path d="M168 214c14 6 28 4 40-4" fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" />
        </g>
      )
    case 'home-balloon':
      return (
        <g>
          <Sky cover={cover} />
          <Ground ink={ink} />
          <House ink={ink} x="36" />
          <Child ink={ink} x="210" />
          <Balloon cx={228} cy={96} color="#c4483a" />
        </g>
      )
    default:
      return <Sky cover={cover} />
  }
}

const heads: Partial<Record<Scene, { x: number; y: number }>> = {
  'welcome-hands': { x: 150, y: 168 },
  'first-word': { x: 210, y: 168 },
  hands: { x: 108, y: 168 },
  apples: { x: 78, y: 168 },
  pillows: { x: 92, y: 168 },
  playhouse: { x: 150, y: 168 },
  rebuild: { x: 150, y: 168 },
  'still-holding': { x: 118, y: 168 },
  curtain: { x: 118, y: 168 },
  'door-hug': { x: 150, y: 168 },
  found: { x: 168, y: 168 },
  kahk: { x: 78, y: 168 },
  'new-clothes': { x: 150, y: 168 },
  gift: { x: 86, y: 168 },
  'eid-said': { x: 150, y: 168 },
  roof: { x: 150, y: 168 },
  'moon-reach': { x: 150, y: 200 },
  lanterns: { x: 150, y: 190 },
  'moon-step': { x: 210, y: 220 },
  'i-see-you': { x: 112, y: 190 },
  'pocket-light': { x: 150, y: 188 },
  'market-enter': { x: 120, y: 168 },
  spices: { x: 150, y: 168 },
  'count-balloons': { x: 150, y: 168 },
  'red-balloon': { x: 130, y: 168 },
  crowd: { x: 150, y: 168 },
  'home-balloon': { x: 210, y: 168 },
}

export function PageArt({
  scene,
  cover,
  ink,
  face,
  compact = false,
}: {
  scene: Scene
  cover: string
  ink: string
  face?: string
  compact?: boolean
}) {
  const head = face ? heads[scene] : undefined

  return (
    <div className={compact ? 'plate-art is-compact' : 'plate-art'}>
      <svg viewBox="0 0 300 400" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        {sceneArt(scene, cover, ink)}
      </svg>
      {head && face && (
        <img
          className="plate-face"
          src={face}
          alt=""
          style={{
            left: `${((head.x - 30) / 300) * 100}%`,
            top: `${((head.y - 30) / 400) * 100}%`,
          }}
        />
      )}
    </div>
  )
}
