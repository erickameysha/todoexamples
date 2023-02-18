import {v1} from 'uuid';
import {todolistsAPI, TodolistsType} from "../stories/todolists-api";
import {Dispatch} from "redux";
import {createTaskTC} from "./tasks-reducer";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistsType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionsType =
    SetTodolistsActionType |
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;
export type FilterValuesType = "all" | "active" | "completed";

const initialState: Array<TodolistDomainType> = []
export type TodolistDomainType = TodolistsType & {
    filter: FilterValuesType
}
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            const newTodolist:TodolistDomainType = {
                ...action.todolist, filter:'all'

            }
            return [newTodolist, ...state,]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistsType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist,}
}
export const changeTodolistTitleAC = (todolistId: string,
                                      title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const changeTodolistFilterAC = (filter: FilterValuesType,
                                       todolistId: string,): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistsType[]
}

export const setTodolistsAC = (todolists: TodolistsType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}
export const getTodolistTC = () => (dispatch: Dispatch) => {
    console.log(
        'getTodolistTC'
    )
    todolistsAPI.getTodolist()

        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const deleteTodolistTC = (id: string) => {
    return(dispatch: Dispatch)=> {
        todolistsAPI.deleteTodolist(id)
            .then((res)=> {
                dispatch(removeTodolistAC(id))
        })
    }

}
export const createTodolistTC = (title: string)=> (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res=> {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (todolistId: string,
                                      title: string)=> (dispatch: Dispatch) => {
    todolistsAPI.updateTodolistTitle( todolistId, title)
        .then(res=> {
            dispatch(changeTodolistTitleAC(todolistId,title))
        })
}