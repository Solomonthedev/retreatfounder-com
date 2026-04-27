import { subscribeToForm } from '@/lib/convertkit'

global.fetch = jest.fn()

beforeEach(() => jest.clearAllMocks())

test('subscribeToForm posts to ConvertKit API and returns success', async () => {
  ;(fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ subscription: { id: 1 } }),
  })
  const result = await subscribeToForm({
    email: 'test@example.com',
    formId: '123456',
    fields: { retreat_website: 'https://example.com' },
  })
  expect(result.success).toBe(true)
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('123456'),
    expect.objectContaining({ method: 'POST' })
  )
})

test('subscribeToForm returns error on API failure', async () => {
  ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 422 })
  const result = await subscribeToForm({ email: 'bad', formId: '123' })
  expect(result.success).toBe(false)
  expect(result.error).toBeDefined()
})
