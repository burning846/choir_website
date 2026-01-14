import { useContext } from 'react'
import { DocContext } from '@/context/DocContext'

export function useDoc() {
  const context = useContext(DocContext)
  return context
}
