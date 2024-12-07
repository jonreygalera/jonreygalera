import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RedirectPage from './pages/RedirectPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
      <RedirectPage/>
    </Suspense>
  </StrictMode>,
)
