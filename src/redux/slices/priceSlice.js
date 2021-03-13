import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Utils
import { fetchingPrice } from '../../utils/api';
import { supportedCoins } from '../../utils/coin';

const fetchPrice = createAsyncThunk('price/fetchPrice', async () => {
	const response = await fetchingPrice(supportedCoins);
	return response.data;
});

const priceSlice = createSlice({
	name: 'price',
	initialState: {},
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