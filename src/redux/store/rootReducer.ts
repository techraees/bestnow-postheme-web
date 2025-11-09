// store/rootReducer.ts

import { combineReducers } from "redux";
// import { customerAuthApi } from "../authState/customerAuthRedux/customerAuthApi";

import coreReducer from "./../slice/coreSlice";

// Combine reducers including the ones from RTK Query
const rootReducer = combineReducers({
  // [customerAuthApi.reducerPath]: customerAuthApi.reducer,

  // Set Slice State Data
  coreAppSlice: coreReducer,
});

export default rootReducer;
