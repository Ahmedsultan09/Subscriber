import { configureStore, createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "packageSlice",
  initialState: {
    stepNum: 1,
    plan: { name: "", priceMonthly: null, priceYearly: null },
    type: "",
    addOns: [],
    prices: [],
    totalPrice: null,
    userSelection: {
      planName: "",
      planPrice: null,
      addOns: [],
      totalPrice: null,
    },
    arcade: {
      name: "Arcade",
      priceMonthly: 9,
      priceYearly: 90,
    },
    advanced: {
      name: "Advanced",
      priceMonthly: 12,
      priceYearly: 120,
    },
    pro: {
      name: "Pro",
      priceMonthly: 15,
      priceYearly: 150,
    },
    online: {
      name: "Online Service",
      priceMonthly: 1,
      priceYearly: 10,
    },
    storage: {
      name: "Larger storage",
      priceMonthly: 2,
      priceYearly: 20,
    },
    profile: {
      name: "Customize Profile",
      priceMonthly: 2,
      priceYearly: 20,
    },
  },
  reducers: {
    InsertAddons(state, action) {
      const newAddons = action.payload;
      const existingAddons = state.addOns.find(
        (item) => item.id === newAddons.id
      );
      if (!existingAddons) {
        state.addOns.push({
          id: newAddons.id,
          type: newAddons.type,
          monthlyPrice: newAddons.monthlyPrice,
          annualPrice: newAddons.annualPrice,
        });
      }
    },
    setPlan(state, action) {
      if (action.payload === "arcade") {
        state.plan = {
          name: state.arcade.name,
          priceMonthly: state.arcade.priceMonthly,
          priceYearly: state.arcade.priceYearly,
        };
      }
      if (action.payload === "advanced") {
        state.plan = {
          name: state.advanced.name,
          priceMonthly: state.advanced.priceMonthly,
          priceYearly: state.advanced.priceYearly,
        };
      }
      if (action.payload === "pro") {
        state.plan = {
          name: state.pro.name,
          priceMonthly: state.pro.priceMonthly,
          priceYearly: state.pro.priceYearly,
        };
      }

      console.log(state.plan);
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setAddOns(state, action) {
      const newAddsOn = action.payload;

      const existingAddonsIndex = state.addOns.findIndex(
        (item) => item.name.split(" ")[0] === newAddsOn
      );

      if (existingAddonsIndex === -1) {
        if (action.payload === "Online") {
          state.addOns = [...state.addOns, state.online];
        } else if (action.payload === "Larger") {
          state.addOns = [...state.addOns, state.storage];
        } else if (action.payload === "Customize") {
          state.addOns = [...state.addOns, state.profile];
        }
      } else {
        state.addOns = state.addOns.filter(
          (_, index) => index !== existingAddonsIndex
        );
      }
      console.log(state.addOns);
    },
    resetAddOns(state, action) {
      state.addOns = [];
    },
    handleNext(state, action) {
      if (state.stepNum < 5) {
        ++state.stepNum;
      }
      console.log(state.stepNum);
    },
    handleBack(state, action) {
      if (state.stepNum > 0) {
        --state.stepNum;
      }
      console.log(state.stepNum);
    },
    setAddOnsPrices(state, action) {
      state.prices = [];
      if (state.type === "m") {
        state.addOns.forEach((item) => {
          state.prices = [...state.prices, item.priceMonthly];
        });
      } else {
        state.addOns.forEach((item) => {
          state.prices = [...state.prices, item.priceYearly];
        });
      }
      console.log(state.prices);
    },
    setTotalPrice(state, action) {
      if (state.type === "m") {
        state.totalPrice =
          state.plan.priceMonthly +
          state.prices.reduce((partialSum, a) => partialSum + a, 0);
      } else {
        state.totalPrice =
          state.plan.priceYearly +
          state.prices.reduce((partialSum, a) => partialSum + a, 0);
      }

      console.log(state.totalPrice);
    },
  },
});

const store = configureStore({
  reducer: { package: packageSlice.reducer },
});

export const packageAction = packageSlice.actions;

export default store;
