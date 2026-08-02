import { motion } from 'framer-motion'

/**
 * Fu — le second personnage : un petit esprit-lanterne compagnon de Moji.
 * Il incarne la "voix" du produit : c'est lui qui prononce les instructions
 * et accompagne l'utilisateur, pendant que Moji réagit aux réponses.
 * `talking` anime sa bouche pendant que la synthèse vocale parle.
 */
export default function Buddy({ talking = false, size = 92, className = '' }) {
  return (
    <motion.div
      className={`inline-block select-none ${className}`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -8, 0], rotate: [0, 2, 0, -2, 0] }}
      transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Halo lumineux */}
        <motion.circle
          cx="50" cy="50" r="40"
          fill="url(#fu-glow)"
          animate={{ opacity: talking ? [0.5, 0.85, 0.5] : [0.35, 0.5, 0.35] }}
          transition={{ duration: talking ? 0.6 : 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <defs>
          <radialGradient id="fu-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F2B705" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F2B705" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Corps — silhouette de lanterne arrondie */}
        <path
          d="M50 20c16 0 26 12 26 30s-10 30-26 30-26-12-26-30 10-30 26-30Z"
          fill="#FDE9B8"
        />
        <line x1="50" y1="12" x2="50" y2="20" stroke="#8A6A1F" strokeWidth="2" />
        <circle cx="50" cy="10" r="3" fill="#F2B705" />

        {/* Yeux */}
        <circle cx="41" cy="48" r="4" fill="#14141F" />
        <circle cx="59" cy="48" r="4" fill="#14141F" />

        {/* Bouche — s'anime en petit ovale quand il "parle" */}
        {talking ? (
          <motion.ellipse
            cx="50" cy="60" rx="6"
            fill="#14141F"
            animate={{ ry: [2, 6, 2] }}
            transition={{ duration: 0.35, repeat: Infinity }}
          />
        ) : (
          <path d="M44 60 Q50 64 56 60" stroke="#14141F" strokeWidth="2.5" strokeLinecap="round" />
        )}
      </svg>
    </motion.div>
  )
}
