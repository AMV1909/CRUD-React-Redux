import { UserId, deleteUserById } from "../Store/Users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
    const dispatch = useAppDispatch();

    const deleteUser = (id: UserId) => {
        dispatch(deleteUserById(id));
    };

    return { deleteUser };
};
