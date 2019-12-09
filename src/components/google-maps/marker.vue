<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { IStop } from '../../api/stops';

@Component({
  name: 'google-map-marker'
})
export default class Marker extends Vue {
  // The google maps api object
  @Prop({
    type: Object,
    required: true
  })
  readonly google!: typeof google.maps;

  // The map object
  @Prop({
    type: Object,
    required: true
  })
  readonly map!: google.maps.Map;

  // The stop to show
  @Prop({
    type: Object,
    required: true
  })
  readonly stop!: IStop;

  @Prop({
    type: Number,
    default: ''
  })
  readonly position!: number;

  // The google map marker instance
  gmapMarker!: google.maps.Marker;

  /**
   * Vue Render Method
   * Required as we don't need a HTML Template for this component
   */
  render() {
    return this.$slots.default;
  }

  /**
   * Vue Lifecycle method
   */
  mounted() {
    // Add a new marker to the google maps object
    this.gmapMarker = new this.google.Marker({
      position: this.stop.point,
      map: this.map,
      label: `${this.position + 1}`
    });
    // Add event listener to liste to clicks on the marker
    this.google.event.addListener(this.gmapMarker, 'click', this.handleMarkerClicked);
  }

  /**
   * Vue Lifecycle method
   */
  beforeDestroy() {
    // Remove the marker from the map
    this.gmapMarker.setMap(null);
  }

  @Watch('position')
  /**
   * Update the label when the position changes
   */
  updateMarkerLabel() {
    this.gmapMarker.setLabel(`${this.position + 1}`);
  }

  // Emit the click event
  @Emit('click')
  /**
   * Handle when the marker has been clicked
   */
  handleMarkerClicked() {
    return this.stop;
  }
}
</script>
