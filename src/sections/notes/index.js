import React, { useState, useEffect } from 'react'
import { Row, Col, message } from 'antd'
import { getUser } from '@helpers'
import { http } from '@services'

export default function Notes({ sessionId }) {

    const [user, setUser] = useState(null)

    const [note, setNote] = useState("")

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        setUser(getUser())
    }, [])

    useEffect(() => {
        getNotes()
        console.log(sessionId)
    }, [user])

    async function getNotes() {

        const url = `user/GET/notes/${sessionId}`;

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

        const values = {
            sessionId,
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
            getNotes()
        }

        else message.error('Something went wrong');

    }

    return (
        <>
            <div className="bg-light notes-container">
                <h3 className="text-center text-secondary">Ideas</h3>
                <Row gutter={[16, 16]}>
                    {
                        notes.map(item => (
                            <Col lg={6}>
                                <div style={{ maxHeight: '30v', minHeight: '20vh' }} className="w-100 bg-white rounded border shadow px-2">
                                    <p className="fs-6 text-primary fw-bold text-center my-1">{item.userName}</p>
                                    <span className="text-secondary">{item.body}</span>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </div>
            <div className="d-flex justify-content-between my-2">
                <input
                    className="post-input border border-2 bg-light shadow"
                    placeholder="Write your idea.."
                    onChange={(e) => setNote(e.target.value)}
                />
                <button 
                className="btn btn-primary px-4"
                onClick={postNote}
                disabled={note.length ? false : true}
                >Post</button>
            </div>
        </>
    )
}


