<template>
  <md-card
    class="md-card-location"
    @touchstart.native="dragStart"
    @touchmove.native="drag"
    @touchend.native="dragEnd"
    @mousedown.native="dragStart"
    @mousemove.native="drag"
    @mouseup.native="dragEnd"
    :style="style"
  >
    <md-card-area md-inset ref="stopDetails">
      <md-card-header>
        <md-card-header-text>
          <h2 class="md-title">{{ stop.name }}</h2>
          <div class="md-subhead" v-if="stop.description">
            <span>{{ stop.description }}</span>
          </div>
        </md-card-header-text>
        <div class="md-card-status">
          Next shuttle<br />
          {{ nextDue }}
        </div>
      </md-card-header>
    </md-card-area>

    <md-card-content ref="stopTimetable">
      <md-list class="md-dense">
        <md-subheader>Morning</md-subheader>
        <stop-timetable route-id="route-1" :stop="stop"></stop-timetable>
        <md-subheader>Afternoon</md-subheader>
        <stop-timetable route-id="route-2" :stop="stop"></stop-timetable>
        <md-subheader>Evening</md-subheader>
        <stop-timetable route-id="route-3" :stop="stop"></stop-timetable>
      </md-list>
    </md-card-content>
  </md-card>
</template>

<script lang="ts" src="./stop-card.ts"></script>

<style lang="less" scoped>
.md-card.md-card-location {
  margin: 0;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  transition: bottom 300ms;

  .md-card-header {
    display: flex;
    align-items: baseline;

    .md-card-header-text {
      margin-right: 1rem;
    }
    .md-card-status {
      text-align: right;
    }
  }
}
</style>
