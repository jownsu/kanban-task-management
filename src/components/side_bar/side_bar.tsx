/* React */
import { 
    useEffect, 
    useState, 
    FC, 
    ChangeEvent 
}                           from "react";

/* Plugisn */
import Form                 from "react-bootstrap/Form";

/* Redux */
import { 
    useAppSelector, 
    useAppDispatch 
}                           from "../../store/store";
import { toggleModal }      from "../../store/features/modal_slice";

/* Components */
import { setActiveBoard }   from "../../store/features/board_slice";

/* CSS */
import "./side_bar.scss";

type SideBarProps = {
    onToggleShow: () => void;
};

const SideBar: FC<SideBarProps> = (props) => {
    
    const { onToggleShow } = props;

    const [dark_theme, setDarkTheme] = useState(false);
    const { boards, active_board } = useAppSelector(state => state.board);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const dark_mode = localStorage.getItem("dark_mode");
        if(dark_mode === "true"){
            setDarkTheme(true);
        }
    }, []);

    const themeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked){
            document.body.className = "dark";
            localStorage.setItem("dark_mode", "true");

        }
        else{
            document.body.className = "";
            localStorage.setItem("dark_mode", "false");
        }
    }

    const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDarkTheme(prevState => !prevState);
        themeSwitch(event);
    };

    return (
        <aside>
            <span className="logo"></span>
            <p>All Boards ({boards.length})</p>
            <ul>
                {
                    boards.map((board_item) => (
                        <li key={board_item.id} className={active_board === board_item.id ? "active" : ""}>
                            <button 
                                type="button" 
                                onClick={() => dispatch(setActiveBoard({board_id: board_item.id}))}
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
                        onClick={() => dispatch(toggleModal({name: "add_board", value: true}))}
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