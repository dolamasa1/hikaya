import { useEffect, useState } from 'react'
import type { ThemeId } from '../data/theme'

const stars = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  cx: 8 + ((index * 37) % 90),
  cy: 6 + ((index * 19) % 70),
  r: index % 4 === 0 ? 1.4 : 0.8,
  delay: `${(index % 8) * 0.4}s`,
}))

export function AmbientBackdrop({
  theme,
  stepIndex,
  mark = '',
  reducedMotion,
}: {
  theme: ThemeId
  stepIndex: number
  mark?: string
  reducedMotion?: boolean
}) {
  const [paused, setPaused] = useState(false)
  const [quiet, setQuiet] = useState(reducedMotion ?? false)

  useEffect(() => {
    if (reducedMotion) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setQuiet(media.matches)
    apply()
    media.addEventListener('change', apply)
    const onHide = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onHide)
    return () => {
      media.removeEventListener('change', apply)
      document.removeEventListener('visibilitychange', onHide)
    }
  }, [reducedMotion])

  const still = reducedMotion || quiet
  const moon = Math.max(0, Math.min(1, stepIndex / 7))
  const moonTop = 8 + (1 - moon) * 28

  return (
    <div className={still ? 'ambient is-static' : 'ambient'} data-motion={still ? 'off' : 'on'} data-paused={paused ? 'true' : 'false'} aria-hidden="true">
      {theme === 'paper' && (
        <div className="ambient-washes">
          <i />
          <i />
          <i />
        </div>
      )}
      {theme === 'night' && (
        <svg className="ambient-sky" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <clipPath id="moon-fill">
              <rect x="64" y={moonTop} width="28" height={28 * moon} />
            </clipPath>
          </defs>
          {stars.map((star) => (
            <circle key={star.id} className="ambient-star" cx={star.cx} cy={star.cy} r={star.r} style={still ? undefined : { animationDelay: star.delay }} />
          ))}
          <circle className="ambient-moon-ring" cx="78" cy="22" r="14" />
          <circle className="ambient-moon" cx="78" cy="22" r="14" clipPath="url(#moon-fill)" />
        </svg>
      )}
      {theme === 'text' && (
        <svg key={mark} className="ambient-rules" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className={still ? 'is-drawn' : 'is-drawing'} d="M8 18 H92" pathLength={100} strokeDasharray={100} />
          <path className={still ? 'is-drawn' : 'is-drawing'} d="M8 82 H92" pathLength={100} strokeDasharray={100} />
        </svg>
      )}
    </div>
  )
}
