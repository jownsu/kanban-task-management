import { useAppSelector } from "../../store/store";
import EmptyBoard from "../empty_board/empty_board";
import ColumnList from "../columns/column_list";

const Board = () => {

    const { active_board, board } = useAppSelector(state => state.board);
    const { columns } = board[active_board]; 

    return (
        <>
            {
                (columns.length > 0)
                ? <ColumnList /> 
                : <EmptyBoard />
            }
        </>
    )
}

export default Board;