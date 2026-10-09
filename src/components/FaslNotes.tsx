import { childLine, neutralCopy, parentLine } from '../data/fasl-copy'
import type { ParentRole } from '../data/draft'
import type { LessonId } from '../data/lessons'
import {
  chipsFor,
  cleanText,
  LABEL_MAX,
  LIKE_MAX,
  likeCatalog,
  likeDegreeLabel,
  LINE_MAX,
  OPEN_MAX,
  setDislikeDegree,
  type Degree,
  type DislikeItem,
  type LikeItem,
  type Notes,
} from '../data/notes'
import type { ChildGender } from '../data/pricing'

const prompts = [
  ['when', 'متى يحدث؟'],
  ['where', 'أين يحدث؟'],
  ['who', 'من يكون موجودًا؟'],
  ['usualResponse', 'ماذا تفعل عادة؟'],
  ['afterwards', 'ماذا يحدث بعد ذلك؟'],
] as const

function appendChip(current: string, chip: string) {
  const clean = cleanText(current, 200)
  if (!clean) return chip
  if (clean.split('، ').includes(chip)) return clean
  return cleanText(`${clean}، ${chip}`, 200)
}

export function FaslNotes({
  notes,
  lessonId,
  role,
  gender,
  name,
  onChange,
}: {
  notes: Notes
  lessonId: LessonId
  role: ParentRole
  gender: ChildGender
  name: string
  onChange: (notes: Notes) => void
}) {
  function addLike(label: string) {
    const clean = cleanText(label, LABEL_MAX)
    if (!clean || notes.likes.some((item) => item.label === clean) || notes.likes.length >= LIKE_MAX) return
    const next: LikeItem = { id: clean, label: clean, degree: 2 }
    onChange({ ...notes, likes: [...notes.likes, next] })
  }

  function addDislike(label: string) {
    const clean = cleanText(label, LABEL_MAX)
    if (!clean || notes.dislikes.some((item) => item.label === clean) || notes.dislikes.length >= LIKE_MAX) return
    const next: DislikeItem = { id: clean, label: clean, degree: 2, mention: 'gentle', mentionTouched: false }
    onChange({ ...notes, dislikes: [...notes.dislikes, next] })
  }

  return (
    <div className="notes-desk">
      <label className="field">
        {neutralCopy.situation}
        <textarea
          value={notes.situation.line}
          maxLength={LINE_MAX}
          onChange={(event) => onChange({ ...notes, situation: { ...notes.situation, line: event.target.value } })}
        />
      </label>
      <p className="sub">{parentLine('notesHint', role)}</p>
      {prompts.map(([key, label]) => (
        <details key={key} className="prompt-card">
          <summary>{label}</summary>
          <div className="chip-row">
            {chipsFor(lessonId).map((chip) => (
              <button key={chip} type="button" className="chip" onClick={() => onChange({ ...notes, situation: { ...notes.situation, [key]: appendChip(notes.situation[key], chip) } })}>
                {chip}
              </button>
            ))}
          </div>
          <input
            value={notes.situation[key]}
            onChange={(event) => onChange({ ...notes, situation: { ...notes.situation, [key]: event.target.value } })}
          />
        </details>
      ))}

      <fieldset>
        <legend>{childLine('likes', gender)} {name.trim() || 'طفلك'}</legend>
        {likeCatalog.map((group) => (
          <div key={group.id} className="chip-row">
            {group.items.map((item) => (
              <button key={item} type="button" className="chip" onClick={() => addLike(item)}>
                {item}
              </button>
            ))}
          </div>
        ))}
        <AddRow onAdd={addLike} />
        {notes.likes.map((item) => (
          <DegreeRow
            key={item.id}
            label={item.label}
            degree={item.degree}
            options={[1, 2, 3].map((degree) => ({ degree: degree as Degree, label: likeDegreeLabel(degree as Degree) }))}
            onDegree={(degree) => onChange({ ...notes, likes: notes.likes.map((row) => (row.id === item.id ? { ...row, degree } : row)) })}
          />
        ))}
      </fieldset>

      <fieldset>
        <legend>{childLine('fears', gender)} {name.trim() || 'طفلك'}</legend>
        <AddRow onAdd={addDislike} />
        {notes.dislikes.map((item) => (
          <div key={item.id} className="dislike-row">
            <DegreeRow
              label={item.label}
              degree={item.degree}
              options={[1, 2, 3].map((degree) => ({
                degree: degree as Degree,
                label: childLine(degree === 1 ? 'dislike1' : degree === 2 ? 'dislike2' : 'dislike3', gender),
              }))}
              onDegree={(degree) =>
                onChange({
                  ...notes,
                  dislikes: notes.dislikes.map((row) => (row.id === item.id ? setDislikeDegree(row, degree) : row)),
                })
              }
            />
            <div role="radiogroup" aria-label={item.label} className="choice-row">
              <label className="choice">
                <input
                  type="radio"
                  name={`mention-${item.id}`}
                  checked={item.mention === 'omit'}
                  onChange={() =>
                    onChange({
                      ...notes,
                      dislikes: notes.dislikes.map((row) => (row.id === item.id ? { ...row, mention: 'omit', mentionTouched: true } : row)),
                    })
                  }
                />
                لا تذكروه في الحكاية
              </label>
              <label className="choice">
                <input
                  type="radio"
                  name={`mention-${item.id}`}
                  checked={item.mention === 'gentle'}
                  onChange={() =>
                    onChange({
                      ...notes,
                      dislikes: notes.dislikes.map((row) => (row.id === item.id ? { ...row, mention: 'gentle', mentionTouched: true } : row)),
                    })
                  }
                />
                اذكروه بلطف
              </label>
            </div>
          </div>
        ))}
      </fieldset>

      <label className="field">
        {neutralCopy.open}
        <textarea
          value={notes.open}
          maxLength={OPEN_MAX}
          onChange={(event) => onChange({ ...notes, open: event.target.value })}
        />
      </label>
      {notes.open.length > OPEN_MAX - 200 && <p className="sub">{OPEN_MAX - notes.open.length}</p>}
      <p className="consent">{neutralCopy.consent}</p>
    </div>
  )
}

function AddRow({ onAdd }: { onAdd: (label: string) => void }) {
  return (
    <form
      className="add-row"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        onAdd(String(data.get('label') ?? ''))
        event.currentTarget.reset()
      }}
    >
      <input name="label" maxLength={LABEL_MAX} aria-label="إضافة" />
      <button type="submit" className="btn btn-ghost">
        أضف
      </button>
    </form>
  )
}

function DegreeRow({
  label,
  degree,
  options,
  onDegree,
}: {
  label: string
  degree: Degree
  options: { degree: Degree; label: string }[]
  onDegree: (degree: Degree) => void
}) {
  return (
    <div className="degree-row">
      <span>{label}</span>
      <div role="radiogroup" aria-label={label} className="choice-row">
        {options.map((option) => (
          <label key={option.degree} className={degree === option.degree ? 'choice is-on' : 'choice'}>
            <input type="radio" name={`degree-${label}`} checked={degree === option.degree} onChange={() => onDegree(option.degree)} />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}
