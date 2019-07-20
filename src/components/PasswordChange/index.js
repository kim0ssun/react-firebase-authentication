import React, { useState } from 'react';

import { withFirebase } from '../Firebase';

const PasswordChangeForm = (props) => {

    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = (event) => {
        props.firebase.doPasswordUpdate(passwordOne).then(() => {
            setPasswordOne('');
            setPasswordTwo('');
        })
        .catch(error => setError(error));
        event.preventDefault();
    };

    const onChange = (event) => {
        switch(event.target.name) {
            case 'passwordOne':
                setPasswordOne(event.target.value);
                break;
            case 'passwordTwo':
                setPasswordTwo(event.target.value);
                break;
            default:
                return;
        }
    };

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
        <form onSubmit={onSubmit} >
            <input 
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="password"
                placeholder="New Password"
            />
            <input 
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Confirm New  Password"
            />
            <button  disabled={isInvalid} type="submit" >
                Reset My Password
            </button>
            {error && <p>{error.message}</p>}
        </form>
    );
};

export default withFirebase(PasswordChangeForm);