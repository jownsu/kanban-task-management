/* Plugins */
import { Modal }                  from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form"

/* Redux */
import { 
    useAppDispatch, 
    useAppSelector 
}                                 from "../../store/store";
import { AddBoard }               from "../../models/board.model";
import { addBoard }               from "../../store/features/board_slice";
import { toggleModal }            from "../../store/features/modal_slice";

/* CSS */
import "./add_board.modal.scss";

const AddBoardModal = () => {

    const { add_board } = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();

    const { 
        register, 
        handleSubmit,
        watch, 
        reset, 
        setValue,
        getValues,
        formState: { errors }, 
    } = useForm({
        defaultValues: {
            board_name: "",
            columns_name: ["Todo", "Doing"]
        }
    });

    const columns_name = watch("columns_name");

    const handleDeleteColumn = (index: number) => {
        setValue(`columns_name`, columns_name.filter((_, column_index) => {
            return column_index !== index;
        }));
    }

    const onSubmit:SubmitHandler<AddBoard> = (form_data) => {
        dispatch(addBoard(form_data));
        reset();
        dispatch(toggleModal({name: "add_board", value:false}));
    }

    return (
        <Modal 
            show={add_board}
            onHide={() => dispatch(toggleModal({name: "add_board", value:false}))}
            centered
            id="add_board_modal"
        >
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="title">Add New Board</p>
                    <div className={`input_group ${errors.board_name && "error"}`}>
                        <label htmlFor="title">Name</label>
                        <input 
                            type="text" 
                            id="title" 
                            placeholder="e.g Web design"
                            {...register("board_name", {required: true})}
                        />
                        {errors.board_name && <p className="error_message">Can't be empty</p>}
                    </div>
                    <div className="board_columns_container">
                        <p className="label">Columns</p>
                        {
                            columns_name.map((_, column_index) => (
                                <div className={`column_group ${errors?.columns_name?.[column_index] && "error"}`}>
                                    <input 
                                        type="text" 
                                        defaultValue="Todo" 
                                        {...register(`columns_name.${column_index}`, { required: true })}
                                    />
                                    {errors.columns_name?.[column_index] && <p className="error_message">Can't be empty</p>}

                                    <button 
                                        className="remove_btn" 
                                        type="button"
                                        onClick={() => handleDeleteColumn(column_index)}
                                    ></button>
                                </div>
                            ))
                        }
                        <button 
                            id="add_column_btn" 
                            type="button"
                            onClick={() => setValue("columns_name", [...getValues("columns_name"), ""])}
                        >
                            + Add new Column
                        </button>
                    </div>
                    <button type="submit" id="create_board_btn">Create New Board</button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default AddBoardModal;