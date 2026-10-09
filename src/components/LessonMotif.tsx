import type { LessonId } from '../data/lessons'

const paths: Record<LessonId, string> = {
  separation: 'M8 28 C 28 8, 44 48, 72 24',
  anger: 'M6 30 C 18 8, 30 48, 42 26 S 66 8, 86 28',
  novelty: 'M22 10 H58 V62 H22 Z M58 10 L78 22 V74 L58 62',
  sharing: 'M14 18 H46 V58 H14 Z M50 18 H82 V58 H50 Z',
}

export function LessonMotif({ lessonId, stage }: { lessonId: LessonId; stage: number }) {
  const drawn = Math.max(0, Math.min(4, stage)) / 4
  return (
    <svg className="lesson-motif" viewBox="0 0 96 80" aria-hidden="true">
      <path
        d={paths[lessonId]}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={100 - drawn * 100}
      />
    </svg>
  )
}
