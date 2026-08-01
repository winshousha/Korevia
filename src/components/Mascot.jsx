import { motion } from 'framer-motion'

/**
 * Moji — la mascotte du produit.
 * `expression` : 'happy' | 'excited' | 'encourage' | 'focused'
 * `accessory`  : 'headband' | 'lantern' | 'ribbon' | null
 * `accentHex`  : couleur d'accent (bandeau / lanterne / ruban)
 */
export default function Mascot({
  expression = 'happy',
  accessory = null,
  accentHex = '#E8483C',
  size = 160,
  floating = true,
  className = '',
}) {
  const mouths = {
    happy: 'M 62 100 Q 80 116 98 100',
    excited: 'M 58 96 Q 80 128 102 96 Q 80 112 58 96 Z',
    encourage: 'M 64 104 Q 80 98 96 104',
    focused: 'M 68 102 L 92 102',
  }

  const eyesClosed = expression === 'excited'
  const browRaised = expression === 'encourage'

  return (
    <motion.div
      className={`inline-block select-none ${className}`}
      style={{ width: size, height: size }}
      animate={floating ? { y: [0, -6, 0] } : {}}
      transition={floating ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <svg viewBox="0 0 160 160" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ombre au sol */}
        <ellipse cx="80" cy="148" rx="34" ry="6" fill="currentColor" className="text-ink/10 dark:text-black/40" />

        {/* Corps */}
        <motion.path
          d="M80 26c30 0 50 24 50 54s-20 54-50 54-50-24-50-54 20-54 50-54Z"
          fill="#FBEEE4"
          className="dark:opacity-95"
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '80px 100px' }}
        />
        {/* Joues */}
        <circle cx="52" cy="98" r="8" fill={accentHex} opacity="0.28" />
        <circle cx="108" cy="98" r="8" fill={accentHex} opacity="0.28" />

        {/* Yeux */}
        {eyesClosed ? (
          <>
            <path d="M52 84 Q60 76 68 84" stroke="#14141F" strokeWidth="4" strokeLinecap="round" />
            <path d="M92 84 Q100 76 108 84" stroke="#14141F" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : (
          <>
            <g className="animate-blink" style={{ transformOrigin: '60px 82px' }}>
              <circle cx="60" cy="82" r="7" fill="#14141F" />
              <circle cx="62.5" cy="79.5" r="2" fill="white" />
            </g>
            <g className="animate-blink" style={{ transformOrigin: '100px 82px' }}>
              <circle cx="100" cy="82" r="7" fill="#14141F" />
              <circle cx="102.5" cy="79.5" r="2" fill="white" />
            </g>
          </>
        )}

        {/* Sourcils (encourage) */}
        {browRaised && (
          <>
            <path d="M50 68 Q60 62 70 68" stroke="#14141F" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <path d="M90 68 Q100 62 110 68" stroke="#14141F" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          </>
        )}

        {/* Bouche */}
        <path d={mouths[expression]} stroke="#14141F" strokeWidth="4" strokeLinecap="round" fill={expression === 'excited' ? '#14141F' : 'none'} opacity={expression === 'excited' ? 0.9 : 1} />

        {/* Accessoire selon la langue */}
        {accessory === 'headband' && (
          <g>
            <path d="M32 60 Q80 40 128 60" stroke={accentHex} strokeWidth="10" strokeLinecap="round" />
            <circle cx="80" cy="46" r="6" fill="#FDF6EC" stroke={accentHex} strokeWidth="3" />
          </g>
        )}
        {accessory === 'lantern' && (
          <motion.g
            animate={{ rotate: [0, 4, 0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '124px 50px' }}
          >
            <line x1="122" y1="34" x2="122" y2="42" stroke="#14141F" strokeWidth="2" />
            <ellipse cx="122" cy="52" rx="10" ry="13" fill={accentHex} opacity="0.9" />
            <line x1="112" y1="52" x2="132" y2="52" stroke="#FDF6EC" strokeWidth="1.5" opacity="0.7" />
          </motion.g>
        )}
        {accessory === 'ribbon' && (
          <g transform="translate(100,42) rotate(18)">
            <path d="M0 0 L14 -8 L14 8 Z" fill={accentHex} />
            <path d="M0 0 L-14 -8 L-14 8 Z" fill={accentHex} />
            <circle cx="0" cy="0" r="4" fill="#FDF6EC" stroke={accentHex} strokeWidth="2" />
          </g>
        )}
      </svg>
    </motion.div>
  )
}
