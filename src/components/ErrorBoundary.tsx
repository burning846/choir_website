import React from 'react'
import { logError } from '@/lib/logger'

type Props = { children: React.ReactNode }
type State = { hasError: boolean }

export default class ErrorBoundary extends React.Component<Props, State> {
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
            页面出现错误，请刷新重试
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

