import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { useParams } from 'react-router'
import { http } from '@services'
import { getUser } from '@helpers'

function CreateSessionModal({ visible, setVisible, getWorkSpaces }) {

    const [user, setUser] = useState(null)
    
    const [sessions, setSessions] = useState(null)

    const { workspaceId } = useParams()

    useEffect(() => {
        setUser(getUser())
    }, [])

    async function createSession(values) {

        const url = `user/POST/create-session`;

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        const response = await http(url, options);
        console.log(response)

        if (response?.success) {
            message.success(response.message)
            setVisible(false)
            getWorkSpaces()
        }

        else message.error(response.message);

    }

    const onFinish = (values) => {
        values.workSpaceId = workspaceId
        values.userId = user?._id
        console.log('creating session', values);
        createSession(values)
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
                    label="Session Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Sessions name!' }]}
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

export default CreateSessionModal
