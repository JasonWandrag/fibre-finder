<template>
  <div v-if="selectedProducts" class="wrapper">
    <div
      class="card"
      v-for="product in selectedProducts"
      :key="product.productCode"
    >
      <h4>{{ product.productName }}</h4>
      <p>{{ product.provider }}</p>
      <p>R{{ product.productRate }}</p>
      <img
        :src="providers.find((p) => p.name === product.provider).url"
        :alt="product.provider"
      />
    </div>
  </div>
  <div v-else>Loading products...</div>
</template>
<script>
export default {
  computed: {
    providers() {
      return this.$store.state.providers.filter((p) =>
        this.$store.state.selectedProviders.includes(p.name)
      );
    },
    selectedProducts() {
      return this.$store.state.filteredPromoProducts;
    },
  },
};
</script>
<style scoped>
.wrapper {
  justify-content: center;
}
</style>
