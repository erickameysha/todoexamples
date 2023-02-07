import React, {useEffect, useState} from 'react'

import {todolistsAPI} from "./todolists-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const createTodolist = () => {

        todolistsAPI.createTodolist(title).then((res) => {

            setState(res.data)
        })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <div>
            <input type="text" placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <button onClick={createTodolist}> createTodolist</button>

        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<any>('')
 const deleteTodolist =() => {

        todolistsAPI.deleteTodolist(todolistID).then((res) => {
            setState(res.data)
        })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <div>
            <input type="text" placeholder={'todolistID'} value={todolistID} onChange={e => setTodolistID(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}> DeleteTodolist</button>

        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<any>('')
    const [title, setTitle] = useState<any>('')

 const updateTodolistTitle=() => {
        todolistsAPI.updateTodolistTitle(todolistID, title)
            .then((res) => {

                setState(res.data)
            })
    }
    return <div>
        <div>{JSON.stringify(state)}</div>
        <div>
            <input type="text" placeholder={'todolistID'} value={todolistID} onChange={e => setTodolistID(e.currentTarget.value)}/>
            <input type="text" placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolistTitle}> UpdateTodolistTitle</button>

        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<any>('')
    const getTasks=() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке


        todolistsAPI.getTasks(todolistID)
            .then((res) => {
                setState(res.data)
            })

    }
    return <div>
        <div>{JSON.stringify(state)}</div>
        <div>
            <input type="text" placeholder={'todolistID'} value={todolistID} onChange={e => setTodolistID(e.currentTarget.value)}/>
            <button onClick={getTasks}> getTasks</button>

        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<any>('')
    const [taskID, setTaskID] = useState<any>('')
   const deleteTask= () => {

        todolistsAPI.deleteTask(todolistID, taskID).then((res) => {
            setState(res.data)
        })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <div>
            <input type="text" placeholder={'todolistID'} value={todolistID} onChange={e => setTodolistID(e.currentTarget.value)}/>
            <input type="text" placeholder={'taskID'} value={taskID} onChange={e => setTaskID(e.currentTarget.value)}/>
            <button onClick={deleteTask}> UpdateTodolistTitle</button>

        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [todolistID, setTodolistID] = useState<any>('')
    const createTask = () => {

        todolistsAPI.createTask(todolistID,title).then((res) => {

            setState(res.data)
        })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <div>
            <input type="text" placeholder={'todolistID'} value={todolistID} onChange={e => setTodolistID(e.currentTarget.value)}/>
            <input type="text" placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}> createTask</button>

        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState<boolean>(false)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState('')
    const [deadline, setDeadline] = useState('')

    const [todolistID, setTodolistID] = useState<any>('')
    const [taskId, setTaskID] = useState<any>('')
    const createTask = () => {

        todolistsAPI.updateTask(todolistID,taskId, {
            deadline: '',
            title: title,
            description: description,
            priority: priority,
            status: status,
            startDate: ''

        }).then((res) => {

            setState(res.data)
        })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <div>
            <input type="text" placeholder={'todolistID'} value={todolistID} onChange={e => setTodolistID(e.currentTarget.value)}/>
            <input type="text" placeholder={'taskId'} value={taskId} onChange={e => setTaskID(e.currentTarget.value)}/>
            <input type="text" placeholder={'description'} value={description} onChange={e => setDescription(e.currentTarget.value)}/>
            {/*<input type="checkbox" placeholder={'todolistID'} value={completed} onChange={e => setCompleted(e. currentTarget.checked)}/>*/}
          <span>status</span>  <input type="number" placeholder={'status'} value={status} onChange={e => setStatus(+e.currentTarget.value)}/>
            priority  <input type="number" placeholder={'priority'} value={priority} onChange={e => setPriority(+e.currentTarget.value)}/>
            <input type="text" placeholder={'startDate'} value={startDate} onChange={e => setStartDate(e.currentTarget.value)}/>
            <input type="text" placeholder={'deadline'} value={deadline} onChange={e => setDeadline(e.currentTarget.value)}/>
            <input type="text" placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}> createTask</button>

        </div>
    </div>
}