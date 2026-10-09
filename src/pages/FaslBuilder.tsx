import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookCover } from '../components/BookCover'
import { FaslCastPicker } from '../components/FaslCastPicker'
import { getParentLikeness } from '../data/likeness'
import { FaslNotes } from '../components/FaslNotes'
import { LessonMotif } from '../components/LessonMotif'
import { NotesIngredients } from '../components/NotesIngredients'
import { PageArt } from '../components/PageArt'
import { StoryStylePicker } from '../components/StoryStylePicker'
import { TextPlate } from '../components/TextPlate'
import { formatPrice } from '../data/books'
import { publishShelf } from '../data/community'
import { clearDraft, DRAFT_DEBOUNCE_MS, emptyDraft, loadDraft, saveDraft, type FaslDraft } from '../data/draft'
import { affirmations, childLine, fillName, hiddenFaceMessage, neutralCopy, parentLine, styleHeading } from '../data/fasl-copy'
import { buildLesson, FASL_BASE, lessons, type LessonId } from '../data/lessons'
import { childNameValid, lineValid, seedStage } from '../data/notes'
import { BACKEND_ENABLED, buildOrderBrief, clearOrder, saveOrder, type OrderBrief } from '../data/orderBrief'
import { OrderTimeline } from '../components/OrderTimeline'
import { effectiveFaces, formatEGP, totalFor, type FaceParent } from '../data/pricing'
import { getStoryStyle, type StoryStyleId } from '../data/styles'
import { themeFromStyle } from '../data/theme'
import { ThemeContext } from '../data/useTheme'
import { applyLessonChange, applyStyle, canReach, lessonChangeNeedsConfirm, maxReachableIndex, PROGRESS_STEPS, stepValid, WIZARD_STEPS, type WizardStep } from '../data/wizard'
import { WizardStepContext } from '../components/wizardStep'

const progressLabel: Record<(typeof PROGRESS_STEPS)[number], string> = {
  behavior: 'السلوك',
  protocol: 'البروتوكول',
  child: 'الطفل',
  style: 'الأسلوب',
  notes: 'الملاحظات',
  cast: 'الشخصيات',
  review: 'المعاينة',
}

function store() {
  return localStorage
}

export function FaslBuilder() {
  const navigate = useNavigate()
  const { choose: chooseTheme } = useContext(ThemeContext)
  const setStepIndex = useContext(WizardStepContext)
  const [draft, setDraft] = useState<FaslDraft>(() => loadDraft(store()) ?? emptyDraft())
  const [offerResume, setOfferResume] = useState(() => loadDraft(store()) !== null)
  const [step, setStep] = useState<WizardStep>('role')
  const [pendingLesson, setPendingLesson] = useState<LessonId | null>(null)
  const [previewStyle, setPreviewStyle] = useState<StoryStyleId | null>(null)
  const [fadingStyle, setFadingStyle] = useState<StoryStyleId | null>(null)
  const [peek, setPeek] = useState<'first' | 'last'>('first')
  const [confirm, setConfirm] = useState(false)
  const [order, setOrder] = useState<OrderBrief | null>(null)
  const [shelf, setShelf] = useState<'off' | 'first_name' | 'nickname'>('off')
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    if (order) return
    const timer = window.setTimeout(() => saveDraft(store(), draft), DRAFT_DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [draft, order])

  if (step !== 'style' && peek !== 'first') setPeek('first')

  useEffect(() => {
    setStepIndex(WIZARD_STEPS.indexOf(step))
  }, [setStepIndex, step])

  const committedId = draft.styleId ?? 'paper'
  const visibleId = previewStyle ?? fadingStyle ?? committedId
  const style = getStoryStyle(visibleId)
  const lessonId = draft.lessonId ?? lessons[0].id
  const extras = [...draft.cast.animals, ...(draft.cast.momName.trim() ? ['mom'] : []), ...(draft.cast.dadName.trim() ? ['dad'] : [])]
  const story = buildLesson(lessonId, draft.child.gender, draft.child.name, extras)
  const faces = effectiveFaces(committedId, draft.cast.faceParents)
  const total = totalFor(committedId, draft.cast.animals, draft.cast.faceParents)
  const page = peek === 'last' ? (story.pages[2] ?? story.pages[0]) : story.pages[0]
  const closing = peek === 'last' && story.pages.length > 3 ? story.pages[story.pages.length - 1]?.text : ''
  const plateText = [page?.text, closing, peek === 'last' ? draft.dedication : ''].filter(Boolean).join(' ')
  const plateName = draft.child.name.trim() || (draft.child.gender === 'boy' ? 'الطفل' : 'الطفلة')
  const hidden = getStoryStyle(committedId).textOnly ? hiddenFaceMessage(draft.cast.faceParents) : ''
  const topId = (previewStyle && previewStyle !== committedId ? previewStyle : null) ?? (fadingStyle && fadingStyle !== committedId ? fadingStyle : null)
  const showingPreview = Boolean(previewStyle && previewStyle !== committedId)

  function preview(id: StoryStyleId | null) {
    if (id) {
      setFadingStyle(null)
      setPreviewStyle(id)
      return
    }
    setFadingStyle(previewStyle)
    setPreviewStyle(null)
  }

  function plateLook(id: StoryStyleId) {
    const look = getStoryStyle(id)
    if (look.textOnly) return <TextPlate name={plateName} text={plateText} lessonId={lessonId} />
    const lookFace = getParentLikeness(effectiveFaces(id, draft.cast.faceParents)[0] ?? '')
    return <PageArt scene={page?.scene ?? 'hands'} cover={look.cover} ink={look.ink} face={lookFace} />
  }
  const role = draft.parentRole ?? 'mother'

  function go(next: WizardStep) {
    if (canReach(draft, next)) setStep(next)
  }

  function patch(next: FaslDraft) {
    setDraft(next)
  }

  function chooseLesson(id: LessonId) {
    if (lessonChangeNeedsConfirm(draft, id)) {
      setPendingLesson(id)
      return
    }
    patch(applyLessonChange(draft, id))
  }

  function chooseStyle(id: StoryStyleId) {
    patch(applyStyle(draft, id))
    chooseTheme(themeFromStyle(id))
    setPreviewStyle(null)
    setFadingStyle(null)
  }

  function submit() {
    const brief = buildOrderBrief(draft, Date.now(), `order-${Date.now()}`)
    saveOrder(store(), brief)
    clearDraft(store())
    setOrder(brief)
    setConfirm(false)
  }

  function removeLocal() {
    clearOrder(store())
    clearDraft(store())
    setOrder(null)
    setDraft(emptyDraft())
    setStep('role')
  }

  if (order) {
    return (
      <section className="section wizard-page">
        <div className="wrap summary">
          <h1 className="ask">{BACKEND_ENABLED ? neutralCopy.arrivedStage : neutralCopy.savedLocal}</h1>
          <OrderTimeline />
          <p className="price-total" aria-live="polite">
            <span>المجموع</span>
            <strong key={order.price.total} className="price-pop">
              {formatEGP(order.price.total)}
            </strong>
          </p>
          <fieldset>
            <legend>المجتمع</legend>
            <label className="choice">
              <input type="radio" name="shelf" checked={shelf === 'off'} onChange={() => setShelf('off')} />
              خاص
            </label>
            <label className="choice">
              <input type="radio" name="shelf" checked={shelf === 'first_name'} onChange={() => setShelf('first_name')} />
              الاسم الأول فقط
            </label>
            <label className="choice">
              <input type="radio" name="shelf" checked={shelf === 'nickname'} onChange={() => setShelf('nickname')} />
              اسم مستعار
            </label>
            {shelf === 'nickname' && <input value={nickname} onChange={(event) => setNickname(event.target.value)} aria-label="اسم مستعار" />}
            <button
              type="button"
              className="btn"
              disabled={shelf === 'off' || (shelf === 'nickname' && nickname.trim().length === 0)}
              onClick={() => {
                const displayName = shelf === 'nickname' ? nickname.trim() : order.child.name
                const post = publishShelf({
                  lessonId: draft.lessonId ?? 'separation',
                  displayName,
                  gender: order.child.gender,
                  styleId: draft.styleId ?? 'paper',
                  animals: order.characters.animals,
                })
                navigate(`/community/${post.id}`)
              }}
            >
              انشر في المجتمع
            </button>
          </fieldset>
          <button type="button" className="btn btn-ghost" onClick={removeLocal}>
            {neutralCopy.deleteLocal}
          </button>
          {import.meta.env.DEV && (
            <button
              type="button"
              className="text-btn"
              onClick={() => {
                const blob = new Blob([JSON.stringify(order, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `${order.id}.json`
                link.click()
                URL.revokeObjectURL(url)
              }}
            >
              download brief JSON
            </button>
          )}
        </div>
      </section>
    )
  }

  const affirmation = affirmations[step]

  return (
    <section className="section wizard-page">
      <div className="wrap wizard">
        <div className="wizard-copy">
          {offerResume && (
            <div className="resume-bar">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setStep(WIZARD_STEPS[maxReachableIndex(draft)])
                  setOfferResume(false)
                }}
              >
                {neutralCopy.resume}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  clearDraft(store())
                  setDraft(emptyDraft())
                  setStep('role')
                  setOfferResume(false)
                }}
              >
                {neutralCopy.restart}
              </button>
            </div>
          )}
          <p className="kicker">فصل حكايتك · {formatPrice(FASL_BASE)}</p>
          <ol className="progress">
            {PROGRESS_STEPS.map((label) => (
              <li key={label} className={label === step ? 'is-on' : WIZARD_STEPS.indexOf(label) < WIZARD_STEPS.indexOf(step) ? 'is-done' : ''}>
                <button type="button" disabled={!canReach(draft, label)} onClick={() => go(label)}>
                  {progressLabel[label]}
                </button>
              </li>
            ))}
          </ol>

          {step === 'role' && (
            <>
              <h1 className="ask">{neutralCopy.roleAsk}</h1>
              <div className="choice-row">
                <button type="button" className={draft.parentRole === 'mother' ? 'choice is-on' : 'choice'} onClick={() => patch({ ...draft, parentRole: 'mother' })}>
                  ماما
                </button>
                <button type="button" className={draft.parentRole === 'father' ? 'choice is-on' : 'choice'} onClick={() => patch({ ...draft, parentRole: 'father' })}>
                  بابا
                </button>
              </div>
            </>
          )}

          {step === 'behavior' && (
            <>
              <h1 className="ask">إيه السلوك؟</h1>
              <div className="lesson-list">
                {lessons.map((lesson) => (
                  <button key={lesson.id} type="button" className={draft.lessonId === lesson.id ? 'lesson is-on' : 'lesson'} onClick={() => chooseLesson(lesson.id)}>
                    <strong>{lesson.title}</strong>
                    <span>{lesson.sign}</span>
                  </button>
                ))}
              </div>
              {pendingLesson && (
                <div className="confirm-note">
                  <p>{neutralCopy.lessonChange}</p>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      patch(applyLessonChange(draft, pendingLesson))
                      setPendingLesson(null)
                    }}
                  >
                    كمّل
                  </button>
                </div>
              )}
            </>
          )}

          {step === 'protocol' && draft.lessonId && (
            <article className="protocol">
              <h1 className="ask">{story.lesson.title}</h1>
              <p>
                <strong>اللي بنشوفه.</strong> {story.lesson.sign}
              </p>
              <p>
                <strong>القراءة.</strong> {story.lesson.reading}
              </p>
              <ol>
                {story.lesson.steps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <p>
                <strong>آخر الصفحة.</strong> {story.lesson.outcome}
              </p>
              {(draft.lessonId === 'anger' || draft.lessonId === 'separation') && <p className="sub">{neutralCopy.pediatrician}</p>}
              <label className="choice">
                <input type="checkbox" checked={draft.protocolAccepted} onChange={(event) => patch({ ...draft, protocolAccepted: event.target.checked })} />
                الحكاية هتمشي على البروتوكول
              </label>
            </article>
          )}

          {step === 'child' && (
            <>
              <h1 className="ask">إيه اسم الطفل؟</h1>
              <label className="field">
                الاسم
                <input value={draft.child.name} onChange={(event) => patch({ ...draft, child: { ...draft.child, name: event.target.value } })} placeholder="ليلى" />
              </label>
              <div className="choice-row">
                <button type="button" className={draft.child.gender === 'boy' ? 'choice is-on' : 'choice'} onClick={() => patch({ ...draft, child: { ...draft.child, gender: 'boy' } })}>
                  ولد
                </button>
                <button type="button" className={draft.child.gender === 'girl' ? 'choice is-on' : 'choice'} onClick={() => patch({ ...draft, child: { ...draft.child, gender: 'girl' } })}>
                  بنت
                </button>
              </div>
            </>
          )}

          {step === 'style' && (
            <>
              <h1 className="ask">{styleHeading(draft.child.name)}</h1>
              <StoryStylePicker
                selected={draft.styleId ?? 'paper'}
                scene={story.pages[0]?.scene ?? 'hands'}
                text={story.pages[0]?.text ?? ''}
                name={draft.child.name.trim() || (draft.child.gender === 'boy' ? 'الطفل' : 'الطفلة')}
                lessonId={lessonId}
                onSelect={chooseStyle}
                onPreview={preview}
              />
              <p className="sub">{parentLine('lastPagePeek', role)}</p>
            </>
          )}

          {step === 'notes' && draft.parentRole && (
            <>
              <h1 className="ask">{parentLine('notesHeading', draft.parentRole, draft.child.name)}</h1>
              <FaslNotes
                notes={draft.notes}
                lessonId={lessonId}
                role={draft.parentRole}
                gender={draft.child.gender}
                name={draft.child.name}
                onChange={(notes) => patch({ ...draft, notes })}
              />
              <p className="sub">{childLine('seed', draft.child.gender, draft.child.name)}</p>
              <LessonMotif lessonId={lessonId} stage={seedStage(draft.notes)} />
            </>
          )}

          {step === 'cast' && (
            <>
              <h1 className="ask">مين كمان في الحكاية؟</h1>
              <FaslCastPicker
                momName={draft.cast.momName}
                dadName={draft.cast.dadName}
                animals={draft.cast.animals}
                likenessIds={draft.cast.faceParents}
                styleId={draft.styleId ?? 'paper'}
                dedication={draft.dedication}
                childName={draft.child.name}
                onMomName={(momName) => patch({ ...draft, cast: { ...draft.cast, momName } })}
                onDadName={(dadName) => patch({ ...draft, cast: { ...draft.cast, dadName } })}
                onToggleAnimal={(id) =>
                  patch({
                    ...draft,
                    cast: {
                      ...draft.cast,
                      animals: draft.cast.animals.includes(id) ? draft.cast.animals.filter((item) => item !== id) : [...draft.cast.animals, id],
                    },
                  })
                }
                onToggleLikeness={(id: FaceParent) =>
                  patch({
                    ...draft,
                    cast: {
                      ...draft.cast,
                      faceParents: draft.cast.faceParents.includes(id)
                        ? draft.cast.faceParents.filter((item) => item !== id)
                        : [...draft.cast.faceParents, id],
                    },
                  })
                }
                onDedication={(dedication) => patch({ ...draft, dedication })}
              />
            </>
          )}

          {step === 'review' && draft.parentRole && draft.lessonId && (
            <div className="summary">
              <h1 className="ask">المعاينة</h1>
              <BookCover name={draft.child.name} lessonId={draft.lessonId} dedication={draft.dedication} role={draft.parentRole} />
              <p className="price-total" aria-live="polite">
                <span>المجموع</span>
                <strong key={total} className="price-pop">{formatEGP(total)}</strong>
              </p>
              <ul className="plain-list">
                <li>
                  {story.lesson.title} <button type="button" className="text-btn" onClick={() => go('behavior')}>تعديل</button>
                </li>
                <li>
                  {draft.child.name} <button type="button" className="text-btn" onClick={() => go('child')}>تعديل</button>
                </li>
                <li>
                  {style.title} <button type="button" className="text-btn" onClick={() => go('style')}>تعديل</button>
                </li>
                <li>
                  الملاحظات <button type="button" className="text-btn" onClick={() => go('notes')}>تعديل</button>
                </li>
                <li>
                  الشخصيات <button type="button" className="text-btn" onClick={() => go('cast')}>تعديل</button>
                </li>
              </ul>
              {!confirm ? (
                <button type="button" className="btn" onClick={() => setConfirm(true)}>
                  احفظ الطلب
                </button>
              ) : (
                <button type="button" className="btn" onClick={submit}>
                  تأكيد الحفظ
                </button>
              )}
            </div>
          )}

          {step !== 'review' && (
            <div className="wizard-footer">
              {step !== 'role' && (
              <p className="price-total" aria-live="polite">
                <span>الأساس {formatEGP(FASL_BASE)}</span>
                {draft.cast.animals.length > 0 && <span>حيوانات {formatEGP(30 * draft.cast.animals.length)}</span>}
                {faces.length > 0 && <span>وجوه {formatEGP(90 * faces.length)}</span>}
                <strong key={total} className="price-pop">
                  {formatEGP(total)}
                </strong>
              </p>
              )}
              <div className="wizard-actions">
                {step !== 'role' && (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      const index = WIZARD_STEPS.indexOf(step)
                      setStep(WIZARD_STEPS[index - 1])
                    }}
                  >
                    السابق
                  </button>
                )}
                <button
                  type="button"
                  className="btn"
                  disabled={!stepValid(step, draft) || (step === 'child' && !childNameValid(draft.child.name)) || (step === 'notes' && !lineValid(draft.notes.situation.line))}
                  onClick={() => setStep(WIZARD_STEPS[WIZARD_STEPS.indexOf(step) + 1])}
                >
                  التالي
                </button>
              </div>
              {affirmation && <p className="affirm">{fillName(affirmation, draft.child.name)}</p>}
            </div>
          )}
        </div>
        <article className={style.textOnly ? 'plate preview-plate is-text-only' : 'plate preview-plate'}>
          <div className="plate-cross">
            <div className="plate-layer is-base">{plateLook(committedId)}</div>
            {topId && (
              <div
                className={showingPreview ? 'plate-layer is-show' : 'plate-layer is-hide'}
                onAnimationEnd={(event) => {
                  if (event.animationName === 'plate-out') setFadingStyle(null)
                }}
              >
                {plateLook(topId)}
              </div>
            )}
          </div>
          <p className="plate-number">{peek === 'last' ? '٣' : '١'}</p>
          <NotesIngredients likes={draft.notes.likes} />
          {hidden && <p className="sub">{hidden}</p>}
          <p className="plate-caption">{neutralCopy.plateCaption}</p>
          <p className="plate-caption">{[page?.text, closing].filter(Boolean).join(' ')}</p>
          {step === 'style' && (
            <div role="radiogroup" aria-label={parentLine('lastPagePeek', role)} className="choice-row">
              <label className={peek === 'first' ? 'choice is-on' : 'choice'}>
                <input type="radio" name="peek" checked={peek === 'first'} onChange={() => setPeek('first')} />
                الأولى
              </label>
              <label className={peek === 'last' ? 'choice is-on' : 'choice'}>
                <input type="radio" name="peek" checked={peek === 'last'} onChange={() => setPeek('last')} />
                الأخيرة
              </label>
            </div>
          )}
        </article>
      </div>
    </section>
  )
}
