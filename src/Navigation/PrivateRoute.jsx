// import { Navigate, useNavigate } from 'react-router-dom';

// const PrivateSegment = ({ isSignedIn, component }) => {
//     let navigate = useNavigate();
//     if (isSignedIn) {
//         return (<Navigate to="/tasks" />)
//     }
//     return component;
// };

// export default PrivateSegment;

import { Navigate, useNavigate } from 'react-router-dom';

const PrivateSegment = ({ isSignedIn, component }) => {
    const navigate = useNavigate();

    // If the user is signed in, redirect to /tasks
    if (isSignedIn) {
        return <Navigate to="/tasks" />;
    }

    // Otherwise, return the passed component
    return component;
};

export default PrivateSegment;
