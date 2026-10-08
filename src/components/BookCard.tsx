import { Link } from 'react-router-dom'
import { formatPrice, lineLabel, type Book } from '../data/books'

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="book-card">
      <Link to={`/books/${book.slug}`} className="cover-link">
        <img src={book.image} alt={book.title} />
      </Link>
      <p className="line-tag">{lineLabel[book.kind]}</p>
      <h3>
        <Link to={`/books/${book.slug}`}>{book.title}</Link>
      </h3>
      <p>{book.blurb}</p>
      <p className="price">من {formatPrice(book.price)}</p>
      <Link className="btn" to={`/books/${book.slug}/personalize`}>
        خصّص
      </Link>
    </article>
  )
}
