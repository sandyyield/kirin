
// import { TEST } from '../action_types'
import * as ActionTypes from '../action_types'

//直接用TS写法来的比较爽
// export const test = (data: any) => ({ type: ActionTypes.TEST, data }); 

interface ITest {
    // type: ActionTypes.TEST,
    type: ActionTypes.ActionTypeEnum.Test
    data: string
}

interface IDemo {
    type: ActionTypes.ActionTypeEnum.Demo,
    data: number | undefined
}

export type AllInterface = ITest | IDemo;

//假设约束data是字符串类型吧
export const Test = (data: string): ITest => ({ type: ActionTypes.ActionTypeEnum.Test, data });

//假设约束Demo action 的data 为number类型或undefined
export const Demo = (data: number | undefined): IDemo => ({ type: ActionTypes.ActionTypeEnum.Demo, data });


