import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

fetch('/choir-doc.json')
  .then((r) => (r.ok ? r.json() : null))
  .then((d) => {
    if (!d) return
    const title = d.choirNameEn || d.choirName || document.title
    if (typeof title === 'string' && title.trim()) {
      document.title = title
    }
  })
  .catch(() => {})
