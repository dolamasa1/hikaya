export function StoryRating({ rating, reviews }: { rating: number; reviews: number }) {
  if (reviews === 0) return <p className="rating-empty">لسه من غير تقييم</p>
  const full = Math.max(0, Math.min(5, Math.round(rating)))
  const score = rating.toLocaleString('ar-EG', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  const count = reviews.toLocaleString('ar-EG')
  return (
    <p className="stars" aria-label={`${score} من ٥، ${count} تقييم`}>
      <span aria-hidden="true">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span> {score}
      <span className="rating-count"> · {count}</span>
    </p>
  )
}
