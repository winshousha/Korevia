import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Mascot from '../components/Mascot.jsx'
import StreakFlame from '../components/StreakFlame.jsx'
import BadgeCard from '../components/BadgeCard.jsx'
import { LANGUAGES } from '../data/languages.js'
import { UNITS } from '../data/lessons.js'
import { useProgress, ALL_BADGES } from '../context/ProgressContext.jsx'

const ACCENT_HEX = { lacquer: '#E8483C', gold: '#F2B705', indigo: '#4E5BC6' }

export default function Dashboard() {
  const { xp, streak, completedLessons, languageXp, badges } = useProgress()

  const totalLessons = Object.values(UNITS).flat().reduce((sum, u) => sum + u.lessons.length, 0)
  const overallPct = Math.round((completedLessons.length / totalLessons) * 100)

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl font-semibold">Ton tableau de bord</h1>
            <p className="mt-2 text-ink/70 dark:text-paper/70">Un aperçu de tes progrès sur toutes les langues.</p>
          </div>
          <Mascot expression="happy" accessory="headband" accentHex="#E8483C" size={90} floating={false} />
        </div>

        {/* Stats globales */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl2 border border-ink/5 dark:border-paper/10 p-6">
            <p className="text-sm text-ink/50 dark:text-paper/50">XP total</p>
            <p className="mt-1 font-display text-4xl font-semibold text-gold-600 dark:text-gold-300">{xp}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-xl2 border border-ink/5 dark:border-paper/10 p-6">
            <StreakFlame days={streak} size="lg" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl2 border border-ink/5 dark:border-paper/10 p-6">
            <p className="text-sm text-ink/50 dark:text-paper/50">Progression globale</p>
            <p className="mt-1 font-display text-4xl font-semibold text-jade-600 dark:text-jade-300">{overallPct}%</p>
            <p className="text-xs text-ink/40 dark:text-paper/40">{completedLessons.length}/{totalLessons} leçons</p>
          </motion.div>
        </div>

        {/* Par langue */}
        <h2 className="mt-14 mb-5 font-display text-2xl font-semibold">Par langue</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {LANGUAGES.map((lang, i) => {
            const langXp = languageXp?.[lang.id] || 0
            const langLessons = UNITS[lang.id]?.flatMap((u) => u.lessons) || []
            const langDone = langLessons.filter((l) => completedLessons.includes(l.id)).length
            const pct = langLessons.length ? Math.round((langDone / langLessons.length) * 100) : 0
            return (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl2 border border-ink/5 dark:border-paper/10 p-6"
              >
                <div className="flex items-center gap-3">
                  <Mascot size={44} floating={false} expression="happy" accessory={lang.accessory} accentHex={ACCENT_HEX[lang.accent]} />
                  <div>
                    <p className="font-display font-semibold">{lang.name}</p>
                    <p className="text-xs text-ink/50 dark:text-paper/50">{langXp} XP</p>
                  </div>
                </div>
                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-ink/5 dark:bg-paper/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: ACCENT_HEX[lang.accent] }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <p className="mt-2 text-xs text-ink/40 dark:text-paper/40">{pct}% du parcours</p>
              </motion.div>
            )
          })}
        </div>

        {/* Badges */}
        <h2 className="mt-14 mb-5 font-display text-2xl font-semibold">Badges</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {ALL_BADGES.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} unlocked={badges.includes(badge.id)} />
          ))}
        </div>

        {/* Défi du jour + classement (démo) */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl2 border border-lacquer-500/20 bg-lacquer-500/5 p-6"
          >
            <p className="text-sm font-semibold text-lacquer-600 dark:text-lacquer-300">Défi du jour</p>
            <p className="mt-2 font-display text-lg font-semibold">Termine 2 leçons avant minuit</p>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-ink/5 dark:bg-paper/10">
              <div className="h-full w-1/2 rounded-full bg-lacquer-500" />
            </div>
            <p className="mt-2 text-xs text-ink/40 dark:text-paper/40">1/2 leçon · récompense : +20 XP bonus</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-xl2 border border-ink/5 dark:border-paper/10 p-6"
          >
            <p className="text-sm font-semibold text-ink/60 dark:text-paper/60">Classement de la semaine (démo)</p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                { name: 'Aïcha', xp: 410 },
                { name: 'Toi', xp, self: true },
                { name: 'Marc', xp: 190 },
              ]
                .sort((a, b) => b.xp - a.xp)
                .map((row, i) => (
                  <li
                    key={row.name}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                      row.self ? 'bg-lacquer-500/10 font-semibold' : ''
                    }`}
                  >
                    <span>#{i + 1} {row.name}</span>
                    <span className="font-mono">{row.xp} XP</span>
                  </li>
                ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
