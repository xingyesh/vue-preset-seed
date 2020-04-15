import Utils from '@/assets/js/util'
describe('js utils', () => {
  test('isEmpty', () => {
    expect(Utils.isEmpty(null)).toBeTruthy()
    expect(Utils.isEmpty({})).toBeTruthy()
    expect(Utils.isEmpty({a: 11})).toBeFalsy()
  })
})