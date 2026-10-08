import { fillName, type Gender, type Scene } from './books'
import { chosenCharacters } from './characters'

export const FASL_BASE = 1290

export type LessonId = 'separation' | 'anger' | 'novelty' | 'sharing'

export type Lesson = {
  id: LessonId
  title: string
  sign: string
  reading: string
  steps: [string, string, string]
  outcome: string
}

export const lessons: Lesson[] = [
  {
    id: 'separation',
    title: 'قلق الانفصال',
    sign: 'الطفل يتعلق، والوداع يطول، والرجوع مش متوقع.',
    reading: 'الانفصال بيتدرب عليه بطقس قصير ورجوع محفوظ، مش بتطويل الوداع.',
    steps: ['نفضل لحظة ونسميها', 'وداع قصير والباب يتقفل', 'الرجوع يحصل زي الوعد'],
    outcome: 'يمارس وداعًا قصيرًا ويستنى الرجوع.',
  },
  {
    id: 'anger',
    title: 'نوبة الغضب',
    sign: 'الطلب يتقابل بصرخة، والجسم يتشد، والاختيار يختفي.',
    reading: 'الغضب بيهدى لما الشعور يتسمى، والطلب يصغر، ويظهر اختيار واحد.',
    steps: ['نسمي الشعور', 'نصغّر الطلب', 'نسيب اختيارًا واحدًا'],
    outcome: 'يسمي زعله ويختار خطوة واحدة.',
  },
  {
    id: 'novelty',
    title: 'الخوف من الجديد',
    sign: 'المكان أو الحاجة الجديدة توقف الطفل، ويقرب ويرجع.',
    reading: 'الخوف بينزل بالتقريب على درجات: نشوف، نقرب، نجرب مرة صغيرة.',
    steps: ['نتفرج من بعيد', 'نقرب خطوة', 'نجرب مرة واحدة صغيرة'],
    outcome: 'يجرب الجديد مرة صغيرة من غير قفزة.',
  },
  {
    id: 'sharing',
    title: 'صعوبة المشاركة',
    sign: 'الحاجة تتشد، والطفل التاني يتساب بره اللعب.',
    reading: 'المشاركة بتبدأ بملاحظة الطرف التاني، ثم قسمة واحدة، ثم دور مشترك.',
    steps: ['نلاحظ الطفل التاني', 'نقسم حاجة واحدة', 'نلعب الدور سوا'],
    outcome: 'يسيب دورًا مشتركًا، مش شعار عن المشاركة.',
  },
]

export function getLesson(id: string | undefined) {
  return lessons.find((lesson) => lesson.id === id)
}

export type BuiltPage = { scene: Scene; text: string }

export function companionLine(extraIds: string[], gender: Gender, name: string) {
  const picked = chosenCharacters(extraIds)
  if (picked.length === 0) return ''
  const who = picked.map((item) => item.label).join(' و')
  const child = fillName('{name}', name, gender)
  return gender === 'boy' ? `${child} يكمّل اليوم ومعاه ${who}.` : `${child} تكمّل اليوم ومعاها ${who}.`
}

export function buildLesson(lessonId: LessonId, gender: Gender, name: string, extraIds: string[]) {
  const lesson = getLesson(lessonId) ?? lessons[0]
  const child = fillName('{name}', name, gender)
  const withThem = companionLine(extraIds, gender, name)
  const dedication =
    gender === 'boy'
      ? `إلى ${child}، وبروتوكول ${lesson.title} ماشي معاه خطوة بخطوة.`
      : `إلى ${child}، وبروتوكول ${lesson.title} ماشي معاها خطوة بخطوة.`

  const bodies: Record<LessonId, { boy: string; girl: string; scene: Scene }[]> = {
    separation: [
      { scene: 'hands', boy: `${child} يفضل لحظة، وإيده في الإيد، ونسمي اللحظة: لسه هنا.`, girl: `${child} تفضل لحظة، وإيدها في الإيد، ونسمي اللحظة: لسه هنا.` },
      { scene: 'door-hug', boy: `${child} يقول وداعًا قصير، والباب يتقفل بهدوء.`, girl: `${child} تقول وداعًا قصير، والباب يتقفل بهدوء.` },
      { scene: 'found', boy: `${child} يرجع، والوعد اتنفذ زي ما اتقال.`, girl: `${child} ترجع، والوعد اتنفذ زي ما اتقال.` },
    ],
    anger: [
      { scene: 'curtain', boy: `${child} يشد جسمه، ونقول: ده زعل، مش عيب.`, girl: `${child} تشد جسمها، ونقول: ده زعل، مش عيب.` },
      { scene: 'toys', boy: `الطلب يكبر، فنصغّره لخطوة واحدة يقدر عليها ${child}.`, girl: `الطلب يكبر، فنصغّره لخطوة واحدة تقدر عليها ${child}.` },
      { scene: 'gift', boy: `${child} يختار: المقعد ده ولا المقعد ده. اختيار واحد بس.`, girl: `${child} تختار: المقعد ده ولا المقعد ده. اختيار واحد بس.` },
    ],
    novelty: [
      { scene: 'search', boy: `${child} يتفرج على الجديد من بعيد، من غير ما يلمسه.`, girl: `${child} تتفرج على الجديد من بعيد، من غير ما تلمسه.` },
      { scene: 'moon-step', boy: `${child} يقرب خطوة، ويقف لما يحب.`, girl: `${child} تقرب خطوة، وتقف لما تحب.` },
      { scene: 'first-word', boy: `${child} يجرب مرة صغيرة، وبعديها يقدر يرجع.`, girl: `${child} تجرب مرة صغيرة، وبعديها تقدر ترجع.` },
    ],
    sharing: [
      { scene: 'welcome-hands', boy: `${child} يلاحظ إن فيه طفل تاني مستني.`, girl: `${child} تلاحظ إن فيه طفل تاني مستني.` },
      { scene: 'apples', boy: `${child} يقسم حاجة واحدة لنصين.`, girl: `${child} تقسم حاجة واحدة لنصين.` },
      { scene: 'still-holding', boy: `${child} يلعب الدور الجاي معاه، مش لوحده.`, girl: `${child} تلعب الدور الجاي معاها، مش لوحدها.` },
    ],
  }

  const pages: BuiltPage[] = bodies[lesson.id].map((page) => ({
    scene: page.scene,
    text: page[gender],
  }))
  if (withThem) pages.push({ scene: 'hands', text: withThem })
  return { lesson, dedication, pages }
}
