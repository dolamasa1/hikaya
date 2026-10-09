import { createContext } from 'react'

export const WizardStepContext = createContext<(index: number) => void>(() => undefined)
