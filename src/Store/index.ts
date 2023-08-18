import { configureStore, Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import axios from "axios";

import usersReducer, { rollbackUser, UserWithId } from "./Users/slice";

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

const syncWithDatabaseMiddleware: Middleware =
    (store) => (next) => (action) => {
        const { type, payload } = action;
        const prevState = store.getState();

        next(action);

        switch (type) {
            case "users/addNewUser": {
                const userToAdd = {
                    ...payload,
                    id: prevState.users.length + 1 + "",
                };

                axios
                    .post("https://jsonplaceholder.typicode.com/users", payload)
                    .then((res) => {
                        if (res.status === 201)
                            toast.success(`User added successfully`);
                    })
                    .catch((err) => {
                        store.dispatch(rollbackUser(userToAdd));

                        console.log(err);
                        toast.error(
                            `Failed to add user ${payload.name}. Please try again later.`
                        );
                    });

                break;
            }

            case "users/editUserById": {
                const userToEdit = prevState.users.find(
                    (user: UserWithId) => user.id === payload.id
                );

                axios
                    .put(
                        `https://jsonplaceholder.typicode.com/users/${payload.id}`,
                        payload
                    )
                    .then((res) => {
                        if (res.status === 200)
                            toast.success(
                                `User ${payload.id} edited successfully`
                            );
                    })
                    .catch((err) => {
                        if (userToEdit)
                            store.dispatch(rollbackUser(userToEdit));

                        console.log(err);
                        toast.error(
                            `Failed to edit user ${payload.id}. Please try again later.`
                        );
                    });

                break;
            }

            case "users/deleteUserById": {
                const userToDelete = prevState.users.find(
                    (user: UserWithId) => user.id === payload
                );

                axios
                    .delete(
                        `https://jsonplaceholder.typicode.com/users/${payload}`
                    )
                    .then((res) => {
                        if (res.status === 200)
                            toast.success(
                                `User ${payload} deleted successfully`
                            );
                    })
                    .catch((err) => {
                        if (userToDelete)
                            store.dispatch(rollbackUser(userToDelete));

                        console.log(err);
                        toast.error(
                            `Failed to delete user ${payload}. Please try again later.`
                        );
                    });

                break;
            }

            default:
                break;
        }
    };

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
