import React, { useContext, useState } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountField from '../components/AccountField';
import Input from '../../components/Input';


// Create Component
const EditProfile = () => {

    // Destructure State
    const {
        update,
        validator,
        state: user,
        appCopy: {
            inputs:  {
                email: eml,
                password: pwd,
                currentPassword: cPwd,
                newPassword: nPwd,
            },
            errors: errCopy
        }
    } = useContext(AppContext);

    console.log(errCopy);

    // Create Local State
    const [email, setEmail] = useState(user.email);
    const [emailErrs, setEmailErrs] = useState([]);

    const [password, setPassword] = useState("");
    const [passwordErrs, setPasswordErrs] = useState([]);

    const [code, setCode] = useState("");
    const [codeErrs, setCodeErrs] = useState([]);

    const errors = {
        email: [...emailErrs, ...validator.checkEmail(email)],
    }

    return (
        <div className="account__fields animate-children">
            <h5>Edit Your Account</h5>
            <AccountField
                label={eml.label}
                value={user.email}
                title="Update Email Address"
                submit={{
                    text: "Update Email Address",
                    disabled: user.email === email || errors.email.length > 0,
                    data: { email },
                    callback({ error, data, close }) {
                        if (error) return setEmailErrs(["FUCK YOU"]);
                        update("email")(data.user.email);
                        close && close();
                    }
                }}
            >
                <Input
                    id="user-email"
                    type="email"
                    icon="email"
                    label={eml.label}
                    placeholder={eml.placeholder}
                    value={email}
                    onChange={(val) => {
                        setEmail(val);
                        if (emailErrs.length) setEmailErrs([]);
                    }}
                    errors={errors.email}
                />
            </AccountField>

            <AccountField
                label={pwd.label}
                value={user.passwordSet ? "• • • • • • • •" : <span>No Password Set</span>}
                title="Change Your Passwrod"
            />
        </div>
    )

};


export default EditProfile;