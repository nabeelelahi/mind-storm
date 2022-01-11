import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { http } from '@services'
import { getUser } from '@helpers'

function AddParticipantModal({ visible, setVisible, workSpaceDetails }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(getUser())
    }, [])

    async function addParticipant(values) {

        const url = `user/PUT/add-participant/${values.email}`;

        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(workSpaceDetails),
        };

        const response = await http(url, options);
        console.log(response)

        if (response?.success) {
            message.success(response.message);
            setVisible(false)
        }

        else message.error(response.message);

    }

    const onFinish = (values) => {
        addParticipant(values)
    };

    return (
        <Modal
            visible={visible}
            title="Title"
            footer={[]}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Please input Participants Email!' }]}
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

export default AddParticipantModal
