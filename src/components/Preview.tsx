import { Link } from 'react-router-dom'
import { lineText, type Book, type Gender } from '../data/books'
import { PageArt } from './PageArt'

type PreviewProps = {
  book: Book
  name: string
  gender: Gender
  message: string
  cartoon?: string
  castNote?: string
}

export function Preview({ book, name, gender, message, cartoon, castNote }: PreviewProps) {
  const story = lineText(book.pages[0], gender, name)

  return (
    <div className="preview" aria-live="polite">
      <p className="preview-label">معاينة مباشرة · {gender === 'boy' ? 'صيغة الولد' : 'صيغة البنت'}</p>
      <article className="plate preview-plate">
        <PageArt scene={book.pages[0].scene} cover={book.cover} ink={book.ink} face={cartoon} />
        <p className="plate-caption">{castNote ? `${story} ${castNote}` : story}</p>
      </article>
      {message.trim() && <p className="preview-note">{message.trim()}</p>}
      <Link className="text-btn" to={`/books/${book.slug}/read`}>
        اقرأ الحكاية كاملة
      </Link>
    </div>
  )
}
