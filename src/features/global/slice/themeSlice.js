import { extendTheme } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";

const blueTheme = extendTheme({
    colors: {
        primary: "#0000FF",
        background: "#F5F5FF",
        text: "#00004A",
    },
});

const greenTheme = extendTheme({
    colors: {
        primary: "#00FF00",
        background: "#F5FFF5",
        text: "#004A00",
    },
});

const redTheme = extendTheme({
	colors: {
		mainBlue: 'green',        
	},
})

const themes = {
    red: redTheme,
    green: greenTheme,
    blue: blueTheme,
}

const multiThemeSlice = createSlice({
    name: "multitheme",
    initialState: {
        currentTheme: {...redTheme},
        themeName: "red",
    },
    reducers: {
        setTheme: (state, action) => {
            const selectedTheme = themes[action.payload];
            state.themeName = action.payload;
            state.currentTheme = {...selectedTheme};
        },
    },
})

export const { setTheme } = multiThemeSlice.actions;
export default multiThemeSlice.reducer;