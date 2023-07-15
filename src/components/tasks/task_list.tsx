/* React */
import { 
    useEffect, 
    FC 
}                               from "react";

/* Redux */
import { Tasks }                from "../../models/board.model";
import { 
    useAppDispatch, 
    useAppSelector 
}                               from "../../store/store";
import { toggleModal }          from "../../store/features/modal_slice";

/* Components */
import TaskItem                 from "./task_item";

/* CSS */
import "./task.scss";

type TaskListProps = {
    column: Column;
    tasks: Tasks[];
};

type Column = {
    id: number;
    name: string;
}

const TaskList: FC<TaskListProps> = (props) => {

    const { tasks, column } = props;

    const dispatch = useAppDispatch();

    const { active_task } = useAppSelector(state => state.modal);

    useEffect(() => {
        let updated_active_task = tasks.find(task => task.id === active_task.id);
        if(updated_active_task && JSON.stringify(updated_active_task) !== JSON.stringify(active_task)){
                dispatch(toggleModal({
                    name: "task_details", 
                    value: true, 
                    active_details: { 
                        active_task: updated_active_task, 
                        column 
                    }
                }));
        }
    }, [tasks]);

    const handleTaskClick = (task: Tasks) => {
        dispatch(toggleModal({
            name: "task_details", 
            value: true, 
            active_details: { 
                active_task: task, 
                column 
            }
        }));
    };

    if(!tasks.length){
        return null;
    }

    return (
        <ul className="task_list">
            { 
                tasks.map((task, index) => (
                        <TaskItem
                            key={index} 
                            task={task} 
                            onClick={() => handleTaskClick(task)} 
                        />
                    )
                ) 
            }
        </ul>  
    );
};

export default TaskList;