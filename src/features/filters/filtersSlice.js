import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: "",
  operator: "",
  value: "",
  filterList: []
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setOperator: (state, action) => {
      state.operator = action.payload;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setSelectorValue: (state, action) => {
      state[action.payload.selector] = action.payload.value;
    },
    addToFilterList: (state, action) => {
      state.filterList.push(action.payload);
    },
    removeFromFilterList: (state, action) => {
      state.filterList = state.filterList.slice(0, action.payload).concat(state.filterList.slice(action.payload + 1));
    }
  }
});

export const selectCategory = (state) => state.filters.category;
export const selectOperator = (state) => state.filters.operator;
export const selectValue = (state) => state.filters.value;
export const selectFilterList = (state) => state.filters.filterList;
export const { setCategory, setOperator, setValue, setSelectorValue, addToFilterList, removeFromFilterList } = filtersSlice.actions;

export default filtersSlice.reducer;