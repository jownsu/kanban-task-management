/* React */
import { useAppSelector } from "../../store/store";

/* Components */
import ColumnList         from "../columns/column_list";
import EmptyBoard         from "../empty_board/empty_board";

const Board = () => {
    const { board } = useAppSelector(state => state.board);

    return (
        <main>
            {
                (board.id !== 0)
                    ? <ColumnList /> 
                    : <EmptyBoard />
            }
        </main>
    )
}

export default Board;