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

    // Create Local State
    const [email, setEmail] = useState(user.email);
    const [emailErrs, setEmailErrs] = useState([]);

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordErrs, setPasswordErrs] = useState([]);

    const errors = {
        email: [...emailErrs, ...validator.checkEmail(email)],
        password: validator.checkPassword(password),
        newPassword: [...passwordErrs, ...validator.checkPassword(newPassword)],
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
                        if (error) return setEmailErrs(["This email address is already registered to another account."]);
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
                value="• • • • • • • •"
                title="Change Your Passwrod"
                submit={{
                    text: "Set New Password",
                    disabled: errors.password.length || errors.newPassword.length,
                    data: { password, newPassword },
                    method: "post",
                    endpoint: "/auth/update-password",
                    callback({ error, data, close }) {
                        if (error) return setPasswordErrs(["THe current password you entered is incorrect."]);
                        close && close();
                    }
                }}
            >
                <Input
                    id="current-password"
                    type="password"
                    label={cPwd.label}
                    placeholder={cPwd.placeholder}
                    value={password}
                    errors={errors.password}
                    onChange={(val) => setPassword(val)}
                />
                <Input
                    id="new-password"
                    type="password"
                    label={nPwd.label}
                    placeholder={nPwd.placeholder}
                    value={newPassword}
                    errors={errors.newPassword}
                    onChange={(val) => {
                        setNewPassword(val);
                        if (passwordErrs.length) setPasswordErrs([]);
                    }}
                />
            </AccountField>
        </div>
    )

};


export default EditProfile;