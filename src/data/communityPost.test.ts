import { describe, expect, it } from 'vitest'
import { communityRecord, shelfPayload } from './communityPost'

describe('community shelf record', () => {
  it('never stores notes, parent names, dedication, role or faces', () => {
    const post = communityRecord(
      {
        id: 'yours-1',
        lessonId: 'anger',
        displayName: 'آدم',
        gender: 'boy',
        styleId: 'paper',
        animals: ['cat'],
        notes: { open: 'سر' },
        momName: 'هدى',
        dedication: 'لك',
        parentRole: 'mother',
        likenessIds: ['mom'],
        faces: { mom: true },
      },
      'fallback',
    )
    const payload = shelfPayload(post)
    const raw = JSON.stringify(payload)
    expect(raw).not.toContain('سر')
    expect(raw).not.toContain('هدى')
    expect(raw).not.toContain('likeness')
    expect(raw).not.toContain('dedication')
    expect(payload.animals).toEqual(['cat'])
  })

  it('still reads an old record that stored likenesses', () => {
    const post = communityRecord(
      {
        id: 'seed-nour',
        lessonId: 'separation',
        name: 'نور',
        gender: 'girl',
        extraIds: ['mom', 'cat'],
        styleId: 'paper',
        likenessIds: ['mom'],
        yours: false,
        cover: '/images/cover-together.jpg',
        publisher: 'ماما هدى',
        rating: 4.8,
        reviews: 36,
      },
      'fallback',
    )
    expect(post.displayName).toBe('نور')
    expect(post.animals).toEqual(['cat'])
    expect(post.lessonId).toBe('separation')
  })
})
