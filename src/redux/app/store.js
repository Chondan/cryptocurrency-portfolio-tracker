import { configureStore } from '@reduxjs/toolkit';
import priceReducer from '../slices/priceSlice';

export default configureStore({
	reducer: {
		price: priceReducer
	}
});