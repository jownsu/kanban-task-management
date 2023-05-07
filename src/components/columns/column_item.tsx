import { FC } from "react";
import TaskList from "../tasks/task_list";
import { Columns } from "../../models/board.model";

import "./columns.scss";

type ColumnProps = {
    column: Columns
};

const ColumnItem: FC<ColumnProps> = (props) => {
    const { column } = props;
    const {name, tasks} = column;
    return (
        <li>
            <div className={`column_item_name item-${column.name}`}>
                {name} ({tasks.length})
            </div>
            <TaskList tasks={tasks}/>
        </li>
    );
};

export default ColumnItem;