import { Vue, Component, Prop } from 'vue-property-decorator';
import GoogleMapsApi from 'load-google-maps-api';
import { getCurrentGeoLocation } from './helpers';

// Require the marker image to show the current position
const currentPosMarkerImg = require('./current-position-marker.png');

@Component
export default class GoogleMapContainer extends Vue {
  // The Google Maps API Key
  @Prop({
    type: String,
    required: false
  })
  readonly apiKey!: string;

  // The Google Maps Configuration
  @Prop({
    type: Object,
    required: false,
    default: () => ({
      center: { lat: 0, lng: 0 },
      zoom: 18
    })
  })
  readonly config!: google.maps.MapOptions;

  // The google map api object
  google!: typeof google.maps;

  // The map object
  map!: google.maps.Map;

  // The current position
  currentPos: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };

  // The marker for the current position
  currentPosMarker!: google.maps.Marker;

  // The setTimeoutId so that we can keep track of the auto
  // updating and stop it at anytime
  autoUpdateId: number = -1;

  /**
   * Vue Lifecycle method
   */
  async mounted() {
    // Initialize Google Maps
    const google = await GoogleMapsApi({
      key: this.apiKey
    });

    this.google = google;
    this.initializeMap();
  }

  /**
   * Vue Lifecycle method
   */
  beforeDestroy() {
    // Clear the timeout set with autoUpdateCurrentLocation
    clearTimeout(this.autoUpdateId);
  }

  /**
   * Initialize the Map
   */
  private async initializeMap() {
    // Initialize the map
    const mapEl = this.$refs.googleMap as Element;
    this.map = new this.google.Map(mapEl, this.config);
    // Start the auto updating of the current location
    await this.autoUpdateCurrentLocation();
    // Center the map around the current position
    this.map.setCenter(this.currentPos);
  }

  /**
   * Start the auto update process of the current location
   */
  private async autoUpdateCurrentLocation() {
    // Clear the previous timeout if any
    clearTimeout(this.autoUpdateId);
    try {
      const coords = await getCurrentGeoLocation();
      // Save the current position
      this.currentPos = coords;

      if (this.currentPosMarker) {
        // If a marker already exists, just move it
        this.currentPosMarker.setPosition(coords);
      } else {
        // Marker does not exist, so let's create a new one
        this.currentPosMarker = new this.google.Marker({
          position: coords,
          map: this.map,
          icon: currentPosMarkerImg
        });
      }
    } catch (error) {
      // Something went wrong...
      console.error(error);
    }
    // Call this function again in 3s so we get the latest value
    this.autoUpdateId = setTimeout(() => {
      this.autoUpdateCurrentLocation();
    }, 3 * 1000);
  }
}
