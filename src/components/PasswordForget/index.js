import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => {
    return ( 
        <div>
            <h1>Password Forget</h1>
            <PasswordForgetForm />
        </div>
     );
}

const PasswordForgetFormBase = (props) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const isInvalid = email === '';

    const onSubmit = (event) => {
        props.firebase
            .doPasswordReset(email)
            .then(() => {
                setEmail('');
                setError(null);
            })
            .catch(error => setError(error));
        event.preventDefault();
    };

    const onChange = (event) => setEmail(event.target.value);

    return (
        <form onSubmit={onSubmit} >
            <input 
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
            />
            <button disabled={isInvalid} type="submit" >
                Reset My Password
            </button>

            {error && <p>{error.message}</p>}
        </form>
    )
};

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password</Link>
    </p>
);
 
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink }