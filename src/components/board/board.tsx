import { useAppSelector } from "../../store/store";
import EmptyBoard from "../empty_board/empty_board";
import ColumnList from "../columns/column_list";

const Board = () => {

    const { active_board } = useAppSelector(state => state.board);

    return (
        <>
            {
                (active_board?.columns.length > 0)
                    ? <ColumnList /> 
                    : <EmptyBoard />
            }
        </>
    )
}

export default Board;