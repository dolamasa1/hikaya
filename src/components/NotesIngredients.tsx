import { plateLikes, type LikeItem } from '../data/notes'

export function NotesIngredients({ likes }: { likes: readonly LikeItem[] }) {
  const shown = plateLikes(likes)
  if (shown.length === 0) return null
  return (
    <ul className="ingredients" aria-hidden="true">
      {shown.map((item) => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  )
}
