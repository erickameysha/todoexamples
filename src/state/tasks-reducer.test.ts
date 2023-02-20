import {
    addTaskAC,
    changeTaskTitleAC,
    createTaskTC,
    removeTaskAC,
    tasksReducer, updateTaskAC, updateTaskTC
} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TasksPrioritiesEnum, TasksStatusesEnum} from "../stories/todolists-api";

let startState: TasksStateType


beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS",  status: TasksStatusesEnum.InProgress,
                todoListId:  "todolistId1",
                startDate: '',
                deadline: '',
                order: 1,
                addedDate: '',
                priority: TasksPrioritiesEnum.Low,
                description: '',
                completed: false},
            {id: "2", title: "JS", status: TasksStatusesEnum.Complete,
                todoListId:  "todolistId1",
                startDate: '',
                deadline: '',
                order: 1,
                addedDate: '',
                priority: TasksPrioritiesEnum.Low,
                description: '',
                completed: false},
            {id: "3", title: "React", status: TasksStatusesEnum.InProgress,
                todoListId:  "todolistId1",
                startDate: '',
                deadline: '',
                order: 1,
                addedDate: '',
                priority: TasksPrioritiesEnum.Low,
                description: '',
                completed: false}

        ],
        "todolistId2": [
            {id: "1", title: "bread",
                status: TasksStatusesEnum.InProgress,
                todoListId:  "todolistId2",
                startDate: '',
                deadline: '',
                order: 1,
                addedDate: '',
                priority: TasksPrioritiesEnum.Low,
                description: '',
                completed: false},
            {id: "2", title: "milk", status: TasksStatusesEnum.Complete,
                todoListId:  "todolistId2",
                startDate: '',
                deadline: '',
                order: 1,
                addedDate: '',
                priority: TasksPrioritiesEnum.Low,
                description: '',
                completed: false},
            {id: "3", title: "tea",status: TasksStatusesEnum.InProgress,
                todoListId:  "todolistId2",
                startDate: '',
                deadline: '',
                order: 1,
                addedDate: '',
                priority: TasksPrioritiesEnum.Low,
                description: '',
                completed: false}
        ]
    };
})

test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
    //expect(endState["todolistId2"][0].id).toBe("1");
    //expect(endState["todolistId2"][1].id).toBe("3");

});

test('correct task should be added to correct array', () => {

    const action = createTaskTC("juce", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].completed).toBe(TasksStatusesEnum.New);
})

test('status of specified task should be changed', () => {


    const action = updateTaskAC("2",{status: TasksStatusesEnum.InProgress}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TasksStatusesEnum.InProgress);
    expect(endState["todolistId1"][1].status).toBe(TasksStatusesEnum.Complete);
});

test('title of specified task should be changed', () => {


    const action = updateTaskAC("2", {title:"Milkyway"}, "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Milkyway");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new property with new array should be added when new todolist is added', () => {

    const action = addTodolistAC("title no matter");
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});

test('propertry with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});




