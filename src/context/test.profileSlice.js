import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1) Fetch the user profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Retrieve token from auth slice
      const state = getState();
      const token = state.auth.token;

      // Make a POST request to /api/v1/user/profile with the Bearer token
      const response = await fetch("/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if we got a success response
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      // Expected response: { status, message, body: { ...userData } }
      const data = await response.json();
      // We'll assume `data.body` contains the profile info (e.g. id, email, etc.)
      return data.body;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  },
);

// 2) Update the user profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ firstName, lastName }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      // PUT request to /api/v1/user/profile with the Bearer token
      const response = await fetch("/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      // Expected response: { status, message, body: { ...updatedFields } }
      const data = await response.json();
      return data.body;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  },
);

// 3) Initial State
const initialState = {
  data: null, // will store user profile object
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// 4) Create the slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH PROFILE
    builder.addCase(fetchProfile.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      // The returned data is what we returned in the thunk: data.body
      state.data = action.payload;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.status = "failed";
      // Attempt to use server-provided error message or fallback
      state.error = action.payload?.message || "Could not fetch profile";
    });

    // UPDATE PROFILE
    builder.addCase(updateProfile.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      // Merge the updated fields into our existing profile data
      state.data = { ...state.data, ...action.payload };
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload?.message || "Could not update profile";
    });
  },
});

// 5) Export the reducer
export default profileSlice.reducer;
