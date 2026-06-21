import './VerifySuccessPage.css'
import signupWelcomeCharacter from '../assets/10.png'

interface VerifySuccessPageProps {
  onStartLearning: () => void
}

function VerifySuccessPage({ onStartLearning }: VerifySuccessPageProps) {
  return (
    <main className="verify-success-screen">
      <section className="verify-success-content">
        <h1 className="verify-success-title">Welcome to Dojeon!</h1>
        <p className="verify-success-description">
          Take on the challenge of learning
          <br />
          Korean, one step at a time.
        </p>
        <img
          className="verify-success-character"
          src={signupWelcomeCharacter}
          alt=""
          aria-hidden="true"
        />
        <button type="button" className="verify-success-button" onClick={onStartLearning}>
          START LEARNING
        </button>
      </section>
    </main>
  )
}

export default VerifySuccessPage
