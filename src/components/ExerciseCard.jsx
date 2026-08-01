import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExerciseCard({ exercise, onAnswered }) {
  const [selected, setSelected] = useState(null)
  const [builtTokens, setBuiltTokens] = useState([])
  const [checked, setChecked] = useState(false)

  const shuffledTokens = useMemo(
    () => (exercise.type === 'build' ? [...exercise.tokens].sort(() => Math.random() - 0.5) : []),
    [exercise]
  )

  const isCorrectMcq = selected === exercise.answer
  const isCorrectBuild = builtTokens.join('|') === exercise.answer?.join('|')

  const handleCheck = () => {
    setChecked(true)
    const correct = exercise.type === 'mcq' ? isCorrectMcq : isCorrectBuild
    onAnswered(correct)
  }

  const canCheck = exercise.type === 'mcq' ? selected !== null : builtTokens.length === exercise.tokens?.length

  return (
    <div className="w-full">
      <p className="mb-6 font-display text-xl font-semibold sm:text-2xl">{exercise.prompt}</p>

      {exercise.type === 'mcq' && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {exercise.options.map((opt) => {
            const isSelected = selected === opt
            const showCorrect = checked && opt === exercise.answer
            const showWrong = checked && isSelected && opt !== exercise.answer
            return (
              <motion.button
                key={opt}
                disabled={checked}
                onClick={() => setSelected(opt)}
                whileTap={{ scale: 0.98 }}
                className={`rounded-xl2 border-2 px-4 py-4 text-left font-medium transition-colors ${
                  showCorrect
                    ? 'border-jade-500 bg-jade-100 text-jade-600'
                    : showWrong
                    ? 'border-lacquer-500 bg-lacquer-50 text-lacquer-600'
                    : isSelected
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-ink/10 dark:border-paper/15 hover:border-indigo-300'
                }`}
              >
                {opt}
              </motion.button>
            )
          })}
        </div>
      )}

      {exercise.type === 'build' && (
        <div>
          <div className="mb-5 flex min-h-[3.5rem] flex-wrap gap-2 rounded-xl2 border-2 border-dashed border-ink/15 dark:border-paper/20 p-3">
            <AnimatePresence>
              {builtTokens.map((tok, idx) => (
                <motion.button
                  key={tok + idx}
                  layout
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  disabled={checked}
                  onClick={() => setBuiltTokens((t) => t.filter((_, i) => i !== idx))}
                  className="rounded-lg bg-indigo-500 px-3 py-2 text-white text-sm font-medium"
                >
                  {tok}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex flex-wrap gap-2">
            {shuffledTokens
              .filter((t) => builtTokens.filter((b) => b === t).length < exercise.tokens.filter((x) => x === t).length)
              .map((tok, idx) => (
                <motion.button
                  key={tok + idx}
                  layout
                  whileTap={{ scale: 0.95 }}
                  disabled={checked}
                  onClick={() => setBuiltTokens((t) => [...t, tok])}
                  className="rounded-lg border-2 border-ink/10 dark:border-paper/15 px-3 py-2 text-sm font-medium hover:border-indigo-300"
                >
                  {tok}
                </motion.button>
              ))}
          </div>
        </div>
      )}

      {!checked && (
        <button
          onClick={handleCheck}
          disabled={!canCheck}
          className="mt-8 w-full rounded-xl2 bg-lacquer-500 py-4 font-display text-lg font-semibold text-white shadow-card transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-30 sm:w-auto sm:px-10"
        >
          Vérifier
        </button>
      )}
    </div>
  )
}
