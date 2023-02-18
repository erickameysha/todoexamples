import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC, createTodolistTC, deleteTodolistTC, FilterValuesType, getTodolistTC,
    removeTodolistAC, TodolistDomainType,
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, createTaskTC,
    removeTaskAC,
    removeTasksTC, updateTaskTC, updateTaskTitleTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "./state/store";
import {TasksStatusesEnum, TaskType} from "./stories/todolists-api";
import {Todolist} from "./Todolist";



export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    useEffect(()=>{
        dispatch(getTodolistTC())
    },[])

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()



    const removeTask=useCallback (( todolistId: string,id: string,) =>{

        dispatch(removeTasksTC(id,todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTaskTC(title, todolistId))
    }, [dispatch])

    const changeStatus=useCallback(( todolistId: string, id: string,status: TasksStatusesEnum,)=> {
        dispatch(updateTaskTC(todolistId,id, {status} ))
    },[dispatch])

    const changeTaskTitle=useCallback((id: string, newTitle: string, todolistId: string)=> {
        dispatch(updateTaskTC(todolistId,id,  {title: newTitle},))
    },[dispatch])


   const changeFilter=useCallback((value: FilterValuesType, todolistId: string,)=> {

        dispatch(changeTodolistFilterAC(value, todolistId,))
    },[dispatch])

    const removeTodolist=useCallback((id: string)=> {

       dispatch(deleteTodolistTC(id))
        // dispatchTodo(action)

    },[dispatch])

    const changeTodolistTitle=useCallback((id: string, title: string)=> {

        dispatch(changeTodolistTitleTC(id, title))
    },[dispatch])

    const addTodolist = useCallback((title: string) => {

        dispatch(createTodolistTC(title))
        // dispatchTodo(action)
    }, [dispatch])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
