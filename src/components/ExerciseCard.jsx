import { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpeakButton from './SpeakButton.jsx'
import VoiceWave from './VoiceWave.jsx'
import { createRecognizer, isSpeechRecognitionSupported } from '../utils/speech.js'

export default function ExerciseCard({ exercise, speechLang = 'fr-FR', onAnswered }) {
  const [selected, setSelected] = useState(null)
  const [builtTokens, setBuiltTokens] = useState([])
  const [checked, setChecked] = useState(false)

  // État pour l'exercice de type "speak" (répétition à l'oral)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [speakResult, setSpeakResult] = useState(null) // 'match' | 'retry' | null
  const recognizerRef = useRef(null)

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

  const speechSupported = isSpeechRecognitionSupported()

  const handleStartListening = () => {
    if (!speechSupported || listening) return
    const recognizer = createRecognizer(speechLang)
    if (!recognizer) return
    recognizerRef.current = recognizer
    setSpeakResult(null)
    setTranscript('')
    setListening(true)

    recognizer.onresult = (event) => {
      const said = event.results?.[0]?.[0]?.transcript?.trim() || ''
      setTranscript(said)
      // Reconnaissance vocale indicative : on valide dès qu'un essai a été
      // capté (la comparaison exacte de prononciation CJK n'est pas fiable
      // dans un navigateur). L'important est le retour visuel et l'essai.
      setSpeakResult(said.length > 0 ? 'match' : 'retry')
    }
    recognizer.onerror = () => {
      setListening(false)
      setSpeakResult('retry')
    }
    recognizer.onend = () => setListening(false)
    recognizer.start()
  }

  const handleSpeakDone = () => {
    setChecked(true)
    onAnswered(speakResult === 'match')
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-3">
        <p className="font-display text-xl font-semibold sm:text-2xl">{exercise.prompt}</p>
        {exercise.audioText && exercise.type !== 'speak' && (
          <SpeakButton text={exercise.audioText} lang={speechLang} />
        )}
      </div>

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

      {exercise.type === 'speak' && (
        <div className="flex flex-col items-center rounded-xl2 border-2 border-dashed border-ink/15 dark:border-paper/20 p-8 text-center">
          <p className="font-display text-3xl font-semibold">{exercise.displayText}</p>
          <p className="mt-1 text-sm text-ink/50 dark:text-paper/50">{exercise.hint}</p>

          <div className="mt-5">
            <SpeakButton text={exercise.audioText} lang={speechLang} size="lg" label="Écouter le modèle" />
          </div>

          {!speechSupported ? (
            <p className="mt-6 max-w-xs text-sm text-ink/50 dark:text-paper/50">
              La reconnaissance vocale n'est pas disponible sur ce navigateur.
              Écoute la prononciation puis passe à la suite.
            </p>
          ) : (
            <>
              <button
                type="button"
                onClick={handleStartListening}
                disabled={listening || checked}
                className={`mt-6 grid h-16 w-16 place-items-center rounded-full text-2xl text-white shadow-card transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-40 ${
                  listening ? 'bg-lacquer-500' : 'bg-indigo-500'
                }`}
                aria-label="Parler pour répéter le mot"
              >
                🎙️
              </button>
              <div className="mt-4">
                <VoiceWave active={listening} />
              </div>
              {transcript && (
                <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">
                  Tu as dit : « {transcript} »
                </p>
              )}
            </>
          )}

          {(speakResult || !speechSupported) && !checked && (
            <button
              onClick={handleSpeakDone}
              className="mt-8 w-full rounded-xl2 bg-lacquer-500 py-4 font-display text-lg font-semibold text-white shadow-card sm:w-auto sm:px-10"
            >
              Continuer
            </button>
          )}
        </div>
      )}

      {exercise.type !== 'speak' && !checked && (
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
