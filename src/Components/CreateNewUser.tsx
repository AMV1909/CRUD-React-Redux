import { Button, Card, TextInput, Title } from "@tremor/react";
import { FormEvent, useState } from "react";

import { useUserActions } from "../Hooks/useUserActions";
import { User } from "../Store/Users/slice";

export function CreateNewUser() {
    const { addUser } = useUserActions();
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        github: "",
    });

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user.name || !user.email || !user.github) {
            return;
        }

        addUser(user);
    };

    return (
        <Card style={{ marginTop: "16px" }}>
            <Title>Create New User</Title>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    marginTop: "16px",
                }}
            >
                <TextInput
                    onChange={onChange}
                    name="name"
                    placeholder="Write your name"
                    required
                />

                <TextInput
                    onChange={onChange}
                    name="email"
                    placeholder="Write your email"
                    required
                />

                <TextInput
                    onChange={onChange}
                    name="github"
                    placeholder="Write your github username"
                    required
                />

                <div>
                    <Button>Create User</Button>
                </div>
            </form>
        </Card>
    );
}
