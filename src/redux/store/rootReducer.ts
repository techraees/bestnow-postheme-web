// store/rootReducer.ts

import { combineReducers } from "redux";
import { customerAuthApi } from "../api/auth/customerAuthApi";
import { authProfileApi } from "../api/auth/customerAuthProfileApi";
import { coreApi } from "../api/core/coreApi";
import { searchApi } from "../api/core/searchApi";
import { bannerApi } from "../api/core/bannerApi";
import { cartApi } from "../api/core/cartApi";

import coreReducer from "./../slice/coreSlice";

// Combine reducers including the ones from RTK Query
const rootReducer = combineReducers({
  [customerAuthApi.reducerPath]: customerAuthApi.reducer,
  [authProfileApi.reducerPath]: authProfileApi.reducer,
  [coreApi.reducerPath]: coreApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [bannerApi.reducerPath]: bannerApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  // Set Slice State Data
  coreAppSlice: coreReducer,
});

export default rootReducer;
