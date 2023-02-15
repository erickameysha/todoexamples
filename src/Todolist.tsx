import React, {memo, useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import TaskWithRedux from "./TaskWithRedux";
import {TasksStatusesEnum, TaskType} from "./stories/todolists-api";
import {FilterValuesType} from "./state/todolists-reducer";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string,) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TasksStatusesEnum, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id,), [props.changeFilter,props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id,), [props.changeFilter,props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id,), [props.changeFilter,props.id]);

    let tasks = props.tasks

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.status ===TasksStatusesEnum.New);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.status === TasksStatusesEnum.Complete);
    }

    return <div>
        <h3>
            <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    return <TaskWithRedux
                        todolistID={props.id}
                        key={t.id}
                        task={t}

                    />
                })
            }
        </div>
        <div>

            <ButtonWithMemo
                title={'All'}
                color={'inherit'}
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
            />
            <ButtonWithMemo
                title={'Active'}
                color={'primary'}
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
            />     <ButtonWithMemo
                title={'Completed'}
                color={'secondary'}
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
            />

        </div>
    </div>
})

type ButtonWithMemoPropsType = {
    title: string
    onClick: () => void
    variant: 'text' | 'outlined' | 'contained',
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',

}
const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    console.log('render:' +  props.title)
    return (

        <Button variant={props.variant}

                onClick={props.onClick}
                color={props.color}
        >{props.title}
        </Button>
    )
})

