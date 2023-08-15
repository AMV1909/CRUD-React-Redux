import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UsersState extends User {
    id: UserId;
}

const initialState: UsersState[] = [
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

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id);
        },
    },
});

export default usersSlice.reducer;

export const { deleteUserById } = usersSlice.actions;