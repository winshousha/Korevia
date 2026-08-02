import { useState } from 'react'
import { motion } from 'framer-motion'
import { speak, isSpeechSynthesisSupported } from '../utils/speech.js'

export default function SpeakButton({ text, lang = 'ja-JP', size = 'md', label }) {
  const [playing, setPlaying] = useState(false)
  const supported = isSpeechSynthesisSupported()

  const handleClick = () => {
    if (!supported) return
    speak(text, lang, {
      onStart: () => setPlaying(true),
      onEnd: () => setPlaying(false),
    })
  }

  const dims = size === 'lg' ? 'h-14 w-14 text-2xl' : 'h-10 w-10 text-lg'

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!supported}
      aria-label={label || `Écouter la prononciation de ${text}`}
      title={!supported ? "Synthèse vocale non disponible sur ce navigateur" : undefined}
      className={`grid ${dims} place-items-center rounded-full border-2 transition-colors ${
        playing
          ? 'border-indigo-500 bg-indigo-500/10'
          : 'border-ink/10 dark:border-paper/15 hover:border-indigo-300'
      } disabled:opacity-30`}
    >
      <motion.span animate={playing ? { scale: [1, 1.15, 1] } : { scale: 1 }} transition={{ duration: 0.5, repeat: playing ? Infinity : 0 }}>
        🔊
      </motion.span>
    </button>
  )
}
