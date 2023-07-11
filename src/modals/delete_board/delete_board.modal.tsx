/* React */
import { FC }             from "react";

/* Plugins */
import { Modal }          from "react-bootstrap";

/* Redux */
import { useAppDispatch } from "../../store/store";
import { deleteBoard }    from "../../store/features/board_slice";

/* CSS */
import "./delete_board.modal.scss";

type DeleteBoardProps = {
    is_show: boolean;
    onHide: () => void;
};

const DeleteBoardModal:FC<DeleteBoardProps> = (props) => {
    const { is_show, onHide } = props;
    const dispatch = useAppDispatch();

    const onDelete = () => {
        dispatch(deleteBoard());
        onHide();
    }

    return (
        <Modal
            show={is_show}
            onHide={onHide}
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
                        onClick={onHide}
                    >
                        Cancel
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteBoardModal;