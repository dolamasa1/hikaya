import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useMatch } from 'react-router-dom'
import { ThemeContext, useTheme } from '../data/useTheme'
import type { ThemeId } from '../data/theme'
import { AmbientBackdrop } from './AmbientBackdrop'
import { WizardStepContext } from './wizardStep'

const themeChoices: { id: ThemeId; title: string; note: string }[] = [
  { id: 'default', title: 'Default', note: 'الشكل الأصلي' },
  { id: 'text', title: 'الكلام', note: 'صفحة مسطحة وحبر' },
  { id: 'paper', title: 'ورق', note: 'ألوان مائية وملمس' },
  { id: 'night', title: 'ليل', note: 'حفر كحلي' },
]

export function Layout() {
  const reading = useMatch('/books/:slug/read')
  const location = useLocation()
  const [theme, choose] = useTheme()
  const [stepIndex, setStepIndex] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!settingsOpen) return
    function closeOnOutside(event: MouseEvent) {
      if (!settingsRef.current?.contains(event.target as Node)) setSettingsOpen(false)
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setSettingsOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [settingsOpen])

  return (
    <ThemeContext.Provider value={{ theme, choose }}>
    <WizardStepContext.Provider value={setStepIndex}>
    <div className={reading ? 'app is-reading' : 'app'}>
      <AmbientBackdrop theme={theme} stepIndex={stepIndex} mark={location.pathname} />
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
            <div className="profile" ref={settingsRef}>
              <button
                type="button"
                className="icon-btn"
                aria-expanded={settingsOpen}
                aria-haspopup="dialog"
                aria-label="الإعدادات"
                onClick={() => setSettingsOpen((open) => !open)}
              >
                <UserIcon />
              </button>
              {settingsOpen && (
                <div className="profile-panel" role="dialog" aria-label="الإعدادات">
                  <p className="footer-label">أسلوب الحكاية</p>
                  <div className="profile-themes" role="radiogroup" aria-label="أسلوب الحكاية">
                    {themeChoices.map((choice) => (
                      <button
                        key={choice.id}
                        type="button"
                        role="radio"
                        aria-checked={theme === choice.id}
                        data-theme={choice.id}
                        className={theme === choice.id ? 'profile-theme is-on' : 'profile-theme'}
                        onClick={() => choose(choice.id)}
                      >
                        <strong>{choice.title}</strong>
                        <span>{choice.note}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
    </WizardStepContext.Provider>
    </ThemeContext.Provider>
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
