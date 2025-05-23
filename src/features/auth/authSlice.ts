import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import authApis from "../../api/authApis";
import { UserDataResponse, UserData } from "../../types/userData";

// Type definitions
interface AuthState {
  isAuthenticated: boolean | undefined;
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

// Async thunk for fetch user's data
export const fetchAsyncGetUser = createAsyncThunk<UserDataResponse>(
  "auth/getUser",
  async () => {
    const response = await authApis.getUser();
    return response;
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    },
    setLogin: (state, action) => {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    // Builder for fetch user's data
    builder.addCase(fetchAsyncGetUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchAsyncGetUser.fulfilled,
      (state, action: PayloadAction<UserDataResponse>) => {
        state.isLoading = false;
        if ("data" in action.payload) {
          state.user = action.payload.data;
        }
      }
    );
    builder.addCase(fetchAsyncGetUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch user data";
      console.error("Error fetching user data:", action.error.message);
    });
  },
});

export const { logout, setLogin } = authSlice.actions;

export default authSlice.reducer;
