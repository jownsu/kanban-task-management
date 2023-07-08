import { 
    FC, 
    useState, 
    useEffect, 
    useRef 
}                from "react";
import { 
    Modal, 
    OverlayTrigger, 
    Popover, 
    Dropdown 
}                from "react-bootstrap";
import { Tasks } from "../../models/board.model";
import "./task_details.modal.scss";

type TaskDetailsProps = {
    is_show: boolean;
    onHide: () => void;
    onEditTask: () => void;
    onDeleteTask: () => void;
    active_task: Tasks;
};

const TaskDetailsModal:FC<TaskDetailsProps> = (props) => {
    const { is_show, active_task, onHide, onEditTask, onDeleteTask } = props;
    const [ show_action, setShowAction ] = useState(false);
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
    const [ selected_status, setSelectedStatus ] = useState({id: 0, value: ""}); 

    const checkboxes_ref = useRef<HTMLInputElement[]>([]);

    const handleEditClick = () => {
        setShowAction(false);
        onEditTask();
    }
    
    const handleDeleteClick = () => {
        setShowAction(false);
        onDeleteTask();
    }
    
    const handleSubtaskClick = (index: number) => {
        const checkbox = checkboxes_ref.current[index];
        if(checkbox){
            checkbox.checked = !checkbox.checked;
        }
    }

    useEffect(() => {
        const selected_item = status_items.find(item => item.value === active_task.status);
        if(selected_item){
            setSelectedStatus(selected_item);
        }
    }, [active_task]);

    return (
        <Modal 
            show={is_show}
            onHide={onHide}
            centered
            id="task_details_modal"
        >
            <Modal.Body>
                <div className="title">
                    <p>{active_task.title}</p>
                    <OverlayTrigger 
                        trigger="click"
                        placement="bottom"
                        show={show_action}
                        defaultShow={false}
                        rootClose
                        onToggle={() => setShowAction(prevState => !prevState)}
                        overlay={
                            <Popover className="action_popover">
                                <Popover.Body>
                                    <button 
                                        type="button" 
                                        className="btn_edit"
                                        onClick={handleEditClick}
                                    >
                                        Edit Task
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn_delete"
                                        onClick={handleDeleteClick}
                                    >
                                        Delete Task
                                    </button>
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <button type="button" className="menu"></button>
                    </OverlayTrigger>
                </div>

                <p className="description">{active_task.description}</p>

                <div className="sub_tasks_container">
                    <p>Subtasks ({active_task.subtasks.filter(subtask => subtask.isCompleted).length} of {active_task.subtasks.length})</p>
                    { 
                        active_task.subtasks.map((subtask, index) => {
                            return (
                                <div className="sub_task" onClick={() => handleSubtaskClick(index)}> 
                                    <input 
                                        type="checkbox" 
                                        defaultChecked={subtask.isCompleted} 
                                        ref={(element: HTMLInputElement) => (checkboxes_ref.current[index] = element)}
                                    />
                                    <p>{subtask.title}</p> 
                                </div>
                            )
                        })
                    }
                </div>

                <div className="input_group">
                    <label htmlFor="status">Current Status</label>
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
            </Modal.Body>
        </Modal>
    );
}

export default TaskDetailsModal;