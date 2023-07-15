/* React */
import { FormEvent }     from "react";

/* Plugins */
import { Modal }         from "react-bootstrap";

/* Redux */
import { toggleModal }   from "../../store/features/modal_slice";
import { deleteTask }    from "../../store/features/board_slice";
import { 
    useAppDispatch,
    useAppSelector
}                        from "../../store/store";

/* CSS */
import "./delete_task.modal.scss";

const DeleteTaskModal = () => {
    
    const dispatch = useAppDispatch();
    const { delete_task, active_task, column } = useAppSelector(state => state.modal);
    const { title } = active_task;

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(deleteTask({
            column_id: column.id,
            task_id: active_task.id
        }));
        dispatch(toggleModal({name: "delete_task", value: false}));
        dispatch(toggleModal({name: "task_details", value: false}));
    }

    const handleHide = () => {
        dispatch(toggleModal({name: "delete_task", value: false}));
        dispatch(toggleModal({name: "task_details", value: true}));
    }
    
    return (
        <Modal
            show={delete_task}
            onHide={handleHide}
            centered
            id="delete_task_modal"
        >
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <p className="title">Delete this task?</p>
                    <p className="desc">Are you sure you want to delete the ‘{title}‘ task and its subtasks? This action cannot be reversed.</p>
                    <div className="action_container">
                        <button type="submit" className="delete_task_btn">Delete</button>
                        <button 
                            type="button" 
                            className="cancel_btn" 
                            onClick={handleHide}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteTaskModal;