import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Column, Tasks, TasksInitialState, ColumnInitialState } from "../../models/board.model";

type ModalNames = "add_board" | "delete_board" | "edit_board" | "add_task" | "delete_task" | "edit_task" | "task_details";

type ActiveDetails = {
    active_task: Tasks,
    column: Column
}

const initialState = {
    add_board: false,
    delete_board: false,
    edit_board: false,
    add_task: false,
    delete_task: false,
    edit_task: false,
    task_details: false,
    column: ColumnInitialState,
    active_task: TasksInitialState
};

export const ModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<{ name: ModalNames, value?: boolean, active_details?: ActiveDetails }>) => {
            const { name, value, active_details } = action.payload;

            if(active_details){
                state.column = active_details.column;
                state.active_task = active_details.active_task;
            }

            if(value !== undefined){
                state[name] = value;
            }
            else{
                state[name] = !state[name];
            }

            return state;
        }
    }
});

export const { toggleModal } = ModalSlice.actions;

export default ModalSlice.reducer;