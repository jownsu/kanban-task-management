import { FC, useEffect } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { addTask } from "../../store/features/board_slice";

import "./add_task.modal.scss";

type AddTaskProps = {
    is_show: boolean;
    onHide: () => void;
};

type Inputs = {
    title: string,
    description: string,
    sub_tasks: string[],
    status: Status
};

type Status = {
    id: number;
    name: string;
}

const AddTaskModal:FC<AddTaskProps> = (props) => {
    const { is_show, onHide } = props;
    const dispatch = useAppDispatch();
    const { active_board } = useAppSelector(state => state.board);

    const { 
        register, 
        handleSubmit, 
        reset, 
        watch,
        formState: { errors }, 
        getValues, 
        setValue 
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            status: {id: active_board.columns[0].id , name: active_board.columns[0].name},
            sub_tasks: ["", ""]
        }
    });

    const [sub_tasks, status] = watch(["sub_tasks", "status"]);

    useEffect(() => {
        setValue("status", {id: active_board.columns[0].id , name: active_board.columns[0].name});
    }, [active_board]);

    const handleDeleteSubTask = (index: number) => {
        setValue(`sub_tasks`, sub_tasks.filter((_, sub_task_index) => {
            return sub_task_index !== index;
        }));
    }

    const onSubmit:SubmitHandler<Inputs> = (form_data) => {
        dispatch(addTask({
            board_id: active_board.id,
            column_id: form_data.status.id,
            new_task: {
                ...form_data, 
                status: form_data.status.name,
                subtasks: form_data.sub_tasks
            }
        }));
        reset();
        onHide();
    }

    return (
        <Modal 
            show={is_show}
            onHide={onHide}
            centered
            id="new_task_modal"
        >
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="title">Add New Task</p>
                    <div className={`input_group ${errors.title && "error"}`}>
                        <label htmlFor="title">Title</label>
                        <input 
                            id="title"
                            type="text" 
                            placeholder="e.g Take coffee break"
                            {...register("title", { required: true })}
                        />
                        {errors.title && <p className="error_message">Can't be empty</p>}
                    </div>
                    <div className={`input_group ${errors.description && "error"}`}>
                        <label htmlFor="description">Description</label>
                        <textarea 
                            id="description" 
                            placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little"
                            {...register("description", { required: true })}
                            ></textarea>
                            {errors.description && <p className="error_message">Can't be empty</p>}
                    </div>
                    <div className="sub_tasks_container">
                        <p className="label">Subtasks</p>
                        {
                            sub_tasks.map((_, sub_task_index) => (
                                <div className={`sub_task ${errors.sub_tasks?.[sub_task_index] && "error"}`} key={sub_task_index}>
                                    <input 
                                        type="text" 
                                        placeholder="e.g Make coffee" 
                                        {...register(`sub_tasks.${sub_task_index}`, { required: true })}
                                    />
                                    {errors.sub_tasks?.[sub_task_index] && <p className="error_message">Can't be empty</p>}
                                    <button 
                                        className="remove_btn" 
                                        type="button"
                                        onClick={() => handleDeleteSubTask(sub_task_index)}
                                    ></button>
                                </div>
                            ))
                        }
                        <button 
                            id="add_sub_task_btn" 
                            type="button"
                            onClick={() => setValue("sub_tasks", [...getValues("sub_tasks"), ""])}
                        >
                            + Add new Subtask
                        </button>
                    </div>

                    <div className="input_group">
                        <label htmlFor="status">Status</label>
                        <Dropdown id="status">
                            <Dropdown.Toggle>
                                {status.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    active_board.columns.map((item) => (
                                        <Dropdown.Item onClick={() => setValue("status", {id: item.id, name: item.name})}>{item.name}</Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <button type="submit" id="create_task_btn">Create Task</button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default AddTaskModal;