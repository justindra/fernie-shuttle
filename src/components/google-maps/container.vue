<template>
  <div class="google-map">
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script lang="ts" src="./container.ts"></script>

<style lang="less" scoped>
.google-map {
  height: 100%;
}
</style>
