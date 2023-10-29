import agent from "../agent";
import { gambitData } from "../interface/gambitData";
import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/configureStore";

const gambitAdapter = createEntityAdapter<gambitData>();

export const fetchGambitDataAsync = createAsyncThunk<gambitData[]>("gambit/fetchProductsAsync", async () => {
  try {
    return await agent.gambit.list();
  } catch (error) {
    console.log(error);
  }
});

export const gambitSlice = createSlice({
  name: "gambitData",
  initialState: gambitAdapter.getInitialState({
    GambitLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGambitDataAsync.pending, state => {
      state.status = "pendingFetchData";
    });
    builder.addCase(fetchGambitDataAsync.fulfilled, (state, action) => {
      gambitAdapter.setAll(state, action.payload);
      (state.status = "idle"), (state.GambitLoaded = true);
    });
    builder.addCase(fetchGambitDataAsync.rejected, state => {
      state.status = "idle";
    });
  },
});
export const gambitSelectors = gambitAdapter.getSelectors((state: RootState) => state.gambitData);
