// Import React Defaults
import React from 'react';


// Import Helpers
import { useObjectState } from '../helpers/hooks';
import { bemify } from '../helpers/utils';


// Import Other Components
import Icon from  './Icon';


// Create Component
const Input = ({ value, placeholder, onChange, onBlur, onEnter, formatInput, label, type, icon, id, errors, animationClass, selectOnFocus }) => {

    const [state, setState] = useObjectState({
        type,
        showErrors: false
    });

    const isText = state.type === "text";
    const hasError = state.showErrors && errors && errors.length > 0;

    return (
        <div className="input">

            <div className={$.join("input__input", [hasError, "has-error"], animationClass || "animate-item")}>
                <div className="input__main">

                    {icon && (
                        <>
                            <Icon icon={icon} size="lg" />
                            <hr />
                        </>
                    )}

                    <div className="input__field">
                        <label htmlFor={id}>{label}</label>
                        <input
                            id={id}
                            type={state.type || "text"}
                            value={value}
                            placeholder={placeholder}
                            onChange={(onChange || formatInput) && ((e) => {
                                let val = e.target.value;
                                if (formatInput) val = formatInput(val);
                                if (type  === "number") {
                                    val = parseFloat(val) ?? "";
                                    if (val !== val) val = "";
                                }
                                onChange && onChange(val);
                            })}
                            onBlur={(e) => {
                                if (!state.showErrors) setState({ showErrors: true });
                                onBlur && onBlur(e);
                            }}
                            onFocus={selectOnFocus && ((e) => e.target.select())}
                            onKeyDown={onEnter && (e => e.key === "Enter" && onEnter())}
                            className="input__text-input"
                        />
                    </div>

                </div>

                {type === "password" && (
                    <div
                        className="input__toggle"
                        onClick={() => setState({ type: isText ? "password" : "text" })}
                    >
                        <Icon
                            icon={isText ? "eye-off" : "eye"}
                            size="lg"
                        />
                    </div>
                )}
            </div>

            {hasError && (
                <div className="input__errors">
                    {errors.map((err, i) => (
                        <div className="input__error animate-item" key={i}>
                            <Icon icon="error" size="sm" />
                            <p className="small bold">{err}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )

}

export default Input;