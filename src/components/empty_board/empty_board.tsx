/* React */
import { FC } from "react";

/* CSS */
import "./empty_board.scss";

type EmptyBoardProps = {
    onAddNewBoard: () => void;
};

const EmptyBoard:FC<EmptyBoardProps> = (props) => {

    const { onAddNewBoard } = props;

    return (
        <div className="empty_board">
            <p>The board is empty. Create a new board to get started.</p>
            <button 
                type="button" 
                className="btn_primary"
                onClick={onAddNewBoard}
            >
                + Add New Board
            </button>
        </div>
    )
};

export default EmptyBoard;