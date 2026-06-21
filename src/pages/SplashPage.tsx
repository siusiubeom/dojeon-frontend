import character from '../assets/character.png'
import './SplashPage.css'

function SplashPage() {
  return (
    <main className="splash-screen">
      <img
        src={character}
        alt="Dojeon character"
        className="splash-character"
      />
      <h1 className="splash-title">Dojeon</h1>
      <div className="splash-loading" aria-label="Loading">
        <p className="splash-loading-text">loading...</p>
        <div className="splash-progress-track" aria-hidden="true">
          <span className="splash-progress-fill" />
        </div>
      </div>
    </main>
  )
}

export default SplashPage
