<template>
  <h2>Step 2: Choose your provider</h2>
  <div v-if="providers" class="wrapper">
    <label
      class="card"
      :class="{ active: selectedProviders.includes(provider.name) }"
      v-for="provider of providers"
      :key="provider.code"
      :for="provider.code"
    >
      <input
        type="checkbox"
        :id="provider.code"
        :value="provider.name"
        @click="selectProvider"
      />
      <img :src="provider.url" :alt="provider.name" />
    </label>
  </div>
  <div v-else>Loading providers...</div>
</template>
<script>
export default {
  computed: {
    providers() {
      const { promoCampaignProducts } = this.$store.state;
      console.log(promoCampaignProducts);
      return promoCampaignProducts;
    },
    selectedProviders() {
      return this.$store.state.selectedProviders;
    },
  },
  methods: {
    selectProvider(e) {
      const { value } = e.target;
      this.$store.dispatch("selectProvider", value);
    },
  },
};
</script>
<style>
.card {
  flex-grow: 1;
  padding: 5%;
}
.card.active {
  box-shadow: 0 3px 6px rgba(100, 149, 237, 0.16),
    0 3px 6px rgba(100, 149, 237.23);
}
.card:not(.active):hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.card input {
  display: none;
}
.card img {
  width: 100%;
  max-height: 50px;
  height: 50px;
  object-fit: contain;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
