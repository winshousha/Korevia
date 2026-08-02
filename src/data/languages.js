// Chaque langue porte sa propre "parure" visuelle pour la mascotte Moji
// (accessoire + accent colorimétrique), tout en gardant l'identité globale du produit.
export const LANGUAGES = [
  {
    id: 'ja',
    name: 'Japonais',
    native: '日本語',
    tagline: 'Hiragana, katakana, kanji et politesse au quotidien',
    accent: 'lacquer',
    accessory: 'headband', // bandeau façon hachimaki
    speechLang: 'ja-JP',
    flagEmoji: '🎏',
    levels: ['Découverte', 'Voyageur·se', 'Confiant·e', 'Courant'],
  },
  {
    id: 'zh',
    name: 'Chinois',
    native: '中文',
    tagline: 'Pinyin, tons et caractères simplifiés',
    accent: 'gold',
    accessory: 'lantern', // petite lanterne portée en accessoire
    speechLang: 'zh-CN',
    flagEmoji: '🏮',
    levels: ['Découverte', 'Voyageur·se', 'Confiant·e', 'Courant'],
  },
  {
    id: 'ko',
    name: 'Coréen',
    native: '한국어',
    tagline: "Hangeul, structure des phrases et expressions courantes",
    accent: 'indigo',
    accessory: 'ribbon', // ruban façon norigae
    speechLang: 'ko-KR',
    flagEmoji: '🪭',
    levels: ['Découverte', 'Voyageur·se', 'Confiant·e', 'Courant'],
  },
]

export const getLanguage = (id) => LANGUAGES.find((l) => l.id === id)
