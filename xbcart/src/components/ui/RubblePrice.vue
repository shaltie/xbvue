<template>
  <span>
    <strong>{{ toRubbles | priceBeautifier }}</strong> руб.
  </span>
</template>

<script>
export default {
  props: ['price'],
  computed: {
    toRubbles () {
      return this.$store.getters.getRubblesPrice(this.price)
    }
  }
}
</script>
