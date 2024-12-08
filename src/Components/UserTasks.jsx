
import React, { useState, useEffect } from 'react';
import AppWrapper from '../BasicComponent/AppWrapper';
import DialogComponent from '../BasicComponent/DialogComponent';
import { CircleCheck, Pencil, Plus, Trash } from 'lucide-react';
import noTask from '../Assets/no-data.svg';
import InputComponent from '../BasicComponent/InputComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTask, deleteUserTask, editUserTask, markTaskCompleted } from '../Redux/userSlice';
import ButtonComponent from '../BasicComponent/ButtonComponent';

const UserTasks = () => {
    let store = useSelector(d => d.user);
    let loggedUserTask = store?.signedUsers?.filter((d => d.name === store.loggedInUser));
    // console.log('logedUserTask[0]?.tasks', loggedUserTask[0]?.tasks)
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const [state, setState] = useState({
        updateTask: {
            open: false,
            data: {}
        },
        taskInput: {
            title: "",
            description: ""
        },

        deleteAlert: {
            key: false,
            id: ''
        }
    });

    useEffect(() => {
        setState((prev) => {
            return {
                ...prev,
                allTasks: loggedUserTask[0]?.tasks ?? [],
            }
        })
    }, [loggedUserTask[0]?.tasks])

    useEffect(() => {
        if (store?.loggedInUser === null) return navigate('/')
    }, [])

    //add new task dialog open
    const openNewTaskDialog = (key, data) => {
        setState((prev) => {
            return {
                ...prev,
                updateTask: {
                    open: key,
                    data: data ?? {}
                },
                taskInput: {
                    title: Object.keys(data)?.length ? data.title : '',
                    description: Object.keys(data)?.length ? data.description : '',
                },
            };
        });

    }

    //onchange input update new task
    const updateNewTask = (key, e) => {
        setState((prev) => {
            return {
                ...prev,
                taskInput: {
                    ...prev.taskInput,
                    [key]: e
                }
            };
        });
    }


    //update new task to list
    const addNewTask = (e) => {
        e.preventDefault();
        let { title, description } = state.taskInput;
        if (title.trim() === "" || description.trim() === "") return;
        const newTask = { id: Date.now(), title: title, description: description, completed: false };
        setState((prev) => {
            return {
                ...prev,
                taskInput: {
                    title: "",
                    description: ""
                },

            }
        })
        dispatch(addTask(newTask));
        openNewTaskDialog(false, {});
    }

    // check task completion
    const handleToggleComplete = (id) => {
        let loggedInUser = store.loggedInUser;
        dispatch(markTaskCompleted({ loggedInUser, id }))
    };

    // Delete selected task
    const handleDeleteTask = (id) => {
        if (!state.deleteAlert.key) {
            setState((prev) => {
                return {
                    ...prev,
                    deleteAlert: {
                        key: false,
                        id: ''
                    }
                }
            })
            return false;
        }
        let loggedInUser = store.loggedInUser;
        dispatch(deleteUserTask({ loggedInUser, id }));
        openDeleteAlertDialog(false, '')
    };

    //delete alert box open
    const openDeleteAlertDialog = (key, id) => {
        setState((prev) => {
            return {
                ...prev,
                deleteAlert: {
                    key: key,
                    id: id
                }
            }
        })
    }

    const editTask = (e, id) => {
        e.preventDefault();
        let { title, description } = state.taskInput;
        if (title.trim() === "" || description.trim() === "") return;
        const newTask = { id: id, title: title, description: description, completed: false };
        setState((prev) => {
            return {
                ...prev,
                taskInput: {
                    title: "",
                    description: ""
                },
            }
        })
        let loggedInUser = store.loggedInUser;
        dispatch(editUserTask({ loggedInUser, id, title, description }));
        openNewTaskDialog(false, {});
    }


    let { title, description } = state.taskInput;
    return (
        <>
            {
                store.loggedInUser &&
                <h1 className='text-xl font-bold text-[#6930CA]'>Welcome, {store.loggedInUser}</h1>
            }
            <AppWrapper>
                <div className='rounded-xl p-4 lg:p-6 shadow-lg border border-purple-500/20 mt-5'>

                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-xl '> All Tasks </h1>
                        <button onClick={() => openNewTaskDialog(true, {})} className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center transition-all duration-300 transform hover:scale-105 gap-1'> <Plus size={22} strokeWidth={3} /> <span className='hidden sm:flex'>New Task</span> </button>
                    </div>
                    {
                        state.allTasks?.length ?
                            state.allTasks?.map((task, i) => (
                                <div key={i} className={`task-item border rounded-lg p-4  transform transition-all duration-300 mb-3 last:mb-0 ${task.completed ? ' opacity-70' : ' hover:shadow-md '}`}>
                                    <div className='flex flex-col lg:flex-row md:flex-row justify-between items-center'>
                                        <div className=''>
                                            <h3 className={`font-bold  ${task.completed ? ' line-through ' : ' '}`}>
                                                {task?.title}
                                            </h3>
                                            <p className='text-sm text-gray-400'>{task?.description}</p>
                                        </div>
                                        <div className='flex mt-1 lg:m-0 md:m-0 items-center space-x-2'>
                                            <button onClick={() => task.completed ? null : handleToggleComplete(task.id)} className={`p-3   ${task.completed ? ' text-gray-500 bg-gray-500/20 hover:bg-gray-500/30 cursor-not-allowed' : ' text-green-500 bg-green-500/20 hover:bg-green-500/30 transition-colors duration-300'}  rounded-lg `}><CircleCheck size={20} strokeWidth={2} /></button>
                                            <button onClick={() => openNewTaskDialog(true, task)} className={`p-3  ${task.completed ? ' text-gray-500 bg-gray-500/20 hover:bg-gray-500/30 cursor-not-allowed' : 'bg-blue-500/20 text-blue-500  hover:bg-blue-500/30 transition-colors duration-300'} rounded-lg`}> <Pencil size={20} strokeWidth={2} /></button>
                                            <button onClick={() => openDeleteAlertDialog(true, task.id)} className='p-3 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors duration-300'><Trash size={20} strokeWidth={2} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className='flex items-center justify-center flex-col'>
                                <img src={noTask} alt="" className='w-[200px] ' />
                                <h6 className='text-lg font-semibold  mt-3'>No task found</h6>
                            </div>
                    }
                </div>
            </AppWrapper >
            <DialogComponent
                isOpen={state?.updateTask.open}
                onClose={() => openNewTaskDialog(false, {})}
                size="sm"
                header={`${Object.keys(state.updateTask.data).length ? 'Edit Task' : 'New Task'}`}
            >
                <div className='w-full'>
                    <InputComponent
                        label="Title"
                        placeholder="Please enter task title"
                        value={title}
                        onChange={(e) => updateNewTask('title', e)}
                        onSave={addNewTask}
                        autoFocus={true}
                    />

                    <InputComponent
                        label="Description"
                        placeholder="Please enter task description"
                        value={description}
                        onChange={(e) => updateNewTask('description', e)}
                        onSave={addNewTask}
                        autoFocus={true}
                    />

                    <div className="grid grid-cols-2 gap-3 w-[80%] mx-auto mt-5">
                        <button type="button" onClick={() => {
                            setState((prev) => {
                                return {
                                    ...prev,
                                    taskInput: {
                                        title: "",
                                        description: ""
                                    }
                                }
                            })
                            openNewTaskDialog(false, {});
                        }
                        }
                            className="text-[#FFFFFF] px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-300">
                            Cancel
                        </button>
                        <button onClick={(e) => Object.keys(state.updateTask.data).length ? editTask(e, state.updateTask.data.id) : addNewTask(e)} className=" text-[#FFFFFF] px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                            {`${Object.keys(state.updateTask.data).length ? 'update Task' : 'Add Task'}`}
                        </button>
                    </div>
                </div>
            </DialogComponent>

            <DialogComponent
                isOpen={state?.deleteAlert?.key}
                onClose={() => openDeleteAlertDialog(false, "")}
                size="sm"
                header="Remove"
            >
                <div className='w-full'>
                    <h5 className='text-sm'>
                        Are you sure you want to remove this task ?
                    </h5>
                    <div className="grid grid-cols-2 gap-3 w-[80%] mx-auto mt-5">
                        <ButtonComponent
                            onClick={() => openDeleteAlertDialog(false, "")}
                            type='outline'
                            text='No'
                        />
                        <ButtonComponent
                            onClick={() => handleDeleteTask(state.deleteAlert.id)}
                            text='Yes'
                            type='warning'
                        />
                    </div>
                </div>
            </DialogComponent>
        </>
    );
};

export default UserTasks;
