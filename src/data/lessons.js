// Contenu de démonstration — structure crédible, données fictives mais réalistes.
export const UNITS = {
  ja: [
    {
      id: 'ja-u1',
      title: 'Premiers pas',
      description: 'Se présenter et saluer poliment',
      lessons: [
        { id: 'ja-l1', title: 'Salutations', xp: 10, done: true },
        { id: 'ja-l2', title: 'Se présenter', xp: 10, done: true },
        { id: 'ja-l3', title: 'Les nombres 1–10', xp: 15, done: false },
        { id: 'ja-l4', title: 'Hiragana : あ〜こ', xp: 20, done: false },
      ],
    },
    {
      id: 'ja-u2',
      title: 'Au quotidien',
      description: 'Manger, se déplacer, demander son chemin',
      lessons: [
        { id: 'ja-l5', title: 'Au restaurant', xp: 15, done: false },
        { id: 'ja-l6', title: 'Prendre le train', xp: 15, done: false },
        { id: 'ja-l7', title: 'Kanji du quotidien', xp: 25, done: false },
      ],
    },
  ],
  zh: [
    {
      id: 'zh-u1',
      title: 'Premiers pas',
      description: 'Saluer et compter en pinyin',
      lessons: [
        { id: 'zh-l1', title: 'Salutations', xp: 10, done: true },
        { id: 'zh-l2', title: 'Les tons', xp: 15, done: false },
        { id: 'zh-l3', title: 'Les nombres 1–10', xp: 15, done: false },
        { id: 'zh-l4', title: 'La famille', xp: 20, done: false },
      ],
    },
    {
      id: 'zh-u2',
      title: 'Au quotidien',
      description: 'Marchander, commander, se repérer',
      lessons: [
        { id: 'zh-l5', title: 'Au marché', xp: 15, done: false },
        { id: 'zh-l6', title: "Demander son chemin", xp: 15, done: false },
        { id: 'zh-l7', title: 'Caractères courants', xp: 25, done: false },
      ],
    },
  ],
  ko: [
    {
      id: 'ko-u1',
      title: 'Premiers pas',
      description: "Lire le hangeul et saluer",
      lessons: [
        { id: 'ko-l1', title: 'Le hangeul : voyelles', xp: 15, done: true },
        { id: 'ko-l2', title: 'Salutations', xp: 10, done: true },
        { id: 'ko-l3', title: 'Les nombres 1–10', xp: 15, done: false },
        { id: 'ko-l4', title: 'Se présenter', xp: 15, done: false },
      ],
    },
    {
      id: 'ko-u2',
      title: 'Au quotidien',
      description: 'Café, courses, petites conversations',
      lessons: [
        { id: 'ko-l5', title: 'Au café', xp: 15, done: false },
        { id: 'ko-l6', title: 'Faire les courses', xp: 15, done: false },
        { id: 'ko-l7', title: 'Particules de base', xp: 25, done: false },
      ],
    },
  ],
}

// Banque d'exercices de démo, réutilisée pour n'importe quelle leçon (mode démo).
export const EXERCISE_BANK = {
  ja: [
    { type: 'mcq', prompt: 'Comment dit-on « merci » en japonais ?', options: ['ありがとう', 'さようなら', 'すみません', 'おはよう'], answer: 'ありがとう' },
    { type: 'mcq', prompt: 'Que signifie « おはよう » ?', options: ['Bonsoir', 'Bonjour (matin)', 'Merci', 'Excusez-moi'], answer: 'Bonjour (matin)' },
    { type: 'build', prompt: 'Reconstitue la phrase : « Je m\u2019appelle Léa »', tokens: ['です', 'レア', 'は', '私'], answer: ['私', 'は', 'レア', 'です'] },
    { type: 'mcq', prompt: 'Quel hiragana se lit « ka » ?', options: ['あ', 'か', 'さ', 'た'], answer: 'か' },
    { type: 'mcq', prompt: 'Comment compte-t-on « trois » ?', options: ['いち', 'に', 'さん', 'よん'], answer: 'さん' },
  ],
  zh: [
    { type: 'mcq', prompt: 'Comment dit-on « merci » en chinois ?', options: ['谢谢', '你好', '再见', '对不起'], answer: '谢谢' },
    { type: 'mcq', prompt: 'Quel ton porte « mā » (maman) ?', options: ['1er ton', '2e ton', '3e ton', '4e ton'], answer: '1er ton' },
    { type: 'build', prompt: 'Reconstitue la phrase : « Je m\u2019appelle Léa »', tokens: ['叫', '我', '莱亚'], answer: ['我', '叫', '莱亚'] },
    { type: 'mcq', prompt: 'Que signifie « 你好 » ?', options: ['Au revoir', 'Bonjour', 'Merci', 'Pardon'], answer: 'Bonjour' },
    { type: 'mcq', prompt: 'Comment dit-on « trois » ?', options: ['一', '二', '三', '四'], answer: '三' },
  ],
  ko: [
    { type: 'mcq', prompt: 'Comment dit-on « merci » en coréen ?', options: ['감사합니다', '안녕하세요', '미안해요', '안녕히 가세요'], answer: '감사합니다' },
    { type: 'mcq', prompt: 'Quelle voyelle du hangeul se lit « a » ?', options: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ'], answer: 'ㅏ' },
    { type: 'build', prompt: 'Reconstitue la phrase : « Je m\u2019appelle Léa »', tokens: ['이에요', '레아', '저는'], answer: ['저는', '레아', '이에요'] },
    { type: 'mcq', prompt: 'Que signifie « 안녕하세요 » ?', options: ['Merci', 'Bonjour', 'Pardon', 'Bonne nuit'], answer: 'Bonjour' },
    { type: 'mcq', prompt: 'Comment dit-on « trois » ?', options: ['하나', '둘', '셋', '넷'], answer: '셋' },
  ],
}
