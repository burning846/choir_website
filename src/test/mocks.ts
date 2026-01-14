import { vi } from 'vitest'

export function mockFetchSequence(responses: Array<Record<string, unknown>>) {
  let i = 0
  vi.stubGlobal('fetch', vi.fn(async () => {
    const data = responses[Math.min(i, responses.length - 1)]
    i++
    return {
      ok: true,
      json: async () => data,
    } as unknown as Response
  }))
}
