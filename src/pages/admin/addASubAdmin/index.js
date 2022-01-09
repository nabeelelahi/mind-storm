import React, { useState, useEffect } from 'react'
import { Typography, Form, Input, Button, Row, Col, Select, message, Checkbox } from 'antd';
import { useNavigate } from 'react-router'
import { http } from '@services'
import { AdminLayout } from '@components'
import './addSubAdmin.css'

const { Title } = Typography

const { Option } = Select

export default function AddProducts() {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(null);

    // form details

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    async function registerAdmin(values) {

        const url = `admin/POST/sub-admin`;

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        const response = await http(url, options);

        if (response?.success) {
            message.success(response.message);
        }

        else message.error('Something went wrong');

    }

    async function onFinish(values) {
        console.log(values);
        registerAdmin(values);

    }

    return (
        <AdminLayout>
            <Title className="admin-headings">Add New Sub Admin</Title>
            <div className="add-sub-submit">
                <div className="add-sub-admin-form">
                    <Form
                        form={form}
                        name="nest-messages"
                        onFinish={onFinish}
                        layout="vertical"
                        validateMessages={validateMessages}
                    >
                        <Row gutter={[32, 4]}>
                            <Col span={24}>
                                <Form.Item name='name' label="Name" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name='email' label="Email" rules={[{ type: 'email',required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name='password' label="Password" rules={[{ required: true }]}>
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </AdminLayout>
    )
}