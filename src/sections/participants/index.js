import React, { useState, useEffect } from 'react'
import { Avatar, message } from 'antd';
import { http } from '@services';


export default function ParticpantSection({ workSpaceId, icon }) {

    const [participants, setParticipants] = useState(null)

    useEffect(() => {
        getParticipants()
    }, [])

    async function getParticipants() {

        const url = `user/GET/participants/${workSpaceId}`;

        const response = await http(url);

        console.log(response)
        if (response?.success) {
            setParticipants(response.info)
        }
        else {
            message.error(response.message);
        }
    }

    return (
        <div className="right-container">
            <p className="mx-5 mt-3 text-secondary fs-6 w-75">Total Particpants: {participants?.length}</p>
            <ul>
                {
                    participants.map(participant => (
                        <li className="d-flex justify-content-start align-items-center py-4">
                            <div>
                                <Avatar size={56} icon={icon} />
                            </div>
                            <p className="mx-3">{participant.userName}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}


