import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TasksPrioritiesEnum, TasksStatusesEnum, TaskType} from "../stories/todolists-api";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    status: TasksStatusesEnum
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

export type ActionsType = RemoveTaskActionType | AddTaskActionType
 | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType;


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
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask:TaskType = {
                id: v1(),
                title: action.title,
                status: TasksStatusesEnum.New,
                todoListId: action.todolistId,
                startDate: '',
                deadline: '',
                order: 1,
                addedDate: '',
                priority: TasksPrioritiesEnum.Low,
                description: '',
                completed: false
            };
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
debugger
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t=> t.id===action.taskId? {...t, status: action.status}:t)
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

            stateCopy[action.todolistId] = [];

            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
       return state
    }
}

export const removeTaskAC = (taskId: string,
                             todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId }
}
export const addTaskAC = (title: string,
                          todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string,
                                   status: TasksStatusesEnum,
                                   todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string,
                                   title: string,
                                   todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

