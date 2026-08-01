import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import LanguageSelect from './pages/LanguageSelect.jsx'
import LessonPath from './pages/LessonPath.jsx'
import Lesson from './pages/Lesson.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/langues" element={<LanguageSelect />} />
      <Route path="/langues/:langId" element={<LessonPath />} />
      <Route path="/lecon/:langId/:lessonId" element={<Lesson />} />
      <Route path="/tableau-de-bord" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
