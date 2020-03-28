import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik'
import axios from 'axios'
import * as Yup from 'yup';

import styled from 'styled-components'
import UserList from './UserList'

const TitleHeader = styled.h1`
background:#1E90FF;
margin-bottom: -15px;
width 33vw;
margin 0 auto;
padding: 15px 0;
border-bottom: 2px groove black;
`

const FormWarp = styled.div`
    width: 33vw;
    display:flex;
    flex-direction:column;
    padding: 20px 20px;
    margin: 15px auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: stretch;
    align-items: stretch;
`;
const FieldCta = styled.div`
    display: flex;
    flex-direction:column;
    padding-bottom: 45px;
    padding-left: 155px;
    padding-right: 155px;
`
const ErrorPrompt = styled.p`
    color:red;
    margin-bottom:-20px;
    margin-top:-2px;
    font-weight: 600;
`

const TermsCta = styled.div`
display:flex;
justify-content:center;
align-items:center;
`

const BorderWrap = styled.div`
border: 2px groove 	black;
width: 33vw;
margin: 0 auto;
padding-bottom: 32px;
`


const UserForm = ({ values, errors, touched, status, resetForm }) => {


    const [users, setUsers] = useState([]);


    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);



    function validateEmail(value) {
        let error;
        if (!value) {
            error = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Invalid email address';
        }
        return error;
    }

    return (
        <div>
            <BorderWrap>
                <TitleHeader>Add User</TitleHeader>
                <Form>
                    <FormWarp>
                        <FieldCta>
                            <label htmlFor='username'>Username</label>
                            <Field type='text' name='username' placeholder='username' style={{ padding: `5px` }} />
                            {touched.username && errors.username && (<ErrorPrompt>{errors.username}</ErrorPrompt>)}
                        </FieldCta>

                        <FieldCta>
                            <label htmlFor='email'>Email</label>
                            <Field type='email' name='email' placeholder='email' validate={validateEmail} style={{ padding: `5px` }} />
                            {touched.email && errors.email && (<ErrorPrompt>{errors.email}</ErrorPrompt>)}
                        </FieldCta>

                        <FieldCta>
                            <label htmlFor='password'>Password </label>
                            <Field type='password' name='password' placeholder='password' style={{ padding: `5px` }} />
                            {touched.password && errors.password && (<ErrorPrompt>{errors.password}</ErrorPrompt>)}
                        </FieldCta>
                        <FieldCta>
                            <TermsCta>
                                <label htmlFor='tos'>Accept Terms of Service </label>
                                <Field type='checkbox' name='tos' checked={values.tos} style={{ marginTop: `6px`, marginLeft: `15px`, padding: `5px` }} />
                            </TermsCta>
                            {touched.tos && errors.tos && (<ErrorPrompt>{errors.tos}</ErrorPrompt>)}

                        </FieldCta>
                    </FormWarp>
                    <button type='submit'>Submit</button>
                </Form>
            </BorderWrap>
            <UserList users={users} />
        </div>
    )
};

const FormikUserForm = withFormik({
    mapPropsToValues({ username, email, password, role, tos }) {
        return {
            username: username || '',
            email: email || '',
            password: password || '',
            tos: tos || false,
            role: role || ''
        };
    },
    /*Yup validating user input and error prompt*/

    validationSchema: Yup.object().shape({
        username: Yup.string().min(2, 'Username is too short')
            .max(50, 'Username is too long')
            .required('Username is required here'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required here'),
        password: Yup.string()
            .min(6, 'Password is too short')
            .max(50, 'Password is too long')
            .required('Password is required here'),
        tos: Yup.bool().oneOf([true], 'Please Check Agree to Terms of Services')
    }),

    /* 
   Post request endpoint: https://reqres.in/api/users */

    handleSubmit(values, { setStatus, resetForm }) {
        axios.post('https://reqres.in/api/users', values)
            .then(res => {
                console.log(res);
                setStatus(res.data);

                resetForm();
            })

       
            .catch(err => console.log(err.response));
    }
})(UserForm);

export default FormikUserForm;