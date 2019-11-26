<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          text
          :disabled="!getItemsNumber"
        >
          <v-badge
            color="red"
            overlap
          >
            <template v-slot:badge>
              <span v-if="getItemsNumber > 0">{{ getItemsNumber }}</span>
            </template>
            <v-icon large>shopping_cart</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Cart</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Continue shopping</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list two-line>
          <template v-for="item in getGoodsInCart">
            <v-list-item :key="'cart-'+item.id">
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-col>
                  <v-col
                    cols="5"
                    md="2"
                  >
                    <h6>Количество</h6>
                    <v-btn
                      icon ripple
                      :disabled="item.quantity <= 1"
                      @click="decrement(item.id)">
                      <v-icon>remove</v-icon>
                    </v-btn>
                    <span>{{ item.quantity }}</span>
                    <v-btn
                      icon ripple
                      :disabled="item.quantity >= item.P"
                      @click="increment(item.id)">
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="5"
                    md="3"
                  >
                    <v-list-item-content>
                      <v-list-item-subtitle>Цена:
                        <app-rubble-price :price="item.C"></app-rubble-price>
                      </v-list-item-subtitle>
                      <v-list-item-title>Цена за все:
                        <app-rubble-price :price="item.totalUsdPrice"></app-rubble-price>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-col>

                  <v-col
                    cols="1"
                    sm="1"
                  >
                    <v-list-item-action>
                      <v-btn icon ripple
                        @click="removeFromCart(item.id)">
                        <v-icon color="red lighten-1">delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-col>
                </v-row>
            </v-list-item>
            <v-divider :key="item.id"></v-divider>
          </template>
        </v-list>
        Общая цена покупки: <app-rubble-price :price="getTotalCount"></app-rubble-price>
      </v-card>
    </v-dialog>
</template>

<script>
import RubblePrice from './ui/RubblePrice'

export default {
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    increment (id) {
      this.$store.dispatch('addToCart', id)
    },
    decrement (id) {
      this.$store.dispatch('removeFromCart', id)
    },
    removeFromCart (id) {
      this.$store.dispatch('removeGroupFromCart', id).then(() => {
        if (!this.$store.getters.getTotalCount) {
          this.dialog = false
        }
      })
    }
  },
  computed: {
    getGoodsInCart () {
      return this.$store.getters.getGoodsInCart
    },
    getItemsNumber () {
      return this.$store.getters.getItemsNumber
    },
    getTotalCount () {
      return this.$store.getters.getTotalCount
    }
  },
  components: {
    appRubblePrice: RubblePrice
  }
}
</script>

<style>
</style>
