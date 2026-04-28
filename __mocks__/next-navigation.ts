const mockReplace = jest.fn()
const mockPush = jest.fn()

export const useRouter = () => ({
  replace: mockReplace,
  push: mockPush,
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
})

export const useSearchParams = () => ({
  get: (_key: string) => null,
  getAll: (_key: string) => [] as string[],
  has: (_key: string) => false,
  toString: () => '',
})

export const usePathname = () => '/'
export const useParams = () => ({})
