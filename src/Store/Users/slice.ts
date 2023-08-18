import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
    {
        id: "1",
        name: "John Doe",
        email: "jd@gmail.com",
        github: "johndoe",
    },
    {
        id: "2",
        name: "Jane Doe",
        email: "jd2@gmail.com",
        github: "janedoe",
    },
    {
        id: "3",
        name: "John Smith",
        email: "js@gmail.com",
        github: "johnsmith",
    },
    {
        id: "4",
        name: "Jane Smith",
        email: "js2@gmail.com",
        github: "janesmith",
    },
];

export type UserId = string;

export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UserWithId extends User {
    id: UserId;
}

const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem("__redux__state__");

    return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            return [...state, { ...action.payload, id: state.length + 1 + "" }];
        },

        editUserById: (state, action: PayloadAction<UserWithId>) => {
            const { id } = action.payload;

            return state.map((user) => {
                if (user.id === id) return action.payload;
                return user;
            });
        },

        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id);
        },

        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            if (!state.some((user) => user.id === action.payload.id))
                return [...state, action.payload];
        },
    },
});

export default usersSlice.reducer;

export const { addNewUser, editUserById, deleteUserById, rollbackUser } =
    usersSlice.actions;
