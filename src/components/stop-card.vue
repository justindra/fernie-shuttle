<template>
  <md-card class="md-card-location">
    <md-card-area md-inset>
      <md-card-header>
        <md-card-header-text>
          <h2 class="md-title">{{ stop.name }}</h2>
          <div class="md-subhead">
            <md-icon>location_on</md-icon>
            <span>{{ stop.description }}</span>
          </div>
        </md-card-header-text>
        <div class="md-card-status">
          in 30 min
        </div>
      </md-card-header>
    </md-card-area>

    <md-card-content>
      <md-list class="md-dense">
        <md-subheader>Morning</md-subheader>
        <md-list-item>
          <div class="md-list-item-text md-list-item-pre-wrap">
            <span
              >08:00AM | 08:30AM | 09:00AM | 09:30AM | 10:00AM | 10:30AM | 11:00AM | 11:30AM</span
            >
          </div>
        </md-list-item>
        <md-subheader>Afternoon</md-subheader>
        <md-list-item>
          <div class="md-list-item-text md-list-item-pre-wrap">
            <span
              >08:00AM | 08:30AM | 09:00AM | 09:30AM | 10:00AM | 10:30AM | 11:00AM | 11:30AM</span
            >
          </div>
        </md-list-item>
        <md-subheader>Evening</md-subheader>
        <md-list-item>
          <em class="md-list-item-text md-list-item-pre-wrap"
            >The shuttle does not stop at this location in the evening.</em
          >
        </md-list-item>
      </md-list>
    </md-card-content>
  </md-card>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { IStop } from '../api/stops';

@Component
export default class StopCard extends Vue {
  // Stop to display
  @Prop({
    type: Object,
    required: true,
    default: () => ({})
  })
  readonly stop!: IStop;
}
</script>

<style lang="less" scoped>
.md-card.md-card-location {
  margin: 0;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  .md-card-header {
    display: flex;
    align-items: baseline;
  }
}

.md-list-item-pre-wrap {
  white-space: pre-wrap;
}
</style>
