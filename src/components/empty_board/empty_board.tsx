import "./empty_board.scss";

const EmptyBoard = () => {
    return (
        <div className="empty_board">
            <p>This board is empty. Create a new column to get started.</p>
            <button type="button" className='btn_primary'>+ Add New Column</button>
        </div>
    )
};

export default EmptyBoard;