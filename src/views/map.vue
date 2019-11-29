<template>
  <div class="map">
    <google-map :apiKey="apiKey"></google-map>
    <!-- <stop-card></stop-card> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import StopCard from '@/components/stop-card.vue';
import GoogleMap from '@/components/google-maps/container.vue';

@Component({
  components: {
    StopCard,
    GoogleMap
  }
})
export default class Map extends Vue {
  apiKey: string = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
}
</script>

<style lang="less" scoped>
.map {
  height: 100%;
}
</style>
