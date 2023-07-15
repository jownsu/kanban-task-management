/* React */
import { useEffect }       from "react";

/* Plugins */
import { 
    useForm, 
    SubmitHandler, 
    useFieldArray 
}                          from "react-hook-form";
import { Modal, Dropdown } from "react-bootstrap";

/* Redux */
import { 
    useAppSelector,
    useAppDispatch
}                          from "../../store/store";
import { editTask }        from "../../store/features/board_slice";
import { UpdateTask }      from "../../models/board.model";
import { toggleModal }     from "../../store/features/modal_slice";

/* CSS */
import "./edit_task.modal.scss";

const EditTaskModal = () => {
    const dispatch = useAppDispatch();

    const { board } = useAppSelector(state => state.board);
    const { edit_task, active_task, column } = useAppSelector(state => state.modal);

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors }, 
        getValues, 
        setValue,
        watch,
        control 
    } = useForm<UpdateTask>({
        defaultValues: {
            id: 0,
            title: "",
            description: "",
            status: {id: 0, name: ""},
            subtasks: []
        }
    });

    const { fields, remove } = useFieldArray({
        name: "subtasks",
        control
    });
    

    useEffect(() => {
        if(active_task){
            reset({
                id: active_task.id,
                title: active_task.title,
                description: active_task.description,
                status: {id: column.id , name: column.name},
                subtasks: active_task.subtasks
            });
        }
    }, [active_task]);

    const status = watch("status");

    const handleEdit = (updated_task: UpdateTask) => {
        dispatch(editTask({
            column_id: column.id,
            task_id: active_task.id,
            update_task: updated_task
        }));

        dispatch(toggleModal({name: "edit_task", value: false}));
        dispatch(toggleModal({name: "task_details", value: column.id === updated_task.status.id}));
    }

    const onSubmit:SubmitHandler<UpdateTask> = (form_data) => {
        handleEdit(form_data);
        reset();
    }
    
    return (
        <Modal 
            show={edit_task}
            onHide={() => {
                dispatch(toggleModal({name: "edit_task", value: false}))
                dispatch(toggleModal({name: "task_details", value: true}));
            }}
            centered
            id="edit_task_modal"
        >
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="title">Edit Task</p>
                    <div className={`input_group ${errors.title && "error"}`}>
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            id="title" 
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
                            {...register("description", { required: false })}
                        ></textarea>
                        {errors.description && <p className="error_message">Can't be empty</p>}
                    </div>
                    <div className="sub_tasks_container">
                        <p className="label">Subtasks</p>
                        {fields.map((field, index) => {
                                return (
                                    <div className={`sub_task ${errors?.subtasks?.[index]?.title && "error"}`} key={field.id}>
                                        <input 
                                            type="text" 
                                            placeholder="e.g Make coffee" 
                                            {...register(`subtasks.${index}.title` as const, { required: true })}
                                        />
                                        {errors?.subtasks?.[index]?.title && <p className="error_message">Can't be empty</p>}
                                        <button 
                                            className="remove_btn" 
                                            type="button"
                                            onClick={() => remove(index)}
                                        ></button>
                                    </div>
                                );
                            })
                        }
                        <button 
                            id="add_sub_task_btn" 
                            type="button"
                            onClick={() => setValue("subtasks", [...getValues("subtasks"), {id: 0, title: "", isCompleted: false}])}
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
                                    board.columns.map((item) => (
                                        <Dropdown.Item 
                                            key={item.id}
                                            onClick={() => setValue("status", {id: item.id, name: item.name})}>{item.name}
                                        </Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <button type="submit" id="create_task_btn">Save Changes</button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default EditTaskModal;