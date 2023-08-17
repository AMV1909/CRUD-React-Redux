import { ListOfUsers } from "./Components/ListOfUsers";
import "./App.css";
import { CreateNewUser } from "./Components/CreateNewUser";
import { Toaster } from "sonner";

export function App() {
    return (
        <>
            <ListOfUsers />
            <CreateNewUser />
            <Toaster richColors />
        </>
    );
}
