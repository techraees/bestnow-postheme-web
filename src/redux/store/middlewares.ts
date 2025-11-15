// store/middlewares.ts
import { customerAuthApi } from "../api/auth/customerAuthApi";
import { authProfileApi } from "../api/auth/customerAuthProfileApi";
import { coreApi } from "../api/core/coreApi";
import { searchApi } from "../api/core/searchApi";
import { bannerApi } from "../api/core/bannerApi";

// Add the api middleware to the store
export const middlewares = [
  customerAuthApi.middleware,
  authProfileApi.middleware,
  coreApi.middleware,
  searchApi.middleware,
  bannerApi.middleware,
  // You can add other middlewares here if needed
];
