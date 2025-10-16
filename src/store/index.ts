import { configureStore } from '@reduxjs/toolkit';
import { messageOfTheDayApi } from './messageOfTheDayApi';

export const store = configureStore({
  reducer: {
    [messageOfTheDayApi.reducerPath]: messageOfTheDayApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messageOfTheDayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;