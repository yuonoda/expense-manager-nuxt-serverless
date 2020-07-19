<template>
  <v-bottom-navigation v-model="bottomNav">
    <v-btn value="recent">
      <span>Summery</span>
      <nuxt-link class="link" to="/">
        <v-icon>mdi-home-variant</v-icon>
      </nuxt-link>
    </v-btn>
    <v-btn value="favorites">
      <span>Records</span>
      <nuxt-link class="link" to="/records">
        <v-icon>mdi-table-of-contents</v-icon>
      </nuxt-link>
    </v-btn>
    <v-btn value="nearby">
      <span>Stats</span>
      <nuxt-link class="link" to="/stats">
        <v-icon>mdi-elevation-rise</v-icon>
      </nuxt-link>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
  export default {
    data() {
      return {
        bottomNav: 'recent'
      }
    }
  }
</script>
<style scoped lang="scss">
  // TODO Turn buttons into default color
</style>
