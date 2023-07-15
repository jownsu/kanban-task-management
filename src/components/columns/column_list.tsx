/* Redux */
import { 
    useAppSelector,
    useAppDispatch
}                         from "../../store/store";
import { toggleModal }    from "../../store/features/modal_slice";

/* Components */
import ColumnItem         from "./column_item";
import EmptyColumn        from "../empty_column/empty_column";

/* CSS */
import "./columns.scss";

const ColumnList = () => {
    const dispatch = useAppDispatch();
    const { board } = useAppSelector(state => state.board);

    return (
            (board?.columns?.length < 1)
                ? <EmptyColumn />
                : (
                    <ul className="column_list">
                        {
                            board.columns.map((column_item, column_index) => (
                                <ColumnItem 
                                    key={column_index} 
                                    column={column_item} 
                                />
                            ))
                        }
                        <li className="new_column">
                            <button 
                                type="button" 
                                onClick={() => dispatch(toggleModal({name: "edit_board", value: true}))}
                            >
                                + New Column
                            </button>
                        </li>
                    </ul>
                )
    );
}

export default ColumnList;