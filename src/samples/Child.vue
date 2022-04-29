<template>
  <div style="height: 100vh">
    <h2>Watch test</h2>
    <input v-model="inputValue" />
    <p>decorated : {{ decoratedText }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

@Component
export default class Test extends Vue {
  inputValue: string = ''
  decoratedText: string = ''

  @Watch('inputValue')
  setDecoratedText() {
    this.decoratedText = `*** ${this.inputValue} ***`
  }
}
</script>
