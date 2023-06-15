import { FC } from "react";
import { Modal } from "react-bootstrap";

import "./edit_board.modal.scss";

type EditBoardProps = {
    is_show: boolean;
    handleClose: () => void;
};

const EditBoardModal:FC<EditBoardProps> = (props) => {
    const { is_show, handleClose } = props;
    
    return (
        <Modal 
            show={is_show}
            onHide={handleClose}
            centered
            id="edit_board_modal"
        >
            <Modal.Body>
                <p className="title">Edit Board</p>
                <div className="input_group">
                    <label htmlFor="title">Board Name</label>
                    <input type="text" id="title" placeholder="e.g Web design"/>
                </div>
                <div className="board_columns_container">
                    <p className="label">Board Columns</p>
                    <div className="column_group">
                        <input type="text" defaultValue="Todo" />
                        <button className="remove_btn" type="button"></button>
                    </div>
                    <div className="column_group">
                        <input type="text" defaultValue="Doing" />
                        <button className="remove_btn" type="button"></button>
                    </div>
                    <div className="column_group">
                        <input type="text" defaultValue="Done" />
                        <button className="remove_btn" type="button"></button>
                    </div>
                    <button id="add_column_btn" type="button">+ Add new Column</button>
                </div>
                <button type="button" id="save_changes_btn">Save Changes</button>
            </Modal.Body>
        </Modal>
    );
}

export default EditBoardModal;