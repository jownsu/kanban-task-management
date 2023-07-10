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
    Subtasks, 
    Status 
}                               from "../../models/board.model";
import { deleteTask, editTask } from "../../store/features/board_slice";
import { useAppDispatch }       from "../../store/store";

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

type UpdateTask = {
    id: number,
    title: string,
    description: string,
    subtasks: Subtasks[],
    status: Status
};

const TaskList: FC<TaskListProps> = (props) => {

    const { tasks, column } = props;

    const dispatch = useAppDispatch();

    const [show_modal, setShowModal] = useState({
        task_details: false,
        edit_task: false,
        delete_task: false
    });

    const [active_task, setActiveTask] = useState<Tasks>(TasksInitialState);

    const { task_details, edit_task, delete_task } = show_modal;

    useEffect(() => {
        let updated_active_task = tasks.find(task => task.id === active_task.id);
        if(updated_active_task){
            setActiveTask(updated_active_task);
        }
    }, [tasks]);

    const toggleModal = (modal: string, value: boolean) => {
        setShowModal(prevState => (
            {...prevState, [modal]: value}
        ))
    };

    const handleTaskClick = (task: Tasks) => {
        toggleModal("task_details", true);
        setActiveTask(task);
    };

    const handleDelete = () => {
        dispatch(deleteTask({
            column_id: column.id,
            task_id: active_task.id
        }));
        toggleModal("delete_task", false);
        toggleModal("task_details", false);
    };

    const handleEditCallback = (updated_task: UpdateTask) => {
        dispatch(editTask({
            column_id: column.id,
            task_id: active_task.id,
            update_task: updated_task
        }));

        toggleModal("edit_task", false);
        toggleModal("task_details", column.id === updated_task.status.id);
    }

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
                is_show={task_details}
                column={column}
                onHide={() => toggleModal("task_details", false)}
                onEditTask={() => {
                    toggleModal("task_details", false);
                    toggleModal("edit_task", true);
                }}
                onDeleteTask={() => {
                    toggleModal("task_details", false);
                    toggleModal("delete_task", true);
                }}
                active_task={active_task}
            />  

            <EditTaskModal
                is_show={edit_task}
                active_task={active_task}
                column={column}
                onEditCallback={handleEditCallback}
                onHide={() => {
                    toggleModal("edit_task", false)
                    toggleModal("task_details", true);
                }}
            />

            <DeleteTaskModal
                is_show={delete_task}
                task={active_task}
                onDelete={handleDelete}
                onHide={() => {
                    toggleModal("delete_task", false);
                    toggleModal("task_details", true);
                }}
            />
        </>
    );
};

export default TaskList;