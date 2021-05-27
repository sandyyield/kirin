import React from "react";

//尽量用lamda方式来来coding吧  react的支持还算不错
// 外部引用调试尽量跟验证的特性保持一致 这里可能是比较长的一个复用组件
//语言说明保持尽量简洁,基本就是Tips 后续整理的时候再精简一波


//#region interface相关 

//https://www.tslang.cn/docs/handbook/interfaces.html
export interface Person {
    name: string;
    age?: number;
    sex?: Array<boolean>;
}


//1.React.FC 指定函数组件组件
// export const InterfaceDemo: React.FC<Person> = ({???}) => {
export const InterfaceDemo: React.FC<any> = () => {

    React.useEffect(() => {
        // prompt(`name:${a}\nage:${age + 10000}\nsex${sex}`);
        console.log(`hello`);
    }); //这里监听个空数组 防止多次hooks

    return (
        <h1> InterfaceDemo </h1>
    );
}

//1.React.FC 
export const InterfaceDemo2: React.FC<Person> = (props) => {

    //useState hooks方式替代初始化组件内state
    //外面还是会传一个props进来 TS比较严格是好事
    const [name, setName] = React.useState(props.name);

    React.useEffect(() => {
        //这个a式props中的a
        console.log("here is useEffect", props);
        console.log("name:", name);
    }, [name, props]); //监听组件内部状态 一般情况下别忘了监听外部props状态

    const handleClick = (): void => {
        setName(`${Date.now()}`);
    }

    return (
        <div>
            <h1>InterfaceDemo2</h1>
            <button onClick={handleClick}>click me</button>
        </div>
    );
}

//设置InterfaceDemo2组件的默认props
InterfaceDemo2.defaultProps = {
    name: "tom",
    age: 9527,
    sex: [true, false]
}


//比较下interface的差距
export const InterfaceDemo3: React.FC<any> = (props) => {


    const printLabel = (labelobj: { label: string }): void => {
        let a = labelobj.label;
        console.log(a);
    }

    const handleClick = () => printLabel(myObj);

    let myObj = { size: 10, label: "Size 10 Object" };

    React.useEffect(() => {
    }, [props])
    return (
        <>
            <button onClick={handleClick}>click</button>
        </>
    )
}






//#endregion

