<template>
  <div class="map">
    <google-map v-slot="{ google, map }" :apiKey="apiKey" :stops="stops" @click="handleMapClicked">
      <!-- Show all the stops marker for the route -->
      <google-map-marker
        v-for="stop of stops"
        :key="stop.id"
        :google="google"
        :map="map"
        :stop="stop"
        @click="handleMarkerClicked"
      ></google-map-marker>
    </google-map>
    <stop-card v-if="currentStop" :stop="currentStop"></stop-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import StopCard from '@/components/stop-card.vue';
import GoogleMap from '@/components/google-maps';
import { IRoute } from '../api/routes';
import { IStop } from '../api/stops';

@Component({
  components: {
    StopCard,
    GoogleMap: GoogleMap.Container,
    GoogleMapMarker: GoogleMap.Marker
  }
})
export default class Map extends Vue {
  // Api Key for Google Maps
  apiKey: string = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;

  // The Route Id
  // This is received from VueRouter Params
  @Prop({
    type: String,
    required: true
  })
  readonly routeId!: string;

  // THe current route to show
  route!: IRoute;

  // List of stops for the route
  stops: IStop[] = [];

  // The current stop to display
  currentStop: IStop | null = null;

  /**
   * Vue Lifecycle method
   */
  created() {
    // Handle first time we load this page
    this.handleRouteIdChanged(this.routeId);
  }

  // Watch any changes to the routeId
  @Watch('routeId')
  /**
   * Handle if the route id is changed
   */
  async handleRouteIdChanged(n: string) {
    // Get all the data required
    this.route = await this.$api.Routes.get(n);
    this.stops = await this.$api.Stops.hydrate(this.route.stops);
  }

  /**
   * Handle when a marker has been clicked
   */
  handleMarkerClicked(stop: IStop) {
    this.currentStop = stop;
  }

  /**
   * Handle when the map has been clicked
   */
  handleMapClicked() {
    // If a stop is currently displayed, dismiss it
    if (this.currentStop) this.currentStop = null;
  }
}
</script>

<style lang="less" scoped>
.map {
  height: 100%;
}
</style>
