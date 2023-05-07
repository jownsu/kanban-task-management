import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { board } from "../../assets/data";

const initialState = {
    board: board,
    active_board: 0
};

export const BoardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setActiveBoard: (state, action: PayloadAction<{index: number}>) => {
            state.active_board = action.payload.index;
            return state;
        }
    }
});

export const {setActiveBoard} = BoardSlice.actions;

export default BoardSlice.reducer;