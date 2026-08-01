import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Mascot from '../components/Mascot.jsx'
import { LANGUAGES } from '../data/languages.js'
import { useProgress } from '../context/ProgressContext.jsx'

const ACCENT_HEX = { lacquer: '#E8483C', gold: '#F2B705', indigo: '#4E5BC6' }

export default function LanguageSelect() {
  const { languageXp } = useProgress()

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-5xl px-5 py-14">
        <h1 className="font-display text-4xl font-semibold">Quelle langue apprends-tu ?</h1>
        <p className="mt-3 max-w-lg text-ink/70 dark:text-paper/70">
          Choisis une langue pour commencer ou reprendre ton parcours. Tu peux
          avancer sur plusieurs langues en parallèle.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {LANGUAGES.map((lang, i) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/langues/${lang.id}`}
                className="group flex flex-col items-center rounded-xl2 border border-ink/5 dark:border-paper/10 bg-white/60 dark:bg-ink-card p-8 text-center shadow-card transition-transform hover:-translate-y-1"
              >
                <Mascot
                  size={110}
                  floating={false}
                  expression="happy"
                  accessory={lang.accessory}
                  accentHex={ACCENT_HEX[lang.accent]}
                />
                <h2 className="mt-5 font-display text-2xl font-semibold">{lang.name}</h2>
                <p className="text-sm text-ink/50 dark:text-paper/50">{lang.native}</p>
                <p className="mt-2 text-sm text-ink/70 dark:text-paper/70">{lang.tagline}</p>
                <p className="mt-4 font-mono text-xs text-ink/40 dark:text-paper/40">
                  {languageXp?.[lang.id] || 0} XP accumulés
                </p>
                <span className="mt-5 rounded-full bg-lacquer-500/10 px-4 py-1.5 text-sm font-semibold text-lacquer-600 dark:text-lacquer-300 group-hover:bg-lacquer-500 group-hover:text-white transition-colors">
                  Voir le parcours
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
