import { ListOfUsers } from "./Components/ListOfUsers";
import "./App.css";
import { CreateNewUser } from "./Components/CreateNewUser";

export function App() {
    return (
        <>
            <ListOfUsers />
            <CreateNewUser />
        </>
    );
}
