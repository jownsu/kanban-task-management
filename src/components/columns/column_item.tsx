/* React */
import { FC }      from "react";

/* Components */
import TaskList    from "../tasks/task_list";
import { Columns } from "../../models/board.model";

/* CSS */
import "./columns.scss";

type ColumnProps = {
    column: Columns
};

const ColumnItem: FC<ColumnProps> = (props) => {
    const { column } = props;
    const {name, tasks, id} = column;
    return (
        <li>
            <div className={`column_item_name item-${name}`}>
                {name} ({tasks.length})
            </div>
            <TaskList tasks={tasks} column={{id, name}}/>
        </li>
    );
};

export default ColumnItem;