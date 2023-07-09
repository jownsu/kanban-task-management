/* React */
import { 
    FC, 
    useState, 
    useEffect, 
    useRef 
}                from "react";

/* Plugins */
import { 
    Modal, 
    OverlayTrigger, 
    Popover, 
    Dropdown 
}                from "react-bootstrap";

/* Redux */
import { Tasks } from "../../models/board.model";
import { useAppSelector, useAppDispatch} from "../../store/store";
import { updateTaskStatus } from "../../store/features/board_slice";

/* CSS */
import "./task_details.modal.scss";

type TaskDetailsProps = {
    is_show: boolean;
    onHide: () => void;
    onEditTask: () => void;
    onDeleteTask: () => void;
    active_task: Tasks;
    column: Column
};

type Column = {
    id: number,
    name: string
}

const TaskDetailsModal:FC<TaskDetailsProps> = (props) => {
    const { is_show, active_task, column, onHide, onEditTask, onDeleteTask } = props;
    const dispatch = useAppDispatch();
    const { board } = useAppSelector(state => state.board);
    const [ show_action, setShowAction ] = useState(false);
    const [ selected_status, setSelectedStatus ] = useState({id: column.id, name: column.name}); 

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

    const handleStatusClick = (status: Column) => {
        setSelectedStatus(status);
        dispatch(updateTaskStatus({
            column_id: column.id,
            task_id: active_task.id, 
            status_id: status.id
        }));
        onHide();
    }

    useEffect(() => {
        setSelectedStatus({id: column.id, name: column.name});
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
                            {selected_status.name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                board.columns.map((item) => (
                                    <Dropdown.Item 
                                        onClick={() => handleStatusClick(item)}>{item.name}
                                    </Dropdown.Item>
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