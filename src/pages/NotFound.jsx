import { Link } from 'react-router-dom'
import Mascot from '../components/Mascot.jsx'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 text-center">
      <Mascot expression="encourage" size={140} />
      <h1 className="font-display text-3xl font-semibold">Cette page s'est égarée</h1>
      <p className="text-ink/60 dark:text-paper/60">On ne trouve pas ce que tu cherches, mais Moji peut te ramener.</p>
      <Link to="/" className="rounded-xl2 bg-lacquer-500 px-6 py-3 font-display font-semibold text-white shadow-card">
        Retour à l'accueil
      </Link>
    </div>
  )
}
