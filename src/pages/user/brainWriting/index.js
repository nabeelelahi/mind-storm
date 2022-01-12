import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Avatar, Menu, message, notification } from 'antd';
import {
    MailOutlined,
    AppstoreOutlined,
    StarOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Layout } from '@components'
import { getUser } from '@helpers'
import { http } from '@services'
import { BASE_URL } from '@constants'
import { io } from 'socket.io-client';
import "./sessionPage.css"

export default function SessionPage() {

    const location = useLocation()

    const navigate = useNavigate()

    const sessionDetails = location.state

    const socket = useRef()

    const [activeUsers, setActiveUsers] = useState(null)

    const [current, setCurrent] = useState('participants')

    const [user, setUser] = useState(null)

    const [note, setNote] = useState("")

    const [notes, setNotes] = useState(null)

    const [chat, setChat] = useState("")

    const [chats, setChats] = useState([])

    const [participants, setParticipants] = useState(null)

    useEffect(() => {
        setUser(getUser())
        getParticipants()
        getNotes()
    }, [])

    useEffect(() => {
        socket.current = io("ws://localhost:9000")
        getActiveUsers()
        createConnection()
        getSocketNotes()
        getChats()
        checkStarBursting()
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

    function getSocketNotes() {

        socket.current.on("getNote", (data) => {
            getNotes()
        })

        socket.current.on("getDeleteNote", (data) => {
            getNotes()
        })

    }

    function sendSocketPost() {

        const socketValues = {
            senderName: user?.name,
            body: note,
        }

        socket.current.emit("postNote", socketValues)

    }

    function getChats() {

        socket.current.on("getMessage", (data) => {
            let tempArray = chats
            if (tempArray.includes(data)) return
            tempArray.push(data)
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

    function startStartBursting() {

        if (sessionDetails.status === 'active') socket.current.emit("startStarBurstig", { starBursting: true })

        else navigate(`/session/star-bursting/${sessionDetails._id}`, { state: sessionDetails })

    }

    function checkStarBursting() {
        socket.current.on("checkStarBursting", (data) => {
            openNotifications()
            if (data.starBursting) navigate(`/session/star-bursting/${sessionDetails._id}`, { state: sessionDetails })
        })
    }

    async function openNotifications() {

        notification.info({
            message: 'Starting StarBursting',
            description:
                'The notification has been turned to StarBursting by organizer.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        })

    }

    function handleClick(e) {
        setCurrent(e.key)
    }

    async function getNotes() {

        const url = `user/GET/notes/${sessionDetails._id}`;

        const response = await http(url);

        console.log(response)
        if (response?.success) {
            setNotes(response.info)
        }
        else {
            message.error(response.message);
        }
    }

    async function postNote() {

        if (!note.length) return

        sendSocketPost()

        const values = {
            sessionId: sessionDetails._id,
            userName: user.name,
            userEmail: user.email,
            body: note,
        }

        const url = `user/POST/notes`;

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        const response = await http(url, options);

        console.log(response);

        if (response?.success) {
            setNote("")
            getNotes()
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

    async function discardNote(values) {

        const url = `user/DELETE/notes`;

        const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        const response = await http(url, options);

        if (response?.success) {
            message.info(response.message);
            getNotes()
            socket.current.emit("deleteNote", { message: 'note discarded' })
        }

        else message.error('Something went wrong');

    }

    return (
        <Layout>
            <div className="session-section pt-2 px-4">
                <h2 className="text-center text-primary">Brain Writing for {sessionDetails?.name}</h2>
                <div className="h-100">
                    <div className="h-100 row">
                        <div className="col-lg-8">
                            <div className="bg-light px-2 notes-container">
                                <h3 className="text-center text-secondary">Ideas</h3>
                                <div className="row">
                                    {
                                        notes &&
                                        notes?.map(item => (
                                            <div className="col-lg-3">
                                                <div style={{ maxHeight: '30v', minHeight: '20vh' }} className="my-2 w-100 bg-white rounded border shadow px-2">
                                                    {
                                                        sessionDetails?.userId === user?._id ?
                                                            <div className="d-flex justify-content-between align-items-center px-2">
                                                                <p className="fs-6 text-primary fw-bold my-1">{item.userName}</p>
                                                                <DeleteOutlined
                                                                    style={{ fontSize: '17.5px', color: 'red' }}
                                                                    onClick={() => discardNote(item)}
                                                                />
                                                            </div>
                                                            :
                                                            <p className="fs-6 text-primary text-center fw-bold my-1">{item.userName}</p>
                                                    }
                                                    <span className="text-secondary">{item.body}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {
                                sessionDetails.status === 'active' &&
                                <div className="d-flex justify-content-between my-2">
                                    <input
                                        className="post-input border border-2 bg-light shadow"
                                        placeholder="Write your idea.."
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-primary px-4"
                                        onClick={postNote}
                                        disabled={note.length ? false : true}
                                    >Post</button>
                                </div>
                            }
                        </div>
                        <div className="col-lg-4">
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
                sessionDetails?.userId === user?._id &&
                <div className="position-absolute bottom-0 end-0">
                    <button
                        class="btn btn-dark rounded-pill d-flex align-items-center p-3 px-5 my-2"
                        onClick={startStartBursting}
                    >
                        <StarOutlined />
                        <span className="ms-2">Shift to Star bursting</span>
                    </button>
                </div>
            }
        </Layout>
    )
}


