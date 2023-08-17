import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { object, string } from "yup";
import { useState } from "react";

import { useUserActions } from "../Hooks/useUserActions";
import { User } from "../Store/Users/slice";

export function CreateNewUser() {
    const { addUser } = useUserActions();
    const [result, setResult] = useState<"ok" | null>(null);

    const initialValues: User = {
        name: "",
        email: "",
        github: "",
    };

    const handleSubmit = (values: User, { resetForm }: FormikHelpers<User>) => {
        addUser(values);
        resetForm();

        setResult("ok");
        setTimeout(() => {
            setResult(null);
        }, 5000);
    };

    return (
        <Card className="mt-4">
            <Title>Create New User</Title>

            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={handleSubmit}
                validationSchema={object({
                    name: string().required(),
                    email: string().email().required(),
                    github: string().required(),
                })}
            >
                {({ errors, touched }) => (
                    <Form className="flex flex-col gap-4 mt-4">
                        <div>
                            <Field
                                as={TextInput}
                                name="name"
                                placeholder="Write your name"
                                className={`${
                                    errors.name &&
                                    touched.name &&
                                    "border-2 border-red-400"
                                }`}
                            />
                            <ErrorMessage
                                component="p"
                                name="name"
                                className="text-red-400 text-sm ml-4 select-none"
                            />
                        </div>

                        <div>
                            <Field
                                as={TextInput}
                                name="email"
                                placeholder="Write your email"
                                className={`${
                                    errors.email &&
                                    touched.email &&
                                    "border-2 border-red-400"
                                }`}
                            />
                            <ErrorMessage
                                component="p"
                                name="email"
                                className="text-red-400 text-sm ml-4 select-none"
                            />
                        </div>

                        <div>
                            <Field
                                as={TextInput}
                                name="github"
                                placeholder="Write your github username"
                                className={`${
                                    errors.github &&
                                    touched.github &&
                                    "border-2 border-red-400"
                                }`}
                            />
                            <ErrorMessage
                                component="p"
                                name="github"
                                className="text-red-400 text-sm ml-4 select-none"
                            />
                        </div>

                        <div>
                            <Button type="submit">Create User</Button>
                            {result === "ok" && (
                                <span>
                                    <Badge>Guardado correctamente</Badge>
                                </span>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </Card>
    );
}
