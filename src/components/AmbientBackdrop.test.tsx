import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { AmbientBackdrop } from './AmbientBackdrop'

describe('AmbientBackdrop', () => {
  it('renders a static night sky when motion is reduced', () => {
    const markup = renderToStaticMarkup(<AmbientBackdrop theme="night" stepIndex={3} reducedMotion />)
    expect(markup).toContain('data-motion="off"')
    expect(markup).toContain('is-static')
    expect(markup).not.toContain('ambient-drift')
  })
})
