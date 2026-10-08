import type { Scene } from '../data/books'
import { PARENT_LIKENESS_PRICE, storyStyles, type StoryStyleId } from '../data/styles'
import { PageArt } from './PageArt'

export function StoryStylePicker({
  selected,
  scene,
  text,
  onSelect,
}: {
  selected: StoryStyleId
  scene: Scene
  text: string
  onSelect: (id: StoryStyleId) => void
}) {
  return (
    <div className="style-grid" aria-label="اختار أسلوب رسم الحكاية">
      {storyStyles.map((style) => {
        const active = style.id === selected
        return (
          <button
            key={style.id}
            type="button"
            className={active ? 'style-card is-on' : 'style-card'}
            aria-pressed={active}
            onClick={() => onSelect(style.id)}
          >
            <span className={style.textOnly ? 'style-mini is-words' : 'style-mini'}>
              {style.textOnly ? (
                <span className="style-mini-text">{text}</span>
              ) : (
                <PageArt scene={scene} cover={style.cover} ink={style.ink} />
              )}
            </span>
            <span className="style-card-copy">
              <strong>{style.title}</strong>
              <span>{style.note}</span>
              <small>{style.detail}</small>
              {!style.textOnly && (
                <small className="style-fee">
                  وش ماما أو بابا اختياري · +{PARENT_LIKENESS_PRICE} ج.م
                </small>
              )}
            </span>
            <span className="style-check" aria-hidden="true">
              {active ? '✓' : ''}
            </span>
          </button>
        )
      })}
    </div>
  )
}
