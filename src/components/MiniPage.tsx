import type { Scene } from '../data/books'
import type { LessonId } from '../data/lessons'
import { getStoryStyle, type StoryStyleId } from '../data/styles'
import { PageArt } from './PageArt'
import { TextPlate } from './TextPlate'

export function MiniPage({
  styleId,
  scene,
  text,
  name,
  lessonId,
}: {
  styleId: StoryStyleId
  scene: Scene
  text: string
  name: string
  lessonId: LessonId
}) {
  const style = getStoryStyle(styleId)
  if (style.textOnly) {
    return <TextPlate compact name={name} text={text} lessonId={lessonId} />
  }
  return <PageArt compact scene={scene} cover={style.cover} ink={style.ink} />
}
