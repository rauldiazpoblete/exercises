import { removeProperty } from './index'

const obj = { a: 1, b: 2 }

test('Object without property', () => {
  const value = removeProperty(obj, 'c')
  expect(value).toBe(false)
})

test('Object with property', () => {
  const value = removeProperty(obj, 'a')
  expect(value).toBe(true)
  expect(obj).toEqual({ b: 2 })
})
