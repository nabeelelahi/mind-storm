import React, { useState, useEffect } from 'react'
import { Form, Input, Select, message } from 'antd';
import { Layout } from '@components'
import { getUser } from '@helpers'
import { http } from '@services'
import "./createWorkSpace.css"

const { Option } = Select


export default function CreateWorkSpace() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(getUser())
    },[])

    async function postWorkSpace(values) {

        const url = `user/POST/create-work-space/${user?._id}`;

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

    const onFinish = (values) => {
        console.log('Success:', values);
        postWorkSpace(values)
    };


    return (
        <Layout>
            <div className="create-workspace w-100 d-flex justify-content-center align-items-center">
                <div className="create-workspace-row w-75 d-flex justify-content-center">
                    <div className="bg-white w-50 shadow d-flex flex-column justify-content-evenly align-items-center">
                        <div className="text-center">
                            <h3 className="text-primary">Create New Work Space</h3>
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
                            {/* <Form.Item
                                label="Category"
                                name="category"
                                rules={[{ required: true, message: 'Please input your phone!' }]}
                            >
                                <Select defaultValue="XYZ" className="input">
                                    <Option value="XYZ">XYZ</Option>
                                    <Option value="ABC">ABC</Option>
                                    <Option value="MNO">MNO</Option>
                                    <Option value="GHI">GHI</Option>
                                </Select>
                            </Form.Item> */}
                            <Form.Item
                                label="Discription"
                                name="discription"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input.TextArea className="input" />
                            </Form.Item>
                            <Form.Item>
                                <button className="px-4 btn btn-primary rounded-pill" type="primary" htmlType="submit">
                                    Submit
                                </button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


