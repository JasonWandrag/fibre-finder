<template>
  <label v-for="range of priceRanges" :key="range.label" :for="range.label">
    <input
      type="checkbox"
      :id="range.label"
      :value="range.label"
      @click="selectRange"
    />
    R{{ range.min }} - R{{ range.max }}
  </label>
</template>
<script>
export default {
  computed: {
    priceRanges() {
      return this.$store.state.priceRanges;
    },
  },
  methods: {
    selectRange(e) {
      const { value } = e.target;
      this.$store.dispatch("selectRange", value);
    },
  },
};
</script>
<style></style>
