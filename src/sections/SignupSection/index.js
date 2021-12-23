import React, { useState } from 'react'
import { Col, Row, Form, Input, message, Button } from 'antd'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { http } from '@services';
import './signUpSectionStyles.css'

export default function SignUpSection() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const onFinish = values => {
        setLoading(true)
        values.type = 'user'
        signup(values)
    };

    async function signup(values) {

        const url = `register`;

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
            message.success("Account has been Created");
            navigate("/")

        }
        else {
            message.warn("This email is already in use of an Other Account");
            setLoading(false)
        }

    }


    return (
        <div id="signup-background">
            <div className="login-layer">
                <Row>
                    <Col lg={6} md={5} sm={3} xs={1} />
                    <Col lg={12} md={14} sm={18} xs={22} >
                        <div className="signup-card">
                            <h1 className="login-head">Sign Up</h1>
                            <Form
                                layout="vertical"
                                name="register"
                                onFinish={onFinish}
                                scrollToFirstError
                            >
                                <Row gutter={[16, 8]}>
                                    <Col lg={12} md={12} sm={24} xs={24}>
                                        <Form.Item
                                            name="name"
                                            label="Name"
                                            rules={[
                                                {
                                                    type: 'string',
                                                    message: 'The input is not valid Name!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your Name!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} md={12} sm={24} xs={24}>
                                        <Form.Item
                                            name="companyName"
                                            label="Company Name"
                                            rules={[
                                                {
                                                    type: 'string',
                                                    message: 'The input is not valid Company Name!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your Company Name!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} md={12} sm={24} xs={24}>
                                        <Form.Item
                                            name="country"
                                            label="Country"
                                            rules={[
                                                {
                                                    type: 'string',
                                                    message: 'The input is not valid Country Name!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your Country Name!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} md={12} sm={24} xs={24}>
                                        <Form.Item
                                            name="city"
                                            label="City"
                                            rules={[
                                                {
                                                    type: 'string',
                                                    message: 'The input is not valid City Name!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your City Name!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} md={12} sm={24} xs={24}>
                                        <Form.Item
                                            name="email"
                                            label="E-mail"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: 'The input is not valid E-mail!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your E-mail!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} md={12} sm={24} xs={24}>
                                        <Form.Item
                                            name="phone"
                                            label="Phone"
                                            rules={[
                                                {
                                                    type: 'string',
                                                    message: 'The input is not valid Phone!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your Phone!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} md={12} sm={24} xs={24}>
                                        <Form.Item
                                            name="password"
                                            label="Password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} md={12} sm={24} xs={24}>
                                        <Form.Item
                                            name="confirm"
                                            label="Confirm Password"
                                            dependencies={['password']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }

                                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={{ offset: 6, span: 12 }} md={{ offset: 6, span: 12 }} sm={24} xs={24}>
                                        <Form.Item >
                                            <Button loading={loading} type="primary" htmlType="submit" block>
                                                Sign Up
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <p style={{ textAlign: 'center' }}>
                                Already have an account..? <Link to="/login" style={{ color: "#2596be", fontWeight: 'bold' }} >Log in</Link>
                            </p>
                        </div>
                    </Col>
                    <Col lg={6} md={5} sm={3} xs={1} />
                </Row>
            </div>
        </div >
    )
}


