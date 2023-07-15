/* React */
import { 
    useState, 
    useEffect
}                       from "react";

/* Components */
import Nav              from "./components/nav/nav";
import SideBar          from "./components/side_bar/side_bar";
import Board            from "./components/board/board";
import AddTaskModal     from "./modals/add_task/add_task.modal";
import AddBoardModal    from "./modals/add_board/add_board.modal";
import EditBoardModal   from "./modals/edit_board/edit_board.modal";
import DeleteBoardModal from "./modals/delete_board/delete_board.modal";
import TaskDetailsModal from "./modals/task_details/task_details.modal";
import EditTaskModal    from "./modals/edit_task/edit_task.modal";
import DeleteTaskModal  from "./modals/delete_task/delete_task.modal";

function App() {

    const [show_sidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        const dark_mode = localStorage.getItem("dark_mode");
        if(dark_mode === "true"){
            document.body.className = "dark";
        }
    }, []);

    return (
        <>
            <div id="kanban" className={show_sidebar ? "active" : ""}>
                <Nav onToggleNav={() => setShowSidebar(prevState => !prevState)} />
                <SideBar onToggleShow={() => setShowSidebar(prevState => !prevState)} />
                <Board />
                <div className="overlay" onClick={() => setShowSidebar(false)}></div>
            </div>
            <AddTaskModal />
            <AddBoardModal />
            <EditBoardModal />
            <DeleteBoardModal />
            <TaskDetailsModal />  
            <EditTaskModal />
            <DeleteTaskModal />
        </>
    )
}

export default App;
