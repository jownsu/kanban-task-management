import { useAppSelector } from "../../store/store";
import ColumnItem from "./column_item";

import "./columns.scss";

const ColumnList = () => {
    const { board, active_board } = useAppSelector(state => state.board);
    const { columns } = board[active_board]; 

    return (
        <ul className="column_list">
            {
                columns.map(column => <ColumnItem column={column} />)
            }
        </ul>
    );
}

export default ColumnList;