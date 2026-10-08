import { asset } from './asset'

export type Audience = 'babies' | 'kids' | 'family'
export type Gender = 'boy' | 'girl'
export type Line = 'grammar' | 'faces'

export type Gendered = {
  boy: string
  girl: string
}

export type Scene =
  | 'house-wait'
  | 'morning-window'
  | 'welcome-hands'
  | 'sleep-tiptoe'
  | 'toys'
  | 'first-word'
  | 'hands'
  | 'apples'
  | 'pillows'
  | 'playhouse'
  | 'rebuild'
  | 'still-holding'
  | 'search'
  | 'kitchen-empty'
  | 'curtain'
  | 'cat'
  | 'door-hug'
  | 'found'
  | 'eid-lights'
  | 'kahk'
  | 'new-clothes'
  | 'gift'
  | 'eid-said'
  | 'sleep-gift'
  | 'roof'
  | 'moon-reach'
  | 'lanterns'
  | 'moon-step'
  | 'i-see-you'
  | 'pocket-light'
  | 'market-enter'
  | 'spices'
  | 'count-balloons'
  | 'red-balloon'
  | 'crowd'
  | 'home-balloon'
  | 'cover'
  | 'dedication'

export type StoryPage = Gendered & { scene: Scene }

export type Book = {
  slug: string
  title: string
  blurb: string
  audience: Audience
  kind: Line
  price: number
  cover: string
  ink: string
  image: string
  scene: string
  personalizes: string[]
  dedication: Gendered
  pages: StoryPage[]
}

export const lineLabel: Record<Line, string> = {
  grammar: 'باسم طفلك',
  faces: 'عيش حكايتك أكتر',
}

export const audiences: { id: Audience | 'all'; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'babies', label: 'رضّع' },
  { id: 'kids', label: 'أطفال' },
  { id: 'family', label: 'العيلة' },
]

const grammar = ['الاسم جوه الحكاية', 'الولد أو البنت يغيّر الكلام', 'إهداء الصفحة الأولى']
const faceLine = ['الاسم جوه الحكاية', 'الولد أو البنت يغيّر الكلام', 'وش حقيقي يتحوّل لرسم', 'إهداء الصفحة الأولى']

export const books: Book[] = [
  {
    slug: 'youm-ma-etwaladet',
    title: 'يوم ما اتولدت',
    blurb: 'حكاية تحتفل بمولود جديد.',
    audience: 'babies',
    price: 450,
    cover: '#f3c7a6',
    ink: '#5c3317',
    kind: 'grammar',
    image: asset('/images/cover-born.jpg'),
    scene: asset('/images/moment-baby.jpg'),
    personalizes: grammar,
    dedication: {
      boy: 'إلى {name}، في اليوم الذي وصل فيه البيت.',
      girl: 'إلى {name}، في اليوم الذي وصلت فيه البيت.',
    },
    pages: [
      {
        scene: 'house-wait',
        boy: 'قبل {name}، كان البيت مستني صوتًا جديدًا.',
        girl: 'قبل {name}، كان البيت مستني صوتًا جديدًا.',
      },
      {
        scene: 'morning-window',
        boy: 'وفي الصباح وصل {name}، والبيت فتح شبابيكه.',
        girl: 'وفي الصباح وصلت {name}، والبيت فتح شبابيكه.',
      },
      {
        scene: 'welcome-hands',
        boy: 'مسكوا إيده الصغيرة، وقالوا: أهلًا يا {name}.',
        girl: 'مسكوا إيدها الصغيرة، وقالوا: أهلًا يا {name}.',
      },
      {
        scene: 'sleep-tiptoe',
        boy: '{name} نايم، والبيت ماشي على أطراف صوابعه.',
        girl: '{name} نايمة، والبيت ماشي على أطراف صوابعه.',
      },
      {
        scene: 'toys',
        boy: 'كل لعبة في الرف استنت {name} يصحى.',
        girl: 'كل لعبة في الرف استنت {name} تصحى.',
      },
      {
        scene: 'first-word',
        boy: 'ومن يومها، اسم {name} هو أول كلمة في البيت.',
        girl: 'ومن يومها، اسم {name} هو أول كلمة في البيت.',
      },
    ],
  },
  {
    slug: 'ana-we-enta',
    title: 'أنا وأنت',
    blurb: 'حكاية عن اثنين يمسكان الإيد.',
    audience: 'family',
    price: 520,
    cover: '#d7e3c8',
    ink: '#2f3d28',
    kind: 'grammar',
    image: asset('/images/cover-together.jpg'),
    scene: asset('/images/moment-family.jpg'),
    personalizes: grammar,
    dedication: {
      boy: 'إلى {name}، ولكل من يمسك إيده.',
      girl: 'إلى {name}، ولكل من تمسك إيدها.',
    },
    pages: [
      {
        scene: 'hands',
        boy: '{name} يمد إيده، وفي الإيد التانية حد يحب اللعب.',
        girl: '{name} تمد إيدها، وفي الإيد التانية حد يحب اللعب.',
      },
      {
        scene: 'apples',
        boy: 'يمشوا سوا لحد المطبخ، ويعدّوا التفاح.',
        girl: 'يمشوا سوا لحد المطبخ، ويعدّوا التفاح.',
      },
      {
        scene: 'pillows',
        boy: '{name} يختار المخدة الزرقا، وصاحبه يختار الحمرا.',
        girl: '{name} تختار المخدة الزرقا، وصاحبتها تختار الحمرا.',
      },
      {
        scene: 'playhouse',
        boy: 'يبنون بيتًا صغيرًا، و{name} يحرس الباب.',
        girl: 'يبنون بيتًا صغيرًا، و{name} تحرس الباب.',
      },
      {
        scene: 'rebuild',
        boy: 'لما يقع البيت، يضحك {name} ويعيدوه من الأول.',
        girl: 'لما يقع البيت، تضحك {name} ويعيدوه من الأول.',
      },
      {
        scene: 'still-holding',
        boy: 'وفي آخر اليوم، {name} لسه ماسك الإيد التانية.',
        girl: 'وفي آخر اليوم، {name} لسه ماسكة الإيد التانية.',
      },
    ],
  },
  {
    slug: 'feenak',
    title: 'فينك؟',
    blurb: 'كتاب بحث صغير للصغار.',
    audience: 'kids',
    price: 480,
    cover: '#c9dff2',
    ink: '#1d3a52',
    kind: 'grammar',
    image: asset('/images/cover-find.jpg'),
    scene: asset('/images/moment-birthday.jpg'),
    personalizes: grammar,
    dedication: {
      boy: 'إلى {name}، البطل الذي نبحث عنه دائمًا.',
      girl: 'إلى {name}، البطلة التي نبحث عنها دائمًا.',
    },
    pages: [
      {
        scene: 'search',
        boy: 'فين {name}؟ البيت كله بيسأل.',
        girl: 'فين {name}؟ البيت كله بيسأل.',
      },
      {
        scene: 'kitchen-empty',
        boy: 'دورنا في المطبخ. {name} مش هناك.',
        girl: 'دورنا في المطبخ. {name} مش هناك.',
      },
      {
        scene: 'curtain',
        boy: 'وراء الستارة في ضحكة، و{name} لسه مختبي.',
        girl: 'وراء الستارة في ضحكة، و{name} لسه مختبية.',
      },
      {
        scene: 'cat',
        boy: 'تحت الترابيزة قطة نايمة، مش {name}.',
        girl: 'تحت الترابيزة قطة نايمة، مش {name}.',
      },
      {
        scene: 'door-hug',
        boy: 'لقيناه عند الباب. {name} كان مستني الحضن.',
        girl: 'لقيناها عند الباب. {name} كانت مستنية الحضن.',
      },
      {
        scene: 'found',
        boy: 'من يومها، لما نسأل فين {name}؟ نلاقيه في الحضن.',
        girl: 'من يومها، لما نسأل فين {name}؟ نلاقيها في الحضن.',
      },
    ],
  },
  {
    slug: 'awel-eid',
    title: 'أول عيد',
    blurb: 'أول عيد، ونور، وهدية صغيرة.',
    audience: 'family',
    price: 560,
    cover: '#f0d48a',
    ink: '#5a3b12',
    kind: 'grammar',
    image: asset('/images/cover-eid.jpg'),
    scene: asset('/images/moment-eid.jpg'),
    personalizes: grammar,
    dedication: {
      boy: 'إلى {name}، في أول عيد له في البيت.',
      girl: 'إلى {name}، في أول عيد لها في البيت.',
    },
    pages: [
      {
        scene: 'eid-lights',
        boy: 'أول عيد لـ {name}، والبيت فيه نور وقمر.',
        girl: 'أول عيد لـ {name}، والبيت فيه نور وقمر.',
      },
      {
        scene: 'kahk',
        boy: '{name} يشم ريحة الكحك، ويضحك.',
        girl: '{name} تشم ريحة الكحك، وتضحك.',
      },
      {
        scene: 'new-clothes',
        boy: 'يلبس جديد، والكم واسع على إيده.',
        girl: 'تلبس جديد، والكم واسع على إيدها.',
      },
      {
        scene: 'gift',
        boy: 'ياخد هدية صغيرة، ويفك الشريط لوحده.',
        girl: 'تاخد هدية صغيرة، وتفك الشريط لوحدها.',
      },
      {
        scene: 'eid-said',
        boy: 'الكل يقول له: عيد سعيد يا {name}.',
        girl: 'الكل يقول لها: عيد سعيد يا {name}.',
      },
      {
        scene: 'sleep-gift',
        boy: 'وينام {name} وهو ماسك الهدية، والنور لسه في البيت.',
        girl: 'وتنام {name} وهي ماسكة الهدية، والنور لسه في البيت.',
      },
    ],
  },
  {
    slug: 'lelt-el-amar',
    title: 'ليلة القمر',
    blurb: 'حكاية أهدى، والبطل يترسم من وش حقيقي.',
    audience: 'kids',
    kind: 'faces',
    price: 890,
    cover: '#1d3a52',
    ink: '#f6f1e7',
    image: asset('/images/cover-moon.jpg'),
    scene: asset('/images/cover-moon.jpg'),
    personalizes: faceLine,
    dedication: {
      boy: 'إلى {name}، اللي شاف القمر قريب.',
      girl: 'إلى {name}، اللي شافت القمر قريب.',
    },
    pages: [
      {
        scene: 'roof',
        boy: 'في ليلة هادية، طلع {name} على السطح.',
        girl: 'في ليلة هادية، طلعت {name} على السطح.',
      },
      {
        scene: 'moon-reach',
        boy: 'القمر كبير، و{name} مد إيده عشان يلمسه.',
        girl: 'القمر كبير، و{name} مدت إيدها عشان تلمسه.',
      },
      {
        scene: 'lanterns',
        boy: 'الفوانيس حواليه، و{name} يعد النجوم واحدة واحدة.',
        girl: 'الفوانيس حواليه، و{name} تعد النجوم واحدة واحدة.',
      },
      {
        scene: 'moon-step',
        boy: 'القمر نزل خطوة، و{name} سكت عشان ما يخافش.',
        girl: 'القمر نزل خطوة، و{name} سكتت عشان ما تخافش.',
      },
      {
        scene: 'i-see-you',
        boy: 'ضحك {name} وقال: أنا شايفك.',
        girl: 'ضحكت {name} وقالت: أنا شايفك.',
      },
      {
        scene: 'pocket-light',
        boy: 'ونزل {name} وهو شايل ضوء القمر في جيبه.',
        girl: 'ونزلت {name} وهي شايلة ضوء القمر في جيبها.',
      },
    ],
  },
  {
    slug: 'souq-el-balad',
    title: 'سوق البلد',
    blurb: 'حكاية أغنى تفاصيل، ووش البطل من صورة حقيقية.',
    audience: 'family',
    kind: 'faces',
    price: 940,
    cover: '#c45c26',
    ink: '#fff8f3',
    image: asset('/images/cover-market.jpg'),
    scene: asset('/images/cover-market.jpg'),
    personalizes: faceLine,
    dedication: {
      boy: 'إلى {name}، اللي مشى السوق ورجع ببالون.',
      girl: 'إلى {name}، اللي مشيت السوق ورجعت ببالون.',
    },
    pages: [
      {
        scene: 'market-enter',
        boy: '{name} يمسك إيد حد كبير، ويدخل سوق البلد.',
        girl: '{name} تمسك إيد حد كبير، وتدخل سوق البلد.',
      },
      {
        scene: 'spices',
        boy: 'يشم التوابل، ويعطس، والناس تضحك معاه.',
        girl: 'تشم التوابل، وتعطس، والناس تضحك معاها.',
      },
      {
        scene: 'count-balloons',
        boy: '{name} يعد البالونات: أحمر، أصفر، وأخضر.',
        girl: '{name} تعد البالونات: أحمر، أصفر، وأخضر.',
      },
      {
        scene: 'red-balloon',
        boy: 'يختار البالون الأحمر، ويمسك الخيط كويس.',
        girl: 'تختار البالون الأحمر، وتمسك الخيط كويس.',
      },
      {
        scene: 'crowd',
        boy: 'في الزحمة، {name} يفضل ماسك الإيد وما يسيبهاش.',
        girl: 'في الزحمة، {name} تفضل ماسكة الإيد وما تسيبهاش.',
      },
      {
        scene: 'home-balloon',
        boy: 'يرجع البيت وهو ماسك البالون، والحكاية لسه في إيده.',
        girl: 'ترجع البيت وهي ماسكة البالون، والحكاية لسه في إيدها.',
      },
    ],
  },
]

export function getBook(slug: string | undefined) {
  return books.find((book) => book.slug === slug)
}

export function audienceLabel(id: Audience) {
  return audiences.find((item) => item.id === id)?.label ?? id
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(price)
}

export function fillName(template: string, name: string, gender?: Gender) {
  const fallback = gender === 'boy' ? 'الطفل' : 'الطفلة'
  const safe = name.trim() || fallback
  return template.replaceAll('{name}', safe)
}

export function lineText(copy: Gendered, gender: Gender, name: string) {
  return fillName(copy[gender], name, gender)
}
