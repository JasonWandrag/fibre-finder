<template>
  <h2>Step 1: Select your deal</h2>
  <select
    v-model="selected"
    placeholder="Choose a deal"
    v-if="campaigns"
    @change="selectCampaign(selected)"
  >
    <option
      v-for="campaign of campaigns"
      :key="campaign.code"
      :value="campaign.code"
    >
      {{ campaign.name }}
    </option>
  </select>
  <div v-else>Loading Campaigns...</div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("getCampaigns");
  },
  computed: {
    campaigns() {
      return this.$store.state.campaigns;
    },
  },
  data() {
    return {
      selected: null,
    };
  },
  methods: {
    selectCampaign(campaign) {
      this.$store.dispatch("setCampaign", campaign);
    },
  },
};
</script>
<style></style>
