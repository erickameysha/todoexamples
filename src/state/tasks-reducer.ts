import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsActionType
} from './todolists-reducer';
import {
    TasksPrioritiesEnum,
    TasksStatusesEnum,
    TaskType,
    todolistsAPI,
    UpdateTaskModuleType
} from "../stories/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK'
    taskId: string
    todolistId: string
    module: UpdateDomainTaskModuleType
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

export type ActionsType =     SetTodolistsActionType|
    RemoveTaskActionType
    | AddTaskActionType
 | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType<typeof setTasksAC>;


const initialState:TasksStateType = {}
export const tasksReducer = (state:TasksStateType= initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            // const stateCopy = {...state};
            // const tasks = stateCopy[action.todolistId];
            // const newTask:TaskType = {
            //     id: v1(),
            //     title: action.title,
            //     status: TasksStatusesEnum.New,
            //     todoListId: action.todolistId,
            //     startDate: '',
            //     deadline: '',
            //     order: 1,
            //     addedDate: '',
            //     priority: TasksPrioritiesEnum.Low,
            //     description: '',
            //     completed: false
            // };
            // const newTasks = [newTask, ...tasks];
            // stateCopy[action.todolistId] = newTasks;
            // return stateCopy;
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], action.task]
            }
        }
        case 'CHANGE-TASK': {
debugger
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t=> t.id===action.taskId? {...t,  ...action.module}:t)
            };
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t=> t.id===action.taskId? {...t, title: action.title}:t)
            };
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};

            stateCopy[action.todolist.id] = [];

            return stateCopy;
        }
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
        case "SET-TASKS":{
            return {...state,[action.todolistID]: action.tasks }
        }

        default:
       return state
    }
}

export const removeTaskAC = (taskId: string,
                             todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId }
}
export const addTaskAC = (task: TaskType,
                          todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', task,todolistId}as const
}
export const updateTaskAC = (taskId: string,
                                   module: UpdateDomainTaskModuleType,
                                   todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK', module, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string,
                                   title: string,
                                   todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks:TaskType[],todolistID:string) => {
    return { type: 'SET-TASKS',  tasks,todolistID}as const
}



export const getTasksTC = (todolistID:string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistID)
        .then((res) => {
            dispatch(setTasksAC(res.data.items,todolistID))
        })
}
export const removeTasksTC = (id: string, todolistId: string) => (dispatch: Dispatch) => {

    todolistsAPI.deleteTask( todolistId,id,)
        .then((res) => {
            dispatch(removeTaskAC(id,todolistId))
        })
}

export const createTaskTC = (title: string,
                          todolistId: string) => (dispatch: Dispatch) => {

    todolistsAPI.createTask(todolistId, title,)
        .then((res) => {

            dispatch(addTaskAC(res.data.data.item, todolistId))
        })
}
type UpdateDomainTaskModuleType = {
    title?: string
    description?: string
    status? : number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistID: string, taskID: string, domainModel: UpdateDomainTaskModuleType) =>{
    return (dispatch: Dispatch, getState: ()=> AppRootStateType) =>{

        const task = getState().tasks[todolistID].find((t)=> t.id ===taskID)
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
            .then((res)=>{
                dispatch(updateTaskAC(taskID, domainModel, todolistID))
            })
        }

    }
}




