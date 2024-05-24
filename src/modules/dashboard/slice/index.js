// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
// 	video: {},
// 	isLoading: false,
// 	isError: false,
// 	error: '',
// };

// export const fetchVideo = createAsyncThunk('video/fetchVideo', async (id) => {
// 	const videos = await getVideo(id);
// 	return videos;
// });

// const authSlice = createSlice({
// 	name: 'auth',
// 	initialState,
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(fetchVideo.pending, (state) => {
// 				state.isError = false;
// 				state.isLoading = true;
// 			})
// 			.addCase(fetchVideo.fulfilled, (state, action) => {
// 				state.isLoading = false;
// 				state.video = action.payload;
// 			})
// 			.addCase(fetchVideo.rejected, (state, action) => {
// 				state.isLoading = false;
// 				state.video = [];
// 				state.isError = true;
// 				state.error = action.error?.message;
// 			});
// 	},
// });

// export const { setDarkMode } = authSlice.actions;
// export default authSlice.reducer;
