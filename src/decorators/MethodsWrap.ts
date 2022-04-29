import { createDecorator } from 'vue-class-component'

type MultipleMethodWrapOption = {
  count?: number
}

/**
 * decorator of a wrapping multiple call method
 * @param  options multiple call options
 */
export function MultipleCallMethodWrap(options: MultipleMethodWrapOption = {}) {
  const count = options.count || 1
  return createDecorator(function(componentOptions, methodName) {
    if (!componentOptions.methods) {
      return
    }
    const originMethod = componentOptions.methods[methodName]

    componentOptions.methods[methodName] = function(...args) {
      for (let i=0;i<count;i++) {
        originMethod.apply(this as any, args)
      }
    }

    const originBeforeDestroy = componentOptions.beforeDestroy

    componentOptions.beforeDestroy = () => {
      if (originBeforeDestroy) {
        originBeforeDestroy()
      }
      // cleaning
    }
  })
}
