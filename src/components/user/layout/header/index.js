import React, { useState, useEffect } from 'react'
import { Layout, Input, Avatar } from 'antd';
import { useNavigate } from 'react-router';
import { getUser } from '@helpers'
import { BASE_URL } from '@constants'

const { Header } = Layout;

const { Search } = Input;

export default function HeaderComponent() {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  const [width, setWidth] = useState(null)

  function updateDimensions() {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    setUser(getUser())
  }, [navigate])


  useEffect(() => {

    window.addEventListener('resize', updateDimensions);

    window.addEventListener('load', updateDimensions);

  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container d-flex justify-content-between">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className='w-100 d-flex justify-content-end'>
            <div
              style={{
                cursor: 'pointer' 
              }}
              className="d-flex align-items-center justify-content-between text-white fw-bold fs-5"
              onClick={() => navigate('/profile')}
            >
              <span className="me-2">{user?.name}</span>
              <Avatar src={`${BASE_URL}/${user?.file}`} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}


