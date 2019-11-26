<template>
  <v-expansion-panels
    v-if="XXXX.length"
    multiple v-model="XXXX"
  >
    <v-expansion-panel
      v-for="(group,i) in getGoods"
      :key="`itemsGroup-${i}`"
    >
      <v-expansion-panel-header  class="align-center">{{ group.title }}</v-expansion-panel-header>
      <v-expansion-panel-content>

        <v-list>
          <template  v-for="(item, ii) in group.goods">
            <v-list-item :key="`orderItem-${item.id}`">
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
                    @click="addToCart(item)">
                    <v-icon color="green lighten-1">add_shopping_cart</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>
            <v-divider :key="`orderItemDevider-${item.id}`" v-if="ii !== group.goods.length - 1"></v-divider>
          </template>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import RubblePrice from './ui/RubblePrice'

export default {
  data () {
    return {
      XXXX: [],
      groupItemsCount: null // Vuetify asks to add keys for each expanded panel in array
    }
  },
  computed: {
    getGoods () {
      return this.$store.getters.getGroupedGoods
    }
  },
  watch: {
    getGoods (newValue) {
      this.XXXX = Array.from({ length: Object.entries(this.getGoods).length }).map((_, i) => i)
    }
  },
  methods: {
    addToCart (item) {
      this.$store.dispatch('addToCart', item)
    }
  },
  created () {
    this.groupItemsCount = this.$store.getters.getGroupedGoods
  },
  components: {
    appRubblePrice: RubblePrice
  }
}
</script>

<style>

</style>
