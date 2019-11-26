<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      Vue test task
    </div>
    <v-spacer></v-spacer>
    <app-rubble-price-widget></app-rubble-price-widget>
    <slot></slot>
  </v-app-bar>
</template>

<script>
import AppRubblePriceWidget from '@/components/ui/AppRubblePriceWidget'
export default {
  components: {
    appRubblePriceWidget: AppRubblePriceWidget
  }
}
</script>
