import { Link, NavLink, Outlet, useMatch } from 'react-router-dom'

export function Layout() {
  const reading = useMatch('/books/:slug/read')

  return (
    <div className={reading ? 'app is-reading' : 'app'}>
      <div className="promo">
        اطلب كتابًا، والتاني بنص الثمن
        <span>HEKAYA</span>
      </div>
      <header className="header">
        <div className="wrap header-inner">
          <NavLink to="/" className="logo" end>
            <Mark />
            حكايتك
          </NavLink>
          <nav className="nav">
            <NavLink to="/books" end>
              كتبنا
            </NavLink>
            <NavLink to="/color">تلوين</NavLink>
            <a href={`${import.meta.env.BASE_URL}#faces`}>عيش حكايتك أكتر</a>
            <NavLink to="/fasl">فصل حكايتك</NavLink>
            <NavLink to="/community">المجتمع</NavLink>
          </nav>
          <div className="tools">
            <span className="locale">مصر</span>
            <Link to="/books" aria-label="بحث">
              <SearchIcon />
            </Link>
            <span className="icon-btn" aria-hidden="true">
              <UserIcon />
            </span>
            <span className="icon-btn" aria-label="السلة فاضية">
              <BagIcon />
            </span>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <strong>حكايتك</strong>
            <p>كتب عربية مخصصة للأطفال في مصر. المعاينة دي من غير دفع أو طباعة.</p>
          </div>
          <div>
            <p className="footer-label">تسوق</p>
            <Link to="/books">كل الكتب</Link>
            <Link to="/books?for=babies">رضّع</Link>
            <Link to="/books?for=kids">أطفال</Link>
          </div>
          <div>
            <p className="footer-label">الحكاية</p>
            <a href={`${import.meta.env.BASE_URL}#how`}>إزاي بتتعمل</a>
            <a href={`${import.meta.env.BASE_URL}#story`}>عن حكايتك</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M4 22V10l12-6 12 6v12l-12 6z" fill="#12382f" />
      <path d="M16 8v16M8 13l8 4 8-4" fill="none" stroke="#f6f1e7" strokeWidth="1.6" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="9" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 19c1.4-3 3.4-4 6-4s4.6 1 6 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 9h10l-1 11H8L7 9z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9V8a3 3 0 0 1 6 0v1" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
