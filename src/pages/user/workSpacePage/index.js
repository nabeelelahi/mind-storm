import React from 'react'
import { Layout } from '@components'
import { Avatar } from 'antd';
import { workSpace } from '@config'

const icon = <img
    src='https://kleo.seventhqueen.com/wp-content/uploads/rtMedia/users/44269/2020/07/dummy-profile.png'
    alt=''
/>

export default function WorkSpacePage() {
    return (
        <Layout>
            <div className="workspace-sention pb-5">
                <div className="h-100 p-5">
                    <div className="h-100 row">
                        <div className="workspace-col col-lg-7 d-flex flex-column justify-content-center">
                            <h2 className="text-primary">{workSpace[1].name}</h2>
                            <p className="text-secondary fs-5 w-75">{workSpace[1].discription}</p>
                            <p className="text-secondary fs-6 w-75">No of sessions: {workSpace[1].noOfSessions}</p>
                        </div>
                        <div className="col-lg-5">
                            <h3 className="mb-3 text-start text-secondary">Particpants</h3>
                            <div className="shadow w-100 h-100 mb-5">
                            <p className="mx-5 mt-3 text-secondary fs-6 w-75">Total Particpants: {workSpace[1].noOfParticpants}</p>
                                <ul>
                                    <li className="d-flex justify-content-start align-items-center py-4">
                                        <div> 
                                        <Avatar size={56} icon={icon} />
                                        </div>
                                        <p className="mx-3">Nabeel Elahi</p>
                                    </li>
                                    <li className="d-flex justify-content-start align-items-center py-4">
                                        <div> 
                                        <Avatar size={56} icon={icon} />
                                        </div>
                                        <p className="mx-3">Nabeel Elahi</p>
                                    </li>
                                    <li className="d-flex justify-content-start align-items-center py-4">
                                        <div> 
                                        <Avatar size={56} icon={icon} />
                                        </div>
                                        <p className="mx-3">Nabeel Elahi</p>
                                    </li>
                                    <li className="d-flex justify-content-start align-items-center py-4">
                                        <div> 
                                        <Avatar size={56} icon={icon} />
                                        </div>
                                        <p className="mx-3">Nabeel Elahi</p>
                                    </li>
                                    <li className="d-flex justify-content-start align-items-center py-4">
                                        <div> 
                                        <Avatar size={56} icon={icon} />
                                        </div>
                                        <p className="mx-3">Nabeel Elahi</p>
                                    </li>
                                    <li className="d-flex justify-content-start align-items-center py-4">
                                        <div> 
                                        <Avatar size={56} icon={icon} />
                                        </div>
                                        <p className="mx-3">Nabeel Elahi</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


