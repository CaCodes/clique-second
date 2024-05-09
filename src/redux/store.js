import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice"
import toastReducer from "./slices/toastSlice"
// import storage from 'reduxjs-toolkit-persist/lib/storage'
import sessionStorage from "reduxjs-toolkit-persist/lib/storage/session";
// import thunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  // storage,
  storage: sessionStorage,
  stateReconciler: autoMergeLevel2,
};

const reducers = combineReducers({
  auth: authReducer,
  toast: toastReducer
})

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);