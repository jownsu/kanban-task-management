import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalNames = "add_board" | "delete_board" | "edit_board" | "add_task" | "delete_task" | "edit_task" | "task_details";

const initialState = {
    add_board: false,
    delete_board: false,
    edit_board: false,
    add_task: false,
    delete_task: false,
    edit_task: false,
    task_details: false
};

export const ModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<{ name: ModalNames, value?: boolean }>) => {
            const { name, value } = action.payload;

            if(value !== undefined){
                state[name] = value;
            }
            else {
                state[name] = !state[name];
            }

            return state;
        }
    }
});

export const { toggleModal } = ModalSlice.actions;

export default ModalSlice.reducer;