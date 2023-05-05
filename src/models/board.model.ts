export interface Board {
    name: string,
    columns: Columns[],
}

export interface Columns {
    name: string,
    tasks: Tasks[],
}

export interface Tasks {
    title: string,
    description: string,
    status: string,
    subtasks: Subtasks[]
}

export interface Subtasks {
    title: string,
    isCompleted: boolean
}