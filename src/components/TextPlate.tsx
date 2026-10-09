import { neutralCopy } from '../data/fasl-copy'
import type { LessonId } from '../data/lessons'
import { LessonMotif } from './LessonMotif'

export function TextPlate({
  name,
  text,
  lessonId,
  compact = false,
}: {
  name: string
  text: string
  lessonId: LessonId
  compact?: boolean
}) {
  return (
    <div className={compact ? 'text-plate is-compact' : 'text-plate'}>
      <p className="quiet-edition">{neutralCopy.quietEdition}</p>
      <strong className="text-plate-name">{name}</strong>
      <span className="text-rule" aria-hidden="true" />
      <LessonMotif lessonId={lessonId} stage={4} />
      <p className="text-plate-copy">{text}</p>
    </div>
  )
}
