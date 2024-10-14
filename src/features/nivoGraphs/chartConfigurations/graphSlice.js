import { createSlice } from "@reduxjs/toolkit";

// Initial state with example widgets
const initialState = {
  widgets: [],
  selectedWise: 'sales-product-wise',
};

// Create the slice
const graphSlice = createSlice({
  name: "salescustomer",
  initialState,
  reducers: {
    // Set the widgets array
    setSalesCustomerWidgets: (state, action) => {
      state.widgets = action.payload || [];
    },
    // Add a new widget
    addWidget: (state, action) => {
      state.widgets.unshift(action.payload);
    },
    // Remove a widget by id
    removeWidget: (state, action) => {
      state.widgets = state.widgets.filter(
        (widget) => widget.id !== action.payload
      );
    },
    // Update a widget by index
    updateWidget: (state, action) => {
      const { index, ...updates } = action.payload;
      if (index >= 0 && index < state.widgets.length) {
        state.widgets[index] = {
          ...state.widgets[index],
          ...updates,
        };
      }
    },
    // Toggle pin status of a widget by id
    togglePinWidget: (state, action) => {
      const widget = state.widgets.find(
        (widget) => widget.id === action.payload
      );
      if (widget) {
        widget.pinned = !widget.pinned;
      }
    },

    handleGraphWise: (state, action) => {
      state.selectedWise = action.payload
    }
  },
});

export const {
  setSalesCustomerWidgets,
  addWidget,
  removeWidget,
  updateWidget,
  togglePinWidget,
  handleGraphWise
} = graphSlice.actions;
export default graphSlice.reducer;
