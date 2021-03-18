import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Utils
import fetchingPrice from '../../utils/web3';

const fetchPrice = createAsyncThunk('price/fetchPrice', async () => {
	const prices = await fetchingPrice();
	return prices;
});

const priceSlice = createSlice({
	name: 'price',
	initialState: null,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchPrice.fulfilled, (state, action) => {
				// console.log('fulfilled', action.payload);
				return action.payload;
			})
	}
});

const { reducer } = priceSlice;
export default reducer;
export { fetchPrice };