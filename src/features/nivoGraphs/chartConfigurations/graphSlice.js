import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  widgets: [],
  selectedWise: '',
  reportType: '',
};

const graphSlice = createSlice({
  name: "graphs",
  initialState,
  reducers: {
    getAllWidgets: (state) => {
      const localWidgets = JSON.parse(localStorage.getItem("widgets")) || [];
      state.widgets = localWidgets;
    },
    addWidget: (state, action) => {
      state.widgets.unshift(action.payload);
    },
    removeWidget: (state, action) => {
      const id = action.payload;
      state.widgets = state.widgets.filter((widget) => widget.id !== id);
      // Remove the widget from local storage as well
      const localWidgets = JSON.parse(localStorage.getItem("widgets")) || [];
      const updatedWidgets = localWidgets.filter((widget) => widget.id !== id);
      localStorage.setItem("widgets", JSON.stringify(updatedWidgets));
    },
    updateWidget: (state, action) => {
      const { id, data } = action.payload;
      const widgetIndex = state.widgets.findIndex(widget => widget.id === id);
      if (widgetIndex !== -1) {
        state.widgets[widgetIndex] = {
          ...state.widgets[widgetIndex],
          ...data
        }

        // sync with local storage
        localStorage.setItem("widgets", JSON.stringify(state.widgets));
      }
    },
    togglePinWidget: (state, action) => {
      const widget = state.widgets.find(
        (widget) => widget.id === action.payload
      );
      if (widget) {
        widget.pinned = !widget.pinned;
      }
    },
    handleGraphWise: (state, action) => {
      const { selectedWise, reportType } = action.payload;
      state.selectedWise = selectedWise;
      state.reportType = reportType;
    },
    refreshWidget: (state, action) => {
      const { id, data } = action.payload;
      const widgetIndex = state.widgets.findIndex(widget => widget.id === id);

      if (widgetIndex !== -1) {
        state.widgets[widgetIndex] = {
          ...state.widgets[widgetIndex],
          ...data
        }

        // sync with local storage
        localStorage.setItem("widgets", JSON.stringify(state.widgets));
      }
    }
  },
});

export const {
  addWidget,
  getAllWidgets,
  removeWidget,
  updateWidget,
  togglePinWidget,
  refreshWidget,
  handleGraphWise
} = graphSlice.actions;
export default graphSlice.reducer;
