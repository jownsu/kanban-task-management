import { useState, useEffect, ChangeEvent } from "react";
import Nav from "./components/nav/nav";
import SideBar from "./components/side_bar/side_bar";
import Board from "./components/board/board";

function App() {

    const [show_sidebar, setShowSidebar] = useState(true);

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
        <div id="kanban" className={show_sidebar ? "active" : ""}>
            <Nav />
            <SideBar 
                onToggleShow={toggleSideBar}
                onThemeSwitch={themeSwitch}
            />
            <main>
                <Board />
            </main>
        </div>
    )
}

export default App;
