import { useState } from "react";
import Nav from "./assets/components/nav/nav";
import SideBar from "./assets/components/side_bar/side_bar";

function App() {

    const [show_sidebar, setShowSidebar] = useState(false);

    const toggleSideBar = () => {
        setShowSidebar(prevState => !prevState);
    }

    return (
        <>
            <Nav active={show_sidebar} />
            <SideBar active={show_sidebar} onToggleShow={toggleSideBar}/>
        </>

)
}

export default App;
