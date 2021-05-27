import React from 'react';
import * as Antd from 'antd';
import CloseOutlined from "@ant-design/icons/CloseOutlined";

//??
import * as ActionTypes from '../redux/action_types'

export type TodoItemProps = {
    todo: ActionTypes.TODO_STATE;
    handleToogle: (todoId: string, done: boolean) => void;
    handleUpdate: (todoId: string, text: string) => Promise<void>;
    handleRemove: (todoId: string) => void;
}

// const TodoItem: React.FC<TodoItemProps> = props => {
//     const { todo, handleToogle, handleUpdate, handleRemove } = props;
//     //??为什么这里是false
//     const [updating, setUpdating] = React.useState(false);

//     const [text, setText] = React.useState(todo.text);

    

// }