export interface Board {
    id: number,
    name: string,
    columns: Columns[],
}

export interface AddBoard {
    board_name: string,
    columns_name: string[]
}

export interface UpdateBoard {
    id: number,
    name: string,
    columns: Column[]
}

export interface Columns {
    id: number,
    name: string,
    tasks: Tasks[],
}

export interface Column {
    id: number,
    name: string
}

export interface Tasks {
    id: number,
    title: string,
    description: string,
    status: string,
    subtasks: Subtasks[]
}

export interface NewTask {
    title: string,
    description: string,
    status: string,
    subtasks: String[]
}

export interface UpdateTask {
    id: number,
    title: string,
    description: string,
    status: Status,
    subtasks: Subtasks[]
}

export interface Status {
    id: number;
    name: string;
}

export interface Subtasks {
    id: number,
    title: string,
    isCompleted: boolean
}

/* INITIAL STATES */

export const TasksInitialState = {
    id: 0,
    title: "",
    description: "",
    status: "",
    subtasks: [{id : 0, title: "", isCompleted: false}]
}

export const ColumnInitialState = {
    id: 0,
    name: ""
}