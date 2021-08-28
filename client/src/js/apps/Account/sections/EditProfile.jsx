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
            inputs: {
                fullName: fn,
                preferredName: pn
            }
        }
    } = useContext(AppContext);

    // Create Local State
    const [name, setName] = useState(user.name);
    const [preferredName, setPreferredName] = useState(user.preferredName);
    const [nameErrs, setNameErrs] = useState([]);
    const [prefErrs, setPrefErrs] = useState([]);

    // Valide Fields
    const errors = {
        name: [...nameErrs, ...validator.checkName(name)],
        preferredName: [...prefErrs, ...validator.checkName(preferredName)]
    }

    return (
        <div className="account__fields animate-children">
            <h5>Edit Your Profile</h5>
            <AccountField
                label={fn.label}
                value={user.name}
                title="Update Full Name"
                submit={{
                    text: "Update Full Name",
                    disabled: user.name === name || errors.name.length > 0,
                    data: { name },
                    callback({ data, close, error }) {
                        if (error || data.status === "ERROR") return setNameErrs(['Something went wrong...']);
                        update("name")(data.user.name)
                        close && close();
                    }
                }}
            >
                <Input
                    id="user-full-name"
                    type="name"
                    icon="person-circle"
                    label={fn.label}
                    placeholder={fn.placeholder}
                    value={name}
                    onChange={setName}
                    errors={errors.name}
                />
            </AccountField>

            <AccountField
                label="Preferred Name"
                value={user.preferredName}
                title="Update Preferred Name"
                submit={{
                    text: "Update Preferred Name",
                    disabled: user.preferredName === preferredName || errors.preferredName.length > 0,
                    data: { preferredName },
                    callback: ({ data, close, error }) => {
                        if (error || data.status === "ERROR") return setPrefErrs(['Something went wrong...']);
                        update("preferred_name")(data.user.preferredName)
                        close && close();
                    }
                }}
            >
                <Input
                    id="user-preferred-name"
                    type="name"
                    icon="person-circle"
                    label={pn.label}
                    placeholder={pn.placeholder}
                    value={preferredName}
                    onChange={setPreferredName}
                    errors={errors.preferredName}
                />
            </AccountField>
        </div>
    );
}


export default EditProfile;