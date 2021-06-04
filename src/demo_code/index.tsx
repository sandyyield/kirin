// import { worker } from "cluster";
// import React from "react";
import React, { FC, useEffect, useState } from "react";

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
        let jim = new Employee();
        let sally = new Manager();
        let mark = new Worker();
        let fred = new Sales();
        let jane = new Engineer();

        let set = { jim, sally, mark, fred, jane };

        console.log({ ...set });


        // console.log(mark);



    }

    return (
        <>
            <h1 onClick={handle}>prototypical</h1>
        </>
    );
}





//#endregion

//#region  this 指向问题  参考https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/

export const FunctionAboutThis: React.FC<{}> = () => {

    interface Card {
        suit: string;
        card: number;
    }

    interface Deck {
        suits: Array<string>;
        cards: Array<number>;
        createCardPicker(this: Deck): () => Card; //这种方式提前指定this为Deck类型
    }


    let deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function (this: Deck) { //这种情况this 是any状态
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard) / 13;
                // console.log(`typeof this : ${typeof(this)}`);
                return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
            }
        }
    }

    const handleClick = () => {
        let pickedCard = deck.createCardPicker()();
        console.log(`card: ${pickedCard.card} , of ${pickedCard.suit}`);
    }


    return (
        <h1 onClick={handleClick}>FunctionAboutThis</h1>
    );
}


//this参数在回调函数里  //这个例子后面再回过来看 暂时用不到封装库
export const FunctionAboutThis2: React.FC<{}> = () => {


    // interface UIElement {
    //     addClickListener(onClick: (this: void, e: Event) => void): void;
    // }

    // class Handler {
    //     info: any;
    //     onClickBad(this: Handler, e: Event){
    //         this.info = e;
    //     }
    // }

    // let h = new Handler();

    // UIEvent

    const handleClick = () => {

    }

    return (
        <h1 onClick={handleClick}>FunctionAboutThis2</h1>
    );
}

//重载
export const FunctionAboutThis3: React.FC<{}> = () => {

    // let suits = ["hearts", "spades", "clubs", "diamonds"];

    //传统的js重载(当然要去掉这个any 这里为了过TS的语法 直接用js应该去掉这个any)
    // function pickCard(x: any): any {

    //     if (typeof x == "object") {
    //         return Math.floor(Math.random() * x.length);
    //     }
    //     else if (typeof x == "number") {
    //         let pickedSuit = Math.floor(x / 13);
    //         return { suit: suits[pickedSuit], card: x % 13 };
    //     }
    // }

    //TS 的重载 需要预先声明   但是这里好像有点问题  后面再讨论重载这种情况吧
    // interface SuitObj {
    //     suit: string;
    //     card: number;
    // }
    // function pickCard(x: Array<SuitObj>): number;
    // function pickCard(x: number): number;

    // function pickCard(x): any {

    //     if (typeof x == "object") {
    //         return Math.floor(Math.random() * x.length);
    //     }
    //     else if (typeof x == "number") {
    //         let pickedSuit = Math.floor(x / 13);
    //         return { suit: suits[pickedSuit], card: x % 13 };
    //     }
    // }

    // let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
    // let pickedCard1 = myDeck[pickCard(myDeck)];
    // alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

    // let pickedCard2 = pickCard(15);
    // alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);


    // let suits = ["hearts", "spades", "clubs", "diamonds"];


    // interface obj {
    //     suit: string; card: number;
    // }


    // function pickCard(x: Array<obj>): number;
    // function pickCard(x: number): { suit: string; card: number; };



    // let pickCard2 : (x: string | number | Array<string>) => any;



    //关于匿名函数的重载   TODO...探究下是语法问题还是本身就不支持
    // function pickCard(): any {
    // const p: any => (x: any)  = (x) => {
    // const pickCard: any = (x: any) => {
    // const pickCard: (x: any) => any = x => {


    //     // Check to see if we're working with an object/array
    //     // if so, they gave us the deck and we'll pick the card
    //     if (typeof x == "object") {
    //         let pickedCard = Math.floor(Math.random() * x.length);
    //         return pickedCard;
    //     }
    //     // Otherwise just let them pick the card
    //     else if (typeof x == "number") {
    //         let pickedSuit = Math.floor(x / 13);
    //         return { suit: suits[pickedSuit], card: x % 13 };
    //     }
    // }

    // let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
    // let pickedCard1 = myDeck[pickCard(myDeck)];
    // alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

    // let pickedCard2 = pickCard(15);
    // alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);











    return (
        <h1>FunctionAboutThis3</h1>
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


    //params方式接受形参  剩余参数的运用
    const add: (...vvvvv: number[]) => number = (...v) => {
        console.log('aaa', v);
        let ans: number = 0;
        v.map(i => ans += i);
        return ans;
    }

    const handle = () => {
        // z = add(20)(30);
        // console.log(z);

        console.log('handle : ', add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10) + z)
    }

    return (
        <h1 onClick={handle}>FunctionDemo3</h1>
    );

}



//#endregion

//#region  generics 
//泛型
export const GenericsDemo: React.FC<{}> = () => {



    //定义泛型签名
    // const identityFunc: <T>(arg: T) => T = function identity<T>(arg: T) { return arg; }
    //可以 改为用签名对象的方式定义
    // const identityFunc: { <T>(arg: T): T } = function identity<T>(arg: T) { return arg; }

    //签名对象抽象成泛型接口
    // interface IIdentityFunc {
    //     <T>(arg: T): T
    // }

    //泛型接口跟进一步
    interface IIdentityFunc<T> {
        (arg: T): T
    }
    const identityFuncWithInterface: IIdentityFunc<number | string> = function identity<T>(p: T) { return p; }

    interface IIdentityFunc2<T> {
        ans: (p: T) => T;
    }
    const identityFuncWithInterface2: IIdentityFunc2<number> = { ans: (p) => p }




    console.log(`identityFuncWithInterface : ${typeof identityFuncWithInterface("is string") == "number" ? "number" : "string"}`);
    console.log(`identityFuncWithInterface2 : ${identityFuncWithInterface2.ans(12345.68)}`);

    // console.log(identityFunc<string>("hahaha"));
    // console.log(identityFunc2<string>("hhhh2"));



    // interface GenericNumber<T> {
    //     zeroValue: T;
    //     add: (x: T, y: T) => T;
    // }

    //泛型类
    class GenericNumberCls<T>{
        //TypeScript 2.7引入了一个新的控制严格性的标记 --strictPropertyInitialization，确保每个实例的属性都会初始值 所以必须加割! 
        zeroValue!: T;
        add!: (x: T, y: T) => T
    }

    let myGenericNumber = new GenericNumberCls<number>();
    myGenericNumber.zeroValue = 19527;
    myGenericNumber.add = (x, y) => x + y;

    let stringNumeric = new GenericNumberCls<string>();
    stringNumeric.zeroValue = "zero";
    stringNumeric.add = (x, y) => `string:${x} + ${y}`;

    console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
    console.log(myGenericNumber.add(myGenericNumber.zeroValue, 9527));



    //泛型约束
    interface LengthWise {
        length: number;
    }

    const loggingIdentity: <T extends LengthWise>(arg: T) => T = (arg) => { console.log(arg.length); return arg }


    // console.log(loggingIdentity(3)) //定义了泛型约束 没有length属性过不了类型检查
    console.log(loggingIdentity([1, 2, 3, 12]));
    return (
        <h1>GenericsDemo</h1>
    );
}

//#endregion


//#region enum



export const EnumDemo: React.FC<{}> = () => {

    // enum Direction {
    //     Up,
    //     Down,
    //     Left,
    //     Right
    // }

    enum E {
        x = 2
    }

    const handle = () => {
        // console.log(Direction.Up);

        let a = E.x;
        console.log(E[a]);

    }



    return (
        <h1 onClick={handle}>EnumDemo</h1>
    );
}


//#endregion

//#region 类型推断
export const TypeDemo: React.FC<{}> = () => {

    // let x = [0,1,null]; //类型推断算法推断为 number | null
    // x.push("123") //error 


    // window.onmousedown = function (e: any) {
    //     console.log("mouse down -->", e.button);
    // }








    return (
        <>
            <h1>TypeDemo</h1>
            <button>TypeDome</button>
        </>
    );
}


//#endregion

//#region 类型兼容性


export const TypeDemo2: React.FC<{}> = () => {

    // interface Named{
    //     name:string;
    // }

    // class Person{
    //     name!: string;
    // }


    // let p:Named;

    // p = new Person();

    // let x : Named;
    // let y = {name:"hello",location:"123"};
    // x = y; //因为y包含了x 约束的interface Named 所以这里类型检查不出错   : 原理是是递归检查所有约束接口的类型,不检查约束接口之外的


    // console.log(x);



    //函数参数双向协变
    // enum EventType {
    //     Mouse,
    //     Keyboard
    // }

    // interface Event { timestamp: number }
    // interface MouseEvent extends Event { x: number, y: number }
    // interface KeyEvent extends Event { keyCode: number };

    // const listenEvent = (eventType: EventType, handler: (n: Event) => void)
    // {
    //     //...
    // }

    //类型别名  好像跟c++里面的结构体类似?
    // type Name = string;
    // type NameResolver = () => string;
    // type NameOrResolver = Name | NameResolver;
    // function getName(n: NameOrResolver): Name {
    //     if (typeof n === 'string') {
    //         return n;
    //     }
    //     else {
    //         return n();
    //     }
    // }

    // let count = 0;
    // const handle = () => {
    //     if (count++ % 2 === 0) {
    //         console.log(getName(() => `${count}`));
    //     }
    //     else {
    //         console.log(getName(`${count * 100}`));
    //     }
    // }


    //字面量约束Easing的值  
    type Easing = "a" | "b" | "c";

    // let f: (x: Easing) => number;//= (x) => 9527;
    const handle = () => {

        // f("a"); 
        //f("aa")  error

        let res = ((x: Easing): number => 9527)("b")
        console.log(res);


    }






    return (
        <h1 onClick={handle}>TypeDemo2</h1>
    );
}




export const TypeDemo3 = () => {

    const [count, setcount] = React.useState(0)
    useEffect(() => {
        console.log('parent change:', count)
    }, [count])
    // React.useEffect(() => setcount(i => {
    //     if (i < 100) {
    //         console.log(i);
    //         const timer = setInterval(() => {
    //             // debugger
    //             i++;
    //         }, 500)
    //         // debugger
    //         return () => {
    //             clearInterval(timer)
    //         }
    //     }
    //     return i;
    // }), [count]);

    // const handle = () => {
    //     setcount(i => i + 1);
    //     console.log(count);
    // }

    // return (
    //     <h1 onClick={handle}>TypeDemo3</h1>
    // );

    return (
        <>
            <h1 onClick={() => setcount(() => count + Math.floor(Math.random() * 10))}>click</h1>
            <SeniorTypesDemo x={count}>12321</SeniorTypesDemo>
        </>
    )
}




//#endregion

//#region 高级类型

export const SeniorTypesDemo: React.FC<{ x: number }> = (p) => {

    let [count, setCount] = useState(0);

    useEffect(() => {
        console.log('effect', count, p);
    }, [count, p]);

    console.log(`props is : ${p}`);



    const handle = () => {

        setCount(() => {
            return count + Math.floor(Math.random() * 100)
        });

    }


    return (
        <h1 onClick={handle}>SeniorTypesDemo</h1>

    );
}

//#endregion

//#region  Union Types

export const UnioTypesDemo: FC<{}> = () => {

    //number | string 联合连携  number & string 交叉类型
    const padLeft: (x: string, y: number | string | Array<number>) => string = (v, p) => {
        //TS中用typeof断言类型 能直接启用类型保护检查
        if (typeof p === "number") {
            return Array(p + 1).join(" ") + v;

        }
        if (typeof p === "string") {
            return p + v;
        }
        console.log(p instanceof Array);
        if (typeof p === "object") {
            return "123123";
        }
        console.log('err');
        throw new Error('error');

    }

    // padLeft("Hello world", 4); // returns "    Hello world"
    // padLeft("hello,world", true); // 编译阶段通过，运行时报错 ps:非联合类型情况 联合类型 编译阶段直接检查出来了
    padLeft("hhhh", [1, 2, 4]);



    interface Bird {
        fly: () => void;
        layEggs: () => void;
    }

    interface Fish {
        swim: () => void;
        layEggs: () => void;
    }

    function getSmallPet(): Fish | Bird {
        // ...
        return { fly: () => console.log("fly"), layEggs: () => console.log("bird layeggs") };
    }

    // 类型保护与区分类型（Type Guards and Differentiating Types）

    // const isFish(pet:Fish | Bird):pet is Fish{
    //     return ()
    // }

    let pet = getSmallPet();
    pet.layEggs();
    //这种方式 TSX不认  所以要用as的方式
    // if ((<Fish>pet).swim) {
    //     (<Fish>pet).swim();
    // }

    if ((pet as Fish).swim) {
        (pet as Fish).swim();
    }


    //每一个成员访问都会

    return (
        <h1>UnioTypesDemo</h1>
    );
}


//#endregion



//#region IndexTypes //这个好像是一个不错的语法糖

export const IndexTypesDemo: React.FC<{}> = () => {

    // function pluck1<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    //     return names.map(n => o[n]);
    // }

    const pluck: <T, K extends keyof T>(a: T, b: K[]) => T[K][] = (o, names) => names.map(n => o[n]);

    interface Person {
        name: string;
        age: number;
    }

    let person: Person = { name: 'tom', age: 35 };

    let strings: string[] = pluck(person, ['name']); //这里编译器会检查是否为Person的一个属性

    strings.map(i => console.log(i));


    return (
        <h1>IndexTypesDemo</h1>
    );
}


//#endregion


//#region Symbols

export const SymbolsDemo = () => {

    //Symbols是不可改变且唯一的。
    let sym = Symbol();

    let obj = {
        [sym]: "value"
    }

    // console.log(obj[sym]);


    return (
        <h1>SymbolsDemo</h1>
    );
}

//#endregion


//#region Decorators

const DecoratorsDemo = () => {
    const sealed = (target: any) => console.log(`Decorators log is ${target}`);

    @sealed
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    // @sealed
    // function Gfc() {
    //     const greet = () => {
    //         return "hello,this is gfc";
    //     }
    // }


    return <h1>DecoratorsDemo</h1>
}



//#endregion



