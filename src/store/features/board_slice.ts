import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { board } from "../../assets/data";
import { Board, NewTask } from "../../models/board.model";

const initialState = {
    board: board,
    active_board: board[0]
};

export const BoardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setActiveBoard: (state, action: PayloadAction<{board: Board}>) => {
            state.active_board = action.payload.board;
            return state;
        },
        addTask: (state, action: PayloadAction<{board_id: number, column_id: number, new_task: NewTask}>) => {
            const { board_id, column_id, new_task } = action.payload;

            state.board = state.board.map(board_item => {
                if(board_item.id === board_id){
                    board_item.columns.map(column => {
                        if(column.id === column_id){
                            column.tasks.push(
                                {
                                    id: generateRandomId(),
                                    title: new_task.title,
                                    description: new_task.description,
                                    status: new_task.status,
                                    subtasks: new_task.subtasks.map(item => ({
                                        id: generateRandomId(),
                                        title: item.toString(),
                                        isCompleted: false
                                    }))
                                }
                            );
                        }
                        return column;
                    })
                }
                return board_item;
            });

            state.active_board = state.board.find(board_item => board_item.id === board_id) ?? board[0];

            return state;
        },
        deleteTask: (state, action: PayloadAction<{board_id: number, column_id: number, task_id: number}>) => {
            const { board_id, column_id, task_id } = action.payload;
            state.board = state.board.map(board_item => {
                if(board_item.id === board_id){
                    return {
                        ...board_item,
                        columns: board_item.columns.map(column => {
                            if(column.id === column_id){
                                return {
                                    ...column,
                                    tasks: column.tasks.filter(task => task.id !== task_id)
                                };
                            }
                            return column;
                        })
                    }
                }
                return board_item;
            });
            
            state.active_board = state.board.find(board_item => board_item.id === board_id) ?? board[0];

            return state;
        }
    }
});

const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
}

export const { setActiveBoard, addTask, deleteTask } = BoardSlice.actions;

export default BoardSlice.reducer;