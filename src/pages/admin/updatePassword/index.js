import React, { useEffect, useState } from 'react'
import { Col, Row, Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router'
import { http } from '@services';

export default function UpdatePassword() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    
    const [admin, setAdmin] = useState(null)

    const onFinish = values => {
        setLoading(true)
        updatePassword(values)
    };

    async function updatePassword(values) {

        const url = `admin/PATCH/update-password/${admin._id}`;

       
        const options = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        };

        const response = await http(url, options);

        if (response?.success) {
            const data = JSON.stringify(response.info)
            setLoading(false)
            message.success("Password Updated")
            navigate("/admin")
        }
        else {
            setLoading(false)
        }
    }

    async function checkForAmin() {
        let currentUser = await JSON.parse(sessionStorage.getItem("user"))

        setAdmin(currentUser)

        if (currentUser?.type !== "admin") navigate("/admin/login")
    }

    // useEffect(() => {
    //     checkForAmin()
    // }, [])


    return (
        <div id="admin-login-background" style={{ height: window.innerHeight }}>
            <div className="login-layer">
                <Row>
                    <Col lg={9} md={12} sm={6} xs={1} />
                    <Col lg={6} md={12} sm={6} xs={22} >
                        <div className="password-card">
                            <h1 className="login-head">Update Password</h1>
                            <Form
                                name="basic"
                                layout="vertical"
                                initialValues={{
                                    remember: true
                                }}
                                onFinish={onFinish}
                            >
                                <Row>
                                    <Col lg={24} md={24} sm={24} xs={24}>
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
                                    <Col lg={24} md={24} sm={24} xs={24}>
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
                                </Row>
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


