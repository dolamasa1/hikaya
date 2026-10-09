import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { FaslCastPicker } from './FaslCastPicker'

const actions = {
  onMomName: () => undefined,
  onDadName: () => undefined,
  onToggleAnimal: () => undefined,
  onToggleLikeness: () => undefined,
  onDedication: () => undefined,
}

describe('FaslCastPicker', () => {
  it('keeps mom and dad free in the text-only style and hides likeness controls', () => {
    const markup = renderToStaticMarkup(
      <FaslCastPicker
        momName="هدى"
        dadName=""
        animals={[]}
        likenessIds={['mom']}
        styleId="words"
        dedication=""
        childName="ليلى"
        {...actions}
      />,
    )

    expect(markup).toContain('ماما')
    expect(markup).toContain('مجاني')
    expect(markup).toContain('أخفينا وجه ماما مؤقتًا')
    expect(markup).not.toContain('أضف وش')
  })

  it('offers a paid likeness for parents in painted styles', () => {
    const markup = renderToStaticMarkup(
      <FaslCastPicker
        momName=""
        dadName=""
        animals={['cat']}
        likenessIds={[]}
        styleId="paper"
        dedication=""
        childName="آدم"
        {...actions}
      />,
    )

    expect(markup).toContain('أضف وش بابا')
    expect(markup).toContain('أضف وش ماما')
    expect(markup).toContain('٣٠')
  })
})
