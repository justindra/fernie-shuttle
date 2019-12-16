<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last" :class="{ 'os-android': isAndroid }">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <!-- Title Bar -->
          <div class="md-toolbar-section-start">
            <span class="md-title">Fernie Ski Shuttle</span>
          </div>
          <!-- Info Button -->
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button" :to="{ name: 'info' }">
              <md-icon>info</md-icon>
            </md-button>
          </div>
        </div>
        <!-- The Route tabs -->
        <div class="md-toolbar-row">
          <md-tabs class="md-primary" md-alignment="fixed" md-sync-route>
            <md-tab
              v-for="route of routes"
              :key="route.id"
              :md-label="route.name"
              :to="{ name: 'route', params: { routeId: route.id } }"
            ></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { IRoute } from './api/routes';

/**
 * Check if the current browser is running on Android
 */
function isAndroid(): boolean {
  return !!navigator.userAgent.match(/Android/i);
}

@Component
export default class App extends Vue {
  // List of available routes
  routes: IRoute[] = [];

  // Whether or not we are running on Android
  isAndroid: boolean = isAndroid();

  /**
   * Vue Lifecycle Method
   */
  async created() {
    // Get the list of routes
    this.routes = await this.$api.Routes.getAll();

    // If no route was specified, go to the first route provided
    if (!this.$route.params.routeId) {
      this.$router.push({ name: 'route', params: { routeId: this.routes[0].id } });
    }
  }
}
</script>

<style lang="less" scoped>
.md-app {
  max-height: 100vh;
  // This is a bit of a hack to fix the weird navbar behaviour on Chrome Android
  // See here for explanation: https://dev.to/peiche/100vh-behavior-on-chrome-2hm8
  @supports (-webkit-appearance: none) {
    &.os-android {
      // Remove the height of the Navbar for Chrome Android
      max-height: calc(100vh - 56px);

      @media all and (display-mode: standalone) {
        // If the app is running in standalone, it should still use the full height
        max-height: 100vh;
      }
    }
  }
  // Target the md-app container that is inside the material component
  & /deep/ .md-app-container {
    overflow: hidden;
  }

  .md-app-content {
    padding: 16px 0 0;
    height: calc(100vh - 6rem);
  }
}

.md-tabs {
  width: calc(100% + 16px);
}
</style>
