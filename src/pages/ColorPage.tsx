import { useState } from 'react'
import { faces } from '../data/faces'

const colors = [
  '#e23d3d',
  '#f08a24',
  '#f2c14e',
  '#3aa56b',
  '#2f6fed',
  '#7a4cc2',
  '#e56aa8',
  '#c68642',
  '#f3d2b5',
  '#8d5524',
  '#1c1915',
  '#fffdf8',
]

type Part = 'bg' | 'hair' | 'skin' | 'top' | 'bottom'

type Fills = Record<Part, string>

const blank: Fills = {
  bg: '#f6f1e7',
  hair: '#fffdf8',
  skin: '#fffdf8',
  top: '#fffdf8',
  bottom: '#fffdf8',
}

export function ColorPage() {
  const [who, setWho] = useState(faces[0].id)
  const [paint, setPaint] = useState(colors[4])
  const [sheets, setSheets] = useState<Record<string, Fills>>({
    adam: { ...blank },
    laila: { ...blank },
  })
  const fills = sheets[who] ?? blank

  function color(part: Part) {
    setSheets((current) => ({
      ...current,
      [who]: { ...(current[who] ?? blank), [part]: paint },
    }))
  }

  return (
    <section className="section">
      <div className="wrap color-page">
        <div>
          <p className="kicker">تلوين</p>
          <h1 className="page-title">لوّن نفسك</h1>
          <p className="sub">اختار النسخة الكرتون، وبعدين لون الشعر والوش والهدوم.</p>
          <div className="face-grid">
            {faces.map((face) => (
              <button
                key={face.id}
                type="button"
                className={who === face.id ? 'face-pick is-on' : 'face-pick'}
                onClick={() => setWho(face.id)}
              >
                <img src={face.cartoon} alt="" />
                <span>{face.label}</span>
              </button>
            ))}
          </div>
          <div className="swatches color-palette" role="listbox" aria-label="الألوان">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className={paint === color ? 'swatch is-on' : 'swatch'}
                style={{ background: color }}
                aria-label={color}
                aria-pressed={paint === color}
                onClick={() => setPaint(color)}
              />
            ))}
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setSheets((current) => ({ ...current, [who]: { ...blank } }))}
          >
            امسح التلوين
          </button>
        </div>
        <ColoringKid hair={who === 'laila' ? 'curls' : 'short'} fills={fills} onPaint={color} />
      </div>
    </section>
  )
}

function ColoringKid({
  hair,
  fills,
  onPaint,
}: {
  hair: 'short' | 'curls'
  fills: Fills
  onPaint: (part: Part) => void
}) {
  const area = (part: Part) => ({
    fill: fills[part],
    stroke: '#1c1915',
    strokeWidth: 2.5,
    onClick: () => onPaint(part),
    style: { cursor: 'pointer' },
  })

  return (
    <svg className="coloring" viewBox="0 0 220 300" role="img" aria-label="رسمة للتلوين">
      <rect x="4" y="4" width="212" height="292" rx="16" {...area('bg')} />
      <path d="M70 168c2 70 18 110 40 110s38-40 40-110c-18 16-62 16-80 0z" {...area('bottom')} />
      <path d="M58 150c8 48 22 70 52 70s44-22 52-70c-20 18-84 18-104 0z" {...area('top')} />
      <circle cx="110" cy="108" r="48" {...area('skin')} />
      {hair === 'short' ? (
        <path d="M64 104c4-46 28-62 46-62s42 16 46 62c-14-22-78-22-92 0z" {...area('hair')} />
      ) : (
        <g {...area('hair')}>
          <circle cx="70" cy="78" r="18" />
          <circle cx="96" cy="58" r="20" />
          <circle cx="126" cy="58" r="20" />
          <circle cx="152" cy="80" r="18" />
          <circle cx="78" cy="104" r="14" />
          <circle cx="142" cy="104" r="14" />
        </g>
      )}
      <circle cx="94" cy="108" r="4" fill="#1c1915" />
      <circle cx="126" cy="108" r="4" fill="#1c1915" />
      <path d="M98 126c8 8 16 8 24 0" fill="none" stroke="#1c1915" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
