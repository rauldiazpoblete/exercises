import { accessor } from './index'

const obj = {
  p1: {
    p2: 'value'
  }
}

const accesorFn = accessor(obj, null)

test('accessor p1.p2', () => {
  expect(accessor(obj, null, 'p1.p2')).toBe('value')
})

test('accessor p1.p2.p3', () => {
  expect(accessor(obj, 'default', 'p1.p2.p3')).toBe('default')
})

test('accessor p5.p2', () => {
  expect(accessor(obj, null, 'p5.p2')).toBe(null)
})

test('accessor p1.p5', () => {
  expect(accessor(obj, null, 'p1.p5')).toBe(null)
})

test('accessor fn p1.p2', () => {
  expect(accesorFn('p1.p2')).toBe('value')
})

test('accessor fn p3.p2.p5', () => {
  expect(accesorFn('p3.p2.p5')).toBe(null)
})
