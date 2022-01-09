import React from 'react'
import { Form, Input, message } from 'antd';
import { CommonLayout } from '@components'
import { http } from '@services'
import { useNavigate } from 'react-router';

export default function Login() {

    const navigate = useNavigate()

    async function login(values) {
        const url = `admin/GET/login/${values.email}/${values.password}`;

        const response = await http(url);

        if (response?.success) {
            const data = JSON.stringify(response.info)
            sessionStorage.setItem("admin", data)
            message.success('Login successful')
            navigate("/admin")
        }
        else {
            message.error("Username or Password is incorrect");
        }
    }
    
    const onFinish = (values) => {
        console.log('Success:', values);
        login(values);
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
                            <h3 className="text-primary">Login</h3>
                            <p className="text-secondary">Login if you already have an account</p>
                        </div>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                            layout='vertical'
                            className="w-50"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ type: 'email', required: true, message: 'Please input your username!' }]}
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
                                <button
                                    className="px-4 btn btn-primary rounded-pill"
                                    type="primary"
                                    htmlType="submit"
                                >
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


