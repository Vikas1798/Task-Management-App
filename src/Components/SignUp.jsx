import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signedUsers } from '../Redux/userSlice'
import InputComponent from '../BasicComponent/InputComponent';
import ButtonComponent from '../BasicComponent/ButtonComponent';
import { ValidateName } from '../Service/helper';

const SignUp = () => {
    const navigate = useNavigate();
    const store = useSelector(d => d.user);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        inputData: {
            name: '',
            password: '',
        },
        inputError: {},
        mainError: ''
    })



    //onchange update sign in credential
    const UpdateData = (key, data) => {
        setState((prev) => {
            return {
                ...prev,
                inputData: {
                    ...prev.inputData,
                    [key]: data
                }
            }
        })

        if (key === 'name') {
            if (!data) {
                setState((prev) => {
                    return {
                        ...prev,
                        inputError: {
                            name: "Please enter your name.",
                        },
                    };
                });
                return false;
            }

            if (data.length < 2 || data.length > 10) {
                setState((prev) => {
                    return {
                        ...prev,
                        inputError: {
                            name: "Required  2 to 10 characters.",
                        },
                    };
                });
                return false;
            }

            let nameValidation = ValidateName(data);
            if (!nameValidation) {
                setState((prev) => {
                    return {
                        ...prev,
                        inputError: {
                            name: "Please enter your valid name.",
                        },
                    };
                });
                return false;
            }
            setState((prev) => {
                return {
                    ...prev,
                    inputError: { name: null },
                };
            });
        }

        if (key === "password") {
            if (!data) {
                setState((prev) => {
                    return {
                        ...prev,
                        inputError: {
                            password: 'Please enter your password'
                        }
                    };
                });
                return false;
            }
            if (data.length < 2 || data.length > 10) {
                setState((prev) => {
                    return {
                        ...prev,
                        inputError: {
                            password: "Required  2 to 10 characters.",
                        },
                    };
                });
                return false;
            }
            setState((prev) => {
                return {
                    ...prev,
                    inputError: {
                        password: null
                    }
                };
            });
        }
    }

    //Sign Up
    const handleSubmit = () => {
        if (name.length < 2 || name.length > 10) {
            setState((prev) => {
                return {
                    ...prev,
                    inputError: {
                        name: "Required  2 to 10 characters.",
                    },
                };
            });
            return false;
        }
        let nameValidation = ValidateName(name);
        if (!nameValidation) {
            setState((prev) => {
                return {
                    ...prev,
                    inputError: {
                        name: "Please enter your valid name",
                    },
                };
            });
            return false;
        }

        if (!password) {
            setState((prev) => {
                return {
                    ...prev,
                    inputError: {
                        password: "Password can not be empty.",
                    },
                };
            });
            return false;
        }

        if (password.length < 2 || password.length > 10) {
            setState((prev) => {
                return {
                    ...prev,
                    inputError: {
                        password: "Required  2 to 10 characters.",
                    },
                };
            });
            return false;
        }

        let d = store.signedUsers.filter(d => d.name);
        if (d.length && d[0]?.username === state.inputData.name) {
            setError('Username already exists');
        } else {
            dispatch(signedUsers({ name: state.inputData.name, password: state.inputData.password, tasks: [] }))
            setState((prev) => {
                return {
                    ...prev,
                    inputData: {
                        name: '',
                        password: '',
                    },
                    inputError: {
                        error: ''
                    },
                    mainError: ''
                }
            })
            navigate('/login');
        }
    };

    let { name, password } = state.inputData;
    let { mainError } = state;
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg border">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Sign Up</h2>
            {mainError && <p className="text-red-500 text-sm mb-4">{mainError}</p>}
            <InputComponent
                label="User Name"
                placeholder="Please enter your name"
                value={name}
                onChange={(data) => UpdateData('name', data)}
                error={state.inputError.name}
                onSave={handleSubmit}
                autoFocus={true}
            />

            <InputComponent
                type="password"
                label="Password"
                placeholder="Please enter your password"
                value={password}
                onChange={(data) => UpdateData('password', data)}
                error={state.inputError.password}
                onSave={handleSubmit}
            />

            <ButtonComponent text="Sign Up" onClick={handleSubmit} />

            <p className="mt-4 text-sm">
                You already have an account?
                <button
                    onClick={() => navigate('/login')}
                    className="text-red-500 underline ms-2"
                >
                    Log In
                </button>
            </p>
        </div>
    );
};

export default SignUp;
