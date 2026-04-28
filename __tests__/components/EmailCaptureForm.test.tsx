jest.mock('@/lib/convertkit', () => ({
  subscribeToForm: jest.fn().mockResolvedValue({ success: true }),
}))

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'

test('renders email input and submit button', () => {
  render(<EmailCaptureForm formId="123" label="Notify me" />)
  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /notify me/i })).toBeInTheDocument()
})

test('renders retreat website optional field', () => {
  render(<EmailCaptureForm formId="123" label="Notify me" />)
  expect(screen.getByPlaceholderText(/retreat website/i)).toBeInTheDocument()
})

test('submits form and shows success message', async () => {
  render(<EmailCaptureForm formId="123" label="Notify me" />)
  fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
    target: { value: 'test@example.com' },
  })
  fireEvent.click(screen.getByRole('button', { name: /notify me/i }))
  await waitFor(() =>
    expect(screen.getByText(/you're on the list — see you friday/i)).toBeInTheDocument()
  )
})
