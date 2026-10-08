import { Link } from 'react-router-dom'
import { BookCard } from '../components/BookCard'
import { asset } from '../data/asset'
import { books } from '../data/books'

const moments = [
  { slug: 'awel-eid', label: 'أول عيد' },
  { slug: 'youm-ma-etwaladet', label: 'مولود جديد' },
  { slug: 'feenak', label: 'لعبة بحث' },
  { slug: 'ana-we-enta', label: 'العيلة' },
]

const reviews = [
  { name: 'منى', date: '٣ مايو', text: 'الاسم طلع جوه الحكاية، والبنت قرت الصفحة أكتر من مرة.' },
  { name: 'كريم', date: '٢ أبريل', text: 'الطلب كان سهل، والإهداء طلع زي ما كتبته.' },
  { name: 'هبة', date: '١٨ مارس', text: 'هدية هادية، والطفل لقى اسمه من أول صفحة.' },
  { name: 'ياسين', date: '٧ يناير', text: 'المعاينة وضحت الشكل قبل ما نكمّل.' },
]

export function Home() {
  return (
    <>
      <section className="hero">
        <img className="hero-photo" src={asset('/images/hero-room.jpg')} alt="" />
        <div className="hero-copy">
          <h1>فصل حكايتك</h1>
          <p>بروتوكول للسلوك اللي بتلاحظه، والحكاية تنفّذه خطوة بخطوة.</p>
          <Link className="btn btn-light" to="/fasl">
            ابدأ البروتوكول
          </Link>
          <Link className="hero-quiet" to="/community">
            المجتمع
          </Link>
        </div>
      </section>
      <p className="trust">٤٫٦ من ٥ · كتب مخصصة للأطفال في مصر</p>

      <section className="section">
        <div className="wrap">
          <ol className="protocol-steps">
            <li>
              <span>١</span>
              <h3>نرصد السلوك</h3>
              <p>اللي بيحصل في البيت، من غير تشخيص.</p>
            </li>
            <li>
              <span>٢</span>
              <h3>نثبت البروتوكول</h3>
              <p>ثلاث خطوات علمية تمشي عليها الحكاية.</p>
            </li>
            <li>
              <span>٣</span>
              <h3>الحكاية تنفّذه</h3>
              <p>باسم الطفل، وبنفس ترتيب البروتوكول.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section" id="faces">
        <div className="wrap">
          <h2>عيش حكايتك أكتر</h2>
          <p className="sub">تختار وش حقيقي، والحكاية ترسمه كرتون. كل شخصية زيادة بـ ٣٠ ج.م.</p>
          <Link className="btn" to="/color">
            تلوين
          </Link>
          <div className="face-sample">
            <img src={asset('/images/face-laila.jpg')} alt="صورة حقيقية" />
            <span>صورة حقيقية</span>
            <img src={asset('/images/toon-laila.jpg')} alt="الرسم في الحكاية" />
            <span>الرسم في الحكاية</span>
          </div>
          <div className="book-grid books-two">
            {books
              .filter((book) => book.kind === 'faces')
              .map((book) => (
                <BookCard key={book.slug} book={book} />
              ))}
          </div>
        </div>
      </section>

      <section className="section shelf-quiet" id="name">
        <div className="wrap">
          <h2>باسم طفلك</h2>
          <p className="sub">الاسم، والولد أو البنت. الكلام نفسه بيتغير: وصل ووصلت، يضحك وتضحك.</p>
          <div className="book-grid">
            {books
              .filter((book) => book.kind === 'grammar')
              .map((book) => (
                <BookCard key={book.slug} book={book} />
              ))}
          </div>
        </div>
      </section>

      <section className="section" id="moments">
        <div className="wrap">
          <h2>هدايا للمناسبات المهمة</h2>
          <div className="moment-row">
            {moments.map((moment) => {
              const book = books.find((item) => item.slug === moment.slug)!
              return (
                <Link key={moment.label} to={`/books/${book.slug}`} className="moment">
                  <img src={book.scene} alt="" />
                  <span>{moment.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="band">
        <img src={asset('/images/feature-read.jpg')} alt="" />
        <div>
          <h2>كتب تتحب وتتفتح تاني</h2>
          <p>اسم الطفل جوه الصفحات، وإهداء منك على الصفحة الأولى.</p>
          <Link className="btn" to="/books">
            شوف الكتب
          </Link>
        </div>
      </section>

      <section className="section" id="how">
        <div className="wrap">
          <h2>هدايا ليها معنى، في دقايق</h2>
          <ol className="steps">
            <li>
              <h3>لاقي الكتاب</h3>
              <p>اختار حكاية من الرف.</p>
            </li>
            <li>
              <h3>خصّصها بهدوء</h3>
              <p>اسم، وشكل، وتفاصيل صغيرة.</p>
            </li>
            <li>
              <h3>اكتب رسالة</h3>
              <p>كلامك يظهر على أول صفحة.</p>
            </li>
            <li>
              <h3>شوف المعاينة</h3>
              <p>الكتاب يتغير وأنت بتكتب.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <h2>ناس كتير فرّحت حد بالكتاب</h2>
          <div className="reviews">
            {reviews.map((review) => (
              <article key={review.name}>
                <p className="stars" aria-label="خمسة نجوم">
                  ★★★★★
                </p>
                <p>{review.text}</p>
                <p className="review-by">
                  {review.name}، {review.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story" id="story">
        <img src={asset('/images/story-paint.jpg')} alt="" />
        <div>
          <h2>متصنوعة بعناية</h2>
          <p>حكايات عربية مكتوبة عشان تتقرأ بهدوء، وتتفتح أكتر من مرة.</p>
          <Link className="btn" to="/books">
            اقرأ الكتب
          </Link>
        </div>
      </section>
    </>
  )
}
