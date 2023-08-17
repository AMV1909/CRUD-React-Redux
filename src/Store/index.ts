import { configureStore, Middleware } from "@reduxjs/toolkit";
import usersReducer from "./Users/slice";

const persistanceLocalStorageMiddleware: Middleware =
    (store) => (next) => (action) => {
        next(action);

        if (store.getState().users.length === 0) {
            localStorage.removeItem("__redux__state__");
            return;
        }

        localStorage.setItem(
            "__redux__state__",
            JSON.stringify(store.getState())
        );
    };

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    middleware: [persistanceLocalStorageMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
