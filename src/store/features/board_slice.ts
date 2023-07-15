import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { boards }                     from "../../assets/data";
import { 
    Board, 
    NewTask, 
    UpdateTask, 
    Tasks,
    UpdateBoard
} from "../../models/board.model";

let initial_board_data: Board[] = [];
let local_board_data = localStorage.getItem("board_data");
if(local_board_data){
    initial_board_data = JSON.parse(local_board_data);
}
else{
    initial_board_data = boards;
    localStorage.setItem("board_data", JSON.stringify(initial_board_data));
}

const initialState = {
    board_data: initial_board_data,
    boards: initial_board_data.map(board_item => ({id: board_item.id, name: board_item.name})),
    board: initial_board_data[0],
    active_board: initial_board_data[0].id
};

export const BoardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setActiveBoard: (state, action: PayloadAction<{board_id: number}>) => {
            const { board_id } = action.payload;
            state.active_board = board_id;
            state.board = state.board_data.find(board_item => board_item.id === board_id) as Board;
            saveToLocalStorage(state.board_data);
            return state;
        },
        addTask: (state, action: PayloadAction<{new_task: NewTask, column_id: number}>) => {
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

            state.board_data = state.board_data.map(board => (
                board.id === state.active_board ? state.board : board
            ))
            saveToLocalStorage(state.board_data);

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
            saveToLocalStorage(state.board_data);

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
            saveToLocalStorage(state.board_data);

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
            saveToLocalStorage(state.board_data);

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
            saveToLocalStorage(state.board_data);

            return state;
        },
        addBoard: (state, action: PayloadAction<{board_name: string, columns_name: string[]}>) => {

            const { board_name, columns_name } = action.payload;

            let new_board_data = {
                id: generateRandomId(),
                name: board_name,
                columns: columns_name.map(column_item => ({
                    id: generateRandomId(),
                    name: column_item,
                    tasks: []
                }))
            };

            state.board_data.push(new_board_data);
            state.boards.push({
                id: new_board_data.id,
                name: new_board_data.name
            });

            /* Set the active board */
            state.active_board = new_board_data.id;
            state.board = state.board_data.find(board_item => board_item.id === new_board_data.id) as Board;
            saveToLocalStorage(state.board_data);

            return state;
        },
        deleteBoard: (state) => {
            
            state.boards = state.boards.filter(board_item => board_item.id !== state.active_board);
            state.board_data = state.board_data.filter(board_item => board_item.id !== state.active_board);
            
            let id = state.boards[0]?.id;

            if(id){
                state.active_board = id;
                state.board = state.board_data.find(board_item => board_item.id === id) as Board;
            }
            else{
                state.active_board = 0;
                state.board = {id: 0, name: "", columns: []}
            }
            saveToLocalStorage(state.board_data);
            return state;
        },
        editBoard: (state, action: PayloadAction<{ new_board: UpdateBoard }>) => {

            const { new_board } = action.payload;
            let random_id = generateRandomId();

            state.boards = state.boards.map(board => {
                if(board.id === new_board.id){
                    return {
                        ...board,
                        name: new_board.name
                    };
                }
                return board;
            });


            state.board = {
                id: state.board.id,
                name: new_board.name,
                columns: new_board.columns.map(column => {
                    let updated_task = state.board.columns.find(board_column => board_column.id === column.id);                        
                    return {
                        ...column,
                        id: column.id === 0 ? random_id : column.id,
                        tasks: updated_task ? updated_task.tasks : []
                    }
                })
            };


            state.board_data = state.board_data.map(board => {
                if(board.id === new_board.id){
                    return {
                        ...board,
                        name: new_board.name,
                        columns: new_board.columns.map(column => {
                            
                            let updated_task = board.columns.find(board_column => board_column.id === column.id);                        
                            
                            return {
                                ...column,
                                id: column.id === 0 ? random_id : column.id,
                                tasks: updated_task ? updated_task.tasks : []
                            }
         
                        })
                    };
                }
                return board;
            });
            saveToLocalStorage(state.board_data);

            return state;
        }
    }
});

const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
}

const saveToLocalStorage = (data: Board[]) => {
    localStorage.setItem("board_data", JSON.stringify(data));
}

export const { 
    setActiveBoard, 
    addTask, 
    deleteTask, 
    editTask,
    updateTaskStatus,
    updateSubTask,
    addBoard,
    deleteBoard,
    editBoard
} = BoardSlice.actions;

export default BoardSlice.reducer;