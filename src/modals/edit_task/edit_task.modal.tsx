import { FC } from "react";
import { Modal, Form } from "react-bootstrap";

import "./edit_task.modal.scss";

type EditTaskProps = {
    is_show: boolean;
    onClose: () => void;
};

const EditTaskModal:FC<EditTaskProps> = (props) => {
    const { is_show, onClose } = props;
    
    return (
        <Modal 
            show={is_show}
            onHide={onClose}
            centered
            id="edit_task_modal"
        >
            <Modal.Body>
                <p className="title">Edit Task</p>
                <div className="input_group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" placeholder="e.g Take coffee break"/>
                </div>
                <div className="input_group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little"></textarea>
                </div>
                <div className="sub_tasks_container">
                    <p className="label">Subtasks</p>
                    <div className="sub_task">
                        <input type="text" placeholder="e.g Make coffee" />
                        <button className="remove_btn" type="button"></button>
                    </div>
                    <div className="sub_task">
                        <input type="text" placeholder="e.g Drink coffee & smile" />
                        <button className="remove_btn" type="button"></button>
                    </div>
                    <button id="add_sub_task_btn" type="button">+ Add new Subtask</button>
                </div>
                <div className="input_group">
                    <label htmlFor="status">Status</label>
                    <Form.Select id="status" aria-label="Default select example">
                        <option value="Todo">Todo</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </Form.Select>
                </div>
                <button type="button" id="create_task_btn">Create Task</button>
            </Modal.Body>
        </Modal>
    );
}

export default EditTaskModal;