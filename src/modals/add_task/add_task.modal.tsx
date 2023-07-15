/* React */
import { useEffect }                      from "react";

/* Plugins */
import { Modal, Dropdown }                from "react-bootstrap";
import { useForm, SubmitHandler }         from "react-hook-form";

/* Redux */
import { useAppSelector, useAppDispatch } from "../../store/store";
import { Status }                         from "../../models/board.model";
import { addTask }                        from "../../store/features/board_slice";
import { toggleModal }                    from "../../store/features/modal_slice";

/* CSS */
import "./add_task.modal.scss";

type Inputs = {
    title: string,
    description: string,
    subtasks: string[],
    status: Status
};

const AddTaskModal = () => {
    const dispatch = useAppDispatch();
    const { board } = useAppSelector(state => state.board);
    const { add_task } = useAppSelector(state => state.modal);

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
            status: {id: 0 , name: ""},
            subtasks: ["", ""]
        }
    });

    const [subtasks, status] = watch(["subtasks", "status"]);

    useEffect(() => {
        if(board?.columns.length){
            setValue("status", {id: board.columns[0].id , name: board.columns[0].name});
        }
    }, [board]);

    const handleDeleteSubTask = (index: number) => {
        setValue(`subtasks`, subtasks.filter((_, sub_task_index) => {
            return sub_task_index !== index;
        }));
    }

    const onSubmit:SubmitHandler<Inputs> = (form_data) => {
        dispatch(addTask({
            column_id: form_data.status.id,
            new_task: {
                ...form_data, 
                status: form_data.status.name,
                subtasks: form_data.subtasks
            }
        }));
        reset();
        dispatch(toggleModal({name: "add_task", value:false}));
    }

    return (
        <Modal 
            show={add_task}
            onHide={() => dispatch(toggleModal({name: "add_task", value:false}))}
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
                            subtasks.map((_, sub_task_index) => (
                                <div className={`sub_task ${errors.subtasks?.[sub_task_index] && "error"}`} key={sub_task_index}>
                                    <input 
                                        type="text" 
                                        placeholder="e.g Make coffee" 
                                        {...register(`subtasks.${sub_task_index}`, { required: true })}
                                    />
                                    {errors.subtasks?.[sub_task_index] && <p className="error_message">Can't be empty</p>}
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
                            onClick={() => setValue("subtasks", [...getValues("subtasks"), ""])}
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
                                    board?.columns.map((item) => (
                                        <Dropdown.Item key={item.id} onClick={() => setValue("status", {id: item.id, name: item.name})}>{item.name}</Dropdown.Item>
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