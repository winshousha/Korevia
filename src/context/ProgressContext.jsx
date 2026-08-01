import { createContext, useContext, useEffect, useState } from 'react'

const ProgressContext = createContext(null)

const DEFAULT_STATE = {
  xp: 240,
  streak: 6,
  lastActiveDate: null,
  completedLessons: ['ja-l1', 'ja-l2', 'zh-l1', 'ko-l1', 'ko-l2'],
  badges: ['first-lesson', 'streak-5'],
  languageXp: { ja: 90, zh: 40, ko: 60 },
}

const ALL_BADGES = [
  { id: 'first-lesson', label: 'Première leçon', desc: 'Termine ta toute première leçon', emoji: '🌱' },
  { id: 'streak-5', label: '5 jours de suite', desc: '5 jours consécutifs sur Moji', emoji: '🔥' },
  { id: 'streak-30', label: 'Mois parfait', desc: '30 jours consécutifs sur Moji', emoji: '🏆' },
  { id: 'polyglot', label: 'Polyglotte', desc: "Avance dans les 3 langues à la fois", emoji: '🌏' },
  { id: 'xp-500', label: '500 XP', desc: 'Atteins 500 points d\u2019expérience', emoji: '⭐' },
]

export { ALL_BADGES }

export function ProgressProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('moji-progress')
    return saved ? JSON.parse(saved) : DEFAULT_STATE
  })

  useEffect(() => {
    localStorage.setItem('moji-progress', JSON.stringify(state))
  }, [state])

  const addXp = (langId, amount) => {
    setState((s) => ({
      ...s,
      xp: s.xp + amount,
      languageXp: { ...s.languageXp, [langId]: (s.languageXp[langId] || 0) + amount },
    }))
  }

  const completeLesson = (lessonId, langId, amount) => {
    setState((s) => {
      if (s.completedLessons.includes(lessonId)) return s
      return {
        ...s,
        completedLessons: [...s.completedLessons, lessonId],
        xp: s.xp + amount,
        languageXp: { ...s.languageXp, [langId]: (s.languageXp[langId] || 0) + amount },
      }
    })
  }

  const resetProgress = () => setState(DEFAULT_STATE)

  return (
    <ProgressContext.Provider value={{ ...state, addXp, completeLesson, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = () => useContext(ProgressContext)
