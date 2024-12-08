import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../BasicComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import InputComponent from '../BasicComponent/InputComponent';
import { updateLoggedInUser } from '../Redux/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const store = useSelector(d => d.user);
    let dispatch = useDispatch()

    console.log(store)
    const [state, setState] = useState({
        inputData: {
            name: '',
            password: '',
        },
        InputError: {
            error: ''
        },
        mainError: ''
    })
    const UpdateData = (key, data) => {
        console.log(key, data)
        setState((prev) => {
            return {
                ...prev,
                inputData: {
                    ...prev.inputData,
                    [key]: data
                }
            }
        })
    }
    const handleSubmit = () => {
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
    let { error } = state.InputError;
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
                error={error}
                onSave={handleSubmit}
                autoFocus={true}
            />

            <InputComponent
                type="password"
                label="Password"
                placeholder="Please enter your password"
                value={password}
                onChange={(data) => UpdateData('password', data)}
                error={error}
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
