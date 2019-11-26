<template>
  <span>
    <strong class="rubbles-price-box" @click="clicked" :class="{priceIsUp: highlightUp, priceIsDown: highlightDown}">{{ toRubbles | priceBeautifier }}</strong> руб.
  </span>
</template>

<script>
export default {
  props: ['price'],
  data () {
    return {
      highlightUp: false,
      highlightDown: false
    }
  },
  computed: {
    toRubbles () {
      return this.$store.getters.getRUBUSDRate * this.price
    }
  },
  methods: {
    clicked () {
      this.highlightUp = true
    }
  },
  watch: {
    toRubbles (newPrice, previousPrice) {
      if (newPrice > previousPrice) {
        this.highlightUp = false
        this.highlightDown = true
      } else {
        this.highlightUp = true
        this.highlightDown = false
      }
    }
  }
}
</script>

<style scoped>
  .rubbles-price-box{
    padding: 2px 5px;
    border-radius: 20px;
    background: rgba(240, 52, 52, 0);
  }
  .priceIsUp {
    background: rgba(240, 52, 52, 0.2);
    transition: background 2s;
  }
  .priceIsDown {
    background: rgba(123, 239, 178, 0.2);
    transition: background 2s;
  }
</style>
