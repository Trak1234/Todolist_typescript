import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {getTargetTypeAndSelection} from "@testing-library/user-event/dist/types/event/selection/getTargetTypeAndSelection";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            // let copyState = {...state}
            // delete  copyState[action.id]
            // return copyState
            let {[action.id]: [], ...rest} = state
            return rest
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}

let object = {a: 1, b: 2, c: 3}

let {b , ...newObject} = object
newObject = {
    a: 1, c: 3
}