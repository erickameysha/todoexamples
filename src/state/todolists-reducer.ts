import {todolistsAPI, TodolistsType} from "../stories/todolists-api";
import {Dispatch} from "redux";


const initialState: Array<TodolistDomainType> = []

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

            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            return  state.map(el=> el.id === action.id? {...el, title: action.title}: el)
        }
        case 'CHANGE-TODOLIST-FILTER': {

            return state.map(el=> el.id === action.id? {...el, filter: action.filter}: el);
        }
        default:
            return state
    }
}



export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist: TodolistsType) => {
    return {type: 'ADD-TODOLIST', todolist,} as const
}
export const changeTodolistTitleAC = (todolistId: string,
                                      title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId} as const
}
export const changeTodolistFilterAC = (filter: FilterValuesType,
                                       todolistId: string,) => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId} as const
}

export const setTodolistsAC = (todolists: TodolistsType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}




export const getTodolistTC = () => (dispatch: Dispatch<ActionsType>) => {
    console.log(
        'getTodolistTC'
    )
    todolistsAPI.getTodolist().then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const deleteTodolistTC = (id: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTodolist(id)
            .then((res) => {
                dispatch(removeTodolistAC(id))
            })
    }

}
export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolistTitle(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}




export type TodolistDomainType = TodolistsType & {
    filter: FilterValuesType
}
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ActionsType =
    SetTodolistsActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>;
export type FilterValuesType = "all" | "active" | "completed"

