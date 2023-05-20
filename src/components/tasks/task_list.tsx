import { useState, FC } from "react";
import { Tasks, TasksInitialState } from "../../models/board.model";
import TaskItem from "./task_item";
import TaskDetailsModal from "../../modals/task_details/task_details.modal";
import "./task.scss";

type TaskListProps = {
    tasks: Tasks[]
};

const TaskList: FC<TaskListProps> = (props) => {

    const { tasks } = props;
    const [show_task_details_modal, setShowTaskDetailsModal] = useState(false);
    const [active_task, setActiveTask] = useState<Tasks>(TasksInitialState);

    const onTaskClick = (task: Tasks) => {
        setShowTaskDetailsModal(true);
        setActiveTask(task);
    }

    if(!tasks.length){
        return null;
    }

    return (
        <>
            <ul className="task_list">
                { tasks.map((task, index) => <TaskItem key={index} task={task} onClick={() => onTaskClick(task)} />) }
            </ul>  

            <TaskDetailsModal 
                is_show={show_task_details_modal}
                handleClose={() => setShowTaskDetailsModal(false)}
                active_task={active_task}
            />  
        </>

    );
};

export default TaskList;