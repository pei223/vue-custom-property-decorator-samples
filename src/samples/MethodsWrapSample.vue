<template>
  <div>
    <h2>Multiple call method wrap sample</h2>
    <p>Multiple call count: 3</p>
    <p>Counter: {{ counter }}</p>
    <button @click="onClick">call method</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { MultipleCallMethodWrap } from '../decorators/MethodsWrap'

@Component
export default class MethodsWrapSample extends Vue {
  counter: number = 0

  @MultipleCallMethodWrap({count: 3})
  onClick() {
    console.log('onClick called')
    this.counter += 1
  }
}
</script>

