import { sortIntegerDigits } from './index'

test('integer 7573', () => {
  expect(sortIntegerDigits(7573)).toBe(7753)
})

test('integer 2756938', () => {
  expect(sortIntegerDigits(2756938)).toBe(9876532)
})

test('integer 3040', () => {
  expect(sortIntegerDigits(3040)).toBe(4300)
})

test('float argument', () => {
  expect(() => {
    sortIntegerDigits(35687.1)
  }).toThrowError('Argument must be an intege')
})

test('string argument', () => {
  expect(() => {
    sortIntegerDigits('7573')
  }).toThrowError('Argument must be an intege')
})
