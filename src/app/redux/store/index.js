import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { APIS, WEBFLOWAPIS } from "services/apiServices";
import { MICROSITE_APIS } from "services/microsite/micrositeServices";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import configSlice from "./configSlice";
import authSlice from "./authSlice";
import globalSlice from "./globalSlice";

const rootReducer = combineReducers({
    [APIS.reducerPath]: APIS.reducer,
    [MICROSITE_APIS.reducerPath]: MICROSITE_APIS.reducer,
    auth: authSlice,
    global: globalSlice,
    config: configSlice,
});

const persistConfig = {
    key: "@wizr:persistRoot",
    blacklist: [
        "config",
        "apiSlice",
        "webflowApiSlice",
        "globalSlice",
        "micrositeSlice",
    ],
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const STORE = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(APIS.middleware)
            .concat(WEBFLOWAPIS.middleware)
            .concat(MICROSITE_APIS.middleware),
});

setupListeners(STORE.dispatch);
export const PERSISTOR = persistStore(STORE);
