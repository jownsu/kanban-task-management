import "./empty_column.scss";

const EmptyColumn = () => {
    return (
        <div className=".empty_column">
            <p>This board is empty. Create a new column to get started.</p>
            <button type="button" className='btn_primary'>+ Add New Column</button>
        </div>
    )
};

export default EmptyColumn;