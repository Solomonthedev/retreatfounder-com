jest.mock('@/lib/convertkit', () => ({
  subscribeToForm: jest.fn().mockResolvedValue({ success: true }),
}))

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NewsletterCallout, AdvertiseHereCallout, VideoCallout } from '@/components/CalloutCard'

describe('NewsletterCallout', () => {
  test('renders subscribe form when formId is set', () => {
    render(<NewsletterCallout formId="123456" />)
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /subscribe free/i })).toBeInTheDocument()
  })

  test('renders coming soon when formId is null', () => {
    render(<NewsletterCallout formId={null} />)
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  test('shows success state after submit', async () => {
    render(<NewsletterCallout formId="123456" />)
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /subscribe free/i }))
    await waitFor(() =>
      expect(screen.getByText(/you.re on the list/i)).toBeInTheDocument()
    )
  })
})

describe('AdvertiseHereCallout', () => {
  test('renders partner slot with contact link', () => {
    render(<AdvertiseHereCallout />)
    expect(screen.getByText(/reach retreat/i)).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /get in touch/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('mailto:'))
  })
})

describe('VideoCallout', () => {
  test('renders title and watch CTA', () => {
    render(<VideoCallout title="How to fill retreats" description="A guide." href="https://youtube.com" />)
    expect(screen.getByText('How to fill retreats')).toBeInTheDocument()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://youtube.com')
  })
})
