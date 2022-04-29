import Vue from 'vue'
import { createDecorator } from 'vue-class-component'

/**
 * decorator of a computed
 */
export function ComputedSample() {
  return createDecorator((options, key) => {
    options.computed = options.computed || {}
    options.computed[key] = {
      cache: false,
      get(this: Vue) {
        // Getter
        console.log("get")
        // return any value
      },
      set(this: Vue, value) {
        // Setter
        console.log(`set ${value}`);
        // set any value
      }
    }
  })
}