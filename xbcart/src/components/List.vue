<template>
  <v-expansion-panels multiple
                      v-model="items"
  >
    <v-expansion-panel
      v-for="(group,i) in getGoods"
      :key="i"
    >
      <v-expansion-panel-header  class="align-center">{{ group.title }}</v-expansion-panel-header>
      <v-expansion-panel-content>

        <v-list>
          <template  v-for="(item,ii) in group.goods">
            <v-list-item :key="i+'-'+ii">
              <v-row>
                <v-col
                  cols="12"
                  md="8"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-col>
                <v-col
                  cols="11"
                  md="3"
                >
                  <v-list-item-content>
                    <v-list-item-title>Цена: <app-rubble-price :price="item.C"></app-rubble-price></v-list-item-title>
                  </v-list-item-content>
                </v-col>

                <v-col
                  cols="1"
                  sm="1"
                >
                  <v-btn
                    icon ripple
                    @click="addToCart(item.id)">
                    <v-icon color="green lighten-1">add_shopping_cart</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>
            <v-divider :key="ii"></v-divider>
          </template>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import RubblePrice from './ui/RubblePrice'

export default {
  data: () => ({
    items: [...Array(5).keys()], // Vuetify asks to add keys for each expanded panel in array
    data: null,
    names: null,
    combinedData: null,
    itemsToCart: 1,
    itemsAddedToCartCount: 0
  }),
  computed: {
    getGoods () {
      return this.$store.getters.getGroupedGoods
    }
  },
  methods: {
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
    }
  },
  components: {
    appRubblePrice: RubblePrice
  }
}
</script>

<style>

</style>
