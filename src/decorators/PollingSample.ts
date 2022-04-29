import { createDecorator } from 'vue-class-component'

type PollingOptions = {
  intervalMs?: number
}

export const DEFAULT_POLLING_INTERVAL = 3000

// To avoid name conflict in Vue instance
const getCallbackId = (methodName: string) => {
  return `${methodName}_pollingCallbackId`
}

/**
 * decorator of a polling function
 * @param  options polling options
 */
export function Polling(options: PollingOptions = {}) {
  const intervalMs = options.intervalMs ?? DEFAULT_POLLING_INTERVAL
  return createDecorator((componentOptions, methodName) => {
    // Set empty array to mixins if no value
    componentOptions.mixins = componentOptions.mixins || []
    componentOptions.mixins = componentOptions.mixins.concat([
      {
        created() {
          // Set function wrapped setInterval to Vue instance
          ;(this as any)[getCallbackId(methodName)] = setInterval(() => {
            ;(this as any)[methodName]()
          }, intervalMs)
        },
        beforeDestroy() {
          // Clear function wrapped setInterval before destroy
          clearInterval((this as any)[getCallbackId(methodName)])
          ;(this as any)[getCallbackId(methodName)] = null
        },
      },
    ])
  })
}
