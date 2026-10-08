import { formatPrice } from '../data/books'
import { characterGroups, characters } from '../data/characters'
import { faces } from '../data/faces'
import {
  getStoryStyle,
  PARENT_LIKENESS_PRICE,
  type StoryStyleId,
} from '../data/styles'

const parentFaces = {
  mom: faces.find((face) => face.id === 'laila')?.cartoon,
  dad: faces.find((face) => face.id === 'adam')?.cartoon,
}

export function getParentLikeness(id: string) {
  return id === 'mom' || id === 'dad' ? parentFaces[id] : undefined
}

export function FaslCastPicker({
  selected,
  likenessIds,
  styleId,
  onToggleName,
  onToggleLikeness,
}: {
  selected: string[]
  likenessIds: string[]
  styleId: StoryStyleId
  onToggleName: (id: string) => void
  onToggleLikeness: (id: string) => void
}) {
  const style = getStoryStyle(styleId)

  return (
    <div className="cast fasl-cast">
      {characterGroups.map((group) => (
        <fieldset key={group.id}>
          <legend>{group.label}</legend>
          <div className="cast-list">
            {characters
              .filter((character) => character.group === group.id)
              .map((character) => {
                const selectedName = selected.includes(character.id)
                const selectedLikeness = likenessIds.includes(character.id)
                const isParent = character.group === 'family'
                const face = getParentLikeness(character.id)

                return (
                  <div
                    className={selectedName ? 'fasl-cast-row is-on' : 'fasl-cast-row'}
                    key={character.id}
                  >
                    <button
                      type="button"
                      className="fasl-cast-name"
                      aria-pressed={selectedName}
                      onClick={() => onToggleName(character.id)}
                    >
                      <span>
                        <strong>{character.label}</strong>
                        {isParent && <small>الاسم يدخل الحكاية من غير رسوم</small>}
                      </span>
                      <b>{isParent ? 'مجاني' : `+${formatPrice(character.price)}`}</b>
                    </button>
                    {isParent && selectedName && !style.textOnly && face && (
                      <button
                        type="button"
                        className={selectedLikeness ? 'likeness-choice is-on' : 'likeness-choice'}
                        aria-pressed={selectedLikeness}
                        onClick={() => onToggleLikeness(character.id)}
                      >
                        <img src={face} alt="" />
                        <span>
                          {selectedLikeness ? 'وش مضاف' : `أضف وش ${character.label}`}
                          <small>+{formatPrice(PARENT_LIKENESS_PRICE)}</small>
                        </span>
                      </button>
                    )}
                  </div>
                )
              })}
          </div>
        </fieldset>
      ))}
    </div>
  )
}
