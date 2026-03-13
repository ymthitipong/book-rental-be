export function parseEnum<T extends Record<string, string>>(
  enumObj: T,
  value: string
): T[keyof T] {
  if (!Object.values(enumObj).includes(value as T[keyof T])) {
    throw new Error(`Invalid enum value: ${value}`)
  }

  return value as T[keyof T]
}