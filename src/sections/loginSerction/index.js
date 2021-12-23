import React, { useState } from 'react'
import { Col, Row, Form, Input, message, Button } from 'antd'
import { useNavigate } from 'react-router'
import { http } from '@services';
import { Link } from 'react-router-dom'
import './loginSectionStyles.css'

export default function LoginSection() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const onFinish = values => {
        setLoading(true);
        login(values)
    };

    async function login(values) {
        
        const url = `login`;

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        const response = await http(url, options);

        if (response?.success) {
            const data = JSON.stringify(response.info)
            localStorage.setItem("user", data)
            setLoading(false)
            message.success("Loged in successfully")
            navigate("/")
        }
        else {
            message.error("User name or password is incorrect");
            setLoading(false)
        }
    }


    return (
        <div id="login-background">
            <div className="login-layer">
                <Row>
                    <Col lg={8} md={6} sm={5} xs={1} />
                    <Col lg={8} md={12} sm={14} xs={22} >
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
                            <p style={{textAlign: 'center'}}>
                                Don't have an account..? <Link to="/signup" style={{ color: "#2596be", fontWeight: 'bold' }} >Sign Up</Link>
                            </p>
                        </div>
                    </Col>
                    <Col lg={8} md={6} sm={5} xs={1} />
                </Row>
            </div>
        </div>
    )
}


