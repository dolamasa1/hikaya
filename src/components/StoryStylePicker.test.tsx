import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { StoryStylePicker } from './StoryStylePicker'

describe('StoryStylePicker', () => {
  it('shows all calm styles and explains the text-only and likeness rules', () => {
    const markup = renderToStaticMarkup(
      <StoryStylePicker
        selected="words"
        scene="hands"
        text="ليلى تبدأ الحكاية بهدوء."
        onSelect={() => undefined}
      />,
    )

    expect(markup).toContain('الكلام')
    expect(markup).toContain('ورق')
    expect(markup).toContain('ليل')
    expect(markup).toContain('من غير صورة للبطل')
    expect(markup).toContain('وش ماما أو بابا اختياري')
    expect(markup).toContain('aria-pressed="true"')
  })
})
