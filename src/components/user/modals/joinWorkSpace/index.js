import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { http } from '@services'
import { getUser } from '@helpers'

function JoinWorkSpaceModal({ visible, setVisible, getSessions }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(getUser())
    }, [])

    async function joinWorkSpace(values) {

        values.userEmail = user.email
        values.userName = user.name
        values.file = user.file

        const url = `user/PUT/join-workspace`;

        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        const response = await http(url, options);
        console.log(response)

        if (response?.success) {
            setVisible(false)
            getSessions()
        }

        else message.error(response.message);

    }

    const onFinish = (values) => {
        console.log('success', values);
        joinWorkSpace(values)
    };

    return (
        <Modal
            visible={visible}
            title="Title"
            footer={[]}
            onCancel={() => setVisible(false)}
        >
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >
                <Form.Item
                    label="Work Space Id"
                    name="_id"
                    rules={[{ required: true, message: 'Please input Work Space Id!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default JoinWorkSpaceModal
