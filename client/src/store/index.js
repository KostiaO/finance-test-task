import { configureStore, createAction, createReducer  } from '@reduxjs/toolkit';

const initialState = {
  tickers: null,
  higherPricesNames: []
};

export const setTickers = createAction('SET_TICKERS');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setTickers, (state, action) => {

    

    if (state.tickers) {
      const names = [];

      state.tickers.forEach((ticker, index) => {
        if (ticker.price < action.payload[index].price) {
          names.push(ticker.ticker);
        }
      });

      state.higherPricesNames = names;
    }

    

    state.tickers = action.payload;
  });
});

export const store = configureStore({
  reducer
});
