import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import IntroScene from '../components/IntroScene.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { LANGUAGES } from '../data/languages.js'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-5 pt-16 pb-24 sm:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div initial="hidden" animate="show">
            <motion.span
              custom={0}
              variants={fadeUp}
              className="inline-block rounded-full bg-lacquer-500/10 px-4 py-1.5 text-sm font-semibold text-lacquer-600 dark:text-lacquer-300"
            >
              日本語 · 中文 · 한국어 — pour francophones
            </motion.span>

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
            >
              Apprends une langue d'Asie de l'Est,
              <span className="text-lacquer-500"> un pas à la fois.</span>
            </motion.h1>

            <motion.p custom={2} variants={fadeUp} className="mt-6 max-w-md text-lg text-ink/70 dark:text-paper/70">
              Moji transforme le japonais, le chinois et le coréen en un parcours
              vivant : leçons courtes, retours immédiats et une mascotte qui
              célèbre chacun de tes progrès.
            </motion.p>

            <motion.div custom={3} variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/langues"
                className="rounded-xl2 bg-lacquer-500 px-8 py-4 font-display text-lg font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5"
              >
                Commencer gratuitement
              </Link>
              <Link
                to="/tableau-de-bord"
                className="font-semibold text-ink/70 hover:text-ink dark:text-paper/70 dark:hover:text-paper transition-colors"
              >
                Voir un tableau de bord démo →
              </Link>
            </motion.div>

            <motion.div custom={4} variants={fadeUp} className="mt-10 flex items-center gap-6 text-sm text-ink/50 dark:text-paper/50">
              <span>🎏 Japonais</span>
              <span>🏮 Chinois</span>
              <span>🪭 Coréen</span>
            </motion.div>
          </motion.div>

          <IntroScene />
        </div>
      </section>

      {/* Langues */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 font-display text-3xl font-semibold"
        >
          Choisis ta langue
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {LANGUAGES.map((lang, i) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/langues/${lang.id}`}
                className="group flex h-full flex-col rounded-xl2 border border-ink/5 dark:border-paper/10 bg-white/60 dark:bg-ink-card p-6 shadow-card transition-transform hover:-translate-y-1"
              >
                <span className="text-4xl">{lang.flagEmoji}</span>
                <h3 className="mt-4 font-display text-xl font-semibold">{lang.name}</h3>
                <p className="text-sm text-ink/50 dark:text-paper/50">{lang.native}</p>
                <p className="mt-3 text-sm text-ink/70 dark:text-paper/70">{lang.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-lacquer-500 group-hover:gap-2 transition-all">
                  Découvrir →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pourquoi Moji */}
      <section className="mx-auto max-w-6xl px-5 pb-28">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { emoji: '🎯', title: 'Leçons courtes', text: '5 à 10 minutes par jour, pensées pour tenir dans un vrai emploi du temps.' },
            { emoji: '💬', title: 'Retour immédiat', text: 'Moji réagit à chaque réponse et t\u2019explique ce qu\u2019il faut retenir.' },
            { emoji: '🔥', title: 'Progression ludique', text: 'Streaks, XP et badges pour donner envie de revenir chaque jour.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl2 border border-ink/5 dark:border-paper/10 p-6"
            >
              <span className="text-3xl">{item.emoji}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-ink/70 dark:text-paper/70">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-ink/5 dark:border-paper/10 px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-ink/50 dark:text-paper/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Moji. Projet de démonstration.</p>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  )
}
