import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BookCard } from '../components/BookCard'
import { Portrait } from '../components/Portrait'
import { books, lineLabel, type Book } from '../data/books'
import { people } from '../data/people'

export function Catalog() {
  const [params, setParams] = useSearchParams()
  const selected = params.get('for')
  const known = selected === 'babies' || selected === 'kids' || selected === 'family'
  const audience = known ? selected : 'all'
  const visible = useMemo(
    () => (audience === 'all' ? books : books.filter((book) => book.audience === audience)),
    [audience],
  )

  return (
    <section className="section">
      <div className="wrap">
        <h1 className="page-title">كل الكتب المخصصة</h1>
        <p className="sub">حكايات عربية تفرّح كل حد بتحبه.</p>
        <h2>بتشتري لمين؟</h2>
        <div className="portrait-row">
          {people.map((person) => {
            const active = person.to.endsWith(audience) && audience !== 'all'
            return (
              <button
                key={person.id}
                type="button"
                className={active ? 'portrait-btn is-on' : 'portrait-btn'}
                onClick={() => setParams(active ? {} : { for: person.to.split('=')[1] })}
              >
                <Portrait image={person.image} label={person.label} />
              </button>
            )
          })}
        </div>
        {audience !== 'all' && (
          <button type="button" className="text-btn" onClick={() => setParams({})}>
            كل الكتب
          </button>
        )}
        <h2>{lineLabel.grammar}</h2>
        <div className="book-grid">
          {visible
            .filter((book) => book.kind === 'grammar')
            .map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
        </div>
        <Shelf title={lineLabel.faces} books={visible.filter((book) => book.kind === 'faces')} />
        {visible.length === 0 && <p>مفيش كتب في القسم ده دلوقتي.</p>}
        <p className="print-note">
          المعاينة دي على جهازك. الطباعة والشحن مش متوصلين في النسخة دي.
          <Link to="/"> ارجع للرئيسية</Link>
        </p>
      </div>
    </section>
  )
}

function Shelf({ title, books: items }: { title: string; books: Book[] }) {
  if (items.length === 0) return null
  return (
    <>
      <h2 className="shelf-title">{title}</h2>
      <p className="sub">تختار وش حقيقي، والحكاية ترسمه كرتون، والصفحات أدق.</p>
      <div className="book-grid">
        {items.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>
    </>
  )
}
