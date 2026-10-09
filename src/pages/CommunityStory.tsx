import { Link, useParams } from 'react-router-dom'
import { PageArt } from '../components/PageArt'
import { StoryRating } from '../components/StoryRating'
import { asset } from '../data/asset'
import { getPost, postExtras, postTitle } from '../data/community'
import { neutralCopy } from '../data/fasl-copy'
import { buildLesson, getLesson } from '../data/lessons'
import { getStoryStyle } from '../data/styles'

export function CommunityStory() {
  const { id } = useParams()
  const post = getPost(id)

  if (!post) {
    return (
      <section className="section">
        <div className="wrap">
          <h1>الحكاية مش موجودة</h1>
          <Link className="btn" to="/community">
            ارجع للمجتمع
          </Link>
        </div>
      </section>
    )
  }

  const story = buildLesson(post.lessonId, post.gender, postTitle(post), postExtras(post))
  const lesson = getLesson(post.lessonId)
  const style = getStoryStyle(post.styleId)
  const plates = [{ scene: 'dedication' as const, text: story.dedication }, ...story.pages]

  return (
    <section className="section">
      <div className="reader">
        <div className="story-head">
          <div className="gallery-cover">
            <img src={asset(post.cover)} alt="" />
          </div>
          <div>
            <p className="kicker">
              {lesson?.title} · {style.title}
              {post.yours ? ' · حكايتكم' : ''}
            </p>
            <p className="sub">{neutralCopy.readerCaption}</p>
            <h1 className="page-title">{postTitle(post)}</h1>
            <p className="gallery-by">{post.publisher}</p>
            <StoryRating rating={post.rating} reviews={post.reviews} />
          </div>
        </div>
        <div className="reader-book">
          {plates.map((plate, index) => (
            <article
              className={style.textOnly ? 'reader-sheet is-text-only' : 'reader-sheet'}
              key={`${plate.scene}-${index}`}
            >
              {style.textOnly ? (
                <div className="reader-words-mark" aria-hidden="true">
                  فصل حكايتك
                </div>
              ) : (
                <PageArt scene={plate.scene} cover={style.cover} ink={style.ink} />
              )}
              <p className="reader-text">{plate.text}</p>
            </article>
          ))}
        </div>
        <Link className="text-btn" to="/community">
          ارجع للمجتمع
        </Link>
      </div>
    </section>
  )
}
