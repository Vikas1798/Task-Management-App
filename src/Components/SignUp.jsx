import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signedUsers } from '../Redux/userSlice'
import InputComponent from '../BasicComponent/InputComponent';
import ButtonComponent from '../BasicComponent/ButtonComponent';

const SignUp = () => {
    const store = useSelector(d => d.user);
    const dispatch = useDispatch();
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

    const navigate = useNavigate();

    // const handleSubmit = (e) => {
    //     if (localStorage.getItem(username)) {
    //         setError('Username already exists');
    //     } else {
    //         const newUser = { username, password };
    //         localStorage.setItem(username, JSON.stringify(newUser));
    //         navigate('/login');
    //     }
    // };



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
                    InputError: {
                        error: ''
                    },
                    mainError: ''
                }
            })
            navigate('/login');
        }
    };

    let { name, password } = state.inputData;
    let { error } = state.InputError;
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
