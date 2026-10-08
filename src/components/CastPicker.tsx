import { formatPrice } from '../data/books'
import { characterGroups, characters, CHARACTER_PRICE } from '../data/characters'

export function CastPicker({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) {
  return (
    <div className="cast">
      {characterGroups.map((group) => (
        <fieldset key={group.id}>
          <legend>{group.label}</legend>
          <div className="cast-list">
            {characters
              .filter((item) => item.group === group.id)
              .map((item) => {
                const on = selected.includes(item.id)
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={on ? 'cast-row is-on' : 'cast-row'}
                    aria-pressed={on}
                    onClick={() => onToggle(item.id)}
                  >
                    <span>{item.label}</span>
                    <span>+{formatPrice(CHARACTER_PRICE)}</span>
                  </button>
                )
              })}
          </div>
        </fieldset>
      ))}
    </div>
  )
}

export function PriceTotal({ base, extras }: { base: number; extras: number }) {
  return (
    <p className="price-total">
      <span>المجموع</span>
      <strong>{formatPrice(base + extras)}</strong>
    </p>
  )
}
