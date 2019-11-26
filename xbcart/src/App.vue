<template>
  <v-app>
    <appToolbar>
      <appBasket></appBasket>
    </appToolbar>

    <v-content>
      <v-container>
          <appList></appList>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Basket from './components/Cart'
import Toolbar from './components/Toolbar'
import List from './components/List'

export default {
  name: 'App',
  components: {
    appBasket: Basket,
    appToolbar: Toolbar,
    appList: List
  },
  created () {
    this.$store.dispatch('fetchGoods')
    setInterval(() => {
      this.$store.dispatch('fetchGoods')
    }, 15000)
  }
}
</script>

<style>

</style>
