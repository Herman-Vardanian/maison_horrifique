import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Crée et exporte le service worker pour le browser
export const worker = setupWorker(...handlers)