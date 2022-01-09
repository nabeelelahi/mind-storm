import React, { useState, useEffect } from 'react'
import { Form, Input, message} from 'antd'
import { Layout } from '@components'
import { getUser } from '@helpers'
import { EditOutlined } from '@ant-design/icons'
import { http } from '@services'
import { BASE_URL } from '@constants'
import { useNavigate } from 'react-router'

export default function EditProfile() {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const [file, setFile] = useState(null)

    useEffect(() => {
        setUser(getUser())
    }, [])

    async function updateProfile(values) {

        values._id = user._id

        const url = `user/PUT/update-profile`;

        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        const response = await http(url, options);

        if (response?.success) {
            const data = JSON.stringify(response.info)
            localStorage.setItem('user', data)
            navigate('/')
        }

        else message.error(response.message);

    }

    const onFinish = (values) => {
        updateProfile(values);
        console.log(values)
    };

    return (
        <Layout>
            <div className="px-5 py-3 dashboard-section w-100 d-flex align-items-center justify-content-center">
                <div className="h-100 w-75">
                    <div className="w-100 row">
                        <div className="col-lg-12 d-flex flex-column justify-content-center">
                            <h3 className="mb-3 text-start text-secondary">Edit Profile</h3>
                            <div className='bg-white w-100 mh-75 shadow d-flex flex-column align-items-center justify-content-evenly py-3'>
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
                                        rules={[{ message: 'Please input your name!' }]}
                                    >
                                        <Input className="input" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone"
                                        name="phone"
                                        rules={[{ message: 'Please input your phone!' }]}
                                    >
                                        <Input className="input" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ message: 'Please input your password!' }]}
                                    >
                                        <Input.Password className="input" />
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
                </div>
            </div>
            <div className="position-absolute bottom-0 end-0">
                <button
                    class="btn btn-dark rounded-pill d-flex align-items-center p-3 px-5 my-2"
                // onClick={() => setVisible(true)}
                >
                    <EditOutlined />
                    <span className="ms-2">Edit</span>
                </button>
            </div>
        </Layout>
    )
}


