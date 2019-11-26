<template>
  <div>
    RUBUSD: {{ getActualRate }}
  </div>
</template>

<script>
export default {
  computed: {
    getActualRate () {
      return this.$store.getters.getRUBUSDRate
    }
  }
}
</script>
