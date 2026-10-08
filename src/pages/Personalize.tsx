import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Preview } from '../components/Preview'
import { CastPicker, PriceTotal } from '../components/CastPicker'
import { getBook, formatPrice, lineLabel, lineText, type Gender } from '../data/books'
import { characterTotal } from '../data/characters'
import { companionLine } from '../data/lessons'
import { faces } from '../data/faces'
import { loadRead, saveRead } from '../data/readState'

export function Personalize() {
  const { slug } = useParams()
  const book = getBook(slug)
  const saved = loadRead(slug ?? '')
  const [step, setStep] = useState(0)
  const [name, setName] = useState(saved.name)
  const [gender, setGender] = useState<Gender>(saved.gender)
  const [faceId, setFaceId] = useState(saved.faceId)
  const [message, setMessage] = useState(saved.message)
  const [extraIds, setExtraIds] = useState(saved.extraIds)

  useEffect(() => {
    if (!slug) return
    saveRead(slug, { name, gender, faceId, message, extraIds })
  }, [slug, name, gender, faceId, message, extraIds])

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

  const withFace = book.kind === 'faces'
  const steps = withFace
    ? ['الاسم', 'الولد أو البنت', 'الوش', 'الشخصيات', 'الإهداء', 'المعاينة']
    : ['الاسم', 'الولد أو البنت', 'الإهداء', 'المعاينة']
  const ready = step === steps.length - 1
  const face = faces.find((item) => item.id === faceId) ?? faces[0]
  const genderStep = 1
  const faceStep = withFace ? 2 : -1
  const castStep = withFace ? 3 : -1
  const messageStep = withFace ? 4 : 2
  const extras = withFace ? characterTotal(extraIds) : 0
  const note = withFace ? companionLine(extraIds, gender, name) : ''

  function toggleExtra(id: string) {
    setExtraIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return (
    <section className="section wizard-page">
      <div className="wrap wizard">
        <div className="wizard-copy">
          <p className="kicker">
            {lineLabel[book.kind]} · {book.title}
          </p>
          <ol className="progress">
            {steps.map((label, index) => (
              <li key={label} className={index === step ? 'is-on' : index < step ? 'is-done' : ''}>
                <button type="button" onClick={() => index <= step && setStep(index)} disabled={index > step}>
                  {label}
                </button>
              </li>
            ))}
          </ol>

          {step === 0 && (
            <>
              <h1 className="ask">إيه اسم الطفل؟</h1>
              <label className="field">
                الاسم
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="ليلى" autoFocus />
              </label>
            </>
          )}

          {step === genderStep && (
            <>
              <h1 className="ask">ولد ولا بنت؟</h1>
              <p className="sub">الكلام في الحكاية بيتغير: وصل أو وصلت، يضحك أو تضحك.</p>
              <div className="choice-row">
                <button type="button" className={gender === 'boy' ? 'choice is-on' : 'choice'} onClick={() => setGender('boy')}>
                  ولد
                </button>
                <button type="button" className={gender === 'girl' ? 'choice is-on' : 'choice'} onClick={() => setGender('girl')}>
                  بنت
                </button>
              </div>
            </>
          )}

          {step === faceStep && (
            <>
              <h1 className="ask">مين وش البطل؟</h1>
              <p className="sub">تختار صورة حقيقية، والحكاية ترسمها وش كرتوني.</p>
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
            </>
          )}

          {step === castStep && (
            <>
              <h1 className="ask">مين كمان في الحكاية؟</h1>
              <p className="sub">كل شخصية زيادة بـ {formatPrice(30)}. الطفل داخل في سعر الكتاب.</p>
              <CastPicker selected={extraIds} onToggle={toggleExtra} />
              <PriceTotal base={book.price} extras={extras} />
            </>
          )}

          {step === messageStep && (
            <>
              <h1 className="ask">تحب تكتب إيه في الأول؟</h1>
              <label className="field">
                الإهداء
                <textarea
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={lineText(book.dedication, gender, name)}
                />
              </label>
            </>
          )}

          {ready && (
            <div className="summary">
              <h1 className="ask">الكتاب جاهز للمعاينة</h1>
              <p>
                {book.title} لـ {name.trim() || '……'} · {gender === 'boy' ? 'ولد' : 'بنت'}
                {withFace ? ` · وش ${face.label}` : ''}
                {extras > 0 ? ` · ${formatPrice(book.price + extras)}` : ''}
              </p>
              <p>دي معاينة بس. مفيش دفع ولا طباعة في النسخة دي.</p>
              <Link className="btn" to={`/books/${book.slug}/read`}>
                اقرأ الحكاية
              </Link>
            </div>
          )}

          {!ready && (
            <div className="wizard-actions">
              {step > 0 && (
                <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>
                  السابق
                </button>
              )}
              <button type="button" className="btn" disabled={step === 0 && name.trim().length === 0} onClick={() => setStep(step + 1)}>
                كمّل
              </button>
            </div>
          )}
        </div>
        <Preview
          book={book}
          name={name}
          gender={gender}
          message={message}
          cartoon={withFace ? face.cartoon : undefined}
          castNote={note || undefined}
        />
      </div>
    </section>
  )
}
