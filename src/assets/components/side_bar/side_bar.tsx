import { FC } from "react";
import Form from "react-bootstrap/Form";

import "./side_bar.scss";

const SideBar:FC<{active: boolean; onToggleShow: () => void}> = (props) => {
    
    const { active, onToggleShow } = props;
    
    return (
        <aside className={active ? "active" : ""}>
            <span className="logo"></span>
            <p>All Boards (3)</p>
            <ul>
                <li className="active">
                    <button type="button">Platform Launch</button>
                </li>
                <li>
                    <button type="button">Marketing Plan</button>
                </li>
                <li>
                    <button type="button">Roadmap</button>
                </li>
                <li className="create_board">
                    <button type="button">+ Create New Board</button>
                </li>
            </ul>
            <div className="theme">
                <span className="light_icon"></span>
                <Form.Check 
                    type="switch"
                    id="theme_switch"
                />
                <span className="dark_icon"></span>
            </div>
            <button 
                type="button" 
                className="btn_hide"
                onClick={onToggleShow}
            >
                Hide Sidebar
            </button>
            <button 
                type="button" 
                className="btn_show"
                onClick={onToggleShow}
            ></button>
        </aside>
    )
}

export default SideBar;