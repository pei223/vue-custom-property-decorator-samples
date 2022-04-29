<template>
  <div>
    <h2>Pooling sample</h2>
    <p v-for="(item, i) in textLs" :key="i">
      {{ item }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Polling } from '../decorators/PollingSample'

@Component
export default class PollingSample extends Vue {
  textLs: string[] = ['test', 'test1', 'test2']
  counter: number = 2

  @Polling({ intervalMs: 1000 })
  test() {
    console.log('Polling called')
    this.counter += 1
    this.textLs.push(`test${this.counter}`)
  }
}
</script>

