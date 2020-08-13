<template>
  <v-bottom-navigation v-model="bottomNav" fixed>
    <v-btn nuxt value="recent" to="/">
      <span>Summery</span>
      <v-icon>mdi-home-variant</v-icon>
    </v-btn>
    <v-btn nuxt value="favorites" to="/transactions">
      <span>Transactions</span>
      <v-icon>mdi-table-of-contents</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
// TODO アイコン画像のみクリッカブルになっている
export default {
  data() {
    return {
      bottomNav: 'recent',
    }
  },
}
</script>
<style scoped lang="scss">
// TODO Turn buttons into default color
</style>
