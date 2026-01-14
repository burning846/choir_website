import { useDocContext } from '@/context/doc'

export function useDoc() {
  const { doc, loading, error } = useDocContext()
  return { doc, loading, error }
}

