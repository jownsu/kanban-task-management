/* React */
import { FC, useState }            from "react";

/* Plugins */
import { OverlayTrigger, Popover } from "react-bootstrap";

/* Redux */
import { useAppDispatch }          from "../../store/store";
import { toggleModal }             from "../../store/features/modal_slice";

/* CSS */
import "./nav.scss";

type NavProps = {
    onToggleNav: () => void;
};

const Nav:FC<NavProps> = (props) => {

    const { onToggleNav } = props;
    const dispatch = useAppDispatch();
    const [ show_action, setShowAction ] = useState(false);

    const handleEditClick = () => {
        setShowAction(false);
        dispatch(toggleModal({name: "edit_board", value: true}));
    }

    const handleDeleteClick = () => {
        setShowAction(false);
        dispatch(toggleModal({name: "delete_board", value: true}))
    }
    
    return (
        <nav>
            <span className="logo"></span>
            <h1 onClick={onToggleNav}>Platform Launch <span className="toggle_icon"></span></h1>
            <button 
                type="button" 
                className="btn_primary btn_add"
                onClick={() => dispatch(toggleModal({name: "add_task", value: true}))}
            >
                <span>+ Add New Task</span>
            </button>
            <OverlayTrigger 
                trigger="click"
                placement="bottom"
                show={show_action}
                defaultShow={false}
                rootClose
                onToggle={() => setShowAction(prevState => !prevState)}
                overlay={
                    <Popover className="action_popover">
                        <Popover.Body>
                            <button 
                                type="button" 
                                className="btn_edit"
                                onClick={handleEditClick}
                            >
                                Edit Board
                            </button>
                            <button 
                                type="button" 
                                className="btn_delete"
                                onClick={handleDeleteClick}
                            >
                                Delete Board
                            </button>
                        </Popover.Body>
                    </Popover>
                }
            >
                <button type="button" className="menu"></button>
            </OverlayTrigger>
        </nav>
    );
};

export default Nav;