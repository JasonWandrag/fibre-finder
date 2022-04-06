<template>
  <div class="step card" :class="{ active: step === 0 }">
    <FibreCampaignsPicker />
    <button @click="step++" v-if="products">Next Step</button>
  </div>
  <div class="step card" :class="{ active: step === 1 }">
    <FibreProviderPicker />
    <button @click="step--">Previous Step</button>
    <button @click="step++" v-if="providers.length !== 0">Next Step</button>
  </div>
  <div class="step card" :class="{ active: step === 2 }">
    <FibreFilters />
    <FibrePromoProducts />
    <button @click="step--">Previous Step</button>
  </div>
</template>

<script>
import FibreCampaignsPicker from "./components/FibreCampaignsPicker.vue";
import FibreProviderPicker from "./components/FibreProviderPicker.vue";
import FibrePromoProducts from "./components/FibrePromoProducts.vue";
import FibreFilters from "./components/FibreFilters.vue";

export default {
  name: "App",
  components: {
    FibreCampaignsPicker,
    FibreProviderPicker,
    FibrePromoProducts,
    FibreFilters,
  },
  data() {
    return {
      step: 0,
    };
  },
  computed: {
    products() {
      return this.$store.state.selectedPromoProducts;
    },
    providers() {
      return this.$store.state.selectedProviders;
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 5% 15%;
}

.card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: block;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.step {
  display: none;
  // max-width: 600px;
  width: 100%;
  padding: 30px;
  // margin: 2% 15%;
}

.step.active {
  display: block;
}
</style>
