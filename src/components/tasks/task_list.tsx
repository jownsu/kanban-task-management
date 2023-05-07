import { FC } from "react";
import { Tasks } from "../../models/board.model";
import TaskItem from "./task_item";
import "./task.scss";

type TaskListProps = {
    tasks: Tasks[]
};

const TaskList: FC<TaskListProps> = (props) => {

    const { tasks } = props;

    if(!tasks.length){
        return null;
    }

    return (
        <ul className="task_list">
            { tasks.map(task => <TaskItem task={task}/>) }
        </ul>    
    );
};

export default TaskList;