import { ErrorMessage, Field, Form as FormikForm, Formik, useFormik } from "formik";
import { useState } from "react";
import Form from 'react-bootstrap/Form';

export default function Login()
{    
    // const formik = useFormik({
    //     initialValues: {
    //         login: '',
    //         password: ''
    //     },
    //     onSubmit: submit,
    //     validate: values => {
    //         const errors = { };

    //         if (!values.login || !values.login.trim()) {
    //             errors.login = 'login required!';
    //         }

    //         if (!values.password || !values.password.trim()) {
    //             errors.password = 'password required!';
    //         } else if (values.password.length < 5) {
    //             errors.password = 'min length is 5!';
    //         }

    //         return errors;
    //     }
    // });

    const [token, setToken] = useState(false);

    function submit(loginData) {
        var json = JSON.stringify(loginData);
        fetch('https://localhost:7286/api/auth/login', 
        { 
            method: 'Post', 
            body: json,
            headers: {
                'content-type': 'application/json'
            }
         })
            .then(respose => respose.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                setToken(data.token);
            });
    }

    if (token) {
        const userInfo = JSON.parse(atob(token.split('.')[1]));

        const username = userInfo["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        return <span>{username}</span>
    }

    return (
        <Formik 
            initialValues={{
                login: '',
                password: ''
            }}
            onSubmit={submit}
            validate={values => {
                const errors = { };
    
                if (!values.login || !values.login.trim()) {
                    errors.login = 'login required!';
                }
    
                if (!values.password || !values.password.trim()) {
                    errors.password = 'password required!';
                } else if (values.password.length < 5) {
                    errors.password = 'min length is 5!';
                }
    
                return errors;
            }}>
            <FormikForm as={Form}>
                <Form.Group>
                    <Form.Label htmlFor="login"> Login:</Form.Label>
                    <Field as={Form.Control} id="login" name="login" />
                    <ErrorMessage as={Form.Text} name="login" />
                </Form.Group>
                <div className="form-group">
                    <label htmlFor="pass">Password:</label>
                    <Field className="form-control" id="login" name="password" />                    
                    <ErrorMessage name="password" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">
                        Login
                    </button>
                </div>
            </FormikForm>
        </Formik>
    )
}