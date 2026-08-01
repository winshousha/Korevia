import { motion } from 'framer-motion'

export default function StreakFlame({ days = 0, size = 'md' }) {
  const dims = size === 'lg' ? 'h-20 w-20 text-4xl' : 'h-10 w-10 text-xl'
  return (
    <div className="flex items-center gap-3">
      <motion.div
        className={`grid ${dims} place-items-center rounded-2xl bg-lacquer-500/10`}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        🔥
      </motion.div>
      <div>
        <p className="font-display text-2xl font-semibold leading-none">{days}</p>
        <p className="text-sm text-ink/60 dark:text-paper/60">jours de suite</p>
      </div>
    </div>
  )
}
