import { FC } from "react";
import { Modal } from "react-bootstrap";

import "./add_board.modal.scss";

type AddBoardProps = {
    is_show: boolean;
    onHide: () => void;
};

const AddBoardModal:FC<AddBoardProps> = (props) => {
    const { is_show, onHide } = props;
    
    return (
        <Modal 
            show={is_show}
            onHide={onHide}
            centered
            id="add_board_modal"
        >
            <Modal.Body>
                <p className="title">Add New Board</p>
                <div className="input_group">
                    <label htmlFor="title">Name</label>
                    <input type="text" id="title" placeholder="e.g Web design"/>
                </div>
                <div className="board_columns_container">
                    <p className="label">Columns</p>
                    <div className="column_group">
                        <input type="text" defaultValue="Todo" />
                        <button className="remove_btn" type="button"></button>
                    </div>
                    <div className="column_group">
                        <input type="text" defaultValue="Doing" />
                        <button className="remove_btn" type="button"></button>
                    </div>
                    <button id="add_column_btn" type="button">+ Add new Column</button>
                </div>
                <button type="button" id="create_board_btn">Create New Board</button>
            </Modal.Body>
        </Modal>
    );
}

export default AddBoardModal;