export function pillarToHubSlug(pillar: string): string {
  return pillar
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}
