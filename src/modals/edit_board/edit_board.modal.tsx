/* React */
import { useEffect } from "react";

/* Plugins */
import { Modal }         from "react-bootstrap";
import { 
    useForm, 
    useFieldArray,
    SubmitHandler 
}                        from "react-hook-form";

/* Redux */
import { 
    useAppDispatch,
    useAppSelector
}                        from "../../store/store";
import { editBoard }     from "../../store/features/board_slice";
import { toggleModal }   from "../../store/features/modal_slice";

/* CSS */
import "./edit_board.modal.scss";

type Column = {
    id: number,
    name: string
}

type Inputs = {
    id: number,
    name: string,
    columns: Column[]
};

const EditBoardModal = () => {
    const { board } = useAppSelector(state => state.board);
    const { edit_board } = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();

    const { 
        register, 
        handleSubmit,
        reset, 
        setValue,
        getValues,
        control,
        formState: { errors }, 
    } = useForm({
        defaultValues: {
            id: 0,
            name: board.name,
            columns: board.columns.map(column => ({id: column.id, name: column.name}))
        }
    });

    
    const { fields, remove } = useFieldArray({
        name: "columns",
        control
    });

    useEffect(() => {
        if(board){
            reset({
                id: board.id,
                name: board.name,
                columns: board.columns.map(column => ({id: column.id, name: column.name}))
            });
        }
    }, [board]);

    const onSubmit:SubmitHandler<Inputs> = (form_data) => {
        dispatch(editBoard({new_board: form_data}));
        handleHide();
    }

    const handleHide = () => {
        reset();
        dispatch(toggleModal({name: "edit_board", value: false}));
    }
    
    return (
        <Modal 
            show={edit_board}
            onHide={handleHide}
            centered
            id="edit_board_modal"
        >
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="title">Edit Board</p>
                    <div className={`input_group ${errors.name && "error"}`}>
                        <label htmlFor="title">Board Name</label>
                        <input 
                            type="text" 
                            id="title" 
                            placeholder="e.g Web design"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <p className="error_message">Can't be empty</p>}
                    </div>
                    <div className="board_columns_container">
                        <p className="label">Board Columns</p>
                        {
                            fields.map((field, index) => (
                                <div className={`column_group ${errors?.columns?.[index]?.name && "error"}`} key={field.id}>
                                    <input 
                                        type="text" 
                                        defaultValue="Todo" 
                                        {...register(`columns.${index}.name`, { required: true })}
                                    />
                                    {errors.columns?.[index]?.name && <p className="error_message">Can't be empty</p>}

                                    <button 
                                        className="remove_btn" 
                                        type="button"
                                        onClick={() => remove(index)}
                                    ></button>
                                </div>
                            ))
                        }
                        <button 
                            id="add_column_btn" 
                            type="button"
                            onClick={() => setValue("columns", [...getValues("columns"), {id: 0, name: ""}])}

                        >
                            + Add new Column
                        </button>
                    </div>
                    <button type="submit" id="save_changes_btn">Save Changes</button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default EditBoardModal;