<template>
  <v-app>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <BottomNav />
  </v-app>
</template>
<script>
import BottomNav from '../components/organisms/BottomNav'
export default {
  components: { BottomNav },
}
</script>
