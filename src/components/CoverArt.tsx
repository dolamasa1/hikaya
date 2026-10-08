import type { Book } from '../data/books'

export function CoverArt({ book, large = false }: { book: Book; large?: boolean }) {
  return (
    <div className={large ? 'cover-frame is-large' : 'cover-frame'}>
      <img src={book.image} alt={book.title} />
    </div>
  )
}
