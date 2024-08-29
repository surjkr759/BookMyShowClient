import { Input, Checkbox, Form, Button } from "antd"
import { useCallback, useState } from 'react'

import "../signin/style.css"
import { useSignUpUser } from "../../hooks/mutation/user"


const SignUpScreen = () => {
    const { mutateAsync: signUpUserAsync } = useSignUpUser();
    
    const handleFormSubmit = useCallback(async (values) => {
        const firstName = values.firstName
        const lastName = values.lastName
        const email = values.email
        const password = values.password

        await signUpUserAsync({ firstName, lastName, email, password })
    }, [signUpUserAsync])

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
      };

    return (
        <div className="signin-container">
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
                    label="First Name"
                    name="firstName"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your first name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your last name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

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

export default SignUpScreen