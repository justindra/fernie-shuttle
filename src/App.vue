<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
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
              id="tab-morning"
              md-label="Morning"
              :to="{ name: 'route', params: { routeName: 'morning' } }"
            ></md-tab>
            <md-tab
              id="tab-afternoon"
              md-label="Afternoon"
              :to="{ name: 'route', params: { routeName: 'afternoon' } }"
            ></md-tab>
            <md-tab
              id="tab-evening"
              md-label="Evening"
              :to="{ name: 'route', params: { routeName: 'evening' } }"
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

<style lang="less" scoped>
.md-app {
  max-height: 100vh;

  .md-app-content {
    padding: 16px 0 0;
    height: calc(100vh - 6rem);
  }
}

.md-tabs {
  width: calc(100% + 16px);
}
</style>
