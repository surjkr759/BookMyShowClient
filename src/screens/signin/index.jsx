import { Input, Checkbox, Form, Button } from "antd"
import { useCallback, useState } from 'react'

import "./style.css"
import { useSigninUser } from "../../hooks/mutation/user"

const SignInScreen = () => {
    const { mutateAsync: signInUserAsync } = useSigninUser();
    //Important: Above fn name by default is mutateAsync. You can rename it like above

    const handleFormSubmit = useCallback(async (values) => {
        const email = values.email
        const password = values.password

        await signInUserAsync({ email, password })
    }, [signInUserAsync])


    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
      };

    return (
        <div className="signin-container">
            {/* <form onSubmit={handleFormSubmit} className="form-container">
                <label htmlFor="email">Email Address</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" required />
                <label htmlFor="password" style={{marginTop: "20px"}}>Password</label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
                <Button htmlType="submit" disabled={!email || !password} type="primary">Sign In</Button>
            </form> */}
            <Form
                name="basic"
                labelCol={{
                        span: 8,
                    }}
                wrapperCol={{
                        span: 16,
                    }}
                style={{
                        maxWidth: 600,
                    }}
                initialValues={{
                        remember: true,
                    }}
                onFinish={handleFormSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </div>
        
    )
}

export default SignInScreen