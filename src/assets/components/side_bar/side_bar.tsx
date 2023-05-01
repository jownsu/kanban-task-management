import { useEffect, useState, FC, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";

import "./side_bar.scss";


type SideBarProps = {
    onToggleShow: () => void;
    onThemeSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

const SideBar: FC<SideBarProps> = (props) => {
    
    const { onToggleShow, onThemeSwitch } = props;

    const [dark_theme, setDarkTheme] = useState(false);
    
    useEffect(() => {
        const dark_mode = localStorage.getItem("dark_mode");
        if(dark_mode === "true"){
            setDarkTheme(true);
        }
    }, []);

    const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDarkTheme(prevState => !prevState);
        onThemeSwitch(event);
    }

    return (
        <aside>
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
                    checked={dark_theme}
                    onChange={onThemeChange}
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