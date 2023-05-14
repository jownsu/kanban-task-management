import { useState, useEffect, ChangeEvent } from "react";

/* Components */
import Nav from "./components/nav/nav";
import SideBar from "./components/side_bar/side_bar";
import Board from "./components/board/board";
import AddNewTaskModal from "./modals/add_new_task.modal";

function App() {

    const [show_sidebar, setShowSidebar] = useState(true);
    const [show_add_task_modal, setShowAddTaskModal] = useState(false);

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

    const toggleSideBar = () => {
        setShowSidebar(prevState => !prevState);
    }

    return (
        <>
            <div id="kanban" className={show_sidebar ? "active" : ""}>
                <Nav 
                    handleAddTaskClick={() => setShowAddTaskModal(true)}
                />
                <SideBar 
                    onToggleShow={toggleSideBar}
                    onThemeSwitch={themeSwitch}
                />
                <main>
                    <Board />
                </main>
            </div>
            <AddNewTaskModal 
                is_show={show_add_task_modal}
                handleClose={() => setShowAddTaskModal(false)}
            />
        </>
    )
}

export default App;
