import React, { useState, useEffect } from 'react'
import { Layout, Input } from 'antd';
import { message } from 'antd';
import { http } from '@services'

const { Header } = Layout;

const { Search } = Input;

export default function HeaderComponent({ navigate }) {

  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(false)

  const [width, setWidth] = useState(window.innerWidth)

  const [search, setSearch] = useState(false)

  const [conversation, setconversation] = useState(null)

  function updateDimensions() {
    setWidth(window.innerWidth)
  }

  async function onSearch(value) {

    setLoading(true)

    const url = `user/GET/search/${value}`;

    const response = await http(url);

    if (response?.success) {
      const data = response.results
      if (!data?.length) {
        setLoading(false)
        message.info("No results founds")
      }
      else {
        setLoading(false)
        await navigate(`/search-results/${value}`, { state: data })
      }
    }
    else {
      setLoading(false)
    }
  }

  function logout() {
    localStorage.clear()
    message.success('Loged out Successfully.');
    navigate("/")
  }

  async function getConversation(currentUser) {

    const url = `user/GET/conversations/${currentUser?._id}`;

    const response = await http(url);

    if (response?.success) {
      setconversation(response.conversations)
    }
  }

  function redirectToChat() {
    navigate(`/chat/${user?._id}`);
  }

  async function getUser() {
    let currentUser = await JSON.parse(localStorage.getItem("user"))
    setUser(currentUser)
    getConversation(currentUser)
  }


  useEffect(() => {
    getUser()
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
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="#home">Home</a>
            <a className="nav-link active" href="#home">About</a>
            <a className="nav-link active" href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  )
}


