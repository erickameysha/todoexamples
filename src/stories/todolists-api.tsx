import axios from "axios";

const setting = {
    withCredentials: true,
    headers: {
        "API-KEY": "ad653c9f-7f6e-4de5-b3d6-ac286fa8078e"
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...setting
})
export type TodolistsType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number,
    items: TaskType[]

}
type UpdateTaskModuleType= {
    title: string
    description: string
    status: number
    priority:number
    startDate:string
    deadline: string
}
export const todolistsAPI = {
    getTodolist() {
        return instance.get<TodolistsType>('todo-lists', setting)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistsType }>>('todo-lists', {title}, setting)
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`, setting)
    },
    updateTodolistTitle(todolistID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title}, setting)
    },
    getTasks(todolistID: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistID}/tasks`, setting)
    },
    deleteTask(todolistID: string, taskID:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`, setting)
    },
    createTask(todolistID: string,title: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistID}/tasks`, {title}, setting)
    },
 updateTask(todolistID: string,taskID: string, module: UpdateTaskModuleType) {
        return instance.put(`todo-lists/${todolistID}/tasks/${taskID}`, module, setting)
    },

}