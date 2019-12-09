import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { IStop } from '../api/stops';

import StopTimetable from './stop-timetable.vue';
import { getNextDueMin } from './stop-timetable-helpers';

@Component({
  components: {
    StopTimetable
  }
})
export default class StopCard extends Vue {
  // Stop to display
  @Prop({
    type: Object,
    required: true,
    default: () => ({})
  })
  readonly stop!: IStop;

  // The inline-style applied to the card
  style = {
    bottom: '-100%',
    transform: ''
  };

  // The min height for the card to be opened fully
  openMin: number = 0;

  // The max height for the card to be opened fully
  openMax: number = 0;

  // The min height for the card to be closed fully
  closedMin: number = 0;

  // The max height for the card to be closed fully
  closedMax: number = 0;

  // The initial Y position of the finger or touch
  initialY!: number;

  // The current Y position of the finger or touch
  currentY!: number;

  // The total Y offset of the finger or touch
  yOffset: number = 0;

  // Whether or not a dragging of the card is in progress
  dragging: boolean = false;

  // When the next bus is due
  nextDue: string = '';

  // The full schedule of the stop
  fullSchedule: number[] = [];

  // Auto-update the due date
  autoUpdateDue!: number;

  /**
   * Vue Lifecycle Hook
   */
  mounted() {
    // Update everything
    this.updateMeasurements();
    this.updateFullSchedule();
    // Auto update the due date every minute once we hit the next minute
    const timeout = 60 - new Date().getSeconds();
    setTimeout(() => {
      this.autoUpdateDue = setInterval(this.calculateNextDue.bind(this), 60 * 1000);
    }, timeout * 1000);
  }

  /**
   * Vue Lifecycle Hook
   */
  beforeDestroy() {
    // If there are any auto updating intervals, make sure to clear it
    if (this.autoUpdateDue) clearInterval(this.autoUpdateDue);
  }

  // Watch changes to the stop prop
  @Watch('stop')
  /**
   * Handle when the stop is updated
   */
  handleUpdateStop() {
    // Update the schedule
    this.updateFullSchedule();
    // The reason for the setTimeout is so that the UI has a chance to render before we
    // start doing our calculations
    setTimeout(this.updateMeasurements.bind(this), 0);
  }

  /**
   * Update the measurements to provide a nice drag interface for the card
   */
  updateMeasurements() {
    // The extra 8 px is the margin from the divider line
    const heightOfTimetable = (this.$refs.stopTimetable as Vue).$el.clientHeight + 8;
    const heightOfHeader = (this.$refs.stopDetails as Vue).$el.clientHeight;

    // Set the default values based on the actual height of the cards
    this.openMin = -heightOfTimetable / 2; // Should be 1/2 of the total height
    this.openMax = -heightOfTimetable;
    this.closedMin = heightOfHeader / 2; // Should be 1/2 of the total height
    this.closedMax = heightOfHeader;

    // Set the bottom, so that this will be the default state of the card
    this.style = {
      ...this.style,
      bottom: `-${(this.$refs.stopTimetable as Vue).$el.clientHeight + 8}px`
    };
  }

  /**
   * Update the full schedule of the stop
   */
  updateFullSchedule() {
    const times = [];
    for (const routeTimes of Object.values(this.stop.schedule)) {
      times.push(...routeTimes);
    }

    this.fullSchedule = times;
    // Now that its been updated, recalculate the due time
    this.calculateNextDue();
  }

  /**
   * Calculate when the next shuttle is due at
   * this stop
   */
  calculateNextDue() {
    this.nextDue = getNextDueMin(this.fullSchedule);
  }

  /**
   * Handle clicking on the details card
   */
  handleClick() {
    // If its not fully opened, open it all
    if (this.currentY === 0) {
      this.setYPosition(this.openMax);
    }
  }

  /**
   * Start the dragging process
   * @param event The touch or mouse drag event
   */
  dragStart(event: TouchEvent | MouseEvent) {
    // Initialize the Y position
    if (event.type === 'touchstart') {
      this.initialY = (event as TouchEvent).touches[0].clientY - this.yOffset;
    } else {
      this.initialY = (event as MouseEvent).clientY - this.yOffset;
    }
    // Set the state
    this.dragging = true;
  }

  /**
   * The dragging event handler
   * @param event The touch or mouse drag event
   */
  drag(event: TouchEvent | MouseEvent) {
    // Only run this whilst its dragging
    if (this.dragging) {
      // Disable any default events
      event.preventDefault();

      // Get the current Y position
      if (event.type === 'touchmove') {
        this.currentY = (event as TouchEvent).touches[0].clientY - this.initialY;
      } else {
        this.currentY = (event as MouseEvent).clientY - this.initialY;
      }
      // Set the offset to be the current one
      this.yOffset = this.currentY;

      // If the offset is bigger than the maximum it should go,
      // just ignore it and return
      if (this.yOffset <= this.openMax) return;

      // Set the translation of the card so we can display it moving
      this.setYTranslate(this.currentY);
    }
  }

  /**
   * End the dragging process
   */
  dragEnd() {
    this.dragging = false;

    if (this.yOffset <= this.openMin) {
      // Set the card to be opened
      this.setYPosition(this.openMax);
    } else if (this.yOffset >= this.closedMin) {
      // Set the card to be closed
      this.setYPosition(this.closedMax);
      // Emit a closed event to notify the parent
      this.$emit('closed');
    } else {
      // Set the card to show just the details
      this.setYPosition(0);
    }
  }

  /**
   * Set the Y Translate to be the position
   * so we can see the card move with the finger
   * @param yPosition The position to set in px
   */
  setYTranslate(yPosition: number) {
    this.style = {
      ...this.style,
      transform: `translate(0, ${yPosition}px)`
    };
  }

  /**
   * Specifically set card to be a certain position
   * @param yPosition The position to set in px
   */
  setYPosition(yPosition: number) {
    this.initialY = yPosition;
    this.currentY = yPosition;
    this.yOffset = yPosition;
    this.setYTranslate(yPosition);
  }
}
