import { Link, useParams } from 'react-router-dom'
import { getParentLikeness } from '../components/FaslCastPicker'
import { PageArt } from '../components/PageArt'
import { StoryRating } from '../components/StoryRating'
import { asset } from '../data/asset'
import { getPost } from '../data/community'
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

  const story = buildLesson(post.lessonId, post.gender, post.name, post.extraIds)
  const lesson = getLesson(post.lessonId)
  const style = getStoryStyle(post.styleId)
  const parentFace = style.textOnly ? undefined : getParentLikeness(post.likenessIds?.[0] ?? '')
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
            <h1 className="page-title">{post.name}</h1>
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
                <PageArt
                  scene={plate.scene}
                  cover={style.cover}
                  ink={style.ink}
                  face={index === plates.length - 1 ? parentFace : undefined}
                />
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
