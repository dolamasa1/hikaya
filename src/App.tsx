import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BookPage } from './pages/Book'
import { Catalog } from './pages/Catalog'
import { Home } from './pages/Home'
import { Personalize } from './pages/Personalize'
import { ColorPage } from './pages/ColorPage'
import { Community } from './pages/Community'
import { CommunityStory } from './pages/CommunityStory'
import { FaslBuilder } from './pages/FaslBuilder'
import { Read } from './pages/Read'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/color" element={<ColorPage />} />
          <Route path="/fasl" element={<FaslBuilder />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<CommunityStory />} />
          <Route path="/books" element={<Catalog />} />
          <Route path="/books/:slug" element={<BookPage />} />
          <Route path="/books/:slug/read" element={<Read />} />
          <Route path="/books/:slug/personalize" element={<Personalize />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
