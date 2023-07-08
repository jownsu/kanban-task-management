import { FC, FormEvent } from "react";
import { Modal }         from "react-bootstrap";

import "./edit_board.modal.scss";

type EditBoardProps = {
    is_show: boolean;
    onHide: () => void;
};

const EditBoardModal:FC<EditBoardProps> = (props) => {
    const { is_show, onHide } = props;

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    }
    
    return (
        <Modal 
            show={is_show}
            onHide={onHide}
            centered
            id="edit_board_modal"
        >
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <p className="title">Edit Board</p>
                    <div className="input_group error">
                        <label htmlFor="title">Board Name</label>
                        <input type="text" id="title" placeholder="e.g Web design"/>
                        <p className="error_message">Can't be empty</p>
                    </div>
                    <div className="board_columns_container">
                        <p className="label">Board Columns</p>
                        <div className="column_group error">
                            <input type="text" defaultValue="Todo" />
                            <button className="remove_btn" type="button"></button>
                            <p className="error_message">Can't be empty</p>
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
                    <button type="submit" id="save_changes_btn">Save Changes</button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default EditBoardModal;