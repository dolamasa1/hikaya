import { asset } from './asset'

export const people = [
  { id: 'babies', label: 'رضّع', image: asset('/images/portrait-baby.jpg'), to: '/books?for=babies' },
  { id: 'kids', label: 'أطفال', image: asset('/images/portrait-child.jpg'), to: '/books?for=kids' },
  { id: 'siblings', label: 'الإخوات', image: asset('/images/portrait-siblings.jpg'), to: '/books?for=family' },
  { id: 'dad', label: 'بابا', image: asset('/images/portrait-dad.jpg'), to: '/books?for=family' },
]
