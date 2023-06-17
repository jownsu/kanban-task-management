import { FC, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import "./nav.scss";

type NavProps = {
    onAddTaskClick: () => void;
    onEditBoard: () => void;
    onDeleteBoard: () => void;
};

const Nav:FC<NavProps> = (props) => {

    const { onAddTaskClick, onEditBoard, onDeleteBoard } = props;
    const [ show_action, setShowAction ] = useState(false);

    const handleEditClick = () => {
        setShowAction(false);
        onEditBoard();
    }

    const handleDeleteClick = () => {
        setShowAction(false);
        onDeleteBoard();
    }
    
    return (
        <nav>
            <span className="logo"></span>
            <h1>Platform Launch</h1>
            <button 
                type="button" 
                className="btn_primary btn_add"
                onClick={onAddTaskClick}
            >
                + Add New Task
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