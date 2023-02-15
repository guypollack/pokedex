import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: "",
  operator: "",
  value: ""
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
    }
  }
});

export const selectCategory = (state) => state.filters.category;
export const selectOperator = (state) => state.filters.operator;
export const selectValue = (state) => state.filters.value;
export const { setCategory, setOperator, setValue, setSelectorValue } = filtersSlice.actions;

export default filtersSlice.reducer;