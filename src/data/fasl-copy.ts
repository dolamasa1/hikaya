import type { ParentRole } from './draft'
import type { ChildGender } from './pricing'
import type { WizardStep } from './wizard'

export const parentCopy = {
  notesHeading: { father: 'احكِ لنا عن {الاسم}', mother: 'احكي لنا عن {الاسم}' },
  lastPagePeek: { father: 'ألقِ نظرة على الصفحة الأخيرة', mother: 'ألقي نظرة على الصفحة الأخيرة' },
  notesHint: { father: 'اكتب سطرًا واحدًا على الأقل عن الموقف', mother: 'اكتبي سطرًا واحدًا على الأقل عن الموقف' },
} as const

export const childCopy = {
  dislike1: { boy: 'لا يحبه', girl: 'لا تحبه' },
  dislike2: { boy: 'يضايقه', girl: 'يضايقها' },
  dislike3: { boy: 'يخيفه', girl: 'يخيفها' },
  likes: { boy: 'يحب', girl: 'تحب' },
  fears: { boy: 'يخاف', girl: 'تخاف' },
  seed: {
    boy: 'كلما عرفنا {الاسم} أكثر، اقتربت الحكاية منه',
    girl: 'كلما عرفنا {الاسم} أكثر، اقتربت الحكاية منها',
  },
} as const

export const neutralCopy = {
  noticed: 'لأنك لاحظت',
  situation: 'ماذا يحدث بالضبط؟',
  open: 'أي شيء تحب أن يعرفه كاتب الحكاية',
  dedication: 'ماذا تحب أن يقرأ {الاسم} في آخر صفحة؟',
  pediatrician: 'الحكاية تدعم الحوار مع طفلك، ولا تغني عن استشارة طبيب الأطفال إن راودك القلق.',
  plateCaption: 'معاينة أولى — يكتب كاتبنا الحكاية النهائية بعد قراءة ملاحظاتك',
  readerCaption: 'نسخة أولى من الحكاية',
  consent: 'يقرأ ملاحظاتك كاتب الحكاية والرسّام فقط، ويمكنك طلب حذفها في أي وقت.',
  namesFree: 'الأسماء مجانية دائمًا',
  quietEdition: 'النسخة الهادئة',
  lessonChange: 'سيتغير نوع الموقف، فنمسح وصف الموقف ونبقي الباقي',
  savedLocal: 'تم حفظ طلبك على هذا الجهاز',
  savedStage: 'حُفظ الطلب',
  arrivedStage: 'وصل طلبك',
  resume: 'أكمل من حيث توقفت',
  restart: 'ابدأ من جديد',
  deleteLocal: 'احذف الطلب من هذا الجهاز',
  roleAsk: 'أنت ماما أم بابا؟',
} as const

export const affirmations: Partial<Record<WizardStep, string>> = {
  behavior: 'لأنك لاحظت.',
  protocol: 'الحكاية ستسير على خطوات واضحة.',
  child: 'ظهر اسم {الاسم} على الغلاف.',
  notes: 'كل تفصيلة تقرّب الكاتب من {الاسم}.',
  cast: 'الصفحة الأخيرة ستحمل كلماتك.',
}

export function fillName(template: string, name: string) {
  return template.replaceAll('{الاسم}', name.trim() || 'طفلك')
}

export function parentLine(key: keyof typeof parentCopy, role: ParentRole, name = '') {
  return fillName(parentCopy[key][role], name)
}

export function childLine(key: keyof typeof childCopy, gender: ChildGender, name = '') {
  return fillName(childCopy[key][gender], name)
}

export function hiddenFaceMessage(faces: readonly ('mom' | 'dad')[]) {
  const mom = faces.includes('mom')
  const dad = faces.includes('dad')
  if (mom && dad) return 'أخفينا وجه ماما وبابا مؤقتًا، وسيعود إن غيّرت رأيك'
  if (mom) return 'أخفينا وجه ماما مؤقتًا، وسيعود إن غيّرت رأيك'
  if (dad) return 'أخفينا وجه بابا مؤقتًا، وسيعود إن غيّرت رأيك'
  return ''
}

export function byline(name: string, role: ParentRole) {
  const who = role === 'mother' ? 'ماما' : 'بابا'
  return `كُتبت لـ ${name.trim() || 'طفلك'}، بطلب من ${who}`
}

export function styleHeading(name: string) {
  return `كيف تحب حكاية ${name.trim() || 'طفلك'} تظهر؟`
}
