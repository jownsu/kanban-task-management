import { FC } from "react";
import "./nav.scss";

type NavProps = {
    handleAddTaskClick: () => void;
};

const Nav:FC<NavProps> = (props) => {

    const { handleAddTaskClick } = props;

    return (
        <nav>
            <span className="logo"></span>
            <h1>Platform Launch</h1>
            <button 
                type="button" 
                className="btn_primary btn_add"
                onClick={handleAddTaskClick}
            >
                + Add New Task
            </button>
            <button type="button" className="menu"></button>
        </nav>
    );
};

export default Nav;