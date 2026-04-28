import { subscribeToForm } from '@/lib/convertkit'

global.fetch = jest.fn()

beforeEach(() => jest.clearAllMocks())

test('subscribeToForm posts to /api/subscribe and returns success', async () => {
  ;(fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
  const result = await subscribeToForm({ email: 'test@example.com', formId: '123456' })
  expect(result.success).toBe(true)
  expect(fetch).toHaveBeenCalledWith(
    '/api/subscribe',
    expect.objectContaining({ method: 'POST' })
  )
})

test('subscribeToForm returns error on API failure', async () => {
  ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 422 })
  const result = await subscribeToForm({ email: 'bad@example.com', formId: '123' })
  expect(result.success).toBe(false)
  expect(result.error).toBeDefined()
})
