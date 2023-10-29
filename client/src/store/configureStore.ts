import { configureStore } from "@reduxjs/toolkit";


import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { gambitSlice } from "../features/gambitSlice";
import { accountSlice } from "../features/account/accountSlice";

export const store = configureStore({
  reducer: {
    gambitData: gambitSlice.reducer,
    account: accountSlice.reducer,
  },
});

//config for typescript custom hook
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
