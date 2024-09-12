import { color } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    colors: ["#2b6cb0", "#3182ce", "#4299e1", "#63b3ed", "#90cdf4", "#bee3f8"],
    // colors: ["#4285d3", "#488ed7", "#529fdf", "#59abe5", "#5eb3ec", "#60b5eb"]
  },
  reducers: {
    setColors: (state, action) => {
      state.colors = action.payload;
    },
  },
});

export const { setColors } = colorSlice.actions;

export default colorSlice.reducer;