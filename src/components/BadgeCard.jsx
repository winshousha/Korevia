import { motion } from 'framer-motion'

export default function BadgeCard({ badge, unlocked }) {
  return (
    <motion.div
      whileHover={unlocked ? { y: -4 } : {}}
      className={`flex flex-col items-center gap-2 rounded-xl2 border p-4 text-center transition-colors ${
        unlocked
          ? 'border-gold-500/30 bg-gold-300/10'
          : 'border-ink/5 dark:border-paper/10 opacity-40 grayscale'
      }`}
    >
      <span className="text-3xl">{badge.emoji}</span>
      <p className="font-display text-sm font-semibold">{badge.label}</p>
      <p className="text-xs text-ink/60 dark:text-paper/60">{badge.desc}</p>
    </motion.div>
  )
}
