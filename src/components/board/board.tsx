/* React */
import { FC }             from "react";
import { useAppSelector } from "../../store/store";

/* Components */
import ColumnList         from "../columns/column_list";
import EmptyBoard         from "../empty_board/empty_board";

type BoardProps = {
    onAddNewBoard: () => void;
}

const Board:FC<BoardProps> = (props) => {
    const { onAddNewBoard } = props;    
    const { board } = useAppSelector(state => state.board);

    return (
        <>
            {
                (board.id !== 0)
                    ? <ColumnList /> 
                    : <EmptyBoard onAddNewBoard={onAddNewBoard} />
            }
        </>
    )
}

export default Board;