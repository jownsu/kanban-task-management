import { FC } from "react";
import { Tasks } from "../../models/board.model";
import "./task.scss";

type TaskItemProps = {
    task: Tasks
};

const TaskItem: FC<TaskItemProps> = (props) => {
    const {task} = props;

    return (
        <li>
            <p className="title">{task.title}</p>
            <p className="sub_task_info">{task.subtasks.filter(t => t.isCompleted === true).length} of {task.subtasks.length} subtasks</p>
        </li>
    );
};

export default TaskItem;