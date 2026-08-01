import { motion } from 'framer-motion'

const COLORS = ['#E8483C', '#F2B705', '#2F9E7A', '#4E5BC6']

export default function Confetti({ count = 18 }) {
  const pieces = Array.from({ length: count }, (_, i) => i)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((i) => {
        const left = 10 + Math.random() * 80
        const delay = Math.random() * 0.15
        const drift = (Math.random() - 0.5) * 80
        const rotate = Math.random() * 360
        const color = COLORS[i % COLORS.length]
        const size = 6 + Math.random() * 6
        return (
          <motion.span
            key={i}
            initial={{ y: -20, x: 0, opacity: 1, rotate: 0 }}
            animate={{ y: 220, x: drift, opacity: 0, rotate }}
            transition={{ duration: 1.1 + Math.random() * 0.4, delay, ease: 'easeIn' }}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: 0,
              width: size,
              height: size * 0.4,
              backgroundColor: color,
              borderRadius: 2,
            }}
          />
        )
      })}
    </div>
  )
}
