/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { user } from "../../interface/user";
import agent from "../../agent";
import { login } from "../../interface/login";
import { router } from "../../Routes";
import { toast } from "react-toastify";

interface AccountState {
  user: user | null;
}
const initialState: AccountState = {
  user: null,
};
/**
 * LOGIN
 */
export const signInUser = createAsyncThunk<user, login>("account/signInUser", async (data, thunkAPI) => {
  try {
    const user = await agent.account.login(data);

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

/**
 * CURRENT USER, CHECK TOKEN
 */
export const FetchCurrentUser = createAsyncThunk<user>(
  "account/currentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const user = await agent.account.currentUser();

      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      //if token expired or invalid
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

/**
 * !FUNCTIONS TO MANAGE ACCOUNTS
 */
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: state => {
      state.user = null;
      localStorage.removeItem("user");
      router.navigate("/login");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    //we cant authenticate with bad token so we set as  null
    builder.addCase(FetchCurrentUser.rejected, state => {
      state.user = null;
      localStorage.removeItem("user");
      toast.error("SESSION EXPIRED, PLEASE LOGIN AGAIN");
      router.navigate("/");
    });
    //IF OK then redirect user to /data
    builder.addMatcher(isAnyOf(signInUser.fulfilled, FetchCurrentUser.fulfilled), (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(isAnyOf(signInUser.rejected), (_, action) => {
      console.log(action.payload);
    });
  },
});
/**
 * Export functions for our dispatch
 */
export const { signOut, setUser } = accountSlice.actions;
