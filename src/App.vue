
<template>
  <v-app>
    <v-content>
      <Frame></Frame>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Frame from './components/Frame.vue';
@Component({
  components: {
    Frame,
  },
})
export default class App extends Vue {}
</script>