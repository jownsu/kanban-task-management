/* Plugins */
import { Modal }          from "react-bootstrap";

/* Redux */
import { 
    useAppDispatch, 
    useAppSelector 
}                         from "../../store/store";
import { deleteBoard }    from "../../store/features/board_slice";
import { toggleModal }    from "../../store/features/modal_slice";

/* CSS */
import "./delete_board.modal.scss";

const DeleteBoardModal = () => {
    const { delete_board } = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();


    const onDelete = () => {
        dispatch(deleteBoard());
        dispatch(dispatch(toggleModal({name: "delete_board", value:false})));
    }

    return (
        <Modal
            show={delete_board}
            onHide={() => dispatch(toggleModal({name: "delete_board", value:false}))}
            centered
            id="delete_board_modal"
        >
            <Modal.Body>
                <p className="title">Delete this board?</p>
                <p className="desc">Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
                <div className="action_container">
                    <button 
                        type="button" 
                        className="delete_board_btn"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                    <button 
                        type="button" 
                        className="cancel_btn" 
                        onClick={() => dispatch(toggleModal({name: "delete_board", value:false}))}
                    >
                        Cancel
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteBoardModal;