import { mount } from '@vue/test-utils'
import Component from 'vue-class-component'
import Vue from 'vue'
import { TwiceCallWatch } from '../decorators/WatchWrap'
import { Prop } from 'vue-property-decorator'

beforeAll(() => {
  jest.useFakeTimers()
  jest.spyOn(global, 'clearInterval')
})

afterAll(() => {
  jest.useRealTimers()
})

describe('DoubleWatch', () => {
  it('call watch function twice', async () => {
    @Component
    class TestComponent extends Vue {
      @Prop({default: ""})
      testProp!: string

      counter: number = 0

      @TwiceCallWatch("testProp")
      countUp() {
        this.counter += 1
      }

      render() {}
    }

    const view = mount(TestComponent)
    // expect(view.vm.counter).toBe(0)
    view.setProps({testProp: "test"})
    await view.vm.$nextTick()
    expect(view.vm.counter).toBe(2)
  })
})
