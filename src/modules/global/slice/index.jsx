// themeReducer.js

import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		darkMode: false, // Initial value for darkMode
	},
	reducers: {
		setDarkMode: (state, action) => {
			state.darkMode = action.payload;
		},
	},
});

export const { setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
