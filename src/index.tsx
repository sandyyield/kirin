import ReactDOM from 'react-dom';
import * as DemoCode from './demo_code'




ReactDOM.render(
    // <DemoCode.InterfaceDemo2 name={"tony"} age={1} />,
    <>
        {/* <DemoCode.SeniorTypesDemo x={9527}>12321</DemoCode.SeniorTypesDemo> */}
        <DemoCode.UnioTypesDemo />
        <br />
    </>,
    document.getElementById('root')
);