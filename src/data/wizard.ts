import type { FaslDraft } from './draft'
import { emptySituation, childNameValid, lineValid, situationFilled } from './notes'
import type { StoryStyleId } from './styles'
import type { LessonId } from './lessons'

export const WIZARD_STEPS = ['role', 'behavior', 'protocol', 'child', 'style', 'notes', 'cast', 'review'] as const
export type WizardStep = (typeof WIZARD_STEPS)[number]

export const PROGRESS_STEPS = ['behavior', 'protocol', 'child', 'style', 'notes', 'cast', 'review'] as const satisfies readonly WizardStep[]

export function stepValid(step: WizardStep, draft: FaslDraft) {
  switch (step) {
    case 'role':
      return draft.parentRole === 'mother' || draft.parentRole === 'father'
    case 'behavior':
      return draft.lessonId === 'separation' || draft.lessonId === 'anger' || draft.lessonId === 'novelty' || draft.lessonId === 'sharing'
    case 'protocol':
      return draft.protocolAccepted === true
    case 'child':
      return childNameValid(draft.child.name) && (draft.child.gender === 'boy' || draft.child.gender === 'girl')
    case 'style':
      return draft.styleId === 'words' || draft.styleId === 'paper' || draft.styleId === 'night'
    case 'notes':
      return lineValid(draft.notes.situation.line)
    case 'cast':
    case 'review':
      return true
    default:
      return false
  }
}

export function maxReachableIndex(draft: FaslDraft) {
  for (let index = 0; index < WIZARD_STEPS.length; index += 1) {
    if (!stepValid(WIZARD_STEPS[index], draft)) return index
  }
  return WIZARD_STEPS.length - 1
}

export function canReach(draft: FaslDraft, step: WizardStep) {
  return WIZARD_STEPS.indexOf(step) <= maxReachableIndex(draft)
}

export function draftReady(draft: FaslDraft) {
  return WIZARD_STEPS.filter((step) => step !== 'review' && step !== 'cast').every((step) => stepValid(step, draft))
}

export function lessonChangeNeedsConfirm(draft: FaslDraft, lessonId: LessonId) {
  return draft.lessonId !== lessonId && situationFilled(draft.notes.situation)
}

export function applyLessonChange(draft: FaslDraft, lessonId: LessonId): FaslDraft {
  if (draft.lessonId === lessonId) return draft
  return {
    ...draft,
    lessonId,
    protocolAccepted: false,
    notes: { ...draft.notes, situation: emptySituation() },
  }
}

export function applyStyle(draft: FaslDraft, styleId: StoryStyleId): FaslDraft {
  return { ...draft, styleId }
}
