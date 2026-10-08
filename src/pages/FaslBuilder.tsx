import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PriceTotal } from '../components/CastPicker'
import { FaslCastPicker, getParentLikeness } from '../components/FaslCastPicker'
import { PageArt } from '../components/PageArt'
import { StoryStylePicker } from '../components/StoryStylePicker'
import { formatPrice, type Gender } from '../data/books'
import { publishPost } from '../data/community'
import { buildLesson, FASL_BASE, lessons, type LessonId } from '../data/lessons'
import { faslExtrasTotal, getStoryStyle, type StoryStyleId } from '../data/styles'

export function FaslBuilder() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [lessonId, setLessonId] = useState<LessonId>(lessons[0].id)
  const [name, setName] = useState('')
  const [gender, setGender] = useState<Gender>('girl')
  const [styleId, setStyleId] = useState<StoryStyleId>('paper')
  const [extraIds, setExtraIds] = useState<string[]>([])
  const [likenessIds, setLikenessIds] = useState<string[]>([])
  const [confirm, setConfirm] = useState(false)
  const story = buildLesson(lessonId, gender, name, extraIds)
  const extras = faslExtrasTotal(extraIds, likenessIds)
  const steps = ['السلوك', 'البروتوكول', 'الطفل', 'الأسلوب', 'الشخصيات', 'المعاينة']
  const protocol = story.lesson
  const style = getStoryStyle(styleId)
  const previewFace = style.textOnly ? undefined : getParentLikeness(likenessIds[0] ?? '')

  function toggleExtra(id: string) {
    setExtraIds((current) => {
      if (!current.includes(id)) return [...current, id]
      setLikenessIds((faces) => faces.filter((item) => item !== id))
      return current.filter((item) => item !== id)
    })
  }

  function toggleLikeness(id: string) {
    setLikenessIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  function chooseStyle(id: StoryStyleId) {
    setStyleId(id)
    if (getStoryStyle(id).textOnly) setLikenessIds([])
  }

  function publish() {
    const post = publishPost({ lessonId, name, gender, extraIds, styleId, likenessIds })
    navigate(`/community/${post.id}`)
  }

  return (
    <section className="section wizard-page">
      <div className="wrap wizard">
        <div className="wizard-copy">
          <p className="kicker">فصل حكايتك · {formatPrice(FASL_BASE)}</p>
          <ol className="progress">
            {steps.map((label, index) => (
              <li key={label} className={index === step ? 'is-on' : index < step ? 'is-done' : ''}>
                <button type="button" disabled={index > step} onClick={() => setStep(index)}>
                  {label}
                </button>
              </li>
            ))}
          </ol>

          {step === 0 && (
            <>
              <h1 className="ask">إيه السلوك؟</h1>
              <div className="lesson-list">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    type="button"
                    className={lessonId === lesson.id ? 'lesson is-on' : 'lesson'}
                    onClick={() => setLessonId(lesson.id)}
                  >
                    <strong>{lesson.title}</strong>
                    <span>{lesson.sign}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <article className="protocol">
              <h1 className="ask">{protocol.title}</h1>
              <p>
                <strong>اللي بنشوفه.</strong> {protocol.sign}
              </p>
              <p>
                <strong>القراءة.</strong> {protocol.reading}
              </p>
              <ol>
                {protocol.steps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <p>
                <strong>آخر الصفحة.</strong> {protocol.outcome}
              </p>
              <button type="button" className="btn" onClick={() => setStep(2)}>
                الحكاية هتمشي على البروتوكول
              </button>
            </article>
          )}

          {step === 2 && (
            <>
              <h1 className="ask">إيه اسم الطفل؟</h1>
              <label className="field">
                الاسم
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="ليلى" />
              </label>
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

          {step === 3 && (
            <>
              <p className="kicker">ده الشكل اللي هيفضل مع الحكاية كلها</p>
              <h1 className="ask">الحكاية هتترسم إزاي؟</h1>
              <p className="sub style-intro">
                تلات اختيارات هادية من نفس عالم أغلفة حكايتك. اختار اللي تحب تفتحه كل ليلة.
              </p>
              <StoryStylePicker
                selected={styleId}
                scene={story.pages[0]?.scene ?? 'hands'}
                text={story.pages[0]?.text ?? ''}
                onSelect={chooseStyle}
              />
            </>
          )}

          {step === 4 && (
            <>
              <h1 className="ask">مين كمان في الحكاية؟</h1>
              <p className="sub">
                اسم ماما أو بابا مجاني. الحيوانات بـ {formatPrice(30)}، والوش اختياري في الأسلوب المرسوم.
              </p>
              <FaslCastPicker
                selected={extraIds}
                likenessIds={likenessIds}
                styleId={styleId}
                onToggleName={toggleExtra}
                onToggleLikeness={toggleLikeness}
              />
              <PriceTotal base={FASL_BASE} extras={extras} />
            </>
          )}

          {step === 5 && (
            <div className="summary">
              <h1 className="ask">المعاينة</h1>
              <p>
                {story.lesson.title} · {style.title} · {name.trim() || (gender === 'boy' ? 'الطفل' : 'الطفلة')}
              </p>
              <PriceTotal base={FASL_BASE} extras={extras} />
              <p>دي معاينة بس. مفيش دفع في النسخة دي.</p>
              {!confirm ? (
                <button type="button" className="btn" onClick={() => setConfirm(true)}>
                  انشر في المجتمع
                </button>
              ) : (
                <>
                  <p>هتظهر في المجتمع.</p>
                  <button type="button" className="btn" onClick={publish}>
                    انشر الحكاية
                  </button>
                </>
              )}
            </div>
          )}

          {step < 5 && step !== 1 && (
            <div className="wizard-actions">
              {step > 0 && (
                <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>
                  السابق
                </button>
              )}
              <button type="button" className="btn" disabled={step === 2 && name.trim().length === 0} onClick={() => setStep(step + 1)}>
                كمّل
              </button>
            </div>
          )}
        </div>
        <article className={style.textOnly ? 'plate preview-plate is-text-only' : 'plate preview-plate'}>
          {style.textOnly ? (
            <div className="text-only-page" aria-hidden="true">
              <span>فصل حكايتك</span>
              <i />
            </div>
          ) : (
            <PageArt
              scene={story.pages[0]?.scene ?? 'hands'}
              cover={style.cover}
              ink={style.ink}
              face={previewFace}
            />
          )}
          <p className="plate-caption">{story.pages[0]?.text}</p>
        </article>
      </div>
    </section>
  )
}
