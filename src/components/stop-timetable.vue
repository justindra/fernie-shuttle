<template>
  <md-list-item>
    <div v-if="times && times.length" class="pre-wrap">
      <div v-for="(time, index) of times" :key="index" class="inline">
        <span>{{ time | convertTime }}</span
        ><span v-if="index < times.length - 1"> | </span>
      </div>
    </div>
    <div v-else class="pre-wrap">
      The shuttle does not stop at this location.
    </div>
  </md-list-item>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { IStop } from '../api/stops';
import { IRoute } from '../api/routes';

import { convertTime } from './stop-timetable-helpers';

@Component({
  filters: {
    convertTime
  }
})
export default class StopTimetable extends Vue {
  // Route Id to show
  @Prop({
    type: String,
    required: true
  })
  readonly routeId!: string;

  // Stop to display
  @Prop({
    type: Object,
    required: true
  })
  readonly stop!: IStop;

  /**
   * Get the times for this stop at this route
   */
  get times() {
    return this.stop.schedule[this.routeId];
  }
}
</script>

<style lang="less" scoped>
.pre-wrap {
  width: 100%;
  white-space: pre-wrap;
}

.inline {
  display: inline-block;
}
</style>
