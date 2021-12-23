import React, { useState } from 'react'
import { Col, Row, Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router'
import { http } from '@services';
import './loginSectionStyles.css'

export default function AdminLogin() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const onFinish = values => {
        setLoading(true)
        login(values)
    };

    async function login(values) {
        
        const url = `admin/login`;

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        const response = await http(url, options);

        if (response?.success) {
            const data = JSON.stringify(response.info)
            sessionStorage.setItem("user", data)
            setLoading(false)
            message.success("Loged in successfully")
            navigate("/admin")
        }
        else {
            message.error("Username or Password is incorrect");
            setLoading(false)
        }
    }


    return (
        <div id="admin-login-background" style={{ height: window.innerHeight }}>
            <div className="login-layer">
                <Row>
                    <Col lg={9} md={12} sm={6} xs={1} />
                    <Col lg={6} md={12} sm={6} xs={22} >
                        <div className="login-card">
                            <h1 className="login-head">Log In</h1>
                            <Form
                                name="basic"
                                layout="vertical"
                                initialValues={{
                                    remember: true
                                }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!'
                                        }
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
                                            message: 'Please input your password!'
                                        }
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item>
                                    <Button loading={loading} type="primary" htmlType="submit" block>
                                        Log In
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col lg={3} md={12} sm={6} xs={1} />
                </Row>
            </div>
        </div>
    )
}


