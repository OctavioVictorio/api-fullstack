import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const initialValuesUser = {
        email: "",
        password: "",
    };

    const validationSchemaUser = Yup.object({
        email: Yup.string().email("Email invalido").required("Campo requerido"),
        password: Yup.string().required("Campo requerido"),
    });

    const onSubmitLogin = async (values) => {
        await login(values);
    };

    return (
        <div className="flex justify-content-center p-4">
        <Card title="Iniciar sesión" className="w-full md:w-25rem">
            <Formik
            initialValues={initialValuesUser}
            validationSchema={validationSchemaUser}
            onSubmit={onSubmitLogin}
            >
            {({ handleChange, values }) => (
                <Form className="p-fluid flex flex-column gap-3">
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <InputText
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    />
                    <ErrorMessage
                    name="email"
                    component="div"
                    className="p-error text-sm"
                    />
                </div>

                <div className="field">
                    <label htmlFor="password">Contraseña</label>
                    <Password
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    toggleMask
                    />
                    <ErrorMessage
                    name="password"
                    component="div"
                    className="p-error text-sm"
                    />
                </div>

                <Button label="Iniciar sesión" type="submit" />
                <Button
                    label="¿No tienes una cuenta? Regístrate"
                    link
                    className="mt-2"
                    onClick={() => navigate("/registro")}
                />
                </Form>
            )}
            </Formik>
        </Card>
        </div>
    );
};

export default LoginForm;