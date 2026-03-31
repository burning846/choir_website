import React from 'react'
import { logError } from '@/lib/logger'
import { useLang } from '@/lib/lang'
import { uiTranslations } from '@/lib/i18n'

type Props = { children: React.ReactNode; fallbackMsg: string }
type State = { hasError: boolean }

class ErrorBoundaryClass extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: Error) {
    logError(error, 'ErrorBoundary')
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <div className="inline-block bg-red-50 text-red-700 px-4 py-2 rounded border border-red-200">
            {this.props.fallbackMsg}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const { lang } = useLang()
  const fallbackMsg = uiTranslations[lang].common.error || 'An error occurred, please refresh'
  return <ErrorBoundaryClass fallbackMsg={fallbackMsg}>{children}</ErrorBoundaryClass>
}

