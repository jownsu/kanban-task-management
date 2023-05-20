import { FC } from "react";
import { Modal, Form } from "react-bootstrap";
import { Tasks } from "../../models/board.model";
import "./task_details.modal.scss";

type TaskDetailsProps = {
    is_show: boolean;
    handleClose: () => void;
    active_task: Tasks
};

const TaskDetailsModal:FC<TaskDetailsProps> = (props) => {
    const { is_show, active_task, handleClose } = props;
    return (
        <Modal 
            show={is_show}
            onHide={handleClose}
            centered
            id="task_details_modal"
        >
            <Modal.Body>
                <div className="title">
                    <p>{active_task.title}</p>
                    <button type="button" className="menu"></button>
                </div>

                <p className="description">{active_task.description}</p>

                <div className="sub_tasks_container">
                    <p>Subtasks ({active_task.subtasks.filter(subtask => subtask.isCompleted).length} of {active_task.subtasks.length})</p>
                    { 
                        active_task.subtasks.map(subtask => {
                            return (
                                <div className="sub_task"> 
                                    <input type="checkbox" defaultChecked={subtask.isCompleted} />
                                    <p>{subtask.title}</p> 
                                </div>
                            )
                        })
                    }
                </div>

                <div className="input_group">
                    <label htmlFor="status">Current Status</label>
                    <Form.Select id="status" aria-label="Default select example">
                        <option 
                            value="Todo" 
                            selected={active_task.status === "Todo"}
                        >
                            Todo
                        </option>
                        <option 
                            value="Doing" 
                            selected={active_task.status === "Doing"}
                        >
                            Doing
                        </option>
                        <option 
                            value="Done" 
                            selected={active_task.status === "Done"}
                        >
                            Done
                        </option>
                    </Form.Select>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default TaskDetailsModal;