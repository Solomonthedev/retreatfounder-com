import { render, screen } from '@testing-library/react'
import { ComingSoon } from '@/components/ComingSoon'

test('renders category name and notify form', () => {
  render(
    <ComingSoon
      categoryName="Retreat Insurance"
      formId="123456"
    />
  )
  expect(screen.getByText('Retreat Insurance')).toBeInTheDocument()
  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
})
