import { shallowMount, mount, Wrapper } from '@vue/test-utils'
import { Prop, Watch, Vue, Component } from 'vue-property-decorator'
import { MultipleCallMethodWrap } from '../decorators/MethodsWrap'

beforeEach(() => {
  jest.useFakeTimers()
  jest.spyOn(global, 'clearInterval')
})

afterEach(() => {
  jest.useRealTimers()
})
describe('MethodsWrap', () => {
  it('sample', async () => {
    @Component
    class TestComponent extends Vue {
      counter = 0

      @MultipleCallMethodWrap({count:4})
      countUp() {
        this.counter += 1
      }
    }

    const view = new TestComponent()
    expect(view.counter).toBe(0)
    view.countUp()
    expect(view.counter).toBe(4)
  })
})
