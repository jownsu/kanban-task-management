import { useState, useEffect, ChangeEvent } from "react";
import Nav from "./assets/components/nav/nav";
import SideBar from "./assets/components/side_bar/side_bar";
import EmptyBoard from "./assets/components/empty_board/empty_board";

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
                <EmptyBoard />
            </main>
        </div>
    )
}

export default App;
