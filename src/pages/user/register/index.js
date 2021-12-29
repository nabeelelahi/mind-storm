import React from 'react'
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router'
import { CommonLayout } from '@components'
import { http } from '@services'

export default function Register() {

    const navigate = useNavigate()

    async function register(values) {

        const url = `user/POST/register`;

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        const response = await http(url, options);

        if (response?.success) {
            message.success(response.message)
            navigate('/login')
        }

        else message.error('Something went wrong');

    }

    const onFinish = (values) => {
        console.log('Success:', values);
        register(values);
    };

    return (
        <CommonLayout>
            <div className="top-section">
                <div className="layer">
                </div>
            </div>
            <div className="login-section w-100 bg-white">
                <div className="container d-flex justify-content-center">
                    <div className="bg-light shadow login-card d-flex flex-column justify-content-center align-items-center">
                        <div className="text-center">
                        <h3 className="text-primary">Register</h3>
                        <p className="text-secondary">Register yourself if you don't have an account</p>
                        </div>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                            layout='vertical'
                            className="w-50"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input className="input" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
                            >
                                <Input className="input" />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone!' }]}
                            >
                                <Input className="input" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password className="input" />
                            </Form.Item>

                            <Form.Item>
                                <button className="px-4 btn btn-primary rounded-pill"type="primary" htmlType="submit">
                                    Submit
                                </button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </CommonLayout>
    )
}


