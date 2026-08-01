# Moji — plateforme d'apprentissage du japonais, chinois et coréen

Projet React (Vite) prêt à déployer sur Netlify. Application de démonstration
premium, gamifiée, avec mascotte animée, système de leçons, XP/streak/badges
et mode sombre.

## Stack technique

- **React 18** (hooks, composants fonctionnels)
- **Vite** — build rapide, config minimale, idéal pour Netlify
- **Tailwind CSS** — design system cohérent via tokens (couleurs, polices, radius)
- **Framer Motion** — transitions de page, feedback de réussite/erreur, micro-interactions
- **React Router** — navigation entre accueil, sélection de langue, parcours, leçon, tableau de bord
- **Contexte React + `localStorage`** — persistance de la progression sans back-end (facile à remplacer par une vraie API plus tard)

Pourquoi ce choix plutôt qu'un framework plus lourd (Next.js) ? Le site n'a
pas besoin de rendu serveur ni de SEO poussé par page pour cette V1 démo :
Vite donne un déploiement Netlify statique, rapide, avec une config quasi nulle.
Si vous ajoutez plus tard des pages publiques à indexer (blog, pages langue
par langue en SSR), migrer vers Next.js sera facile car les composants sont
déjà découpés proprement.

## Arborescence

```
moji/
├── index.html
├── netlify.toml
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                 # Routage
    ├── index.css                # Styles globaux + tokens Tailwind
    ├── context/
    │   ├── ThemeContext.jsx     # Dark mode
    │   └── ProgressContext.jsx  # XP, streak, badges, leçons complétées
    ├── data/
    │   ├── languages.js         # Japonais / Chinois / Coréen (métadonnées)
    │   └── lessons.js           # Unités, leçons et banque d'exercices démo
    ├── components/
    │   ├── Mascot.jsx           # Mascotte SVG (expressions + accessoires)
    │   ├── Navbar.jsx
    │   ├── ThemeToggle.jsx
    │   ├── StreakFlame.jsx
    │   ├── BadgeCard.jsx
    │   ├── Confetti.jsx
    │   └── ExerciseCard.jsx     # QCM + reconstitution de phrase
    └── pages/
        ├── Home.jsx
        ├── LanguageSelect.jsx
        ├── LessonPath.jsx
        ├── Lesson.jsx           # Enchaînement d'exercices + feedback animé
        ├── Dashboard.jsx
        └── NotFound.jsx
```

## Installation et lancement en local

Prérequis : Node.js 18+ et npm.

```bash
npm install
npm run dev
```

Le site est alors disponible sur `http://localhost:5173`.

## Build de production

```bash
npm run build
```

Le résultat est généré dans `dist/`. Pour le prévisualiser localement :

```bash
npm run preview
```

## Déploiement sur Netlify

**Option 1 — via l'interface Netlify (recommandé) :**
1. Poussez ce projet sur un dépôt GitHub/GitLab.
2. Sur [netlify.com](https://netlify.com), cliquez sur *Add new site → Import an existing project*.
3. Sélectionnez le dépôt. Netlify détecte automatiquement `netlify.toml` :
   - Build command : `npm run build`
   - Publish directory : `dist`
4. Cliquez sur *Deploy*.

**Option 2 — via Netlify CLI :**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

Le fichier `netlify.toml` inclut déjà la redirection SPA nécessaire pour que
les routes React Router (`/langues/ja`, `/lecon/ja/ja-l1`, etc.) fonctionnent
correctement en rechargement direct.

## Identité visuelle — choix de design

- **Palette** : fond papier clair / encre indigo en sombre, accent rouge
  laque (`#E8483C`), jade pour la validation, or pour l'XP, indigo pour les
  éléments interactifs neutres. Choix volontairement différent des tons
  crème/terracotta ou noir/néon devenus des défauts génériques — la palette
  s'inspire des matières du sujet (laque, jade, papier, encre).
- **Typographie** : `Fraunces` (display, avec du caractère) pour les titres,
  `Manrope` pour le corps de texte, `Space Mono` pour les chiffres (XP,
  streak) — renforce la sensation de "score" façon jeu.
- **Signature du produit** : la mascotte **Moji**, dont l'accessoire change
  selon la langue choisie (bandeau pour le japonais, lanterne pour le
  chinois, ruban pour le coréen) tout en gardant un seul personnage cohérent
  — plutôt qu'un mascotte générique ou trois personnages différents.

## Pour aller plus loin

- **Back-end / comptes utilisateurs** : remplacer `ProgressContext` par des
  appels à une API (Supabase, Firebase ou back-end custom) pour synchroniser
  XP/streak/badges entre appareils, avec authentification (email, Google...).
- **Vrai contenu pédagogique** : structurer `lessons.js` par curriculum
  réel (CECRL adapté aux langues asiatiques), avec audio pour les exercices
  d'écoute (actuellement absents de la démo) et reconnaissance vocale pour
  la prononciation.
- **Paiement / offre premium** : ajouter Stripe pour un palier "Moji+"
  (leçons illimitées, cœurs infinis, contenus avancés).
- **Notifications** : rappels quotidiens (email ou push) pour maintenir le
  streak, avec un service comme OneSignal.
- **Accessibilité** : le focus visible et `prefers-reduced-motion` sont déjà
  gérés ; ajouter des tests avec lecteur d'écran sur le flux d'exercices.
