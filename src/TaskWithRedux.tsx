import React, {ChangeEvent, memo} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";

import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TasksStatusesEnum, TaskType} from "./stories/todolists-api";


export type TaskPropsType = {
    task: TaskType
todolistID:string
}
const TaskWithRedux = memo(({task,todolistID}: TaskPropsType) => {

    // console.log('task')
    let {id,status,title} = {...task}

    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(id,todolistID))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
      dispatch( changeTaskStatusAC(id, newIsDoneValue ? TasksStatusesEnum.Complete : TasksStatusesEnum.New,todolistID));
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue,todolistID));
    }

    return <div key={task.id}  className={status === TasksStatusesEnum.Complete ? "is-done" : ""}>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
        <Checkbox
            checked={status === TasksStatusesEnum.Complete}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler}/>

    </div>

});

export default TaskWithRedux;