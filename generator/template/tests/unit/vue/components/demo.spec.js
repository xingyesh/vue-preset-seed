import { shallowMount } from '@vue/test-utils'
import Demo from './demo'

describe('demo vue component', () => {
  test('set props', () => {
    const vm = shallowMount(Demo, {
      // propsData: {
      //   data: 'test_data'
      // }
    })
    // set props
    vm.setProps({
      data: 'test_data'
    })
    // expect(wrapper.isVueInstance()).toBeTruthy()
    expect(vm.props().data).toBe('test_data')
  })
  test('set data', () => {
    const wrapper = shallowMount(Demo)
    wrapper.setData({
      count: 2
    })
    expect(wrapper.vm.count).toBe(2)
  })
  test('trigger increase click', () => {
    const wrapper = shallowMount(Demo)
    const increase = wrapper.find('.increase')
    increase.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })
})