import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { boards }                     from "../../assets/data";
import { Board, NewTask, UpdateTask, Tasks } from "../../models/board.model";

const initialState = {
    board_data: [...boards],
    boards: boards.map(board_item => ({id: board_item.id, name: board_item.name})),
    board: boards[0],
    active_board: boards[0].id
};

export const BoardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setActiveBoard: (state, action: PayloadAction<{board_id: number}>) => {
            const { board_id } = action.payload
            state.active_board = board_id;
            state.board = state.board_data.find(board_item => board_item.id === board_id) as Board;
            return state;
        },
        addTask: (state, action: PayloadAction<{new_task: NewTask}>) => {
            const { new_task } = action.payload;

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
                if(column.id === state.active_board){
                    column.tasks.push(new_task_data);
                }
                return column;
            })

            state.board_data = state.board_data.map(board => (
                board.id === state.active_board ? state.board : board
            ))

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

            state.board_data = state.board_data.map(board => (
                board.id === state.active_board ? state.board : board
            ))

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

            state.board_data = state.board_data.map(board => (
                board.id === state.active_board ? state.board : board
            ))

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

            state.board_data = state.board_data.map(board => (
                board.id === state.active_board ? state.board : board
            ))

            return state;
        },
        updateSubTask: (state, action: PayloadAction<{column_id: number, task_id: number, sub_task_id: number}>) => {

            const { column_id, task_id, sub_task_id } = action.payload;

            state.board.columns = state.board.columns.map((column_item) => {
                if(column_item.id === column_id){
                    return {
                        ...column_item,
                        tasks: column_item.tasks.map(task_item => {
                            if(task_item.id === task_id){
                                return {
                                    ...task_item,
                                    subtasks: task_item.subtasks.map(sub_task_item => {
                                        if(sub_task_item.id === sub_task_id){
                                            return {
                                                ...sub_task_item,
                                                isCompleted: !sub_task_item.isCompleted
                                            }
                                        }
                                        return sub_task_item;
                                    })
                                }
                            }
                            return task_item;
                        })
                    }
                }
                return column_item;
            });

            state.board_data = state.board_data.map(board => (
                board.id === state.active_board ? state.board : board
            ));

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
    updateTaskStatus,
    updateSubTask
} = BoardSlice.actions;

export default BoardSlice.reducer;