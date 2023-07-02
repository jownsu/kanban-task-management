import { useEffect, useState, FC, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../store/store";
import Form from "react-bootstrap/Form";

import "./side_bar.scss";
import { setActiveBoard } from "../../store/features/board_slice";

type SideBarProps = {
    onToggleShow: () => void;
    onThemeSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onCreateBoardClick: () => void;
};

const SideBar: FC<SideBarProps> = (props) => {
    
    const { onToggleShow, onThemeSwitch, onCreateBoardClick } = props;

    const [dark_theme, setDarkTheme] = useState(false);
    const { board, active_board } = useAppSelector(state => state.board);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const dark_mode = localStorage.getItem("dark_mode");
        if(dark_mode === "true"){
            setDarkTheme(true);
        }
    }, []);

    const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDarkTheme(prevState => !prevState);
        onThemeSwitch(event);
    };

    return (
        <aside>
            <span className="logo"></span>
            <p>All Boards ({board.length})</p>
            <ul>
                {
                    board.map((board_item) => (
                        <li key={board_item.id} className={active_board.id === board_item.id ? "active" : ""}>
                            <button 
                                type="button" 
                                onClick={() => dispatch(setActiveBoard({board: board_item}))}
                            >
                                <span className="board_icon"></span>
                                {board_item.name}
                            </button>
                        </li>
                    ))
                }
                <li className="create_board">
                    <button 
                        type="button" 
                        onClick={onCreateBoardClick}
                    >
                        <span className="board_icon"></span>
                        + Create New Board
                    </button>
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
                <span className="hide_icon"></span>
                Hide Sidebar
            </button>
            <button 
                type="button" 
                className="btn_show"
                onClick={onToggleShow}
            ></button>
        </aside>
    );
};

export default SideBar;