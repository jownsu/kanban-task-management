
/* Redux */
import { useAppDispatch } from "../../store/store";
import { toggleModal }    from "../../store/features/modal_slice";

/* CSS */
import "./empty_board.scss";


const EmptyBoard = () => {

    const dispatch = useAppDispatch();

    return (
        <div className="empty_board">
            <p>The board is empty. Create a new board to get started.</p>
            <button 
                type="button" 
                className="btn_primary"
                onClick={() => dispatch(toggleModal({name:"add_board", value: true}))}
            >
                + Add New Board
            </button>
        </div>
    )
};

export default EmptyBoard;