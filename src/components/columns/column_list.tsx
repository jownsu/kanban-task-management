/* React */
import { useState }       from "react";

/* Redux */
import { useAppSelector } from "../../store/store";

/* Components */
import ColumnItem         from "./column_item";
import EditBoardModal     from "../../modals/edit_board/edit_board.modal";

/* CSS */
import "./columns.scss";

const ColumnList = () => {
    const { board } = useAppSelector(state => state.board);
    const [ is_show_edit_board_modal, setShowEditBoardModal ] = useState(false);

    return (
        <>
            <ul className="column_list">
                {
                    board.columns.map((column_item, column_index) => (
                        <ColumnItem 
                            key={column_index} 
                            column={column_item} 
                        />
                    ))
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