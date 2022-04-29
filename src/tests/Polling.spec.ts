import { mount } from '@vue/test-utils'
import Component from 'vue-class-component'
import Vue from 'vue'
import { DEFAULT_POLLING_INTERVAL, Polling } from '../decorators/PollingSample'

beforeEach(() => {
  jest.useFakeTimers()
  jest.spyOn(global, 'clearInterval')
})

afterEach(() => {
  jest.useRealTimers()
})
describe('Polling', () => {
  it('polling function with default interval', async () => {
    @Component
    class TestComponent extends Vue {
      counter: number = 0

      @Polling()
      countUp() {
        this.counter += 1
      }

      render() {}
    }

    const view = mount(TestComponent)
    jest.advanceTimersByTime(DEFAULT_POLLING_INTERVAL)
    expect(view.vm.counter).toBe(1)
    jest.advanceTimersByTime(DEFAULT_POLLING_INTERVAL)
    expect(view.vm.counter).toBe(2)
  })
  it('polling function with default interval 500ms', async () => {
    @Component
    class TestComponent extends Vue {
      counter: number = 0

      @Polling({ intervalMs: 500 })
      countUp() {
        this.counter += 1
      }

      render() {}
    }

    const view = mount(TestComponent)
    jest.advanceTimersByTime(500)
    expect(view.vm.counter).toBe(1)
    jest.advanceTimersByTime(500)
    expect(view.vm.counter).toBe(2)
  })
  it('not polling in interval time', async () => {
    @Component
    class TestComponent extends Vue {
      counter: number = 0

      @Polling()
      countUp() {
        this.counter += 1
      }

      render() {}
    }

    const view = mount(TestComponent)
    jest.advanceTimersByTime(DEFAULT_POLLING_INTERVAL / 2)
    expect(view.vm.counter).toBe(0)
    jest.advanceTimersByTime(DEFAULT_POLLING_INTERVAL / 2)
    expect(view.vm.counter).toBe(1)
  })
})
