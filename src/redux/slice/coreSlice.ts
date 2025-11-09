import { THEME_DATA } from "@/data/coreData/coreData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { THEME_DATA } from "../../coreData/coreData";
// import { UserProfile } from "../../../auth/authStates/authRedux/authapi.type";
// import { authProfileApi } from "../../../auth/authStates/authRedux/authProfileApi";

// ----- State -----
interface CoreAppState {
  theme_mode: string | null;
  user: null;
  userStatus: "idle" | "loading" | "succeeded" | "failed";
  userError?: string;
  expandedCourierForm: boolean;
  headerHeightPx?: number;
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
  user: null,
  userStatus: "idle",
  expandedCourierForm: false,
  headerHeightPx: undefined,
};

// ----- Slice -----
export const coreAppSlice = createSlice({
  name: "coreApp",
  initialState,
  reducers: {
    // manual overrides if needed
    setUser(state, action: PayloadAction<null>) {
      state.user = action.payload;
      state.userStatus = action.payload ? "succeeded" : "idle";
      state.userError = undefined;
    },
    setUserStatus(state, action: PayloadAction<CoreAppState["userStatus"]>) {
      state.userStatus = action.payload;
    },
    clearUser(state) {
      state.user = null;
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
  },

  // ----- Auto-wire RTK Query -> coreApp.user -----
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     authProfileApi.endpoints.getProfile.matchPending,
  //     (state) => {
  //       state.userStatus = "loading";
  //       state.userError = undefined;
  //     }
  //   );

  //   builder.addMatcher(
  //     authProfileApi.endpoints.getProfile.matchFulfilled,
  //     (state, { payload }) => {
  //       state.user = payload;
  //       state.userStatus = "succeeded";
  //       state.userError = undefined;
  //     }
  //   );

  //   builder.addMatcher(
  //     authProfileApi.endpoints.getProfile.matchRejected,
  //     (state, { error }) => {
  //       state.userStatus = "failed";
  //       state.userError = (error as any)?.message || "Failed to load profile";
  //     }
  //   );
  // },
});

// ----- Actions -----
export const {
  setUser,
  setUserStatus,
  clearUser,
  setThemeMode,
  toggleExpandedCourierForm,
  setExpandedCourierForm,
  changeActiveFormOfCouriers,
  changeThemeInCoreAppSlice,
  setHeaderHeightPx,
} = coreAppSlice.actions;

// ----- Selectors -----
export const selectCoreApp = (state: { coreApp: CoreAppState }) =>
  state.coreApp;
export const selectUser = (state: { coreApp: CoreAppState }) =>
  state.coreApp.user;
export const selectUserStatus = (state: { coreApp: CoreAppState }) =>
  state.coreApp.userStatus;
export const selectUserError = (state: { coreApp: CoreAppState }) =>
  state.coreApp.userError;
export const selectThemeMode = (state: { coreApp: CoreAppState }) =>
  state.coreApp.theme_mode;
export const selectExpandedCourierForm = (state: { coreApp: CoreAppState }) =>
  state.coreApp.expandedCourierForm;

// ----- Reducer -----
export default coreAppSlice.reducer;
