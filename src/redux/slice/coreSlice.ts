import { THEME_DATA } from "@/data/coreData/coreData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authProfileApi } from "@/redux/api/auth/customerAuthProfileApi";

// ----- User Profile Type -----
export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  phone?: string;
  [key: string]: any; // Allow additional properties from API
}

// ----- State -----
interface CoreAppState {
  theme_mode: string | null;
  userProfile: UserProfile | null;
  userStatus: "idle" | "loading" | "succeeded" | "failed";
  userError?: string;
  expandedCourierForm: boolean;
  headerHeightPx?: number;
  isMenuOpen: boolean;
}

// safer initial theme (won't blow up in SSR/HMR)
function getInitialTheme(): string {
  try {
    if (typeof localStorage !== "undefined") {
      return localStorage[THEME_DATA.KEY] ?? "light";
    }
  } catch {}
  return "light";
}

const initialState: CoreAppState = {
  theme_mode: getInitialTheme(),
  userProfile: null,
  userStatus: "idle",
  expandedCourierForm: false,
  headerHeightPx: undefined,
  isMenuOpen: false,
};

// ----- Slice -----
export const coreAppSlice = createSlice({
  name: "coreApp",
  initialState,
  reducers: {
    // manual overrides if needed
    setUserProfile(state, action: PayloadAction<UserProfile | null>) {
      state.userProfile = action.payload;
      state.userStatus = action.payload ? "succeeded" : "idle";
      state.userError = undefined;
    },
    setUserStatus(state, action: PayloadAction<CoreAppState["userStatus"]>) {
      state.userStatus = action.payload;
    },
    clearUser(state) {
      state.userProfile = null;
      state.userStatus = "idle";
      state.userError = undefined;
    },

    // theme/UI helpers
    setThemeMode(state, action: PayloadAction<string>) {
      state.theme_mode = action.payload;
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(THEME_DATA.KEY, action.payload);
        }
      } catch {}
    },

    // Change Theme
    changeThemeInCoreAppSlice: (state, action: PayloadAction<string>) => {
      state.theme_mode = action.payload;
    },

    toggleExpandedCourierForm(state) {
      state.expandedCourierForm = !state.expandedCourierForm;
    },
    setExpandedCourierForm(state, action: PayloadAction<boolean>) {
      state.expandedCourierForm = action.payload;
    },

    // Change the Active Form for Couriers
    changeActiveFormOfCouriers: (state) => {
      state.expandedCourierForm = !state.expandedCourierForm;
    },

    setHeaderHeightPx(state, action: PayloadAction<number | undefined>) {
      state.headerHeightPx = action.payload;
    },
    setIsMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMenuOpen = action.payload;
    },
  },

  // ----- Auto-wire RTK Query -> coreApp.userProfile -----
  extraReducers: (builder) => {
    builder.addMatcher(
      authProfileApi.endpoints.verifyToken.matchPending,
      (state) => {
        state.userStatus = "loading";
        state.userError = undefined;
      }
    );

    builder.addMatcher(
      authProfileApi.endpoints.verifyToken.matchFulfilled,
      (state, { payload }: any) => {
        state.userProfile = payload?.data || payload || null;
        state.userStatus = "succeeded";
        state.userError = undefined;
      }
    );

    builder.addMatcher(
      authProfileApi.endpoints.verifyToken.matchRejected,
      (state, { error }) => {
        state.userStatus = "failed";
        state.userError = (error as any)?.message || "Failed to load profile";
        state.userProfile = null;
      }
    );
  },
});

// ----- Actions -----
export const {
  setUserProfile,
  setUserStatus,
  clearUser,
  setThemeMode,
  toggleExpandedCourierForm,
  setExpandedCourierForm,
  changeActiveFormOfCouriers,
  changeThemeInCoreAppSlice,
  setHeaderHeightPx,
  setIsMenuOpen,
} = coreAppSlice.actions;

// ----- Selectors -----
export const selectCoreApp = (state: { coreApp: CoreAppState }) =>
  state.coreApp;
export const selectUserProfile = (state: { coreApp: CoreAppState }) =>
  state.coreApp.userProfile;
export const selectUserStatus = (state: { coreApp: CoreAppState }) =>
  state.coreApp.userStatus;
export const selectUserError = (state: { coreApp: CoreAppState }) =>
  state.coreApp.userError;
export const selectThemeMode = (state: { coreApp: CoreAppState }) =>
  state.coreApp.theme_mode;
export const selectExpandedCourierForm = (state: { coreApp: CoreAppState }) =>
  state.coreApp.expandedCourierForm;
export const selectIsMenuOpen = (state: { coreApp: CoreAppState }) =>
  state.coreApp.isMenuOpen;
// ----- Reducer -----
export default coreAppSlice.reducer;
