import { FC, FormEvent } from "react";
import { Modal }         from "react-bootstrap";
import { Tasks }         from "../../models/board.model";

import "./delete_task.modal.scss";

type DeleteTaskProps = {
    is_show: boolean;
    onHide: () => void;
    onDelete: () => void;
    task: Tasks;
};

const DeleteTaskModal:FC<DeleteTaskProps> = (props) => {
    const { is_show, task, onHide, onDelete } = props;
    const { title } = task;


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onDelete();
    }
    
    return (
        <Modal
            show={is_show}
            onHide={onHide}
            centered
            id="delete_task_modal"
        >
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <p className="title">Delete this task?</p>
                    <p className="desc">Are you sure you want to delete the ‘{title}‘ task and its subtasks? This action cannot be reversed.</p>
                    <div className="action_container">
                        <button type="submit" className="delete_task_btn">Delete</button>
                        <button type="button" className="cancel_btn" onClick={onHide}>Cancel</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteTaskModal;