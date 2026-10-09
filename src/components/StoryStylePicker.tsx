import { formatEGP } from '../data/pricing'
import { neutralCopy } from '../data/fasl-copy'
import type { Scene } from '../data/books'
import type { LessonId } from '../data/lessons'
import { storyStyles, type StoryStyleId } from '../data/styles'
import { MiniPage } from './MiniPage'

const cards: Record<StoryStyleId, { mood: string; promise: string; extra: string }> = {
  words: { mood: 'هدوء', promise: 'الكلمات وحدها، على ورق هادئ', extra: 'أسماء فقط' },
  paper: { mood: 'دفء', promise: 'ألوان مائية دافئة، كأنها مرسومة بيد', extra: `يقبل وجه ماما أو بابا، +${formatEGP(90)} لكل وجه` },
  night: { mood: 'سكون', promise: 'حبر كحلي لوقت النوم', extra: `يقبل وجه ماما أو بابا، +${formatEGP(90)} لكل وجه` },
}

export function StoryStylePicker({
  selected,
  scene,
  text,
  name,
  lessonId,
  onSelect,
  onPreview,
}: {
  selected: StoryStyleId
  scene: Scene
  text: string
  name: string
  lessonId: LessonId
  onSelect: (id: StoryStyleId) => void
  onPreview?: (id: StoryStyleId | null) => void
}) {
  function hoverable() {
    return typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
  }

  function move(current: StoryStyleId, direction: 1 | -1) {
    const index = storyStyles.findIndex((style) => style.id === current)
    const next = storyStyles[(index + direction + storyStyles.length) % storyStyles.length]
    onSelect(next.id)
    document.getElementById(`style-${next.id}`)?.focus()
  }

  return (
    <div
      className="style-grid"
      role="radiogroup"
      aria-label="اختار أسلوب رسم الحكاية"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
          event.preventDefault()
          move(selected, 1)
        }
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
          event.preventDefault()
          move(selected, -1)
        }
      }}
    >
      {storyStyles.map((style) => {
        const active = style.id === selected
        const card = cards[style.id]
        return (
          <button
            key={style.id}
            id={`style-${style.id}`}
            type="button"
            role="radio"
            aria-checked={active}
            data-style={style.id}
            className={active ? 'style-card is-on' : 'style-card'}
            onMouseEnter={() => hoverable() && onPreview?.(style.id)}
            onMouseLeave={() => hoverable() && onPreview?.(null)}
            onClick={() => {
              onPreview?.(null)
              onSelect(style.id)
            }}
          >
            <span className="style-mini">
              <MiniPage styleId={style.id} scene={scene} text={text} name={name} lessonId={lessonId} />
            </span>
            <span className="style-card-copy">
              <strong>{style.title}</strong>
              <span>{card.mood}</span>
              <small>{card.promise}</small>
              <small>{card.extra}</small>
              <small className="style-pin">{neutralCopy.namesFree}</small>
            </span>
          </button>
        )
      })}
    </div>
  )
}
