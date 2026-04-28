export function unstable_cache<T>(fn: () => Promise<T>): () => Promise<T> {
  return fn
}
