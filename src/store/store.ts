import { configureStore }   from "@reduxjs/toolkit";
import { 
    useDispatch, 
    useSelector, 
    TypedUseSelectorHook 
}                           from "react-redux"
import boardReducer         from "./features/board_slice";
import modalReducer         from "./features/modal_slice";

export const store = configureStore({
    reducer: {
        board: boardReducer,
        modal: modalReducer
    }
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector; 