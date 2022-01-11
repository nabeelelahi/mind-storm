import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import { Avatar, message, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Layout, AddParticipantModal } from '@components'
import { http } from '@services'
import { getUser } from '@helpers'

const icon = <img
    src='https://kleo.seventhqueen.com/wp-content/uploads/rtMedia/users/44269/2020/07/dummy-profile.png'
    alt=''
/>

export default function WorkSpacePage() {

    const location = useLocation()

    const workSpaceDetails = location.state

    const [participants, setParticipants] = useState(null)
    
    const [visible, setVisible] = useState(false)

    const [user, setUser] = useState(null)

    useEffect(() => {
        getParticipants()
        setUser(getUser())
    }, [])

    async function getParticipants() {

        const url = `user/GET/participants/${workSpaceDetails._id}`;

        const response = await http(url);

        console.log(response)
        if (response?.success) {
            setParticipants(response.info)
        }
        else {
            message.error(response.message);
        }
    }

    async function deleteParticipant(values) {

        const url = `user/DELETE/participant`;

        const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        const response = await http(url, options);

        if (response?.success) {
            message.info(response.message);
            getParticipants()
        }

        else message.error('Something went wrong');

    }

    return (
        <Layout>
            <div className="workspace-sention pb-5">
                <div className="h-100 p-5">
                    <div className="h-100 row">
                        <div className="workspace-col col-lg-7 d-flex flex-column justify-content-center">
                            <h2 className="text-primary">{workSpaceDetails.name}</h2>
                            <p className="text-secondary fs-5 w-75">{workSpaceDetails.discription}</p>
                            <p className="text-secondary fs-6 w-75">No of sessions: {workSpaceDetails.noOfSessions}</p>
                        </div>
                        <div className="col-lg-5">
                            <h3 className="mb-3 text-start text-secondary">Particpants</h3>
                            <div className="shadow w-100 h-100 mb-5">
                                <p className="mx-5 mt-3 text-secondary fs-6 w-75">Total Particpants: {workSpaceDetails.noOfParticipants}</p>
                                <ul>
                                    {
                                        participants &&
                                        participants.map(participant => {
                                            if (workSpaceDetails.userId === user._id) {
                                                return (
                                                    <li className="d-flex justify-content-around align-items-center py-4">
                                                        <div className='d-flex align-items-center'>
                                                            <Avatar size={56} style={{ background: 'blue' }}>
                                                                {participant.userName[0]?.toUpperCase()}
                                                            </Avatar>
                                                            <p className="mx-3">{participant.userName}</p>
                                                        </div>
                                                        < Tag
                                                            className="cursor-pointer"
                                                            color="red"
                                                            onClick={() => deleteParticipant(participant)}
                                                        >{"Kick Participant".toUpperCase()}</Tag>
                                                    </li>
                                                )
                                            }
                                            else {
                                                return (
                                                    <li className="d-flex justify-content-start align-items-center py-4">
                                                        <div className='d-flex align-items-center'>
                                                            <Avatar size={56} style={{ background: 'blue' }}>
                                                                {participant.userName[0]?.toUpperCase()}
                                                            </Avatar>
                                                            <p className="mx-3">{participant.userName}</p>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                workSpaceDetails?.userId === user?._id &&
                <div className="position-absolute bottom-0 end-0">
                    <button
                        class="btn btn-dark rounded-pill d-flex align-items-center p-3 px-5 my-2"
                        onClick={() => setVisible(true)} 
                    >
                        <PlusOutlined />
                        <span className="ms-2">Add Particpants</span>
                    </button>
                </div>
            }
            <AddParticipantModal
                visible={visible}
                setVisible={setVisible}
                workSpaceDetails={workSpaceDetails}
            />
        </Layout >
    )
}


