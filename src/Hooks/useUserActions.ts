import { User, UserId, addNewUser, deleteUserById } from "../Store/Users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
    const dispatch = useAppDispatch();

    const addUser = ({ name, email, github }: User) => {
        dispatch(addNewUser({ name, email, github }));
    };

    const deleteUser = (id: UserId) => {
        dispatch(deleteUserById(id));
    };

    return { addUser, deleteUser };
};
