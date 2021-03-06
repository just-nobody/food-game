export function clamp(num: number, min: number, max: number) {
  if (num > max) return max
  if (num < min) return min
  return num
}

export function lerp(a: number, b: number, delta: number) {
  return a + (b - a) * clamp(delta, 0, 1)
}

export function sign(n: number) {
  if (n < 0) return -1
  if (n > 0) return 1
  return 0
}
