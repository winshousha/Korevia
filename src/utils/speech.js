// Fines couches autour de la Web Speech API du navigateur.
// La synthèse vocale (SpeechSynthesis) est très largement supportée.
// La reconnaissance vocale (SpeechRecognition) l'est moins (absente de Firefox,
// support partiel sur Safari) : chaque appelant doit gérer le cas "non supporté".

export function isSpeechSynthesisSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function isSpeechRecognitionSupported() {
  return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

/**
 * Fait prononcer un texte par le moteur de synthèse vocale du navigateur.
 * Retourne false si l'API n'est pas disponible.
 */
export function speak(text, lang = 'fr-FR', { rate = 0.95, onStart, onEnd } = {}) {
  if (!isSpeechSynthesisSupported()) return false
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = lang
  utter.rate = rate
  utter.pitch = 1
  if (onStart) utter.onstart = onStart
  if (onEnd) utter.onend = onEnd
  utter.onerror = () => onEnd?.()
  window.speechSynthesis.speak(utter)
  return true
}

export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) window.speechSynthesis.cancel()
}

/**
 * Crée une instance de reconnaissance vocale prête à l'emploi, ou null si
 * l'API n'est pas disponible dans ce navigateur.
 */
export function createRecognizer(lang = 'fr-FR') {
  if (!isSpeechRecognitionSupported()) return null
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognizer = new SR()
  recognizer.lang = lang
  recognizer.interimResults = false
  recognizer.maxAlternatives = 3
  recognizer.continuous = false
  return recognizer
}
