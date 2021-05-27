import React from 'react'
// import * as ReactRedux from 'react-redux'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './css/login.less'

// import * as Actions from '../../redux/actions'

/*
    登录页面
*/

//antd Form组件
const NormalLoginForm = () => {

    const onFinish = (values:any) => {
        message.success(`fetch request:${values.username} login`);
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                //声明式验证
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    { max: 12, message: 'username 必须小于等于12位' },
                    { min: 4, message: 'username 必须大于等于4位' },
                    { pattern: /^\w+$/, message: 'username 必须是字母,数字,下划线组成' }
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    { max: 12, message: 'password 必须小于等于12位' },
                    { min: 4, message: 'password 必须大于等于4位' },
                    { pattern: /^\w+$/, message: 'password 必须是字母,数字,下划线组成' }
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                {/* <a className="login-form-forgot" href="">
                                Forgot password
                            </a> */}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                            </Button>
                {/* Or <a href="">register now!</a> */}
            </Form.Item>
        </Form>
    )
}


const Login = () => {

    return (
        <div className='login'>
            <header>
                <h1>Kirin System</h1>
            </header>
            <section>
                <h1>用户登陆</h1>
                <NormalLoginForm />
            </section>
        </div>
    )
}

export default Login;

// export default ReactRedux.connect(
//     state => ({demo:state}),
//     {
//         test
//     }
// )(Login)





