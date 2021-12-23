import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Typography, message } from 'antd';
import { http } from '@services'
import { useNavigate } from 'react-router'
import { AdminLayout, Loader } from '@components'

const { Title } = Typography

export default function Queries() {

    const navigate = useNavigate()

    const [users, setUsers] = useState(null)

    const queryMessage = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam`

    
  const dataSource = [
    {
      key: '1',
      id: '1',
      name: 'Hamze',
      email: 'hamzay@gmail.com',
      phone: '0312xxxxxxxx',
      message: queryMessage,
    },
    {
      id: '2',
      key: '2',
      name: 'Areeb',
      email: 'areeb@gmail.com',
      phone: '0345xxxxxxxx',
      message: queryMessage,
    },
  ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="#">{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
    ];

    async function checkForAmin() {
        let currentUser = await JSON.parse(sessionStorage.getItem("user"))

        if (currentUser?.type !== "admin") navigate("/admin/login")
    }

    async function getUsers() {
        const url = `admin/GET/users`;

        const response = await http(url);

        if (response?.success) {
            response?.users?.map((item) => (
                item.key === String(item._id)
            ))
            setUsers(response.users);
            console.log(response.users);
        }
    }


    useEffect(() => {
        // checkForAmin()
        getUsers()
    }, [])

    return (
        <AdminLayout>
            {/* {users === null ?
                <Loader />
                : */}
                <>
                    <Title className="admin-headings">Support Queries</Title>
                    <Table 
                    columns={columns} 
                    dataSource={dataSource}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.message}</p>,
                      }}
                    />
                </>
            {/* } */}
        </AdminLayout>
    )
}

