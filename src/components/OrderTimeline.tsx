import { BACKEND_ENABLED } from '../data/orderBrief'
import { neutralCopy } from '../data/fasl-copy'

const later = ['الكاتب يقرأ ملاحظاتك', 'المسودة جاهزة لتقرأها', 'تُطبع حكايتك', 'في الطريق إليك']

export function OrderTimeline() {
  const first = BACKEND_ENABLED ? neutralCopy.arrivedStage : neutralCopy.savedStage
  const stages = [first, ...later]
  return (
    <ol className="order-timeline">
      {stages.map((label, index) => (
        <li key={label} className={index === 0 ? 'is-on' : ''}>
          {label}
        </li>
      ))}
    </ol>
  )
}
