/* React */
import { 
    useState, 
    useEffect, 
    FC 
}                               from "react";

/* Redux */
import { 
    Tasks, 
    TasksInitialState, 
}                               from "../../models/board.model";
import { useAppDispatch }       from "../../store/store";
import { toggleModal }          from "../../store/features/modal_slice";

/* Components */
import TaskDetailsModal         from "../../modals/task_details/task_details.modal";
import EditTaskModal            from "../../modals/edit_task/edit_task.modal";
import DeleteTaskModal          from "../../modals/delete_task/delete_task.modal";
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

    const [active_task, setActiveTask] = useState<Tasks>(TasksInitialState);


    useEffect(() => {
        let updated_active_task = tasks.find(task => task.id === active_task.id);
        if(updated_active_task){
            setActiveTask(updated_active_task);
        }
    }, [tasks]);

    const handleTaskClick = (task: Tasks) => {
        dispatch(toggleModal({name: "task_details", value: true}));
        setActiveTask(task);
    };

    if(!tasks.length){
        return null;
    }

    return (
        <>
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

            <TaskDetailsModal 
                active_task={active_task}
                column={column}
            />  

            <EditTaskModal
                active_task={active_task}
                column={column}
            />

            <DeleteTaskModal
                active_task={active_task}
                column={column}
            />
        </>
    );
};

export default TaskList;