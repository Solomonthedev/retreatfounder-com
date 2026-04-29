import { render, screen } from '@testing-library/react'
import { Nav } from '@/components/Nav'

describe('Nav', () => {
  it('Directory link routes to marketing-tools hub', () => {
    render(<Nav />)
    const directoryLink = screen.getByRole('link', { name: /^directory$/i })
    expect(directoryLink).toHaveAttribute('href', '/directory/marketing-tools')
  })

  it('Browse link routes to marketing-tools hub', () => {
    render(<Nav />)
    const browseLink = screen.getByRole('link', { name: /browse/i })
    expect(browseLink).toHaveAttribute('href', '/directory/marketing-tools')
  })
})
