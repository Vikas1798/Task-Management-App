import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../BasicComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import InputComponent from '../BasicComponent/InputComponent';
import { updateLoggedInUser } from '../Redux/userSlice';
import { ValidateName } from '../Service/helper';

const Login = () => {
    const navigate = useNavigate();
    const store = useSelector(d => d.user);
    let dispatch = useDispatch()

    const [state, setState] = useState({
        inputData: {
            name: '',
            password: '',
        },
        inputError: {},
        mainError: ''
    })

    //onchange update log in credential
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

    //Log in
    const handleSubmit = () => {
        let { name, password } = state.inputData;
        if (!name) {
            setState((prev) => {
                return {
                    ...prev,
                    inputError: {
                        name: "Name can not be empty.",
                    },
                };
            });
            return false;
        }
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

        let isUserAvailable = store.signedUsers.filter(d => d.name === state.inputData.name)
        if (isUserAvailable.length && isUserAvailable[0].name === state.inputData.name && isUserAvailable[0].password === state.inputData.password) {
            dispatch(updateLoggedInUser(state.inputData.name))
            navigate('/tasks');
            setState((prev) => {
                return {
                    ...prev,
                    inputData: {
                        name: '',
                        password: '',
                    },
                    InputError: {
                        error: ''
                    },
                    mainError: ''
                }
            })
        } else {
            setState((prev) => {
                return {
                    ...prev,
                    mainError: 'Invalid credentials.'
                }
            })
        }
    };

    let { name, password } = state.inputData;
    let { mainError } = state;
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg border">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Log in</h2>
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
            <ButtonComponent text="Log In" onClick={handleSubmit} />
            <p className="mt-4 text-sm">
                Don't have an account?
                <button
                    onClick={() => navigate('/signup')}
                    className="text-red-500 underline ms-2"
                >
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default Login;
