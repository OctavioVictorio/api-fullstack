import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom"; 

const RegisterForm = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const initialValues = {
        nombre: "",
        email: "",
        password: "",
        edad: null,
    };

    const validationSchema = Yup.object({
        nombre: Yup.string().required("Campo requerido"),
        email: Yup.string().email("Email invalido").required("Campo requerido"),
        password: Yup.string()
        .min(6, "Minimo 6 caracteres")
        .required("Campo requerido"),
        edad: Yup.number()
        .typeError("La edad debe ser un numero")
        .min(1, "La edad debe ser mayor a 0")
        .required("Campo requerido"),
    });

    const onSubmit = async (values) => {
        await register(values);
    };

    return (
        <div className="flex justify-content-center p-4">
        <Card title="Registrarse" className="w-full md:w-25rem">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
            {({ handleChange, values, setFieldValue }) => (
                <Form className="p-fluid flex flex-column gap-3">
                <div className="field">
                    <label htmlFor="nombre">Nombre</label>
                    <InputText
                    name="nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    />
                    <ErrorMessage
                    name="nombre"
                    component="div"
                    className="p-error text-sm"
                    />
                </div>

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

                <div className="field">
                    <label htmlFor="edad">Edad</label>
                    <InputNumber
                    name="edad"
                    value={values.edad}
                    onValueChange={(e) => setFieldValue("edad", e.value)}
                    min={1}
                    max={90}
                    />
                    <ErrorMessage
                    name="edad"
                    component="div"
                    className="p-error text-sm"
                    />
                </div>

                <Button label="Registrarse" type="submit" />
                <Button
                    label="¿Ya tienes una cuenta? Inicia sesión"
                    link
                    className="mt-2"
                    onClick={() => navigate("/inicio-sesion")}
                />
                </Form>
            )}
            </Formik>
        </Card>
        </div>
    );
};

export default RegisterForm;