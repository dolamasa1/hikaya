import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageArt } from '../components/PageArt'
import { faces } from '../data/faces'
import { getBook, lineText, type Gender, type Scene } from '../data/books'
import { companionLine } from '../data/lessons'
import { loadRead, saveRead } from '../data/readState'

type Plate = { scene: Scene; text: string; photo?: string }

export function Read() {
  const { slug } = useParams()
  const book = getBook(slug)
  const saved = loadRead(slug ?? '')
  const [name, setName] = useState(saved.name)
  const [gender, setGender] = useState<Gender>(saved.gender)
  const [faceId, setFaceId] = useState(saved.faceId)
  const [message] = useState(saved.message)
  const [page, setPage] = useState(saved.page)
  const [turn, setTurn] = useState<'next' | 'prev' | ''>('')
  const [tune, setTune] = useState(false)
  const [coverFailed, setCoverFailed] = useState(false)
  const pointer = useRef<{ x: number; y: number } | null>(null)
  const extraPage = book?.kind === 'faces' && saved.extraIds.length > 0 ? 1 : 0
  const pageCount = book ? book.pages.length + 2 + extraPage : 0
  const index = Math.min(page, Math.max(pageCount - 1, 0))
  const indexRef = useRef(index)
  indexRef.current = index

  useEffect(() => {
    if (!slug) return
    saveRead(slug, { name, gender, faceId, message, page: index })
  }, [slug, name, gender, faceId, message, index])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (tune || pageCount === 0) return
      const tag = (event.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const current = indexRef.current
      if (event.key === 'ArrowLeft' && current < pageCount - 1) {
        setTurn('next')
        setPage(current + 1)
      }
      if (event.key === 'ArrowRight' && current > 0) {
        setTurn('prev')
        setPage(current - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tune, pageCount])

  if (!book || !slug) {
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

  const face = faces.find((item) => item.id === faceId) ?? faces[0]
  const dedication = message.trim() || lineText(book.dedication, gender, name)
  const note = book.kind === 'faces' ? companionLine(saved.extraIds, gender, name) : ''
  const plates: Plate[] = [
    { scene: 'cover', text: book.title, photo: coverFailed ? undefined : book.image },
    { scene: 'dedication', text: dedication },
    ...book.pages.map((copy) => ({ scene: copy.scene, text: lineText(copy, gender, name) })),
    ...(note ? [{ scene: 'hands' as const, text: note }] : []),
  ]
  const plate = plates[index]
  const withFace = book.kind === 'faces' && plate.scene !== 'cover' && plate.scene !== 'dedication'

  function go(next: number) {
    const clamped = Math.max(0, Math.min(plates.length - 1, next))
    if (clamped === index) return
    setTurn(clamped > index ? 'next' : 'prev')
    setPage(clamped)
  }

  function onPointerDown(event: ReactPointerEvent) {
    pointer.current = { x: event.clientX, y: event.clientY }
  }

  function onPointerUp(event: ReactPointerEvent) {
    if (!pointer.current) return
    const dx = event.clientX - pointer.current.x
    const dy = event.clientY - pointer.current.y
    pointer.current = null
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return
    go(dx > 0 ? index + 1 : index - 1)
  }

  return (
    <div className="stage">
      <header className="stage-bar">
        <Link to={`/books/${book.slug}/personalize`}>ارجع للتخصيص</Link>
        <p>{book.title}</p>
        <p>
          {(index + 1).toLocaleString('ar-EG')} / {plates.length.toLocaleString('ar-EG')}
        </p>
        <button type="button" className={tune ? 'choice is-on' : 'choice'} onClick={() => setTune((open) => !open)}>
          التخصيص
        </button>
      </header>
      <div className="stage-book" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <article key={index} className={turn ? `plate turn-${turn}` : 'plate'}>
          {plate.photo ? (
            <div className="plate-art">
              <img src={plate.photo} alt="" onError={() => setCoverFailed(true)} />
            </div>
          ) : (
            <PageArt scene={plate.scene} cover={book.cover} ink={book.ink} face={withFace ? face.cartoon : undefined} />
          )}
          <p className="plate-caption">{plate.text}</p>
          <button type="button" className="hit hit-next" aria-label="الصفحة التالية" onClick={() => go(index + 1)} disabled={index === plates.length - 1} />
          <button type="button" className="hit hit-prev" aria-label="الصفحة السابقة" onClick={() => go(index - 1)} disabled={index === 0} />
        </article>
      </div>
      <div className="stage-dots" role="tablist" aria-label="صفحات الكتاب">
        {plates.map((item, dot) => (
          <button
            key={`${item.scene}-${dot}`}
            type="button"
            role="tab"
            aria-selected={dot === index}
            aria-label={`صفحة ${(dot + 1).toLocaleString('ar-EG')}`}
            className={dot === index ? 'dot is-on' : 'dot'}
            onClick={() => go(dot)}
          />
        ))}
      </div>
      {tune && (
        <aside className="tune">
          <label className="field">
            الاسم
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder={gender === 'boy' ? 'الطفل' : 'الطفلة'} />
          </label>
          <div className="choice-row">
            <button type="button" className={gender === 'boy' ? 'choice is-on' : 'choice'} onClick={() => setGender('boy')}>
              ولد
            </button>
            <button type="button" className={gender === 'girl' ? 'choice is-on' : 'choice'} onClick={() => setGender('girl')}>
              بنت
            </button>
          </div>
          {book.kind === 'faces' && (
            <div className="face-grid">
              {faces.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={faceId === item.id ? 'face-pick is-on' : 'face-pick'}
                  onClick={() => setFaceId(item.id)}
                >
                  <img src={item.photo} alt="" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </aside>
      )}
    </div>
  )
}
