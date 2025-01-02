export function extractFileName(path: string): string {
  return path.split('/')?.at(-1)?.split('.')?.at(0) || ''
}