import { pillarToHubSlug } from '@/lib/pillar'

test('Marketing Tools → marketing-tools', () => {
  expect(pillarToHubSlug('Marketing Tools')).toBe('marketing-tools')
})

test('Insurance → insurance', () => {
  expect(pillarToHubSlug('Insurance')).toBe('insurance')
})

test('Booking Software → booking-software', () => {
  expect(pillarToHubSlug('Booking Software')).toBe('booking-software')
})

test('Legal Templates → legal-templates', () => {
  expect(pillarToHubSlug('Legal Templates')).toBe('legal-templates')
})

test('Photography → photography', () => {
  expect(pillarToHubSlug('Photography')).toBe('photography')
})

test('empty string → empty string', () => {
  expect(pillarToHubSlug('')).toBe('')
})
