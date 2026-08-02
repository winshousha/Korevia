import { useMemo, useState } from 'react'
import { useNavigate, useParams, Navigate, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Mascot from '../components/Mascot.jsx'
import Buddy from '../components/Buddy.jsx'
import Confetti from '../components/Confetti.jsx'
import ExerciseCard from '../components/ExerciseCard.jsx'
import { getLanguage } from '../data/languages.js'
import { EXERCISE_BANK, UNITS } from '../data/lessons.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { speak } from '../utils/speech.js'

const ACCENT_HEX = { lacquer: '#E8483C', gold: '#F2B705', indigo: '#4E5BC6' }
const QUESTIONS_PER_LESSON = 4

export default function Lesson() {
  const { langId, lessonId } = useParams()
  const navigate = useNavigate()
  const lang = getLanguage(langId)
  const { completeLesson } = useProgress()

  const allLessons = (UNITS[langId] || []).flatMap((u) => u.lessons)
  const lessonMeta = allLessons.find((l) => l.id === lessonId)

  const questions = useMemo(() => {
    const bank = [...(EXERCISE_BANK[langId] || [])]
    return bank.sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_LESSON)
  }, [langId, lessonId])

  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState(null) // 'correct' | 'wrong' | null
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [fuTalking, setFuTalking] = useState(false)

  if (!lang || !lessonMeta) return <Navigate to="/langues" replace />

  const progressPct = Math.round((index / questions.length) * 100)

  const handleAnswered = (isCorrect) => {
    setFeedback(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) setCorrectCount((c) => c + 1)
  }

  const handleNext = () => {
    setFeedback(null)
    if (index + 1 >= questions.length) {
      setFinished(true)
      completeLesson(lessonMeta.id, lang.id, lessonMeta.xp)
    } else {
      setIndex((i) => i + 1)
    }
  }

  const handleListenPrompt = () => {
    speak(current?.prompt || '', 'fr-FR', {
      onStart: () => setFuTalking(true),
      onEnd: () => setFuTalking(false),
    })
  }

  const accentHex = ACCENT_HEX[lang.accent]

  if (finished) {
    const perfect = correctCount === questions.length
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-md rounded-xl2 bg-white dark:bg-ink-card p-8 text-center shadow-card"
        >
          {perfect && <Confetti count={26} />}
          <div className="flex items-center justify-center gap-2">
            <Mascot expression="excited" accessory={lang.accessory} accentHex={accentHex} size={140} />
            <Buddy talking={false} size={56} />
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold">
            {perfect ? 'Sans faute !' : 'Leçon terminée !'}
          </h1>
          <p className="mt-2 text-ink/70 dark:text-paper/70">
            {correctCount} / {questions.length} bonnes réponses
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 font-mono text-lg text-gold-600 dark:text-gold-300">
            ⭐ +{lessonMeta.xp} XP
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              to={`/langues/${lang.id}`}
              className="rounded-xl2 bg-lacquer-500 py-3 font-display font-semibold text-white shadow-card"
            >
              Continuer le parcours
            </Link>
            <Link to="/tableau-de-bord" className="text-sm font-semibold text-ink/60 dark:text-paper/60">
              Voir mon tableau de bord
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  const current = questions[index]

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-2xl items-center gap-4 px-5 pt-6">
        <button
          onClick={() => navigate(-1)}
          aria-label="Quitter la leçon"
          className="text-2xl text-ink/40 dark:text-paper/40 hover:text-ink dark:hover:text-paper"
        >
          ×
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink/5 dark:bg-paper/10">
          <motion.div
            className="h-full rounded-full bg-jade-500"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-sm font-mono text-ink/50 dark:text-paper/50">
          {index + 1}/{questions.length}
        </span>
      </div>

      <div className="mx-auto flex max-w-2xl items-center justify-end gap-2 px-5 pt-3">
        <button
          onClick={handleListenPrompt}
          className="flex items-center gap-2 rounded-full border border-ink/10 dark:border-paper/15 px-3 py-1.5 text-xs font-semibold text-ink/60 dark:text-paper/60 hover:border-indigo-300"
        >
          <Buddy talking={fuTalking} size={28} />
          Réécouter la consigne
        </button>
      </div>

      <div className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-16 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <ExerciseCard exercise={current} speechLang={lang.speechLang} onAnswered={handleAnswered} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bandeau de feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed inset-x-0 bottom-0 z-40 border-t px-5 py-6 ${
              feedback === 'correct'
                ? 'border-jade-500/30 bg-jade-100 dark:bg-jade-500/15'
                : 'border-lacquer-500/30 bg-lacquer-50 dark:bg-lacquer-500/15'
            }`}
          >
            <div className="relative mx-auto flex max-w-2xl items-center justify-between">
              {feedback === 'correct' && <Confetti count={16} />}
              <div className="flex items-center gap-4">
                <Mascot
                  size={64}
                  floating={false}
                  expression={feedback === 'correct' ? 'excited' : 'encourage'}
                  accessory={lang.accessory}
                  accentHex={accentHex}
                />
                <div>
                  <p className={`font-display text-lg font-semibold ${feedback === 'correct' ? 'text-jade-600' : 'text-lacquer-600'}`}>
                    {feedback === 'correct'
                      ? 'Parfait !'
                      : current.type === 'speak'
                      ? 'Continue à t\u2019entraîner !'
                      : 'Pas tout à fait…'}
                  </p>
                  {feedback === 'wrong' && current.type !== 'speak' && (
                    <p className="text-sm text-ink/70 dark:text-paper/70">
                      Bonne réponse : <strong>{Array.isArray(current.answer) ? current.answer.join(' ') : current.answer}</strong>
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleNext}
                className={`rounded-xl2 px-6 py-3 font-display font-semibold text-white shadow-card ${
                  feedback === 'correct' ? 'bg-jade-500' : 'bg-lacquer-500'
                }`}
              >
                Continuer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
