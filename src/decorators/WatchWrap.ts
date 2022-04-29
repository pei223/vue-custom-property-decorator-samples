import { createDecorator } from 'vue-class-component'


// To avoid name conflict in Vue instance
const getCallbackName = (methodName: string) => {
  return `${methodName}_doubleCallWatch`
}

/**
 * decorator of watch function wrapping call twice
 * @param  watchVar variable name to observe
 */
export function TwiceCallWatch(
  watchVar: string,
) {
  return createDecorator((componentOptions, methodName: string) => {
    componentOptions.mixins = componentOptions.mixins || []
    componentOptions.mixins = componentOptions.mixins.concat([
      {
        created() {
          ;(this as any)[getCallbackName(methodName)] = () => {
            // call watch function twice
            ;(this as any)[methodName]()
            ;(this as any)[methodName]()
          }
        },
        beforeDestroy() {
          // do nothing
        },
      },
    ])
    componentOptions.mixins = componentOptions.mixins!.concat([
      {
        watch: {
            // Set watch function
          [watchVar]: function () {
          console.log((this as any)[getCallbackName(methodName)])
            ;(this as any)[getCallbackName(methodName)]()
          },
        },
      },
    ])
  })
}