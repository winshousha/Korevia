import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      className="relative flex h-9 w-16 items-center rounded-full bg-ink/10 dark:bg-paper/10 px-1 transition-colors"
    >
      <motion.span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-lacquer-500 text-xs shadow"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {isDark ? '🌙' : '☀️'}
      </motion.span>
    </button>
  )
}
