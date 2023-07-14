import { FC } from "react";
import "./empty_column.scss";

type EmptyColumnProps = {
    onAddClick: () => void;
}

const EmptyColumn:FC<EmptyColumnProps> = (props) => {
    const { onAddClick } = props;
    return (
        <div className="empty_column">
            <p>This board is empty. Create a new column to get started.</p>
            <button 
                type="button" 
                className="btn_primary"
                onClick={onAddClick}
            >
                + Add New Column
            </button>
        </div>
    )
};

export default EmptyColumn;