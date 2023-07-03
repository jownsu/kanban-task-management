import { useState, FC } from "react";
import { Tasks, TasksInitialState } from "../../models/board.model";
import TaskItem from "./task_item";
import TaskDetailsModal from "../../modals/task_details/task_details.modal";
import EditTaskModal from "../../modals/edit_task/edit_task.modal";
import DeleteTaskModal from "../../modals/delete_task/delete_task.modal";
import "./task.scss";
import { deleteTask } from "../../store/features/board_slice";
import { useAppDispatch, useAppSelector } from "../../store/store";

type TaskListProps = {
    column_id: number;
    tasks: Tasks[];
};

const TaskList: FC<TaskListProps> = (props) => {

    const { tasks, column_id } = props;

    const dispatch = useAppDispatch();
    const { active_board } = useAppSelector(state => state.board); 


    const [show_modal, setShowModal] = useState({
        task_details: false,
        edit_task: false,
        delete_task: false
    })
    const [active_task, setActiveTask] = useState<Tasks>(TasksInitialState);

    const { task_details, edit_task, delete_task } = show_modal;

    const toggleModal = (modal: string, value: boolean) => {
        setShowModal(prevState => (
            {
                ...prevState,
                [modal]: value
            }
        ))
    }

    const handleTaskClick = (task: Tasks) => {
        toggleModal("task_details", true);
        setActiveTask(task);
    }

    const handleDelete = () => {
        dispatch(deleteTask({
            board_id: active_board.id,
            column_id: column_id,
            task_id: active_task.id
        }));
        toggleModal("delete_task", false);
        toggleModal("task_details", false);
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