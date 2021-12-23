import React, { useState, useEffect } from 'react'
import { Typography, Form, Input, Button, Row, Col, Select, message, Checkbox } from 'antd';
import { useNavigate } from 'react-router'
import { http } from '@services'
import { AdminLayout } from '@components'
import './addSubAdmin.css'

const { Title } = Typography

const { Option } = Select

export default function AddProducts() {

    const navigate = useNavigate()

    const [form] = Form.useForm();

    const [categories, setCategories] = useState(null)

    const [image, setImage] = useState(null);

    const [files, setFiles] = useState(null);

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(null);

    async function getCategories() {
        const url = `user/GET/category`;

        const response = await http(url);

        if (response?.success) {
            setCategories(response.category)
        }
    }

    async function checkForAmin() {
        let currentUser = await JSON.parse(sessionStorage.getItem("user"))
        setUser(currentUser)

        if (currentUser?.type !== "admin") navigate("/admin/login")
    }

    useEffect(() => {
        getCategories()
        // checkForAmin()
    }, [])

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


    async function onFinish(values) {

        values.product.hidden = values.product.hidden ? true : false

        setLoading(true)

        const product = values.product

        let formData = new FormData()

        product.name !== undefined && formData.append("name", product.name)
        product.origin !== undefined && formData.append("origin", product.origin)
        product.fobPrice !== undefined && formData.append("fobPrice", product.fobPrice)
        product.cfrPrice !== undefined && formData.append("cfrPrice", product.cfrPrice)
        product.manufacturer !== undefined && formData.append("manufacturer", product.manufacturer)
        product.packing !== undefined && formData.append("packing", product.packing)
        product.shipment !== undefined && formData.append("shipment", product.shipment)
        product.loadingPort !== undefined && formData.append("loadingPort", product.loadingPort)
        product.quantity !== undefined && formData.append("quantity", product.quantity)
        product.paymentTerms !== undefined && formData.append("paymentTerms", product.paymentTerms)
        product.validity !== undefined && formData.append("validity", product.validity)
        product.categories !== undefined && formData.append("categories", product.categories)
        product.details !== undefined && formData.append("details", product.details)
        product.uses !== undefined && formData.append("uses", product.uses)
        product.applications !== undefined && formData.append("applications", product.applications)
        product.description !== undefined && formData.append("description", product.description)
        product.hidden !== undefined && formData.append("hidden", product.hidden)
        if (image) {
            for (const sendImages of image) {
                formData.append('images', sendImages, sendImages.name);
            }
        }
        if (files) {
            for (const sendFiles of files) {
                formData.append('files', sendFiles, sendFiles.name);
            }
        }

        const url = `admin/POST/new-product`;

        const options = {
            method: "POST",
            body: formData,
        };

        const response = await http(url, options);

        if (response?.success) {
            message.success("Product Added Successfully");
            setLoading(false)
            form.resetFields()

        }
        else {
            setLoading(false)
        }

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
                                <Form.Item name='product' label="Name" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name='email' label="Email" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name='phone' label="phone" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name='DoB' label="Date of Birth" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <Button loading={loading} type="primary" htmlType="submit">
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