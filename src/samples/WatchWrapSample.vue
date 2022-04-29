<template>
  <div>
    <h2>Watch wrap sample</h2>
    <p>Watch input word and call method twice</p>
    <p>Counter: {{ counter }}</p>
    <input v-model="word" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { TwiceCallWatch } from '../decorators/WatchWrap'

@Component
export default class MethodsWrapSample extends Vue {
  word: string = ""
  counter: number = 0

  @TwiceCallWatch("word")
  onWordChange() {
    this.counter += 1
  }
}
</script>

