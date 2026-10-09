import { byline } from '../data/fasl-copy'
import type { ParentRole } from '../data/draft'
import { getLesson, type LessonId } from '../data/lessons'

export function BookCover({
  name,
  lessonId,
  dedication,
  role,
}: {
  name: string
  lessonId: LessonId
  dedication: string
  role: ParentRole
}) {
  const lesson = getLesson(lessonId)
  return (
    <div className="book-object">
      <div className="book-spine" aria-hidden="true" />
      <div className="book-front">
        <p>{lesson?.title}</p>
        <strong>{name}</strong>
        {dedication && <q>{dedication}</q>}
        <small>{byline(name, role)}</small>
      </div>
    </div>
  )
}
