import { createStore } from "vuex";
import { BASE_URL, LOGO_BASE_URL } from "../modules/variables";
import { getProductsFromPromo } from "../modules/functions";

export default createStore({
  state: {
    campaigns: null,
    selectedCampaign: null,
    promoCodes: null,
    promoProducts: null,
    promoCampaignProducts: null,
    selectedPromoProducts: null,
    filteredPromoProducts: null,
    providers: [
      {
        code: "centurycity",
        name: "Century City Connect",
        url: `${LOGO_BASE_URL}/provider-century.png`,
      },
      {
        code: "evotel",
        name: "Evotel",
        url: `${LOGO_BASE_URL}/provider-evotel.png`,
      },
      {
        code: "octotel",
        name: "Octotel",
        url: `${LOGO_BASE_URL}/provider-octotel.png`,
      },
      {
        code: "vumatel",
        name: "Vumatel",
        url: `${LOGO_BASE_URL}/provider-vuma.png`,
      },
      {
        code: "openserve",
        name: "Openserve",
        url: `${LOGO_BASE_URL}/provider-openserve.png`,
      },
      {
        code: "frogfoot",
        name: "Frogfoot",
        url: `${LOGO_BASE_URL}/provider-frogfoot.png`,
      },
      {
        code: "mfn",
        name: "MFN",
        url: `${LOGO_BASE_URL}/provider-metrofibre.png`,
      },
      {
        code: "vodacom",
        name: "Vodacom",
        url: `${LOGO_BASE_URL}/provider-vodacom.png`,
      },
      {
        code: "linkafrica",
        name: "Link Africa",
        url: `${LOGO_BASE_URL}/provider-linkafrica.png`,
      },
      {
        code: "linklayer",
        name: "Link Layer",
        url: `${LOGO_BASE_URL}/provider-link-layer.png`,
      },
      {
        code: "lightstruck",
        name: "Lightstruck",
        url: `${LOGO_BASE_URL}/provider-lightstruck.png`,
      },
      {
        code: "mitchells",
        name: "Mitchells Fibre",
        url: `${LOGO_BASE_URL}/provider-mitchells.png`,
      },
      {
        code: "vumareach",
        name: "Vuma Reach",
        url: `${LOGO_BASE_URL}/provider-vuma.png`,
      },
    ],
    selectedProviders: [],
    priceRanges: [
      { min: 0, max: 699, label: "R0 - R699" },
      { min: 700, max: 999, label: "R700 - R999" },
      { min: 1000, max: 9999, label: "R1000+" },
    ],
    selectedPriceRanges: [],
  },
  mutations: {
    setCampaigns: (state, campaigns) => {
      state.campaigns = campaigns;
    },
    setCampaign: (state, campaign) => {
      state.selectedCampaign = campaign;
    },
    setPromoCodes: (state) => {
      state.promoCodes = state.selectedCampaign.promocodes;
    },
    setPromoProducts: (state, products) => {
      state.promoProducts = products;
      const availableProviders = [...new Set(products.map((p) => p.provider))];

      state.promoCampaignProducts = state.providers.filter((provider) =>
        availableProviders.includes(provider.name)
      );

      console.log(products, state.promoCampaignProducts);
    },
    setSelectedPromoProducts: (state) => {
      state.selectedPromoProducts = state.promoProducts.filter((product) =>
        state.selectedProviders.includes(product.provider)
      );

      state.filteredPromoProducts = state.selectedPromoProducts;
      console.log(state.selectedPromoProducts);
    },
    setSelectedProviders: (state, provider) => {
      state.selectedProviders.includes(provider)
        ? state.selectedProviders.splice(
            state.selectedProviders.indexOf(provider),
            1
          )
        : state.selectedProviders.push(provider);
    },
    setSelectedRange: (state, range) => {
      state.selectedPriceRanges.includes(range)
        ? state.selectedPriceRanges.splice(
            state.selectedPriceRanges.indexOf(range),
            1
          )
        : state.selectedPriceRanges.push(range);
    },
    filterProductsByPrice: (state) => {
      if (!state.selectedPriceRanges.length) {
        state.filteredPromoProducts = state.selectedPromoProducts;
        return;
      }

      const selectedRanges = state.priceRanges.filter((range) =>
        state.selectedPriceRanges.includes(range.label)
      );
      const products = [];

      state.selectedPromoProducts.forEach((product) => {
        return selectedRanges.forEach((range) => {
          if (
            range.min <= product.productRate &&
            range.max >= product.productRate
          )
            products.push(product);
        });
      });

      products.sort((pa, pb) => pa.productRate - pb.productRate);
      state.filteredPromoProducts = products;
    },
  },
  actions: {
    getCampaigns({ commit, state }) {
      if (state.campaigns) return;

      fetch(
        "https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public"
      )
        .then((res) => res.json())
        .then((data) => {
          commit("setCampaigns", data.campaigns);
        });
    },
    getPromoCodesProducts({ commit, state }) {
      const promcodeProductsURL = `${BASE_URL}/marketing/products/promos/${state.promoCodes.join(
        ","
      )}?sellable_online=true`;

      fetch(promcodeProductsURL)
        .then((res) => res.json())
        .then((data) => {
          const summarizedProducts = data.reduce(
            (prods, pc) => [...prods, ...getProductsFromPromo(pc)],
            []
          );

          commit("setPromoProducts", summarizedProducts);
          commit("setSelectedPromoProducts");
        });
    },
    setCampaign({ commit, state, dispatch }, campaignCode) {
      const selectedCampaign = state.campaigns.find((campaign) => {
        return campaign.code === campaignCode;
      });
      commit("setCampaign", selectedCampaign);
      commit("setPromoCodes");
      dispatch("getPromoCodesProducts");
    },
    selectProvider({ commit }, provider) {
      commit("setSelectedProviders", provider);
      commit("setSelectedPromoProducts");
      commit("filterProductsByPrice");
    },
    selectRange({ commit }, range) {
      commit("setSelectedRange", range);
      commit("filterProductsByPrice");
    },
  },
  modules: {},
});
