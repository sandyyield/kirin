
//统一enum一下 action type
export const TEST = 'test';
export type TEST = typeof TEST;

export const DEMO = 'demo';
export type DEMO = typeof DEMO;

export const TODO_STATE = 'todo_state';
export type TODO_STATE = typeof TODO_STATE;

export enum ActionTypeEnum {
    Test = "test",
    Demo = "demo",
    TODO_STATE = "todo_state"
}
