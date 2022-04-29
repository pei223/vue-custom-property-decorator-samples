<template>
  <div id="app">
    <h2>decorator sample</h2>
    <button @click="changeModeIdx">
      mode: {{ components[modeIdx] }}
    </button>
    <component :is="`${components[modeIdx]}-sample`" />
  </div>
</template>

<script lang="ts">
import PollingSample from './PollingSample.vue'
import MethodsWrapSample from './MethodsWrapSample.vue'
import WatchWrapSample from './WatchWrapSample.vue'
import { Component, Vue } from 'vue-property-decorator'


@Component({
  components: {
    PollingSample,
    WatchWrapSample,
    MethodsWrapSample,
  },
})
export default class App extends Vue {
  readonly components = ["polling", "watch-wrap", "methods-wrap"]
  modeIdx = 0

  changeModeIdx() {
    this.modeIdx = (this.modeIdx + 1) % this.components.length
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
