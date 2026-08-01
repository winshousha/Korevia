import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Mascot from '../components/Mascot.jsx'
import { getLanguage } from '../data/languages.js'
import { UNITS } from '../data/lessons.js'
import { useProgress } from '../context/ProgressContext.jsx'

const ACCENT_HEX = { lacquer: '#E8483C', gold: '#F2B705', indigo: '#4E5BC6' }

export default function LessonPath() {
  const { langId } = useParams()
  const lang = getLanguage(langId)
  const { completedLessons } = useProgress()

  if (!lang) return <Navigate to="/langues" replace />

  const units = UNITS[langId] || []
  const accentHex = ACCENT_HEX[lang.accent]

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-3xl px-5 py-12">
        <div className="flex items-center gap-4">
          <Mascot size={70} floating={false} expression="happy" accessory={lang.accessory} accentHex={accentHex} />
          <div>
            <p className="text-sm text-ink/50 dark:text-paper/50">{lang.native}</p>
            <h1 className="font-display text-3xl font-semibold">{lang.name}</h1>
          </div>
        </div>

        <div className="mt-10 space-y-12">
          {units.map((unit, uIdx) => (
            <div key={unit.id}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-5"
              >
                <h2 className="font-display text-xl font-semibold">
                  Unité {uIdx + 1} — {unit.title}
                </h2>
                <p className="text-sm text-ink/60 dark:text-paper/60">{unit.description}</p>
              </motion.div>

              <div className="space-y-3">
                {unit.lessons.map((lesson, lIdx) => {
                  const done = completedLessons.includes(lesson.id)
                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: lIdx * 0.05 }}
                    >
                      <Link
                        to={`/lecon/${lang.id}/${lesson.id}`}
                        className={`flex items-center justify-between rounded-xl2 border p-4 transition-colors ${
                          done
                            ? 'border-jade-500/30 bg-jade-100/50 dark:bg-jade-500/10'
                            : 'border-ink/5 dark:border-paper/10 hover:border-lacquer-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ${
                              done ? 'bg-jade-500 text-white' : 'bg-ink/5 dark:bg-paper/10'
                            }`}
                          >
                            {done ? '✓' : lIdx + 1}
                          </span>
                          <div>
                            <p className="font-semibold">{lesson.title}</p>
                            <p className="text-xs text-ink/50 dark:text-paper/50">+{lesson.xp} XP</p>
                          </div>
                        </div>
                        <span className="text-ink/30 dark:text-paper/30">→</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
