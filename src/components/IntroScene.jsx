import { useState } from 'react'
import { motion } from 'framer-motion'
import Mascot from './Mascot.jsx'
import Buddy from './Buddy.jsx'
import { speak, isSpeechSynthesisSupported } from '../utils/speech.js'

const GREETING = "Bienvenue sur Moji ! Je suis Fu, et voici Moji. On va apprendre le japonais, le chinois ou le coréen ensemble, un pas à la fois."

export default function IntroScene() {
  const [talking, setTalking] = useState(false)
  const [played, setPlayed] = useState(false)
  const supported = isSpeechSynthesisSupported()

  const handlePlay = () => {
    speak(GREETING, 'fr-FR', {
      onStart: () => setTalking(true),
      onEnd: () => {
        setTalking(false)
        setPlayed(true)
      },
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-lacquer-500/10 via-gold-300/10 to-indigo-500/10"
    >
      <div className="flex flex-col items-center">
        <div className="relative flex items-end gap-2">
          <Mascot expression={talking ? 'excited' : 'happy'} accessory="headband" accentHex="#E8483C" size={190} />
          <Buddy talking={talking} size={68} className="mb-4" />
        </div>

        {supported && (
          <motion.button
            type="button"
            onClick={handlePlay}
            whileTap={{ scale: 0.96 }}
            className="mt-6 flex items-center gap-2 rounded-full bg-white/90 dark:bg-ink-card px-5 py-2.5 text-sm font-semibold shadow-card"
          >
            <motion.span animate={talking ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.5, repeat: talking ? Infinity : 0 }}>
              🔊
            </motion.span>
            {played ? 'Réécouter l\u2019accueil' : 'Écouter Fu et Moji'}
          </motion.button>
        )}
      </div>

      <motion.div
        className="absolute -left-4 top-10 rounded-xl2 bg-paper dark:bg-ink-card px-4 py-2 shadow-card font-mono text-sm"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        +15 XP 🎉
      </motion.div>
      <motion.div
        className="absolute -right-2 bottom-16 rounded-xl2 bg-paper dark:bg-ink-card px-4 py-2 shadow-card font-mono text-sm"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        🔥 6 jours
      </motion.div>
    </motion.div>
  )
}
