import { createSlice } from '@reduxjs/toolkit';

// Initial state with example widgets
const initialState = {
    widgets: [],
};

// Create the slice
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        // Set the widgets array
        setDashboardWidgets: (state, action) => {
            state.widgets = action.payload || [];
        },
        // Add a new widget
        addWidget: (state, action) => {
            state.widgets.unshift(action.payload);
        },
        // Remove a widget by id
        removeWidget: (state, action) => {
            state.widgets = state.widgets.filter(widget => widget.id !== action.payload);
        },
        // Update a widget by id
        updateWidget: (state, action) => {
            const { index, data, chartName } = action.payload;
            state.widgets[index] = {
                ...state.widgets[index],
                id: '1',
                chartName: `Updated Bar Chart (${chartName})` || 'Updated Bar Chart',
                title: `Updated Bar Chart (${chartName})`,
                type: 'bar',
                group: 'distributionComparison',
                pinned: true,
                description: 'This is Bar Chart',
                data: data,
            };
        },
        // Toggle pin status of a widget by id
        togglePinWidget: (state, action) => {
            const widget = state.widgets.find(widget => widget.id === action.payload);
            if (widget) {
                widget.pinned = !widget.pinned;
            }
        },
    },
});

export const { setDashboardWidgets, addWidget, removeWidget, updateWidget, togglePinWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;
