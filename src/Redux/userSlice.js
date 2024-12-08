import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    loggedInUser: localStorage.getItem('loggedInUser') || null,
    signedUsers:JSON.parse(localStorage.getItem('signedUsers')) || [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },

        signedUsers: (state, action) => {
            state.signedUsers.push(action.payload);
            localStorage.setItem('signedUsers', JSON.stringify(state.signedUsers));
        },

        updateLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload || null
            localStorage.setItem('loggedInUser', state.loggedInUser);
        },

        logoutUser: (state, action) => {
            state.loggedInUser = action.payload || null
            localStorage.setItem('loggedInUser', null);
        },

        addTask: (state, action) => {
            let data = state.signedUsers.filter(d => d.name === state.loggedInUser)
            data[0]?.tasks?.push(action.payload);
            localStorage.setItem('signedUsers', JSON.stringify(state.signedUsers));
        },

        deleteUserTask: (state, action) => {
            const { loggedInUser, id } = action.payload;
            const user = state?.signedUsers?.find((user) => user.name === loggedInUser);
            if (user) {
                user.tasks = user.tasks.filter((task) => task.id !== id);
            }
            localStorage.setItem('signedUsers', JSON.stringify(state.signedUsers));
        },

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

        editUserTask: (state, action) => {
            // const { id, title, completed } = action.payload;
            // const taskIndex = state.tasks.findIndex(task => task.id === id);
            // if (taskIndex !== -1) {
            //     state.tasks[taskIndex] = { ...state.tasks[taskIndex], title, completed };
            //     localStorage.setItem('tasks', JSON.stringify(state.tasks));

            // const { loggedInUser, id } = action.payload;

            // // Find the user by name
            // const user = state.find((user) => user.name === loggedInUser);
            // if (user) {
            //   // Find the task by id and update its title
            //     const task = user.tasks.find((task) => task.id === taskId);
            //     if (task) {
            //         task.title = newTitle;
            //     }
            // }
            // // }

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
