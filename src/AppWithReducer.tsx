import React, {Reducer, useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import {
    ActionsType, addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TasksPrioritiesEnum, TasksStatusesEnum, TaskType,} from "./stories/todolists-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodo] = useReducer<Reducer<Array<TodolistDomainType>, ActionsType>>(todolistsReducer, [
        {
            id: todolistId1, title: "What to learn", filter: "all", addedDate: '',
            order: 0
        },
        {
            id: todolistId2, title: "What to buy", filter: "all", addedDate: '',
            order: 0
        }
    ])

    let [tasks, dispatchTask] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                id: v1(), title: "HTML&CSS", status: TasksStatusesEnum.Complete,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                order: 1,
                addedDate: '',
                priority: TasksPrioritiesEnum.Low,
                description: '',
                completed: false
            },
            {
                id: v1(), title: "JS", status: TasksStatusesEnum.Complete,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                order: 1,
                addedDate: '',
                priority: TasksPrioritiesEnum.Low,
                description: '',
                completed: false
            }
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk",  status: TasksStatusesEnum.InProgress,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                order: 1,
                addedDate: '',
                priority: TasksPrioritiesEnum.Low,
                description: '',
                completed: false},
            {id: v1(), title: "React Book", status: TasksStatusesEnum.InProgress,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                order: 1,
                addedDate: '',
                priority: TasksPrioritiesEnum.Low,
                description: '',
                completed: false}
        ]
    });


    function removeTask(id: string, todolistId: string) {
        dispatchTask(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchTask(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, status: TasksStatusesEnum, todolistId: string) {
        dispatchTask(changeTaskStatusAC(id, status, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchTask(changeTaskTitleAC(id, newTitle, todolistId))
    }


    function changeFilter(value: FilterValuesType, todolistId: string,) {

        dispatchTodo(changeTodolistFilterAC(value, todolistId,))
    }

    function removeTodolist(id: string) {

        let action = removeTodolistAC(id)
        dispatchTask(action)
        dispatchTodo(action)

    }

    function changeTodolistTitle(id: string, title: string) {

        dispatchTodo(changeTodolistTitleAC(id, title))
    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatchTask(action)
        dispatchTodo(action)
    }


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
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status ===  TasksStatusesEnum.InProgress);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status ===  TasksStatusesEnum.Complete);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
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

export default AppWithReducer;
