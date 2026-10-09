import { formatPrice } from '../data/books'
import { characters } from '../data/characters'
import { hiddenFaceMessage, neutralCopy } from '../data/fasl-copy'
import { getParentLikeness } from '../data/likeness'
import { DEDICATION_MAX } from '../data/notes'
import { formatEGP, type FaceParent } from '../data/pricing'
import { getStoryStyle, type StoryStyleId } from '../data/styles'

export function FaslCastPicker({
  momName,
  dadName,
  animals,
  likenessIds,
  styleId,
  dedication,
  childName,
  onMomName,
  onDadName,
  onToggleAnimal,
  onToggleLikeness,
  onDedication,
}: {
  momName: string
  dadName: string
  animals: string[]
  likenessIds: FaceParent[]
  styleId: StoryStyleId
  dedication: string
  childName: string
  onMomName: (value: string) => void
  onDadName: (value: string) => void
  onToggleAnimal: (id: string) => void
  onToggleLikeness: (id: FaceParent) => void
  onDedication: (value: string) => void
}) {
  const style = getStoryStyle(styleId)
  const drawn = !style.textOnly
  const hidden = style.textOnly ? hiddenFaceMessage(likenessIds) : ''

  return (
    <div className="cast fasl-cast">
      <label className="field">
        ماما
        <input value={momName} onChange={(event) => onMomName(event.target.value)} />
        <small>مجاني</small>
      </label>
      <label className="field">
        بابا
        <input value={dadName} onChange={(event) => onDadName(event.target.value)} />
        <small>مجاني</small>
      </label>
      <fieldset>
        <legend>الحيوانات</legend>
        <div className="cast-list">
          {characters
            .filter((character) => character.group === 'animals')
            .map((character) => {
              const on = animals.includes(character.id)
              return (
                <button
                  key={character.id}
                  type="button"
                  className={on ? 'fasl-cast-name is-on' : 'fasl-cast-name'}
                  aria-pressed={on}
                  onClick={() => onToggleAnimal(character.id)}
                >
                  <strong>{character.label}</strong>
                  <b>+{formatPrice(character.price)}</b>
                </button>
              )
            })}
        </div>
      </fieldset>
      {drawn && (
        <fieldset>
          <legend>الوجوه</legend>
          {(['mom', 'dad'] as const).map((id) => {
            const on = likenessIds.includes(id)
            const face = getParentLikeness(id)
            return (
              <button
                key={id}
                type="button"
                className={on ? 'likeness-choice is-on' : 'likeness-choice'}
                aria-pressed={on}
                onClick={() => onToggleLikeness(id)}
              >
                {face && <img src={face} alt="" />}
                <span>
                  {on ? 'وش مضاف' : `أضف وش ${id === 'mom' ? 'ماما' : 'بابا'}`}
                  <small>+{formatEGP(90)}</small>
                </span>
              </button>
            )
          })}
        </fieldset>
      )}
      {hidden && <p className="sub">{hidden}</p>}
      <label className="field">
        {neutralCopy.dedication.replace('{الاسم}', childName.trim() || 'طفلك')}
        <textarea maxLength={DEDICATION_MAX} value={dedication} onChange={(event) => onDedication(event.target.value)} />
      </label>
    </div>
  )
}
