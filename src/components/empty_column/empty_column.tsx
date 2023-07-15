/* Redux */
import { useAppDispatch } from "../../store/store";
import { toggleModal }    from "../../store/features/modal_slice";

/* CSS */
import "./empty_column.scss";


const EmptyColumn = () => {

    const dispatch = useAppDispatch();

    return (
        <div className="empty_column">
            <p>This board is empty. Create a new column to get started.</p>
            <button 
                type="button" 
                className="btn_primary"
                onClick={() => dispatch(toggleModal({name: "edit_board", value: true}))}
            >
                + Add New Column
            </button>
        </div>
    )
};

export default EmptyColumn;