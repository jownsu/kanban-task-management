/* React */
import { 
    useState, 
    useEffect, 
    ChangeEvent 
}                       from "react";

/* Components */
import Nav              from "./components/nav/nav";
import SideBar          from "./components/side_bar/side_bar";
import Board            from "./components/board/board";
import AddTaskModal     from "./modals/add_task/add_task.modal";
import AddBoardModal    from "./modals/add_board/add_board.modal";
import EditBoardModal   from "./modals/edit_board/edit_board.modal";
import DeleteBoardModal from "./modals/delete_board/delete_board.modal";

function App() {

    const [show_sidebar, setShowSidebar] = useState(true);
    const [show_modal, setShowModal] = useState({
        add_task: false,
        add_board: false,
        edit_board: false,
        delete_board: false
    });

    const { add_task, add_board, edit_board, delete_board } = show_modal;


    const toggleModal = (modal: string, value: boolean) => {
        setShowModal(prevState => (
            {
                ...prevState,
                [modal]: value
            }
        ))
    }

    useEffect(() => {
        const dark_mode = localStorage.getItem("dark_mode");
        if(dark_mode === "true"){
            document.body.className = "dark";
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

    return (
        <>
            <div id="kanban" className={show_sidebar ? "active" : ""}>
                <Nav 
                    onAddTaskClick={() => toggleModal("add_task", true)}
                    onEditBoard={() => toggleModal("edit_board", true)}
                    onDeleteBoard={() => toggleModal("delete_board", true)}
                    onToggleNav={() => setShowSidebar(prevState => !prevState)}
                />
                <SideBar 
                    onToggleShow={() => setShowSidebar(prevState => !prevState)}
                    onThemeSwitch={themeSwitch}
                    onCreateBoardClick={() => toggleModal("add_board", true)}
                />
                <main>
                    <Board />
                </main>
                <div className="overlay" onClick={() => setShowSidebar(false)}></div>
            </div>
            <AddTaskModal 
                is_show={add_task}
                onHide={() => toggleModal("add_task", false)}
            />
            <AddBoardModal 
                is_show={add_board}
                onHide={() => toggleModal("add_board", false)}
            />
            <EditBoardModal 
                is_show={edit_board}
                onHide={() => toggleModal("edit_board", false)}
            />
            <DeleteBoardModal
                is_show={delete_board}
                onHide={() => toggleModal("delete_board", false)}
            />
        </>
    )
}

export default App;
