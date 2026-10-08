import { Link, useParams } from 'react-router-dom'
import { CoverArt } from '../components/CoverArt'
import { audienceLabel, formatPrice, getBook, lineLabel } from '../data/books'

export function BookPage() {
  const { slug } = useParams()
  const book = getBook(slug)

  if (!book) {
    return (
      <section className="section">
        <div className="wrap">
          <h1>الكتاب مش موجود</h1>
          <Link className="btn" to="/books">
            ارجع للكتب
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="wrap book-detail">
        <CoverArt book={book} large />
        <div>
          <p className="kicker">
            {lineLabel[book.kind]} · {audienceLabel(book.audience)}
          </p>
          <h1 className="page-title">{book.title}</h1>
          <p className="sub">{book.blurb}</p>
          <p className="price price-lg">من {formatPrice(book.price)}</p>
          <h2>اللي بيتخصص</h2>
          <ul className="plain-list">
            {book.personalizes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="detail-actions">
            <Link className="btn" to={`/books/${book.slug}/personalize`}>
              خصّص
            </Link>
            <Link className="btn btn-ghost" to={`/books/${book.slug}/read`}>
              اقرأ الحكاية
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
