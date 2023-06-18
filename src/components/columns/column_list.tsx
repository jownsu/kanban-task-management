import { useState } from "react";
import { useAppSelector } from "../../store/store";
import ColumnItem from "./column_item";
import EditBoardModal from "../../modals/edit_board/edit_board.modal";

import "./columns.scss";

const ColumnList = () => {
    const { board, active_board } = useAppSelector(state => state.board);
    const [ is_show_edit_board_modal, setShowEditBoardModal ] = useState(false);
    const { columns } = board[active_board]; 

    return (
        <>
            <ul className="column_list">
                {
                    columns.map((column, index) => <ColumnItem key={index} column={column} />)
                }
                <li className="new_column">
                    <button type="button" onClick={() => setShowEditBoardModal(true)}>+ New Column</button>
                </li>
            </ul>
            {
                <EditBoardModal 
                    is_show={is_show_edit_board_modal}
                    onHide={() => setShowEditBoardModal(false)}
                />
            }
        </>

    );
}

export default ColumnList;