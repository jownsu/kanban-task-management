import { useState, useEffect, ChangeEvent } from "react";

/* Components */
import Nav from "./components/nav/nav";
import SideBar from "./components/side_bar/side_bar";
import Board from "./components/board/board";
import AddTaskModal from "./modals/add_task/add_task.modal";
import EditTaskModal from "./modals/edit_task/edit_task.modal";
import AddBoardModal from "./modals/add_board/add_board.modal";
import EditBoardModal from "./modals/edit_board/edit_board.modal";

function App() {

    const [show_sidebar, setShowSidebar] = useState(true);
    const [show_add_task_modal, setShowAddTaskModal] = useState(false);
    const [show_edit_task_modal, setShowEditTaskModal] = useState(false);
    const [show_add_board_modal, setShowAddBoardModal] = useState(false);
    const [show_edit_board_modal, setShowEditBoardModal] = useState(false);

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
                    onAddTaskClick={() => setShowAddTaskModal(true)}
                    onEditBoard={() => setShowEditBoardModal(true)}
                />
                <SideBar 
                    onToggleShow={() => setShowSidebar(prevState => !prevState)}
                    onThemeSwitch={themeSwitch}
                    onCreateBoardClick={() => setShowAddBoardModal(true)}
                />
                <main>
                    <Board />
                </main>
            </div>
            <AddTaskModal 
                is_show={show_add_task_modal}
                handleClose={() => setShowAddTaskModal(false)}
            />
            <EditTaskModal
                is_show={show_edit_task_modal}
                onClose={() => setShowEditTaskModal(false)}
            />
            <AddBoardModal 
                is_show={show_add_board_modal}
                handleClose={() => setShowAddBoardModal(false)}
            />
            <EditBoardModal 
                is_show={show_edit_board_modal}
                handleClose={() => setShowEditBoardModal(false)}
            />
        </>
    )
}

export default App;
