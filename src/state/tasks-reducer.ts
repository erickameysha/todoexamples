import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskType, todolistsAPI, UpdateTaskModuleType} from "../stories/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


export type ActionsType =
    SetTodolistsActionType
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType<typeof setTasksAC>;


const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t=> t.id !== action.taskId)
            };
        }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [action.task,...state[action.todolistId]]
            }

        case 'CHANGE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.module} : t)
            };

        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            };
        }
        case 'ADD-TODOLIST':
            return {...state,  [action.todolist.id]: []};

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "SET-TASKS":
            return {...state, [action.todolistID]: action.tasks}


        default:
            return state
    }
}

export const removeTaskAC = (taskId: string,
                             todolistId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (task: TaskType,
                          todolistId: string) => {
    return {type: 'ADD-TASK', task, todolistId} as const
}
export const updateTaskAC = (taskId: string,
                             module: UpdateDomainTaskModuleType,
                             todolistId: string) => {
    return {type: 'CHANGE-TASK', module, todolistId, taskId} as const
}
export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}
export const setTasksAC = (tasks: TaskType[], todolistID: string) => {
    return {type: 'SET-TASKS', tasks, todolistID} as const
}


export const getTasksTC = (todolistID: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTasks(todolistID)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistID))
        })
}
export const removeTasksTC = (id: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {

    todolistsAPI.deleteTask(todolistId, id,)
        .then((res) => {
            dispatch(removeTaskAC(id, todolistId))
        })
}

export const createTaskTC = (title: string,
                             todolistId: string) => (dispatch: Dispatch<ActionsType>) => {

    todolistsAPI.createTask(todolistId, title,)
        .then((res) => {

            dispatch(addTaskAC(res.data.data.item, todolistId))
        })
}

export const updateTaskTC = (todolistID: string, taskID: string, domainModel: UpdateDomainTaskModuleType) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistID].find((t) => t.id === taskID)
        if (task) {
            let module: UpdateTaskModuleType = {
                title: task.title,
                deadline: task.deadline,
                description: task.description,
                startDate: task.startDate,
                priority: task.priority,
                status: task.status,
                ...domainModel

            }

            todolistsAPI.updateTask(todolistID, taskID, module)
                .then((res) => {
                    dispatch(updateTaskAC(taskID, domainModel, todolistID))
                })
        }

    }
}
type UpdateDomainTaskModuleType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}



