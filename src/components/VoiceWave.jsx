import { motion } from 'framer-motion'

export default function VoiceWave({ active = false }) {
  const bars = [0, 1, 2, 3, 4]
  return (
    <div className="flex h-10 items-center gap-1" aria-hidden="true">
      {bars.map((i) => (
        <motion.span
          key={i}
          className={`w-1.5 rounded-full ${active ? 'bg-lacquer-500' : 'bg-ink/15 dark:bg-paper/20'}`}
          animate={active ? { height: [8, 28, 12, 32, 8] } : { height: 8 }}
          transition={{ duration: 0.9, repeat: active ? Infinity : 0, delay: i * 0.08, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
