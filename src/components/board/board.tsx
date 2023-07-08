/* React */
import { useAppSelector } from "../../store/store";

/* Components */
import EmptyBoard         from "../empty_board/empty_board";
import ColumnList         from "../columns/column_list";

const Board = () => {

    const { board } = useAppSelector(state => state.board);

    return (
        <>
            {
                (board?.columns.length > 0)
                    ? <ColumnList /> 
                    : <EmptyBoard />
            }
        </>
    )
}

export default Board;