import { fetchTools, fetchTool, fetchCategories } from '@/lib/airtable'

global.fetch = jest.fn()

const mockAirtableResponse = (records: object[]) => ({
  ok: true,
  json: () => Promise.resolve({ records }),
})

const mockToolRecord = {
  id: 'rec123',
  fields: {
    Name: 'ConvertKit',
    Slug: 'convertkit',
    Description: 'Email marketing for creators',
    Pillar: 'Marketing Tools',
    Category: 'Email Marketing',
    Tags: ['Email', 'Forms'],
    'Price Range': 'Free – $29/mo',
    Status: 'Live',
    'TRF Verdict': 'Recommended',
    'Affiliate Link': 'https://convertkit.com?ref=trf',
  },
}

beforeEach(() => jest.clearAllMocks())

test('fetchTools returns array of Tool objects', async () => {
  ;(fetch as jest.Mock).mockResolvedValueOnce(mockAirtableResponse([mockToolRecord]))
  const tools = await fetchTools()
  expect(tools).toHaveLength(1)
  expect(tools[0].name).toBe('ConvertKit')
  expect(tools[0].slug).toBe('convertkit')
})

test('fetchTool returns single Tool by slug', async () => {
  ;(fetch as jest.Mock).mockResolvedValueOnce(
    mockAirtableResponse([mockToolRecord])
  )
  const tool = await fetchTool('convertkit')
  expect(tool?.slug).toBe('convertkit')
})

test('fetchTool returns null for unknown slug', async () => {
  ;(fetch as jest.Mock).mockResolvedValueOnce(mockAirtableResponse([]))
  const tool = await fetchTool('unknown-slug')
  expect(tool).toBeNull()
})

test('fetchCategories returns sorted Category array', async () => {
  ;(fetch as jest.Mock).mockResolvedValueOnce(
    mockAirtableResponse([
      { id: 'cat1', fields: { Name: 'Insurance', Slug: 'insurance', Order: 2, Status: 'Coming Soon' } },
      { id: 'cat2', fields: { Name: 'Marketing Tools', Slug: 'marketing-tools', Order: 1, Status: 'Live' } },
    ])
  )
  const categories = await fetchCategories()
  expect(categories[0].slug).toBe('marketing-tools')
  expect(categories[1].slug).toBe('insurance')
})

test('fetchTool returns null if pillar does not match', async () => {
  ;(fetch as jest.Mock).mockResolvedValueOnce(
    mockAirtableResponse([mockToolRecord])
  )
  // mockToolRecord has Pillar: 'Marketing Tools', but we request with pillar='Insurance'
  const tool = await fetchTool('convertkit', 'Insurance')
  expect(tool).toBeNull()
})
