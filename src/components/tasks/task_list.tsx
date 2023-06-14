import { useState, FC } from "react";
import { Tasks, TasksInitialState } from "../../models/board.model";
import TaskItem from "./task_item";
import TaskDetailsModal from "../../modals/task_details/task_details.modal";
import EditTaskModal from "../../modals/edit_task/edit_task.modal";
import "./task.scss";

type TaskListProps = {
    tasks: Tasks[]
};

const TaskList: FC<TaskListProps> = (props) => {

    const { tasks } = props;
    const [show_task_details_modal, setShowTaskDetailsModal] = useState(false);
    const [show_edit_task_modal, setShowEditTaskModal] = useState(false);
    const [active_task, setActiveTask] = useState<Tasks>(TasksInitialState);

    const handleTaskClick = (task: Tasks) => {
        setShowTaskDetailsModal(true);
        setActiveTask(task);
    }

    const handleTaskDetailsClose = () => {
        setShowTaskDetailsModal(false);
        setActiveTask({    
            title: "",
            description: "",
            status: "",
            subtasks: []
        });
    }

    if(!tasks.length){
        return null;
    }

    return (
        <>
            <ul className="task_list">
                { tasks.map((task, index) => <TaskItem key={index} task={task} onClick={() => handleTaskClick(task)} />) }
            </ul>  

            <TaskDetailsModal 
                is_show={show_task_details_modal}
                onClose={handleTaskDetailsClose}
                onEditTask={() => setShowEditTaskModal(true)}
                active_task={active_task}
            />  

            <EditTaskModal
                is_show={show_edit_task_modal}
                onClose={() => setShowEditTaskModal(false)}
            />
        </>

    );
};

export default TaskList;