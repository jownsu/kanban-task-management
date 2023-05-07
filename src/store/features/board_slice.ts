import { createSlice } from "@reduxjs/toolkit";
import { board } from "../../assets/data";

const initialState = {
    board: board,
    active_board: 0
};

export const BoardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {}
});

export const {} = BoardSlice.actions;

export default BoardSlice.reducer;