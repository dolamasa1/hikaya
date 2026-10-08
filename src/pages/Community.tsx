import { Link } from 'react-router-dom'
import { StoryRating } from '../components/StoryRating'
import { asset } from '../data/asset'
import { chosenCharacters } from '../data/characters'
import { loadCommunity } from '../data/community'
import { getLesson } from '../data/lessons'
import { getStoryStyle } from '../data/styles'

export function Community() {
  const posts = loadCommunity()

  return (
    <section className="section community">
      <div className="wrap">
        <div className="section-head">
          <h1 className="page-title">المجتمع</h1>
          <Link className="btn" to="/fasl">
            فصل حكايتك
          </Link>
        </div>
        <p className="sub">حكايات هادية من البيت. الغلاف باسم الطفل، والحساب اللي نشرها تحتها.</p>
        <div className="gallery">
          {posts.map((post) => {
            const lesson = getLesson(post.lessonId)
            const style = getStoryStyle(post.styleId)
            const cast = chosenCharacters(post.extraIds)
            return (
              <Link key={post.id} to={`/community/${post.id}`} className="gallery-card">
                <div className="gallery-cover">
                  <img src={asset(post.cover)} alt="" />
                  {post.yours && <span className="gallery-tag">حكايتكم</span>}
                </div>
                <div className="gallery-info">
                  <p className="kicker">{lesson?.title} · {style.title}</p>
                  <h2>{post.name}</h2>
                  <p>{lesson?.sign}</p>
                  <div className="gallery-meta">
                    <p className="gallery-by">{post.publisher}</p>
                    <StoryRating rating={post.rating} reviews={post.reviews} />
                  </div>
                  {cast.length > 0 && <p className="feed-cast">{cast.map((item) => item.label).join(' · ')}</p>}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
