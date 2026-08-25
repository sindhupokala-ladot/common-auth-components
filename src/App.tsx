import { CommonAuthProvider } from './CommonAuthProvider'
import { GoogleSignInButton } from './GoogleSignInButton'
import { AngelenoSignInButton, ANGELENO_ACCOUNT_TAGLINE } from './AngelenoSignInButton'

/**
 * Visual playground for this package - not shipped to consumers. Run `npm run dev` and
 * open this page to eyeball both components (and to take the screenshots used in
 * README.md).
 */
function App() {
  return (
    <CommonAuthProvider apiBaseUrl="https://common-auth.example.com">
      <div className="playground">
        <h1>Common Auth Components</h1>
        <p className="subtitle">Playground for GoogleSignInButton and AngelenoSignInButton.</p>

        <div className="playground-card">
          <h2>Internal application (Google)</h2>
          <p>Rendered by an Internal application's own page.</p>
          <div className="button-row">
            <GoogleSignInButton
              clientId="demo-internal-client-id"
              redirectUri="https://ops.example.com/auth/callback"
            />
          </div>
        </div>

        <div className="playground-card">
          <h2>External application (Angeleno Account)</h2>
          <p>Rendered by an External application's own page.</p>
          <div className="button-row">
            <AngelenoSignInButton
              clientId="demo-external-client-id"
              redirectUri="https://resident-portal.example.com/auth/callback"
            />
          </div>
          <p className="tagline">{ANGELENO_ACCOUNT_TAGLINE}</p>
        </div>

        <div className="playground-card">
          <h2>Side by side</h2>
          <p>Both components share the same provider and layout conventions.</p>
          <div className="button-row">
            <GoogleSignInButton
              clientId="demo-internal-client-id"
              redirectUri="https://ops.example.com/auth/callback"
            />
            <AngelenoSignInButton
              clientId="demo-external-client-id"
              redirectUri="https://resident-portal.example.com/auth/callback"
            />
          </div>
        </div>
      </div>
    </CommonAuthProvider>
  )
}

export default App
