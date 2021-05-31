import { worker } from "cluster";
import React from "react";

//尽量用lamda方式来来coding吧  react的支持还算不错
// 外部引用调试尽量跟验证的特性保持一致 这里可能是比较长的一个复用组件
//语言说明保持尽量简洁,基本就是Tips 后续整理的时候再精简一波


//#region interface 

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
//不带interface规范
export const InterfaceDemo3: React.FC<any> = (props) => {


    const printLabel = (labelobj: { label: string }): void => {
        let a = labelobj.label;
        console.log(a);
        //函数声明了变量 即使有其他参数,也没办法提示出来
        //但实际上还是会输出 参数对象里面有但是没有声明的东西
        console.log(labelobj);
    }

    //要全部数出来 直接用any就完事了
    //不过这种不太安全
    const printLabel2 = (labelobj: any): void => {
        let a = labelobj.label;
        console.log(a);
        console.log(labelobj, labelobj.size);
    }

    let count = 0;

    const handleClick = () => count++ % 2 === 0 ? printLabel(myObj) : printLabel2(myObj);

    let myObj = { size: 10, label: "Size 10 Object" };

    React.useEffect(() => {
    }, [props])
    return (
        <>
            <button onClick={handleClick}>InterfaceDemo3</button>
        </>
    )
}

//带interface
//tips: readonly和const类似,不过readonly一般是用在属性上(下面这个例子是接口的属性中定义),const是直接用在变量上
export const InterfaceDemo4: React.FC<any> = (props) => {

    //其实就是约定一下参数 统一写道一个地方就行
    interface IPrintLabel {
        label: string;
        barcode?: string | undefined;
        readonly size: number;
        arr?: ReadonlyArray<number>; //只包含只读方法的数组  好文明
    }
    let myObj: IPrintLabel = { size: 10, label: "Size 20 Object" };

    const printLabel = (labelobj: IPrintLabel): void => {
        let a = labelobj.label;
        let b = labelobj.barcode;

        console.log(a);
        console.log(b);
        // myObj.size++; readonly 只读属性

        // let arr = labelobj.arr;
        // arr?.push(9527);   error  没有push这类修改数组结构的方法 基本只有select类型的方法
        console.log(myObj);


    }

    const handleClick = () => printLabel(myObj);


    React.useEffect(() => {
    }, [props])
    return (
        <>
            <button onClick={handleClick}>InterfaceDemo4</button>
        </>
    )
}






//#endregion

//#region class 

//类的时候基本和c#一致, 包含getter setter类似的语法糖 抽象类
export const Greeter = class Greeter extends React.Component {

    handleClick = () => {
        console.log('hello');
    }

    render() {
        return (
            <h1 onClick={this.handleClick}>
                Greeter
            </h1>
        );
    };
}






//#endregion


// #region 闭包问题深入
//闭包demo
export const FunctionDemo1: React.FC<{}> = (): any => {

    const handleClick = (): any => {
        let name = "mozilla";
        const f = () => {
            alert(name);
        }
        f();
        name = "chrome";
        f();
    }

    // 内部的displayName 从外部返回
    // const handle = handleClick();



    //函数柯里化例子
    const makeAdder = (x: number) => (y: number) => (x + y)


    //add5 和 add10 即 所谓的闭包  感觉定义了一个带一些参数的匿名委托罢了
    let add5 = makeAdder(5);
    let add10 = makeAdder(10);


    console.log(add5(2));
    //另一种写法
    console.log(makeAdder(5)(2));

    console.log(add10(2));
    console.log(makeAdder(10)(2));






    return (
        <>
            <h1 onClick={handleClick}>FunctionDemo1</h1>
        </>
    );
}




export const FunctionDemo2: React.FC<{}> = () => {



    //闭包模拟私有方法
    // const counter = ((): any => {
    //     var privateCounter = 0;
    //     const changeBy = (val: number): void => { privateCounter += val; }

    //     return {
    //         increment: () => changeBy(1),
    //         decrement: () => changeBy(-1),
    //         value: () => (privateCounter)
    //     }
    // })();

    // console.log(counter.value());
    // counter.increment();
    // counter.increment();
    // console.log(counter.value());
    // counter.decrement();
    // console.log(counter.value());


    //等价上面这种  其实就是把函数执行开辟的入口地址记录下来  下次直接从这个地址等于原函数再次调用 而不是重新生成的函数作用域
    const counter = (): any => {
        var privateCounter = 0;
        const changeBy = (val: number): void => { privateCounter += val; }

        return {
            increment: () => changeBy(1),
            decrement: () => changeBy(-1),
            value: () => (privateCounter),
            val: " |-- val=" + privateCounter
        }
    };

    //这即是创建两个闭包 先决条件还是返回值是函数类型或含有函数类型
    //只能对函数进行闭包操作,值类型无法进行闭包操作
    const counter1 = counter();
    const counter2 = counter();

    console.log(counter1.value() + counter1.val);
    counter1.increment();
    counter1.increment();
    console.log(counter1.value() + counter1.val);
    counter1.decrement();
    console.log(counter1.value() + counter1.val);

    console.log(counter2.value() + counter2.val);
    counter2.increment();
    counter2.increment();
    console.log(counter2.value() + counter2.val);
    counter2.decrement();
    console.log(counter2.value() + counter2.val);



    return (
        <>
            <h1>.</h1>
        </>
    )
}
//#endregion


//#region 对象模型细节 原型链相关 先放一放 TS好像没有那么灵活

export const PrototypicalDemo: React.FC<{}> = () => {

    // interface IEmployee {
    //     name: string;
    //     dept: string;
    // }

    class Employee {
        name = "";
        dept = "general";
    }

    class Manager extends Employee {
        reports = [];
    }

    class Worker extends Employee {
        projects = [];
    }

    class Sales extends Worker {
        dept = "sales";
        quota = 100;
    }

    class Engineer extends Worker {
        dept = "engineer";
        machine = "";
    }




    // // let employee = new Employee();
    // // let manager = new Manager();
    // let employee = Object.create(Employee.prototype);
    // let manager = Object.create(Manager.prototype);




    // console.log(employee);
    // console.log(manager);

    // employee.name = "tom";


    const handle = () => {
        //new 操作符 过程  new 一个对象 然后把这个对象的prototype指向 相应对象的prototype(如Emplyee.prototype)
        //然后把此对象执行prototype object link 上的构造方法
        // let jim = new Employee();
        // let sally = new Manager();
        // let mark = new Worker();
        // let fred = new Sales();
        // let jane = new Engineer();


        // console.log(mark);



    }

    return (
        <>
            <h1 onClick={handle}>prototypical</h1>
        </>
    );
}





//#endregion


//#region  function
//TS对JS函数的拓展

export const FunctionDemo3: React.FC<{}> = () => {


    let z: number = 100;
    //柯里化
    // const add = (x: number) => (y: number): number => (x + y + z);
    //正常写法
    // const add = function (x: number, y: number) {
    //     return x + y + z;
    // }

    // add:(...:type,...:type.....) => type 这种写法叫做按上下文归类
    // 这种写法也同样能指定入参和回参的类型 然后函数本身不需要指定过多要素 
    // 适合迁移老的js代码到TS中来,但是注意老的js代码返回值类型有可能本身就不规范使用
    // const add:(v1:number,v2:number) => number = function (x,y) {
    //     return x + y + z;
    // }

    // 上述方法柯里化
    // const add: (v1: number, v2: number) => number = (x, y) => {
    //     return x + y + z;
    // }


    //params方式接受形参
    const add: (...vv: number[]) => number = (...v) => {
        console.log('aaa', v);
        let ans: number = 0;
        v.map(i => {
            ans += i
        });
        return ans;
    }

    const handle = () => {
        // z = add(20)(30);
        // console.log(z);

        console.log('handle : ', add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))
    }

    return (
        <h1 onClick={handle}>FunctionDemo3</h1>
    );

}



//#endregion
