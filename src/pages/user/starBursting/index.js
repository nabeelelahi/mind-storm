import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Form, Avatar, Menu, message, Select } from 'antd';
import { MailOutlined, AppstoreOutlined, CloseOutlined } from '@ant-design/icons';
import { Layout } from '@components'
import { getUser } from '@helpers'
import { http } from '@services'
import { io } from 'socket.io-client';
import { BASE_URL } from '@constants'

const { Option } = Select;

const questions = ['What', 'Why', 'Who', 'Where', 'When', 'How']

export default function StarBursting() {

    const location = useLocation()

    const navigate = useNavigate()

    const sessionDetails = location.state

    const socket = useRef()

    const [activeUsers, setActiveUsers] = useState(null)

    const [current, setCurrent] = useState('participants')

    const [user, setUser] = useState(null)

    const [answers, setAnswers] = useState(null)

    const [chat, setChat] = useState("")

    const [chats, setChats] = useState([])

    const [participants, setParticipants] = useState(null)

    useEffect(() => {
        setUser(getUser())
        getParticipants()
        getAnswers()
        socket.current = io("ws://localhost:9000")
    }, [])

    useEffect(() => {
        getActiveUsers()
        createConnection()
        getSocketAnswers()
        getChats()
        console.log(sessionDetails)
    }, [])

    function createConnection() {
        if (user) socket.current.emit("addParticipant", user?._id);
    }

    function getActiveUsers() {
        socket.current.on("getParticipant", (users) => {
            // console.log(users)
            console.log("connected")
        })
    }

    function getSocketAnswers() {

        socket.current.on("getAnswer", (data) => {
            console.log(data)
            getAnswers()
        })

    }

    function sendSocketAnswer(values) {

        const socketValues = {
            senderName: user?.name,
            body: values.body,
        }

        socket.current.emit("postAnswer", socketValues)

    }

    function getChats() {

        socket.current.on("getMessage", (data) => {
            let tempArray = chats
            if (tempArray.includes(data)) return
            else if (!tempArray.includes(data)) tempArray.push(data)
            setChats(null)
            setTimeout(() => setChats(tempArray), 100)
        })

    }

    function sendChat() {

        if (!chat.length) return

        const socketValues = {
            senderId: user?._id,
            senderName: user?.name,
            body: chat,
        }

        socket.current.emit("sendMessage", socketValues)

        setChat("")

    }

    function handleClick(e) {
        setCurrent(e.key)
    }

    async function getAnswers() {

        const url = `user/GET/answers/${sessionDetails._id}`;

        const response = await http(url);

        console.log(response)
        if (response?.success) {
            setAnswers(response.info)
        }
        else {
            message.error(response.message);
        }
    }

    async function postAnswer(values) {

        sendSocketAnswer(values)

        const url = `user/POST/answers`;

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        const response = await http(url, options);

        if (response?.success) {
            getAnswers()
        }

        else message.error('Something went wrong');

    }

    async function getParticipants() {

        const url = `user/GET/participants/${sessionDetails.workSpaceId}`;

        const response = await http(url);

        console.log(response)
        if (response?.success) {
            setParticipants(response.info)
        }
        else {
            message.error(response.message);
        }
    }

    async function endSessions() {

        const url = `user/PATCH/end-session/${sessionDetails._id}`;

        const options = {
            method: "PATCH",
        };

        const response = await http(url, options);

        console.log(response);

        if (response?.success) {
            navigate(`/sessions/${sessionDetails.workSpaceId}`)
        }

        else message.error('Something went wrong');

    }

    function onFinish(values) {
        values.sessionId = sessionDetails._id
        values.userName = user.name
        values.userEmail = user.email
        postAnswer(values)
    };

    return (
        <Layout>
            <div className="session-section pt-2 px-4">
                <h2 className="text-center text-primary">Star Bursting for {sessionDetails?.name}</h2>
                <div className="h-100">
                    <div className="h-100 row">
                        <div className="col-lg-9">
                            <div className="bg-light px-2 notes-container">
                                <div className="row">
                                    {
                                        questions.map(item => (
                                            <div key={item} className="col-lg-2 px-1">
                                                <div
                                                    style={{ height: '6vh' }}
                                                    className="bg-white rounded border shadow d-flex justify-content-center"
                                                >
                                                    <p className="fs-4 text-primary fw-bold text-center my-1">{item}</p>
                                                </div>
                                                {
                                                    answers &&
                                                    answers?.map(ans => {
                                                        if (item === ans.category) {
                                                            return (
                                                                <div
                                                                    key={ans.body}
                                                                    style={{ maxHeight: '30vh', minHeight: '17.5vh' }}
                                                                    className="w-100 bg-white rounded border shadow px-2 my-2"
                                                                >
                                                                    <p className="fs-6 text-primary fw-bold text-center my-1">{ans.userName}</p>
                                                                    <span className="text-secondary">{ans.body}</span>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {
                                sessionDetails.status === 'active' &&
                                <div className="d-flex justify-content-between my-2">
                                    <Form layout="inline" className="w-100" onFinish={onFinish}>
                                        <Form.Item
                                            name="body"
                                            className='answer-input'
                                            rules={[{ required: true, message: 'Please input your answer!' }]}
                                        >
                                            <input className="w-100 border border-2 bg-white shadow" placeholder="please type your answer..." />
                                        </Form.Item>
                                        <Form.Item
                                            name="category"
                                            className="answer-select"
                                            rules={[{ required: true, message: 'Please select a category!' }]}
                                        >
                                            <Select className="sellect py-2 w-100 border border-2 bg-white shadow">
                                                {
                                                    questions.map(item => (
                                                        <Option key={item} value={item}>{item}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item className="btn-box">
                                            <button className="poster btn btn-primary px-3 rounded" type="primary" htmlType="submit">
                                                Post
                                            </button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            }
                        </div>
                        <div className="col-lg-3">
                            <div className="shadow-sm w-100 h-100">
                                <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
                                    <Menu.Item key="chat" icon={<MailOutlined />}>
                                        Chats
                                    </Menu.Item>
                                    <Menu.Item key="participants" icon={<AppstoreOutlined />}>
                                        Participants
                                    </Menu.Item>
                                </Menu>
                                {
                                    current === 'participants' ?
                                        <div className="right-container">
                                            <p className="mx-5 mt-3 text-secondary fs-6 w-75">Total Particpants: {participants?.length}</p>
                                            <ul>
                                                {
                                                    participants &&
                                                    participants?.map(participant => (
                                                        <li className="d-flex justify-content-start align-items-center py-4">
                                                            <div>
                                                                <Avatar
                                                                    size={56}
                                                                    src={`${BASE_URL}/${participant.file}`}
                                                                />
                                                            </div>
                                                            <p className="mx-3">{participant.userName}</p>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        :
                                        current === 'chat' &&
                                        <div className='chat-container'>
                                            <div className='messages p-2'>
                                                {
                                                    chats &&
                                                    chats?.map((item) => (
                                                        <>
                                                            {item.senderId === user._id ?
                                                                <div className='bg-light my-bubble p-2 text-primary align-self-start'>{item.body}</div>
                                                                :
                                                                <div className='bg-primary there-bubble p-2 text-white align-self-end'>{item.body}</div>
                                                            }
                                                        </>
                                                    ))
                                                }
                                            </div>
                                            {
                                                sessionDetails.status === 'active' &&
                                                <div className='send-message d-flex align-items-center'>
                                                    <input
                                                        placeholder='type your message..'
                                                        className='px-2 chat-input border bg-light shadow'
                                                        type='text'
                                                        value={chat}
                                                        onChange={(e) => setChat(e.target.value)}
                                                    />
                                                    <button
                                                        className="chat-btn btn btn-primary"
                                                        onClick={sendChat}
                                                        disabled={chat.length ? false : true}
                                                    >Chat</button>
                                                </div>
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                sessionDetails?.userId === user?._id && sessionDetails.status === 'active' ?
                    <div className="position-absolute bottom-0 end-0">
                        <button
                            onClick={endSessions}
                            class="btn btn-dark rounded-pill d-flex align-items-center p-3 px-5 my-2"
                        >
                            <CloseOutlined />
                            <span className="ms-2">End Session</span>
                        </button>
                    </div>
                    :
                    <></>
            }
        </Layout>
    )
}


