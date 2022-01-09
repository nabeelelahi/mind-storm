import React, { useEffect } from 'react'
import { Form, Input, message } from 'antd';
import { CommonLayout } from '@components'
import { about, contact } from '@assets'
import { useNavigate } from 'react-router';
import { checkUser } from '@helpers'
import { http } from '@services'
import './home.css'

export default function Home() {

    const navigate = useNavigate()

    useEffect(() => {
        checkUser(navigate)
    },[])

    const onFinish = (values) => {
        console.log('Success:', values);
        sendQuery(values)
    };

    async function sendQuery(values) {

        const url = `user/POST/query`;

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

    return (
        <CommonLayout>
            <div id='home' className="landing-section-1">
                <div className="layer">
                    <h1> Welcome to Mind storm</h1>
                    <h4> Digital Platform for Brain Storming</h4>
                    <p>Sign up to get started</p>
                    <button 
                    className="btn btn-light px-3 rounded-pill"
                    onClick={() => navigate('/register')}
                    >Register</button>
                </div>
            </div>
            <div id='about' className="landing-section-2 bg-white">
                <div className="container">
                    <div className="row">
                        <div className="landing-right col-lg-6 col-12 d-flex flex-column justify-content-center">
                            <h2 className="text-secondary">We are automatic brainstorming</h2>
                            <p className="text-secondary">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                            </p>
                        </div>
                        <div className="col-lg-6 col-12">
                            <img className="w-100 h-auto" src={about} alt='' />

                        </div>
                    </div>
                </div>
            </div>
            <div className="landing-section-3 bg-light d-flex flex-column justify-content-center align-items-center">
                <h4 className="text-secondary my-3">Start Brainstorming now by signin up</h4>
                <button 
                type="button" 
                class="btn btn-primary px-5 btn-lg rounded-pill"
                onClick={() => navigate('/register')}
                >Register</button>
            </div>
            <div id='contact' className="landing-section-2 bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <img className="w-100 h-auto" src={contact} alt='' />
                        </div>
                        <div className="landing-right col-lg-6 col-12 d-flex flex-column justify-content-evenly">
                            <h4 className="text-secondary text-center">Contact Us</h4>
                            <Form
                                name="basic"
                                layout="vertical"
                                onFinish={onFinish}
                            >
                                <div className="row">
                                    <div className='col-lg-6 col-12'>
                                        <Form.Item
                                            label="First Name"
                                            name="firstName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your name!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className='col-lg-6 col-12'>
                                        <Form.Item
                                            label="Last Name"
                                            name="lastName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your name!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className='col-lg-6 col-12'>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your name!',
                                                    type: 'email',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className='col-lg-6 col-12'>
                                        <Form.Item
                                            label="Phone"
                                            name="phone"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Phone!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className='col-12'>
                                        <Form.Item
                                            label="Message"
                                            name="message"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your message!',
                                                },
                                            ]}
                                        >
                                            <Input.TextArea />
                                        </Form.Item>
                                    </div>
                                </div>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <button type="submit" class="btn btn-primary px-5 rounded-pill">Submit</button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    )
}


