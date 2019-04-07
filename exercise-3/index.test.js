import { formatDate } from './index'

test('Date with single digit day & month', () => {
  const value = formatDate('1/1/2019')
  expect(value).toBe('20190101')
})

test('Date with single digit day', () => {
  const value = formatDate('12/1/2019')
  expect(value).toBe('20191201')
})

test('Date with single digit month', () => {
  const value = formatDate('1/31/2019')
  expect(value).toBe('20190131')
})

test('Date with 2 digits day & month', () => {
  const value = formatDate('12/31/2019')
  expect(value).toBe('20191231')
})

test('Date with wrong separator', () => {
  expect(() => {
    formatDate('1-1-2010')
  }).toThrowError('userDate has a wrong format: must be M/D/YYYY')
})

test('Date without separator', () => {
  expect(() => {
    formatDate('112010')
  }).toThrowError('userDate has a wrong format: must be M/D/YYYY')
})

test('Date with wrong year format', () => {
  expect(() => {
    formatDate('1/1/10')
  }).toThrowError('userDate has a wrong format: must be M/D/YYYY')
})
