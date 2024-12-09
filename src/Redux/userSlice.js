import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    loggedInUser: localStorage.getItem('loggedInUser') || "",
    signedUsers:JSON.parse(localStorage.getItem('signedUsers')) || [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // user log in
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },

        // all signned users
        signedUsers: (state, action) => {
            state.signedUsers.push(action.payload);
            localStorage.setItem('signedUsers', JSON.stringify(state.signedUsers));
        },

        // store current loged in user
        updateLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload || ""
            localStorage.setItem('loggedInUser', state.loggedInUser);
        },

        // log out - loged in user
        logoutUser: (state, action) => {
            state.loggedInUser = action.payload || ""
            localStorage.setItem('loggedInUser', "");
        },

        //add new task
        addTask: (state, action) => {
            let data = state.signedUsers.filter(d => d.name === state.loggedInUser)
            data[0]?.tasks?.push(action.payload);
            localStorage.setItem('signedUsers', JSON.stringify(state.signedUsers));
        },

        //delete current task
        deleteUserTask: (state, action) => {
            const { loggedInUser, id } = action.payload;
            const user = state?.signedUsers?.find((user) => user.name === loggedInUser);
            if (user) {
                user.tasks = user.tasks.filter((task) => task.id !== id);
            }
            localStorage.setItem('signedUsers', JSON.stringify(state.signedUsers));
        },

        //mask as a completed
        markTaskCompleted: (state, action) => {
            const { loggedInUser, id } = action.payload;
            const user = state?.signedUsers?.find((user) => user.name === loggedInUser);
            if (user) {
                const task = user.tasks.find((task) => task.id === id);
                if (task) {
                    task.completed = !task.completed;
                }
            }
            localStorage.setItem('signedUsers', JSON.stringify(state.signedUsers));
        },

        //edit and update task
        editUserTask: (state, action) => {
            const { loggedInUser, id, title ,description} = action.payload;
            const user = state?.signedUsers?.find((user) => user.name === loggedInUser);
            if (user) {
                const task = user.tasks.find((task) => task.id === id);
                if (task) {
                    task.id = id
                    task.title = title;
                    task.description = description;
                    task.completed = task.completed
                }
            }
            localStorage.setItem('signedUsers', JSON.stringify(state.signedUsers));
        },
    },
});

export const { login, signedUsers, updateLoggedInUser, logoutUser, addTask, deleteUserTask, markTaskCompleted, editUserTask } = userSlice.actions;
export default userSlice.reducer;
