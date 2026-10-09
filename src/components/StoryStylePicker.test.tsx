import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { StoryStylePicker } from './StoryStylePicker'

describe('StoryStylePicker', () => {
  it('shows the three editions, their promises, and that names stay free', () => {
    const markup = renderToStaticMarkup(
      <StoryStylePicker
        selected="words"
        scene="hands"
        text="ليلى تبدأ الحكاية بهدوء."
        name="ليلى"
        lessonId="separation"
        onSelect={() => undefined}
      />,
    )

    expect(markup).toContain('الكلام')
    expect(markup).toContain('ورق')
    expect(markup).toContain('ليل')
    expect(markup).toContain('الكلمات وحدها، على ورق هادئ')
    expect(markup).toContain('الأسماء مجانية دائمًا')
    expect(markup).toContain('النسخة الهادئة')
    expect(markup).toContain('role="radiogroup"')
    expect(markup).toContain('aria-checked="true"')
  })
})
