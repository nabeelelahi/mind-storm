import React from 'react'
import { useNavigate } from 'react-router'

export default function Navbar() {

    const navigate = useNavigate()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container d-flex justify-content-between">
                <a className="navbar-brand" href="#">Mind Storm</a>
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
                <a 
                className="nav-link active btn btn-light text-primary px-4 rounded-pill"
                onClick={() => navigate('/login')}
                >Login</a>
            </div>
        </nav>
    )
}


