import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { http } from '@services'
import { getUser } from '@helpers'

function UpdateProfilePic({ visible, setVisible, getSessions }) {

    const [user, setUser] = useState(null)

    const [file, setFile] = useState(null)

    useEffect(() => {
        setUser(getUser())
    }, [])

    async function updateProfilePicture() {

        const url = `user/PUT/update-profile-pic`;

        const form = new FormData()

        form.append('_id', user._id)
        form.append('file', file)

        const options = {
            method: "PUT",
            body: form,
        };

        const response = await http(url, options);
        console.log(response)

        if (response?.success) {
            message.success('Profile updated successfully')
            const data = JSON.stringify(response.info)
            localStorage.setItem('user', data)
            setVisible(false)
        }

        else message.error(response.message);

    }

    const onFinish = (values) => {
        console.log('success', values);
        console.log(file)
        updateProfilePicture(values)
    };

    return (
        <Modal
            visible={visible}
            title="Title"
            footer={[]}
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
                    name="file"
                    rules={[{ required: true, message: 'Please input profile picture!' }]}
                >
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file" />
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

export default UpdateProfilePic
