import { FC } from "react";
import { Modal } from "react-bootstrap";

import "./delete_task.modal.scss";

type DeleteTaskProps = {
    is_show: boolean;
    onHide: () => void;
};

const DeleteTaskModal:FC<DeleteTaskProps> = (props) => {
    const { is_show, onHide } = props;

    return (
        <Modal
            show={is_show}
            onHide={onHide}
            centered
            id="delete_task_modal"
        >
            <Modal.Body>
                <p className="title">Delete this task?</p>
                <p className="desc">Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
                <div className="action_container">
                    <button type="button" className="delete_task_btn">Delete</button>
                    <button type="button" className="cancel_btn" onClick={onHide}>Cancel</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteTaskModal;