export function Portrait({ image, label }: { image: string; label: string }) {
  return (
    <div className="portrait">
      <img src={image} alt="" />
      <span>{label}</span>
    </div>
  )
}
