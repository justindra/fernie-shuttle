<template>
  <div class="map">
    <h1>This is the map here</h1>
    <stop-card></stop-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import StopCard from '@/components/stop-card.vue';

@Component({
  components: {
    StopCard
  }
})
export default class Map extends Vue {}
</script>
