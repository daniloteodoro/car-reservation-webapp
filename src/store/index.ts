import { configureStore } from 'redux-starter-kit';
import mainReducer from './mainReducer';

const store = configureStore({
    reducer: mainReducer,
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;
