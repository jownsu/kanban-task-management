export interface Board {
    id: number,
    name: string,
    columns: Columns[],
}

export interface UpdateBoard {
    id: number,
    name: string,
    columns: UpdateColumns[]
}

export interface UpdateColumns {
    id: number,
    name: string
}

export interface Columns {
    id: number,
    name: string,
    tasks: Tasks[],
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

export const TasksInitialState = {
    id: 0,
    title: "",
    description: "",
    status: "",
    subtasks: []
}

export interface Subtasks {
    id: number,
    title: string,
    isCompleted: boolean
}