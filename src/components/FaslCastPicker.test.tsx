import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { FaslCastPicker } from './FaslCastPicker'

const actions = {
  onToggleName: () => undefined,
  onToggleLikeness: () => undefined,
}

describe('FaslCastPicker', () => {
  it('keeps mom and dad free in the text-only style and hides likeness controls', () => {
    const markup = renderToStaticMarkup(
      <FaslCastPicker
        selected={['mom']}
        likenessIds={[]}
        styleId="words"
        {...actions}
      />,
    )

    expect(markup).toContain('ماما')
    expect(markup).toContain('مجاني')
    expect(markup).not.toContain('أضف الوش')
  })

  it('offers a paid likeness only for a selected parent in painted styles', () => {
    const markup = renderToStaticMarkup(
      <FaslCastPicker
        selected={['dad']}
        likenessIds={[]}
        styleId="paper"
        {...actions}
      />,
    )

    expect(markup).toContain('أضف وش بابا')
    expect(markup).toContain('٩٠')
    expect(markup).not.toContain('أضف وش ماما')
    expect(markup).toContain('٣٠')
  })
})
