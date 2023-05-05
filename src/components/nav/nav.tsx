import "./nav.scss";

const Nav = () => {
    return (
        <nav>
            <span className="logo"></span>
            <h1>Platform Launch</h1>
            <button type="button" className="btn_primary btn_add">+ Add New Task</button>
            <button type="button" className="menu"></button>
        </nav>
    )
}

export default Nav;