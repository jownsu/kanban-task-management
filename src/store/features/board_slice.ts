import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { boards }                     from "../../assets/data";
import { Board, NewTask, UpdateTask, Tasks } from "../../models/board.model";

let board_data = [...boards];

const initialState = {
    boards: board_data.map(board_item => ({id: board_item.id, name: board_item.name})),
    board: board_data[0],
    active_board: board_data[0].id
};

export const BoardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setActiveBoard: (state, action: PayloadAction<{board_id: number}>) => {
            const { board_id } = action.payload
            state.active_board = board_id;
            state.board = board_data.find(board_item => board_item.id === board_id) as Board;
            return state;
        },
        addTask: (state, action: PayloadAction<{column_id: number, new_task: NewTask}>) => {
            const { column_id, new_task } = action.payload;

            let new_task_data = {
                id: generateRandomId(),
                title: new_task.title,
                description: new_task.description,
                status: new_task.status,
                subtasks: new_task.subtasks.map(subtask => ({
                    id: generateRandomId(),
                    title: subtask.toString(),
                    isCompleted: false
                }))
            }

            /* State Changes */
            state.board.columns.map(column => {
                if(column.id === column_id){
                    column.tasks.push(new_task_data);
                }
                return column;
            })

            /* Dummy Data Changes */
            board_data = board_data.map(board_item => {
                if(board_item.id === state.active_board){
                    return {
                        ...board_item,
                        columns: board_item.columns.map(column => {
                            if(column.id === column_id){
                                return {
                                    ...column,
                                    tasks: [...column.tasks, new_task_data]
                                }
                            }
                            return column;
                        })
                    }
                }
                return board_item;
            })
            return state;
        },
        editTask: (state, action: PayloadAction<{column_id: number, task_id: number, update_task: UpdateTask}>) => {
            const { column_id, task_id, update_task } = action.payload;
            
            let random_id = generateRandomId();
            let updated_task_data = {
                title: update_task.title,
                description: update_task.description,
                status: update_task.status.name,
                subtasks: update_task.subtasks.map(subtask => ({
                    id: subtask.id === 0 ? random_id : subtask.id,
                    title: subtask.title.toString(),
                    isCompleted: subtask.isCompleted === null ? false : subtask.isCompleted
                })),
            }

            /* State Changes */
            if(column_id === update_task.status.id){
                state.board.columns = state.board.columns.map(column => {
                    if(column.id === column_id){
                        return {
                            ...column,
                            tasks: column.tasks.map(task => {
                                if(task.id === task_id){
                                    return {id: task.id, ...updated_task_data};
                                }
                                return task;
                            })
                        };
                    }
                    return column;
                });
            }
            /* Moving of task to other columns */
            else{
                state.board.columns = state.board.columns.map(column => {
                    if(column.id === update_task.status.id){
                        return {
                            ...column,
                            tasks: [...column.tasks, {id: random_id, ...updated_task_data}]
                        };
                    }
                    else{
                        return {
                            ...column,
                            tasks: column.tasks.filter(task => task.id !== task_id)
                        }
                    }
                });
            }

            /* Dummy Data */
            if(column_id === update_task.status.id){
                board_data = board_data.map(board_item => {
                    if(board_item.id === state.active_board){
                        return {
                            ...board_item,
                            columns: board_item.columns.map(column => {
                                if(column.id === column_id){
                                    return {
                                        ...column,
                                        tasks: column.tasks.map(task => {
                                            /* UPDATING CODE */
                                            if(task.id === task_id){
                                                return {
                                                    ...task,
                                                    ...updated_task_data
                                                }
                                            }
                                            return task;
                                        })
                                    };
                                }
                                return column;
                            })
                        }
                    }
                    return board_item;
                })
            }
            else{
                board_data = board_data.map(board_item => {
                    if(board_item.id === state.active_board){
                        return {
                            ...board_item,
                            columns: board_item.columns.map(column => {
                                if(column.id === update_task.status.id){
                                    return {
                                        ...column,
                                        tasks: [...column.tasks, {id: random_id, ...updated_task_data}]
                                    };
                                }
                                else{
                                    return {
                                        ...column,
                                        tasks: column.tasks.filter(task => task.id !== task_id)
                                    }
                                }
                            })
                        }
                    }
                    return board_item;
                })
            }

            return state;
        },
        deleteTask: (state, action: PayloadAction<{column_id: number, task_id: number}>) => {
            const { column_id, task_id } = action.payload;

            state.board.columns = state.board.columns.map(column => {
                if(column.id === column_id){
                    return {
                        ...column,
                        tasks: column.tasks.filter(task => task.id !== task_id)
                    };
                }
                return column;
            });

            board_data = board_data.map(board_item => {
                if(board_item.id === state.active_board){
                    return {
                        ...board_item,
                        columns: board_item.columns.map(column => {
                            if(column.id === column_id){
                                return {
                                    ...column,
                                    tasks: column.tasks.filter(task => task.id !== task_id)
                                }
                            }
                            return column;
                        })
                    }
                }
                return board_item;
            })
            return state;
        },
        updateTaskStatus: (state, action: PayloadAction<{column_id: number, task_id: number, status_id: number}>) => {
            const { column_id, task_id, status_id } = action.payload;

            let selected_task: Tasks;


            state.board.columns = state.board.columns.map((column_item) => {
                if(column_item.id === column_id){
                    column_item.tasks.map(task_item => {
                        if(task_item.id === task_id){
                            selected_task = task_item;
                        }
                    });
                }

                return{
                    ...column_item,
                    tasks: column_item.tasks.filter(task_item => task_item.id !== task_id)
                }
            });

            state.board.columns = state.board.columns.map(column => {
                if(column.id === status_id){
                    return {
                        ...column,
                        tasks: [...column.tasks, selected_task]
                    }
                }
                return column;
            });


            let dummy_selected_task : Tasks;

            board_data = board_data.map(board_item => {
                if(board_item.id === state.active_board){
                    return {
                        ...board_item,
                        columns: board_item.columns.map(column_item => {
                            if(column_item.id === column_id){
                                column_item.tasks.map(task_item => {
                                    if(task_item.id === task_id){
                                        dummy_selected_task = task_item as Tasks;
                                    }
                                });
                            }
                            
                            return{
                                ...column_item,
                                tasks: column_item.tasks.filter(task_item => task_item.id !== task_id)
                            }
                        })
                    }
                
                }
                return board_item;
            });

            board_data = board_data.map(board_item => {
                if(board_item.id === state.active_board){
                    return {
                        ...board_item,
                        columns: board_item.columns.map(column_item => {
                            if(column_item.id === status_id){
                                return {
                                    ...column_item,
                                    tasks: [...column_item.tasks, dummy_selected_task]
                                }
                            }
                            return column_item;
                        })
                    }
                }
                return board_item;
            });
            return state;
        }
    }
});

const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
}

export const { 
    setActiveBoard, 
    addTask, 
    deleteTask, 
    editTask,
    updateTaskStatus
} = BoardSlice.actions;

export default BoardSlice.reducer;