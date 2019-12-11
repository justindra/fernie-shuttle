import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import GoogleMapsApi from 'load-google-maps-api';
import { getCurrentGeoLocation } from './helpers';
import { IStop } from '@/api/stops';

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
      // Default to Fernie
      center: { lat: 49.487312, lng: -115.076268 },
      zoom: 13,
      streetViewControl: false,
      fullscreenControl: false
    })
  })
  readonly config!: google.maps.MapOptions;

  // A list of stops used in the map
  @Prop({
    type: Array,
    default: () => []
  })
  readonly stops!: IStop[];

  // The google map api object
  google: typeof google.maps | null = null;

  // The map object
  map!: google.maps.Map;

  // The current position
  currentPos!: google.maps.LatLngLiteral;

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
    if (!this.google) return;
    // Initialize the map
    const mapEl = this.$refs.googleMap as Element;
    this.map = new this.google.Map(mapEl, this.config);
    // Start the auto updating of the current location
    await this.autoUpdateCurrentLocation();
    // Make sure we fit the bounds
    this.handleStopsChanged(this.stops);

    this.google.event.addListener(this.map, 'click', this.handleMapClicked);
  }

  /**
   * Start the auto update process of the current location
   */
  private async autoUpdateCurrentLocation() {
    if (!this.google) return;
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
          map: this.map as google.maps.Map,
          icon: currentPosMarkerImg
        });
      }
    } catch (error) {
      if (error.code === 1) {
        // The user has denied the Geolocation permission
        // Let's stop tying to get anything
        clearTimeout(this.autoUpdateId);
        return;
      }
      console.error(error);
    }
    // Call this function again in 3s so we get the latest value
    this.autoUpdateId = setTimeout(() => {
      this.autoUpdateCurrentLocation();
    }, 3 * 1000);
  }

  // Watch the changes to stops
  @Watch('stops')
  /**
   * Handle when that list changes
   */
  handleStopsChanged(stops: IStop[]) {
    if (!this.google) return;
    const bounds = new this.google.LatLngBounds();
    // Add all the stops to the bounds
    stops.forEach((stop) => {
      bounds.extend(stop.point);
    });
    // Add our current position to the bounds
    if (this.currentPos) bounds.extend(this.currentPos);
    // Make sure we fit it all in there
    this.map.fitBounds(bounds);
  }

  // Emit the click event
  @Emit('click')
  /**
   * Handle when the map is clicked
   */
  handleMapClicked() {
    return this.map;
  }
}
