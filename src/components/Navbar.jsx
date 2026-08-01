import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import { useProgress } from '../context/ProgressContext.jsx'

export default function Navbar() {
  const { pathname } = useLocation()
  const { xp, streak } = useProgress()
  const onHome = pathname === '/'

  return (
    <header className="sticky top-0 z-30 border-b border-ink/5 dark:border-paper/10 bg-paper/80 dark:bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-lacquer-500 text-white text-sm">文</span>
          Moji
        </Link>

        {!onHome && (
          <div className="hidden items-center gap-6 font-medium text-sm sm:flex">
            <Link to="/langues" className="hover:text-lacquer-500 transition-colors">Langues</Link>
            <Link to="/tableau-de-bord" className="hover:text-lacquer-500 transition-colors">Tableau de bord</Link>
          </div>
        )}

        <div className="flex items-center gap-3">
          {!onHome && (
            <div className="hidden sm:flex items-center gap-3 font-mono text-sm">
              <span className="flex items-center gap-1 rounded-full bg-gold-300/30 px-3 py-1 text-gold-600 dark:text-gold-300">
                ⭐ {xp} XP
              </span>
              <span className="flex items-center gap-1 rounded-full bg-lacquer-500/10 px-3 py-1 text-lacquer-600 dark:text-lacquer-300">
                🔥 {streak}
              </span>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
