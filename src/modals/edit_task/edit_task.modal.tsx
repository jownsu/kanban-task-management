import { FC, useState } from "react";
import { Modal, Dropdown } from "react-bootstrap";

import "./edit_task.modal.scss";

type EditTaskProps = {
    is_show: boolean;
    onHide: () => void;
};

const EditTaskModal:FC<EditTaskProps> = (props) => {
    const { is_show, onHide } = props;
    const [ status_items ] = useState([
        {
            id: 1,
            value: "Todo"
        },
        {
            id: 2,
            value: "Doing"
        },
        {
            id: 3,
            value: "Done"
        }
    ]);
    const [ selected_status, setSelectedStatus ] = useState(status_items[0]); 
    
    return (
        <Modal 
            show={is_show}
            onHide={onHide}
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
                    <Dropdown id="status">
                        <Dropdown.Toggle>
                            {selected_status.value}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                status_items.map((item) => (
                                    <Dropdown.Item onClick={() => setSelectedStatus(item)}>{item.value}</Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <button type="button" id="create_task_btn">Create Task</button>
            </Modal.Body>
        </Modal>
    );
}

export default EditTaskModal;